import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import './styles/projects.css';

export default function App() {
  const getPath = () => {
    // Check hash for SPA fallback (e.g., #/services or #/projects)
    const hash = window.location.hash;
    if (hash && hash.startsWith('#/')) {
      return hash.slice(1);
    }
    return window.location.pathname;
  };

  const [currentPath, setCurrentPath] = useState(getPath);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(getPath());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    // Global link interceptor for SPA navigation
    const handleLinkClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;

      // Only handle internal links starting with /
      if (href.startsWith('/') && !href.startsWith('//') && !anchor.target) {
        const [targetPathWithQuery, targetHash] = href.split('#');
        const [cleanTargetPath] = targetPathWithQuery.split('?');
        const currentClean = window.location.pathname.replace(/\/$/, '') || '/';
        const targetClean = (cleanTargetPath || '/').replace(/\/$/, '') || '/';
        const isCurrentRoute = currentClean === targetClean;

        if (isCurrentRoute && targetHash) {
          // Same page hash navigation - let browser or smooth scroll handle it
          return;
        }

        e.preventDefault();
        window.history.pushState(null, '', href);
        setCurrentPath(cleanTargetPath || '/');

        if (targetHash) {
          setTimeout(() => {
            const el = document.getElementById(targetHash);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 120);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  const normalizedPath = (currentPath || window.location.pathname).toLowerCase().replace(/\/$/, '') || '/';

  if (normalizedPath === '/services' || normalizedPath.endsWith('/services')) {
    return <Services />;
  }

  if (
    normalizedPath === '/projects' ||
    normalizedPath.startsWith('/projects/') ||
    normalizedPath.endsWith('/projects') ||
    normalizedPath.includes('/projects')
  ) {
    return <Projects />;
  }

  return <Home />;
}
