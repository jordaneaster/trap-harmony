import { Html, Head, Main, NextScript } from 'next/document';
import { ANALYTICS_CONFIG } from '../lib/analytics/config';
import { GTM_SCRIPT, GTM_NOSCRIPT } from '../lib/analytics/gtm';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        
        {/* GTM Script - Load early but respect consent */}
        {ANALYTICS_CONFIG.GTM_CONTAINER_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: GTM_SCRIPT,
            }}
          />
        )}
        
        {/* Initialize consent defaults */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              // Set consent defaults before GTM loads
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                functionality_storage: 'granted',
                personalization_storage: 'denied',
                wait_for_update: 2000
              });
            `,
          }}
        />
      </Head>
      <body>
        {/* GTM NoScript Fallback */}
        {ANALYTICS_CONFIG.GTM_CONTAINER_ID && (
          <noscript>
            <div dangerouslySetInnerHTML={{ __html: GTM_NOSCRIPT }} />
          </noscript>
        )}
        
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
