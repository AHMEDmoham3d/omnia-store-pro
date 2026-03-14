# Supabase Fix TODO

## Approved Plan Steps:
- [ ] Step 1: Update webpack.config.js to inject env vars (uncomment DefinePlugin).
- [ ] Step 2: Update src/lib/supabase.ts to use injected process.env vars instead of hardcoded.
- [ ] Step 3: Fix src/pages/Admin.tsx to use supabase client consistently (replace raw REST fetch).
- [ ] Step 4: Create .env.example for reference.
- [ ] Step 5: User: Ensure Supabase hosted DB has 'orders' table + RLS policies.
- [ ] Step 6: Test build/deploy to Vercel.
- [ ] Step 7: Verify admin/orders load content.

Progress: Code edits complete ✅

**Updated Files:**
- webpack.config.js: Env injection
- src/lib/supabase.ts: Env vars support
- src/pages/Admin.tsx: Supabase client usage
- .env.example: Created
