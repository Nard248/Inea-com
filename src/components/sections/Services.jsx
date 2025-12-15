import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HiCurrencyDollar,
  HiDocumentText,
  HiClipboardCheck,
  HiUserGroup,
  HiOfficeBuilding,
  HiLightBulb,
  HiArrowRight,
} from 'react-icons/hi';

const Services = ({ showAll = false }) => {
  const { t } = useTranslation();

  const services = [
    {
      icon: HiCurrencyDollar,
      key: 'tax',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      icon: HiDocumentText,
      key: 'bookkeeping',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      icon: HiClipboardCheck,
      key: 'audit',
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      icon: HiUserGroup,
      key: 'payroll',
      color: 'from-orange-500 to-amber-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
    {
      icon: HiOfficeBuilding,
      key: 'registration',
      color: 'from-teal-500 to-cyan-600',
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-600',
    },
    {
      icon: HiLightBulb,
      key: 'consulting',
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600',
    },
  ];

  const displayServices = showAll ? services : services.slice(0, 6);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="relative py-20 overflow-hidden bg-white lg:py-32" id="services">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-gray-50 to-transparent" />
      <div className="absolute top-40 right-0 w-72 h-72 bg-primary-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent-100/20 rounded-full blur-3xl" />

      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold rounded-full text-primary-700 bg-primary-100">
            What We Offer
          </span>
          <h2 className="section-title">{t('services.title')}</h2>
          <p className="section-subtitle">{t('services.subtitle')}</p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {displayServices.map((service, index) => (
            <motion.div
              key={service.key}
              variants={itemVariants}
              className="group"
            >
              <div className="relative h-full p-8 transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-2xl hover:border-primary-100 hover:-translate-y-1">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl bg-gradient-to-br ${service.color}`} />

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 mb-6 rounded-xl ${service.bgColor}`}>
                  <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
                  {t(`services.${service.key}.title`)}
                </h3>
                <p className="mb-6 text-gray-600 leading-relaxed">
                  {t(`services.${service.key}.description`)}
                </p>

                {/* Learn more link */}
                <Link
                  to={`/services#${service.key}`}
                  className="inline-flex items-center text-sm font-semibold transition-colors text-primary-600 hover:text-primary-700 group/link"
                >
                  {t('services.learnMore')}
                  <HiArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" />
                </Link>

                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity`}>
                  <div className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br ${service.color} opacity-10 blur-xl`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        {!showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              to="/services"
              className="inline-flex items-center px-8 py-4 text-sm font-semibold transition-all duration-300 rounded-xl text-primary-700 bg-primary-50 hover:bg-primary-100 group"
            >
              View All Services
              <HiArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Services;
