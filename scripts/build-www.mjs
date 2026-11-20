// Copies the web app into www/ for the native (Capacitor) apps and adds the Capacitor runtime.
// The website itself is still served from the repo root by GitHub Pages (no service-worker changes needed).
import { cpSync, rmSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
const files = ['index.html', 'curriculum.js', 'watch.js', 'manifest.json', 'icons', 'printables'];
rmSync('www', { recursive: true, force: true });
mkdirSync('www');
for (const f of files) cpSync(f, `www/${f}`, { recursive: true });
cpSync('node_modules/@capacitor/core/dist/capacitor.js', 'www/capacitor.js');
const html = readFileSync('www/index.html', 'utf8');
const tag = '<script src="curriculum.js"></script>';
if (!html.includes(tag)) throw new Error('index.html: curriculum.js script tag not found');
writeFileSync('www/index.html', html.replace(tag, '<script src="capacitor.js"></script>\n' + tag));
console.log('www/ ready:', [...files, 'capacitor.js'].join(', '));
