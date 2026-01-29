# Cartes des Émotions

## What This Is

Application web interactive permettant d'explorer et comprendre les émotions, basée sur les tableaux de régulation émotionnelle de Diane Lapensée. L'utilisateur découvre ses émotions à travers des cartes colorées, comprend leurs déclencheurs, et apprend comment répondre à ses besoins. Destinée à être intégrée via iframe dans Circle.so pour la communauté Avancer Simplement.

## Core Value

Permettre à l'utilisateur d'identifier rapidement une émotion et comprendre le besoin sous-jacent à satisfaire.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Afficher 3 sections navigables depuis l'accueil (émotions désagréables, agréables, 5 étapes)
- [ ] Afficher les 7 émotions désagréables sous forme de cartes colorées cliquables
- [ ] Afficher les 6 sentiments agréables sous forme de cartes colorées cliquables
- [ ] Ouvrir le détail d'une émotion en slide-in depuis le bas (variations, déclencheurs, réactions, besoins)
- [ ] Gérer le cas spécial Culpabilité avec 4 sous-cartes (saine vs malsaines)
- [ ] Présenter les 5 étapes de régulation en carousel horizontal navigable
- [ ] Fonctionner en iframe dans Circle.so (HTTPS, hauteur dynamique via postMessage)
- [ ] Respecter le design system Avancer Simplement (thème sombre)
- [ ] Être responsive (mobile, tablette, desktop)
- [ ] Respecter les standards d'accessibilité (WCAG AA, navigation clavier)

### Out of Scope

- Mode clair — Circle.so est en dark, on reste cohérent
- Recherche/filtre d'émotions — app d'exploration, pas un outil de recherche
- Favoris/sauvegarde — pas de personnalisation pour v1
- Backend/CMS — contenu statique en JSON, Diane ne modifie pas seule
- Analytics — pas de tracking pour v1
- PWA/offline — usage en ligne uniquement

## Context

**Client**: Avancer Simplement (Diane Lapensée, thérapeute)
**Contenu source**: Tableaux de régulation émotionnelle (document fourni)
**Intégration**: iframe dans Circle.so (communauté en ligne)
**Design existant**: Design system Avancer Simplement avec variables CSS définies

Le brainstorming du 2026-01-29 a produit un design détaillé documenté dans `docs/plans/2026-01-29-cartes-emotions-design.md`.

## Constraints

- **Hébergement**: Railway (branches staging/production)
- **Stack**: React + Vite + Tailwind CSS + Lucide React (imposé par spec)
- **iframe**: Doit fonctionner dans Circle.so sans X-Frame-Options restrictif
- **HTTPS**: Obligatoire pour éviter mixed content
- **Responsive**: Min-width 320px, optimal 400-600px dans iframe
- **Accessibilité**: WCAG AA, touch targets 44x44px, navigation clavier

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Slide-in depuis le bas (pas modal classique) | Pattern mobile moderne, élégant sur dark theme, iframe-friendly | — Pending |
| Carousel pour les 5 étapes | Renforce la progression séquentielle, focus une étape à la fois | — Pending |
| Fond coloré plein sur cartes fermées | Impact visuel, reconnaissance immédiate par couleur | — Pending |
| 2 niveaux de slide-in pour Culpabilité | Parcours éducatif (découvrir les 4 types), cohérence d'interaction | — Pending |
| Contenu en JSON séparés | Séparation code/contenu, facile à vérifier par Diane | — Pending |
| postMessage pour hauteur iframe | Meilleure UX si Circle accepte le script, fallback 900px sinon | — Pending |

---
*Last updated: 2026-01-29 after initialization*
