# Pitfalls Research

Research into common mistakes and critical issues for interactive card-based emotion exploration web apps embedded in iframes.

---

## Critical (Will Break the App)

### 1. Iframe Height Calculation Failures

- **What goes wrong**: The iframe height doesn't adjust when content changes (panels sliding in, cards expanding), causing content to be cut off or creating excessive whitespace. postMessage height calculations fail silently, or parent page doesn't listen for messages.
- **Warning signs**: Content disappears at bottom of viewport, users can't scroll to see full content, double scrollbars appear, content jumps unexpectedly.
- **Prevention**:
  - Use ResizeObserver on the document body to detect all size changes
  - Send height updates on every animation frame during transitions
  - Include a fallback polling mechanism (every 500ms) in case ResizeObserver fails
  - Test with `window.parent.postMessage({ type: 'resize', height: document.body.scrollHeight }, '*')`
  - Add throttling (100-200ms) to avoid flooding the parent with messages
  - Account for slide-in panel heights BEFORE animation starts
- **Phase to address**: Architecture/Phase 1 - must be designed from the start

### 2. Touch Event Conflicts with Scroll

- **What goes wrong**: Carousel swipe gestures conflict with native browser scroll. Users try to swipe cards but page scrolls instead, or vice versa. Panels that slide up capture all touch events, making it impossible to scroll within them.
- **Warning signs**: Jerky scrolling, carousel doesn't respond to swipes, users accidentally navigate when trying to scroll, panel content unreachable.
- **Prevention**:
  - Use `touch-action: pan-y` on carousel to allow vertical scroll while capturing horizontal
  - Use `touch-action: pan-x` on vertical slide panels if horizontal swipe needed
  - Implement gesture detection with velocity threshold (not just distance)
  - Use `pointer-events` API instead of touch events for better cross-device support
  - Add intentional gesture zones (explicit drag handles)
  - Test with `passive: false` event listeners where `preventDefault()` is needed
- **Phase to address**: Phase 2 - Carousel/Panel implementation

### 3. Focus Trap Not Implemented for Panels

- **What goes wrong**: When a slide-in panel opens, keyboard users can Tab outside the panel into the hidden content behind it, or worse, into the parent iframe page. Screen readers announce content that's visually hidden.
- **Warning signs**: Tab key moves focus to invisible elements, screen reader reads full page when panel is open, Escape key doesn't close panel.
- **Prevention**:
  - Implement focus trap using `inert` attribute on background content
  - Set `aria-modal="true"` on panel container
  - Return focus to trigger element when panel closes
  - Add `role="dialog"` and proper `aria-labelledby`
  - Listen for Escape key to close panels
  - Use a focus-trap library like `focus-trap-react` or implement custom
- **Phase to address**: Phase 2 - Panel component, before any user testing

### 4. Iframe Sandbox Restrictions Breaking Features

- **What goes wrong**: Circle.so or other platforms use `sandbox` attribute on iframes, blocking scripts, forms, or navigation. Features silently fail. `allow-same-origin` missing breaks localStorage. `allow-scripts` missing breaks everything.
- **Warning signs**: JavaScript errors only in embedded context, localStorage throws errors, postMessage doesn't work, links don't open.
- **Prevention**:
  - Document required sandbox permissions: `allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox`
  - Test early in actual Circle.so environment
  - Implement graceful degradation if localStorage unavailable
  - Use `target="_blank"` with `rel="noopener"` for external links
  - Check `window.parent !== window` to detect iframe context
- **Phase to address**: Phase 0 - Validate before any development

### 5. Animation Jank on Mobile (Main Thread Blocking)

- **What goes wrong**: Slide animations use properties that trigger layout (top, left, height, width, margin) instead of compositor-only properties. 60fps drops to 15fps on mobile devices. Touch feels unresponsive.
- **Warning signs**: Animations stutter, device gets warm, CPU usage spikes, touch response delayed.
- **Prevention**:
  - ONLY use `transform` and `opacity` for animations
  - Use `will-change: transform` sparingly (only during animation)
  - Never animate `height` - use `transform: scaleY()` or `max-height` with `overflow: hidden`
  - Use CSS animations over JS where possible
  - Add `transform: translateZ(0)` to force GPU layer (use sparingly)
  - Test on low-end Android devices (not just latest iPhone)
