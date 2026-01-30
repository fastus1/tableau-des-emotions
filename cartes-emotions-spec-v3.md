# Cartes des Émotions

**Application web pour Avancer Simplement**  
*Basée sur les Tableaux de régulation émotionnelle de Diane Lapensée*

---

## Objectif

Transformer les tableaux de régulation émotionnelle en une expérience interactive, visuelle et accessible sur mobile et ordinateur.

L'utilisateur explore ses émotions à travers des cartes colorées, découvre ce qu'elles signifient, et apprend comment répondre à ses besoins.

---

## Contexte technique

- **Hébergement**: Railway
- **Intégration**: iframe dans Circle.so
- **Design**: Aligné sur le Design System Avancer Simplement

---

## Structure de l'application

### Page d'accueil

**En-tête**
- Logo Avancer Simplement
- Titre: "Tableau des Émotions"
- Sous-titre: "Par Diane Lapensée, Thérapeute"

**Introduction courte**
> Les émotions sont des signaux. Elles nous indiquent si nos besoins sont satisfaits ou non. Explorez vos émotions pour mieux vous comprendre.

**Navigation principale**
Trois sections accessibles via des boutons ou onglets:
1. Quand ça ne va pas (émotions désagréables)
2. Quand ça va bien (sentiments agréables)
3. Les 5 étapes (processus de régulation)

---

## Section: Quand ça ne va pas

### Présentation

Texte d'introduction:
> Les émotions désagréables sont des signaux de besoins insatisfaits. Prenez le temps de les reconnaître, de les ressentir et de les réguler.

### Les cartes (7)

