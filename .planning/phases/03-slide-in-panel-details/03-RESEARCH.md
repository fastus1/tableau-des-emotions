# Phase 3: Slide-in Panel & Details - Research

**Researched:** 2026-01-29
**Domain:** React Modal/Panel Components, Accessibility (A11Y), Touch Gestures
**Confidence:** HIGH

## Summary

This phase implements a slide-in panel system for displaying emotion details with full accessibility support. The research focused on three key areas: (1) slide-in panel architecture using native HTML `<dialog>` element, (2) accessibility compliance including focus trapping and keyboard navigation, and (3) touch gesture detection for swipe-to-close functionality.

The recommended approach uses the **native HTML `<dialog>` element** with `showModal()` for automatic focus management, background inertness, and Escape key handling. For swipe gestures, **react-swipeable** (v7.0.2) provides a lightweight hook-based solution. Focus trapping is handled natively by `<dialog>` when using `showModal()`, eliminating the need for `focus-trap-react` in most cases.

The Culpabilite special case (4 sub-cards leading to nested detail view) should be handled with **state-based navigation within the same panel** rather than stacking multiple modals, which is discouraged for accessibility.

**Primary recommendation:** Use native `<dialog>` with `showModal()` for built-in accessibility, CSS transitions via Tailwind for 300ms slide-up animation, and react-swipeable for swipe-down detection.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Native `<dialog>` | HTML5 | Modal container | Built-in focus trap, aria-modal, Escape handling, inert background |
| react-swipeable | 7.0.2 | Swipe gesture detection | Lightweight (no deps), hook-based, works with touch+mouse |
| Tailwind CSS 4 | 4.1.18 | Transitions & animations | Already in stack, motion-safe/motion-reduce variants |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| focus-trap-react | 10.x | Manual focus trapping | Only if NOT using `<dialog>` showModal() |
| lucide-react | 0.563.0 | Close icon (X button) | Already in stack |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Native `<dialog>` | react-modal | More control but must implement accessibility manually |
| react-swipeable | Custom touch handlers | 50 lines of code, but react-swipeable is battle-tested |
| Tailwind transitions | Framer Motion | More powerful but adds 20KB+ dependency |

**Installation:**
```bash
npm install react-swipeable
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── panel/              # NEW - Panel components
│   │   ├── SlidePanel.tsx       # Base panel with dialog + animations
│   │   ├── EmotionPanel.tsx     # Emotion detail content
│   │   ├── CulpabilitePanel.tsx # Special 2-level panel for guilt
│   │   └── PanelHeader.tsx      # Reusable header with close button
│   └── emotions/
│       ├── EmotionCard.tsx      # Existing - add onClick integration
│       └── ...
├── hooks/                  # NEW - Custom hooks
│   ├── usePanel.ts             # Panel open/close state management
│   └── usePrefersReducedMotion.ts  # A11Y motion preference
└── types/
    └── panel.ts            # Panel-related types
```

### Pattern 1: Native Dialog with CSS Transitions
**What:** Use `<dialog>` element with CSS-controlled slide animation
**When to use:** All modal panels in this project
**Example:**
```typescript
// Source: MDN Dialog Element + Tailwind CSS
interface SlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function SlidePanel({ isOpen, onClose, children }: SlidePanelProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal(); // Automatic focus trap + inert background
    } else {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose} // Handles Escape key
      onClick={(e) => {
        // Close on backdrop click
        if (e.target === e.currentTarget) onClose();
      }}
      className={`
        fixed inset-0 m-0 max-h-full max-w-full
        bg-transparent backdrop:bg-black/50
        ${prefersReducedMotion ? '' : 'transition-transform duration-300'}
      `}
    >
      <div className={`
        fixed bottom-0 left-0 right-0
        bg-bg-secondary rounded-t-2xl
        max-h-[85vh] overflow-y-auto
        ${isOpen ? 'translate-y-0' : 'translate-y-full'}
        ${prefersReducedMotion ? '' : 'transition-transform duration-300 ease-out'}
      `}>
        {children}
      </div>
    </dialog>
  );
}
```

