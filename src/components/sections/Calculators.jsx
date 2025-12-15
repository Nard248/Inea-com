import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiCalculator,
  HiCurrencyDollar,
  HiCash,
  HiTrendingUp,
  HiSwitchHorizontal,
} from 'react-icons/hi';

const Calculators = () => {
  const { t } = useTranslation();
  const [activeCalculator, setActiveCalculator] = useState('tax');

  const calculators = [
    { id: 'tax', icon: HiCalculator, color: 'bg-green-500' },
    { id: 'salary', icon: HiCash, color: 'bg-blue-500' },
    { id: 'vat', icon: HiCurrencyDollar, color: 'bg-purple-500' },
    { id: 'profit', icon: HiTrendingUp, color: 'bg-orange-500' },
    { id: 'currency', icon: HiSwitchHorizontal, color: 'bg-teal-500' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white lg:py-32" id="calculators">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold rounded-full text-primary-700 bg-primary-100">
            Free Tools
          </span>
          <h2 className="section-title">{t('calculators.title')}</h2>
          <p className="section-subtitle">{t('calculators.subtitle')}</p>
        </motion.div>

        {/* Calculator Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {calculators.map((calc) => (
            <motion.button
              key={calc.id}
              onClick={() => setActiveCalculator(calc.id)}
              className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
                activeCalculator === calc.id
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <calc.icon className="w-4 h-4 mr-2" />
              {t(`calculators.${calc.id}.title`)}
            </motion.button>
          ))}
        </div>

        {/* Calculator Content */}
        <motion.div
          layout
          className="max-w-2xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {activeCalculator === 'tax' && <TaxCalculator key="tax" t={t} />}
            {activeCalculator === 'salary' && <SalaryCalculator key="salary" t={t} />}
            {activeCalculator === 'vat' && <VATCalculator key="vat" t={t} />}
            {activeCalculator === 'profit' && <ProfitCalculator key="profit" t={t} />}
            {activeCalculator === 'currency' && <CurrencyConverter key="currency" t={t} />}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

// Tax Calculator Component
const TaxCalculator = ({ t }) => {
  const [income, setIncome] = useState('');
  const [result, setResult] = useState(null);

  const calculateTax = () => {
    const monthlyIncome = parseFloat(income) || 0;
    // Armenia flat income tax rate is 20%
    const taxAmount = monthlyIncome * 0.20;
    const netIncome = monthlyIncome - taxAmount;
    const effectiveRate = monthlyIncome > 0 ? (taxAmount / monthlyIncome) * 100 : 0;

    setResult({
      taxAmount,
      netIncome,
      effectiveRate,
    });
  };

  return (
    <CalculatorCard
      title={t('calculators.tax.title')}
      description={t('calculators.tax.description')}
    >
      <div className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            {t('calculators.tax.income')}
          </label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="input-field"
            placeholder="500,000"
          />
        </div>

        <button onClick={calculateTax} className="w-full btn-primary">
          {t('calculators.calculate')}
        </button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 mt-6 rounded-xl bg-primary-50"
          >
            <div className="grid gap-4 sm:grid-cols-3">
              <ResultItem
                label={t('calculators.tax.result')}
                value={`֏${result.taxAmount.toLocaleString()}`}
                color="text-red-600"
              />
              <ResultItem
                label={t('calculators.tax.netIncome')}
                value={`֏${result.netIncome.toLocaleString()}`}
                color="text-green-600"
              />
              <ResultItem
                label={t('calculators.tax.effectiveRate')}
                value={`${result.effectiveRate.toFixed(1)}%`}
                color="text-blue-600"
              />
            </div>
          </motion.div>
        )}
      </div>
    </CalculatorCard>
  );
};

// Salary Calculator Component
const SalaryCalculator = ({ t }) => {
  const [gross, setGross] = useState('');
  const [result, setResult] = useState(null);

  const calculateSalary = () => {
    const grossSalary = parseFloat(gross) || 0;

    // Armenian salary deductions
    const incomeTax = grossSalary * 0.20; // 20% income tax

    // Social payment calculation (simplified)
    let socialPayment = 0;
    if (grossSalary <= 500000) {
      socialPayment = grossSalary * 0.045; // 4.5%
    } else {
      socialPayment = 500000 * 0.045 + (grossSalary - 500000) * 0.10; // 4.5% up to 500k, 10% above
    }

    // Stamp duty (simplified - 1000 AMD fixed)
    const stampDuty = 1000;

    const netSalary = grossSalary - incomeTax - socialPayment - stampDuty;

    setResult({
      net: netSalary,
      incomeTax,
      socialPayment,
      stampDuty,
    });
  };

  return (
    <CalculatorCard
      title={t('calculators.salary.title')}
      description={t('calculators.salary.description')}
    >
      <div className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            {t('calculators.salary.gross')}
          </label>
          <input
            type="number"
            value={gross}
            onChange={(e) => setGross(e.target.value)}
            className="input-field"
            placeholder="500,000"
          />
        </div>

        <button onClick={calculateSalary} className="w-full btn-primary">
          {t('calculators.calculate')}
        </button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 mt-6 rounded-xl bg-primary-50"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <ResultItem
                label={t('calculators.salary.net')}
                value={`֏${result.net.toLocaleString()}`}
                color="text-green-600"
                large
              />
              <ResultItem
                label={t('calculators.salary.incomeTax')}
                value={`֏${result.incomeTax.toLocaleString()}`}
                color="text-red-600"
              />
              <ResultItem
                label={t('calculators.salary.socialPayment')}
                value={`֏${result.socialPayment.toLocaleString()}`}
                color="text-orange-600"
              />
              <ResultItem
                label={t('calculators.salary.stampDuty')}
                value={`֏${result.stampDuty.toLocaleString()}`}
                color="text-gray-600"
              />
            </div>
          </motion.div>
        )}
      </div>
    </CalculatorCard>
  );
};

