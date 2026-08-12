// Firebase initialization for the INEA web app (project: inea-4cc96).
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBH1lpxnL_2O8A4CeUFuVTgqakjiykn7Gw',
  authDomain: 'inea-4cc96.firebaseapp.com',
  projectId: 'inea-4cc96',
  storageBucket: 'inea-4cc96.firebasestorage.app',
  messagingSenderId: '639225333422',
  appId: '1:639225333422:web:634f98e2ddc9ac0e190f3f',
  measurementId: 'G-JMBRD681M7',
};

export const app = initializeApp(firebaseConfig);

// Analytics is unavailable in some environments (unsupported browsers,
// blocked cookies, non-browser contexts), so gate it behind isSupported().
export let analytics = null;
isSupported()
  .then((supported) => {
    if (supported) analytics = getAnalytics(app);
  })
  .catch(() => {});
