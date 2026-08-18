import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import Link from '../components/LocalizedLink';
import { motion } from 'framer-motion';
import {
  HiCheck,
  HiStar,
  HiChevronDown,
  HiChevronUp,
} from 'react-icons/hi';

const PricingPage = () => {
  const { t } = useTranslation();
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const plans = [
    {
      id: 'starter',
      featured: false,
    },
    {
      id: 'professional',
      featured: true,
    },
    {
      id: 'business',
      featured: false,
    },
    {
      id: 'enterprise',
      featured: false,
      isCustom: true,
    },
  ];

  const faqItems = ['q1', 'q2', 'q3', 'q4'];

  const calculatePrice = (price, isCustom) => {
    if (isCustom) return t('pricing.customPrice');
    const basePrice = parseInt(price.replace(/,/g, ''));
    if (isAnnual) {
      const annualPrice = Math.round(basePrice * 12 * 0.8);
      return new Intl.NumberFormat('en-US').format(annualPrice);
    }
    return price;
  };

  return (
    <>
      <Seo title={t('seo.pricing.title')} description={t('seo.pricing.description')} />
      {/* Page Header */}
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
              {t('pricing.badge')}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
              {t('pricing.title')}{' '}
              <span className="gradient-text">{t('pricing.titleHighlight')}</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 md:text-xl">
              {t('pricing.subtitle')}
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                {t('pricing.monthly')}
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  isAnnual ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    isAnnual ? 'translate-x-7' : ''
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                {t('pricing.annually')}
              </span>
              {isAnnual && (
                <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                  {t('pricing.save')}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan, index) => {
              const planData = t(`pricing.plans.${plan.id}`, { returnObjects: true });
              const price = plan.isCustom ? null : planData.price;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative p-6 rounded-2xl ${
                    plan.featured
                      ? 'bg-primary-600 text-white shadow-xl shadow-primary-500/25 scale-105 lg:scale-110'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute flex items-center gap-1 px-3 py-1 text-xs font-semibold text-yellow-800 bg-yellow-400 rounded-full -top-3 left-1/2 -translate-x-1/2">
                      <HiStar className="w-3 h-3" />
                      {t('pricing.popular')}
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className={`text-xl font-bold ${plan.featured ? 'text-white' : 'text-gray-900'}`}>
                      {planData.name}
                    </h3>
                    <p className={`mt-2 text-sm ${plan.featured ? 'text-primary-100' : 'text-gray-600'}`}>
                      {planData.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-4xl font-bold ${plan.featured ? 'text-white' : 'text-gray-900'}`}>
                        {calculatePrice(price, plan.isCustom)}
                      </span>
                      {!plan.isCustom && (
                        <span className={`text-sm ${plan.featured ? 'text-primary-200' : 'text-gray-500'}`}>
                          AMD{isAnnual ? t('pricing.perYear') : t('pricing.perMonth')}
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="mb-6 space-y-3">
                    {planData.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <HiCheck
                          className={`flex-shrink-0 w-5 h-5 mt-0.5 ${
                            plan.featured ? 'text-primary-200' : 'text-primary-600'
                          }`}
                        />
                        <span className={`text-sm ${plan.featured ? 'text-white' : 'text-gray-600'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className={`block w-full py-3 text-center font-medium rounded-xl transition-colors ${
                      plan.featured
                        ? 'bg-white text-primary-600 hover:bg-primary-50'
                        : plan.isCustom
                        ? 'bg-gray-900 text-white hover:bg-gray-800'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  >
                    {plan.isCustom ? t('pricing.contactUs') : t('pricing.getStarted')}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="px-4 mx-auto max-w-3xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {t('pricing.faq.title')}
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="overflow-hidden bg-white border border-gray-200 rounded-xl"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === item ? null : item)}
                  className="flex items-center justify-between w-full p-6 text-left"
                >
                  <span className="font-medium text-gray-900">
                    {t(`pricing.faq.questions.${item}`)}
                  </span>
                  {openFaq === item ? (
                    <HiChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <HiChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openFaq === item && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-gray-600">
                      {t(`pricing.faq.questions.a${item.slice(1)}`)}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="px-4 mx-auto max-w-4xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 text-center bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl md:p-12"
          >
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              {t('pricing.cta.title')}
            </h2>
            <p className="mt-4 text-primary-100">
              {t('pricing.cta.subtitle')}
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-3 mt-8 font-medium text-primary-600 bg-white rounded-xl hover:bg-primary-50 transition-colors"
            >
              {t('pricing.cta.button')}
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default PricingPage;
