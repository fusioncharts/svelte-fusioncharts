/**
 * Packaging smoke test.
 *
 * The example apps depend on the wrapper via `file:../..`, which npm resolves as a
 * SYMLINK to the repo root. That means they see the whole working tree and will
 * happily build even if the published `files` allowlist is missing something. A
 * real `npm install` would then break for every consumer.
 *
 * This script packs the tarball npm would actually publish and asserts that
 * everything the package needs is inside it:
 *   - every path referenced by `files`, `exports`, `svelte` and `types`
 *   - every relative import reachable from the entry component
 *
 * Run with `npm run verify:package`.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, rmSync } from 'node:fs';
import { dirname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8'));

const run = (cmd, args) =>
  execFileSync(cmd, args, { cwd: repoRoot, encoding: 'utf8' }).trim();

// `npm pack --json` reports the filename without writing anything we can't clean up.
const packed = JSON.parse(run('npm', ['pack', '--json', '--silent']));
const tarball = packed[0].filename;

let entries;
try {
  entries = new Set(
    run('tar', ['-tzf', tarball])
      .split('\n')
      // every path in an npm tarball is prefixed with `package/`
      .map((line) => line.replace(/^package\//, ''))
      .filter(Boolean)
  );
} finally {
  rmSync(join(repoRoot, tarball), { force: true });
}

const errors = [];
const expect = (path, why) => {
  if (!entries.has(path)) errors.push(`missing ${path} (${why})`);
};

// 1. Declared entry points must ship.
for (const [field, value] of [
  ['svelte', pkg.svelte],
  ['types', pkg.types]
]) {
  if (value) expect(normalize(value).replace(/^\.\//, ''), `package.json "${field}"`);
}

for (const [subpath, conditions] of Object.entries(pkg.exports ?? {})) {
  const targets =
    typeof conditions === 'string' ? [conditions] : Object.values(conditions);
  for (const target of new Set(targets)) {
    // package.json is always published, no need to assert it
    if (target === './package.json') continue;
    expect(normalize(target).replace(/^\.\//, ''), `exports "${subpath}"`);
  }
}

// 2. Follow relative imports from the entry component so a forgotten sibling
//    module (events.js, utils.js, ...) fails here rather than in a consumer's build.
const entry = normalize(pkg.svelte ?? './src/index.svelte').replace(/^\.\//, '');
const seen = new Set();
const queue = [entry];

while (queue.length) {
  const current = queue.pop();
  if (seen.has(current)) continue;
  seen.add(current);

  let source;
  try {
    source = readFileSync(join(repoRoot, current), 'utf8');
  } catch {
    continue; // already reported as missing above
  }

  const specifiers = [...source.matchAll(/(?:from|import)\s*['"](\.[^'"]+)['"]/g)];
  for (const [, specifier] of specifiers) {
    const resolved = normalize(join(dirname(current), specifier));
    expect(resolved, `imported by ${current}`);
    queue.push(resolved);
  }
}

if (errors.length) {
  console.error(`\n${pkg.name}@${pkg.version} tarball is incomplete:\n`);
  for (const error of errors) console.error(`  - ${error}`);
  console.error('\nCheck the "files" array in package.json.\n');
  process.exit(1);
}

console.log(
  `${pkg.name}@${pkg.version}: tarball contains all ${entries.size} expected files.`
);
