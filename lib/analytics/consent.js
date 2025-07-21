import { ANALYTICS_CONFIG } from './config';

export const CONSENT_TYPES = {
  ANALYTICS: 'analytics_storage',
  ADS: 'ad_storage',
  FUNCTIONALITY: 'functionality_storage',
  PERSONALIZATION: 'personalization_storage'
};

export const getConsentStatus = () => {
  if (typeof window === 'undefined') return null;
  
  const consent = localStorage.getItem('trap_harmony_consent');
  return consent ? JSON.parse(consent) : null;
};

export const setConsentStatus = (consentData) => {
  if (typeof window === 'undefined') return;
  
  const consentObj = {
    ...consentData,
    timestamp: Date.now(),
    version: '1.0'
  };
  
  localStorage.setItem('trap_harmony_consent', JSON.stringify(consentObj));
  
  // Update GTM consent
  if (window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: consentData.analytics ? 'granted' : 'denied',
      ad_storage: consentData.advertising ? 'granted' : 'denied',
      functionality_storage: consentData.functional ? 'granted' : 'denied',
      personalization_storage: consentData.personalization ? 'granted' : 'denied'
    });
  }
  
  return consentObj;
};

export const initConsentDefaults = () => {
  if (typeof window === 'undefined') return;
  
  // Set default consent to denied (GDPR compliant)
  if (window.gtag) {
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      functionality_storage: 'granted', // Usually granted for basic functionality
      personalization_storage: 'denied',
      wait_for_update: 2000
    });
  }
};

export const hasValidConsent = () => {
  const consent = getConsentStatus();
  if (!consent) return false;
  
  // Check if consent is less than 365 days old
  const oneYear = 365 * 24 * 60 * 60 * 1000;
  return (Date.now() - consent.timestamp) < oneYear;
};

export const shouldLoadAnalytics = () => {
  if (!ANALYTICS_CONFIG.CONSENT_BANNER_ENABLED) return true;
  
  const consent = getConsentStatus();
  return consent && consent.analytics;
};

export const shouldLoadAdvertising = () => {
  if (!ANALYTICS_CONFIG.CONSENT_BANNER_ENABLED) return true;
  
  const consent = getConsentStatus();
  return consent && consent.advertising;
};