- **Phase to address**: Phase 2 - Before implementing any animations

---

## Serious (Bad UX)

### 6. Carousel Swipe Feedback Missing

- **What goes wrong**: Users swipe but nothing happens until animation completes. No visual feedback during drag. Cards snap to position without easing. Users don't know there are more cards.
- **Warning signs**: Users tap instead of swipe, users don't discover additional cards, "nothing happened" complaints.
- **Prevention**:
  - Follow finger during drag (1:1 tracking)
  - Add peek of next/previous cards (10-20px visible)
  - Show pagination dots or progress indicator
  - Use spring physics for snap animation (not linear)
  - Add overscroll resistance at boundaries
  - Include subtle haptic feedback on card change (if available)
- **Phase to address**: Phase 2 - Carousel implementation

### 7. Dark Theme Contrast Failures

- **What goes wrong**: Text is unreadable (grey on dark grey), focus indicators invisible, links indistinguishable from text, disabled states look like enabled states, or vice versa.
- **Warning signs**: WCAG contrast checker failures, squinting to read, "where's the button?" questions.
- **Prevention**:
  - Minimum 4.5:1 contrast for normal text, 3:1 for large text (WCAG AA)
  - Test with browser's forced-colors mode
  - Don't rely on color alone - add icons, underlines, borders
  - Focus indicators: minimum 3:1 against adjacent colors, 2px outline
  - Use color palette tools (Coolors, Contrast Grid) to validate entire theme
  - Test with color blindness simulators
  - Define and test all states: default, hover, focus, active, disabled
- **Phase to address**: Phase 1 - Design system, validate before building components

### 8. Panel Z-Index Wars

- **What goes wrong**: Slide-in panels appear behind other elements, tooltips get hidden, nested panels stack incorrectly, backdrop doesn't cover everything.
- **Warning signs**: Elements peeking through panels, click on backdrop hits element behind it, panel controls hidden.
- **Prevention**:
  - Define z-index scale in design tokens: `base: 0, dropdown: 100, sticky: 200, overlay: 300, modal: 400, tooltip: 500`
  - Use CSS `isolation: isolate` to create stacking contexts
  - Panel backdrop must be sibling to panel (not parent)
  - Use Portal to render panels at document root
  - Never use arbitrary z-index values (no `z-index: 9999`)
- **Phase to address**: Phase 1 - Design system

### 9. Links Opening in Iframe Instead of Parent

- **What goes wrong**: External links open inside the tiny iframe, making the linked site unusable. Navigation links break the iframe experience. Back button doesn't work as expected.
- **Warning signs**: External sites squeezed into iframe, users "trapped" in iframe, navigation confusion.
- **Prevention**:
  - All external links: `target="_blank" rel="noopener noreferrer"`
  - Use `window.open()` for programmatic navigation
  - Or use postMessage to tell parent to navigate: `parent.postMessage({ type: 'navigate', url }, '*')`
  - Intercept all `<a>` clicks and handle appropriately
  - Consider link preview/confirmation for external navigation
- **Phase to address**: Phase 1 - Any component with links

### 10. Keyboard Navigation Broken

- **What goes wrong**: Carousel can't be navigated with arrow keys, cards can't be activated with Enter/Space, custom buttons not focusable, focus order illogical (jumps around).
- **Warning signs**: Tab skips elements, Enter key doesn't work, arrow keys scroll page instead of carousel.
- **Prevention**:
  - Carousel: `role="region" aria-label="Emotions carousel"`, cards are `role="group"`, navigation with arrow keys
  - Focusable cards: `tabindex="0"`, `role="button"` or actual buttons
  - Logical tab order: DOM order matches visual order
  - Visible focus indicators (never `outline: none` without replacement)
  - Test entire flow with keyboard only
