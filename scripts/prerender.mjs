/**
 * Prerenders every site URL to static HTML after `vite build`.
 *
 * Serves the built dist/ with `vite preview`, loads each of the 48 URLs in
 * headless Chromium, waits for the page (including react-helmet meta) to
 * settle, and snapshots the DOM into dist/<path>/index.html. Firebase Hosting
 * serves these exact files before falling back to the SPA rewrite, so
 * crawlers and social scrapers get full per-page HTML without running any
 * JavaScript — and browsers paint real content while the JS bundle loads.
 * When React boots it re-renders the same view, and helmet reconciles the
 * data-rh meta tags it finds instead of duplicating them.
 */
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from '@playwright/test';
import { root, allPaths } from './routes.mjs';

const PORT = 4174;
const ORIGIN = `http://localhost:${PORT}`;

const distDir = join(root, 'dist');
if (!existsSync(distDir)) {
  console.error('✗ dist/ not found — run `vite build` first');
  process.exit(1);
}

const preview = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
  cwd: root,
  stdio: 'ignore',
});

const stop = () => {
  if (!preview.killed) preview.kill();
};
process.on('exit', stop);

try {
  // wait for the preview server to accept connections
  let up = false;
  for (let i = 0; i < 50 && !up; i++) {
    up = await fetch(ORIGIN)
      .then((r) => r.ok)
      .catch(() => false);
    if (!up) await new Promise((r) => setTimeout(r, 200));
  }
  if (!up) throw new Error(`vite preview did not start on :${PORT}`);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const path of allPaths) {
    await page.goto(`${ORIGIN}${path}`, { waitUntil: 'networkidle' });
    // helmet applies the per-route title after hydration — wait for it so the
    // snapshot contains the final meta, not index.html's static fallback
    await page.waitForFunction(() => document.title.includes('| INEA'), null, {
      timeout: 15000,
    });
    const html = `<!doctype html>\n${await page.evaluate(
      () => document.documentElement.outerHTML,
    )}`;

    const outDir = path === '/' ? distDir : join(distDir, path.slice(1));
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html);
  }

  await browser.close();
  console.log(`✓ prerendered ${allPaths.length} pages into dist/`);
} finally {
  stop();
}
