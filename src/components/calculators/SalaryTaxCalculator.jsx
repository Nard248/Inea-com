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

/**
 * Armenian Salary Tax Calculator
 * Based on Armenian tax law formulas:
 * - Income Tax: 20% of gross salary
 * - Social Payment: Based on birth year and salary brackets
 * - Stamp Duty: Based on salary brackets
 * - Insurance Fee: Based on birth year and salary brackets
 */

const SalaryTaxCalculator = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const [grossSalary, setGrossSalary] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Calculate all taxes based on Armenian tax law
  const calculations = useMemo(() => {
    const gross = parseFloat(grossSalary) || 0;
    const year = parseInt(birthYear) || currentYear - 30;

    if (gross <= 0) {
      return {
        incomeTax: 0,
        socialPayment: 0,
        stampDuty: 0,
        insuranceFee: 0,
        totalDeductions: 0,
        netSalary: 0,
      };
    }

    // Income Tax: 20% flat rate
    const incomeTax = gross * 0.2;

    // Social Payment: Based on birth year (before 1974 = 0) and salary brackets
    // Formula: IF(birthYear<1974, 0, IF(gross<500000, gross*0.05, IF(gross<1000000, gross*0.1-25000, 87500)))
    let socialPayment = 0;
    if (year >= 1974) {
      if (gross < 500000) {
        socialPayment = gross * 0.05;
      } else if (gross < 1000000) {
        socialPayment = gross * 0.1 - 25000;
      } else {
        socialPayment = 87500;
      }
    }

    // Stamp Duty: Based on salary brackets
    // Formula: IF(gross<=100000, 1500, IF(gross<=200000, 3000, IF(gross<=500000, 1000, IF(gross<=1000000, 1000, 15000))))
    let stampDuty = 1500;
    if (gross <= 100000) {
      stampDuty = 1500;
    } else if (gross <= 200000) {
      stampDuty = 3000;
    } else if (gross <= 500000) {
      stampDuty = 1000;
    } else if (gross <= 1000000) {
      stampDuty = 1000;
    } else {
      stampDuty = 15000;
    }

    // Insurance Fee: Based on birth year (before 1960 = 0) and salary brackets
    // Formula: IF(birthYear<1960, 0, IF(gross<200001, 0, IF(gross<500000, 4800, 10800)))
    let insuranceFee = 0;
    if (year >= 1960) {
      if (gross < 200001) {
        insuranceFee = 0;
      } else if (gross < 500000) {
        insuranceFee = 4800;
      } else {
        insuranceFee = 10800;
      }
    }

    const totalDeductions = incomeTax + socialPayment + stampDuty + insuranceFee;
    const netSalary = gross - totalDeductions;

    return {
      incomeTax: Math.round(incomeTax),
      socialPayment: Math.round(socialPayment),
      stampDuty: Math.round(stampDuty),
      insuranceFee: Math.round(insuranceFee),
      totalDeductions: Math.round(totalDeductions),
      netSalary: Math.round(netSalary),
    };
  }, [grossSalary, birthYear, currentYear]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US').format(amount);
  };

  const handleReset = () => {
    setGrossSalary('');
    setBirthYear('');
    setShowBreakdown(false);
  };

  const deductionItems = [
    {
      label: t('calculators.salary.incomeTax'),
      value: calculations.incomeTax,
      description: t('calculators.salary.incomeTaxDesc'),
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      label: t('calculators.salary.socialPayment'),
      value: calculations.socialPayment,
      description: t('calculators.salary.socialPaymentDesc'),
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      label: t('calculators.salary.stampDuty'),
      value: calculations.stampDuty,
      description: t('calculators.salary.stampDutyDesc'),
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      label: t('calculators.salary.insuranceFee'),
      value: calculations.insuranceFee,
      description: t('calculators.salary.insuranceFeeDesc'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
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
          <div className="grid gap-6 md:grid-cols-2">
            {/* Gross Salary Input */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                {t('calculators.salary.grossSalary')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <HiCurrencyDollar className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={grossSalary}
                  onChange={(e) => setGrossSalary(e.target.value)}
                  placeholder={t('calculators.salary.enterAmount')}
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
          </div>

          {/* Results Section */}
          {parseFloat(grossSalary) > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              {/* Main Result Cards */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-6 rounded-xl bg-gray-50">
                  <p className="text-sm font-medium text-gray-500">
                    {t('calculators.salary.grossSalary')}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    {formatCurrency(parseFloat(grossSalary) || 0)}
                    <span className="ml-1 text-sm font-normal text-gray-500">AMD</span>
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-red-50">
                  <p className="text-sm font-medium text-red-600">
                    {t('calculators.salary.totalDeductions')}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-red-700">
                    -{formatCurrency(calculations.totalDeductions)}
                    <span className="ml-1 text-sm font-normal text-red-500">AMD</span>
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-green-50">
                  <p className="text-sm font-medium text-green-600">
                    {t('calculators.salary.netSalary')}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-green-700">
                    {formatCurrency(calculations.netSalary)}
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
                          className={`flex items-center justify-between p-4 rounded-lg ${item.bgColor}`}
                        >
                          <div>
                            <p className={`font-medium ${item.color}`}>{item.label}</p>
                            <p className="text-xs text-gray-500">{item.description}</p>
                          </div>
                          <p className={`text-lg font-bold ${item.color}`}>
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
                          {parseFloat(grossSalary) > 0
                            ? ((calculations.totalDeductions / parseFloat(grossSalary)) * 100).toFixed(1)
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
