# Project State

**Project:** Cartes des Emotions
**Current Phase:** 2 of 4 (Emotion Cards Display)
**Status:** Phase 2 In Progress

## Progress

Phase 1: COMPLETE - Foundation & Navigation [2/2 plans complete]
Phase 2: IN PROGRESS - Emotion Cards Display [1/2 plans complete]
Phase 3: Pending - Slide-in Panel & Details
Phase 4: Pending - Steps Carousel & Polish

Progress: [####------] 37.5% (3/8 plans)

## Current Position

**Phase:** 02-emotion-cards-display
**Plan:** 02-01-PLAN.md COMPLETE
**Last activity:** 2026-01-29 - Completed 02-01-PLAN.md (Emotion Data Layer)

## Completed Plans

| Phase | Plan | Summary | Commits |
|-------|------|---------|---------|
| 01 | 01 | Vite + React + Tailwind CSS 4 foundation | b792fac, 181e99c, b2ed044 |
| 01 | 02 | State-based navigation with HomePage and iframe height sync | 2afb60b, 24aad06, 7d9141a |
| 02 | 01 | Emotion types, 7 emotions, 6 sentiments data, EmotionCard component | 2513474, a9398b0, a880451, 8cca419 |

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

## Tech Stack

- **Framework:** Vite + React + TypeScript
- **Styling:** Tailwind CSS 4 with @theme directive
- **Icons:** Lucide React
- **Deployment:** Railway with Caddy
- **Navigation:** State-based (View type, useState)
- **Data:** TypeScript interfaces with type guards

## Key Files

- `src/index.css` - Design system tokens
- `src/components/ui/LoadingScreen.tsx` - Loading screen component
- `src/hooks/useIframeHeight.ts` - iframe height sync hook
- `src/components/layout/Layout.tsx` - Main layout wrapper
- `src/components/home/HomePage.tsx` - Home view with section cards
- `src/App.tsx` - Root component with navigation state
- `src/types/emotions.ts` - Emotion/Sentiment type definitions
- `src/data/emotions.ts` - 7 unpleasant emotions data
- `src/data/sentiments.ts` - 6 pleasant sentiments data
- `src/components/emotions/EmotionCard.tsx` - Reusable emotion card
- `Dockerfile` + `Caddyfile` - Deployment configuration

## Project Reference

See: .planning/PROJECT.md (updated 2026-01-29)
**Core value:** Permettre a l'utilisateur d'identifier rapidement une emotion et comprendre le besoin sous-jacent
**Current focus:** Phase 2 - Emotion Cards Display

## Next Actions

1. Execute 02-02-PLAN.md (EmotionsPage, SentimentsPage grid views)

## Session Continuity

**Last session:** 2026-01-29T15:08:00Z
**Stopped at:** Completed 02-01-PLAN.md (Emotion Data Layer)
**Resume file:** .planning/phases/02-emotion-cards-display/02-02-PLAN.md

---
*State updated: 2026-01-29*