- **Phase to address**: Phase 2 - Component implementation, test continuously

### 11. Reduced Motion Not Respected

- **What goes wrong**: Users with vestibular disorders get motion sick from sliding panels and carousel animations. Site is unusable for them.
- **Warning signs**: None visible to developer - affects users who've set OS preference.
- **Prevention**:
  - Check `prefers-reduced-motion: reduce` media query
  - Replace sliding animations with fades
  - Remove parallax effects entirely
  - Keep functional transitions but make them instant or very fast (<100ms)
  - Test with "Reduce motion" enabled in OS accessibility settings
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
- **Phase to address**: Phase 1 - Design system, global CSS

### 12. Touch Target Too Small

- **What goes wrong**: Carousel dots, close buttons, and card interactions are too small to tap reliably on mobile. Users hit wrong targets. Frustration on touchscreens.
- **Warning signs**: Users repeatedly tapping, wrong item selected, rage taps.
- **Prevention**:
  - Minimum 44x44px touch targets (WCAG), 48x48px recommended (Material)
  - Add invisible touch padding if visual size must be smaller
  - Space interactive elements at least 8px apart
  - Test on actual phones with fingers (not mouse)
  - Carousel dots: visual 8px, touch target 44px
- **Phase to address**: Phase 2 - All interactive components

---

## Minor (Polish Issues)

### 13. Carousel Dot Pagination Doesn't Update During Swipe

- **What goes wrong**: Dots only update after animation completes, feeling disconnected. Or dots don't indicate interactivity.
- **Warning signs**: Pagination feels laggy, users don't realize dots are clickable.
- **Prevention**:
  - Update active dot during drag based on threshold
  - Add transition to dot state change
  - Make dots look interactive (hover/focus states)
  - Consider progress bar alternative for many items
- **Phase to address**: Phase 3 - Polish

### 14. Panel Animation Timing Off

- **What goes wrong**: Panels slide in too fast (jarring) or too slow (sluggish). Backdrop fade doesn't sync with panel slide. Entry and exit animations different speeds.
- **Warning signs**: Animations feel "off", impatient users clicking multiple times.
- **Prevention**:
  - Standard durations: 200-300ms for panels, 150-250ms for small elements
  - Use easing: `cubic-bezier(0.4, 0, 0.2, 1)` for standard, `cubic-bezier(0, 0, 0.2, 1)` for enter, `cubic-bezier(0.4, 0, 1, 1)` for exit
  - Backdrop and panel should animate together (same duration)
  - Exit slightly faster than enter (feels more responsive)
- **Phase to address**: Phase 3 - Polish

### 15. No Loading/Empty States

- **What goes wrong**: Blank screens while content loads, no indication that carousel has ended, no messaging when no emotions match filter.
- **Warning signs**: Users confused if app is working, "is it loading?" questions.
- **Prevention**:
  - Skeleton loaders for cards during initial load
  - Clear "end of list" indicator or smooth loop
  - Friendly empty states with guidance
  - Loading spinners for async operations >300ms
- **Phase to address**: Phase 2-3 - After core components work

### 16. Inconsistent Animation Direction

- **What goes wrong**: Panels sometimes slide up, sometimes down. Cards slide left for "next" but also left for "back". Disorienting.
- **Warning signs**: Users confused about navigation direction, unexpected animations.
- **Prevention**:
  - Document animation direction rules in design system
  - "Next" always goes left-to-right (LTR) or right-to-left (RTL)
  - Panels: context panels from bottom, detail panels from right
  - Maintain consistent mental model
- **Phase to address**: Phase 1 - Design system documentation

### 17. Missing Hover States on Desktop

- **What goes wrong**: Desktop users get no feedback that cards are interactive. Mouse cursor doesn't change. Cards feel static.
- **Warning signs**: Low engagement on desktop, users don't realize cards are clickable.
- **Prevention**:
  - Add subtle hover states (scale 1.02, shadow, brightness)
  - Use `@media (hover: hover)` to only apply on devices that support hover
  - `cursor: pointer` on interactive elements
  - Don't rely on hover for essential information (mobile has no hover)
