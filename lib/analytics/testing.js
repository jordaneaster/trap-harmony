import { ANALYTICS_CONFIG } from './config';

// Debug mode helpers
export const enableDebugMode = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('trap_harmony_debug', 'true');
    console.log('Analytics debug mode enabled');
  }
};

export const disableDebugMode = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('trap_harmony_debug');
    console.log('Analytics debug mode disabled');
  }
};

export const isDebugMode = () => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('trap_harmony_debug') === 'true' || ANALYTICS_CONFIG.DEBUG_MODE;
};

// GTM debugging
export const debugDataLayer = () => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    console.table(window.dataLayer);
    return window.dataLayer;
  }
  return [];
};

// Test event firing
export const testAnalyticsEvents = () => {
  const testEvents = [
    { event: 'test_page_view', page_path: '/test' },
    { event: 'test_click', element: 'test_button' },
    { event: 'test_purchase', transaction_id: 'test_123', value: 99.99 }
  ];

  testEvents.forEach((eventData, index) => {
    setTimeout(() => {
      if (window.dataLayer) {
        window.dataLayer.push(eventData);
        console.log(`Test event ${index + 1} fired:`, eventData);
      }
    }, index * 1000);
  });
};

// Validation functions
export const validateGTMSetup = () => {
  const checks = {
    gtmLoaded: typeof window !== 'undefined' && window.google_tag_manager !== undefined,
    dataLayerExists: typeof window !== 'undefined' && Array.isArray(window.dataLayer),
    containerIdSet: !!ANALYTICS_CONFIG.GTM_CONTAINER_ID
  };

  console.log('GTM Setup Validation:', checks);
  return Object.values(checks).every(Boolean);
};

export const validateGA4Setup = () => {
  const checks = {
    measurementIdSet: !!ANALYTICS_CONFIG.GA4_MEASUREMENT_ID,
    gtagLoaded: typeof window !== 'undefined' && typeof window.gtag === 'function'
  };

  console.log('GA4 Setup Validation:', checks);
  return Object.values(checks).every(Boolean);
};

export const validateMetaPixelSetup = () => {
  const checks = {
    pixelIdSet: !!ANALYTICS_CONFIG.META_PIXEL_ID,
    fbqLoaded: typeof window !== 'undefined' && typeof window.fbq === 'function'
  };

  console.log('Meta Pixel Setup Validation:', checks);
  return Object.values(checks).every(Boolean);
};

// UTM parameter extraction
export const getUTMParameters = () => {
  if (typeof window === 'undefined') return {};

  const urlParams = new URLSearchParams(window.location.search);
  const utmParams = {};

  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
    const value = urlParams.get(param);
    if (value) {
      utmParams[param] = value;
    }
  });

  return utmParams;
};

// Store UTM parameters in sessionStorage for attribution
export const storeUTMParameters = () => {
  if (typeof window === 'undefined') return;

  const utmParams = getUTMParameters();
  if (Object.keys(utmParams).length > 0) {
    sessionStorage.setItem('trap_harmony_utm', JSON.stringify(utmParams));
  }
};

export const getStoredUTMParameters = () => {
  if (typeof window === 'undefined') return {};

  const stored = sessionStorage.getItem('trap_harmony_utm');
  return stored ? JSON.parse(stored) : {};
};
