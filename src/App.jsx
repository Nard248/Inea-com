import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { Suspense, lazy, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGS, DEFAULT_LANG, localizePath } from './components/LocalizedLink';

// Layout
import Layout from './components/layout/Layout';

// Pages (lazy loaded for better performance)
const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const CalculatorsPage = lazy(() => import('./pages/CalculatorsPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const IndustriesPage = lazy(() => import('./pages/IndustriesPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="relative">
      <div className="w-16 h-16 border-4 rounded-full border-primary-200 animate-spin border-t-primary-600" />
      <img
        src={`${import.meta.env.BASE_URL}Logo.png`}
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

// Unknown paths inside a language tree go to that language's home page
// instead of rendering a blank screen.
const RedirectHome = () => {
  const { i18n } = useTranslation();
  return <Navigate to={localizePath('/', i18n.language)} replace />;
};

// Language wrapper: the URL prefix decides the language (/ = hy, /en, /ru).
const LanguageLayout = ({ lang }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Sync i18n when a client-side navigation crosses a language boundary.
  // Deliberately a passive effect: on first mount the pages' useTranslation
  // hooks subscribe in their own passive effects, which run before this one
  // (child-first) — a layout effect here would fire languageChanged before
  // anyone listens and the switch would be lost. Direct loads are already
  // covered by the URL sniff in src/i18n/index.js.
  useEffect(() => {
    if (i18n.language !== lang) i18n.changeLanguage(lang);
  }, [lang, i18n]);

  // Returning visitors who explicitly picked EN/RU (stored by the language
  // switcher) get moved from Armenian URLs to their language. Crawlers carry
  // no localStorage, so they always see Armenian at the root URLs.
  useEffect(() => {
    if (lang !== DEFAULT_LANG) return;
    const stored = localStorage.getItem('i18nextLng');
    if (stored && stored !== DEFAULT_LANG && LANGS.includes(stored)) {
      navigate(localizePath(pathname, stored), { replace: true });
    }
    // mount-only: reacting to later pathname changes would fight navigation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Layout />;
};

// Animated Routes component
const AnimatedRoutes = () => {
  const location = useLocation();

  // One shared set of page routes, mounted under all three language trees.
  const pageRoutes = (
    <>
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
            path="services/:serviceId"
            element={
              <PageWrapper>
                <ServiceDetailPage />
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
            path="pricing"
            element={
              <PageWrapper>
                <PricingPage />
              </PageWrapper>
            }
          />
          <Route
            path="industries"
            element={
              <PageWrapper>
                <IndustriesPage />
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
      <Route path="*" element={<RedirectHome />} />
    </>
  );

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LanguageLayout lang="hy" />}>
          {pageRoutes}
        </Route>
        <Route path="/en" element={<LanguageLayout lang="en" />}>
          {pageRoutes}
        </Route>
        <Route path="/ru" element={<LanguageLayout lang="ru" />}>
          {pageRoutes}
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <HelmetProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <AnimatedRoutes />
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}

export default App;
