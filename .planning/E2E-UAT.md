---
status: paused
phase: all-phases
source: 01-01-SUMMARY.md, 01-02-SUMMARY.md, 02-01-SUMMARY.md, 02-02-SUMMARY.md, 03-01-SUMMARY.md, 03-02-SUMMARY.md, 03-03-SUMMARY.md, 04-01-SUMMARY.md, 04-02-SUMMARY.md
started: 2026-01-29T16:45:00Z
updated: 2026-01-29T16:45:00Z
---

## Current Test
<!-- OVERWRITE each test - shows where we are -->

number: 1
name: Loading Screen
expected: |
  On page load, see branded loading screen with "Avancer Simplement" text (Montserrat 900 italic) and animated spinner. After ~1.5 seconds, transitions to home page.
awaiting: user response

## Tests

### 1. Loading Screen
expected: On page load, see branded loading screen with "Avancer Simplement" text (Montserrat 900 italic) and animated spinner. After ~1.5 seconds, transitions to home page.
result: [pending]

### 2. Home Page Display
expected: Home page shows header "Cartes des Émotions" and 3 colored section cards: red card for "Émotions désagréables", mint/teal card for "Sentiments agréables", blue card for "Les 5 étapes".
result: [pending]

### 3. Navigate to Unpleasant Emotions
expected: Tap "Émotions désagréables" card. Page shows 7 emotion cards in a responsive grid: Colère (red), Honte (orange), Tristesse (blue), Dégoût (green), Peur (purple), Surprise (yellow), Culpabilité (taupe). Back button visible in top-left.
result: [pending]

### 4. Navigate to Pleasant Sentiments
expected: From home, tap "Sentiments agréables" card. Page shows 6 sentiment cards in a responsive grid: Joie, Confiance, Amour, Espoir, Fierté, Paix. Back button visible in top-left.
result: [pending]

### 5. Open Emotion Panel (Standard)
expected: From unpleasant emotions, tap "Colère" card. Panel slides up from bottom showing: red header with Flame icon, "Variations" section with words like "frustration, irritation...", "Déclencheurs", "Réactions défensives", and highlighted "Besoins" section.
result: [pending]

### 6. Close Panel - Multiple Methods
expected: With panel open: (a) tap X button - closes, (b) reopen and tap backdrop/overlay - closes, (c) reopen and press Escape key - closes, (d) reopen and swipe down on panel - closes.
result: [pending]

### 7. Culpabilité Special Case
expected: From unpleasant emotions, tap "Culpabilité" card. Panel opens showing 2x2 grid of 4 sub-cards: "Culpabilité saine", "Culpabilité de soi", "Se faire culpabiliser", "Faire culpabiliser". Tap any sub-card to see its detail. Back arrow returns to sub-card selection.
result: [pending]

### 8. Sentiment Panel
expected: From pleasant sentiments, tap any sentiment (e.g., "Joie"). Panel slides up showing: icon hero, "Variations", "Déclencheurs", and highlighted "Besoins comblés" section (no "Réactions défensives" - only unpleasant emotions have this).
result: [pending]

### 9. Steps Carousel Navigation
expected: From home, tap "Les 5 étapes" card. See first step "S'arrêter" with number badge (1), question in italics, bullet points. Navigation arrows visible (left disabled at step 1). Progress shows "1/5" and 5 dots.
result: [pending]

### 10. Steps Carousel - Arrow Navigation
expected: In carousel, tap right arrow. Advances to step 2 with smooth slide animation. Progress updates to "2/5", second dot fills. Continue to step 5, then verify right arrow is disabled at last step.
result: [pending]

### 11. Steps Carousel - Progress Dots
expected: In carousel, tap on dot 4. Jumps directly to step 4 (skipping 2-3). Progress shows "4/5", 4th dot is filled.
result: [pending]

### 12. Steps Carousel - Keyboard Navigation
expected: Click/tab to focus the carousel container. Press ArrowRight to advance, ArrowLeft to go back. Navigation responds to keyboard without needing to click buttons.
result: [pending]

### 13. Back Navigation
expected: From any section (emotions, sentiments, or steps), tap back button (arrow icon top-left). Returns to home page with 3 section cards.
result: [pending]

### 14. Responsive Layout
expected: Resize browser to mobile width (~375px). Verify: cards stack in single column, panels fill screen width, text remains readable, touch targets large enough (44px minimum).
result: [pending]

## Summary

total: 14
passed: 0
issues: 0
pending: 14
skipped: 0

## Gaps

[none yet]
