# Phase 4: Steps Carousel & Polish - Research

**Researched:** 2026-01-29
**Domain:** React Carousel, Touch Gestures, Accessibility, iframe Integration
**Confidence:** HIGH

## Summary

This phase implements a horizontal carousel for the "5 Steps" emotional regulation process, plus final integration testing for Circle.so iframe embedding. The research focused on four key areas: (1) horizontal carousel architecture using react-swipeable (already installed), (2) progress indicator UI/UX patterns, (3) accessibility compliance for carousel navigation, and (4) iframe height synchronization verification.

The recommended approach uses **react-swipeable** (v7.0.2, already installed) for horizontal swipe detection, combined with **CSS transforms** for smooth transitions. The carousel follows a **reducer-based state management** pattern for position tracking. Progress indicators use **aria-disabled** or **aria-current** for accessibility, with visual-only dot indicators meeting WCAG AA contrast requirements.

Circle.so iframe embedding is already supported via the existing `useIframeHeight` hook which uses `postMessage` to communicate content height changes. This phase should verify the carousel works correctly within the iframe context, particularly regarding touch gesture handling.

**Primary recommendation:** Build a custom carousel component using react-swipeable with useReducer for state, CSS translateX transitions, and aria-roledescription="carousel" for accessibility. No additional libraries needed.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-swipeable | 7.0.2 | Horizontal swipe detection | Already installed, lightweight, hook-based |
| React useReducer | Built-in | Carousel state management | Standard pattern from react-swipeable examples |
| CSS transforms | Native | Slide transitions | No JS animation library needed, respects reduced motion |
| Tailwind CSS 4 | 4.1.18 | Styling & transitions | Already in stack, motion-safe/motion-reduce variants |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | 0.563.0 | Arrow icons (ChevronLeft/ChevronRight) | Already installed for navigation buttons |
| usePrefersReducedMotion | Custom hook | Motion preference | Already exists from Phase 3 |
| useIframeHeight | Custom hook | iframe height sync | Already exists from Phase 1 |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| react-swipeable | Swiper.js | More features but adds 30KB+ dependency |
| react-swipeable | Embla Carousel | Powerful but learning curve, different API |
| CSS transforms | CSS scroll-snap | Native but harder to control step-by-step navigation |
| useReducer | useState | Simpler but harder to manage direction/sliding states |

**Installation:**
```bash
# No new dependencies needed - all already installed
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── steps/              # NEW - Steps carousel components
│   │   ├── StepsPage.tsx        # Main page with carousel
│   │   ├── StepsCarousel.tsx    # Carousel container with swipe handlers
│   │   ├── StepCard.tsx         # Individual step content card
│   │   └── ProgressIndicator.tsx # Dots and counter (e.g., "2/5")
│   └── ...
├── data/
│   └── steps.ts           # NEW - 5 steps data from content source
├── types/
│   └── steps.ts           # NEW - Step type definitions
└── hooks/
    └── usePrefersReducedMotion.ts  # EXISTING - reuse
```

### Pattern 1: Reducer-Based Carousel State
**What:** Use useReducer for carousel position tracking with sliding/direction states
**When to use:** All step-based carousels where position matters
**Example:**
```typescript
// Source: react-swipeable official examples + project adaptation
type Direction = 'PREV' | 'NEXT';

interface CarouselState {
  pos: number;      // Current step index (0-4)
  sliding: boolean; // Animation in progress
  dir: Direction;   // Last movement direction
}

type CarouselAction =
  | { type: 'PREV'; numItems: number }
  | { type: 'NEXT'; numItems: number }
  | { type: 'STOP_SLIDING' }
  | { type: 'GO_TO'; pos: number };

function carouselReducer(state: CarouselState, action: CarouselAction): CarouselState {
  switch (action.type) {
    case 'PREV':
      return {
        ...state,
        pos: state.pos === 0 ? state.pos : state.pos - 1, // No wrap for steps
        sliding: true,
        dir: 'PREV',
      };
    case 'NEXT':
      return {
        ...state,
        pos: state.pos === action.numItems - 1 ? state.pos : state.pos + 1,
        sliding: true,
        dir: 'NEXT',
      };
    case 'GO_TO':
      return {
        ...state,
        pos: action.pos,
        sliding: true,
        dir: action.pos > state.pos ? 'NEXT' : 'PREV',
      };
    case 'STOP_SLIDING':
      return { ...state, sliding: false };
    default:
      return state;
  }
}
```

