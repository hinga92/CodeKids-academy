# 🚀 CodeKids Academy

A free, private progress tracker that guides kids aged 5–18 through 7 stages — from unplugged logic games to building AI apps.

- **7 stages, 42 milestones**, curated resources, activities and project ideas
- **Progress dashboard** with badges, stage graduation and printable reports
- **Private by design** — all data stays in the parent's own browser; no accounts, no tracking
- **Installable & offline** — add it to your home screen and it works like an app
- **Backup & restore** — download a backup file and restore it on any device

Live site: https://hinga92.github.io/CodeKids-academy/

## Project files

| File | Purpose |
|---|---|
| `index.html` | The whole app (HTML, CSS and JavaScript) |
| `manifest.json` | Lets phones/computers install it as an app |
| `sw.js` | Service worker — makes the app work offline |
| `icons/` | App icons |

There is no build step and no server. Open `index.html` to use it locally (offline mode only works when served over http/https).

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
When you change `index.html`, also bump `VERSION` in `sw.js` (e.g. `codekids-v2` → `codekids-v3`) so installed copies pick up the new version.

## Privacy summary
Student data (name/nickname, age, avatar, progress, notes) is stored only in the browser's local storage on the device where it's entered. Nothing is sent to any server. See the **Privacy** page in the app for the parent-facing version.

## Roadmap
- **Phase 1 (done):** bug fixes, safe data handling, stage graduation, offline/installable app, backup reminders, privacy page, age-limit labels.
- **Phase 2:** choose the audience (parents at home vs. coding clubs), run a 4-week pilot with 5–10 families.
- **Phase 3:** original lesson content, parent guides per activity, optional AI helper for parents.
