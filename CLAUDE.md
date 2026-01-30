# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Cartes des Émotions" (Emotion Cards) is an interactive web application for exploring and understanding emotions, based on the emotional regulation tables by Diane Lapensée. The app will be embedded via iframe in Circle.so and hosted on Railway.

## Tech Stack

- **Framework**: React + Vite
- **Styling**: Tailwind CSS + CSS custom properties (design system variables)
- **Icons**: Lucide React
- **Hosting**: Railway (staging + production branches)

## Commands

```bash
npm run dev      # Local development server (default: localhost:5173)
npm run build    # Production build
npm run preview  # Preview production build locally
```

## Design System

The app uses a dark theme with specific CSS variables:

**Backgrounds**: `--bg-primary` (#2B2E33), `--bg-secondary` (#42464D)
**Text**: `--text-primary` (#FFFFFF), `--text-secondary` (#E4E7EB)
**Brand**: `--brand-primary` (#3085F5), `--brand-link` (#539DFF)

**Emotion colors** (each emotion has a distinct color):
- Colère: `--color-red` (#db0e00)
- Honte: `--color-orange` (#e05a03)
- Tristesse: `--brand-primary` (#3085F5)
- Dégoût: `--color-green` (#009a2a)
- Peur: `--color-purple` (#641892)
- Surprise: `--color-yellow` (#ffb200)
- Culpabilité: `--color-taupe` (#7A6F5D) — custom
- Paix: `--color-mint` (#4ECDC4) — custom

**Typography**: Inter (body), Montserrat 900 italic (branding)

## Architecture

Three main sections:
1. **"Quand ça ne va pas"** — 7 emotion cards (unpleasant emotions) with triggers, defensive reactions, and needs
2. **"Quand ça va bien"** — 6 sentiment cards (pleasant emotions) with triggers and satisfied needs
3. **"Les 5 étapes"** — Step-by-step emotional regulation process (horizontal carousel)

**Card behavior**:
- Cards open as modals on click
- Culpabilité (guilt) card opens to 4 sub-cards (healthy vs unhealthy variants)
- Use `.mlp-card`, `.mlp-btn-primary`, `.mlp-btn-secondary` component classes

## Responsive Breakpoints

- Mobile (<640px): Single column, full-screen modals
- Tablet (640-1024px): 2-column grid, 80% width modals
- Desktop (>1024px): 3-column grid, max 600px modal width

## Accessibility Requirements

- WCAG AA contrast (4.5:1 minimum)
- 44x44px minimum touch targets
- Keyboard navigation (Tab, Enter, Escape)
- ARIA attributes on modals
- Visible focus rings (2-3px)

## Deployment

- `staging` branch → Railway staging environment
- `production` branch → Railway production environment

## Content Source

All emotion content comes from `tableaux-regulation-emotionnelle-complet.md` and must be used verbatim.
