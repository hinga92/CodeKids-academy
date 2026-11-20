// CodeKids "Watch & Do" → MP4 maker.
// Renders each scene's animation with WebKit (same watch.js as the app), narrates it with the
// macOS voice (`say`), and joins frames + audio with ffmpeg. Run via scripts/make-videos.sh.
import AppKit
import AVFoundation
import WebKit

struct Scene: Decodable { let say: String; let len: Double }
struct Info: Decodable { let title: String; let scenes: [Scene] }

@MainActor final class Renderer: NSObject, WKNavigationDelegate {
    let web = WKWebView(frame: NSRect(x: 0, y: 0, width: 540, height: 540))
    private var done: CheckedContinuation<Void, Never>?
    func load(page: URL, root: URL) async {
        await withCheckedContinuation { c in done = c; web.navigationDelegate = self; web.loadFileURL(page, allowingReadAccessTo: root) }
    }
    nonisolated func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        Task { @MainActor in self.done?.resume(); self.done = nil }
    }
    func js(_ s: String) async throws -> String { (try await web.evaluateJavaScript(s) as? String) ?? "" }
}

@discardableResult
func run(_ exe: String, _ args: [String]) throws -> Int32 {
    let p = Process(); p.executableURL = URL(fileURLWithPath: exe); p.arguments = args
    // never let child tools read the terminal (ffmpeg would stop with SIGTTIN when run interactively)
    p.standardInput = FileHandle.nullDevice; p.standardOutput = FileHandle.nullDevice; p.standardError = FileHandle.nullDevice
    try p.run(); p.waitUntilExit()
    if p.terminationStatus != 0 { throw NSError(domain: "make_videos", code: Int(p.terminationStatus), userInfo: [NSLocalizedDescriptionKey: "\(exe) \(args.prefix(4).joined(separator: " ")) failed"]) }
    return p.terminationStatus
}
func which(_ name: String) -> String? {
    for d in ["/opt/homebrew/bin", "/usr/local/bin", "/usr/bin"] { let p = "\(d)/\(name)"; if FileManager.default.isExecutableFile(atPath: p) { return p } }
    return nil
}
func slug(_ s: String) -> String { s.lowercased().components(separatedBy: CharacterSet.alphanumerics.inverted).filter { !$0.isEmpty }.joined(separator: "-") }

// ── arguments ──
var args = Array(CommandLine.arguments.dropFirst())
func opt(_ name: String, _ def: String) -> String {
    if let i = args.firstIndex(of: name), i + 1 < args.count { let v = args[i + 1]; args.removeSubrange(i...i + 1); return v }
    return def
}
let repo = URL(fileURLWithPath: opt("--repo", FileManager.default.currentDirectoryPath))
let outDir = URL(fileURLWithPath: opt("--out", repo.appendingPathComponent("videos").path))
let voice = opt("--voice", "Samantha")
let rate = opt("--rate", "165")
let fps = Double(opt("--fps", "24"))!
guard let ffmpeg = which("ffmpeg") else { print("❌ ffmpeg not found. Install it with: brew install ffmpeg"); exit(1) }

_ = NSApplication.shared
let r = Renderer()
await r.load(page: repo.appendingPathComponent("scripts/render.html"), root: repo)
let all: [String] = try JSONDecoder().decode([String].self, from: Data(try await r.js("projectIds()").utf8))
let wanted = args.isEmpty || args == ["all"] ? all : args.filter { all.contains($0) }
if wanted.isEmpty { print("Unknown project id. Choose from: \(all.joined(separator: ", "))"); exit(1) }
try FileManager.default.createDirectory(at: outDir, withIntermediateDirectories: true)

for pid in wanted {
    let info = try JSONDecoder().decode(Info.self, from: Data(try await r.js("projectInfo('\(pid)')").utf8))
    let tmp = FileManager.default.temporaryDirectory.appendingPathComponent("codekids-\(pid)-\(UUID().uuidString.prefix(6))")
    let frames = tmp.appendingPathComponent("frames")
    try FileManager.default.createDirectory(at: frames, withIntermediateDirectories: true)
    print("🎬 \(pid) — \(info.title) (\(info.scenes.count) scenes)")
    var frameNo = 0
    var concat = ""
    for (i, sc) in info.scenes.enumerated() {
        // 1) narration
        let aiff = tmp.appendingPathComponent("s\(i).aiff")
        try run("/usr/bin/say", ["-v", voice, "-r", rate, "-o", aiff.path, sc.say])
        let f = try AVAudioFile(forReading: aiff)
        let audioLen = Double(f.length) / f.fileFormat.sampleRate
        let dur = max(audioLen + 0.7, sc.len + 0.5)
        // 2) padded scene audio
        let wav = tmp.appendingPathComponent("s\(i).wav")
        try run(ffmpeg, ["-nostdin", "-y", "-i", aiff.path, "-af", String(format: "apad=whole_dur=%.3f", dur), "-ar", "44100", "-ac", "1", wav.path])
        concat += "file '\(wav.path)'\n"
        // 3) frames
        let n = Int((dur * fps).rounded(.up))
        for k in 0..<n {
            let t = min(Double(k) / fps, sc.len + 0.4)
            let url = try await r.js("renderFrame('\(pid)', \(i), \(t))")
            guard let comma = url.firstIndex(of: ","), let data = Data(base64Encoded: String(url[url.index(after: comma)...])) else { throw NSError(domain: "render", code: 1) }
            try data.write(to: frames.appendingPathComponent(String(format: "%06d.jpg", frameNo)))
            frameNo += 1
        }
        print(String(format: "   scene %d/%d  %.1fs", i + 1, info.scenes.count, dur))
    }
    let list = tmp.appendingPathComponent("list.txt"); try concat.write(to: list, atomically: true, encoding: .utf8)
    let audio = tmp.appendingPathComponent("audio.wav")
    try run(ffmpeg, ["-nostdin", "-y", "-f", "concat", "-safe", "0", "-i", list.path, "-c", "copy", audio.path])
    let out = outDir.appendingPathComponent("\(pid)-\(slug(info.title)).mp4")
    try run(ffmpeg, ["-nostdin", "-y", "-framerate", String(Int(fps)), "-i", frames.appendingPathComponent("%06d.jpg").path, "-i", audio.path,
                     "-c:v", "libx264", "-preset", "medium", "-crf", "21", "-pix_fmt", "yuv420p",
                     "-c:a", "aac", "-b:a", "128k", "-shortest", "-movflags", "+faststart", out.path])
    try? FileManager.default.removeItem(at: tmp)
    let size = (try? FileManager.default.attributesOfItem(atPath: out.path)[.size] as? Int) ?? 0
    print(String(format: "   ✅ %@ (%.1f MB, %.0fs)", out.lastPathComponent, Double(size) / 1_048_576, Double(frameNo) / fps))
}
print("Done. Videos are in \(outDir.path)")
