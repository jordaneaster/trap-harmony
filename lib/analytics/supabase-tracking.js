import { supabase } from '../supabase'; // Adjust import path as needed
import { trackEvent, trackSignUp, trackLogin, trackPurchase } from './tracking';

// Enhanced user signup tracking
export const trackSupabaseSignUp = async (userData, method = 'email') => {
  try {
    // Track the signup event
    trackSignUp(method);
    
    // Store additional analytics data in Supabase
    const { data, error } = await supabase
      .from('user_analytics')
      .insert([
        {
          user_id: userData.id,
          event_type: 'signup',
          event_data: {
            method: method,
            timestamp: new Date().toISOString(),
            user_agent: typeof window !== 'undefined' ? navigator.userAgent : '',
            referrer: typeof window !== 'undefined' ? document.referrer : ''
          }
        }
      ]);

    if (error) console.error('Supabase tracking error:', error);
  } catch (error) {
    console.error('Error tracking signup:', error);
  }
};

// Enhanced login tracking
export const trackSupabaseLogin = async (userData, method = 'email') => {
  try {
    trackLogin(method);
    
    const { data, error } = await supabase
      .from('user_analytics')
      .insert([
        {
          user_id: userData.id,
          event_type: 'login',
          event_data: {
            method: method,
            timestamp: new Date().toISOString()
          }
        }
      ]);

    if (error) console.error('Supabase tracking error:', error);
  } catch (error) {
    console.error('Error tracking login:', error);
  }
};

// Enhanced order tracking
export const trackSupabaseOrder = async (orderData) => {
  try {
    // Track purchase event for analytics
    trackPurchase(
      orderData.id,
      orderData.items,
      orderData.total,
      orderData.coupon_code
    );
    
    // Store detailed order analytics
    const { data, error } = await supabase
      .from('order_analytics')
      .insert([
        {
          order_id: orderData.id,
          user_id: orderData.user_id,
          total_amount: orderData.total,
          currency: 'USD',
          items_count: orderData.items.length,
          payment_method: orderData.payment_method,
          shipping_method: orderData.shipping_method,
          coupon_code: orderData.coupon_code,
          utm_source: orderData.utm_source,
          utm_medium: orderData.utm_medium,
          utm_campaign: orderData.utm_campaign,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) console.error('Supabase order tracking error:', error);
  } catch (error) {
    console.error('Error tracking order:', error);
  }
};

// Newsletter signup tracking
export const trackNewsletterSignup = async (email, source = 'footer') => {
  try {
    trackEvent('newsletter_signup', { location: source });
    
    const { data, error } = await supabase
      .from('newsletter_analytics')
      .insert([
        {
          email: email,
          source: source,
          timestamp: new Date().toISOString(),
          page_url: typeof window !== 'undefined' ? window.location.href : ''
        }
      ]);

    if (error) console.error('Newsletter tracking error:', error);
  } catch (error) {
    console.error('Error tracking newsletter signup:', error);
  }
};
