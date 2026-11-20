# CodeKids Academy: strategy and roadmap

*Last updated: 20 November 2026*

## 1. What we're building

**CodeKids is a guide for parents: one path from age 5 to 18 that uses the best free coding tools, follows school standards, and keeps family data private.**

We shouldn't try to out-teach Code.org or out-game Tynker. Each of them covers part of a child's journey. CodeKids should plan the whole journey across all of them, track it, and show what the child can actually do.

## 2. Competitors (research, November 2026)

| Platform | Ages | Model | Strength | Gap CodeKids fills |
|---|---|---|---|---|
| Scratch / ScratchJr (MIT) | 5–16 | Free | Best creative tool; huge community | No structured path, no parent progress view |
| Code.org | 4–18 | Free | Free structured courses, school-friendly | Classroom-first; parents can't see a whole 5–18 plan |
| Tynker | 5–14/17 | Paid subscription (price varies by plan) | Game-based, Minecraft/LEGO, path to Python/JS | Paywall; a single vendor's world |
| CodeCombat | 8–9+ | Freemium | Typing real Python/JS through a game | Narrow age range |
| Kodable | 4–10 | Freemium (~$10–25/mo) | Young learners | Stops at age 10 |
| codeSpark | 5–9 | Paid (~$10/mo) | Pre-readers | Stops at age 9 |
| Raspberry Pi / Code Club projects | 7–17 | Free | Excellent step-by-step projects in 6-project paths | No family tracking, no standards view for parents |
| Khan Academy Computing | 11+ | Free | JS, SQL, CS theory | Older kids only |

Prices are from third-party review sites and often conflict, so check them before quoting.

**What none of them do, and what CodeKids now does:**
1. One plan for ages **5–18** that crosses vendors (Scratch → Python → Web → APIs → AI).
2. Designed for **parents and mentors**, not just classrooms, including **unplugged** play for ages 5–6.
3. Every milestone and project is mapped to the **CSTA K–12 standards**, with a printable report and portfolio.
4. **No account and no data collection.** Data stays on the device.
5. **Age-limit guidance** for outside services (GitHub 13+, AI APIs 18+ or a parent-owned key) and a grown-up check before links.

## 3. Standards and levels (built in Phase 2)

- **Standards:** the 2017 CSTA K–12 Computer Science Standards (levels 1A, 1B, 2, 3A, 3B). We use 45 codes with short descriptions in our own words, because the official text is licensed CC BY-NC-SA.
- **Stage-to-level map:**
  - Stage 0–1 → 1A
  - Stage 2 → 1B
  - Stage 3 → 1B / 2
  - Stage 4 → 2
  - Stage 5 → 2 / 3A
  - Stage 6 → 3A / 3B
- **Three mastery levels per stage:** 🧭 Explorer (try it with help), 🔧 Builder (do it alone), 🚀 Creator (make something original, test it with others, explain it).
- **21 guided projects:** 3 per stage, one per level. Each has steps, "done when" checks, a stretch goal and its standards.
- **Proof:** a link or note for each completed milestone, which becomes the portfolio in the printed report.

## 4. Turning it into an iOS and Android app

### Recommended approach: Capacitor
Capacitor wraps the existing web app in a native shell, so the same code runs on iPhone, iPad and Android. Your **LearnGate** project already uses the same pattern (a web view with `assets/www`), so the toolchain is familiar.

| Option | Effort | Notes |
|---|---|---|
| **Capacitor (recommended)** | 3–5 weeks | Reuses 100% of the code; native plugins for notifications, sharing and files |
| React Native / Flutter | 3–4 months | Full rewrite; only worth it for heavy native UI |
| Swift + Kotlin | 6+ months | Two codebases; not justified yet |

### Avoiding rejection (Apple guideline 4.2, "minimum functionality")
Apple often rejects apps that are just a website in a wrapper. Add real native value:
- **Bundled and offline:** all curriculum and project briefs ship inside the app.
- **Local notifications:** a weekly "Next up for Ann" reminder (no server needed).
- **Native share sheet:** export the progress report as a PDF, and save backups to Files or iCloud Drive.
- **Haptics and native polish:** celebrations, iPad split-view layout, Dynamic Type.
- **Later:** a home-screen widget showing each child's next milestone.

### Which store category
- **Recommended: Education category, aimed at parents (age rating 4+).** The parent is the user. This keeps the app out of Apple's Kids Category rules while staying child-safe.
- If we later make a **kid-facing mode** for the Kids Category: no third-party analytics or ads, and a grown-up check before links and purchases. **The check is already built** (Privacy page → Kid-safe links).
- Google Play: complete the **Families policy** and **Data safety** forms; with no data collected, answer "No data collected/shared".

### What you need

