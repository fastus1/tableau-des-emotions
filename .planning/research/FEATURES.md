# Features Research

## Executive Summary

Research into interactive card-based educational apps reveals clear patterns for what users expect (table stakes), what creates delight (differentiators), and what actively harms the experience (anti-features). For an emotion exploration app embedded in iframe with dark theme, the priority is reducing cognitive load while enabling meaningful exploration.

---

## Table Stakes (Must Have)

These features are non-negotiable. Users expect them based on prior experience with similar apps.

| Feature | Why Expected |
|---------|--------------|
| **Tap/click to expand cards** | Universal pattern for card UI; anything else causes confusion |
| **Clear visual feedback on interaction** | Users need confirmation their tap registered; micro-interactions build trust |
| **Swipe navigation for carousel** | Touch users instinctively swipe; carousel without swipe feels broken on mobile |
| **Progress indicators on carousel** | Users need to know where they are in a sequence (dots, numbers, or progress bar) |
| **Back/close gesture consistency** | Tap outside, swipe down, or X button all expected for dismissing overlays |
| **Touch targets minimum 44x44px** | Apple HIG requirement; smaller targets cause frustration especially on mobile |
| **Readable text contrast (4.5:1 minimum)** | WCAG AA requirement; essential for dark theme readability |
| **Responsive card grid** | Cards must reflow gracefully from single column (mobile) to multi-column (desktop) |
| **Immediate content visibility** | No loading spinners for static content; users expect instant response |
| **Keyboard navigation** | Tab through cards, Enter to select, Escape to close; accessibility fundamental |

---

## Differentiators (Nice to Have)

Features that elevate the experience beyond competitors without adding unnecessary complexity.

| Feature | Value Add |
|---------|-----------|
| **Smooth slide-up animation for detail panels** | Creates sense of depth and relationship; bottom sheets have 25-30% higher engagement than traditional modals |
| **Subtle hover states on desktop** | Indicates interactivity before click; reduces uncertainty |
| **Haptic-like visual feedback** | Micro-bounce on tap confirms action; delightful without being distracting |
| **Color-coded emotion categories** | Instant visual recognition; reduces cognitive load for returning users |
| **Sequential reveal in carousel** | Each step feels earned; supports learning progression psychology |
| **Semantic grouping (pleasant/unpleasant)** | Matches mental model; users can navigate by emotional valence |
| **Expandable detail levels** | Show summary first, let curious users dig deeper; respects varied learning styles |
| **Breadcrumb-like context preservation** | User always knows where they are (e.g., "Colere > Details") |
| **Gentle transitions between states** | Motion serves as connection between screens; reduces cognitive load |
| **Focus trap in modals/overlays** | Keyboard users stay contained; improves accessibility beyond minimum |

---

## Anti-Features (Deliberately Exclude)

Features that seem helpful but would actively harm this specific context.

| Feature | Why Harmful for This Context |
|---------|------------------------------|
| **Auto-advancing carousel** | Emotional regulation content requires personal pacing; auto-scroll creates anxiety and reduces comprehension. Research shows users prefer controlling pace for sensitive content |
| **Gamification (points, streaks, badges)** | Inappropriate for therapeutic content; trivializes emotional exploration. Duolingo-style guilt ("Your streak will end!") is a dark pattern that conflicts with emotional wellbeing goals |
| **Social sharing buttons** | Emotions are private; sharing features create implicit pressure. Mental health apps explicitly avoid social features for privacy reasons |
| **Search/filter** | This is an exploration app, not a reference tool. Search implies "find what you already know" vs. "discover what you feel" |
| **Favorites/bookmarking** | Adds complexity without value; content is small enough to browse. Personalization features require user accounts |
| **Notifications/reminders** | Iframe context makes this impossible and inappropriate; creates FOMO dark pattern |
| **Progress tracking/history** | No backend, but also philosophically wrong; emotions aren't achievements to complete |
| **Confetti/celebration animations** | Trivializes emotional work; inappropriate for content about anger, guilt, sadness |
| **Tooltips on mobile** | Hover-dependent features don't translate to touch; creates inconsistent experience |
| **Complex nested navigation** | Pogo-stick navigation (down-up-down) causes disorientation. Maximum 2 levels deep (grid > detail) |
| **Light/dark mode toggle** | Out of scope per requirements; Circle.so is dark-only, toggle adds complexity without benefit |
| **Onboarding tutorial** | App should be self-explanatory; forced tutorials frustrate returning users |

