import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Ensure user always lands on the home page ('/') and at the top on every reload
if (typeof window !== 'undefined') {
  // Prevent browser from restoring scroll position from previous page
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  const wasReloadedBySession = sessionStorage.getItem('aps_was_reloaded') === 'true';
  sessionStorage.removeItem('aps_was_reloaded');

  const navEntries = window.performance?.getEntriesByType?.('navigation');
  const isReload =
    wasReloadedBySession ||
    (navEntries && navEntries.length > 0 && navEntries[0].type === 'reload') ||
    window.performance?.navigation?.type === 1;

  if (isReload) {
    if (window.location.pathname !== '/' || window.location.search || window.location.hash) {
      window.history.replaceState(null, '', '/');
    }
    window.scrollTo(0, 0);
  }

  // Set flag when page unloads so reloads/refreshes are reliably detected across all browsers
  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('aps_was_reloaded', 'true');
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

