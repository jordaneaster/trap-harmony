import { ANALYTICS_CONFIG } from './config';
import { pushToDataLayer } from './gtm';

// Main tracking function
export const trackEvent = (eventName, parameters = {}) => {
  if (!ANALYTICS_CONFIG.IS_PRODUCTION && !ANALYTICS_CONFIG.DEBUG_MODE) {
    return;
  }

  const eventData = {
    event: eventName,
    event_timestamp: Date.now(),
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    page_title: typeof window !== 'undefined' ? document.title : '',
    ...parameters
  };

  // Push to GTM dataLayer (which handles GA4, Meta Pixel, etc.)
  pushToDataLayer(eventData);
};

// Page view tracking
export const trackPageView = (pagePath, pageTitle) => {
  trackEvent(ANALYTICS_CONFIG.EVENTS.PAGE_VIEW, {
    page_path: pagePath,
    page_title: pageTitle
  });
};

// eCommerce tracking functions
export const trackViewItem = (item) => {
  trackEvent(ANALYTICS_CONFIG.EVENTS.VIEW_ITEM, {
    currency: 'USD',
    value: parseFloat(item.price),
    items: [{
      item_id: item.id,
      item_name: item.name,
      item_category: item.category,
      item_variant: item.variant || item.color,
      price: parseFloat(item.price),
      quantity: 1
    }]
  });
};

export const trackAddToCart = (item, quantity = 1) => {
  trackEvent(ANALYTICS_CONFIG.EVENTS.ADD_TO_CART, {
    currency: 'USD',
    value: parseFloat(item.price) * quantity,
    items: [{
      item_id: item.id,
      item_name: item.name,
      item_category: item.category,
      item_variant: item.variant || item.color,
      price: parseFloat(item.price),
      quantity: quantity
    }]
  });
};

export const trackRemoveFromCart = (item, quantity = 1) => {
  trackEvent(ANALYTICS_CONFIG.EVENTS.REMOVE_FROM_CART, {
    currency: 'USD',
    value: parseFloat(item.price) * quantity,
    items: [{
      item_id: item.id,
      item_name: item.name,
      item_category: item.category,
      item_variant: item.variant || item.color,
      price: parseFloat(item.price),
      quantity: quantity
    }]
  });
};

export const trackBeginCheckout = (items, value) => {
  trackEvent(ANALYTICS_CONFIG.EVENTS.BEGIN_CHECKOUT, {
    currency: 'USD',
    value: parseFloat(value),
    items: items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category,
      item_variant: item.variant || item.color,
      price: parseFloat(item.price),
      quantity: item.quantity
    }))
  });
};

export const trackPurchase = (transactionId, items, value, coupon = null) => {
  trackEvent(ANALYTICS_CONFIG.EVENTS.PURCHASE, {
    transaction_id: transactionId,
    currency: 'USD',
    value: parseFloat(value),
    coupon: coupon,
    items: items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category,
      item_variant: item.variant || item.color,
      price: parseFloat(item.price),
      quantity: item.quantity
    }))
  });
};

// User lifecycle tracking
export const trackSignUp = (method = 'email') => {
  trackEvent(ANALYTICS_CONFIG.EVENTS.SIGN_UP, {
    method: method
  });
};

export const trackLogin = (method = 'email') => {
  trackEvent(ANALYTICS_CONFIG.EVENTS.LOGIN, {
    method: method
  });
};

// Custom brand events
export const trackNewsletterSignup = (location = 'footer') => {
  trackEvent(ANALYTICS_CONFIG.EVENTS.NEWSLETTER_SIGNUP, {
    location: location
  });
};

export const trackSizeGuideView = (productId) => {
  trackEvent(ANALYTICS_CONFIG.EVENTS.SIZE_GUIDE_VIEW, {
    product_id: productId
  });
};

export const trackWishlistAdd = (item) => {
  trackEvent(ANALYTICS_CONFIG.EVENTS.WISHLIST_ADD, {
    item_id: item.id,
    item_name: item.name,
    item_category: item.category,
    value: parseFloat(item.price)
  });
};

// Scroll depth tracking
export const initScrollTracking = () => {
  if (typeof window === 'undefined') return;

  let scrollDepths = [25, 50, 75, 90];
  let triggeredDepths = new Set();

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    scrollDepths.forEach(depth => {
      if (scrollPercent >= depth && !triggeredDepths.has(depth)) {
        triggeredDepths.add(depth);
        trackEvent(ANALYTICS_CONFIG.EVENTS.SCROLL_DEPTH, {
          scroll_depth: depth
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => window.removeEventListener('scroll', handleScroll);
};
