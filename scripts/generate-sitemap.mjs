/**
 * Generates dist/sitemap.xml after `vite build` (runs as the postbuild script).
 * Every language variant is its own <url>, and each carries the full set of
 * hreflang alternates (Google requires the links to be reciprocal).
 */
import { writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { root, routes, LANG_PREFIXES, localizedUrl } from './routes.mjs';

const today = new Date().toISOString().slice(0, 10);

const urlEntry = (lang, route) => {
  const alternates = Object.keys(LANG_PREFIXES)
    .map(
      (l) =>
        `    <xhtml:link rel="alternate" hreflang="${l}" href="${localizedUrl(l, route)}"/>`,
    )
    .join('\n');
  return `  <url>
    <loc>${localizedUrl(lang, route)}</loc>
    <lastmod>${today}</lastmod>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${localizedUrl('en', route)}"/>
  </url>`;
};

const entries = routes.flatMap((route) =>
  Object.keys(LANG_PREFIXES).map((lang) => urlEntry(lang, route)),
);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;

const distDir = join(root, 'dist');
if (!existsSync(distDir)) {
  console.error('✗ dist/ not found — run `vite build` first');
  process.exit(1);
}
writeFileSync(join(distDir, 'sitemap.xml'), xml);
console.log(`✓ sitemap.xml written with ${entries.length} URLs (${routes.length} pages × 3 languages)`);
