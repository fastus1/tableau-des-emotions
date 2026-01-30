# Cartes des Émotions — Design

**Date** : 2026-01-29
**Statut** : Validé

---

## Contexte

Application web interactive pour explorer les émotions, basée sur les tableaux de régulation émotionnelle de Diane Lapensée. L'app sera intégrée via iframe dans Circle.so et hébergée sur Railway.

**Usage principal** : Apprentissage et exploration à tête reposée (pas un outil de crise).

---

## Architecture de navigation

### Structure en 3 niveaux

```
Accueil
├── Quand ça ne va pas (7 émotions)
│   └── [Émotion] → Slide-in détail
│       └── Culpabilité → 4 sous-cartes → Slide-in détail
├── Quand ça va bien (6 sentiments)
│   └── [Sentiment] → Slide-in détail
└── Les 5 étapes (carousel)
```

### Page d'accueil

- Logo Avancer Simplement
- Titre : "Tableau des Émotions"
- Introduction courte
- Crédit cliquable : "Par Diane Lapensée, Thérapeute" → lien externe (nouvelle page à créer)
- **3 cartes d'entrée** empilées verticalement :
  - Hauteur ~80-100px chacune
  - Bordure gauche ou accent coloré distinctif :
    - "Quand ça ne va pas" → accent rouge/orange
    - "Quand ça va bien" → accent vert/jaune
    - "Les 5 étapes" → accent bleu (`--brand-primary`)
  - Titre + une ligne de description
  - Icône optionnelle à droite

### Navigation interne

- **Bouton retour** : icône flèche ← en haut à gauche, discret
- Pas de header persistant
- Pas de footer visible

---

## Sections émotions (désagréables et agréables)

### Grille de cartes fermées

