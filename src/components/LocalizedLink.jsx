import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// URL language scheme: Armenian (primary market) lives at the root,
// English and Russian under a path prefix. hreflang links tie them together.
export const LANGS = ['hy', 'en', 'ru'];
export const DEFAULT_LANG = 'hy';

export const langPrefix = (lang) => (lang === DEFAULT_LANG ? '' : `/${lang}`);

/** '/services' + 'en' → '/en/services'; '/' + 'en' → '/en'; hy paths unchanged */
export const localizePath = (path, lang) => {
  if (!path.startsWith('/')) return path;
  const prefix = langPrefix(LANGS.includes(lang) ? lang : DEFAULT_LANG);
  if (!prefix) return path;
  return path === '/' ? prefix : `${prefix}${path}`;
};

/** '/en/services' → '/services'; '/ru' → '/'; hy paths unchanged */
export const delocalizePath = (pathname) =>
  pathname.replace(/^\/(en|ru)(?=\/|$)/, '') || '/';

/**
 * Drop-in replacement for react-router's Link: string `to` paths are written
 * language-neutral (e.g. "/services") and get the active language's URL
 * prefix applied automatically.
 */
const LocalizedLink = forwardRef(({ to, ...props }, ref) => {
  const { i18n } = useTranslation();
  const target = typeof to === 'string' ? localizePath(to, i18n.language) : to;
  return <RouterLink ref={ref} to={target} {...props} />;
});

LocalizedLink.displayName = 'LocalizedLink';

export default LocalizedLink;
