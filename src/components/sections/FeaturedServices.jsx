import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Link from '../LocalizedLink';
import {
  HiArrowRight,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi';
import { getFeaturedServices } from '../../data/services';

const FeaturedServices = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const featuredServices = getFeaturedServices();

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % featuredServices.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredServices.length]);

  const handlePrev = useCallback(() => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + featuredServices.length) % featuredServices.length);
  }, [featuredServices.length]);

  const handleNext = useCallback(() => {
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % featuredServices.length);
  }, [featuredServices.length]);

  const handleDotClick = useCallback((index) => {
    setIsAutoPlaying(false);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  const currentService = featuredServices[currentIndex];
  const Icon = currentService?.icon;

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const imageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
    }),
  };

  if (!currentService) return null;

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-gray-50 lg:py-32">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-gray-50 to-transparent" />
      <div className={`absolute top-40 right-0 w-72 h-72 rounded-full blur-3xl opacity-20 bg-gradient-to-br ${currentService.color}`} />
      <div className={`absolute bottom-20 left-0 w-96 h-96 rounded-full blur-3xl opacity-10 bg-gradient-to-br ${currentService.color}`} />

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

        {/* Carousel Container */}
        <div className="relative">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Image Side */}
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.img
                    key={currentService.id}
                    src={currentService.image}
                    alt={t(`services.${currentService.id}.title`)}
                    custom={direction}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="absolute inset-0 object-cover w-full h-full"
                  />
                </AnimatePresence>
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent`} />

                {/* Service badge */}
                <div className="absolute bottom-6 left-6">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm`}>
                    {Icon && <Icon className={`w-5 h-5 ${currentService.iconColor}`} />}
                    <span className="text-sm font-semibold text-gray-900">
                      {t(`services.${currentService.id}.title`)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows - Desktop */}
              <div className="absolute items-center justify-between hidden w-full px-4 transform -translate-y-1/2 top-1/2 lg:flex pointer-events-none">
                <button
                  onClick={handlePrev}
                  className="p-3 text-white transition-all duration-300 transform -translate-x-6 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 hover:scale-110 pointer-events-auto"
                  aria-label="Previous service"
                >
                  <HiChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 text-white transition-all duration-300 transform translate-x-6 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 hover:scale-110 pointer-events-auto"
                  aria-label="Next service"
                >
                  <HiChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content Side */}
            <div className="order-1 lg:order-2">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentService.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${currentService.color}`}>
                    {Icon && <Icon className="w-8 h-8 text-white" />}
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                    {t(`services.${currentService.id}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="mb-6 text-lg text-gray-600 leading-relaxed">
                    {t(`services.${currentService.id}.shortDescription`)}
                  </p>

                  {/* Features preview */}
                  <ul className="mb-8 space-y-3">
                    {(t(`services.${currentService.id}.features`, { returnObjects: true }) || [])
                      .slice(0, 3)
                      .map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${currentService.color} flex items-center justify-center`}>
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    to={`/services/${currentService.id}`}
                    className={`inline-flex items-center px-6 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-xl bg-gradient-to-r ${currentService.color} hover:shadow-lg hover:shadow-primary-500/25 group`}
                  >
                    {t('services.learnMore')}
                    <HiArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex items-center justify-center gap-3 mt-12">
            {featuredServices.map((service, index) => (
              <button
                key={service.id}
                onClick={() => handleDotClick(index)}
                className={`relative transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 h-3'
                    : 'w-3 h-3 hover:scale-125'
                }`}
                aria-label={`Go to ${t(`services.${service.id}.title`)}`}
              >
                <span
                  className={`absolute inset-0 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? `bg-gradient-to-r ${currentService.color}`
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Mobile Navigation Arrows */}
          <div className="flex justify-center gap-4 mt-6 lg:hidden">
            <button
              onClick={handlePrev}
              className="p-3 text-gray-600 transition-colors bg-gray-100 rounded-full hover:bg-gray-200"
              aria-label="Previous service"
            >
              <HiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 text-gray-600 transition-colors bg-gray-100 rounded-full hover:bg-gray-200"
              aria-label="Next service"
            >
              <HiChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            to="/services"
            className="inline-flex items-center px-8 py-4 text-sm font-semibold transition-all duration-300 rounded-xl text-primary-700 bg-primary-50 hover:bg-primary-100 group"
          >
            {t('services.viewAll')}
            <HiArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedServices;
