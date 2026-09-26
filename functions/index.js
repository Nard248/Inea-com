/**
 * Same-origin proxy for src.am news, served by Firebase Hosting at /api/src-news.
 *
 * src.am sends no CORS headers, so the browser can't call it directly. This
 * function forwards page 1 of the news feed untouched (useSrcNews normalizes it)
 * and lets the Hosting CDN cache the response, so src.am is hit at most once
 * per cache window no matter how much traffic the blog gets.
 */
import { onRequest } from 'firebase-functions/v2/https';

const SRC_API = 'https://www.src.am/am/getNews1?lang=am&page=1';

// Browsers revalidate after 1 min; the Hosting CDN serves its copy for 5 min.
const CACHE_OK = 'public, max-age=60, s-maxage=300';

export const srcNews = onRequest(
  // Closest region to src.am (Armenia); keep in sync with firebase.json rewrite
  { region: 'europe-west1', memory: '128MiB', maxInstances: 5 },
  async (req, res) => {
    try {
      const upstream = await fetch(SRC_API, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(10000),
      });
      if (!upstream.ok) throw new Error(`src.am HTTP ${upstream.status}`);

      const data = await upstream.json();
      if (!Array.isArray(data?.data)) throw new Error('src.am returned an unexpected shape');

      res.set('Cache-Control', CACHE_OK).json(data);
    } catch (err) {
      console.error('srcNews proxy failed:', err.message);
      // Never cache failures — the client falls back to the news baked at build time
      res.set('Cache-Control', 'no-store').status(502).json({ error: 'upstream unavailable' });
    }
  }
);
