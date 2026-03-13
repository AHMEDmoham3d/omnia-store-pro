# TODO: Replace delivery_date with notes field

## Steps:
- [ ] 1. Add notes column to Supabase DB (run SQL below)
- [x] 2. Update src/types/index.ts (replace delivery_date → notes)
- [ ] 3. Edit src/components/OrderModal.tsx (label, input type=&#39;text&#39;, name/id/notes)
- [ ] 4. Edit src/pages/Admin.tsx (interface, table header/cell)
- [ ] 5. Test form submission and Admin table
- [ ] 6. Restart dev server: npm run dev

## DB Migration SQL (run in Supabase SQL Editor):
```
ALTER TABLE orders ADD COLUMN notes text;
```

Copy-paste into https://supabase.com/dashboard/project/[your-ref]/sql
