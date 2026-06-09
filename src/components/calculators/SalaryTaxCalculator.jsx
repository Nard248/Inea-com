import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  HiCurrencyDollar,
  HiCalendar,
  HiCalculator,
  HiInformationCircle,
  HiRefresh,
} from 'react-icons/hi';
import {
  computeFromGross,
  computeFromNet,
  PENSION_MODES,
} from '../../data/salaryTax';

/**
 * Armenian Salary Tax Calculator.
 *
 * Mirrors the b24.am salary calculator: bidirectional gross↔net, IT-sector tax
 * benefit, pension-participation modes, and the full deduction breakdown. The
 * tax maths lives in src/data/salaryTax.js.
 */
const SalaryTaxCalculator = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const [mode, setMode] = useState('gross'); // 'gross' | 'net'
  const [amount, setAmount] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [pensionMode, setPensionMode] = useState(PENSION_MODES.MANDATORY);
  const [itSector, setItSector] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const calc = useMemo(() => {
    const value = parseFloat(amount) || 0;
    const options = {
      birthYear: parseInt(birthYear, 10) || null,
      pensionMode,
      itSector,
      currentYear,
    };
    return mode === 'net'
      ? computeFromNet(value, options)
      : computeFromGross(value, options);
  }, [amount, birthYear, pensionMode, itSector, mode, currentYear]);

  const formatCurrency = (value) => new Intl.NumberFormat('en-US').format(value);

  const handleReset = () => {
    setAmount('');
    setBirthYear('');
    setPensionMode(PENSION_MODES.MANDATORY);
    setItSector(false);
    setShowBreakdown(false);
  };

  const hasResult = parseFloat(amount) > 0;

  const deductionItems = [
    {
      label: t('calculators.salary.incomeTax'),
      value: calc.incomeTax,
      description: t('calculators.salary.incomeTaxDesc'),
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      label: t('calculators.salary.socialPayment'),
      value: calc.pension,
      description: t('calculators.salary.socialPaymentDesc'),
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      label: t('calculators.salary.stampDuty'),
      value: calc.stampDuty,
      description: t('calculators.salary.stampDutyDesc'),
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      label: t('calculators.salary.insuranceFee'),
      value: calc.healthcare,
      description: t('calculators.salary.insuranceFeeDesc'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
  ];

  const pensionOptions = [
    { value: PENSION_MODES.MANDATORY, label: t('calculators.salary.pensionMandatory') },
    { value: PENSION_MODES.VOLUNTARY, label: t('calculators.salary.pensionVoluntary') },
    { value: PENSION_MODES.NONE, label: t('calculators.salary.pensionNone') },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
        {/* Header */}
        <div className="px-6 py-8 text-white bg-gradient-to-r from-primary-600 to-primary-700 sm:px-10">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/20">
              <HiCalculator className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{t('calculators.salary.title')}</h2>
              <p className="mt-1 text-primary-100">{t('calculators.salary.subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Calculator Form */}
        <div className="p-6 sm:p-10">
          {/* Mode toggle: calculate from gross or from net */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {t('calculators.salary.mode')}
            </label>
            <div className="inline-flex p-1 bg-gray-100 rounded-xl">
              {[
                { id: 'gross', label: t('calculators.salary.fromGross') },
                { id: 'net', label: t('calculators.salary.fromNet') },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setMode(option.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    mode === option.id
                      ? 'bg-white text-primary-700 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Salary Input */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                {mode === 'net'
                  ? t('calculators.salary.netLabel')
                  : t('calculators.salary.grossLabel')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <HiCurrencyDollar className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={
                    mode === 'net'
                      ? t('calculators.salary.enterNet')
                      : t('calculators.salary.enterGross')
                  }
                  className="w-full py-3 pl-12 pr-16 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <span className="text-sm font-medium text-gray-500">AMD</span>
                </div>
              </div>
            </div>

            {/* Birth Year Input */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                {t('calculators.salary.birthYear')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <HiCalendar className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  placeholder={t('calculators.salary.enterYear')}
                  min="1940"
                  max={currentYear - 16}
                  className="w-full py-3 pl-12 pr-4 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {t('calculators.salary.birthYearNote')}
              </p>
            </div>

            {/* Pension participation */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                {t('calculators.salary.pensionTitle')}
              </label>
              <select
                value={pensionMode}
                onChange={(e) => setPensionMode(e.target.value)}
                className="w-full py-3 pl-4 pr-10 text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {pensionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* IT sector toggle */}
            <div className="flex items-start">
              <label className="flex items-start w-full gap-3 p-4 transition-colors border border-gray-200 cursor-pointer rounded-xl hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={itSector}
                  onChange={(e) => setItSector(e.target.checked)}
                  className="w-5 h-5 mt-0.5 rounded text-primary-600 focus:ring-primary-500"
                />
                <span>
                  <span className="block text-sm font-medium text-gray-800">
                    {t('calculators.salary.itSector')}
                  </span>
                  <span className="block mt-0.5 text-xs text-gray-500">
                    {t('calculators.salary.itSectorNote')}
                  </span>
                </span>
              </label>
            </div>
          </div>

          {/* Results Section */}
          {hasResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              {/* Main Result Cards */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-6 rounded-xl bg-gray-50">
                  <p className="text-sm font-medium text-gray-500">
                    {t('calculators.salary.grossLabel')}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    {formatCurrency(calc.gross)}
                    <span className="ml-1 text-sm font-normal text-gray-500">AMD</span>
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-red-50">
                  <p className="text-sm font-medium text-red-600">
                    {t('calculators.salary.totalDeductions')}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-red-700">
                    -{formatCurrency(calc.totalDeductions)}
                    <span className="ml-1 text-sm font-normal text-red-500">AMD</span>
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-green-50">
                  <p className="text-sm font-medium text-green-600">
                    {t('calculators.salary.netSalary')}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-green-700">
                    {formatCurrency(calc.net)}
                    <span className="ml-1 text-sm font-normal text-green-500">AMD</span>
                  </p>
                </div>
              </div>

              {/* Detailed Breakdown Toggle */}
              <button
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="flex items-center gap-2 px-4 py-2 mt-6 text-sm font-medium transition-colors rounded-lg text-primary-600 hover:bg-primary-50"
              >
                <HiInformationCircle className="w-5 h-5" />
                {showBreakdown
                  ? t('calculators.salary.hideBreakdown')
                  : t('calculators.salary.showBreakdown')}
              </button>

              {/* Detailed Breakdown */}
              {showBreakdown && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 overflow-hidden"
                >
                  <div className="p-6 space-y-4 border border-gray-100 rounded-xl">
                    <h3 className="font-semibold text-gray-900">
                      {t('calculators.salary.deductionBreakdown')}
                    </h3>
                    <div className="space-y-3">
                      {deductionItems.map((item, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between gap-3 p-4 rounded-lg ${item.bgColor}`}
                        >
                          <div>
                            <p className={`font-medium ${item.color}`}>{item.label}</p>
                            <p className="text-xs text-gray-500">{item.description}</p>
                          </div>
                          <p className={`text-lg font-bold whitespace-nowrap ${item.color}`}>
                            {formatCurrency(item.value)} AMD
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Tax Rate Summary */}
                    <div className="pt-4 mt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        {t('calculators.salary.effectiveRate')}:{' '}
                        <span className="font-semibold text-gray-900">
                          {calc.gross > 0
                            ? ((calc.totalDeductions / calc.gross) * 100).toFixed(1)
                            : 0}
                          %
                        </span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Reset Button */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                >
                  <HiRefresh className="w-4 h-4" />
                  {t('calculators.salary.reset')}
                </button>
              </div>
            </motion.div>
          )}

          {/* Info Box */}
          <div className="p-4 mt-8 border border-blue-100 rounded-xl bg-blue-50">
            <div className="flex gap-3">
              <HiInformationCircle className="flex-shrink-0 w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-800">
                  {t('calculators.salary.disclaimer')}
                </p>
                <p className="mt-1 text-xs text-blue-600">
                  {t('calculators.salary.disclaimerText')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryTaxCalculator;
