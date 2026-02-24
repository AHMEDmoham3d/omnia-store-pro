import { supabase } from './supabase';
import { VisitorAnalytics } from '../types';

let sessionStartTime = Date.now();

export const trackPageView = async (section: string) => {
  try {
    const analyticsData: VisitorAnalytics = {
      section_viewed: section,
      user_agent: navigator.userAgent,
      session_duration: Math.floor((Date.now() - sessionStartTime) / 1000),
    };

    const { error } = await supabase
      .from('visitor_analytics')
      .insert([analyticsData]);

    if (error) {
      console.error('Error tracking page view:', error);
    }
  } catch (err) {
    console.error('Error tracking page view:', err);
  }
};

export const initAnalytics = () => {
  sessionStartTime = Date.now();
  trackPageView('home');
};
