# CLAUDE.md

"Cartes des Émotions" — app interactive d'exploration émotionnelle basée sur les tableaux de Diane Lapensée. React + Vite, Tailwind CSS, embarquée via iframe dans Circle.so.

## Architecture

3 sections : "Quand ça ne va pas" (7 cartes émotions), "Quand ça va bien" (6 cartes sentiments), "Les 5 étapes" (carousel horizontal).

- Cards ouvrent en modal au clic
- Culpabilité ouvre 4 sous-cartes (sain vs malsain)
- Classes CSS composants : `.mlp-card`, `.mlp-btn-primary`, `.mlp-btn-secondary`

## Logo Avancer Simplement

Deux éléments toujours ensemble :
1. Trois flèches (Cloudinary) : `https://res.cloudinary.com/dxhn08di4/image/upload/v1768749285/avancer-simplement/_shared/logos/logo-blanc-320.png`
2. Texte "AVANCER SIMPLEMENT" en Montserrat bold italic (`font-brand`)

## Déploiement

| Env | Branche | Plateforme | Auto-deploy |
|-----|---------|------------|-------------|
| Production | `main` | Railway | Oui (push) |
| Staging | `staging` | Portainer local | Non (docker compose) |

- Staging badge orange auto quand `VITE_APP_ENV=staging`
- Workflow : travailler sur `main` → merge vers `staging` pour tester → push `main` pour production

## Protection d'accès

Password gate (`src/components/ui/PasswordGate.tsx`) :
- Origin autorisé : `https://communaute.avancersimplement.com`
- Mot de passe accès direct : `074491`

## Contenu

Tout le contenu émotionnel vient de `tableaux-regulation-emotionnelle-complet.md` — utiliser **verbatim**.
