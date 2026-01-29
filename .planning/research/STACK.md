# Stack Research

> Research conducted: January 2026
> Context: Interactive card-based emotion exploration web app, embedded in Circle.so via iframe

## Recommended Stack

### Core (Confirmed)

| Library | Version | Rationale |
|---------|---------|-----------|
| **React** | 18.x / 19.x | Industry standard for interactive SPAs. Component-based architecture ideal for card-based UI. Excellent ecosystem support. |
| **Vite** | 6.x | Blazing-fast HMR and optimized builds via ESBuild. The recommended build tool for standalone React apps in 2025-2026. Native ESM support, minimal config. |
| **Tailwind CSS** | 4.x | Utility-first CSS with zero runtime overhead. New v4 engine with automatic content detection and faster builds. Excellent dark mode support via `dark:` variant. Perfect for rapid UI iteration. |
| **Lucide React** | 0.56x+ | Modern, consistent icon toolkit. Fork of Feather Icons with active community maintenance. Excellent tree-shaking support keeps bundle small. |

**Verdict: Stack is appropriate and follows 2025-2026 best practices.**

### Animations

**Recommendation: Motion (formerly Framer Motion) + Tailwind CSS transitions**

| Approach | Use Case | Rationale |
|----------|----------|-----------|
| **Motion** | Slide-in panels, layout animations, gesture-based interactions | Physics-driven, state-aware animations. Handles enter/exit animations elegantly. `layout` prop for smooth layout shifts. |
| **Tailwind transitions** | Hover states, simple color/opacity changes | Native CSS performance, no runtime overhead. Use `transition-*` utilities. |

**Best Practice:** Use both strategically. CSS for simple hover/focus states; Motion for complex, state-driven animations like panel slides and card transitions.

**Package:** `motion` (the new name as of Feb 2025, replaces `framer-motion`)

```bash
npm install motion
```

### Carousel

**Recommendation: Embla Carousel**

| Library | Rationale |
|---------|-----------|
| **Embla Carousel** | Lightweight (~5KB gzipped), dependency-free, headless approach gives full design control. Built-in accessibility (keyboard navigation, screen reader support). Perfect for custom-styled carousels. |

**Why not Swiper?** Swiper is feature-rich but heavier. For a simple emotion card carousel with custom styling needs, Embla's minimal footprint and headless architecture is the better fit.

```bash
npm install embla-carousel-react
```

**Key features:**
- Fluid motion and precise swipe detection
- SSR compatible
- Plugin architecture for autoplay, navigation dots, etc.
- Works seamlessly with Tailwind styling

### State Management

**Recommendation: Start with React built-ins, add Zustand only if needed**

| Complexity Level | Solution |
|------------------|----------|
| **Simple (likely sufficient)** | React `useState` + `useContext` for theme/settings |
| **If complexity grows** | Zustand (<1KB, no boilerplate, no Provider wrapper) |

**Rationale:** For an emotion card exploration app with likely simple state (current card, panel visibility, selected emotion), React's built-in hooks should suffice. Avoid premature optimization.

**If you do need external state:**
```bash
npm install zustand
```

Zustand is preferred over Jotai for this use case because:
- Centralized store pattern fits better for app-wide settings
- Simpler mental model for small teams
- No Provider wrapper needed

### Accessibility

**Recommendation: Radix UI Primitives for interactive components**

| Library | Use Case | Rationale |
|---------|----------|-----------|
| **Radix UI** | Dialogs, tooltips, accordions, dropdown menus | Headless, unstyled primitives with WAI-ARIA compliance built-in. Pairs perfectly with Tailwind. |
| **Native HTML** | Buttons, links, form controls | Use semantic HTML with proper ARIA attributes. Don't over-engineer. |

**Specific packages to consider:**
```bash
npm install @radix-ui/react-dialog      # For slide-in panels
npm install @radix-ui/react-tooltip     # For emotion descriptions
npm install @radix-ui/react-visually-hidden  # For screen reader text
```

**Alternative:** React Aria (Adobe) is more comprehensive but stricter. Radix offers more flexibility for custom styling while maintaining accessibility.

**Key accessibility practices:**
- Ensure all interactive cards are keyboard navigable
- Provide proper focus management for modals/panels
- Use `prefers-reduced-motion` media query for users who prefer less animation
- Include descriptive alt text for emotion visuals
- Test with screen readers (VoiceOver, NVDA)

### Deployment (Railway)

**Confirmed: Railway works well with Vite + React**

