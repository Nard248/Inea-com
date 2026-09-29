import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { SITE_URL } from './Seo';
import { localizePath } from './LocalizedLink';
import contactInfo from '../data/contact';
import { services } from '../data/services';

const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Site-wide schema.org data, rendered on every page in the active language.
 * Tells search engines INEA is a local accounting business (address, hours,
 * phones, languages, services) and gives the site its display name in results.
 * Built from contact.js + the locale files so it never drifts from the page.
 */
const StructuredData = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const homeUrl = `${SITE_URL}${localizePath('/', lang)}`;

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AccountingService',
        '@id': BUSINESS_ID,
        name: 'INEA',
        url: homeUrl,
        logo: `${SITE_URL}/Logo.png`,
        image: `${SITE_URL}/Logo.png`,
        description: t('seo.home.description'),
        email: contactInfo.email,
        telephone: contactInfo.phones.map((p) => p.href.replace('tel:', '')),
        address: {
          '@type': 'PostalAddress',
          streetAddress: contactInfo.address.street,
          addressLocality: contactInfo.address.city,
          addressCountry: contactInfo.address.country,
        },
        areaServed: { '@type': 'Country', name: 'Armenia' },
        knowsLanguage: ['hy', 'en', 'ru'],
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: contactInfo.openingHours.days,
          opens: contactInfo.openingHours.opens,
          closes: contactInfo.openingHours.closes,
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: t('seo.services.title'),
          itemListElement: services.map((s) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: t(`services.${s.id}.title`),
              url: `${SITE_URL}${localizePath(`/services/${s.id}`, lang)}`,
            },
          })),
        },
        sameAs: [
          contactInfo.social.facebook,
          contactInfo.social.instagram,
          contactInfo.social.linkedin,
        ],
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: 'INEA',
        url: `${SITE_URL}/`,
        inLanguage: lang,
        publisher: { '@id': BUSINESS_ID },
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
};

export default StructuredData;
