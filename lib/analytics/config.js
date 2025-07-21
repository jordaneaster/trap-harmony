export const ANALYTICS_CONFIG = {
  // Google Analytics 4
  GA4_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
  
  // Google Tag Manager
  GTM_CONTAINER_ID: process.env.NEXT_PUBLIC_GTM_CONTAINER_ID,
  
  // Meta Pixel
  META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  
  // TikTok Pixel (for future use)
  TIKTOK_PIXEL_ID: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID,
  
  // Pinterest Tag (for future use)
  PINTEREST_TAG_ID: process.env.NEXT_PUBLIC_PINTEREST_TAG_ID,
  
  // Environment settings
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  DEBUG_MODE: process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true',
  
  // Consent management
  CONSENT_BANNER_ENABLED: process.env.NEXT_PUBLIC_CONSENT_BANNER === 'true',
  
  // Custom events configuration
  EVENTS: {
    // Page tracking
    PAGE_VIEW: 'page_view',
    
    // User interactions
    SCROLL_DEPTH: 'scroll_depth',
    CLICK: 'click_event',
    FORM_SUBMIT: 'form_submit',
    
    // eCommerce events
    VIEW_ITEM: 'view_item',
    ADD_TO_CART: 'add_to_cart',
    REMOVE_FROM_CART: 'remove_from_cart',
    BEGIN_CHECKOUT: 'begin_checkout',
    PURCHASE: 'purchase',
    VIEW_ITEM_LIST: 'view_item_list',
    SEARCH: 'search',
    
    // User lifecycle
    SIGN_UP: 'sign_up',
    LOGIN: 'login',
    
    // Custom brand events
    SIZE_GUIDE_VIEW: 'size_guide_view',
    NEWSLETTER_SIGNUP: 'newsletter_signup',
    WISHLIST_ADD: 'add_to_wishlist',
    SOCIAL_SHARE: 'social_share'
  }
};