| Consideration | Recommendation |
|---------------|----------------|
| **Build output** | Serve static `dist` folder with Caddy (Railway's recommended approach) |
| **Do NOT** | Run Vite dev server in production (costly, not production-ready) |
| **Template** | Use Railway's "Vite + React" one-click template or configure Nixpacks |

**Important:** Ensure production build serves via proper web server, not Vite preview.

### iframe Embedding (Circle.so)

| Practice | Implementation |
|----------|----------------|
| **Responsive height** | Use ResizeObserver + postMessage to communicate height to parent |
| **Sandbox attributes** | Configure appropriate permissions in Circle.so embed settings |
| **Performance** | Lazy load non-critical content, optimize initial bundle size |

---

## Complete Package List

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "lucide-react": "^0.460.0",
    "motion": "^11.15.0",
    "embla-carousel-react": "^8.5.0",
    "@radix-ui/react-dialog": "^1.1.0",
    "@radix-ui/react-tooltip": "^1.1.0",
    "@radix-ui/react-visually-hidden": "^1.1.0"
  },
  "devDependencies": {
    "vite": "^6.0.0",
    "@vitejs/plugin-react": "^4.3.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "prettier-plugin-tailwindcss": "^0.6.0",
    "typescript": "^5.6.0"
  }
}
```

**Estimated bundle size impact:**
- React + React DOM: ~45KB gzipped
- Motion: ~15KB gzipped
- Embla Carousel: ~5KB gzipped
- Radix primitives: ~3-5KB each
- Lucide (tree-shaken): ~1KB per icon used
- **Total estimated:** ~70-80KB gzipped (very reasonable)

---

## What NOT to Use

| Library/Approach | Reason to Avoid |
|------------------|-----------------|
| **Redux / Redux Toolkit** | Overkill for this app size. Too much boilerplate for simple card state. |
| **CSS-in-JS (Emotion, styled-components)** | Runtime overhead. Tailwind provides superior DX and performance for this use case. |
| **Swiper.js** | Heavier than needed (~40KB). Use Embla for lightweight carousel. |
| **React Spring** | Motion/Framer Motion has better React integration and simpler API for common use cases. |
| **Full component libraries (MUI, Chakra, Ant)** | Too opinionated for custom emotion card design. Harder to customize for unique visual identity. |
| **GSAP** | Overkill complexity. Better for timeline-based marketing animations, not UI transitions. |
| **Next.js / Remix** | SSR not needed for iframe-embedded SPA. Adds unnecessary complexity. Vite is the right choice. |
| **Recoil** | Facebook's state library but less actively maintained than Zustand/Jotai. |

---

## Confidence Levels

| Decision | Confidence | Notes |
|----------|------------|-------|
| React + Vite + Tailwind | **High** | Industry standard for 2025-2026 SPAs. Well-documented, stable, performant. |
| Lucide React | **High** | Excellent icon library, already chosen. No changes needed. |
| Motion for animations | **High** | Clear winner for React animations. Active development, great DX. |
| Embla Carousel | **High** | Best balance of performance, accessibility, and customization for this use case. |
| Zustand (if needed) | **High** | Clear recommendation for lightweight state management, but may not even be necessary. |
| Radix UI for a11y | **Medium-High** | Excellent choice, but React Aria is also valid. Radix edges out for Tailwind integration. |
| Railway deployment | **High** | Works well with Vite, just ensure proper production build setup. |
| "Not using Redux" | **High** | Universally agreed: overkill for small SPAs in 2025. |

---

## Sources

### Core Stack
- [Tailwind CSS Best Practices 2025-2026](https://www.frontendtools.tech/blog/tailwind-css-best-practices-design-system-patterns)
- [React & CSS in 2026: Best Styling Approaches](https://medium.com/@imranmsa93/react-css-in-2026-best-styling-approaches-compared-d5e99a771753)
- [React Stack Patterns](https://www.patterns.dev/react/react-2026/)
- [Modern Web Development with React, Tailwind, and Vite](https://medium.com/@rdhanurzid/modern-web-development-with-react-tailwind-and-vite-a-good-approach-241e1ccf3f4d)

### Animations
- [Motion (Framer Motion) Official Site](https://motion.dev/)
- [Why Framer Motion Still Beats CSS Animations in 2025](https://medium.com/@theekshanachamodhya/why-framer-motion-still-beats-css-animations-in-2025-16b3d74eccbd)
- [Framer Motion vs CSS: React Animation Guide](https://tillitsdone.com/blogs/framer-motion-vs-css-in-react/)
- [Do you still need Framer Motion?](https://motion.dev/blog/do-you-still-need-framer-motion)

### Carousel
- [2025's Best Carousel JS & React Slider Libraries](https://logixbuilt.com/blogs/top-carousel-js-libraries-for-2025)
- [10 React Carousel Libraries for 2025](https://enstacked.com/react-carousel-component-libraries/)
- [Embla Carousel Official Docs](https://www.embla-carousel.com/get-started/react/)
- [Best React Carousel Libraries for 2026](https://blog.croct.com/post/best-react-carousel-slider-libraries)

### State Management
- [State Management in 2025: Context, Redux, Zustand, or Jotai](https://dev.to/hijazi313/state-management-in-2025-when-to-use-context-redux-zustand-or-jotai-2d2k)
- [State Management Trends in React 2025](https://makersden.io/blog/react-state-management-in-2025)
- [Modern React State Management in 2025](https://dev.to/joodi/modern-react-state-management-in-2025-a-practical-guide-2j8f)

### Accessibility
- [React ARIA vs Radix UI](https://www.dhiwise.com/post/react-aria-vs-radix-ui-what-best-ui-toolkit)
- [Top 7 Headless UI Libraries for React](https://dev.to/joodi/top-6-headless-ui-libraries-for-react-developers-3mfi)
- [Migrating from Radix to React Aria](https://argos-ci.com/blog/react-aria-migration)

### Deployment
- [Deploy a React App on Railway](https://docs.railway.com/guides/react)
- [Railway Vite + React Template](https://railway.com/new/template/NeiLty)

### Icons
- [Lucide Official Site](https://lucide.dev/)
- [Best React Icon Libraries for 2026](https://mighil.com/best-react-icon-libraries)
