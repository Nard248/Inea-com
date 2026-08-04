import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight, HiCalendar, HiExternalLink, HiNewspaper, HiX } from 'react-icons/hi';
import useSrcNews from '../../hooks/useSrcNews';
import sanitizeHtml from '../../utils/sanitizeHtml';

const SRC_NEWS_URL = 'https://www.src.am/am/showNewsPage/30';
const DATE_LOCALES = { en: 'en-GB', hy: 'hy-AM', ru: 'ru-RU' };

const formatDate = (isoDate, language) =>
  new Date(isoDate).toLocaleDateString(DATE_LOCALES[language] ?? 'hy-AM', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const NewsModal = ({ post, language, onClose }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const onKeyDown = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const safeHtml = useMemo(() => sanitizeHtml(post.html), [post.html]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-3xl max-h-[85vh] overflow-hidden bg-white shadow-2xl rounded-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label={t('blog.close')}
          className="absolute z-10 p-2 text-gray-600 transition-colors bg-white/90 rounded-full shadow-md top-4 right-4 hover:bg-white hover:text-gray-900"
        >
          <HiX className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto">
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="object-cover w-full max-h-72"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          )}

          <div className="p-6 sm:p-8">
            <div className="flex items-center mb-4 text-sm text-gray-500">
              <HiCalendar className="w-4 h-4 mr-1.5" />
              {formatDate(post.date, language)}
            </div>

            <h2 className="mb-6 text-2xl font-bold leading-snug text-gray-900">
              {post.title}
            </h2>

            <div
              className="text-gray-700 leading-relaxed [&_p]:mb-4 [&_a]:text-primary-600 [&_a]:underline [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_li]:mb-1 [&_img]:rounded-xl [&_img]:my-4"
              dangerouslySetInnerHTML={{ __html: safeHtml }}
            />

            <a
              href={SRC_NEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-4 text-sm font-semibold transition-colors text-primary-600 hover:text-primary-700"
            >
              {t('blog.viewOnSource')}
              <HiExternalLink className="w-4 h-4 ml-1.5" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Blog = ({ limit = 3 }) => {
  const { t, i18n } = useTranslation();
  const posts = useSrcNews();
  const [selectedPost, setSelectedPost] = useState(null);

  const language = i18n.language?.split('-')[0] ?? 'hy';
  const displayPosts = limit ? posts.slice(0, limit) : posts;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 bg-gray-50 lg:py-32" id="blog">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold rounded-full text-primary-700 bg-primary-100">
            {t('blog.badge')}
          </span>
          <h2 className="section-title">{t('blog.title')}</h2>
          <p className="section-subtitle">{t('blog.subtitle')}</p>

          {/* Source attribution */}
          <a
            href={SRC_NEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-1.5 mt-6 text-sm font-medium text-gray-600 transition-colors bg-white border border-gray-200 rounded-full hover:border-primary-300 hover:text-primary-700"
          >
            <HiNewspaper className="w-4 h-4 mr-2 text-primary-600" />
            {t('blog.source')}
            <HiExternalLink className="w-3.5 h-3.5 ml-1.5 text-gray-400" />
          </a>
        </motion.div>

        {/* News Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {displayPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              onClick={() => setSelectedPost(post)}
              className="overflow-hidden transition-all duration-300 bg-white shadow-sm cursor-pointer group rounded-2xl hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-video bg-gradient-to-br from-primary-50 to-primary-100">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                )}
                <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100" />

                {/* Date badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-white rounded-full bg-primary-600/90 backdrop-blur-sm">
                    <HiCalendar className="w-3 h-3 mr-1" />
                    {formatDate(post.date, language)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="mb-3 text-lg font-bold text-gray-900 transition-colors line-clamp-2 group-hover:text-primary-600">
                  {post.title}
                </h3>

                <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                  {post.excerpt}
                </p>

                <span className="inline-flex items-center text-sm font-semibold transition-colors text-primary-600 group-hover:text-primary-700">
                  {t('blog.readMore')}
                  <HiArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Link */}
        {limit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              to="/blog"
              className="inline-flex items-center px-8 py-4 text-sm font-semibold transition-all duration-300 rounded-xl text-primary-700 bg-primary-50 hover:bg-primary-100 group"
            >
              {t('blog.viewAll')}
              <HiArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        )}
      </div>

      {/* Full article modal */}
      <AnimatePresence>
        {selectedPost && (
          <NewsModal
            post={selectedPost}
            language={language}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Blog;
