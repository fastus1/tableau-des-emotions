# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Cartes des Émotions" (Emotion Cards) is an interactive web application for exploring and understanding emotions, based on the emotional regulation tables by Diane Lapensée. The app will be embedded via iframe in Circle.so and hosted on Railway.

## Tech Stack

- **Framework**: React + Vite
- **Styling**: Tailwind CSS + CSS custom properties (design system variables)
- **Icons**: Lucide React
- **Hosting**: Railway (production), Portainer (staging local)

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

**Logo "Avancer Simplement"**: Le logo est composé de deux éléments :
1. Les trois flèches (image Cloudinary) : `https://res.cloudinary.com/dxhn08di4/image/upload/v1768749285/avancer-simplement/_shared/logos/logo-blanc-320.png`
2. Le texte "AVANCER SIMPLEMENT" en Montserrat bold italic (font-brand)

Ces deux éléments doivent toujours apparaître ensemble pour former le logo complet.

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

### Environments

| Environment | Branch | Platform | URL | Auto-deploy |
|-------------|--------|----------|-----|-------------|
| Production | `main` | Railway | https://vivacious-dream-production.up.railway.app | ✅ on push |
| Staging | `staging` | Portainer (local) | http://localhost:3001 | Manual (docker compose) |

### Staging Indicator

When `VITE_APP_ENV=staging`, an orange "STAGING" badge is displayed in the bottom-left corner of the app. This is set automatically:
- **Portainer/docker-compose**: `VITE_APP_ENV=staging` passed as build arg
- **Railway**: Defaults to `production` via Dockerfile ARG

### Git Workflow

```bash
# Work on main locally
git checkout main
# ... make changes ...

# Deploy to staging (Portainer)
git checkout staging
git merge main
# → rebuild in Portainer (docker compose up --build)

# Deploy to production (Railway)
git checkout main
git push origin main
# → auto-deploys to Railway
```

### Railway CLI

```bash
railway login              # Login to Railway
railway status             # Check current project/environment
railway logs               # View deployment logs
```

### Domain Restriction

The app is protected by a password gate (`src/components/ui/PasswordGate.tsx`):
- **Allowed origin**: `https://communaute.avancersimplement.com` (Circle.so)
- **Password**: `074491` (for direct access)
- Authorization is stored in sessionStorage

## Scratch Folder

Use `.scratch/` folder to share images with Claude. This folder is git-ignored.

## Content Source

All emotion content comes from `tableaux-regulation-emotionnelle-complet.md` and must be used verbatim.
