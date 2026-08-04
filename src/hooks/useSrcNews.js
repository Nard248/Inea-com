import { useState, useEffect } from 'react';
import bakedNews from '../data/src-news.json';

const SRC_API = 'https://www.src.am/am/getNews1?lang=am&page=1';

// src.am sends no CORS headers, so live refresh goes through public proxies.
// If they all fail we silently keep the news baked in at build time.
const PROXIES = [
  (url) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
];

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
      for (const proxy of PROXIES) {
        try {
          const res = await fetch(proxy(SRC_API), {
            signal: AbortSignal.timeout(8000),
          });
          if (!res.ok) continue;
          const data = await res.json();
          if (!Array.isArray(data?.data) || data.data.length === 0) continue;

          const live = data.data.filter((i) => i.title_am).map(normalize);
          if (cancelled) return;

          // Merge live items over the baked ones, newest first
          setPosts((baked) => {
            const liveIds = new Set(live.map((p) => p.id));
            return [...live, ...baked.filter((p) => !liveIds.has(p.id))].sort(
              (a, b) => b.date.localeCompare(a.date) || b.id - a.id
            );
          });
          return;
        } catch {
          // proxy down or timed out — try the next one
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return posts;
};

export default useSrcNews;
