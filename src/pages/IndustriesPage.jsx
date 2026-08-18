import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import Link from '../components/LocalizedLink';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCheck, HiArrowRight, HiChevronDown } from 'react-icons/hi';
import { getAllIndustries } from '../data/industries';
import CTA from '../components/sections/CTA';

const IndustriesPage = () => {
  const { t } = useTranslation();
  const industries = getAllIndustries();
  const [expandedIndustry, setExpandedIndustry] = useState(null);

  const toggleIndustry = (id) => {
    setExpandedIndustry(expandedIndustry === id ? null : id);
  };

  return (
    <>
      <Seo title={t('seo.industries.title')} description={t('seo.industries.description')} />
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
              {t('industries.badge')}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
              {t('industries.title')}{' '}
              <span className="gradient-text">{t('industries.titleHighlight')}</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 md:text-xl">
              {t('industries.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {industries.map((industry, index) => {
              const IconComponent = industry.icon;
              const isExpanded = expandedIndustry === industry.id;
              const features = t(`industries.${industry.id}.features`, { returnObjects: true });

              return (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="overflow-hidden bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl transition-shadow"
                >
                  {/* Industry Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={industry.image}
                      alt={t(`industries.${industry.id}.title`)}
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${industry.color} opacity-60`} />
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <div className={`p-3 rounded-xl bg-white/90 backdrop-blur-sm`}>
                        <IconComponent className={`w-6 h-6 ${industry.iconColor}`} />
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {t(`industries.${industry.id}.title`)}
                      </h3>
                    </div>
                  </div>

                  {/* Industry Content */}
                  <div className="p-6">
                    <p className="text-gray-600 leading-relaxed">
                      {t(`industries.${industry.id}.description`)}
                    </p>

                    {/* Expandable Features */}
                    <button
                      onClick={() => toggleIndustry(industry.id)}
                      className="flex items-center gap-2 mt-4 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      {isExpanded ? t('industries.hideServices') : t('industries.showServices')}
                      <HiChevronDown
                        className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-gray-100">
                            <p className="mb-3 text-sm font-medium text-gray-900">
                              {t('industries.ourServices')}
                            </p>
                            <ul className="space-y-2">
                              {Array.isArray(features) && features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start gap-2">
                                  <HiCheck className={`flex-shrink-0 w-4 h-4 mt-0.5 ${industry.iconColor}`} />
                                  <span className="text-sm text-gray-600">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Result */}
                          <div className={`p-4 mt-4 rounded-xl ${industry.bgColor}`}>
                            <p className="text-sm font-medium text-gray-700">
                              <span className="font-semibold">{t('industries.result')}</span>{' '}
                              {t(`industries.${industry.id}.result`)}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* CTA Button */}
                    <Link
                      to="/contact"
                      className={`inline-flex items-center gap-2 px-4 py-2 mt-4 text-sm font-medium text-white bg-gradient-to-r ${industry.color} rounded-lg hover:opacity-90 transition-opacity`}
                    >
                      {t('industries.getConsultation')}
                      <HiArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us for Your Industry */}
      <section className="py-20 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              {t('industries.whyChoose.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t('industries.whyChoose.subtitle')}
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((num, index) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center w-10 h-10 mb-4 text-lg font-bold text-white bg-primary-600 rounded-lg">
                  {num}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {t(`industries.whyChoose.reasons.r${num}.title`)}
                </h3>
                <p className="mt-2 text-gray-600">
                  {t(`industries.whyChoose.reasons.r${num}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
};

export default IndustriesPage;
