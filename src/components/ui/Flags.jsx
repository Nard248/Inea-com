import { useId } from 'react';

/**
 * Inline SVG flags for the language switcher.
 *
 * We avoid Unicode emoji flags (🇬🇧🇦🇲🇷🇺) because Windows — and many Android
 * browsers — ship no glyphs for regional-indicator pairs, so they fall back to
 * bare letters ("GB") or tofu boxes. Inline SVGs render identically everywhere,
 * need no extra network request, and stay crisp at any size.
 *
 * All flags share a 3:2 viewBox so they line up uniformly in the dropdown.
 */

const STRIPE = 2 / 3; // height of each third in a 3:2 (width:height = 3:2) flag

export const FlagAM = ({ className = '' }) => (
  <svg viewBox="0 0 3 2" className={className} role="img" aria-label="Հայաստան">
    <rect width="3" height={STRIPE} y="0" fill="#D90012" />
    <rect width="3" height={STRIPE} y={STRIPE} fill="#0033A0" />
    <rect width="3" height={STRIPE} y={STRIPE * 2} fill="#F2A800" />
  </svg>
);

export const FlagRU = ({ className = '' }) => (
  <svg viewBox="0 0 3 2" className={className} role="img" aria-label="Россия">
    <rect width="3" height="2" fill="#fff" />
    <rect width="3" height={STRIPE} y={STRIPE} fill="#0039A6" />
    <rect width="3" height={STRIPE} y={STRIPE * 2} fill="#D52B1E" />
  </svg>
);

export const FlagGB = ({ className = '' }) => {
  // useId keeps the clip-path IDs unique so multiple flags on one page (button,
  // dropdown item, mobile menu) don't collide and break each other's clipping.
  const uid = useId().replace(/[:]/g, '');
  const clipFull = `gb-full-${uid}`;
  const clipDiag = `gb-diag-${uid}`;
  return (
    <svg viewBox="0 0 60 40" className={className} role="img" aria-label="English">
      <clipPath id={clipFull}>
        <rect width="60" height="40" />
      </clipPath>
      <clipPath id={clipDiag}>
        <path d="M30,20 L60,0 V0 H60 M30,20 L60,40 V40 H30 M30,20 L0,40 H0 V40 M30,20 L0,0 H0 V0" />
      </clipPath>
      <g clipPath={`url(#${clipFull})`}>
        <rect width="60" height="40" fill="#012169" />
        {/* White diagonals */}
        <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8" />
        {/* Red diagonals, counterchanged via the diagonal clip */}
        <path
          d="M0,0 L60,40 M60,0 L0,40"
          clipPath={`url(#${clipDiag})`}
          stroke="#C8102E"
          strokeWidth="5"
        />
        {/* White cross */}
        <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="13" />
        {/* Red cross */}
        <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="8" />
      </g>
    </svg>
  );
};

/** Map of language code → flag component, consumed by the LanguageSwitcher. */
export const FLAGS = {
  en: FlagGB,
  hy: FlagAM,
  ru: FlagRU,
};
