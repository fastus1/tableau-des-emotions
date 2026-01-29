# Architecture Research

## Component Hierarchy

```
App
├── LoadingScreen                    # Initial splash (logo + spinner)
├── Layout                           # Container with postMessage height sync
│   ├── Header                       # Logo, title, credit link
│   ├── HomePage                     # Main entry point
│   │   ├── Introduction             # Short intro text
│   │   └── SectionCards             # 3 entry cards (unpleasant, pleasant, 5 steps)
│   │       └── SectionCard          # Individual clickable entry card
│   ├── EmotionSection               # Grid view for emotions
│   │   ├── BackButton               # Return to home
│   │   ├── SectionIntro             # Section-specific intro text
│   │   └── CardGrid                 # Responsive grid of emotion cards
│   │       └── EmotionCard          # Individual emotion card (closed state)
│   ├── StepsSection                 # 5-step carousel
│   │   ├── BackButton
│   │   ├── StepsCarousel            # Horizontal swipe/arrow navigation
│   │   │   └── StepCard             # Individual step card
│   │   └── CarouselIndicator        # "2/5" or dots
│   └── SlideInPanel                 # Bottom sheet overlay (shared component)
│       ├── PanelOverlay             # Dark backdrop, click to close
│       ├── PanelHeader              # Title + close button
│       ├── PanelContent             # Scrollable content area
│       │   ├── EmotionDetail        # Standard emotion detail (4 or 3 sections)
│       │   └── GuiltSubCards        # Special case: 4 sub-cards for Culpabilite
│       │       └── GuiltSubCard     # Clickable sub-card
│       └── NestedSlideInPanel       # Second level for guilt sub-card details
```

## Data Structure

### emotions-desagreables.json

```json
{
  "sectionTitle": "Quand ca ne va pas",
  "sectionIntro": "Les emotions desagreables sont des signaux...",
  "emotions": [
    {
      "id": "colere",
      "name": "Colere",
      "color": "red",
      "colorHex": "#db0e00",
      "icon": "flame",
      "keywords": ["Frustre", "Irrite", "Fache"],
      "variations": ["Agace", "Contrarie", "Enrage", "Fache", "..."],
      "triggers": ["Non-respect des limites", "Accusation", "..."],
      "defensiveReactions": ["Deverser sa charge emotive", "..."],
      "needs": ["Respect de ses limites", "Equite", "..."]
    },
    {
      "id": "culpabilite",
      "name": "Culpabilite",
      "color": "taupe",
      "colorHex": "#7A6F5D",
      "icon": "scale",
      "keywords": ["Coupable", "Fautif", "Mal a l'aise"],
      "isSpecialCase": true,
      "intro": "La culpabilite peut etre saine ou malsaine...",
      "subTypes": [
        {
          "id": "culpabilite-saine",
          "name": "Se sentir coupable",
          "subtitle": "Culpabilite saine",
          "colorShade": "#8A7F6D",
          "variations": ["Mal a l'aise", "Pas correct", "Fautif"],
          "triggers": ["Action contraire a ses valeurs", "..."],
          "defensiveReactions": ["Se devaloriser", "..."],
          "needs": ["Reconnaitre son erreur", "..."]
        },
        {
          "id": "culpabilite-malsaine-soi",
          "name": "Culpabilisation de soi",
          "subtitle": "Culpabilite malsaine",
          "colorShade": "#6A5F4D"
        }
      ]
    }
  ]
}
```

### emotions-agreables.json

```json
{
  "sectionTitle": "Quand ca va bien",
  "sectionIntro": "Ressentir et savourer les emotions agreables...",
  "emotions": [
    {
      "id": "amour",
      "name": "Amour",
      "color": "magenta",
      "colorHex": "#a82360",
      "icon": "heart",
      "keywords": ["Affectueux", "Connecte", "Passionne"],
      "variations": ["Amoureux", "Affectueux", "..."],
      "triggers": ["Acceptation de soi", "Intimite", "..."],
      "satisfiedNeeds": ["Connexion", "Appartenance", "..."]
    }
  ]
}
```