| Item | Cost | Status |
|---|---|---|
| Mac with Xcode | — | ✅ You have it |
| Android SDK + Java 17 | Free | ✅ Already installed for LearnGate |
| Node.js LTS (`brew install node`) | Free | ❌ Not installed yet |
| **Apple Developer Program** | $99/year | ❌ Needed for TestFlight and the App Store |
| **Google Play Console** | $25 one-time | ❌ New personal accounts must run a closed test with a group of testers (around 12 for 14 days at last check) before going public |
| An iPhone/iPad and an Android device for testing | — | ✅ You test LearnGate on these |
| Privacy policy URL | Free | ✅ The in-app Privacy page; also publish it on the website |
| App icon, screenshots (iPhone 6.9", iPad 13", Android) and store text | Free (DIY) | ❌ |
| Optional: an organisation account (LLC + D-U-N-S number) so the store shows "CodeKids Academy" instead of your name | Varies | Decide before submitting |

### Children's privacy law
- The **amended COPPA rule** (US) has applied since **22 April 2026**. It mainly covers apps that **collect personal information from children online**.
- Because CodeKids stores everything on the device and sends nothing, we stay outside most of its obligations. **Keep it that way** until there's a real reason to add cloud features.
- If we add accounts or sync for clubs, we'll need:
  - verifiable parental consent
  - a written data-retention and deletion policy
  - a vendor list
  - ideally, membership of a COPPA Safe Harbor programme

  In the EU and UK, the GDPR rules for children and the UK Age Appropriate Design Code apply too.

## 5. Roadmap

| Phase | What | Effort | Done when |
|---|---|---|---|
| 1 ✅ | Bug fixes, safety, offline app, backups, Privacy page | — | Shipped |
| 2 ✅ | Standards, levels, 21 projects, Next Up, portfolio, grown-up check | — | Shipped (this commit) |
| 3 ✅ | **Mobile apps (Capacitor):** iOS + Android projects, reminders, share sheet, haptics, icons — store submission pending your accounts ([APP_STORES.md](APP_STORES.md)) | — | Approved in both stores |
| 4 | **Pilot:** 5–10 families or 1 club for 4 weeks; printable unplugged packs; parent guide videos (60–90 s each); Spanish translation | 4–6 weeks | ≥60% of families active weekly in week 4 |
| 5 | **Clubs and sync** (only if the pilot shows demand): parent accounts, mentor dashboard, encrypted sync, COPPA consent flow | 2–3 months | Club pays for a plan |
| 6 | **Learn inside the app:** embedded Blockly and Python (Pyodide) playground for stages 2–3; AI helper for parents that suggests next projects from interests (runs server-side, never on kids' devices) | 3+ months | Kids finish an in-app project |

**Business model (later):** keep the core free; possible paid options are a club or mentor plan, printable project kits, and live workshops. No ads, ever.

**Possible LearnGate tie-in:** a "coding questions" pack for LearnGate, so kids unlock screen time by answering Stage 0–2 logic puzzles. Both projects would use the same curriculum file.

## Sources
- [CSTA K-12 Computer Science Standards (revised 2017)](https://csteachers.org/wp-content/uploads/2025/03/csta-k-12-computer-science-standards-revised.pdf)
- [CSTA standards progression chart](https://csteachers.org/wp-content/uploads/2025/03/2017-csta-k-12-standards-progression-chart.pdf)
- [Best Coding Apps for Kids 2026 — LearnPilot](https://www.learnpilot.io/blog/best-coding-apps-kids)
- [The Best Coding Platforms for Kids, Compared (2026) — CodeItLearn](https://codeitlearn.com/guide/best-coding-platforms-for-kids)
- [Best Online Coding Classes for Kids 2026 — CodaKid](https://codakid.com/blog/coding-for-kids/best-online-coding-classes-for-kids-2025/) (vendor, treat with caution)
- [Progression in Code Clubs — Code Club](https://codeclub.org/2023/10/18/progression-in-code-clubs-what-matters-to-you)
- [Code Club — Learn to code](https://codeclub.org/learn-to-code)
- [App Store Kids Category guideline 1.3 summary — GoodBarber](https://www.goodbarber.com/help/apple-rejection-r100/apple-rejection-apps-for-kids-a365/)
- [Kids Section third-party analytics — Apple Developer Forums](https://developer.apple.com/forums/thread/117320)
- [Guideline 4.2 Minimum Functionality — Apple Developer Forums](https://developer.apple.com/forums/thread/115230)
- [11 steps to get your web app on the App Store — Capawesome](https://capawesome.io/blog/11-steps-to-get-your-web-app-on-the-app-store/)
- [FTC COPPA Rule, Federal Register (22 Apr 2025)](https://www.federalregister.gov/documents/2025/04/22/2025-05904/childrens-online-privacy-protection-rule)
- [COPPA amendment compliance deadline — Hunton](https://www.hunton.com/privacy-and-cybersecurity-law-blog/coppa-rule-amendment-compliance-deadline-approaches)
