/**
 * Single source of truth for the site's URL space, shared by the sitemap
 * generator and the prerenderer. Mirrors the app router in src/App.jsx:
 * Armenian at the root, English and Russian under a path prefix.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = join(dirname(fileURLToPath(import.meta.url)), '..');
export const SITE_URL = 'https://inea.am';

export const LANG_PREFIXES = { hy: '', en: '/en', ru: '/ru' };

const STATIC_ROUTES = [
  '/',
  '/services',
  '/industries',
  '/calculators',
  '/pricing',
  '/blog',
  '/about',
  '/contact',
];

// services.js is an ES module with JSX-free data; extract ids by regex to avoid
// importing app code (which may rely on Vite-only features) into a node script.
const servicesSource = readFileSync(join(root, 'src/data/services.js'), 'utf8');
const serviceIds = [...servicesSource.matchAll(/id:\s*'([a-z-]+)'/g)].map((m) => m[1]);

export const routes = [...STATIC_ROUTES, ...serviceIds.map((id) => `/services/${id}`)];

/** '/services' in 'en' → '/en/services'; '/' in 'en' → '/en' */
export const localizedPath = (lang, route) => {
  const prefix = LANG_PREFIXES[lang];
  if (route === '/') return prefix || '/';
  return `${prefix}${route}`;
};

export const localizedUrl = (lang, route) => `${SITE_URL}${localizedPath(lang, route)}`;

/** every path of the site: 16 pages × 3 languages */
export const allPaths = routes.flatMap((route) =>
  Object.keys(LANG_PREFIXES).map((lang) => localizedPath(lang, route)),
);
