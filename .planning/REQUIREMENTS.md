# Requirements: Cartes des Émotions

**Defined:** 2026-01-29
**Core Value:** Permettre à l'utilisateur d'identifier rapidement une émotion et comprendre le besoin sous-jacent à satisfaire.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Navigation

- [ ] **NAV-01**: Page d'accueil avec 3 cartes d'entrée (désagréables, agréables, 5 étapes)
- [ ] **NAV-02**: Bouton retour (icône flèche) pour revenir à l'accueil
- [ ] **NAV-03**: Pas de header persistant (UI épurée)

### Cartes Émotions

- [ ] **CARD-01**: Afficher 7 émotions désagréables en grille
- [ ] **CARD-02**: Afficher 6 sentiments agréables en grille
- [ ] **CARD-03**: Fond coloré plein par émotion (couleur distinctive)
- [ ] **CARD-04**: Icône Lucide + 3 mots-clés sur carte fermée
- [ ] **CARD-05**: Grille responsive (1 col mobile, 2 col tablet, 3 col desktop)

### Slide-in Panel

- [ ] **PANEL-01**: Slide-in depuis le bas (animation 300ms)
- [ ] **PANEL-02**: Fermeture via X, swipe down, ou clic overlay
- [ ] **PANEL-03**: Contenu scrollable interne
- [ ] **PANEL-04**: Culpabilité: 2 niveaux (4 sous-cartes → détail)

### Carousel

- [ ] **STEPS-01**: Navigation horizontale (flèches + swipe)
- [ ] **STEPS-02**: Indicateur de progression (2/5)
- [ ] **STEPS-03**: Une étape visible à la fois

### Technique

- [ ] **TECH-01**: postMessage pour hauteur iframe dynamique
- [ ] **TECH-02**: Fallback hauteur 900px si postMessage échoue
- [ ] **TECH-03**: HTTPS obligatoire
- [ ] **TECH-04**: Écran de chargement (logo + spinner)

### Accessibilité

- [ ] **A11Y-01**: Contraste WCAG AA (4.5:1)
- [ ] **A11Y-02**: Touch targets 44x44px minimum
- [ ] **A11Y-03**: Navigation clavier (Tab, Enter, Escape)
- [ ] **A11Y-04**: Focus trap dans les panneaux ouverts
- [ ] **A11Y-05**: Respect prefers-reduced-motion

### Animations

- [ ] **ANIM-01**: Hover: élévation légère + box-shadow
- [ ] **ANIM-02**: Transitions 200ms sur changements d'état

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Fonctionnalités additionnelles

- **SEARCH-01**: Recherche/filtre d'émotions par mot-clé
- **FAV-01**: Favoris/sauvegarde de cartes (localStorage)
- **ANALYTICS-01**: Tracking d'usage basique

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Mode clair | Circle.so est dark-only, cohérence visuelle |
| Backend/CMS | Contenu statique, Diane ne modifie pas seule |
| Gamification | Inapproprié pour contenu thérapeutique |
| Partage social | Émotions sont privées |
| PWA/offline | Usage en ligne uniquement |
| Auto-advance carousel | Contenu émotionnel requiert rythme personnel |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| NAV-01 | TBD | Pending |
| NAV-02 | TBD | Pending |
| NAV-03 | TBD | Pending |
| CARD-01 | TBD | Pending |
| CARD-02 | TBD | Pending |
| CARD-03 | TBD | Pending |
| CARD-04 | TBD | Pending |
| CARD-05 | TBD | Pending |
| PANEL-01 | TBD | Pending |
| PANEL-02 | TBD | Pending |
| PANEL-03 | TBD | Pending |
| PANEL-04 | TBD | Pending |
| STEPS-01 | TBD | Pending |
| STEPS-02 | TBD | Pending |
| STEPS-03 | TBD | Pending |
| TECH-01 | TBD | Pending |
| TECH-02 | TBD | Pending |
| TECH-03 | TBD | Pending |
| TECH-04 | TBD | Pending |
| A11Y-01 | TBD | Pending |
| A11Y-02 | TBD | Pending |
| A11Y-03 | TBD | Pending |
| A11Y-04 | TBD | Pending |
| A11Y-05 | TBD | Pending |
| ANIM-01 | TBD | Pending |
| ANIM-02 | TBD | Pending |

**Coverage:**
- v1 requirements: 22 total
- Mapped to phases: 0
- Unmapped: 22 ⚠️

---
*Requirements defined: 2026-01-29*
*Last updated: 2026-01-29 after initial definition*
