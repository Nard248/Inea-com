import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  HiAcademicCap,
  HiChip,
  HiSupport,
  HiCurrencyDollar,
  HiCheckCircle,
} from 'react-icons/hi';
import AnimatedCounter from '../ui/AnimatedCounter';

const About = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: HiAcademicCap,
      key: 'expertise',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: HiChip,
      key: 'technology',
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: HiSupport,
      key: 'support',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: HiCurrencyDollar,
      key: 'pricing',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
    },
  ];

  const stats = [
    { value: 500, suffix: '+', label: t('about.stats.clients') },
    { value: 10, suffix: '+', label: t('about.stats.years') },
    { value: 850, suffix: '+', label: t('about.stats.saved') },
    { value: 98, suffix: '%', label: t('about.stats.satisfaction') },
  ];

  const reasons = [
    'Licensed & certified professionals',
    'Deep knowledge of Armenian tax law',
    'Personalized service approach',
    'Multilingual support (EN/HY/RU)',
    'Competitive pricing',
    'Secure data handling',
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-white lg:py-32" id="about">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-50 to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100/30 rounded-full blur-3xl" />

      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold rounded-full text-primary-700 bg-primary-100">
            About Us
          </span>
          <h2 className="section-title">{t('about.title')}</h2>
          <p className="section-subtitle">{t('about.subtitle')}</p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left Column - Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-5 p-6 transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-lg hover:border-primary-100"
              >
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center`}>
                  <feature.icon className={`w-7 h-7 text-transparent bg-clip-text bg-gradient-to-r ${feature.color}`} style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} />
                  <feature.icon className={`w-7 h-7 bg-gradient-to-r ${feature.color} rounded-lg p-1 text-white`} />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    {t(`about.features.${feature.key}.title`)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(`about.features.${feature.key}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column - Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="sticky top-32">
              {/* Image/Visual Element */}
              <div className="relative mb-8 overflow-hidden aspect-video rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=800&auto=format&fit=crop"
                  alt="Professional team"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-lg font-semibold text-white">
                    Your success is our priority
                  </p>
                  <p className="text-primary-100">
                    Dedicated professionals working for you
                  </p>
                </div>
              </div>

              {/* Reasons List */}
              <div className="p-6 bg-gray-50 rounded-2xl">
                <h4 className="mb-4 text-lg font-bold text-gray-900">
                  Why businesses choose us
                </h4>
                <ul className="space-y-3">
                  {reasons.map((reason, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center text-gray-700"
                    >
                      <HiCheckCircle className="flex-shrink-0 w-5 h-5 mr-3 text-primary-500" />
                      {reason}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-6 mt-20 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="p-8 text-center transition-all duration-300 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl hover:shadow-xl hover:shadow-primary-500/20"
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl font-bold text-white lg:text-5xl">
                <AnimatedCounter
                  from={0}
                  to={stat.value}
                  suffix={stat.suffix}
                  duration={2}
                />
              </div>
              <div className="mt-2 text-sm font-medium text-primary-100">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
