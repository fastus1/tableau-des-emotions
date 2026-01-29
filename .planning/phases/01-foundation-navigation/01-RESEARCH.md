# Phase 1: Foundation & Navigation - Research

**Researched:** 2026-01-29
**Domain:** React + Vite + Tailwind CSS project setup, iframe integration, state-based navigation
**Confidence:** HIGH

## Summary

This phase establishes the core technical foundation for the Cartes des Emotions application: project scaffolding with React 18+ and Vite 6, Tailwind CSS 4 with CSS custom properties for the design system, iframe height synchronization via postMessage, and state-based navigation without a router.

The standard approach in 2026 is to use Vite's built-in Tailwind CSS 4 plugin (`@tailwindcss/vite`) with CSS-first configuration via the `@theme` directive. No router is needed for this iframe-embedded SPA - state-based navigation with conditional rendering is simpler and avoids iframe URL conflicts. Iframe height synchronization uses ResizeObserver + postMessage with a fallback height.

**Primary recommendation:** Use Vite + React + Tailwind CSS 4 with the `@tailwindcss/vite` plugin, CSS custom properties via `@theme` directive, state-based navigation (no router), and ResizeObserver + postMessage for iframe height sync with 900px fallback.

## Standard Stack

The established libraries/tools for this phase:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | ^18.3.0 | UI framework | Industry standard, component-based architecture |
| React DOM | ^18.3.0 | React DOM renderer | Required for web React apps |
| Vite | ^6.0.0 | Build tool & dev server | Fastest HMR, native ESM, recommended for SPAs |
| @vitejs/plugin-react | ^4.3.0 | React Fast Refresh | Official Vite React integration |
| Tailwind CSS | ^4.0.0 | Utility-first CSS | Zero runtime, CSS-first config in v4 |
| @tailwindcss/vite | ^4.0.0 | Vite plugin for Tailwind | First-party plugin, no PostCSS needed |
| Lucide React | ^0.460.0 | Icon library | Lightweight, tree-shakeable, modern icons |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| TypeScript | ^5.6.0 | Type safety | All source files |
| @radix-ui/react-dialog | ^1.1.0 | Accessible modal/panel | Future phases - slide-in panels |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| State-based nav | React Router | Router adds complexity, URL conflicts in iframes |
| Tailwind CSS | CSS Modules | Less utility-first, more boilerplate |
| Lucide React | Heroicons | Lucide has better tree-shaking, similar quality |

**Installation:**
```bash
npm create vite@latest cartes-emotions -- --template react-ts
cd cartes-emotions
npm install tailwindcss @tailwindcss/vite lucide-react
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── main.tsx                    # React entry point
├── App.tsx                     # Root component, view state management
├── index.css                   # Global styles, @theme design tokens
├── components/
│   ├── layout/
│   │   ├── Layout.tsx          # Main container with iframe height hook
│   │   └── BackButton.tsx      # Reusable back navigation
│   ├── home/
│   │   ├── HomePage.tsx        # Home view with 3 entry cards
│   │   └── SectionCard.tsx     # Entry card component
│   └── ui/
│       ├── LoadingScreen.tsx   # Initial splash screen
│       └── Icon.tsx            # Lucide icon wrapper (optional)
├── hooks/
│   └── useIframeHeight.ts      # ResizeObserver + postMessage hook
├── types/
│   └── navigation.ts           # View state types
└── data/
    └── sections.ts             # Section card data (title, description, icon)
```

### Pattern 1: State-Based Navigation
**What:** Use React state to switch between views instead of URL routing
**When to use:** iframe-embedded SPAs where URL control is undesirable
**Example:**
```typescript
// Source: https://ncoughlin.com/posts/react-navigation-without-react-router
type View = 'home' | 'unpleasant' | 'pleasant' | 'steps';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');

  const navigate = (view: View) => setCurrentView(view);
  const goHome = () => setCurrentView('home');

  return (
    <Layout>
      {currentView === 'home' && <HomePage onNavigate={navigate} />}
      {currentView === 'unpleasant' && <EmotionSection type="unpleasant" onBack={goHome} />}
      {currentView === 'pleasant' && <EmotionSection type="pleasant" onBack={goHome} />}
      {currentView === 'steps' && <StepsSection onBack={goHome} />}
    </Layout>
  );
}
```

### Pattern 2: Tailwind CSS 4 Design Tokens
**What:** Define design system via CSS custom properties in `@theme` block
**When to use:** All Tailwind v4 projects needing custom colors/fonts
**Example:**
```css
/* Source: https://tailwindcss.com/blog/tailwindcss-v4 */
@import "tailwindcss";

@theme {
  /* Backgrounds */
  --color-bg-primary: #2B2E33;
  --color-bg-secondary: #42464D;

  /* Text */
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #E4E7EB;

  /* Brand */
  --color-brand-primary: #3085F5;
  --color-brand-link: #539DFF;

  /* Emotion colors */
  --color-red: #db0e00;
  --color-orange: #e05a03;
  --color-green: #009a2a;
  --color-purple: #641892;
  --color-yellow: #ffb200;
  --color-taupe: #7A6F5D;
  --color-mint: #4ECDC4;

  /* Typography */
  --font-body: "Inter", sans-serif;
  --font-brand: "Montserrat", sans-serif;
}
```

