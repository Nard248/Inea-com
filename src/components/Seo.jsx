import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { LANGS, localizePath, delocalizePath } from './LocalizedLink';

export const SITE_URL = 'https://inea.am';

const OG_LOCALES = { en: 'en_US', hy: 'hy_AM', ru: 'ru_RU' };

/**
 * Per-route SEO meta. Renders title, description, canonical URL, hreflang
 * alternates and social (Open Graph / Twitter) tags for the current path.
 * `title` is the page part only — the INEA brand suffix is appended here so
 * it never drifts.
 */
const Seo = ({ title, description, image = `${SITE_URL}/Logo.png` }) => {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();

  const fullTitle = `${title} | INEA`;
  const canonical = `${SITE_URL}${pathname}`;
  const ogLocale = OG_LOCALES[i18n.language] || OG_LOCALES.en;

  // The same page in every language, for hreflang cross-linking. Google
  // treats the set as translations of one document rather than duplicates.
  const basePath = delocalizePath(pathname);
  const alternateUrl = (lang) => `${SITE_URL}${localizePath(basePath, lang)}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {LANGS.map((lang) => (
        <link key={lang} rel="alternate" hreflang={lang} href={alternateUrl(lang)} />
      ))}
      {/* Visitors from unmatched languages get the English version */}
      <link rel="alternate" hreflang="x-default" href={alternateUrl('en')} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="INEA" />
      <meta property="og:locale" content={ogLocale} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default Seo;
