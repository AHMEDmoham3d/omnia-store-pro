import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tixxvcxcrgxscmprldmi.supabase.co';
// Using service_role key to bypass RLS for admin panel
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeHh2Y3hjcmd4c2NtcHJsZG1pIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzQ3MDkzOSwiZXhwIjoyMDY5MDQ2OTM5fQ.hxMFYo5QuqMaGJhm8EWj2ZRT0cecdRa0Vp1KhL-rdZ4';

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
