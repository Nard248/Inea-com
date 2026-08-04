/**
 * Canonical contact information for INEA.
 *
 * Single source of truth so phone numbers, email and social links never drift
 * between the Navbar, Footer, CTA, Contact form and Service detail pages.
 * Localized values (address text, business hours) stay in the i18n locale files;
 * everything language-independent lives here.
 */

// Digits-only helpers keep the `tel:` / `wa.me` / `t.me` targets in sync with the
// human-readable strings below.
const PHONE_PRIMARY_DIGITS = '37491025555';
const PHONE_SECONDARY_DIGITS = '37443008787';

export const contactInfo = {
  phones: [
    { display: '+374 91 02-55-55', href: `tel:+${PHONE_PRIMARY_DIGITS}` },
    { display: '+374 43 00-87-87', href: `tel:+${PHONE_SECONDARY_DIGITS}` },
  ],
  email: 'info@inea.am',
  emailHref: 'mailto:info@inea.am',
  // Street address is kept here for the maps link; the localized label lives in
  // i18n under contact.info.addressValue.
  mapsQuery: 'Adonts Street 2, Yerevan, Armenia',
  social: {
    facebook: 'https://www.facebook.com/share/1Cz7c6e6qJ/?mibextid=wwXIfr',
    instagram: 'https://www.instagram.com/inea_accounting/',
    linkedin: 'https://www.linkedin.com/company/108498438/',
    telegram: `https://t.me/+${PHONE_PRIMARY_DIGITS}`,
    whatsapp: `https://wa.me/${PHONE_PRIMARY_DIGITS}`,
    viber: `viber://chat?number=+${PHONE_PRIMARY_DIGITS}`,
  },
};

// Convenience accessor for the many places that only need the main number.
export const primaryPhone = contactInfo.phones[0];

export default contactInfo;