| Émotion | Couleur du design system |
|---------|--------------------------|
| Colère | `--color-red` (#db0e00) |
| Honte | `--color-orange` (#e05a03) |
| Tristesse | `--brand-primary` (#3085F5) |
| Dégoût | `--color-green` (#009a2a) - ton foncé |
| Peur | `--color-purple` (#641892) |
| Surprise | `--color-yellow` (#ffb200) |
| Culpabilité | Nouvelle couleur suggérée: taupe (#7A6F5D) |

**Affichage de chaque carte (fermée):**
- Couleur de fond distinctive
- Nom de l'émotion
- Icône simple
- Quelques mots-clés (ex: "Frustré · Irrité · Fâché")

### Carte ouverte (au clic)

La carte s'ouvre et révèle 4 sections:

1. **En d'autres mots...**  
   Liste des variations de l'émotion

2. **Déclencheurs**  
   Ce qui provoque cette émotion

3. **Réactions défensives**  
   Comment on réagit souvent (à éviter)

4. **Besoins**  
   Ce dont on a vraiment besoin

Bouton "Fermer" ou clic à l'extérieur pour revenir aux cartes.

### Cas particulier: La culpabilité

La carte "Culpabilité" s'ouvre sur 4 sous-cartes:
- Se sentir coupable (saine)
- Culpabilisation de soi (malsaine)
- Se faire culpabiliser (malsaine)
- Culpabiliser l'autre (malsaine)

Chaque sous-carte utilise une nuance de la couleur taupe.

---

## Section: Quand ça va bien

### Présentation

Texte d'introduction:
> Ressentir et savourer les émotions agréables est tout aussi important. Ça vous permet de reconnaître les besoins satisfaits et de cultiver la gratitude.

### Les cartes (6)

| Sentiment | Couleur |
|-----------|---------|
| Amour | `--color-magenta` (#a82360) |
| Fierté | `--color-orange` (#e05a03) |
| Joie | `--color-yellow` (#ffb200) |
| Engagement | `--color-green` (#009a2a) |
| Confiance | `--brand-link` (#539DFF) |
| Paix | Nouvelle couleur suggérée: vert menthe (#4ECDC4) |

### Carte ouverte

Structure simplifiée (3 sections):

1. **En d'autres mots...**  
   Variations du sentiment

2. **Déclencheurs**  
   Ce qui favorise ce sentiment

3. **Besoins satisfaits**  
   Ce que ce sentiment nourrit en nous

---

## Section: Les 5 étapes

### Présentation

Texte d'introduction:
> La régulation émotionnelle peut être difficile à appliquer au quotidien. Ce processus vous accompagne à travers les étapes clés pour combler vos besoins.

### Format

5 cartes numérotées, navigation horizontale avec flèches ou swipe sur mobile.

Chaque carte contient:
- Numéro de l'étape (grand, visible)
- Titre (ex: "S'arrêter")
- Question clé en italique
- Liste des actions suggérées

Couleur des cartes: `--brand-primary` (#3085F5) ou `--bg-secondary` (#42464D)

### Les 5 étapes

1. **S'arrêter**  
   *"C'est plus fort que moi, je vois bien que je réagis."*

2. **S'observer et identifier les émotions**  
   *"Qu'est-ce qui se passe pour moi?"*

3. **Accueillir les émotions et les ressentir**  
   *"Qu'est-ce que je vis en ce moment?"*

4. **Identifier ses besoins et se responsabiliser**  
   *"Qu'est-ce qui me ferait du bien par rapport à la situation?"*

5. **Passer à l'action**  
   *"Qu'est-ce qui est en mon pouvoir pour prendre soin de moi?"*

---

## Design visuel

### Thème

**Thème sombre** (aligné sur le design system)
- Fond principal: `--bg-primary` (#2B2E33)
- Fond secondaire: `--bg-secondary` (#42464D)
- Texte principal: `--text-primary` (#FFFFFF)
- Texte secondaire: `--text-secondary` (#E4E7EB)

### Typographie

Selon le design system:
- **Titres et corps**: Inter
- **Branding "Avancer Simplement"**: Montserrat 900 italic

### Composants

**Cartes fermées**
- Utilise `.mlp-card` du design system
- Couleur de fond: couleur de l'émotion
- Texte: blanc ou couleur contrastante
- Border-radius: 12px
- Padding: 32px

**Cartes ouvertes (modal)**
- Fond: `--bg-primary`
- Bordure: 1px solid `--border-default`
- Sections internes séparées visuellement

**Boutons de navigation**
- Style `.mlp-btn-primary` pour l'action principale
- Style `.mlp-btn-secondary` pour les actions secondaires

### Animations

Selon le design system (minimalistes, feedback utilisateur seulement):
- Hover sur carte: `box-shadow` plus prononcé
- Ouverture de carte: transition 200-300ms
- Pas d'animations décoratives

```css
/* Utiliser les variables du design system */
transition: var(--transition-base); /* 200ms ease */
```

---

## Responsive

### Mobile (< 640px)

- Cartes empilées verticalement, pleine largeur
- Carte ouverte en plein écran avec scroll interne
- Navigation par onglets
- Padding: 16px minimum

### Tablette (640px - 1024px)

- Grille de 2 cartes par rangée
- Carte ouverte en modal centré (80% de la largeur)

### Desktop (> 1024px)

- Grille de 3 cartes par rangée
- Carte ouverte en modal centré (max 600px de largeur)

---

## Pied de page

- Crédit: "Par Diane Lapensée, Thérapeute"
- Lien: avancersimplement.com (style `--brand-link`)
- Logo Avancer Simplement

---

## Spécifications techniques

### Stack

- **Framework**: React avec Vite
- **Style**: Tailwind CSS + variables CSS du design system
- **Icônes**: Lucide React
- **Hébergement**: Railway

### Considérations iframe Circle.so

- Min-width: 320px
- Optimal: 400-600px
- Scroll vertical actif
- Fond assorti au thème Circle (sombre)
- Liens externes en `target="_blank"`

---

## Workflow de développement

### Environnements

| Environnement | Usage | URL |
|---------------|-------|-----|
| Local | Développement | localhost:5173 (ou autre port Vite) |
| Portainer | Tests sur serveur personnel | À définir |
| Railway Staging | Validation avant production | À définir |
| Railway Production | Version live intégrée à Circle.so | À définir |

### Branches Git

```
main (ou master)
├── staging    → déploie sur Railway Staging
└── production → déploie sur Railway Production
```

### Flux de travail

1. **Développement local**
   - Travailler sur `main` ou une branche feature
   - Tester localement avec `npm run dev`

2. **Test sur Portainer**
   - Push sur GitHub
   - Portainer pull l'image ou rebuild via webhook
   - Valider le comportement sur le serveur

3. **Staging**
   - Merge dans `staging`
   - Railway déploie automatiquement
   - Tester l'intégration iframe sur un espace Circle.so de test

4. **Production**
   - Merge `staging` dans `production`
   - Railway déploie automatiquement
   - Valider sur Circle.so en production

### Configuration Railway

**Staging**
- Branche: `staging`
- Variables d'environnement: aucune requise pour la v1

**Production**
- Branche: `production`
- Variables d'environnement: aucune requise pour la v1

### Commandes utiles

```bash
# Développement local
npm run dev

# Build de production
npm run build

# Preview du build
npm run preview
```

---

## Couleurs à ajouter au design system

Pour couvrir toutes les émotions, deux nouvelles couleurs sont suggérées:

```css
:root {
  /* Nouvelles couleurs - Cartes Émotions */
  --color-taupe: #7A6F5D;      /* Culpabilité */
  --color-mint: #4ECDC4;       /* Paix */
}
```

Ces couleurs s'intègrent bien avec la palette existante.

---

## Accessibilité

Selon le design system:
- Contraste WCAG AA (4.5:1 minimum)
- Taille tactile: 44x44px minimum
- Focus visible avec ring de 2-3px
- Navigation au clavier (Tab, Enter, Escape)
- Attributs ARIA sur les modals

---

## Contenu

Tout le contenu provient du document "Tableaux de régulation émotionnelle" de Diane Lapensée. Le texte est utilisé tel quel.