### Pattern 3: iframe Height Synchronization
**What:** ResizeObserver watches content height, postMessage communicates to parent
**When to use:** Any iframe-embedded React app needing dynamic height
**Example:**
```typescript
// Source: https://dev.to/tvanantwerp/how-to-resize-iframes-with-message-events-2fec
// hooks/useIframeHeight.ts
import { useEffect } from 'react';

const FALLBACK_HEIGHT = 900;

export function useIframeHeight() {
  useEffect(() => {
    const sendHeight = () => {
      try {
        const height = document.documentElement.scrollHeight;
        window.parent.postMessage(
          { type: 'IFRAME_HEIGHT', height },
          '*'
        );
      } catch (e) {
        // postMessage failed, parent will use fallback
        console.warn('postMessage failed, using fallback height');
      }
    };

    // Initial send
    sendHeight();

    // Watch for content changes
    const observer = new ResizeObserver(sendHeight);
    observer.observe(document.body);

    // Also send on window load
    window.addEventListener('load', sendHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('load', sendHeight);
    };
  }, []);
}
```

### Pattern 4: Loading Screen with State
**What:** Show splash screen while app initializes, hide after timeout or ready
**When to use:** Initial app load to provide branded experience
**Example:**
```typescript
// Source: https://auth0.com/blog/creating-a-splash-screen-for-your-react-apps/
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Minimum display time for branding
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <Layout>...</Layout>;
}
```

### Anti-Patterns to Avoid
- **Using React Router in iframes:** URL changes can conflict with parent frame, adds unnecessary complexity for 4 views
- **Inline styles for design tokens:** Use CSS custom properties for consistency and theme-ability
- **setInterval for height polling:** ResizeObserver is more efficient and accurate
- **Running Vite dev/preview in production:** Always build and serve static files with Caddy

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Accessible modals | Custom overlay + focus trap | @radix-ui/react-dialog | Focus management, ARIA, keyboard nav are complex |
| Icon components | Manual SVG imports | lucide-react | Tree-shaking, consistent sizing, TypeScript types |
| CSS framework | Custom utility classes | Tailwind CSS | Purging, responsive variants, dark mode built-in |
| iframe communication | Custom message format | Standard postMessage with type field | Avoid conflicts with other scripts |

**Key insight:** Tailwind CSS 4 handles design tokens natively via `@theme`, no need for separate CSS variable management libraries.

## Common Pitfalls

### Pitfall 1: Tailwind CSS v3 Setup in v4 Project
**What goes wrong:** Following old tutorials that use `tailwind.config.js`, PostCSS setup
**Why it happens:** Most tutorials online still reference v3 approach
**How to avoid:** Use `@import "tailwindcss"` in CSS, `@tailwindcss/vite` plugin, `@theme` for customization
**Warning signs:** `tailwind.config.js` file exists, PostCSS plugins installed, using `@tailwind` directives

### Pitfall 2: postMessage Without Type Field
**What goes wrong:** Messages conflict with other scripts or parent page handlers
**Why it happens:** Forgetting that postMessage is shared across all scripts
**How to avoid:** Always include `type` field: `{ type: 'IFRAME_HEIGHT', height: 900 }`
**Warning signs:** Parent receives unexpected messages, height jumps unexpectedly

### Pitfall 3: Railway 502 Errors
**What goes wrong:** App deploys but returns 502 Bad Gateway
**Why it happens:** Vite preview server on wrong port, or using dev server in production
**How to avoid:** Use Dockerfile with Caddy serving static `dist` folder, bind to `$PORT`
**Warning signs:** Works locally, fails on Railway; port mismatch in logs

### Pitfall 4: Missing Font Loading Strategy
**What goes wrong:** FOUT (Flash of Unstyled Text) or slow initial render
**Why it happens:** Fonts loaded synchronously blocking render
**How to avoid:** Use `preconnect` for Google Fonts, `font-display: swap`
**Warning signs:** Blank text then sudden font change on load

### Pitfall 5: State Navigation Without Animation
**What goes wrong:** Jarring instant view switches feel broken
**Why it happens:** Conditional rendering without transitions
**How to avoid:** Add CSS transitions or use Motion library for view animations (Phase 2+)
**Warning signs:** Views "pop" in rather than smoothly transitioning

## Code Examples

Verified patterns from official sources:

### Vite Config with Tailwind CSS 4
```typescript
// vite.config.ts
// Source: https://tailwindcss.com/docs
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});
```