- **Phase to address**: Phase 2 - Card component

### 18. Scroll Position Not Preserved

- **What goes wrong**: User scrolls in panel, closes it, reopens - scroll is reset. Or carousel position lost when navigating away and back.
- **Warning signs**: Users have to re-scroll to find their place, frustration.
- **Prevention**:
  - Store scroll position in component state before close
  - Use `scrollIntoView` with `behavior: 'auto'` on reopen
  - Consider sessionStorage for cross-navigation persistence
  - Reset scroll only on explicit "back to start" action
- **Phase to address**: Phase 3 - Enhancement

---

## Testing Checklist

### Iframe Integration
- [ ] Height adjusts when panel opens (no content cut off)
- [ ] Height adjusts when panel closes (no excessive whitespace)
- [ ] No double scrollbars (iframe and parent page)
- [ ] postMessage works in actual Circle.so environment
- [ ] App functions with common sandbox restrictions
- [ ] External links open in new tab, not inside iframe
- [ ] Console shows no cross-origin errors

### Touch/Mobile
- [ ] Carousel swipes smoothly without triggering page scroll
- [ ] Swipe gesture has visual feedback during drag
- [ ] Can scroll content inside slide-in panels
- [ ] All touch targets at least 44x44px
- [ ] No zoom on input focus (viewport meta)
- [ ] Tested on actual Android device (not just iOS)
- [ ] Tested on slow 3G network throttle

### Accessibility
- [ ] Tab through entire app - focus order makes sense
- [ ] All interactive elements have visible focus indicator
- [ ] Screen reader announces panel as modal when open
- [ ] Focus trapped inside open panels
- [ ] Escape key closes panels
- [ ] Focus returns to trigger when panel closes
- [ ] Arrow keys navigate carousel
- [ ] All images have alt text or aria-label
- [ ] Color contrast passes WCAG AA (4.5:1)
- [ ] Works with prefers-reduced-motion enabled

### Animation Performance
- [ ] Open Chrome DevTools Performance panel
- [ ] Record panel slide animation
- [ ] Verify 60fps (no red bars in FPS chart)
- [ ] No "forced reflow" warnings
- [ ] Test on low-end device / CPU throttle 4x

### Dark Theme
- [ ] All text readable (run contrast checker)
- [ ] Focus indicators visible against dark background
- [ ] Disabled states distinguishable from enabled
- [ ] Links distinguishable from regular text
- [ ] Test with different dark theme variations if supporting system preference

### Carousel UX
- [ ] Clear indicator that more cards exist (peek, dots, arrows)
- [ ] Current position always visible (pagination)
- [ ] Can navigate with keyboard (arrows)
- [ ] Overscroll at ends feels natural
- [ ] Animation timing feels right (not too fast/slow)

### Edge Cases
- [ ] Empty state when no emotions match
- [ ] Loading state visible when appropriate
- [ ] Very long text doesn't break layout
- [ ] Rapid clicking doesn't cause glitches
- [ ] Works with browser zoom 200%
- [ ] Browser back button doesn't break app
- [ ] Works with JavaScript enabled but CSS animations disabled

---

## Quick Reference: Safe vs Unsafe CSS for Animations

### SAFE (GPU accelerated, compositor only)
```css
transform: translateX(), translateY(), translate3d()
transform: scale(), scaleX(), scaleY()
transform: rotate()
opacity
```

### UNSAFE (triggers layout, causes jank)
```css
width, height
top, left, right, bottom
margin, padding
font-size
border-width
```

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Focus Management in React](https://reactjs.org/docs/accessibility.html#focus-control)
- [CSS Triggers](https://csstriggers.com/) - What CSS properties trigger layout/paint/composite
- [Inclusive Components - Modals](https://inclusive-components.design/menus-menu-buttons/)
- [prefers-reduced-motion MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