// VAT Calculator Component
const VATCalculator = ({ t }) => {
  const [amount, setAmount] = useState('');
  const [includesVat, setIncludesVat] = useState(false);
  const [result, setResult] = useState(null);

  const calculateVAT = () => {
    const value = parseFloat(amount) || 0;
    const vatRate = 0.20; // 20% VAT in Armenia

    let netAmount, vatAmount, grossAmount;

    if (includesVat) {
      grossAmount = value;
      netAmount = value / (1 + vatRate);
      vatAmount = grossAmount - netAmount;
    } else {
      netAmount = value;
      vatAmount = value * vatRate;
      grossAmount = value + vatAmount;
    }

    setResult({ netAmount, vatAmount, grossAmount });
  };

  return (
    <CalculatorCard
      title={t('calculators.vat.title')}
      description={t('calculators.vat.description')}
    >
      <div className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            {t('calculators.vat.amount')}
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input-field"
            placeholder="100,000"
          />
        </div>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={includesVat}
            onChange={(e) => setIncludesVat(e.target.checked)}
            className="w-5 h-5 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
          />
          <span className="text-sm text-gray-700">{t('calculators.vat.includesVat')}</span>
        </label>

        <button onClick={calculateVAT} className="w-full btn-primary">
          {t('calculators.calculate')}
        </button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 mt-6 rounded-xl bg-primary-50"
          >
            <div className="grid gap-4 sm:grid-cols-3">
              <ResultItem
                label={t('calculators.vat.netAmount')}
                value={`֏${result.netAmount.toLocaleString()}`}
                color="text-gray-700"
              />
              <ResultItem
                label={t('calculators.vat.vatAmount')}
                value={`֏${result.vatAmount.toLocaleString()}`}
                color="text-purple-600"
              />
              <ResultItem
                label={t('calculators.vat.grossAmount')}
                value={`֏${result.grossAmount.toLocaleString()}`}
                color="text-green-600"
              />
            </div>
          </motion.div>
        )}
      </div>
    </CalculatorCard>
  );
};