### Pattern 2: Swipe-to-Close Integration
**What:** Add swipe down gesture to close panel
**When to use:** All bottom sheet panels for mobile UX
**Example:**
```typescript
// Source: react-swipeable documentation
import { useSwipeable } from 'react-swipeable';

function SwipeablePanel({ onClose, children }) {
  const [dragOffset, setDragOffset] = useState(0);

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      // Only track downward swipes
      if (eventData.dir === 'Down') {
        setDragOffset(Math.max(0, eventData.deltaY));
      }
    },
    onSwipedDown: (eventData) => {
      // Close if swiped more than 100px or velocity > 0.5
      if (eventData.deltaY > 100 || eventData.velocity > 0.5) {
        onClose();
      }
      setDragOffset(0);
    },
    onTouchEndOrOnMouseUp: () => setDragOffset(0),
    trackMouse: false, // Touch only for swipe
    delta: 10, // Minimum distance before swipe detected
  });

  return (
    <div
      {...handlers}
      style={{ transform: `translateY(${dragOffset}px)` }}
    >
      {children}
    </div>
  );
}
```

### Pattern 3: Culpabilite Two-Level Navigation
**What:** State-based navigation within single panel for guilt sub-types
**When to use:** Culpabilite emotion only (4 sub-cards -> detail view)
**Example:**
```typescript
// Source: Project-specific pattern
type CulpabiliteView = 'selection' | 'detail';

function CulpabilitePanel({ emotion, onClose }) {
  const [view, setView] = useState<CulpabiliteView>('selection');
  const [selectedSubType, setSelectedSubType] = useState<CulpabiliteSubType | null>(null);

  const handleBack = () => {
    setView('selection');
    setSelectedSubType(null);
  };

  return (
    <SlidePanel isOpen onClose={onClose}>
      {view === 'selection' ? (
        <>
          <PanelHeader title="Culpabilite" onClose={onClose} />
          <div className="grid grid-cols-2 gap-4 p-4">
            {emotion.subTypes.map((subType) => (
              <button
                key={subType.id}
                onClick={() => {
                  setSelectedSubType(subType);
                  setView('detail');
                }}
                className="p-4 bg-taupe rounded-lg text-left"
              >
                <h3>{subType.name}</h3>
                <p>{subType.keywords.join(' / ')}</p>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <PanelHeader
            title={selectedSubType?.name}
            onClose={onClose}
            onBack={handleBack} // Show back arrow instead of just X
          />
          <EmotionDetail emotion={selectedSubType} />
        </>
      )}
    </SlidePanel>
  );
}
```

### Pattern 4: Reduced Motion Hook
**What:** React hook to detect user's motion preference
**When to use:** All animations in the app
**Example:**
```typescript
// Source: Josh W. Comeau - Accessible Animations in React
const QUERY = '(prefers-reduced-motion: no-preference)';

function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY);
    setPrefersReducedMotion(!mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(!event.matches);
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return prefersReducedMotion;
}
```

### Anti-Patterns to Avoid
- **Stacking multiple dialogs:** Never open a second `<dialog>` on top of another. Use state-based navigation within a single panel instead.
- **Custom focus trapping with `<dialog>`:** The `showModal()` method already traps focus. Adding focus-trap-react causes conflicts.
- **Animations without motion preference check:** Always respect `prefers-reduced-motion` - either skip animations or reduce to instant transitions.
- **tabindex on dialog element:** Never add `tabindex` to `<dialog>` - it's not interactive, focus should go to content inside.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Focus trapping | Custom Tab key handler | `<dialog>` with `showModal()` | Native handles Tab cycling, inert background, edge cases |
| Swipe detection | Touch event math | `react-swipeable` | Handles velocity, direction, delta thresholds, mouse fallback |
| Motion preference | Manual media query check | `usePrefersReducedMotion` hook | Reactive updates, SSR-safe default |
| Backdrop click | Event target checks | `<dialog>` onClick on element | Native `<dialog>` has clear target distinction |
| Escape key handling | keydown listener | `<dialog>` onClose event | Native modal Escape handling |

**Key insight:** The native `<dialog>` element eliminates 80% of accessibility concerns that required manual implementation before 2023. Using it with `showModal()` gives you focus trap, background inertness, Escape key, and ARIA attributes for free.

## Common Pitfalls

### Pitfall 1: Dialog Animation Timing
**What goes wrong:** Panel appears/disappears instantly because CSS transitions don't work with `display: none`
**Why it happens:** `<dialog>` toggles `display` property which can't be animated by default
**How to avoid:** Use Tailwind CSS 4's `transition-discrete` or animate a wrapper element inside the dialog, not the dialog itself
**Warning signs:** Animation works on open but not close, or vice versa

