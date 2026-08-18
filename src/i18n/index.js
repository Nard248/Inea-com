import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import hy from './locales/hy.json';
import ru from './locales/ru.json';

const resources = {
  en: { translation: en },
  hy: { translation: hy },
  ru: { translation: ru },
};

// The URL is the single source of truth for language (/ = hy, /en, /ru).
// Reading it here — before React renders — means a direct load of /en/...
// paints English on the very first frame; LanguageLayout in App.jsx keeps the
// language in sync on later client-side navigations. No browser-based
// detection: crawlers must see the same content at a URL as every visitor.
const urlLang = window.location.pathname.match(/^\/(en|ru)(\/|$)/)?.[1] || 'hy';

i18n.use(initReactI18next).init({
  resources,
  lng: urlLang,
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

// Keep <html lang> in sync with the active language (screen readers and
// search engines read it; index.html ships a static lang="hy" default).
document.documentElement.lang = i18n.language;
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
});

export default i18n;
