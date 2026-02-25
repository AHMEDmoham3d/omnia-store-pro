import { supabase } from './supabase';
import { VisitorAnalytics } from '../types';

let sessionStartTime = Date.now();

// نعرف هل احنا في production ولا لأ
const isProduction = (import.meta as any).env.PROD === true;

export const trackPageView = async (section: string) => {
  // ❌ اقفل analytics تمامًا في production
  if (isProduction) return;

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
      console.warn('Analytics insert failed (ignored):', error);
    }
  } catch (err) {
    console.warn('Analytics error (ignored):', err);
  }
};

export const initAnalytics = () => {
  if (isProduction) return;

  sessionStartTime = Date.now();
  trackPageView('home');
};