### Pattern 2: Horizontal Swipe with react-swipeable
**What:** Configure useSwipeable for left/right swipe detection
**When to use:** The carousel container wrapping all steps
**Example:**
```typescript
// Source: react-swipeable documentation + official examples
import { useSwipeable } from 'react-swipeable';

function StepsCarousel({ steps }: { steps: Step[] }) {
  const [state, dispatch] = useReducer(carouselReducer, {
    pos: 0,
    sliding: false,
    dir: 'NEXT',
  });
  const prefersReducedMotion = usePrefersReducedMotion();
  const numItems = steps.length;

  const slide = (dir: Direction) => {
    dispatch({ type: dir, numItems });
    // Stop sliding state after animation
    if (!prefersReducedMotion) {
      setTimeout(() => dispatch({ type: 'STOP_SLIDING' }), 300);
    } else {
      dispatch({ type: 'STOP_SLIDING' });
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => slide('NEXT'),
    onSwipedRight: () => slide('PREV'),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: false, // Touch only for horizontal swipes
    trackTouch: true,
    delta: 50, // Minimum swipe distance
  });

  return (
    <div
      {...handlers}
      className="overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Les 5 etapes de regulation emotionnelle"
    >
      <div
        className={`flex ${
          prefersReducedMotion ? '' : 'transition-transform duration-300 ease-out'
        }`}
        style={{ transform: `translateX(-${state.pos * 100}%)` }}
      >
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="w-full flex-shrink-0"
            role="group"
            aria-roledescription="slide"
            aria-label={`Etape ${index + 1} sur ${numItems}: ${step.title}`}
            aria-hidden={index !== state.pos}
          >
            <StepCard step={step} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Pattern 3: Progress Indicator with Accessibility
**What:** Dots + counter showing current position
**When to use:** Below carousel to indicate progress
**Example:**
```typescript
// Source: WAI-ARIA carousel pattern + WCAG accessibility guidelines
interface ProgressIndicatorProps {
  current: number;  // 0-indexed
  total: number;
  onGoTo: (index: number) => void;
}

function ProgressIndicator({ current, total, onGoTo }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      {/* Dot indicators */}
      <div className="flex gap-2" role="group" aria-label="Choisir une etape">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            onClick={() => onGoTo(index)}
            aria-label={`Aller a l'etape ${index + 1}`}
            aria-disabled={index === current}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === current
                ? 'bg-brand-primary'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Numeric counter */}
      <span
        className="text-text-secondary text-sm"
        aria-live="polite"
        aria-atomic="true"
      >
        {current + 1}/{total}
      </span>
    </div>
  );
}
```

### Pattern 4: Navigation Arrows
**What:** Prev/Next buttons with disabled state at boundaries
**When to use:** Alongside progress indicator for explicit navigation
**Example:**
```typescript
// Source: Project patterns + accessibility best practices
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationArrowsProps {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
}

