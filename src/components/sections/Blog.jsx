import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight, HiClock, HiTag } from 'react-icons/hi';

const Blog = ({ limit = 3 }) => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: t('blog.categories.all') },
    { id: 'tax', label: t('blog.categories.tax') },
    { id: 'business', label: t('blog.categories.business') },
    { id: 'regulations', label: t('blog.categories.regulations') },
  ];

  // Sample blog posts data
  const posts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop',
      category: 'tax',
      readTime: 5,
      title: t('blog.posts.1.title'),
      excerpt: t('blog.posts.1.excerpt'),
      date: t('blog.posts.1.date'),
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop',
      category: 'regulations',
      readTime: 4,
      title: t('blog.posts.2.title'),
      excerpt: t('blog.posts.2.excerpt'),
      date: t('blog.posts.2.date'),
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
      category: 'tax',
      readTime: 6,
      title: t('blog.posts.3.title'),
      excerpt: t('blog.posts.3.excerpt'),
      date: t('blog.posts.3.date'),
    },
  ];

  const filteredPosts = activeCategory === 'all'
    ? posts
    : posts.filter((post) => post.category === activeCategory);

  const displayPosts = limit ? filteredPosts.slice(0, limit) : filteredPosts;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
            Latest News
          </span>
          <h2 className="section-title">{t('blog.title')}</h2>
          <p className="section-subtitle">{t('blog.subtitle')}</p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                activeCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
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
              className="overflow-hidden transition-all duration-300 bg-white shadow-sm group rounded-2xl hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-white rounded-full bg-primary-600/90 backdrop-blur-sm">
                    <HiTag className="w-3 h-3 mr-1" />
                    {t(`blog.categories.${post.category}`)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center mb-3 text-sm text-gray-500">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <HiClock className="w-4 h-4 mr-1" />
                    {post.readTime} {t('blog.readTime')}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mb-3 text-lg font-bold text-gray-900 transition-colors line-clamp-2 group-hover:text-primary-600">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Read More Link */}
                <Link
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-sm font-semibold transition-colors text-primary-600 hover:text-primary-700 group/link"
                >
                  {t('blog.readMore')}
                  <HiArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" />
                </Link>
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
              View All Articles
              <HiArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Blog;
