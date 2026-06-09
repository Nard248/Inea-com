import { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  HiSwitchVertical,
  HiCalculator,
  HiInformationCircle,
  HiRefresh,
} from 'react-icons/hi';

/**
 * Currency converter with live exchange rates.
 *
 * Rates are fetched from the free, key-less open.er-api.com endpoint (CORS
 * enabled, works from static hosting). If the request fails we fall back to a
 * hardcoded approximate table so the tool always returns a usable result —
 * surfaced to the user via the "unavailable" notice rather than failing
 * silently.
 */

// Currencies offered in the selectors. AMD first since this is an Armenian site.
const CURRENCIES = ['AMD', 'USD', 'EUR', 'RUB', 'GBP', 'GEL', 'CHF', 'AED'];

// Approximate fallback rates expressed as units per 1 USD.
const FALLBACK_RATES = {
  USD: 1,
  AMD: 387,
  EUR: 0.92,
  RUB: 92,
  GBP: 0.79,
  GEL: 2.7,
  CHF: 0.88,
  AED: 3.67,
};

const CurrencyConverter = () => {
  const { t } = useTranslation();

  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('AMD');
  const [rates, setRates] = useState(FALLBACK_RATES);
  const [status, setStatus] = useState('loading'); // 'loading' | 'live' | 'fallback'
  const [updatedAt, setUpdatedAt] = useState('');

  const loadRates = useCallback(async () => {
    setStatus('loading');
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.result !== 'success' || !data.rates) {
        throw new Error('Unexpected response shape');
      }
      setRates(data.rates);
      setStatus('live');
      setUpdatedAt(data.time_last_update_utc?.slice(0, 16) || '');
    } catch {
      // Network/API failure — keep the fallback table and tell the user.
      setRates(FALLBACK_RATES);
      setStatus('fallback');
    }
  }, []);

  useEffect(() => {
    loadRates();
  }, [loadRates]);

  // result = amount × rate(to) / rate(from); base-currency independent.
  const result = useMemo(() => {
    const value = parseFloat(amount) || 0;
    const rateFrom = rates[from];
    const rateTo = rates[to];
    if (!rateFrom || !rateTo) return 0;
    return (value * rateTo) / rateFrom;
  }, [amount, from, to, rates]);

  const unitRate = useMemo(() => {
    const rateFrom = rates[from];
    const rateTo = rates[to];
    if (!rateFrom || !rateTo) return 0;
    return rateTo / rateFrom;
  }, [from, to, rates]);

  const formatNumber = (value, currency) =>
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: currency === 'AMD' ? 0 : 2,
      maximumFractionDigits: currency === 'AMD' ? 0 : 2,
    }).format(value);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const renderSelect = (value, onChange, label) => (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-3 pl-4 pr-10 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      >
        {CURRENCIES.map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
        {/* Header */}
        <div className="px-6 py-8 text-white bg-gradient-to-r from-blue-600 to-indigo-600 sm:px-10">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/20">
              <HiCalculator className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{t('calculators.currency.title')}</h2>
              <p className="mt-1 text-blue-100">{t('calculators.currency.subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 sm:p-10">
          {/* Amount */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {t('calculators.currency.amount')}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full py-3 px-4 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* From / Swap / To */}
          <div className="grid items-end gap-4 sm:grid-cols-[1fr_auto_1fr]">
            {renderSelect(from, setFrom, t('calculators.currency.from'))}
            <button
              onClick={handleSwap}
              className="flex items-center justify-center w-12 h-12 mx-auto text-gray-500 transition-colors bg-gray-100 rounded-xl hover:bg-primary-50 hover:text-primary-600"
              aria-label={t('calculators.currency.swap')}
            >
              <HiSwitchVertical className="w-5 h-5 rotate-90" />
            </button>
            {renderSelect(to, setTo, t('calculators.currency.to'))}
          </div>

          {/* Result */}
          <motion.div
            key={`${from}-${to}-${result}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 mt-8 text-center border bg-primary-50 border-primary-100 rounded-2xl"
          >
            <p className="text-sm font-medium text-gray-500">
              {t('calculators.currency.result')}
            </p>
            <p className="mt-1 text-3xl font-bold text-primary-700 sm:text-4xl">
              {formatNumber(result, to)}{' '}
              <span className="text-lg font-semibold text-primary-500">{to}</span>
            </p>
            {unitRate > 0 && (
              <p className="mt-2 text-sm text-gray-500">
                {t('calculators.currency.rate')}: 1 {from} = {formatNumber(unitRate, to)} {to}
              </p>
            )}
          </motion.div>

          {/* Status / refresh */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
            <p className="text-xs text-gray-500">
              {status === 'loading' && t('calculators.currency.loading')}
              {status === 'live' &&
                `${t('calculators.currency.updated')}${updatedAt ? `: ${updatedAt} UTC` : ''}`}
              {status === 'fallback' && (
                <span className="text-amber-600">{t('calculators.currency.unavailable')}</span>
              )}
            </p>
            <button
              onClick={loadRates}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
            >
              <HiRefresh className={`w-4 h-4 ${status === 'loading' ? 'animate-spin' : ''}`} />
              {t('calculators.reset')}
            </button>
          </div>

          {/* Info Box */}
          <div className="p-4 mt-6 border border-blue-100 rounded-xl bg-blue-50">
            <div className="flex gap-3">
              <HiInformationCircle className="flex-shrink-0 w-5 h-5 text-blue-600" />
              <p className="text-xs text-blue-700">
                {t('calculators.currency.rateInfo')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
