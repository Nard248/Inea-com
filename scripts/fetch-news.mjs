#!/usr/bin/env node
/**
 * Fetches the latest tax news from the Armenian State Revenue Committee (src.am)
 * and bakes them into src/data/src-news.json for the Blog page.
 *
 * Fail-soft: if src.am is unreachable but a previous JSON exists, the old data
 * is kept and the build continues.
 *
 * Run manually:  npm run fetch-news
 * Runs automatically before `npm run build` (prebuild hook).
 */
import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const API = 'https://www.src.am/am/getNews1?lang=am&page=';
const PAGES = 2; // 15 items per page
const OUT = join(dirname(fileURLToPath(import.meta.url)), '../src/data/src-news.json');

const stripHtml = (html) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#?\w+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const normalize = (item) => {
  // Gallery entries can also be video embed URLs — only site-relative paths are images
  const images = (item.gallery ?? []).filter((g) => g.path?.startsWith('/'));
  const mainImage = images.find((g) => g.main) ?? images[0];
  const text = stripHtml(item.desc_am ?? '');
  return {
    id: item.id,
    date: item.date,
    title: item.title_am,
    excerpt: text.length > 220 ? `${text.slice(0, 220).trimEnd()}…` : text,
    html: item.desc_am ?? '',
    image: mainImage ? `https://www.src.am${encodeURI(mainImage.path)}` : null,
  };
};

try {
  const pages = await Promise.all(
    Array.from({ length: PAGES }, (_, i) =>
      fetch(`${API}${i + 1}`, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(20000),
      }).then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
    )
  );

  const news = pages
    .flatMap((p) => p.data)
    .filter((item) => item.title_am)
    .map(normalize);

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify({ fetchedAt: new Date().toISOString(), news }, null, 2));
  console.log(`✓ Saved ${news.length} news items to src/data/src-news.json`);
} catch (err) {
  if (existsSync(OUT)) {
    const { news } = JSON.parse(readFileSync(OUT, 'utf8'));
    console.warn(`⚠ src.am unreachable (${err.message}); keeping ${news.length} previously fetched items`);
  } else {
    console.error(`✗ src.am unreachable (${err.message}) and no cached news exists`);
    process.exit(1);
  }
}