### Pitfall 2: Scroll Lock Body Leak
**What goes wrong:** Background page can still scroll while panel is open
**Why it happens:** `showModal()` makes content inert but doesn't prevent scroll
**How to avoid:** Add `overflow: hidden` to `<body>` when panel opens, restore on close
**Warning signs:** Two scrollbars visible, or background scrolling on mobile

```typescript
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
  return () => { document.body.style.overflow = ''; };
}, [isOpen]);
```

### Pitfall 3: Swipe Conflicts with Scroll
**What goes wrong:** Swiping down to close triggers while user is trying to scroll content
**Why it happens:** Both gestures start with vertical touch movement
**How to avoid:** Only allow swipe-to-close when content is scrolled to top; use a drag handle zone at top of panel
**Warning signs:** Users accidentally close panel when scrolling

### Pitfall 4: Focus Not Returning After Close
**What goes wrong:** Focus goes to body/nowhere after panel closes
**Why it happens:** `<dialog>` only auto-returns focus if closed via Escape or close method
**How to avoid:** Store trigger element ref and manually return focus in onClose handler
**Warning signs:** Keyboard users lose their place after closing modal

```typescript
const triggerRef = useRef<HTMLButtonElement>(null);

const openPanel = () => {
  triggerRef.current = document.activeElement as HTMLButtonElement;
  setIsOpen(true);
};

const closePanel = () => {
  setIsOpen(false);
  // Return focus after dialog close animation
  setTimeout(() => triggerRef.current?.focus(), 300);
};
```

### Pitfall 5: Culpabilite Back Button Loses Context
**What goes wrong:** Pressing back in Culpabilite detail view closes entire panel instead of going to sub-card selection
**Why it happens:** State management doesn't differentiate between "close panel" and "go back"
**How to avoid:** Use distinct `onClose` and `onBack` handlers; PanelHeader renders back arrow vs X based on navigation depth
**Warning signs:** Users have to re-open panel to explore other guilt sub-types

## Code Examples

Verified patterns from official sources:

### Panel Header with Close and Back Buttons
```typescript
// Source: Project pattern, A11Y best practices
interface PanelHeaderProps {
  title: string;
  onClose: () => void;
  onBack?: () => void;
  color?: string;
}

function PanelHeader({ title, onClose, onBack, color = 'bg-bg-secondary' }: PanelHeaderProps) {
  return (
    <header className={`sticky top-0 ${color} px-4 py-3 flex items-center gap-3 border-b border-white/10`}>
      {onBack && (
        <button
          onClick={onBack}
          aria-label="Retour"
          className="p-2 -ml-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          <ChevronLeft size={24} />
        </button>
      )}
      <h2 className="flex-1 text-lg font-semibold">{title}</h2>
      <button
        onClick={onClose}
        aria-label="Fermer"
        className="p-2 -mr-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
        autoFocus={!onBack} // Focus close button if no back button
      >
        <X size={24} />
      </button>
    </header>
  );
}
```

### Emotion Detail Content Layout
```typescript
// Source: Project data structure + design system
function EmotionDetail({ emotion }: { emotion: Emotion }) {
  return (
    <div className="p-4 space-y-6">
      {/* Variations */}
      <section>
        <h3 className="text-sm font-medium text-text-secondary mb-2">Variations</h3>
        <div className="flex flex-wrap gap-2">
          {emotion.variations.map((v) => (
            <span key={v} className="px-3 py-1 bg-white/10 rounded-full text-sm">{v}</span>
          ))}
        </div>
      </section>

      {/* Triggers */}
      <section>
        <h3 className="text-sm font-medium text-text-secondary mb-2">Declencheurs</h3>
        <ul className="list-disc list-inside space-y-1">
          {emotion.triggers.map((t) => (
            <li key={t} className="text-text-primary">{t}</li>
          ))}
        </ul>
      </section>

      {/* Defensive Reactions */}
      <section>
        <h3 className="text-sm font-medium text-text-secondary mb-2">Reactions defensives</h3>
        <ul className="list-disc list-inside space-y-1">
          {emotion.defensiveReactions.map((r) => (
            <li key={r} className="text-text-primary">{r}</li>
          ))}
        </ul>
      </section>

      {/* Needs */}
      <section>
        <h3 className="text-sm font-medium text-text-secondary mb-2">Besoins</h3>
        <ul className="list-disc list-inside space-y-1">
          {emotion.needs.map((n) => (
            <li key={n} className="text-text-primary">{n}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
```

