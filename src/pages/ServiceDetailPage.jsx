import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Link, { localizePath } from '../components/LocalizedLink';
import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import {
  HiArrowLeft,
  HiCheck,
  HiUsers,
  HiShieldCheck,
  HiLightBulb,
  HiArrowRight,
  HiPhone,
} from 'react-icons/hi';
import { getServiceById } from '../data/services';
import { primaryPhone } from '../data/contact';
import CTA from '../components/sections/CTA';

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const { t, i18n } = useTranslation();

  const service = getServiceById(serviceId);

  // If service not found, redirect to services page
  if (!service) {
    return <Navigate to={localizePath('/services', i18n.language)} replace />;
  }

  const Icon = service.icon;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Get translated content
  const title = t(`services.${service.id}.title`);
  const description = t(`services.${service.id}.description`);
  const features = t(`services.${service.id}.features`, { returnObjects: true }) || [];
  const whyImportant = t(`services.${service.id}.whyImportant`, { returnObjects: true }) || [];
  const targetAudience = t(`services.${service.id}.targetAudience`, { returnObjects: true }) || [];
  const advantages = t(`services.${service.id}.advantages`, { returnObjects: true }) || [];

  return (
    <>
      <Seo title={title} description={t(`services.${service.id}.shortDescription`)} />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={service.image}
            alt={title}
            className="object-cover w-full h-full opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/90" />
        </div>

        {/* Decorative elements */}
        <div className={`absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20 bg-gradient-to-br ${service.color}`} />
        <div className={`absolute bottom-20 left-20 w-72 h-72 rounded-full blur-3xl opacity-10 bg-gradient-to-br ${service.color}`} />

        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              to="/services"
              className="inline-flex items-center text-sm font-medium text-gray-300 transition-colors hover:text-white group"
            >
              <HiArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              {t('services.backToServices')}
            </Link>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Icon Badge */}
              <div className={`inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${service.color}`}>
                <Icon className="w-8 h-8 text-white" />
              </div>

              <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                {title}
              </h1>

              <p className="mb-8 text-lg text-gray-300 leading-relaxed">
                {t(`services.${service.id}.shortDescription`)}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 hover:shadow-lg hover:shadow-primary-500/25"
                >
                  {t('services.getStarted')}
                  <HiArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <a
                  href={primaryPhone.href}
                  className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white transition-all duration-300 border border-white/20 rounded-xl hover:bg-white/10"
                >
                  <HiPhone className="w-4 h-4 mr-2" />
                  {t('services.freeConsultation')}
                </a>
              </div>
            </motion.div>

            {/* Image Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={service.image}
                  alt={title}
                  className="object-cover w-full h-80"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent`} />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 p-4 bg-white rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${service.bgColor}`}>
                    <Icon className={`w-6 h-6 ${service.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t('services.whatWeOffer')}</p>
                    <p className="text-xs text-gray-500">{features.length}+ {t('services.featuresInclude').toLowerCase()}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
            {/* Left Column - Description */}
            <div className="lg:col-span-2">
              {/* Full Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">
                  {t('services.whatWeOffer')}
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  {description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>

              {/* Features List */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">
                  {t('services.featuresInclude')}
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {Array.isArray(features) && features.map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-start gap-3 p-4 transition-colors border border-gray-100 rounded-xl hover:border-primary-100 hover:bg-primary-50/30"
                    >
                      <div className={`flex-shrink-0 p-1 rounded-full bg-gradient-to-br ${service.color}`}>
                        <HiCheck className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Why Important */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 mb-12 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${service.color}`}>
                    <HiLightBulb className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {t('services.whyImportant')}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {Array.isArray(whyImportant) && whyImportant.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <HiCheck className={`flex-shrink-0 w-5 h-5 mt-0.5 ${service.iconColor}`} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Target Audience Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-6 border border-gray-100 rounded-2xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-xl ${service.bgColor}`}>
                    <HiUsers className={`w-5 h-5 ${service.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {t('services.whoIsItFor')}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {Array.isArray(targetAudience) && targetAudience.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className={`w-1.5 h-1.5 mt-2 rounded-full flex-shrink-0 bg-gradient-to-br ${service.color}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Advantages Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`p-6 rounded-2xl bg-gradient-to-br ${service.color}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <HiShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {t('services.ourAdvantages')}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {Array.isArray(advantages) && advantages.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-white/90">
                      <HiCheck className="flex-shrink-0 w-4 h-4 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-6 text-center border border-gray-100 rounded-2xl"
              >
                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  {t('services.freeConsultation')}
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  {t('services.freeConsultationDesc')}
                </p>
                <Link
                  to="/contact"
                  className={`inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-xl bg-gradient-to-r ${service.color} hover:shadow-lg`}
                >
                  {t('contact.title')}
                  <HiArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
};

export default ServiceDetailPage;