// Profit Margin Calculator Component
const ProfitCalculator = ({ t }) => {
  const [revenue, setRevenue] = useState('');
  const [cost, setCost] = useState('');
  const [result, setResult] = useState(null);

  const calculateProfit = () => {
    const rev = parseFloat(revenue) || 0;
    const cos = parseFloat(cost) || 0;
    const profit = rev - cos;
    const margin = rev > 0 ? (profit / rev) * 100 : 0;

    setResult({ profit, margin });
  };

  return (
    <CalculatorCard
      title={t('calculators.profit.title')}
      description={t('calculators.profit.description')}
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {t('calculators.profit.revenue')}
            </label>
            <input
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              className="input-field"
              placeholder="1,000,000"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {t('calculators.profit.cost')}
            </label>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="input-field"
              placeholder="700,000"
            />
          </div>
        </div>

        <button onClick={calculateProfit} className="w-full btn-primary">
          {t('calculators.calculate')}
        </button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 mt-6 rounded-xl bg-primary-50"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <ResultItem
                label={t('calculators.profit.profit')}
                value={`֏${result.profit.toLocaleString()}`}
                color={result.profit >= 0 ? 'text-green-600' : 'text-red-600'}
                large
              />
              <ResultItem
                label={t('calculators.profit.margin')}
                value={`${result.margin.toFixed(1)}%`}
                color={result.margin >= 0 ? 'text-blue-600' : 'text-red-600'}
                large
              />
            </div>
          </motion.div>
        )}
      </div>
    </CalculatorCard>
  );
};

// Currency Converter Component
const CurrencyConverter = ({ t }) => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('AMD');
  const [toCurrency, setToCurrency] = useState('USD');
  const [result, setResult] = useState(null);

  // Approximate exchange rates (in production, use an API)
  const rates = {
    AMD: 1,
    USD: 0.0026,
    EUR: 0.0024,
    RUB: 0.24,
    GBP: 0.0021,
  };

  const currencies = [
    { code: 'AMD', name: 'Armenian Dram', symbol: '֏' },
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
  ];

  const convert = () => {
    const value = parseFloat(amount) || 0;
    // Convert to AMD first, then to target currency
    const inAMD = fromCurrency === 'AMD' ? value : value / rates[fromCurrency];
    const converted = inAMD * rates[toCurrency];
    setResult({
      value: converted,
      symbol: currencies.find((c) => c.code === toCurrency)?.symbol,
    });
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };

  return (
    <CalculatorCard
      title={t('calculators.currency.title')}
      description={t('calculators.currency.description')}
    >
      <div className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            {t('calculators.currency.amount')}
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input-field"
            placeholder="100,000"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {t('calculators.currency.from')}
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="input-field"
            >
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.symbol} {c.code}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={swapCurrencies}
            className="p-3 mt-6 text-gray-500 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <HiSwitchHorizontal className="w-5 h-5" />
          </button>

          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {t('calculators.currency.to')}
            </label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="input-field"
            >
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.symbol} {c.code}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button onClick={convert} className="w-full btn-primary">
          {t('calculators.calculate')}
        </button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 mt-6 text-center rounded-xl bg-primary-50"
          >
            <p className="text-sm text-gray-600">{t('calculators.currency.result')}</p>
            <p className="mt-2 text-3xl font-bold text-primary-700">
              {result.symbol}{result.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
            <p className="mt-2 text-xs text-gray-500">{t('calculators.currency.rateInfo')}</p>
          </motion.div>
        )}
      </div>
    </CalculatorCard>
  );
};

// Reusable Calculator Card Component
const CalculatorCard = ({ title, description, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="p-8 bg-white border border-gray-100 shadow-xl rounded-2xl"
  >
    <div className="mb-6 text-center">
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
    {children}
  </motion.div>
);

// Reusable Result Item Component
const ResultItem = ({ label, value, color, large = false }) => (
  <div className={large ? 'sm:col-span-2' : ''}>
    <p className="text-sm text-gray-600">{label}</p>
    <p className={`font-bold ${color} ${large ? 'text-2xl' : 'text-lg'}`}>{value}</p>
  </div>
);

export default Calculators;
