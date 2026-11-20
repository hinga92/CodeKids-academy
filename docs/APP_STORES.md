# Publishing CodeKids Academy to the App Store and Google Play

Phase 3 status (20 Nov 2026):

| | Status |
|---|---|
| iOS app (iPhone + iPad) | ✅ Builds and runs in the simulator. Backup share sheet and weekly reminder tested |
| Android app | ✅ Debug APK builds. ⏳ Not yet run on a device (none was connected) |
| Store accounts, signing, screenshots, listing | ⏳ Your steps, listed below |

## How it's built
- **Capacitor 8** wraps the same `index.html` and `curriculum.js` used by the website.
- `npm run sync` copies the web files into `www/` and then into the iOS and Android projects.
- **App ID:** `com.karanja.codekids` (set in `capacitor.config.json`). This can't be changed after the first store upload.

Native features (what makes this more than a website in a wrapper, per Apple guideline 4.2):

| Feature | Plugin |
|---|---|
| Works fully offline (everything is bundled) | — |
| Weekly "Next up" reminder, Sundays 5 pm, created on the device | `@capacitor/local-notifications` |
| Backups and printable reports saved through the native share sheet (Files, iCloud Drive, AirDrop, Print, email) | `@capacitor/filesystem` + `@capacitor/share` |
| Haptic feedback when ticking milestones and celebrating | `@capacitor/haptics` |
| Native splash screen, status bar, iPhone notch and safe areas, iPad support | `@capacitor/splash-screen`, `@capacitor/status-bar` |

## Everyday commands
```bash
cd ~/Automation-Projects/CodeKids-academy
bash run_ios_simulator.sh            # build + run on the iPhone simulator
bash install_on_android.sh           # build + install on a USB-connected Android device
npm run ios                          # open the project in Xcode
npm run android                      # open in Android Studio (if installed)
npm run assets                       # regenerate icons/splash from assets/*.png
```
After changing `index.html` or `curriculum.js`, run `npm run sync` before building.

---

## Your checklist: Apple App Store

1. **Join the Apple Developer Program** at developer.apple.com/programs ($99/year).
   - Enrol **as an individual** (your name is shown as the seller), or **as an organisation** ("CodeKids Academy" is shown; needs a legal entity and a D-U-N-S number).
2. In Xcode, run `npm run ios`. Then go to **App target → Signing & Capabilities → Team** and pick your team. Keep "Automatically manage signing" on.
3. In **App Store Connect → Apps → +**, create the app with bundle ID `com.karanja.codekids`, primary category **Education** and SKU `codekids-1`.
4. **Age rating:** answer the questionnaire honestly. There's no user-generated content, chat, ads or purchases, so it should come out as **4+**.
5. **App Privacy:** choose "Data Not Collected". This is accurate because everything stays on the device.
6. **Privacy policy URL:** `https://hinga92.github.io/CodeKids-academy/#privacy`.
7. **Screenshots:** iPhone 6.9" (e.g. iPhone 18 Pro Max simulator) and iPad 13". Run `bash run_ios_simulator.sh "iPhone 18 Pro Max"` and press ⌘S in Simulator.
   - Suggested shots: Home, Dashboard with a child, Next Up + milestones, a project brief, the Curriculum.
8. **Upload:** in Xcode choose **Product → Archive → Distribute App → App Store Connect**. Then test it yourself through **TestFlight**.
9. **Review notes for Apple** (paste into "Notes"):
   > CodeKids Academy is a parent-facing planner for children's coding education. No account is needed. All data is stored on the device. Native features: offline curriculum, weekly local-notification reminders, export of backups/reports via the share sheet, haptics. External links are behind a parental gate (multiplication question).
10. Submit for review. It typically takes 1–3 days.

> **Category choice:** we list in **Education** for parents, **not** the Kids Category. If you later want the Kids Category, everything else is already compliant (no ads, no analytics, grown-up check on links). You'd just select the age band.

## Your checklist: Google Play

1. **Create a Play Console account** at play.google.com/console ($25 one-time) and complete identity verification.
2. **Create an upload key** (keep it safe and back it up; losing it is painful):
   ```bash
   keytool -genkey -v -keystore ~/codekids-upload.jks -alias codekids -keyalg RSA -keysize 2048 -validity 10000
   ```
3. **Build a signed release bundle (.aab).** This is easiest in Android Studio (Build → Generate Signed Bundle), or ask Claude to add a signing config that reads the key from environment variables.
4. **App content forms:**
   - Target audience: **18+ (parents)**, or include under-13 ages only if you opt into the **Families policy**.
   - **Data safety:** no data collected or shared.
   - Ads: none.
   - Privacy policy: the URL above.
5. **Closed testing:** new personal developer accounts must run a closed test with a minimum number of testers (around 12 for 14 continuous days at last check; confirm in Play Console) before production. Recruit pilot families for this (Phase 4).
6. **Store listing:** short and full description, 512×512 icon (`assets/icon-only.png` resized), 1024×500 feature graphic, and phone and tablet screenshots.

## Store listing text (draft)
**Name:** CodeKids Academy: Coding Path
**Subtitle (iOS, 30 chars):** Coding journey for ages 5–18
**Short description (Play, 80 chars):** A parent's guide to coding: 7 stages, 21 projects, standards-aligned, private.

**Description:**
> Guide your child from their first unplugged logic game to building AI apps, with one clear path for ages 5–18.
>
> • 7 stages × 3 levels (Explorer, Builder, Creator) with 42 milestones
> • 21 step-by-step guided projects with "done when" checks
> • Mapped to the CSTA K–12 Computer Science Standards
> • "Next up" suggestions and a portfolio of your child's work
> • Weekly reminder and printable progress reports
> • 40+ hand-picked free and paid resources (Scratch, Code.org, Python, web, AI)
> • Private by design: no account, no ads, no tracking. Data stays on your device.

## Before each release
- [ ] Bump `MARKETING_VERSION` / `CURRENT_PROJECT_VERSION` (Xcode) and `versionName` / `versionCode` (`android/app/build.gradle`)
- [ ] Bump `VERSION` in `sw.js` (website)
- [ ] `npm run sync`, then test on the simulator and an Android device
- [ ] Check every external link still works
