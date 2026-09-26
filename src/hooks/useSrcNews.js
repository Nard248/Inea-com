import { useState, useEffect } from 'react';
import bakedNews from '../data/src-news.json';

// src.am sends no CORS headers, so live news comes through our own same-origin
// proxy (functions/index.js in prod, vite.config.js proxy in dev).
// If it fails we keep the news baked in at build time.
const LIVE_NEWS_API = '/api/src-news';

const stripHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
};

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

const useSrcNews = () => {
  const [posts, setPosts] = useState(bakedNews.news);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(LIVE_NEWS_API, {
          signal: AbortSignal.timeout(12000),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data?.data) || data.data.length === 0) return;

        const live = data.data.filter((i) => i.title_am).map(normalize);
        if (cancelled) return;

        // Merge live items over the baked ones, newest first
        setPosts((baked) => {
          const liveIds = new Set(live.map((p) => p.id));
          return [...live, ...baked.filter((p) => !liveIds.has(p.id))].sort(
            (a, b) => b.date.localeCompare(a.date) || b.id - a.id
          );
        });
      } catch (err) {
        // Keep the baked news, but leave a trace — the old proxies died silently for weeks
        console.warn('[useSrcNews] live news unavailable, showing build-time news:', err.message);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return posts;
};

export default useSrcNews;