function NavigationArrows({ onPrev, onNext, canPrev, canNext }: NavigationArrowsProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Etape precedente"
        className={`p-3 rounded-full ${
          canPrev
            ? 'bg-bg-secondary hover:bg-white/10 text-text-primary'
            : 'bg-bg-secondary/50 text-text-secondary/50 cursor-not-allowed'
        } focus:outline-none focus:ring-2 focus:ring-brand-primary`}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={onNext}
        disabled={!canNext}
        aria-label="Etape suivante"
        className={`p-3 rounded-full ${
          canNext
            ? 'bg-bg-secondary hover:bg-white/10 text-text-primary'
            : 'bg-bg-secondary/50 text-text-secondary/50 cursor-not-allowed'
        } focus:outline-none focus:ring-2 focus:ring-brand-primary`}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
```

### Anti-Patterns to Avoid
- **Infinite loop carousel for steps:** The 5-step process is sequential, not cyclical. Don't wrap from step 5 back to step 1.
- **Auto-play/auto-advance:** Users need time to read and process each step. Never auto-advance.
- **Hiding navigation controls:** Always show prev/next buttons even when disabled, so users understand navigation options.
- **Swipe-only navigation:** Always provide button alternatives for users who can't or prefer not to swipe.
- **Animating without motion preference check:** Reuse the existing `usePrefersReducedMotion` hook.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Swipe detection | Touch event math | react-swipeable | Velocity, direction, delta thresholds handled |
| Motion preference | Manual media query | usePrefersReducedMotion hook | Already exists in project, reactive updates |
| iframe height sync | Manual postMessage | useIframeHeight hook | Already exists, handles ResizeObserver |
| Carousel state | Multiple useState | useReducer pattern | Cleaner state transitions, standard pattern |

**Key insight:** This phase should leverage existing project hooks (usePrefersReducedMotion, useIframeHeight) and the already-installed react-swipeable. No new dependencies needed.

## Common Pitfalls

### Pitfall 1: Swipe Conflicts with Vertical Scroll
**What goes wrong:** Horizontal swipe captures vertical scroll attempts
**Why it happens:** Touch events don't distinguish initial direction
**How to avoid:** Set `preventScrollOnSwipe: true` and reasonable `delta` threshold (50px)
**Warning signs:** Users struggle to scroll page content on mobile

### Pitfall 2: Step Card Content Overflow
**What goes wrong:** Long content in step cards causes layout issues
**Why it happens:** Each step has variable-length bullet points
**How to avoid:** Make step cards scrollable with max-height, or ensure viewport fits one step
**Warning signs:** Content cut off, overlapping, or carousel height jumping

### Pitfall 3: Keyboard Navigation Not Working
**What goes wrong:** Arrow keys don't navigate carousel
**Why it happens:** Focus on carousel container doesn't enable key handlers
**How to avoid:** Add tabIndex={0} to carousel and onKeyDown for ArrowLeft/ArrowRight
**Warning signs:** Keyboard users can't navigate without Tab-clicking prev/next buttons

```typescript
// Add to carousel container
onKeyDown={(e) => {
  if (e.key === 'ArrowLeft') slide('PREV');
  if (e.key === 'ArrowRight') slide('NEXT');
}}
tabIndex={0}
```

### Pitfall 4: iframe Height Not Updating on Slide Change
**What goes wrong:** Circle.so iframe doesn't resize when carousel changes slides
**Why it happens:** useIframeHeight only watches body, not internal content changes
**How to avoid:** The existing ResizeObserver on document.body should catch this, but verify
**Warning signs:** Content cut off or extra whitespace in iframe

### Pitfall 5: Touch Events Blocked in iframe
**What goes wrong:** Swipe doesn't work when embedded in Circle.so
**Why it happens:** iframe sandbox or touch-action CSS conflicts
**How to avoid:** Ensure `touch-action: pan-y` is not set on carousel, test in actual Circle.so
**Warning signs:** Swipe works in dev but not in production iframe

## Code Examples

Verified patterns from official sources:

### Complete Step Data Type
```typescript
// Source: Project pattern based on content source
export interface Step {
  id: number;         // 1-5
  title: string;      // e.g., "S'arreter"
  question: string;   // Key question for this step
  actions: string[];  // Bullet points from content
}

export const steps: Step[] = [
  {
    id: 1,
    title: "S'arreter",
    question: "C'est plus fort que moi, je vois bien que je reagis.",
    actions: [
      "Faire le choix de s'arreter et de laisser aller le declencheur exterieur.",
      "Trouver un endroit pour se calmer.",
      "Prendre quelques respirations profondes.",
      "Prendre le temps de se recentrer interieurement.",
      "Revenir dans le moment present."
    ]
  },
  // ... steps 2-5
];
```

### Step Card Component
```typescript
// Source: Project design system + content structure
interface StepCardProps {
  step: Step;
  stepNumber: number;
  totalSteps: number;
}

function StepCard({ step, stepNumber, totalSteps }: StepCardProps) {
  return (
    <div className="bg-bg-secondary rounded-2xl p-6 mx-4 min-h-[400px]">
      {/* Step number badge */}
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-brand-primary text-white text-lg font-bold w-10 h-10 rounded-full flex items-center justify-center">
          {stepNumber}
        </span>
        <h2 className="text-xl font-semibold text-text-primary">
          {step.title}
        </h2>
      </div>

      {/* Key question */}
      <p className="text-brand-link italic mb-6 text-lg">
        "{step.question}"
      </p>

      {/* Action items */}
      <ul className="space-y-3">
        {step.actions.map((action, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-brand-primary mt-1">•</span>
            <span className="text-text-primary">{action}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Complete StepsPage Integration
```typescript
// Source: Project integration pattern
import { useReducer } from 'react';
import { useSwipeable } from 'react-swipeable';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { steps } from '../../data/steps';

export function StepsPage() {
  const [state, dispatch] = useReducer(carouselReducer, {
    pos: 0,
    sliding: false,
    dir: 'NEXT' as const,
  });
  const prefersReducedMotion = usePrefersReducedMotion();
  const numItems = steps.length;

  const slide = (dir: 'PREV' | 'NEXT') => {
    dispatch({ type: dir, numItems });
    if (!prefersReducedMotion) {
      setTimeout(() => dispatch({ type: 'STOP_SLIDING' }), 300);
    } else {
      dispatch({ type: 'STOP_SLIDING' });
    }
  };

  const goTo = (index: number) => {
    dispatch({ type: 'GO_TO', pos: index });
    if (!prefersReducedMotion) {
      setTimeout(() => dispatch({ type: 'STOP_SLIDING' }), 300);
    } else {
      dispatch({ type: 'STOP_SLIDING' });
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => state.pos < numItems - 1 && slide('NEXT'),
    onSwipedRight: () => state.pos > 0 && slide('PREV'),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: false,
    trackTouch: true,
    delta: 50,
  });

  return (
    <div>
      <header className="mb-6 px-4">
        <h1 className="text-2xl font-semibold text-text-primary mb-2">
          Les 5 etapes
        </h1>
        <p className="text-text-secondary">
          Du declencheur au besoin - Mieux se comprendre
        </p>
      </header>

      {/* Navigation arrows above carousel */}
      <div className="flex justify-between px-4 mb-4">
        <button
          onClick={() => slide('PREV')}
          disabled={state.pos === 0}
          aria-label="Etape precedente"
          className="p-3 rounded-full bg-bg-secondary disabled:opacity-50"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => slide('NEXT')}
          disabled={state.pos === numItems - 1}
          aria-label="Etape suivante"
          className="p-3 rounded-full bg-bg-secondary disabled:opacity-50"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Carousel */}
      <div
        {...handlers}
        className="overflow-hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label="Les 5 etapes de regulation emotionnelle"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft' && state.pos > 0) slide('PREV');
          if (e.key === 'ArrowRight' && state.pos < numItems - 1) slide('NEXT');
        }}
      >
        <div
          className={`flex ${
            prefersReducedMotion ? '' : 'transition-transform duration-300 ease-out'
          }`}
          style={{ transform: `translateX(-${state.pos * 100}%)` }}
        >
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="w-full flex-shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`Etape ${index + 1} sur ${numItems}`}
              aria-hidden={index !== state.pos}
            >
              <StepCard step={step} stepNumber={index + 1} totalSteps={numItems} />
            </div>
          ))}
        </div>
      </div>

      {/* Progress indicator */}
      <ProgressIndicator
        current={state.pos}
        total={numItems}
        onGoTo={goTo}
      />
    </div>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| jQuery carousel plugins | React hook-based (react-swipeable) | 2020+ | Declarative, smaller bundle |
| JS animation libraries | CSS transforms + transitions | 2022+ | Better perf, respects reduced motion |
| Manual ARIA | aria-roledescription="carousel/slide" | ARIA 1.2 (2021) | Cleaner screen reader UX |
| CSS scroll-snap only | scroll-snap + JS for control | 2024+ | Snap for native feel, JS for programmatic control |

**Deprecated/outdated:**
- Slick Carousel: jQuery-based, not recommended for React projects
- react-slick: jQuery dependency, use Embla or react-swipeable instead
- Auto-play carousels: WCAG discourages, always requires pause control

## Open Questions

Things that couldn't be fully resolved:

1. **Circle.so iframe touch behavior**
   - What we know: useIframeHeight hook exists and uses postMessage + ResizeObserver
   - What's unclear: Whether Circle.so has specific sandbox restrictions affecting touch
   - Recommendation: Test in actual Circle.so environment during integration testing; if issues arise, consider CSS `touch-action: manipulation` on carousel

2. **Optimal step card height**
   - What we know: Steps have variable content length (3-5 bullet points each)
   - What's unclear: Best approach - fixed height with scroll, or variable height
   - Recommendation: Start with min-height ensuring tallest step fits, test on mobile

3. **Keyboard focus indicator visibility**
   - What we know: Project uses focus:ring-2 focus:ring-brand-primary pattern
   - What's unclear: Whether blue ring is visible enough on blue brand background
   - Recommendation: Test contrast, may need white/light focus ring on brand-colored elements

## Sources

### Primary (HIGH confidence)
- [react-swipeable GitHub - Carousel example](https://github.com/FormidableLabs/react-swipeable/blob/main/examples/app/SimpleCarousel/Carousel.tsx) - Official example code
- [react-swipeable Documentation - Simple Carousel](https://nearform.com/open-source/react-swipeable/docs/examples/simple-carousel/) - Hook configuration
- [W3C WAI-ARIA APG - Carousel Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) - Accessibility requirements
- [MDN - ARIA progressbar role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/progressbar_role) - Progress indicator patterns

### Secondary (MEDIUM confidence)
- [Smashing Magazine - Building Accessible Carousels](https://www.smashingmagazine.com/2023/02/guide-building-accessible-carousels/) - Best practices compilation
- [Chrome Developers - Make accessible carousels](https://developer.chrome.com/blog/accessible-carousel) - Modern CSS carousel features
- [Bacancy Technology - Best React Carousel Libraries 2026](https://www.bacancytechnology.com/blog/react-carousel) - Library comparison

### Tertiary (LOW confidence)
- Circle.so iframe documentation was not directly accessible; rely on existing useIframeHeight hook and test in production

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - react-swipeable already installed and documented, patterns verified
- Architecture: HIGH - reducer pattern from official examples, ARIA from W3C specs
- Pitfalls: MEDIUM - some based on general carousel knowledge, Circle.so testing needed

**Research date:** 2026-01-29
**Valid until:** 2026-02-28 (30 days - stable domain, react-swipeable mature)