### cinq-etapes.json

```json
{
  "sectionTitle": "Les 5 etapes",
  "sectionIntro": "La regulation emotionnelle peut etre difficile...",
  "steps": [
    {
      "id": 1,
      "title": "S'arreter",
      "question": "C'est plus fort que moi, je vois bien que je reagis.",
      "actions": [
        "Faire le choix de s'arreter et de laisser aller le declencheur exterieur.",
        "Trouver un endroit pour se calmer.",
        "Prendre quelques respirations profondes.",
        "..."
      ]
    }
  ]
}
```

## State Management

| State | Scope | Solution | Rationale |
|-------|-------|----------|-----------|
| Current view (home/section) | App-wide | `useState` in App or Context | Simple navigation, no deep nesting |
| Active section (unpleasant/pleasant/steps) | App-wide | `useState` in App | Determines which section to render |
| Panel open/closed | Local | `useState` in EmotionSection | Only one panel open at a time |
| Active emotion (for panel) | Local | `useState` in EmotionSection | Passed to SlideInPanel |
| Nested panel (guilt sub-detail) | Local | `useState` in SlideInPanel | Only applies to Culpabilite |
| Carousel current step | Local | `useState` in StepsSection | Simple 1-5 index |
| App height (for iframe) | Global | `useEffect` + ResizeObserver | postMessage to parent |

**Recommendation:** Use React's built-in `useState` and prop drilling. The app is small enough that Context API or state libraries (Redux, Zustand) add unnecessary complexity. A single `useNavigation` custom hook can encapsulate view state if prop drilling becomes cumbersome.

```tsx
// Lightweight navigation state
const [view, setView] = useState<'home' | 'unpleasant' | 'pleasant' | 'steps'>('home');
const [activeEmotion, setActiveEmotion] = useState<string | null>(null);
const [activeSubType, setActiveSubType] = useState<string | null>(null); // for guilt
```

## Routing Decision

**Recommendation: No routing (hash or otherwise)**

**Rationale:**
1. **iframe context** - Circle.so controls the URL; internal routing may conflict or confuse
2. **Single-page experience** - Users expect smooth transitions, not page reloads
3. **Simplicity** - The app has only 4 views (home, 2 emotion sections, steps) and panels are overlays, not routes
4. **Deep linking unnecessary** - Users won't share links to specific emotions; they explore linearly
5. **Back button** - Provide visual back button; browser back in iframe is problematic

**Implementation:**
- Use state-based navigation (`view` state variable)
- Animate transitions between views (slide left/right)
- Handle Escape key to close panels
- Back button component returns to previous view

**If routing needed later:** Use hash-based routing (`#/pleasant/amour`) with a lightweight router like `wouter` to avoid iframe conflicts.

## Build Order

| Phase | Component/Feature | Dependencies | Notes |
|-------|-------------------|--------------|-------|
| **1** | Project setup | None | Vite + React + Tailwind + CSS variables |
| **2** | Design tokens & base styles | Phase 1 | CSS variables, typography, colors |
| **3** | JSON data files | Content doc | Structure emotions data |
| **4** | Layout + postMessage height | Phase 1 | iframe integration critical path |
| **5** | HomePage + SectionCards | Phase 2 | Entry point UI |
| **6** | EmotionCard (closed state) | Phase 2, 3 | Reusable across sections |
| **7** | CardGrid + EmotionSection | Phase 6 | Grid layout, responsive |
| **8** | SlideInPanel (basic) | Phase 2 | Animation, overlay, close behavior |
| **9** | EmotionDetail content | Phase 3, 8 | Render emotion data in panel |
| **10** | Guilt special case | Phase 8, 9 | Nested panel, sub-cards |
| **11** | StepsCarousel | Phase 2 | Swipe, arrows, indicators |
| **12** | Accessibility pass | All | ARIA, focus management, keyboard nav |
| **13** | Loading screen | Phase 2 | Polish |
| **14** | Mobile testing | All | Touch interactions, responsive |

**Critical path:** 1 -> 2 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9

## File Structure

