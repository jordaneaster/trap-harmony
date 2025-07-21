import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { trackPageView, initScrollTracking } from '../lib/analytics/tracking';
import { initDataLayer } from '../lib/analytics/gtm';
import { initConsentDefaults, shouldLoadAnalytics } from '../lib/analytics/consent';
import ConsentBanner from '../components/ConsentBanner';
import Layout from '../components/Layout'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Initialize analytics on app load
    initDataLayer();
    initConsentDefaults();
    
    // Track initial page view
    const handleRouteComplete = (url) => {
      if (shouldLoadAnalytics()) {
        trackPageView(url, document.title);
      }
    };

    // Track page changes
    router.events.on('routeChangeComplete', handleRouteComplete);
    
    // Track initial page
    handleRouteComplete(router.asPath);
    
    // Initialize scroll tracking
    const cleanupScrollTracking = initScrollTracking();

    return () => {
      router.events.off('routeChangeComplete', handleRouteComplete);
      if (cleanupScrollTracking) {
        cleanupScrollTracking();
      }
    };
  }, [router]);

  return (
    <Layout>
      <Component {...pageProps} />
      <ConsentBanner />
    </Layout>
  )
}
