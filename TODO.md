# Task Progress: Fix Home/Products visibility on Vercel & Secure Supabase

## Completed Steps:
1. ✅ Created .env.example with Supabase env var placeholders
2. ✅ Edited src/lib/supabase.ts: Replaced hardcoded URL/key with VITE_ env vars
3. ✅ Updated webpack.config.js: Added VITE env DefinePlugin + ProvidePlugin for process
4. ✅ Updated tsconfig.json: Added "vite/client" types for import.meta.env
5. ✅ Updated .vercelignore: Ignore .env* but keep .env.example

## Remaining Steps:
6. [ ] Edit src/pages/Home.tsx: Uncomment oils/carpets sections, add category tabs UI, fix dynamic filtering
7. [ ] **User Action**: Add VITE_SUPABASE_URL=https://tixxvcxcrgxscmprldmi.supabase.co and VITE_SUPABASE_ANON_KEY=(your anon key) to Vercel project env vars (Supabase > Settings > API)
8. [ ] Test locally: npm run build (set env vars in shell first)
9. [ ] Deploy: vercel --prod
10. [ ] Verify: Check all products visible, no keys in Network tab

**Next: Fixing Home.tsx...**

