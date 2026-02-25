// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://tixxvcxcrgxscmprldmi.supabase.co';
// const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeHh2Y3hjcmd4c2NtcHJsZG1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NzA5MzksImV4cCI6MjA2OTA0NjkzOX0.bhWFkJAMPAnEf9c1rRjEbyYG4XjQnOIP2dsVVeK_H3U';

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY ?? '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase env variables are missing');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);