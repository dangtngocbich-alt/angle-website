import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import vm from 'node:vm';

const read = path => readFileSync(resolve(path), 'utf8');
const manifest = JSON.parse(read('src/sources.json'));
const script = manifest.scripts.map(path => read(`src/${path}`)).join('\n');

test('all JavaScript compiles after the split', () => {
  for (const path of manifest.scripts) new vm.Script(read(`src/${path}`), { filename: path });
  new vm.Script(script);
});

test('every page remains identical in EN and VI', () => {
  const paths = manifest.scripts.filter(path =>
    !['main.js', 'core/router.js', 'features/events.js', 'features/camera-demo.js',
      'features/carousel.js', 'features/contact-form.js', 'core/preferences.js', 'core/toast.js'].includes(path));
  const context = vm.createContext({ localStorage: { getItem: () => null } });
  vm.runInContext(paths.map(path => read(`src/${path}`)).join('\n'), context);
  const baseline = JSON.parse(read('tests/view-baseline.json'));
  for (const [key, expected] of Object.entries(baseline)) {
    const split = key.indexOf(':');
    const language = key.slice(0, split);
    const expression = key.slice(split + 1);
    vm.runInContext(`lang = '${language}'`, context);
    const html = vm.runInContext(expression, context);
    const actual = createHash('sha256').update(html).digest('hex');
    assert.equal(actual, expected, key);
  }
});

test('build has no missing assets or unresolved placeholders', () => {
  const html = read('dist/index.html');
  assert.doesNotMatch(html, /\{\{(?:HEADER|FOOTER|DIALOGS|STYLES|SCRIPT)\}\}/);
  for (const asset of new Set(html.match(/assets\/[A-Za-z0-9_.-]+/g))) {
    assert.ok(existsSync(`dist/${asset}`), asset);
    assert.ok(readFileSync(`dist/${asset}`).length > 200, asset);
  }
  assert.doesNotMatch(read('dist/angle.html'), /(?:src=["']|url\(["']?)assets\//);
  assert.match(html, /\.header\{backdrop-filter:none;-webkit-backdrop-filter:none\}/);
});
