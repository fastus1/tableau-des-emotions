# Research Summary

**Project:** Cartes des Émotions
**Date:** 2026-01-29

---

## Stack Recommendation

**Core Stack (Validated):**
- React 18.x + Vite 6.x + Tailwind CSS 4.x + Lucide React — Industry standard 2025-2026
- Motion (formerly Framer Motion) — For slide-in panels and carousel animations
- Embla Carousel — Lightweight (~5KB), accessible, perfect for custom-styled carousels
- Radix UI Dialog — For accessible slide-in panels with focus trap

**State Management:** React `useState` sufficient — no Redux/Zustand needed for this app size.

**Estimated Bundle:** ~70-80KB gzipped (very reasonable)

---

## Key Features

### Table Stakes (Must Have)
- Tap/click to expand cards with clear feedback
- Swipe navigation for carousel with progress indicators
- 44x44px minimum touch targets
- WCAG AA contrast (4.5:1)
- Keyboard navigation (Tab, Enter, Escape)
- Responsive card grid (1-2-3 columns)

### Differentiators
- Smooth slide-up bottom sheet animation
- Color-coded emotion categories for instant recognition
- Sequential reveal supporting learning progression
- Subtle hover states on desktop

### Anti-Features (Deliberately Exclude)
- Auto-advancing carousel — emotional content requires personal pacing
- Gamification — inappropriate for therapeutic content
- Social sharing — emotions are private
- Search/filter — this is exploration, not reference lookup

---

## Architecture Summary

**Navigation:** State-based (no router) — iframe context means browser back is problematic

**Component Structure:**
```
App → Layout → HomePage / EmotionSection / StepsSection
              └→ SlideInPanel (shared overlay)
                  └→ NestedSlideInPanel (guilt only)
```

**Data:** 3 JSON files (`emotions-desagreables.json`, `emotions-agreables.json`, `cinq-etapes.json`)

**Build Order Critical Path:**
1. Project setup + design tokens
2. Layout + postMessage height sync
3. HomePage + SectionCards
4. EmotionCard + CardGrid
5. SlideInPanel
6. EmotionDetail content
7. Guilt special case (nested panel)
8. StepsCarousel

---

## Critical Pitfalls to Avoid

### Will Break the App
1. **iframe Height Failures** — Use ResizeObserver + postMessage + fallback polling
2. **Touch Conflicts** — Use `touch-action: pan-y` on carousel
3. **Missing Focus Trap** — Use `inert` attribute + Radix Dialog
4. **Animation Jank** — ONLY animate `transform` and `opacity`

### Bad UX
5. **Dark Theme Contrast** — Test all colors, minimum 4.5:1
6. **Panel Z-Index Wars** — Define scale in design tokens
7. **Links in iframe** — Always `target="_blank"`
8. **Reduced Motion** — Respect `prefers-reduced-motion`

---

## Technical Decisions

| Decision | Recommendation | Confidence |
|----------|---------------|------------|
| Animation library | Motion (Framer Motion) | High |
| Carousel library | Embla Carousel | High |
| Dialog/Panel | Radix UI Dialog | High |
| State management | React useState only | High |
| Routing | None (state-based) | High |
| CSS framework | Tailwind CSS v4 | High |

---

## Files Created

- `STACK.md` — Complete stack analysis with versions and rationale
- `FEATURES.md` — Table stakes, differentiators, anti-features, interaction patterns
- `ARCHITECTURE.md` — Component hierarchy, data structure, build order
- `PITFALLS.md` — 18 pitfalls with prevention strategies and testing checklist

---

*Research complete: 2026-01-29*
