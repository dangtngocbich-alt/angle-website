import { readFileSync, writeFileSync, mkdirSync, cpSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => readFileSync(resolve(root, path), 'utf8');
const manifest = JSON.parse(read('src/sources.json'));
const join = paths => paths.map(path => read(`src/${path}`).trim()).join('\n');
let html = read('src/index.html');
const replacements = {
  HEADER: read('src/layout/header.html').trim(),
  FOOTER: read('src/layout/footer.html').trim(),
  DIALOGS: read('src/components/dialogs.html').trim(),
  STYLES: join(manifest.styles),
  SCRIPT: join(manifest.scripts),
};
for (const [name, content] of Object.entries(replacements)) {
  html = html.replace(`{{${name}}}`, () => content);
}
if (/\{\{[A-Z]+\}\}/.test(html)) throw new Error('Unresolved shell placeholder');
mkdirSync(resolve(root, 'dist'), { recursive: true });
cpSync(resolve(root, 'public/assets'), resolve(root, 'dist/assets'), { recursive: true });
writeFileSync(resolve(root, 'dist/index.html'), html);

const mime = { png: 'image/png', svg: 'image/svg+xml', ttf: 'font/ttf' };
let standalone = html;
const assets = [...new Set(html.match(/assets\/[A-Za-z0-9_.-]+/g))].sort((a, b) => b.length - a.length);
for (const asset of assets) {
  const bytes = readFileSync(resolve(root, 'public', asset));
  const type = mime[asset.split('.').pop()];
  if (!type) throw new Error(`Unknown asset type: ${asset}`);
  standalone = standalone.replaceAll(asset, `data:${type};base64,${bytes.toString('base64')}`);
}
writeFileSync(resolve(root, 'dist/angle.html'), standalone);
console.log(`Built ${manifest.scripts.length} scripts and ${manifest.styles.length} stylesheets.`);