**Style visuel :**
- Fond coloré plein (couleur de l'émotion)
- Texte blanc
- Icône Lucide (line icons)
- 3 mots-clés max, une ligne, séparés par · (point médian)
- Border-radius : 12-16px
- Espacement confortable entre cartes

**Responsive :**
- Mobile (<640px) : 1 colonne
- Tablet (640-1024px) : 2 colonnes
- Desktop (>1024px) : 3 colonnes

**Couleurs des émotions désagréables :**
| Émotion | Couleur |
|---------|---------|
| Colère | `--color-red` (#db0e00) |
| Honte | `--color-orange` (#e05a03) |
| Tristesse | `--brand-primary` (#3085F5) |
| Dégoût | `--color-green` (#009a2a) |
| Peur | `--color-purple` (#641892) |
| Surprise | `--color-yellow` (#ffb200) |
| Culpabilité | `--color-taupe` (#7A6F5D) |

**Couleurs des sentiments agréables :**
| Sentiment | Couleur |
|-----------|---------|
| Amour | `--color-magenta` (#a82360) |
| Fierté | `--color-orange` (#e05a03) |
| Joie | `--color-yellow` (#ffb200) |
| Engagement | `--color-green` (#009a2a) |
| Confiance | `--brand-link` (#539DFF) |
| Paix | `--color-mint` (#4ECDC4) |

### Interaction : slide-in depuis le bas

- Animation : 300ms ease-out
- Overlay sombre au-dessus
- Contenu scrollable dans le panneau
- Fermeture : bouton X en haut, swipe vers le bas, ou clic sur overlay

**Contenu du slide-in (émotions désagréables) :**
1. En d'autres mots... (variations)
2. Déclencheurs
3. Réactions défensives
4. Besoins

**Contenu du slide-in (sentiments agréables) :**
1. En d'autres mots... (variations)
2. Déclencheurs
3. Besoins satisfaits

### Cas spécial : Culpabilité

Premier niveau de slide-in :
- Titre "Culpabilité"
- Petite intro sur saine vs malsaine
- 4 mini-cartes empilées verticalement :
  - Se sentir coupable (saine)
  - Culpabilisation de soi (malsaine)
  - Se faire culpabiliser (malsaine)
  - Culpabiliser l'autre (malsaine)
- Nuances de la couleur taupe pour différencier

Deuxième niveau :
- Slide-in par-dessus le premier
- Bouton retour ← pour revenir aux 4 choix
- Même structure de contenu que les autres émotions

---

## Section "Les 5 étapes"

### Format carousel horizontal

- Une étape visible à la fois
- Navigation : flèches gauche/droite sur desktop, swipe sur mobile
- Indicateur de progression : "2/5" ou 5 points
- Transition slide gauche/droite fluide

### Contenu de chaque carte

- Numéro de l'étape (grand, visible)
- Titre (ex: "S'arrêter")
- Question clé en italique
- Liste des actions suggérées
- Couleur de fond : `--brand-primary` (#3085F5)

### Les 5 étapes

1. **S'arrêter** — "C'est plus fort que moi, je vois bien que je réagis."
2. **S'observer et identifier les émotions** — "Qu'est-ce qui se passe pour moi?"
3. **Accueillir les émotions et les ressentir** — "Qu'est-ce que je vis en ce moment?"
4. **Identifier ses besoins et se responsabiliser** — "Qu'est-ce qui me ferait du bien par rapport à la situation?"
5. **Passer à l'action** — "Qu'est-ce qui est en mon pouvoir pour prendre soin de moi?"

---

## Design visuel

### Thème

Dark only (pas de mode clair).

- Fond principal : `--bg-primary` (#2B2E33)
- Fond secondaire : `--bg-secondary` (#42464D)
- Texte principal : `--text-primary` (#FFFFFF)
- Texte secondaire : `--text-secondary` (#E4E7EB)

### Typographie

- Titres et corps : Inter
- Branding "Avancer Simplement" : Montserrat 900 italic

### Animations

**Feedback subtil uniquement :**

```css
/* Hover sur cartes */
transition: transform 200ms ease, box-shadow 200ms ease;

&:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}
```

- Transitions de 200ms sur les changements d'état
- Pas d'animation au chargement des éléments
- Pas d'animation sur les icônes
- Pas d'animations décoratives

### Chargement

Écran de chargement minimal :
- Logo Avancer Simplement centré
- Spinner discret en dessous
- Fond `--bg-primary`

---

## Intégration Circle.so (iframe)

### Contraintes

- HTTPS obligatoire
- Pas de `X-Frame-Options: DENY`
- `width: 100%` pour responsive
- Navigation autonome dans l'iframe

### Gestion de la hauteur

**Stratégie : postMessage avec fallback**

1. Implémenter le resize dynamique via postMessage :

```js
// Côté app (dans l'iframe)
function sendHeight() {
  const height = document.documentElement.scrollHeight;
  window.parent.postMessage({ type: 'IFRAME_HEIGHT', height }, '*');
}

window.addEventListener('load', sendHeight);
window.addEventListener('resize', sendHeight);
```

2. Tester si Circle accepte le script dans le bloc HTML
3. Fallback : hauteur fixe ~900px avec scroll interne si nécessaire

Le design est conçu pour être compact — le contenu long vit dans les slide-ins qui scrollent indépendamment.

---

## Architecture technique

### Stack

- Framework : React + Vite
- Style : Tailwind CSS + CSS custom properties
- Icônes : Lucide React
- Hébergement : Railway (branches staging/production)

### Structure des données

Fichiers JSON séparés dans `/src/data/` :

```
/src/data/
  emotions-desagreables.json
  emotions-agreables.json
  cinq-etapes.json
```

### Commandes

```bash
npm run dev      # Développement local
npm run build    # Build production
npm run preview  # Preview du build
```

---

## Accessibilité

- Contraste WCAG AA (4.5:1 minimum)
- Taille tactile : 44x44px minimum
- Navigation clavier : Tab, Enter, Escape
- Focus visible (ring 2-3px)
- Attributs ARIA sur les modals/slide-ins
