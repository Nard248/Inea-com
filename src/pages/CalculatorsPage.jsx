import { useState } from 'react';
import Link from '../components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  HiCalculator,
  HiCurrencyDollar,
  HiReceiptTax,
  HiTrendingUp,
  HiCash,
  HiChartPie,
  HiSwitchHorizontal,
} from 'react-icons/hi';
import SalaryTaxCalculator from '../components/calculators/SalaryTaxCalculator';
import CurrencyConverter from '../components/calculators/CurrencyConverter';
import Seo from '../components/Seo';

// Calculators are hidden behind a coming-soon screen until they are ready for
// launch. Flip to true to restore the full page, and un-comment the
// /calculators links in Navbar.jsx and Footer.jsx.
const CALCULATORS_ENABLED = false;

const CalculatorsPage = () => {
  const { t } = useTranslation();
  const [activeCalculator, setActiveCalculator] = useState('salary');

  const pageHeader = (
    <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-gray-50">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-100/30 rounded-full blur-3xl" />

      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold rounded-full text-primary-700 bg-primary-100">
            {t('calculators.badge')}
          </span>
          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
            {t('calculators.title')}{' '}
            <span className="gradient-text">{t('calculators.titleHighlight')}</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 md:text-xl">
            {t('calculators.subtitle')}
          </p>
        </motion.div>
      </div>
    </section>
  );

  if (!CALCULATORS_ENABLED) {
    return (
      <>
        <Seo title={t('seo.calculators.title')} description={t('seo.calculators.description')} />
        {pageHeader}
        <section className="py-20 bg-white">
          <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="p-12 text-center bg-white border border-gray-100 shadow-xl rounded-2xl"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-primary-500 to-primary-700">
                <HiCalculator className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {t('calculators.pageComingSoonTitle')}
              </h2>
              <p className="mt-4 leading-relaxed text-gray-600">
                {t('calculators.pageComingSoonDesc')}
              </p>
              <Link to="/contact" className="inline-block mt-8 btn-primary">
                {t('cta.button')}
              </Link>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  const calculators = [
    {
      id: 'salary',
      name: t('calculators.types.salary'),
      description: t('calculators.types.salaryDesc'),
      icon: HiCurrencyDollar,
      color: 'from-green-500 to-emerald-600',
      available: true,
    },
    {
      id: 'currency',
      name: t('calculators.types.currency'),
      description: t('calculators.types.currencyDesc'),
      icon: HiSwitchHorizontal,
      color: 'from-blue-500 to-indigo-600',
      available: true,
    },
    {
      id: 'vat',
      name: t('calculators.types.vat'),
      description: t('calculators.types.vatDesc'),
      icon: HiReceiptTax,
      color: 'from-blue-500 to-indigo-600',
      available: false,
    },
    {
      id: 'profit',
      name: t('calculators.types.profit'),
      description: t('calculators.types.profitDesc'),
      icon: HiTrendingUp,
      color: 'from-purple-500 to-violet-600',
      available: false,
    },
    {
      id: 'dividend',
      name: t('calculators.types.dividend'),
      description: t('calculators.types.dividendDesc'),
      icon: HiCash,
      color: 'from-orange-500 to-amber-600',
      available: false,
    },
    {
      id: 'pension',
      name: t('calculators.types.pension'),
      description: t('calculators.types.pensionDesc'),
      icon: HiChartPie,
      color: 'from-pink-500 to-rose-600',
      available: false,
    },
  ];

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'salary':
        return <SalaryTaxCalculator />;
      case 'currency':
        return <CurrencyConverter />;
      default:
        return (
          <div className="p-12 text-center bg-white shadow-xl rounded-2xl">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full">
              <HiCalculator className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              {t('calculators.comingSoon')}
            </h3>
            <p className="mt-2 text-gray-600">
              {t('calculators.comingSoonDesc')}
            </p>
          </div>
        );
    }
  };

  return (
    <>
      <Seo title={t('seo.calculators.title')} description={t('seo.calculators.description')} />
      {pageHeader}

      {/* Calculator Selection */}
      <section className="py-12 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">
              {t('calculators.selectCalculator')}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {calculators.map((calc) => {
                const Icon = calc.icon;
                return (
                  <button
                    key={calc.id}
                    onClick={() => calc.available && setActiveCalculator(calc.id)}
                    disabled={!calc.available}
                    className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                      activeCalculator === calc.id
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                        : calc.available
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {calc.name}
                    {!calc.available && (
                      <span className="px-1.5 py-0.5 text-xs bg-gray-200 text-gray-500 rounded">
                        {t('calculators.soon')}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Active Calculator */}
          <motion.div
            key={activeCalculator}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderCalculator()}
          </motion.div>
        </div>
      </section>

      {/* Calculator Cards Preview */}
      <section className="py-16 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {t('calculators.allCalculators')}
            </h2>
            <p className="mt-2 text-gray-600">
              {t('calculators.allCalculatorsDesc')}
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {calculators.map((calc, index) => {
              const Icon = calc.icon;
              return (
                <motion.div
                  key={calc.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => calc.available && setActiveCalculator(calc.id)}
                  className={`relative p-6 bg-white border border-gray-100 rounded-2xl transition-all ${
                    calc.available
                      ? 'cursor-pointer hover:shadow-xl hover:border-primary-100 hover:-translate-y-1'
                      : 'opacity-75'
                  }`}
                >
                  {!calc.available && (
                    <div className="absolute px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 top-4 right-4 rounded-md">
                      {t('calculators.comingSoon')}
                    </div>
                  )}
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${calc.color}`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">{calc.name}</h3>
                  <p className="text-sm text-gray-600">{calc.description}</p>
                  {calc.available && (
                    <div className="mt-4">
                      <span className="text-sm font-medium text-primary-600">
                        {t('calculators.useNow')} →
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="px-4 mx-auto max-w-4xl sm:px-6 lg:px-8">
          <div className="p-8 bg-gray-50 rounded-2xl">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              {t('calculators.disclaimerTitle')}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {t('calculators.disclaimerText')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default CalculatorsPage;
