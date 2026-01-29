# Phase 2: Emotion Cards Display - Research

**Researched:** 2026-01-29
**Domain:** React Components with Tailwind CSS 4 Responsive Grids
**Confidence:** HIGH

## Summary

This phase involves creating emotion card components that display content from Diane Lapensee's emotional regulation tables. The implementation requires:
1. Data modeling for 7 unpleasant emotions (including 4 Culpabilite sub-types) and 6 pleasant sentiments
2. Responsive grid layouts (1 col mobile, 2 col tablet, 3 col desktop)
3. Colored card backgrounds with Lucide icons and keywords
4. Hover elevation effects with smooth 200ms transitions

The existing codebase provides excellent patterns to follow: `SectionCard.tsx` demonstrates the clickable card pattern with hover states, and `sections.ts` shows the data structure approach. The design tokens (emotion colors) are already defined in `src/index.css` via Tailwind CSS 4's `@theme` directive.

**Primary recommendation:** Create emotion data files following the existing `sections.ts` pattern, build an `EmotionCard` component modeled on `SectionCard`, and use Tailwind's responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`) with `transition shadow-md hover:shadow-xl duration-200` for elevation effects.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 18.3.1 | Component framework | Already installed, stable |
| TypeScript | 5.6.2 | Type safety | Already configured |
| Tailwind CSS | 4.1.18 | Utility-first styling | Already configured with @theme |
| Lucide React | 0.563.0 | Icon library | Already installed, tree-shakeable |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @tailwindcss/vite | 4.1.18 | Build integration | Already configured |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Tailwind grid | CSS Grid manually | Tailwind provides responsive utilities out of box |
| Lucide | Heroicons, Phosphor | Lucide already installed, good emotion icon coverage |

**Installation:**
```bash
# No additional packages needed - all dependencies already installed
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── emotions/           # NEW: Emotion card components
│   │   ├── EmotionCard.tsx
│   │   ├── EmotionGrid.tsx
│   │   └── UnpleasantEmotionsPage.tsx
│   ├── sentiments/         # NEW: Pleasant sentiment components
│   │   ├── SentimentCard.tsx
│   │   ├── SentimentGrid.tsx
│   │   └── PleasantSentimentsPage.tsx
│   ├── home/               # Existing
│   ├── layout/             # Existing
│   └── ui/                 # Existing
├── data/
│   ├── sections.ts         # Existing
│   ├── emotions.ts         # NEW: 7 unpleasant emotions data
│   └── sentiments.ts       # NEW: 6 pleasant sentiments data
└── types/
    ├── navigation.ts       # Existing
    └── emotions.ts         # NEW: Emotion/Sentiment type definitions
```

### Pattern 1: Data-Driven Card Rendering
**What:** Define emotion data in TypeScript files, map over arrays to render cards
**When to use:** Always - matches existing `sections.ts` pattern
**Example:**
```typescript
// Source: Existing pattern from src/data/sections.ts
export interface Emotion {
  id: string;
  name: string;
  icon: string;  // Lucide icon name
  keywords: string[];  // 3 keywords for closed card
  color: string;  // Tailwind bg class e.g. 'bg-red'
  textColor: string;  // Tailwind text class
  // Full content for modal (Phase 3)
  variations: string[];
  triggers: string[];
  defensiveReactions: string[];
  needs: string[];
}

// Usage in component
{emotions.map((emotion) => (
  <EmotionCard key={emotion.id} emotion={emotion} onClick={() => openModal(emotion)} />
))}
```

### Pattern 2: Responsive Grid with Tailwind
**What:** Use Tailwind's responsive grid utilities for adaptive layouts
**When to use:** All card grid displays
**Example:**
```typescript
// Source: Tailwind CSS 4.1 docs - grid-template-columns
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {emotions.map((emotion) => (
    <EmotionCard key={emotion.id} emotion={emotion} />
  ))}
</div>
```

### Pattern 3: Clickable Card with Button Element
**What:** Use `<button>` element for clickable cards, not `<div>` with onClick
**When to use:** Any card that triggers an action (modal opening)
**Example:**
```typescript
// Source: Existing pattern from SectionCard.tsx
export function EmotionCard({ emotion, onClick }: EmotionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-6 rounded-2xl ${emotion.color} ${emotion.textColor}
        text-left transition-shadow duration-200
        shadow-md hover:shadow-xl
        focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2`}
    >
      {/* Card content */}
    </button>
  );
}
```

### Pattern 4: Icon as Component with Dynamic Import
**What:** Import Lucide icons as components, use size/color props
**When to use:** Displaying emotion icons on cards
**Example:**
```typescript
// Source: Lucide React docs
import { Flame, Frown, Heart, Meh, Skull, Zap, AlertCircle } from 'lucide-react';

// Map emotion to icon component
const emotionIcons: Record<string, React.ComponentType<LucideProps>> = {
  colere: Flame,
  honte: Frown,
  tristesse: Heart,  // broken heart concept
  degout: Meh,
  peur: Skull,
  surprise: Zap,
  culpabilite: AlertCircle,
};

