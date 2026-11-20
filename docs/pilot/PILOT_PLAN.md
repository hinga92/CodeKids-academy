# Phase 4: the 4-week family pilot

**Goal:** find out whether real families use CodeKids every week, and fix what gets in their way, before spending money on app stores or new features.

## The question we're answering
> Do parents come back each week and do one coding activity with their child, using CodeKids as their guide?

| Metric | Target | How we measure it (no tracking: families report it) |
|---|---|---|
| **Weekly active families in week 4** | **≥ 60%** | The weekly check-in in the app (Dashboard → 📋 Weekly check-in) |
| Activities per family per week | ≥ 1 | The check-in counts the milestones ticked in the last 7 days |
| Parent confidence (1–5) | Average ≥ 4 by week 4 | A check-in question |
| "Would you recommend it to a friend?" (0–10) | Average ≥ 8 | End-of-pilot interview |
| Biggest blocker | Name the top 3 | Check-in free text + interviews |

## Who to recruit
- **5–10 families** (aim for 8, so that 5 or more finish), with children aged **5–14**.
- Mix:
  - at least 2 families with a 5–7-year-old (stages 0–1, unplugged + ScratchJr)
  - 2 or more with ages 8–11 (Scratch, first Python)
  - 1 or more with ages 12+
- Mix of devices: iPhone/iPad, Android, laptop.
- At least 2 parents who **don't** code themselves. They're the real test.
- **Optional:** one coding club or mentor running it with a small group.

**Where to find them:** friends and neighbours, the school WhatsApp group, church or community groups, the library, and parents at Gianna's school. Use the message in [RECRUITMENT.md](RECRUITMENT.md).

## What families use
| Device | How |
|---|---|
| Any phone, tablet or laptop | **Website:** https://hinga92.github.io/CodeKids-academy/ (Add to Home Screen) |
| Android | You can also install the app directly (the APK from `install_on_android.sh`, or Google Play closed testing once your Play account is ready; pilot families count as your closed testers) |
| iPhone/iPad | Website for now; TestFlight once your Apple Developer account is ready |

## Timeline

| When | You (organiser) | Families |
|---|---|---|
| **Week 0** (setup) | Send the invite, add families to a WhatsApp group, share the [Parent Welcome Guide](PARENT_WELCOME.md) and the printable pack | Open CodeKids, add their child, print the unplugged pack if they have a 5–7-year-old |
| **Kick-off** (20-min call or meetup) | 5-min demo: add a child → Next Up → open a project → tick a milestone | Do their first project during or right after the call |
| **Weeks 1–4** | Sunday: post a reminder in the group. Monday: paste each check-in's `CSV:` line into `pilot_tracker.csv` | One session a week (20–45 min). Send the check-in on Sunday evening |
| **Midpoint** (end of week 2) | Read all feedback; fix the top 1–2 problems and push an update | Keep going |
| **Week 4 end** | 15-min interview with each family ([INTERVIEW_GUIDE.md](INTERVIEW_GUIDE.md)) | Share their favourite project. Optional: a certificate photo |
| **Week 5** | Write up the results: go / no-go for app stores and Phase 5 | — |

## Weekly rhythm (for the WhatsApp group)
- **Sunday 5 pm:** "🚀 Coding time this week! Open CodeKids → your child's *Next up*. Tell us how it went." The app's weekly reminder fires at the same time.
- **Sunday evening:** families tap **📋 Weekly check-in → Share** and send it to you (WhatsApp is easiest).
- **Monday:** paste the `CSV:` line from each check-in as a new row in `pilot_tracker.csv` (the columns match).

## Privacy rules for the pilot
- The check-in contains **no names**: only a family code (e.g. `F03`), ages, stages and counts.
- Families choose their own code; keep the code-to-family list on paper or in your own private notes, not in the repo.
- Don't post children's photos or names in the group without the parents' clear OK.
- At the end, ask families whether they'd like to keep using CodeKids. Their data is already only on their own device.

## Deciding what's next (week 5)
| Result | Decision |
|---|---|
| ≥ 60% active in week 4 **and** confidence ≥ 4 | ✅ Submit to the App Store and Google Play; plan Phase 5 (clubs/sync) only if 2 or more parents ask for it |
| 40–60% active | 🔧 Fix the top 3 blockers, then run a second 4-week round |
| < 40% active | 🔁 Rethink: interview the drop-outs. Is it time, confidence or content? |
