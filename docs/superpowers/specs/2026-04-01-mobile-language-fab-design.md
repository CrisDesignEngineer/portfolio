# Mobile Language FAB — Design Spec (CRIS-10)

## Goal

Replace the language toggle inside the mobile menu with a floating action button (FAB) showing the current language's country flag. Tap to switch language directly.

## Component: `MobileLanguageFab`

- **Visibility:** `md:hidden` — only visible on screens < 768px
- **Position:** `fixed bottom-6 right-6 z-50`
- **Size:** 48x48px (`rounded-full`), above the 44x44 minimum touch target
- **Style:** `bg-bg-card border border-border shadow-lg backdrop-blur-sm`
- **Content:** Country flag SVG (Brazil for PT, USA for EN), ~24x24px
- **Behavior:** `onClick` calls `toggleLocale()` — direct toggle, no dropdown
- **Transition:** Scale + opacity on the flag icon (150ms) when switching
- **Flags:** Inline SVG (not emoji — inconsistent cross-device rendering)

## Header Changes

- Remove `<LanguageToggle />` from both mobile menu branches (home and case detail)
- Desktop nav toggle remains unchanged

## Downscope

- No dropdown or language list — direct toggle only (2 languages)
- No animation on the FAB itself (only the flag inside transitions)
- Desktop is not affected

## Files

- **New:** `src/components/MobileLanguageFab.tsx`
- **Modify:** `src/components/Header.tsx` (remove toggle from mobile menu)
- **Modify:** `src/app/layout.tsx` (add MobileLanguageFab alongside LocaleFadeWrapper)
