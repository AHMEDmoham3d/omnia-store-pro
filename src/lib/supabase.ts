import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;

// Use VITE_SUPABASE_ANON_KEY from .env (public anon key only!)
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;


export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Helper to check if table exists and create if needed
export const ensureTablesExist = async () => {
  const client = supabase;
  
  // Try to select from orders table - if it fails, table doesn't exist
  const { error } = await client.from('orders').select('id').limit(1);
  
  if (error) {
    console.log('Table check result:', error.message);
    return false;
  }
  
  return true;
};
