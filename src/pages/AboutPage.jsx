import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import About from '../components/sections/About';
import CTA from '../components/sections/CTA';

const AboutPage = () => {
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
              About INEA
            </span>
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
              Your Trusted{' '}
              <span className="gradient-text">Financial Partner</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 md:text-xl">
              Since 2015, we've been helping Armenian businesses navigate the complex
              world of accounting and taxation with expertise and dedication.
            </p>
          </motion.div>
        </div>
      </section>

      <About />

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To empower businesses in Armenia with expert financial guidance,
                ensuring compliance, optimizing tax positions, and enabling sustainable
                growth through professional accounting services.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                We believe that every business, regardless of size, deserves access to
                quality accounting services that can help them thrive in today's
                competitive market.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To become Armenia's most trusted accounting firm, known for our
                commitment to excellence, innovation, and client success. We aim to
                set new standards in financial services while contributing to the
                growth of the Armenian business ecosystem.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                By combining traditional expertise with modern technology, we're
                building the future of accounting in Armenia.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
};

export default AboutPage;