### Complete Panel Integration Example
```typescript
// Source: Combining all patterns
function UnpleasantEmotionsPage() {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | CulpabiliteEmotion | null>(null);

  return (
    <div>
      {/* Grid of cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {emotions.map((emotion) => (
          <EmotionCard
            key={emotion.id}
            {...emotion}
            onClick={() => setSelectedEmotion(emotion)}
          />
        ))}
      </div>

      {/* Panel - renders based on selection */}
      {selectedEmotion && (
        isCulpabilite(selectedEmotion) ? (
          <CulpabilitePanel
            emotion={selectedEmotion}
            onClose={() => setSelectedEmotion(null)}
          />
        ) : (
          <EmotionPanel
            emotion={selectedEmotion}
            onClose={() => setSelectedEmotion(null)}
          />
        )
      )}
    </div>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Custom focus trap with tabindex | `<dialog>` showModal() | 2022+ (broad browser support) | No need for focus-trap-react in most cases |
| JS animation libraries | CSS transitions + motion variants | Tailwind CSS 4 (2024) | Simpler, smaller bundle, native motion preference |
| Custom ARIA attributes | Native `<dialog>` semantics | 2022+ | aria-modal="true" automatic |
| Overlay div with z-index | `<dialog>` ::backdrop | 2022+ | Native backdrop, no z-index management |

**Deprecated/outdated:**
- `react-spring-bottom-sheet`: Last updated 2022, uses deprecated APIs
- Manual `aria-hidden` toggling: `<dialog>` with `showModal()` handles inertness automatically
- `tabindex="-1"` on modal container: Native `<dialog>` manages focus correctly

## Open Questions

Things that couldn't be fully resolved:

1. **Animation on dialog close**
   - What we know: CSS `transition-discrete` in Tailwind 4 may help with display property transitions
   - What's unclear: Exact implementation for slide-out animation timing before `display: none`
   - Recommendation: Use setTimeout to delay `dialog.close()` until after CSS transition completes, or animate inner wrapper only

2. **Dialog backdrop styling in Tailwind 4**
   - What we know: `::backdrop` pseudo-element is supported, Tailwind has backdrop: modifier
   - What's unclear: Whether `backdrop:bg-black/50` works directly or needs custom CSS
   - Recommendation: Test with `backdrop:bg-black/50`, fall back to custom CSS if needed

3. **Swipe threshold optimization**
   - What we know: react-swipeable uses delta (px) and velocity for triggers
   - What's unclear: Optimal values for this specific bottom sheet use case
   - Recommendation: Start with delta: 100px and velocity: 0.5, adjust based on testing

## Sources

### Primary (HIGH confidence)
- [MDN - HTML dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) - showModal(), focus management, accessibility
- [Tailwind CSS - transition-property](https://tailwindcss.com/docs/transition-property) - motion-safe, motion-reduce variants
- [Josh W. Comeau - Accessible Animations in React](https://www.joshwcomeau.com/react/prefers-reduced-motion/) - usePrefersReducedMotion hook
- [W3C WAI - Modal Dialog Pattern](https://www.w3.org/WAI/WCAG21/Techniques/css/C39) - WCAG 2.3.3 compliance

### Secondary (MEDIUM confidence)
- [GitHub - react-swipeable](https://github.com/FormidableLabs/react-swipeable) - v7.0.2, useSwipeable hook API
- [GitHub - focus-trap-react](https://github.com/focus-trap/focus-trap-react) - When needed beyond native dialog
- [Croct Blog - Best React modal dialog libraries 2026](https://blog.croct.com/post/best-react-modal-dialog-libraries) - Library comparison
- [UXPin - Accessible Modals with Focus Traps](https://www.uxpin.com/studio/blog/how-to-build-accessible-modals-with-focus-traps/) - A11Y guidelines

### Tertiary (LOW confidence)
- [GitHub - react-modal-sheet](https://github.com/Temzasse/react-modal-sheet) - Alternative approach (not recommended for this project)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Native `<dialog>` is well-documented, react-swipeable is established
- Architecture: HIGH - Patterns verified against official docs and real implementations
- Pitfalls: MEDIUM - Some based on common knowledge, not all tested in this specific stack

**Research date:** 2026-01-29
**Valid until:** 2026-03-01 (30 days - stable domain)
