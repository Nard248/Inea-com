import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Suspense, lazy, useEffect } from 'react';

// Layout
import Layout from './components/layout/Layout';

// Pages (lazy loaded for better performance)
const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const CalculatorsPage = lazy(() => import('./pages/CalculatorsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="relative">
      <div className="w-16 h-16 border-4 rounded-full border-primary-200 animate-spin border-t-primary-600" />
      <img
        src={`${import.meta.env.BASE_URL}Logo.jpg`}
        alt="INEA"
        className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
      />
    </div>
  </div>
);

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Animated page wrapper
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// Animated Routes component
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <PageWrapper>
                <HomePage />
              </PageWrapper>
            }
          />
          <Route
            path="services"
            element={
              <PageWrapper>
                <ServicesPage />
              </PageWrapper>
            }
          />
          <Route
            path="calculators"
            element={
              <PageWrapper>
                <CalculatorsPage />
              </PageWrapper>
            }
          />
          <Route
            path="blog"
            element={
              <PageWrapper>
                <BlogPage />
              </PageWrapper>
            }
          />
          <Route
            path="about"
            element={
              <PageWrapper>
                <AboutPage />
              </PageWrapper>
            }
          />
          <Route
            path="contact"
            element={
              <PageWrapper>
                <ContactPage />
              </PageWrapper>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router basename="/Inea-com">
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <AnimatedRoutes />
      </Suspense>
    </Router>
  );
}

export default App;
