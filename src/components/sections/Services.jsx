import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Link from '../LocalizedLink';
import { HiArrowRight } from 'react-icons/hi';
import { getAllServices } from '../../data/services';

const Services = ({ showAll = false, limit = 6 }) => {
  const { t } = useTranslation();

  const allServices = getAllServices();
  const displayServices = showAll ? allServices : allServices.slice(0, limit);

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
            {t('services.whatWeOffer')}
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
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {displayServices.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="group"
              >
                <Link
                  to={`/services/${service.id}`}
                  className="relative block h-full p-6 transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-2xl hover:border-primary-100 hover:-translate-y-1"
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl bg-gradient-to-br ${service.color}`} />

                  {/* Service Image */}
                  <div className="relative mb-4 overflow-hidden rounded-xl aspect-video">
                    <img
                      src={service.image}
                      alt={t(`services.${service.id}.title`)}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />

                    {/* Icon badge on image */}
                    <div className={`absolute bottom-3 left-3 inline-flex items-center justify-center w-10 h-10 rounded-lg ${service.bgColor} shadow-lg`}>
                      <Icon className={`w-5 h-5 ${service.iconColor}`} />
                    </div>
                  </div>

                  {/* Content — title allowed to wrap to 2 lines (Armenian titles
                      are longer than English) with a fixed min-height so cards
                      in the grid stay vertically aligned. */}
                  <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-primary-700 line-clamp-2 min-h-[3.5rem]">
                    {t(`services.${service.id}.title`)}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600 leading-relaxed line-clamp-2 min-h-[2.5rem]">
                    {t(`services.${service.id}.shortDescription`)}
                  </p>

                  {/* Learn more link */}
                  <span className="inline-flex items-center text-sm font-semibold transition-colors text-primary-600 hover:text-primary-700 group/link">
                    {t('services.learnMore')}
                    <HiArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" />
                  </span>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 transition-opacity opacity-0 group-hover:opacity-100">
                    <div className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br ${service.color} opacity-10 blur-xl`} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Link */}
        {!showAll && allServices.length > limit && (
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
              {t('services.viewAll')}
              <HiArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Services;
