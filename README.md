# 🚀 CodeKids Academy

A free, private progress tracker that guides kids aged 5–18 through 7 stages — from unplugged logic games to building AI apps.

- **7 stages × 3 levels** (Explorer, Builder, Creator), 42 milestones mapped to the **CSTA K–12 CS Standards**
- **21 guided projects** with steps, "done when" checks and stretch goals
- **Next Up** suggestions and a **portfolio of proof** in the printable report
- **Kid-safe links** — a grown-up check before opening outside websites
- **Progress dashboard** with badges, stage graduation and printable reports
- **Private by design** — all data stays in the parent's own browser; no accounts, no tracking
- **Installable & offline** — add it to your home screen and it works like an app
- **Backup & restore** — download a backup file and restore it on any device

Live site: https://hinga92.github.io/CodeKids-academy/

## Project files

| File | Purpose |
|---|---|
| `index.html` | The app (HTML, CSS and JavaScript) |
| `curriculum.js` | Stages, milestones, standards, projects and resources (shared with future mobile apps) |
| `docs/STRATEGY.md` | Competitor research, standards, mobile-app plan and roadmap |
| `manifest.json` | Lets phones/computers install it as an app |
| `sw.js` | Service worker — makes the app work offline |
| `icons/` | App icons |
| `ios/`, `android/` | Native iPhone/iPad and Android apps (Capacitor) — see [docs/APP_STORES.md](docs/APP_STORES.md) |
| `assets/` | Source images for app icons & splash screens |
| `scripts/build-www.mjs` | Copies the web app into `www/` for the native apps |

The website has no build step and no server. The native apps are built with `npm run sync` (see [docs/APP_STORES.md](docs/APP_STORES.md)). Open `index.html` to use it locally (offline mode only works when served over http/https).

## Deploying

### GitHub Pages (current setup)
1. Push changes to the `main` branch.
2. In the repo, **Settings → Pages → Source: Deploy from a branch → `main` / root**.
3. The site updates at `https://<username>.github.io/CodeKids-academy/` within a minute or two.

### Netlify / Vercel (alternative)
- **Netlify:** drag the whole project folder onto https://app.netlify.com/drop, or connect the GitHub repo.
- **Vercel:** *Add New → Project*, import the GitHub repo; no settings needed.

### Custom domain
Buy a domain from any registrar (Namecheap, Cloudflare, Porkbun, Squarespace Domains…), then add it in your host's domain settings (GitHub: *Settings → Pages → Custom domain*) and copy the DNS records it gives you to your registrar. HTTPS is set up automatically.

### Releasing an update
When you change `index.html` or `curriculum.js`, also bump `VERSION` in `sw.js` (e.g. `codekids-v3` → `codekids-v4`) so installed copies pick up the new version.

## Privacy summary
Student data (name/nickname, age, avatar, progress, notes) is stored only in the browser's local storage on the device where it's entered. Nothing is sent to any server. See the **Privacy** page in the app for the parent-facing version.

## Roadmap
See [docs/STRATEGY.md](docs/STRATEGY.md). Phases 1–3 are done (web app, curriculum, iOS/Android apps). Next: store submission and the Phase 4 pilot.
