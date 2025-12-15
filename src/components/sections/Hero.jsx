import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight, HiPlay } from 'react-icons/hi';
import GeometricBackground, { FloatingElements } from '../ui/GeometricBackground';
import AnimatedCounter from '../ui/AnimatedCounter';

const Hero = () => {
  const { t } = useTranslation();

  const stats = [
    { value: 500, suffix: '+', label: t('hero.stats.clients') },
    { value: 10, suffix: '+', label: t('hero.stats.experience') },
    { value: 2, prefix: '֏', suffix: 'B+', label: t('hero.stats.saved') },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-primary-50">
      {/* Background Elements */}
      <GeometricBackground variant="light" />
      <FloatingElements />

      {/* Gradient Orbs */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-200/20 rounded-full blur-3xl" />

      {/* Main Content */}
      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen pt-20 pb-16 text-center lg:pt-32">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-primary-100 text-primary-800">
                <span className="w-2 h-2 mr-2 rounded-full bg-primary-500 animate-pulse" />
                Trusted by 500+ businesses in Armenia
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {t('hero.title')}{' '}
              <span className="relative">
                <span className="gradient-text">{t('hero.titleHighlight')}</span>
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <motion.path
                    d="M2 10 Q150 -5 298 10"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#16a34a" />
                      <stop offset="100%" stopColor="#15803d" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="max-w-2xl mx-auto mb-10 text-lg text-gray-600 sm:text-xl"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link to="/contact" className="group btn-primary">
                {t('hero.cta')}
                <HiArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/services"
                className="btn-secondary"
              >
                {t('hero.secondaryCta')}
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid w-full max-w-3xl grid-cols-1 gap-8 mt-20 sm:grid-cols-3"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="relative p-6 text-center bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100/50 shadow-lg"
                whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              >
                <div className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  <AnimatedCounter
                    from={0}
                    to={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2}
                  />
                </div>
                <div className="mt-2 text-sm font-medium text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute transform -translate-x-1/2 bottom-8 left-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center text-gray-400">
          <span className="mb-2 text-xs font-medium uppercase tracking-wider">Scroll</span>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full">
            <motion.div
              className="w-1.5 h-1.5 mx-auto mt-2 bg-primary-500 rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
