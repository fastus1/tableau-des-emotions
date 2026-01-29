# Project State

**Project:** Cartes des Emotions
**Current Phase:** 3 of 4 (Slide-in Panel & Details)
**Status:** In Progress

## Progress

Phase 1: COMPLETE - Foundation & Navigation [2/2 plans complete]
Phase 2: COMPLETE - Emotion Cards Display [2/2 plans complete]
Phase 3: IN PROGRESS - Slide-in Panel & Details [1/3 plans complete]
Phase 4: Pending - Steps Carousel & Polish

Progress: [######----] 62% (5/8 plans)

## Current Position

**Phase:** 03-slide-in-panel-details
**Plan:** 03-01-PLAN.md COMPLETE
**Last activity:** 2026-01-29 - Completed 03-01-PLAN.md (Slide Panel Foundation)

## Completed Plans

| Phase | Plan | Summary | Commits |
|-------|------|---------|---------|
| 01 | 01 | Vite + React + Tailwind CSS 4 foundation | b792fac, 181e99c, b2ed044 |
| 01 | 02 | State-based navigation with HomePage and iframe height sync | 2afb60b, 24aad06, 7d9141a |
| 02 | 01 | Emotion types, 7 emotions, 6 sentiments data, EmotionCard component | 2513474, a9398b0, a880451, 8cca419 |
| 02 | 02 | Responsive emotion/sentiment grid pages wired into navigation | 3edf6ad, b332ec3, 9d5f9cd |
| 03 | 01 | SlidePanel with native dialog, swipe-to-close, PanelHeader | 5ba5954, 9c3872f, f81dff2, 146b0f3 |

## Accumulated Decisions

| Decision | Context | Date |
|----------|---------|------|
| Tailwind CSS 4 with @theme | Simpler than config file, native CSS custom properties | 2026-01-29 |
| Caddy for static serving | Simple Caddyfile syntax, SPA fallback, gzip | 2026-01-29 |
| Google Fonts via CDN | Faster than self-hosted for Inter and Montserrat | 2026-01-29 |
| State-based navigation | useState instead of React Router, simpler for iframe context | 2026-01-29 |
| ResizeObserver for iframe height | Efficient height sync instead of polling | 2026-01-29 |
| Culpabilite with subTypes | 4 guilt variants modeled as array instead of flat structure | 2026-01-29 |
| Keywords tuple [string,string,string] | Strict 3-keyword constraint for card display | 2026-01-29 |
| transition-shadow only | Better performance than transition-all for hover effects | 2026-01-29 |
| Console.log placeholders for clicks | Phase 3 will implement panels, keeping click handlers ready | 2026-01-29 |
| Native HTML dialog for panels | Built-in focus trapping, Escape key, backdrop via ::backdrop | 2026-01-29 |
| Animate inner wrapper not dialog | dialog uses display:none which breaks CSS transitions | 2026-01-29 |
| 100px or 0.5 velocity swipe threshold | Responsive swipe-to-close without being too sensitive | 2026-01-29 |
| Default reduced motion for SSR | Safe fallback until client-side media query runs | 2026-01-29 |

## Tech Stack

- **Framework:** Vite + React + TypeScript
- **Styling:** Tailwind CSS 4 with @theme directive
- **Icons:** Lucide React
- **Gestures:** react-swipeable 7.0.2
- **Deployment:** Railway with Caddy
- **Navigation:** State-based (View type, useState)
- **Data:** TypeScript interfaces with type guards

## Key Files

- `src/index.css` - Design system tokens
- `src/components/ui/LoadingScreen.tsx` - Loading screen component
- `src/hooks/useIframeHeight.ts` - iframe height sync hook
- `src/hooks/usePrefersReducedMotion.ts` - Motion preference detection
- `src/components/layout/Layout.tsx` - Main layout wrapper
- `src/components/home/HomePage.tsx` - Home view with section cards
- `src/App.tsx` - Root component with navigation state
- `src/types/emotions.ts` - Emotion/Sentiment type definitions
- `src/data/emotions.ts` - 7 unpleasant emotions data
- `src/data/sentiments.ts` - 6 pleasant sentiments data
- `src/components/emotions/EmotionCard.tsx` - Reusable emotion card
- `src/components/emotions/UnpleasantEmotionsPage.tsx` - 7 emotion cards grid
- `src/components/emotions/PleasantSentimentsPage.tsx` - 6 sentiment cards grid
- `src/components/panel/SlidePanel.tsx` - Base slide-up panel component
- `src/components/panel/PanelHeader.tsx` - Reusable panel header
- `Dockerfile` + `Caddyfile` - Deployment configuration

## Project Reference

See: .planning/PROJECT.md (updated 2026-01-29)
**Core value:** Permettre a l'utilisateur d'identifier rapidement une emotion et comprendre le besoin sous-jacent
**Current focus:** Phase 3 - Building emotion/sentiment detail panels

## Next Actions

1. Execute Plan 03-02: Emotion Detail Panel (emotion content in SlidePanel)
2. Execute Plan 03-03: Sentiment Detail Panel (sentiment content in SlidePanel)

## Session Continuity

**Last session:** 2026-01-29T15:44:17Z
**Stopped at:** Completed 03-01-PLAN.md (Slide Panel Foundation)
**Resume file:** None - Ready for 03-02-PLAN.md

---
*State updated: 2026-01-29*
