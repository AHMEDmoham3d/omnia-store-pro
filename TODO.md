# TODO: Arabic Description Styling Fixes

**Changes Reverted per User Feedback**

All enhanced RTL styling changes reverted. Files restored to pre-edit state:
- src/App.css: Original RTL rules only (direction: rtl, text-align: end).
- src/components/ProductCard.tsx: Standard classes, inline RTL preserved.

Original inline styles in ProductCard.tsx (`direction: isArabic ? 'rtl' : 'ltr'`, `textAlign: isArabic ? 'right' : 'left'`) still active for Arabic cards.

TODO complete - ready for new instructions.