### CSS Entry Point with Design Tokens
```css
/* src/index.css */
/* Source: https://tailwindcss.com/blog/tailwindcss-v4 */
@import "tailwindcss";

@theme {
  /* Design System - Avancer Simplement */
  --color-bg-primary: #2B2E33;
  --color-bg-secondary: #42464D;
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #E4E7EB;
  --color-brand-primary: #3085F5;
  --color-brand-link: #539DFF;

  /* Emotion Colors */
  --color-red: #db0e00;
  --color-orange: #e05a03;
  --color-green: #009a2a;
  --color-purple: #641892;
  --color-yellow: #ffb200;
  --color-taupe: #7A6F5D;
  --color-mint: #4ECDC4;
  --color-magenta: #a82360;

  /* Typography */
  --font-body: "Inter", sans-serif;
  --font-brand: "Montserrat", sans-serif;
}

/* Base styles */
body {
  font-family: var(--font-body);
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
}
```

### Google Fonts Loading
```html
<!-- index.html -->
<!-- Source: https://www.geeksforgeeks.org/reactjs/how-to-use-google-fonts-in-reactjs/ -->
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:ital,wght@1,900&display=swap" rel="stylesheet">
</head>
```

### Lucide Icon Usage
```typescript
// Source: https://lucide.dev/guide/packages/lucide-react
import { ArrowLeft, Heart, Flame, Scale } from 'lucide-react';

// Individual icon with props
<ArrowLeft size={24} strokeWidth={2} />

// With Tailwind classes
<Heart className="w-6 h-6 text-brand-primary" />
```

### Railway Deployment Files
```dockerfile
# Dockerfile
# Source: https://docs.railway.com/guides/react
FROM node:lts-alpine AS build
ENV NPM_CONFIG_UPDATE_NOTIFIER=false
ENV NPM_CONFIG_FUND=false
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

FROM caddy:alpine
WORKDIR /app
COPY Caddyfile ./
RUN caddy fmt Caddyfile --overwrite
COPY --from=build /app/dist ./dist
CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]
```

```caddyfile
# Caddyfile
# Source: https://docs.railway.com/guides/react
{
  admin off
  auto_https off
}

:{$PORT:3000} {
  root * /app/dist
  encode gzip

  # SPA fallback - redirect all non-file requests to index.html
  try_files {path} /index.html

  file_server
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` | `@theme` in CSS | Tailwind v4 (2025) | No JS config needed |
| PostCSS + Autoprefixer | `@tailwindcss/vite` plugin | Tailwind v4 (2025) | Simpler setup |
| `@tailwind base/components/utilities` | `@import "tailwindcss"` | Tailwind v4 (2025) | Single import |
| framer-motion | motion | Feb 2025 | Package renamed |
| Create React App | Vite | 2023-2024 | CRA deprecated |

**Deprecated/outdated:**
- Create React App: No longer maintained, use Vite
- `framer-motion` package name: Renamed to `motion`
- Tailwind v3 `@tailwind` directives: Use `@import "tailwindcss"` in v4
- `tailwind.config.js`: Use `@theme` in CSS for Tailwind v4

## Open Questions

Things that couldn't be fully resolved:

1. **Circle.so postMessage receiver**
   - What we know: Standard postMessage will send height data
   - What's unclear: Whether Circle.so has built-in handling or needs custom script
   - Recommendation: Test with actual Circle.so embed, prepare fallback 900px height

2. **Animation approach for view transitions**
   - What we know: CSS transitions work, Motion library is available
   - What's unclear: Exact transition style desired (slide, fade, none)
   - Recommendation: Start with simple CSS opacity transition, enhance later

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS v4 Official Docs](https://tailwindcss.com/docs) - Vite plugin setup, @theme directive
- [Tailwind CSS v4 Blog Post](https://tailwindcss.com/blog/tailwindcss-v4) - CSS-first configuration
- [Lucide React Guide](https://lucide.dev/guide/packages/lucide-react) - Icon installation and usage
- [Railway React Deployment Docs](https://docs.railway.com/guides/react) - Dockerfile and Caddyfile setup

### Secondary (MEDIUM confidence)
- [iframe postMessage Patterns](https://dev.to/tvanantwerp/how-to-resize-iframes-with-message-events-2fec) - ResizeObserver approach
- [React Navigation Without Router](https://ncoughlin.com/posts/react-navigation-without-react-router) - State-based navigation
- [Auth0 Splash Screen Guide](https://auth0.com/blog/creating-a-splash-screen-for-your-react-apps/) - Loading screen HOC pattern

### Tertiary (LOW confidence)
- Circle.so iframe requirements: Based on general knowledge base articles, needs validation with actual embed

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries verified via official documentation
- Architecture: HIGH - Patterns from official docs and established best practices
- Pitfalls: MEDIUM - Common issues documented in community, Railway-specific verified

**Research date:** 2026-01-29
**Valid until:** 2026-02-28 (30 days - stable technologies)
