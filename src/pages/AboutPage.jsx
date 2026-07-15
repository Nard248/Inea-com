import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HiAcademicCap,
  HiEye,
  HiShieldCheck,
  HiHeart,
  HiCheckCircle,
  HiArrowRight,
  HiLightBulb,
  HiUserGroup,
  HiOfficeBuilding,
  HiClipboardCheck,
  HiTrendingUp,
  HiDocumentText,
} from 'react-icons/hi';
import CTA from '../components/sections/CTA';

const AboutPage = () => {
  const { t } = useTranslation();

  // Values with icons
  const values = [
    {
      id: 'professionalism',
      icon: HiAcademicCap,
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'accuracy',
      icon: HiEye,
      color: 'from-emerald-500 to-emerald-700',
      bgColor: 'bg-emerald-50',
    },
    {
      id: 'responsibility',
      icon: HiShieldCheck,
      color: 'from-amber-500 to-amber-700',
      bgColor: 'bg-amber-50',
    },
    {
      id: 'reliability',
      icon: HiHeart,
      color: 'from-rose-500 to-rose-700',
      bgColor: 'bg-rose-50',
    },
  ];

  // Why choose us reasons with icons
  const whyChooseReasons = [
    { id: 'r1', icon: HiLightBulb },
    { id: 'r2', icon: HiUserGroup },
    { id: 'r3', icon: HiOfficeBuilding },
    { id: 'r4', icon: HiClipboardCheck },
    { id: 'r5', icon: HiTrendingUp },
    { id: 'r6', icon: HiDocumentText },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-gray-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-100/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary-100/20 to-accent-100/20 rounded-full blur-3xl" />

        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold rounded-full text-primary-700 bg-primary-100">
                {t('aboutPage.badge')}
              </span>
              <h1 className="text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
                {t('aboutPage.heroTitle')}{' '}
                <span className="gradient-text">{t('aboutPage.heroTitleHighlight')}</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 md:text-xl leading-relaxed">
                {t('aboutPage.heroSubtitle')}
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/contact" className="btn-primary">
                  {t('aboutPage.getStarted')}
                  <HiArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link to="/services" className="btn-secondary">
                  {t('aboutPage.exploreServices')}
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl rotate-6 opacity-20" />
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&auto=format&fit=crop&q=80"
                  alt="INEA Team"
                  className="relative rounded-3xl shadow-2xl object-cover w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              {t('aboutPage.companyTitle')}
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              {t('aboutPage.companyDescription')}
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              {t('aboutPage.companyBelief')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold rounded-full text-primary-700 bg-primary-100">
                {t('aboutPage.missionBadge')}
              </span>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                {t('aboutPage.missionTitle')}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('aboutPage.missionDescription')}
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                {t('aboutPage.missionPartnership')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop&q=80"
                alt="Our Mission"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 p-6 bg-white rounded-xl shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary-100">
                    <HiCheckCircle className="w-8 h-8 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">500+</p>
                    <p className="text-sm text-gray-600">{t('aboutPage.clientsServed')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-16 text-center"
          >
            <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold rounded-full text-primary-700 bg-primary-100">
              {t('aboutPage.valuesBadge')}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              {t('aboutPage.valuesTitle')}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t('aboutPage.valuesSubtitle')}
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={value.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className={`p-8 rounded-2xl ${value.bgColor} transition-all duration-300 hover:shadow-lg h-full`}>
                    <div className={`inline-flex items-center justify-center w-14 h-14 mb-6 rounded-xl bg-gradient-to-br ${value.color}`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-gray-900">
                      {t(`aboutPage.values.${value.id}.title`)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t(`aboutPage.values.${value.id}.description`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <img
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600&auto=format&fit=crop&q=80"
                alt="Our Approach"
                className="rounded-2xl shadow-xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold rounded-full text-primary-700 bg-primary-100">
                {t('aboutPage.approachBadge')}
              </span>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                {t('aboutPage.approachTitle')}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('aboutPage.approachDescription')}
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                {t('aboutPage.approachModern')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-16 text-center"
          >
            <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold rounded-full text-primary-200 bg-primary-800/50">
              {t('aboutPage.whyChooseBadge')}
            </span>
            <h2 className="text-3xl font-bold md:text-4xl">
              {t('aboutPage.whyChooseTitle')}
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyChooseReasons.map((reason, index) => {
              const IconComponent = reason.icon;
              return (
                <motion.div
                  key={reason.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-colors"
                >
                  <div className="flex-shrink-0 p-3 rounded-lg bg-primary-500/30">
                    <IconComponent className="w-6 h-6 text-primary-200" />
                  </div>
                  <p className="text-lg text-primary-100">
                    {t(`aboutPage.whyChoose.${reason.id}`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Goal & Outcome Section */}
      <section className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold rounded-full text-primary-700 bg-primary-100">
                {t('aboutPage.goalBadge')}
              </span>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                {t('aboutPage.goalTitle')}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('aboutPage.goalDescription')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-100"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <HiCheckCircle className="w-8 h-8 text-primary-600" />
                <h3 className="text-2xl font-bold text-gray-900">{t('aboutPage.resultTitle')}</h3>
              </div>
              <p className="text-lg text-gray-700">
                {t('aboutPage.resultDescription')}
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
