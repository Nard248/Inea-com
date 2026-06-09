/**
 * Armenian salary / payroll tax computation.
 *
 * Modelled on the public b24.am salary calculator and current RA legislation.
 * All amounts are monthly and in AMD. Keeping the maths here (separate from the
 * React component) makes the gross↔net inversion trivial and the rules easy to
 * audit against the law.
 *
 * Deductions from the employee's gross salary:
 *   1. Income tax        — 20% flat, or 10% for certified IT-sector employees.
 *   2. Funded pension     — only for participants born in 1974 or later.
 *   3. Stamp duty         — military support fund, fixed amount per gross bracket.
 *   4. Healthcare insurance — mandatory contribution for participants aged 18–65.
 */

export const INCOME_TAX_STANDARD = 0.2;
export const INCOME_TAX_IT = 0.1;

export const PENSION_MODES = {
  MANDATORY: 'mandatory', // mandatory, or voluntary joined before 07/2018
  VOLUNTARY: 'voluntary', // voluntary joined after 07/2018
  NONE: 'none',
};

// Funded-pension contribution base cap (15 × minimum salary = 1,125,000 AMD).
const PENSION_BASE_CAP = 1125000;

/** Funded pension contribution (employee portion). */
function pensionPayment(gross, { pensionMode, birthYear, currentYear }) {
  // The funded system is mandatory only for those born in 1974 or later.
  const eligible = birthYear && birthYear >= 1974 && (currentYear - birthYear) >= 18;
  if (!eligible || pensionMode === PENSION_MODES.NONE) return 0;

  if (pensionMode === PENSION_MODES.VOLUNTARY) {
    // Flat 5% of the base, capped at 5% × 1,125,000 = 56,250.
    return Math.min(gross, PENSION_BASE_CAP) * 0.05;
  }

  // Mandatory / pre-07/2018 voluntary: 5% up to 500k, then 10% − 25,000, capped.
  if (gross <= 500000) return gross * 0.05;
  if (gross <= PENSION_BASE_CAP) return gross * 0.1 - 25000;
  return PENSION_BASE_CAP * 0.1 - 25000; // 87,500
}

/** Military support fund stamp duty — fixed amount by monthly gross bracket. */
function stampDuty(gross) {
  if (gross <= 0) return 0;
  if (gross <= 100000) return 1500;
  if (gross <= 200000) return 3000;
  if (gross <= 500000) return 5500;
  if (gross <= 1000000) return 8500;
  return 15000;
}

/** Mandatory healthcare insurance — participants aged 18–65, by gross bracket. */
function healthcareInsurance(gross, { birthYear, currentYear }) {
  const age = birthYear ? currentYear - birthYear : 30;
  if (age < 18 || age > 65) return 0;
  if (gross <= 200000) return 0;
  if (gross <= 500000) return 4800;
  return 10800;
}

/**
 * Compute the full breakdown from a gross salary.
 * @returns {{gross, incomeTax, pension, stampDuty, healthcare, totalDeductions, net}}
 */
export function computeFromGross(gross, options = {}) {
  const {
    birthYear = null,
    pensionMode = PENSION_MODES.MANDATORY,
    itSector = false,
    currentYear = 2025,
  } = options;

  const g = Math.max(0, Number(gross) || 0);
  if (g <= 0) {
    return { gross: 0, incomeTax: 0, pension: 0, stampDuty: 0, healthcare: 0, totalDeductions: 0, net: 0 };
  }

  const ctx = { pensionMode, birthYear, currentYear };
  const incomeTax = g * (itSector ? INCOME_TAX_IT : INCOME_TAX_STANDARD);
  const pension = pensionPayment(g, ctx);
  const stamp = stampDuty(g);
  const healthcare = healthcareInsurance(g, ctx);
  const totalDeductions = incomeTax + pension + stamp + healthcare;

  return {
    gross: Math.round(g),
    incomeTax: Math.round(incomeTax),
    pension: Math.round(pension),
    stampDuty: Math.round(stamp),
    healthcare: Math.round(healthcare),
    totalDeductions: Math.round(totalDeductions),
    net: Math.round(g - totalDeductions),
  };
}

/**
 * Invert the calculation: find the gross salary that yields a target net.
 * Net is monotonically increasing in gross, so a binary search converges fast.
 */
export function computeFromNet(targetNet, options = {}) {
  const net = Math.max(0, Number(targetNet) || 0);
  if (net <= 0) return computeFromGross(0, options);

  let low = net;          // gross is always ≥ net
  let high = net * 3 + 100000; // generous upper bound covering all brackets
  for (let i = 0; i < 60; i += 1) {
    const mid = (low + high) / 2;
    const { net: midNet } = computeFromGross(mid, options);
    if (midNet < net) low = mid;
    else high = mid;
  }
  return computeFromGross(Math.round(high), options);
}
