import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Calculators from '../components/sections/Calculators';

const CalculatorsPage = () => {
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
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold rounded-full text-primary-700 bg-primary-100">
              Free Tools
            </span>
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
              Financial{' '}
              <span className="gradient-text">Calculators</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 md:text-xl">
              Quick and accurate calculations for tax planning, salary, VAT,
              profit margins, and currency conversion.
            </p>
          </motion.div>
        </div>
      </section>

      <Calculators />

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="px-4 mx-auto max-w-4xl sm:px-6 lg:px-8">
          <div className="p-8 bg-gray-50 rounded-2xl">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Disclaimer
            </h2>
            <p className="text-gray-600 leading-relaxed">
              These calculators provide estimates based on current Armenian tax laws and regulations.
              Results are for informational purposes only and should not be considered as professional
              tax advice. For accurate calculations specific to your situation, please contact our team
              for a personalized consultation.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default CalculatorsPage;
