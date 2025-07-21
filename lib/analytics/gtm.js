import { ANALYTICS_CONFIG } from './config';

export const GTM_SCRIPT = `
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${ANALYTICS_CONFIG.GTM_CONTAINER_ID}');
`;

export const GTM_NOSCRIPT = `
  <iframe src="https://www.googletagmanager.com/ns.html?id=${ANALYTICS_CONFIG.GTM_CONTAINER_ID}"
  height="0" width="0" style="display:none;visibility:hidden"></iframe>
`;

// Initialize dataLayer
export const initDataLayer = () => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    
    // Push initial configuration
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
      // Custom dimensions
      user_properties: {
        environment: ANALYTICS_CONFIG.IS_PRODUCTION ? 'production' : 'development',
        site_name: 'Trap Harmony',
        currency: 'USD'
      }
    });
  }
};

// GTM event pushing function
export const pushToDataLayer = (event) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    if (ANALYTICS_CONFIG.DEBUG_MODE) {
      console.log('GTM Event:', event);
    }
    window.dataLayer.push(event);
  }
};
