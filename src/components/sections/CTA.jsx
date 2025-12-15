import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight, HiPhone } from 'react-icons/hi';

const CTA = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-20 overflow-hidden lg:py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-800" />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-pattern)" />
        </svg>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl" />

      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {t('cta.title')}
            </h2>
            <p className="max-w-xl mt-4 text-lg text-primary-100">
              {t('cta.subtitle')}
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-primary-700 transition-all duration-300 bg-white rounded-xl hover:bg-primary-50 hover:shadow-xl group"
            >
              {t('cta.button')}
              <HiArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:+37410123456"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white transition-all duration-300 border-2 border-white/30 rounded-xl hover:bg-white/10 group"
            >
              <HiPhone className="w-5 h-5 mr-2" />
              +374 10 123 456
            </a>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-6 pt-12 mt-12 border-t border-white/20 lg:justify-start"
        >
          <div className="flex items-center text-sm text-primary-100">
            <svg className="w-5 h-5 mr-2 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Free Initial Consultation
          </div>
          <div className="flex items-center text-sm text-primary-100">
            <svg className="w-5 h-5 mr-2 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            No Hidden Fees
          </div>
          <div className="flex items-center text-sm text-primary-100">
            <svg className="w-5 h-5 mr-2 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Response Within 24 Hours
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