// Usage
const Icon = emotionIcons[emotion.id];
<Icon size={32} className="mb-2" />
```

### Anti-Patterns to Avoid
- **Wrapping entire card in `<a>` or `<div>`:** Use `<button>` for clickable cards - provides proper keyboard navigation and ARIA
- **Hardcoding breakpoints:** Use Tailwind's responsive prefixes (`sm:`, `lg:`) instead of custom media queries
- **Inline transition styles:** Use Tailwind's `transition-*` and `duration-*` utilities
- **Custom box-shadow CSS:** Use Tailwind's `shadow-md`, `shadow-xl` utilities

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Responsive grid | Custom CSS Grid media queries | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` | Tailwind handles breakpoints consistently |
| Hover elevation | Custom CSS transitions | `shadow-md hover:shadow-xl transition-shadow duration-200` | Standard utility pattern |
| Icon sizing | Manual SVG sizing | Lucide `size` prop | Consistent sizing, maintains aspect ratio |
| Focus states | Custom outline styling | `focus:ring-2 focus:ring-offset-2` | Accessible, consistent focus indicators |
| Card button semantics | `<div onClick>` with role="button" | Native `<button>` element | Free keyboard nav, ARIA, disabled state |

**Key insight:** Tailwind CSS 4's utility classes combined with Lucide's React components handle 95% of card display needs. Custom CSS should only be used for truly unique requirements.

## Common Pitfalls

### Pitfall 1: Using `<div onClick>` Instead of `<button>`
**What goes wrong:** Cards not keyboard-accessible, no focus states, screen readers confused
**Why it happens:** Developers think visually about cards, not semantically
**How to avoid:** Always use `<button>` for clickable cards that trigger actions
**Warning signs:** Tab key doesn't navigate to cards, Enter/Space don't activate

### Pitfall 2: Forgetting Tailwind's Mobile-First Approach
**What goes wrong:** Styles for mobile override desktop styles
**Why it happens:** Misunderstanding that unprefixed classes apply to ALL screens
**How to avoid:** Start with mobile styles (unprefixed), add `sm:`, `md:`, `lg:` for larger screens
**Warning signs:** Grid shows 3 columns on mobile, 1 column on desktop

### Pitfall 3: Hardcoding Colors Instead of Using Design Tokens
**What goes wrong:** Inconsistent colors, hard to maintain
**Why it happens:** Copy-pasting hex codes instead of using defined tokens
**How to avoid:** Use `bg-red`, `bg-orange`, etc. from `@theme` in index.css
**Warning signs:** Colors don't match design system, duplicated hex values

### Pitfall 4: Missing Transition Property Specification
**What goes wrong:** All properties animate, causing performance issues
**Why it happens:** Using `transition-all` when only shadow needs to animate
**How to avoid:** Use specific `transition-shadow` for hover elevation
**Warning signs:** Card text/colors flash during hover transitions

### Pitfall 5: Culpabilite Special Case Forgotten
**What goes wrong:** Culpabilite card doesn't open sub-cards
**Why it happens:** Treating all emotions identically
**How to avoid:** Design data structure to accommodate 4 sub-types (saine, de soi, se faire, faire)
**Warning signs:** Culpabilite modal shows generic content instead of 4 sub-options

## Code Examples

Verified patterns from official sources:

### Responsive Grid Layout
```typescript
// Source: Tailwind CSS 4.1 docs
// Requirements: CARD-05
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
  {/* Cards */}
</div>
```

### Card with Hover Elevation
```typescript
// Source: Tailwind CSS 4.1 transition-property docs
// Requirements: ANIM-01, ANIM-02
<button
  className={`
    w-full p-6 rounded-2xl text-left
    ${emotion.color} ${emotion.textColor}
    shadow-md hover:shadow-xl
    transition-shadow duration-200
    focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2
  `}
>
  {/* Content */}
</button>
```

### Lucide Icon with Size
```typescript
// Source: Lucide React docs
import { Flame } from 'lucide-react';

<Flame size={32} className="mb-3" />
// Or with currentColor (inherits text color):
<Flame size={32} strokeWidth={2} />
```

### Emotion Data Type Definition
```typescript
// Source: Project pattern from sections.ts
export interface Emotion {
  id: string;
  name: string;
  icon: keyof typeof icons;  // Type-safe icon name
  keywords: [string, string, string];  // Exactly 3 keywords
  color: string;
  textColor: string;
  // Extended data for modal (Phase 3)
  variations: string[];
  triggers: string[];
  defensiveReactions: string[];
  needs: string[];
}

// Culpabilite sub-type for special handling
export interface CulpabiliteSubType {
  id: 'saine' | 'de-soi' | 'se-faire' | 'faire';
  name: string;
  // ... same structure as Emotion
}

export interface CulpabiliteEmotion extends Omit<Emotion, 'variations' | 'triggers'> {
  subTypes: CulpabiliteSubType[];
}
```

