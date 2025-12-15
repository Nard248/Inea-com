import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Services from '../components/sections/Services';
import CTA from '../components/sections/CTA';

const ServicesPage = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Page Header */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-gray-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-100/30 rounded-full blur-3xl" />

        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold rounded-full text-primary-700 bg-primary-100">
              Our Services
            </span>
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
              Professional{' '}
              <span className="gradient-text">Financial Services</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 md:text-xl">
              Comprehensive accounting and tax solutions tailored to help your business
              thrive in Armenia's dynamic market.
            </p>
          </motion.div>
        </div>
      </section>

      <Services showAll />
      <CTA />
    </>
  );
};

export default ServicesPage;
