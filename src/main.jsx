import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './i18n';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Firebase is only used for Analytics — load it after the page is up so its
// SDK stays out of the critical bundle (faster first load, better Web Vitals).
const loadAnalytics = () => import('./firebase');
if (document.readyState === 'complete') loadAnalytics();
else window.addEventListener('load', loadAnalytics, { once: true });