```
src/
├── main.tsx                          # React entry point
├── App.tsx                           # Root component, view state
├── index.css                         # Global styles, CSS variables
│
├── components/
│   ├── layout/
│   │   ├── Layout.tsx                # Main container, postMessage hook
│   │   ├── Header.tsx                # Logo, title
│   │   └── BackButton.tsx            # Reusable back navigation
│   │
│   ├── home/
│   │   ├── HomePage.tsx              # Home view container
│   │   ├── Introduction.tsx          # Intro text block
│   │   └── SectionCard.tsx           # Entry card to each section
│   │
│   ├── emotions/
│   │   ├── EmotionSection.tsx        # Section container (unpleasant/pleasant)
│   │   ├── CardGrid.tsx              # Responsive grid wrapper
│   │   ├── EmotionCard.tsx           # Closed card (color, icon, keywords)
│   │   └── EmotionDetail.tsx         # Panel content (variations, triggers, etc.)
│   │
│   ├── guilt/
│   │   ├── GuiltSubCards.tsx         # 4 sub-card layout
│   │   └── GuiltSubCard.tsx          # Individual guilt type card
│   │
│   ├── steps/
│   │   ├── StepsSection.tsx          # Steps view container
│   │   ├── StepsCarousel.tsx         # Carousel logic + UI
│   │   ├── StepCard.tsx              # Individual step card
│   │   └── CarouselIndicator.tsx     # Progress dots/numbers
│   │
│   ├── panel/
│   │   ├── SlideInPanel.tsx          # Bottom sheet container
│   │   ├── PanelOverlay.tsx          # Dark backdrop
│   │   └── PanelHeader.tsx           # Title + close button
│   │
│   └── ui/
│       ├── LoadingScreen.tsx         # Initial loading state
│       └── Icon.tsx                  # Lucide icon wrapper
│
├── data/
│   ├── emotions-desagreables.json    # Unpleasant emotions content
│   ├── emotions-agreables.json       # Pleasant emotions content
│   └── cinq-etapes.json              # 5 steps content
│
├── hooks/
│   ├── useIframeHeight.ts            # postMessage height sync
│   └── useSwipe.ts                   # Touch swipe detection (carousel)
│
├── types/
│   └── emotions.ts                   # TypeScript interfaces for data
│
└── utils/
    └── colors.ts                     # Color utilities (contrast, shades)
```

## Key Implementation Details

### iframe Height Sync

```tsx
// hooks/useIframeHeight.ts
export function useIframeHeight() {
  useEffect(() => {
    const sendHeight = () => {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage({ type: 'IFRAME_HEIGHT', height }, '*');
    };

    const observer = new ResizeObserver(sendHeight);
    observer.observe(document.body);

    window.addEventListener('load', sendHeight);
    return () => observer.disconnect();
  }, []);
}
```

### Panel Animation

```tsx
// Use CSS transitions with data attributes or className toggle
// Panel slides up from bottom: transform: translateY(100%) -> translateY(0)
// Overlay fades in: opacity: 0 -> 1
// Duration: 300ms ease-out
```

### Responsive Breakpoints (Tailwind)

```tsx
// CardGrid responsive classes
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {emotions.map(e => <EmotionCard key={e.id} emotion={e} />)}
</div>
```

### Accessibility Considerations

- `SlideInPanel`: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- Focus trap when panel is open
- `Escape` key closes panel
- `EmotionCard`: `role="button"`, `tabIndex={0}`, `onKeyDown` for Enter/Space
- Visible focus rings (`:focus-visible`)
- Color contrast verified for all emotion colors on text

## Questions to Resolve

1. **Swipe library or custom?** - For carousel, consider `use-gesture` library vs custom touch handlers
2. **Animation library?** - CSS transitions sufficient, or use Framer Motion for panel animations?
3. **Icon mapping** - Which Lucide icons map to each emotion? (flame for anger, heart for love, etc.)
4. **Fallback height** - If postMessage fails, what fixed height? (900px suggested)
5. **Fonts loading** - Include Inter and Montserrat via Google Fonts or self-host?
