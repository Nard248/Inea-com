import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Link from '../components/LocalizedLink';

/**
 * Shown for unknown URLs. Prerendered to dist/404.html, which Firebase Hosting
 * serves with a real 404 status — search engines drop dead URLs instead of
 * indexing them as copies of the home page ("soft 404").
 * No <Seo>: a 404 must not declare a canonical URL or hreflang alternates.
 */
const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{`${t('seo.notFound.title')} | INEA`}</title>
        <meta name="description" content={t('seo.notFound.description')} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <section className="relative flex items-center min-h-[70vh] pt-32 pb-20 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-gray-50">
        <div className="absolute top-0 right-0 rounded-full w-96 h-96 bg-primary-100/50 blur-3xl" />
        <div className="absolute bottom-0 left-0 rounded-full w-72 h-72 bg-accent-100/30 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-2xl px-4 mx-auto text-center sm:px-6 lg:px-8"
        >
          <p className="text-7xl font-bold md:text-8xl gradient-text">404</p>
          <h1 className="mt-6 text-3xl font-bold text-gray-900 md:text-4xl">
            {t('notFound.title')}
          </h1>
          <p className="mt-4 text-lg text-gray-600">{t('notFound.text')}</p>
          <div className="flex flex-col justify-center gap-4 mt-10 sm:flex-row">
            <Link to="/" className="btn-primary">
              {t('notFound.backHome')}
            </Link>
            <Link to="/services" className="btn-secondary">
              {t('notFound.viewServices')}
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default NotFoundPage;
