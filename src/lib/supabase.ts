// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.VITE_SUPABASE_URL as string;
// const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY as string;

// export const supabase = createClient(supabaseUrl, supabaseKey, {
//   auth: {
//     autoRefreshToken: false,
//     persistSession: false
//   }
// });

// // Helper to check if table exists and create if needed
// export const ensureTablesExist = async () => {
//   const client = supabase;
  
//   // Try to select from orders table - if it fails, table doesn't exist
//   const { error } = await client.from('orders').select('id').limit(1);
  
//   if (error) {
//     console.log('Table check result:', error.message);
//     return false;
//   }
  
//   return true;
// };
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://tixxvcxcrgxscmprldmi.supabase.co";

const supabaseKey =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeHh2Y3hjcmd4c2NtcHJsZG1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NzA5MzksImV4cCI6MjA2OTA0NjkzOX0.bhWFkJAMPAnEf9c1rRjEbyYG4XjQnOIP2dsVVeK_H3U";



export const supabase = createClient(supabaseUrl, supabaseKey);