### Complete EmotionCard Component
```typescript
// Source: Composite pattern from existing SectionCard.tsx + research
import { LucideIcon } from 'lucide-react';

interface EmotionCardProps {
  emotion: Emotion;
  icon: LucideIcon;
  onClick: () => void;
}

export function EmotionCard({ emotion, icon: Icon, onClick }: EmotionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full p-6 rounded-2xl text-left
        ${emotion.color} ${emotion.textColor}
        shadow-md hover:shadow-xl
        transition-shadow duration-200
        focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2
        min-h-[140px]
      `}
    >
      <Icon size={32} className="mb-3" />
      <h3 className="text-lg font-semibold mb-2">{emotion.name}</h3>
      <p className="text-sm opacity-90">
        {emotion.keywords.join(' · ')}
      </p>
    </button>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Tailwind CSS 3 config file | Tailwind CSS 4 `@theme` directive | v4.0 (2024) | Design tokens in CSS, no JS config needed |
| `shadow` + `hover:shadow-lg` | `shadow-md` + `hover:shadow-xl` | v4.0 | More granular shadow scale (2xs to 2xl) |
| `transition` (all properties) | `transition-shadow` | Best practice | Better performance, intentional animations |

**Deprecated/outdated:**
- `tailwind.config.js` for design tokens: Use `@theme` directive in CSS instead (Tailwind CSS 4)
- `shadow-sm`/`shadow-lg` old scale: New scale has `shadow-2xs`, `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`

## Open Questions

Things that couldn't be fully resolved:

1. **Best Lucide Icons for Each Emotion**
   - What we know: Lucide has `angry`, `frown`, `meh`, `skull`, `flame`, `zap`, `heart-crack`, `alert-circle`
   - What's unclear: Exact mapping for each emotion (e.g., should Honte use `frown` or `eye-off`?)
   - Recommendation: Start with obvious mappings, refine during implementation based on visual review

2. **Culpabilite Card UX Flow**
   - What we know: Opens to 4 sub-cards (saine, de soi, se faire, faire a l'autre)
   - What's unclear: Should sub-cards appear inline or in modal? Same page or nested view?
   - Recommendation: Design as nested view (click card -> show 4 sub-cards) per CLAUDE.md spec "opens to 4 sub-cards"

3. **Keywords Selection from Content**
   - What we know: Each emotion has "En d'autres mots" list and other content
   - What's unclear: Which 3 keywords best represent each emotion for closed card display?
   - Recommendation: Pick first 3 most distinctive words from "En d'autres mots" section

## Sources

### Primary (HIGH confidence)
- Tailwind CSS 4.1 Official Docs - box-shadow, transition-property, grid-template-columns, gap
- Lucide React Official Docs - icon usage, props, tree-shaking
- Existing codebase - `SectionCard.tsx`, `sections.ts` patterns

### Secondary (MEDIUM confidence)
- Tailwind CSS responsive design documentation (verified with official docs)
- Accessibility patterns for clickable cards (multiple credible sources agree)

### Tertiary (LOW confidence)
- Specific icon choices for emotions (requires visual validation)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed and configured
- Architecture: HIGH - Follows existing codebase patterns exactly
- Pitfalls: HIGH - Common issues well-documented in official sources

**Research date:** 2026-01-29
**Valid until:** 2026-02-28 (30 days - stable technologies)

---

## Appendix: Emotion Data from Content Source

Extracted from `tableaux-regulation-emotionnelle-complet.md`:

### 7 Unpleasant Emotions (Quand ca ne va pas)

1. **Colere** - Color: `bg-red`
   - Keywords: Agace, Frustre, Furieux

2. **Honte** - Color: `bg-orange`
   - Keywords: Embarrasse, Gene, Humilie

3. **Tristesse** - Color: `bg-brand-primary` (blue)
   - Keywords: Chagrine, Decu, Melancolique

4. **Degout** - Color: `bg-green`
   - Keywords: Ecoeure, Repugne, Sature

5. **Peur** - Color: `bg-purple`
   - Keywords: Anxieux, Craintif, Stresse

6. **Surprise** - Color: `bg-yellow`
   - Keywords: Choque, Confus, Stupefait

7. **Culpabilite** - Color: `bg-taupe`
   - Keywords: Fautif, Mal a l'aise, Responsable
   - Special: Has 4 sub-types (saine, de soi, se faire, faire a l'autre)

### 6 Pleasant Sentiments (Quand ca va bien)

1. **Amour** - Color: `bg-red` or custom pink
   - Keywords: Amoureux, Connecte, Passionne

2. **Fierte** - Color: `bg-orange` or custom gold
   - Keywords: Fier, Accompli, Satisfait

3. **Joie** - Color: `bg-yellow`
   - Keywords: Content, Heureux, Joyeux

4. **Engagement** - Color: `bg-green` or custom
   - Keywords: Engage, Investi, Interesse

5. **Confiance** - Color: `bg-brand-primary` (blue)
   - Keywords: Confiant, Rassure, Securise

6. **Paix** - Color: `bg-mint`
   - Keywords: Apaise, Serein, Comble
