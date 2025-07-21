# Trap Harmony Analytics Setup Guide

## Overview
This guide covers the complete analytics implementation for Trap Harmony, including GA4, GTM, Meta Pixel, and consent management.

## 1. Initial Setup

### Environment Variables
Add these to your `.env.local`:

```bash
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_CONTAINER_ID=GTM-XXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=1234567890123456
NEXT_PUBLIC_ANALYTICS_DEBUG=false
NEXT_PUBLIC_CONSENT_BANNER=true
```

### Google Tag Manager Configuration

1. **Create GTM Container**
   - Go to [Google Tag Manager](https://tagmanager.google.com)
   - Create new container for your domain
   - Copy the Container ID (GTM-XXXXXXX)

2. **Configure GA4 Tag**
   ```
   Tag Type: Google Analytics: GA4 Configuration
   Measurement ID: {{ GA4_MEASUREMENT_ID }}
   Trigger: All Pages
   ```

3. **Configure Meta Pixel Tag**
   ```
   Tag Type: Custom HTML
   HTML: 
   <script>
   !function(f,b,e,v,n,t,s)
   {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
   n.callMethod.apply(n,arguments):n.queue.push(arguments)};
   if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
   n.queue=[];t=b.createElement(e);t.async=!0;
   t.src=v;s=b.getElementsByTagName(e)[0];
   s.parentNode.insertBefore(t,s)}(window, document,'script',
   'https://connect.facebook.net/en_US/fbevents.js');
   fbq('init', '{{ META_PIXEL_ID }}');
   fbq('track', 'PageView');
   </script>
   
   Trigger: All Pages
   ```

4. **Create Variables**
   - GA4_MEASUREMENT_ID: Constant variable
   - META_PIXEL_ID: Constant variable

## 2. Event Tracking Implementation

### Basic Usage
```javascript
import { trackEvent, trackAddToCart, trackPurchase } from '../lib/analytics/tracking';

// Basic event
trackEvent('button_click', { button_name: 'header_cta' });

// eCommerce events
trackAddToCart(product, quantity);
trackPurchase(orderId, items, total);
```

### Product Page Implementation
```javascript
import { trackViewItem } from '../lib/analytics/tracking';

export default function ProductPage({ product }) {
  useEffect(() => {
    trackViewItem(product);
  }, [product]);

  return (
    // ...your component
  );
}
```

### Cart Implementation
```javascript
import { trackAddToCart, trackRemoveFromCart } from '../lib/analytics/tracking';

const addToCart = (product, quantity) => {
  // Add to cart logic
  trackAddToCart(product, quantity);
};

const removeFromCart = (product, quantity) => {
  // Remove from cart logic
  trackRemoveFromCart(product, quantity);
};
```

## 3. Testing Your Implementation

### Browser Testing
1. **Install Extensions**
   - Google Tag Assistant Legacy
   - Facebook Pixel Helper
   - GA Debugger

2. **Enable Debug Mode**
   ```javascript
   import { enableDebugMode } from '../lib/analytics/testing';
   enableDebugMode();
   ```

3. **Validate Setup**
   ```javascript
   import { validateGTMSetup, validateGA4Setup, validateMetaPixelSetup } from '../lib/analytics/testing';
   
   validateGTMSetup();
   validateGA4Setup();
   validateMetaPixelSetup();
   ```

### Testing Checklist
- [ ] GTM container loads
- [ ] GA4 pageviews register
- [ ] Meta Pixel fires PageView
- [ ] eCommerce events track properly
- [ ] Consent banner appears
- [ ] Consent preferences persist
- [ ] Debug events appear in console

## 4. Consent Management

### GDPR Compliance
The consent banner automatically handles:
- Default consent denial
- Granular consent options
- Consent persistence
- Analytics conditional loading

### Custom Consent Handling
```javascript
import { getConsentStatus, setConsentStatus } from '../lib/analytics/consent';

const consent = getConsentStatus();
if (consent && consent.analytics) {
  // Load analytics
}
```

## 5. UTM Campaign Tracking

### URL Structure
```
https://trapharmony.com?utm_source=instagram&utm_medium=paid_social&utm_campaign=summer_launch&utm_content=story_1
```

### Automatic UTM Storage
UTM parameters are automatically captured and stored in sessionStorage for attribution.

## 6. Advanced Features

### Server-Side Tracking
For enhanced accuracy, implement server-side tracking for critical events:

```javascript
// In your API routes
import { trackServerSideEvent } from '../lib/analytics/server-tracking';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Process order
    await trackServerSideEvent('purchase', orderData);
  }
}
```

### Custom Dimensions
Add custom dimensions in GTM for enhanced analysis:
- User Type (new/returning)
- Product Category
- Traffic Source
- Device Type

## 7. Monitoring & Maintenance

### Regular Checks
- Monitor GTM container for errors
- Verify event data in GA4 DebugView
- Check Facebook Events Manager
- Review consent rates

### Performance Optimization
- Use `gtag` commands sparingly
- Batch events when possible
- Monitor script loading impact
- Regular audits of tracking code

## 8. Troubleshooting

### Common Issues
1. **Events not firing**: Check consent status and GTM triggers
2. **Duplicate events**: Verify single GTM container installation
3. **Missing data**: Confirm measurement IDs are correct
4. **Consent not working**: Check localStorage and cookie settings

### Debug Commands
```javascript
// Check dataLayer
console.log(window.dataLayer);

// Test event firing
window.dataLayer.push({ event: 'test_event' });

// Check consent status
console.log(localStorage.getItem('trap_harmony_consent'));
```

## 9. Production Deployment

### Pre-launch Checklist
- [ ] All measurement IDs updated for production
- [ ] GTM container published
- [ ] Consent banner tested
- [ ] Real transaction testing completed
- [ ] UTM tracking verified
- [ ] Debug mode disabled

### Post-launch Monitoring
- Monitor real-time data in GA4
- Check Facebook Events Manager
- Verify conversion tracking
- Monitor consent acceptance rates
