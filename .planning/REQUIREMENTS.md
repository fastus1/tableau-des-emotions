# Requirements: Cartes des Emotions

**Defined:** 2026-01-29
**Core Value:** Permettre a l'utilisateur d'identifier rapidement une emotion et comprendre le besoin sous-jacent a satisfaire.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Navigation

- [x] **NAV-01**: Page d'accueil avec 3 cartes d'entree (desagreables, agreables, 5 etapes)
- [x] **NAV-02**: Bouton retour (icone fleche) pour revenir a l'accueil
- [x] **NAV-03**: Pas de header persistant (UI epuree)

### Cartes Emotions

- [x] **CARD-01**: Afficher 7 emotions desagreables en grille
- [x] **CARD-02**: Afficher 6 sentiments agreables en grille
- [x] **CARD-03**: Fond colore plein par emotion (couleur distinctive)
- [x] **CARD-04**: Icone Lucide + 3 mots-cles sur carte fermee
- [x] **CARD-05**: Grille responsive (1 col mobile, 2 col tablet, 3 col desktop)

### Slide-in Panel

- [x] **PANEL-01**: Slide-in depuis le bas (animation 300ms)
- [x] **PANEL-02**: Fermeture via X, swipe down, ou clic overlay
- [x] **PANEL-03**: Contenu scrollable interne
- [x] **PANEL-04**: Culpabilite: 2 niveaux (4 sous-cartes -> detail)

### Carousel

- [ ] **STEPS-01**: Navigation horizontale (fleches + swipe)
- [ ] **STEPS-02**: Indicateur de progression (2/5)
- [ ] **STEPS-03**: Une etape visible a la fois

### Technique

- [x] **TECH-01**: postMessage pour hauteur iframe dynamique
- [x] **TECH-02**: Fallback hauteur 900px si postMessage echoue
- [x] **TECH-03**: HTTPS obligatoire
- [x] **TECH-04**: Ecran de chargement (logo + spinner)

### Accessibilite

- [x] **A11Y-01**: Contraste WCAG AA (4.5:1)
- [x] **A11Y-02**: Touch targets 44x44px minimum
- [x] **A11Y-03**: Navigation clavier (Tab, Enter, Escape)
- [x] **A11Y-04**: Focus trap dans les panneaux ouverts
- [x] **A11Y-05**: Respect prefers-reduced-motion

### Animations

- [x] **ANIM-01**: Hover: elevation legere + box-shadow
- [x] **ANIM-02**: Transitions 200ms sur changements d'etat

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Fonctionnalites additionnelles

- **SEARCH-01**: Recherche/filtre d'emotions par mot-cle
- **FAV-01**: Favoris/sauvegarde de cartes (localStorage)
- **ANALYTICS-01**: Tracking d'usage basique

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Mode clair | Circle.so est dark-only, coherence visuelle |
| Backend/CMS | Contenu statique, Diane ne modifie pas seule |
| Gamification | Inapproprie pour contenu therapeutique |
| Partage social | Emotions sont privees |
| PWA/offline | Usage en ligne uniquement |
| Auto-advance carousel | Contenu emotionnel requiert rythme personnel |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| NAV-01 | 1 | Complete |
| NAV-02 | 1 | Complete |
| NAV-03 | 1 | Complete |
| CARD-01 | 2 | Complete |
| CARD-02 | 2 | Complete |
| CARD-03 | 2 | Complete |
| CARD-04 | 2 | Complete |
| CARD-05 | 2 | Complete |
| PANEL-01 | 3 | Complete |
| PANEL-02 | 3 | Complete |
| PANEL-03 | 3 | Complete |
| PANEL-04 | 3 | Complete |
| STEPS-01 | 4 | Pending |
| STEPS-02 | 4 | Pending |
| STEPS-03 | 4 | Pending |
| TECH-01 | 1 | Complete |
| TECH-02 | 1 | Complete |
| TECH-03 | 1 | Complete |
| TECH-04 | 1 | Complete |
| A11Y-01 | 3 | Complete |
| A11Y-02 | 3 | Complete |
| A11Y-03 | 3 | Complete |
| A11Y-04 | 3 | Complete |
| A11Y-05 | 3 | Complete |
| ANIM-01 | 2 | Complete |
| ANIM-02 | 2 | Complete |

**Coverage:**
- v1 requirements: 22 total
- Mapped to phases: 22
- Unmapped: 0

---
*Requirements defined: 2026-01-29*
*Last updated: 2026-01-29 after roadmap creation*