---

## Interaction Patterns

### Card Interaction Patterns

| Pattern | When to Use |
|---------|-------------|
| **Tap to expand (not flip)** | Primary interaction for emotion cards; flip animation implies "reveal hidden info" which works for flashcards but not exploratory content |
| **Full card clickable** | Larger touch zone substantially improves usability (Fitts's Law); don't require precise button taps |
| **Visual press state (scale down slightly)** | Immediate feedback on touch; confirms registration before animation completes |
| **Color persistence in expanded view** | Maintain card's color identity in detail view; reinforces visual memory association |

### Bottom Sheet Patterns

| Pattern | When to Use |
|---------|-------------|
| **Modal with scrim** | For emotion detail views; blocks background to focus attention |
| **Swipe down to dismiss** | Natural gesture on mobile; feels like "putting away" |
| **Tap scrim to dismiss** | Alternative for users who don't discover swipe |
| **X button visible** | Explicit close affordance; some users prefer buttons to gestures |
| **Drag handle indicator** | Visual hint that swiping is possible; 48px touch target |
| **Initial height max 50% screen** | Don't overwhelm; reveal more content as user engages |
| **Expandable to near-full** | For detailed content like triggers/reactions lists |

### Carousel Patterns

| Pattern | When to Use |
|---------|-------------|
| **Swipe left/right** | Primary navigation for 5-step process |
| **Arrow buttons at edges** | Desktop fallback; not all users realize swipe works with trackpad |
| **Dot indicators (not just numbers)** | Visual progress at a glance; clickable for random access |
| **Snap to card** | Prevent half-visible cards; each step should be fully visible |
| **Peek next card slightly** | Visual hint that more content exists to the right |
| **First slide carries weight** | Only 1% of users interact beyond first slide; make step 1 compelling |

### Navigation Patterns for Iframe Context

| Pattern | When to Use |
|---------|-------------|
| **No browser back button reliance** | Iframe context means browser back exits the embed entirely |
| **In-app back arrows** | Provide explicit return path within the app UI |
| **Escape key closes overlays** | Keyboard users expect this; implement focus management |
| **Preserve scroll position** | When returning from detail view, user should be where they left off |
| **Avoid top navigation** | iframe embedding means horizontal space is precious; use sections/scrolling |

### Guilt Card Special Pattern

| Pattern | When to Use |
|---------|-------------|
| **Two-level navigation** | First level: 4 sub-cards (saine, malsaine 1-3); second level: details |
| **Visual differentiation** | Sub-cards should look distinct from main emotion cards (smaller, grouped) |
| **Clear back path** | User must always know how to return to main guilt card |
| **Consistent detail format** | Sub-card details use same bottom sheet pattern as main emotions |

---

## Complexity Notes

Implementation complexity assessment for planning purposes.

| Feature | Complexity | Notes |
|---------|------------|-------|
| **Responsive card grid** | Low | CSS Grid with `auto-fit` and `minmax()` handles this elegantly |
| **Bottom sheet animation** | Medium | CSS transforms work, but need to handle height transitions, swipe gestures, and accessibility |
| **Swipeable carousel** | Medium | Consider using tiny library or CSS scroll-snap; custom gesture handling is error-prone |
| **Keyboard navigation** | Medium | Requires focus management, visible focus states, and logical tab order |
| **Dark theme color contrast** | Medium | Need to test all colors against WCAG; avoid pure black (#000), prefer #121212 |
| **postMessage iframe height** | Medium | Requires ResizeObserver and coordination with parent; may not work in all Circle.so contexts |
| **Guilt card nested navigation** | Medium-High | State management for two-level deep navigation while keeping UI simple |
| **Touch gesture detection** | Medium | Distinguish tap vs. swipe; handle edge cases like scroll interference |
| **Animation performance** | Low-Medium | Use CSS transforms and opacity only; avoid layout thrashing |
| **Screen reader compatibility** | Medium | ARIA labels, live regions for dynamic content, focus management |

---

## Research Sources

### Card UI & Educational Design
- [Card UI Design Best Practices - Eleken](https://www.eleken.co/blog-posts/card-ui-examples-and-best-practices-for-product-owners)
- [Card Design UI - UXPin](https://www.uxpin.com/studio/blog/card-design-ui/)
- [Modern Flashcard App UI UX Design 2025 - Medium](https://medium.com/@prajapatisuketu/modern-flashcard-app-ui-ux-design-2025-4545294a17b4)

### Mental Health & Emotion Apps
- [Skill-Based Apps for Developing Emotional Awareness - Psychology Today](https://www.psychologytoday.com/us/blog/two-takes-on-depression/202503/skill-based-apps-for-developing-emotional-awareness)
- [Best Practices in Mental Health App Design - Biz4Group](https://www.biz4group.com/blog/best-practices-in-mental-health-design)
- [Best Emotion Trackers 2025 - Sphera](https://sphera-app.com/blog/best-emotion-trackers-2025-compare-the-top-apps-for-emotional-awareness-and-balance/)

### Micro-interactions
- [Micro-interaction Examples - Userpilot](https://userpilot.com/blog/micro-interaction-examples/)
- [The Role of Micro-interactions in Modern UX - IxDF](https://www.interaction-design.org/literature/article/micro-interactions-ux)
- [Microinteractions in UI Design - UX Design Institute](https://www.uxdesigninstitute.com/blog/microinteractions-in-ui-design/)

### Bottom Sheets & Mobile Patterns
- [Bottom Sheets: Definition and UX Guidelines - NN/g](https://www.nngroup.com/articles/bottom-sheet/)
- [Bottom Sheet UI Design - Mobbin](https://mobbin.com/glossary/bottom-sheet)
- [Bottom Sheets Material Design 3](https://m3.material.io/components/bottom-sheets/guidelines)

### Carousel & Swipe Interactions
- [Carousels on Mobile Devices - NN/g](https://www.nngroup.com/articles/mobile-carousels/)
- [Mobile Carousel Best Practices - Slider Revolution](https://www.sliderrevolution.com/design/mobile-carousel/)
- [The Hidden Logic of Carousel Design - Medium](https://medium.com/@evolvebypaperclip/from-rotation-to-swipe-the-hidden-logic-of-carousel-design-be2eace326ff)

### Cognitive Load & Information Hierarchy
- [Cognitive Load - Laws of UX](https://lawsofux.com/cognitive-load/)
- [Minimize Cognitive Load to Maximize Usability - NN/g](https://www.nngroup.com/articles/minimize-cognitive-load/)
- [Reducing Cognitive Overload - Smashing Magazine](https://www.smashingmagazine.com/2016/09/reducing-cognitive-overload-for-a-better-user-experience/)

### Dark Theme & Accessibility
- [Inclusive Dark Mode - Smashing Magazine](https://www.smashingmagazine.com/2025/04/inclusive-dark-mode-designing-accessible-dark-themes/)
- [Dark Mode Best Practices for Accessibility - DubBot](https://dubbot.com/dubblog/2023/dark-mode-a11y.html)
- [Designing Inclusive Dark Modes - Raw.Studio](https://raw.studio/blog/designing-inclusive-dark-modes-enhancing-accessibility-and-user-experience/)

### Iframe & Embedded Apps
- [The Ultimate Guide to Iframes - LogRocket](https://blog.logrocket.com/ultimate-guide-iframes/)
- [Build Accessible Iframes - 216digital](https://216digital.com/build-accessible-iframes-that-work-for-everyone/)

### Anti-Patterns & Dark Patterns
- [Deceptive Patterns in UX - NN/g](https://www.nngroup.com/articles/deceptive-patterns/)
- [Avoiding UX Anti-Patterns - Door3](https://www.door3.com/blog/avoiding-anti-patterns-with-ux-design)

---

*Last updated: 2026-01-29*
