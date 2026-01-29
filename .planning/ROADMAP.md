# Roadmap: Cartes des Emotions

**Created:** 2026-01-29
**Phases:** 4
**Requirements covered:** 22/22

## Phases

### Phase 1: Foundation & Navigation
**Goal:** Establish project structure, design system, iframe integration, and home page navigation.
**Requirements:** NAV-01, NAV-02, NAV-03, TECH-01, TECH-02, TECH-03, TECH-04
**Plans:** 2 plans
**Success Criteria:**
1. User can view the home page with 3 entry cards (desagreables, agreables, 5 etapes) displayed
2. User can tap any entry card and navigate to the corresponding section
3. User can return to home from any section using the back button
4. App displays loading screen with logo and spinner on initial load

Plans:
- [x] 01-01-PLAN.md — Project scaffolding, Tailwind CSS 4 design system, LoadingScreen component
- [x] 01-02-PLAN.md — Layout with iframe height sync, state navigation, HomePage with 3 entry cards

**Status:** Complete (2026-01-29)

### Phase 2: Emotion Cards Display
**Goal:** Display emotion cards in responsive grids with proper visual styling and interaction states.
**Requirements:** CARD-01, CARD-02, CARD-03, CARD-04, CARD-05, ANIM-01, ANIM-02
**Plans:** 2 plans
**Success Criteria:**
1. User sees 7 desagreables emotions as colored cards with icons and keywords
2. User sees 6 agreables sentiments as colored cards with icons and keywords
3. Card grid adapts from 1 column on mobile to 3 columns on desktop
4. Cards show hover elevation and smooth transitions on interaction

Plans:
- [x] 02-01-PLAN.md — Data layer (types, emotions, sentiments) and EmotionCard component
- [x] 02-02-PLAN.md — Grid pages (UnpleasantEmotionsPage, PleasantSentimentsPage) and App wiring

**Status:** Complete (2026-01-29)

### Phase 3: Slide-in Panel & Details
**Goal:** Implement the slide-in panel system with emotion details and guilt special case.
**Requirements:** PANEL-01, PANEL-02, PANEL-03, PANEL-04, A11Y-01, A11Y-02, A11Y-03, A11Y-04, A11Y-05
**Plans:** 3 plans
**Success Criteria:**
1. User taps an emotion card and sees a panel slide up from the bottom with variations, triggers, reactions, and needs
2. User can close the panel via X button, swipe down, or overlay tap
3. User taps Culpabilite and sees 4 sub-cards, then can tap one to see its detail in a nested panel
4. User can navigate entirely by keyboard (Tab, Enter, Escape) with visible focus indicators

Plans:
- [x] 03-01-PLAN.md — SlidePanel foundation (react-swipeable, hooks, base components)
- [x] 03-02-PLAN.md — Panel content (EmotionPanel, SentimentPanel, CulpabilitePanel)
- [x] 03-03-PLAN.md — Integration and verification (wire to pages, human-verify)

**Status:** Complete (2026-01-29)

### Phase 4: Steps Carousel & Polish
**Goal:** Complete the 5-step carousel and final integration testing.
**Requirements:** STEPS-01, STEPS-02, STEPS-03
**Plans:** 2 plans
**Success Criteria:**
1. User can swipe or use arrows to navigate through 5 steps horizontally
2. User sees current progress indicator (e.g., "2/5")
3. Only one step is visible at a time with smooth transition between steps
4. Full app works correctly embedded in Circle.so iframe

Plans:
- [ ] 04-01-PLAN.md — Step data layer + StepsCarousel components (StepCard, ProgressIndicator, StepsCarousel)
- [ ] 04-02-PLAN.md — StepsPage integration + human verification

## Dependency Graph

```
Phase 1 (Foundation)
    |
    v
Phase 2 (Cards)
    |
    v
Phase 3 (Panels)
    |
    v
Phase 4 (Carousel)
```

All phases are sequential - each builds on the foundation of the previous.

## Timeline Estimate

| Phase | Complexity | Estimated Duration |
|-------|------------|-------------------|
| 1 | Medium | 2 plans |
| 2 | Low-Medium | 2 plans |
| 3 | High | 3 plans |
| 4 | Medium | 2 plans |

**Total:** 9 implementation plans (quick depth)

---
*Roadmap created: 2026-01-29*
*Phase 1 planned: 2026-01-29*
*Phase 2 planned: 2026-01-29*
*Phase 3 planned: 2026-01-29*
*Phase 4 planned: 2026-01-29*
*Mode: yolo (auto-approve)*
