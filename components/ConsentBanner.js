import { useState, useEffect } from 'react';
import { setConsentStatus, getConsentStatus, hasValidConsent } from '../lib/analytics/consent';
import { trackEvent } from '../lib/analytics/tracking';

export default function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Show banner if no valid consent exists
    if (!hasValidConsent()) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = setConsentStatus({
      analytics: true,
      advertising: true,
      functional: true,
      personalization: true
    });
    
    trackEvent('consent_granted', { consent_type: 'all' });
    setShowBanner(false);
    
    // Reload page to initialize tracking
    window.location.reload();
  };

  const handleRejectAll = () => {
    const consent = setConsentStatus({
      analytics: false,
      advertising: false,
      functional: true, // Keep functional for basic site operation
      personalization: false
    });
    
    trackEvent('consent_denied', { consent_type: 'all' });
    setShowBanner(false);
  };

  const handleCustomSettings = (settings) => {
    const consent = setConsentStatus(settings);
    trackEvent('consent_custom', { consent_details: settings });
    setShowBanner(false);
    
    // Reload if analytics was enabled
    if (settings.analytics) {
      window.location.reload();
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto">
        {!showDetails ? (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm">
                We use cookies to enhance your experience, analyze site traffic, and serve personalized ads. 
                By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => setShowDetails(true)}
                className="px-4 py-2 text-sm border border-gray-400 rounded hover:bg-gray-800 transition-colors"
              >
                Customize
              </button>
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 text-sm border border-gray-400 rounded hover:bg-gray-800 transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-sm bg-white text-black rounded hover:bg-gray-200 transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <ConsentDetails 
            onSave={handleCustomSettings}
            onBack={() => setShowDetails(false)}
          />
        )}
      </div>
    </div>
  );
}

function ConsentDetails({ onSave, onBack }) {
  const [settings, setSettings] = useState({
    analytics: false,
    advertising: false,
    functional: true,
    personalization: false
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Cookie Preferences</h3>
        <button onClick={onBack} className="text-gray-400 hover:text-white">
          ← Back
        </button>
      </div>
      
      <div className="grid gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Essential Cookies</h4>
            <p className="text-xs text-gray-400">Required for basic site functionality</p>
          </div>
          <input type="checkbox" checked disabled className="opacity-50" />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Analytics Cookies</h4>
            <p className="text-xs text-gray-400">Help us understand how visitors use our site</p>
          </div>
          <input 
            type="checkbox" 
            checked={settings.analytics}
            onChange={(e) => setSettings(prev => ({ ...prev, analytics: e.target.checked }))}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Advertising Cookies</h4>
            <p className="text-xs text-gray-400">Used to show relevant ads and measure campaign performance</p>
          </div>
          <input 
            type="checkbox" 
            checked={settings.advertising}
            onChange={(e) => setSettings(prev => ({ ...prev, advertising: e.target.checked }))}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Personalization Cookies</h4>
            <p className="text-xs text-gray-400">Remember your preferences and personalize content</p>
          </div>
          <input 
            type="checkbox" 
            checked={settings.personalization}
            onChange={(e) => setSettings(prev => ({ ...prev, personalization: e.target.checked }))}
          />
        </div>
      </div>
      
      <div className="flex gap-2 pt-2">
        <button
          onClick={() => onSave(settings)}
          className="px-4 py-2 text-sm bg-white text-black rounded hover:bg-gray-200 transition-colors"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}
