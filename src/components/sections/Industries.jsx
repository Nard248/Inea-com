import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Link from '../LocalizedLink';
import { HiArrowRight } from 'react-icons/hi';
import { getAllIndustries } from '../../data/industries';

const Industries = () => {
  const { t } = useTranslation();
  const industries = getAllIndustries();

  return (
    <section className="relative py-20 overflow-hidden bg-gray-50 lg:py-28">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-primary-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-100/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold rounded-full text-primary-700 bg-primary-100">
            {t('industries.badge')}
          </span>
          <h2 className="section-title">{t('industries.sectionTitle')}</h2>
          <p className="section-subtitle">{t('industries.sectionSubtitle')}</p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, index) => {
            const IconComponent = industry.icon;

            return (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
              >
                {/* Background Image */}
                <img
                  src={industry.image}
                  alt={t(`industries.${industry.id}.title`)}
                  className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${industry.color} opacity-70 group-hover:opacity-80 transition-opacity duration-300`} />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <div className="p-3 mb-3 bg-white/20 backdrop-blur-sm rounded-xl transition-transform duration-300 group-hover:scale-110">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {t(`industries.${industry.id}.title`)}
                  </h3>

                  {/* Hover reveal arrow */}
                  <div className="flex items-center gap-1 mt-2 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <span className="text-sm text-white/90">{t('industries.learnMore')}</span>
                    <HiArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Clickable overlay link */}
                <Link
                  to="/industries"
                  className="absolute inset-0"
                  aria-label={t(`industries.${industry.id}.title`)}
                />
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            to="/industries"
            className="inline-flex items-center px-8 py-4 text-sm font-semibold transition-all duration-300 rounded-xl text-primary-700 bg-primary-50 hover:bg-primary-100 group"
          >
            {t('industries.viewAll')}
            <HiArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Industries;
