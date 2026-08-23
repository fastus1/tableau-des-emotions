# Tableau des Emotions

Application web interactive d'exploration et de regulation emotionnelle, basee sur les tableaux de Diane Lapensee.

## Apercu

Outil educatif permettant aux utilisateurs d'explorer leurs emotions, comprendre leurs declencheurs et reactions defensives, identifier leurs besoins, et suivre un processus de regulation en 5 etapes. L'application est integree via iframe dans la communaute Circle.so d'Avancer Simplement.

### 4 sections principales

1. **Emotions deplaisantes** — Grille de 11 emotions (colere, honte, tristesse, degout, peur, surprise, culpabilite, jalousie, envie, ennui, solitude). Chaque carte s'ouvre en modal avec : variations, declencheurs, reactions defensives, besoins.
2. **Sentiments plaisants** — Grille de 10 sentiments (amour, fierte, joie, engagement, confiance, paix, gratitude, espoir, emerveillement, soulagement). Chaque carte montre : variations, declencheurs, besoins satisfaits.
3. **5 etapes de regulation** — Carrousel horizontal : S'arreter, S'observer, Accueillir, Identifier les besoins, Passer a l'action.
4. **Phrases d'ancrage** — Accordion de phrases de soutien par emotion pour traverser les moments difficiles.

### Particularites

- **Culpabilite** : Emotion speciale avec 4 sous-types (saine, de soi, se faire, faire)
- **Porte d'acces** : Mot de passe requis hors iframe Circle.so (`074491`)
- **Sync iframe** : Ajustement automatique de la hauteur dans Circle.so
- **PDF** : Lien de telechargement du tableau complet en footer

## Stack technique

| Composant | Technologie |
|-----------|-------------|
| **Frontend** | React 18.3 + TypeScript 5.6 + Vite 6.0 |
| **Styling** | Tailwind CSS 4.1 + CSS variables + glass-morphism |
| **Icones** | Lucide React 0.563 |
| **Serveur** | Caddy (reverse proxy / file server) |
| **Conteneur** | Docker (Node Alpine → Caddy Alpine, multi-stage) |
| **Prod** | Railway (auto-deploy depuis `main`) |
| **Staging** | Portainer (Docker, depuis `staging`) |

## Structure du projet

```
tableau-des-emotions/
├── src/
│   ├── main.tsx                    # Point d'entree React
│   ├── App.tsx                     # Routeur principal
│   ├── index.css                   # Styles globaux + design system
│   ├── components/
│   │   ├── layout/                 # Layout, bouton retour
│   │   ├── home/                   # Page d'accueil avec cartes de sections
│   │   ├── emotions/               # Pages emotions deplaisantes & sentiments plaisants
│   │   ├── panel/                  # Modals detail des emotions
│   │   ├── steps/                  # Carrousel 5 etapes
│   │   ├── anchors/                # Page phrases d'ancrage
│   │   └── ui/                     # PasswordGate, LoadingScreen
│   ├── data/                       # Contenu (emotions, sentiments, etapes, phrases)
│   │   ├── emotions.ts            # 11 emotions deplaisantes
│   │   ├── sentiments.ts          # 10 sentiments plaisants
│   │   ├── steps.ts               # 5 etapes de regulation
│   │   ├── sections.ts            # Sections de navigation
│   │   └── anchorPhrases.ts       # Phrases d'ancrage par emotion
│   ├── types/                      # Interfaces TypeScript
│   └── hooks/                      # useIframeHeight, usePrefersReducedMotion
│
├── dist/                           # Build de production
├── Dockerfile                      # Multi-stage (Node → Caddy)
├── Caddyfile                       # Config Caddy (SPA routing, gzip, port 3000)
├── docker-compose.yml              # Staging local (port 3001)
├── package.json
├── vite.config.ts
├── CLAUDE.md                       # Guide projet
├── cartes-emotions-spec-v3.md      # Specifications design
├── ajout-emotions.md               # Nouvelles emotions et phrases d'ancrage
└── images.json                     # Registre images (Cloudinary)
```

## Variables d'environnement

| Variable | Description |
|----------|-------------|
| `VITE_APP_ENV` | `staging` (badge orange) ou `production` (defaut) |

Aucune autre variable requise — l'application est entierement cote client.

## Deploiement

### Production (Railway)

Auto-deploy sur push vers `main`.

```bash
git checkout main
git push origin main
```

### Staging (Portainer)

```bash
git checkout staging
# Rebuilder dans Portainer : "Pull and redeploy"
# Accessible sur http://localhost:3001
# Badge orange "STAGING" visible en bas a gauche
```

### Dev local

```bash
npm install
npm run dev
# Accessible sur http://localhost:5173
```

## Commandes

```bash
npm run dev         # Serveur dev Vite
npm run build       # Build TypeScript + Vite production
npm run preview     # Previsualiser le build localement
npm start           # Servir dist/ via 'serve' (port $PORT)
npm run lint        # ESLint
```

## Design

- **Theme** : Dark mode uniquement (#16181C fond, #FFFFFF texte)
- **Effets** : Glass-morphism (backdrop filters), glow par emotion (40px box-shadow)
- **Polices** : Inter (corps), Montserrat 900 italic (branding)
- **Couleurs emotions** : Rouge, orange, vert, violet, jaune, taupe, menthe, bleu, magenta, cyan, ardoise, indigo
- **Responsive** : Mobile (<640px) colonne unique, tablette (640-1024) 2 colonnes, desktop (>1024) 3 colonnes
- **Accessibilite** : WCAG AA (contraste 4.5:1), cibles tactiles 44x44px, navigation clavier, respect `prefers-reduced-motion`

## Securite

- **PasswordGate** : Verification de l'origine iframe (`https://communaute.avancersimplement.com`)
- Acces direct requiert le mot de passe : `074491`
- Session stockee dans `sessionStorage`

## Contenu

Base sur les "Tableaux de regulation emotionnelle" de **Diane Lapensee**. Chaque emotion/sentiment inclut :
- Mots-cles (3, pour les cartes fermees)
- Variations (synonymes detailles)
- Declencheurs
- Reactions defensives / besoins satisfaits

## Git

- **Repo** : `https://github.com/fastus1/tableau-des-emotions.git`
- **Branches** : `main` (prod), `staging` (dev)

## Statut

**Actif** — Deploye sur Railway (production) et Portainer (staging).
