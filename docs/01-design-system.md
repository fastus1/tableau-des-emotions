# Design System - Avancer Simplement

## Identite visuelle

### Branding principal

**Logo**
- Logo blanc sur fond sombre
- Format : PNG 320px de large recommande

**Nom de la communaute : "AVANCER SIMPLEMENT"**
```css
font-family: 'Montserrat', sans-serif;
font-weight: 900;              /* Black */
font-style: italic;
text-transform: uppercase;
letter-spacing: 0.02em;
```

**Sous-titre : "Presente"**
```css
font-family: 'Inter', sans-serif;
font-weight: 400;              /* Normal */
font-style: italic;
letter-spacing: 0.05em;        /* tracking-wide */
color: var(--muted-foreground);
```

---

## Typographie

**Police principale : Inter**
- Source : Google Fonts
- Poids disponibles : 100-900
- Import :
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
```

**Police branding : Montserrat**
- Pour "AVANCER SIMPLEMENT" uniquement
- Poids : 900 (Black)
- Import :
```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,900&display=swap');
```

### Hierarchie typographique

| Element | Desktop | Mobile | Poids | Line-height |
|---------|---------|--------|-------|-------------|
| Hero Title | 48-56px | 32-40px | 700-800 | 1.2 |
| H1 | 32-40px | 28-32px | 700 | 1.2 |
| H2 | 28-32px | 24-28px | 700 | 1.3 |
| H3 | 24-28px | 20-24px | 600 | 1.3 |
| H4 | 20px | 20px | 600 | 1.4 |
| H5 | 18px | 18px | 600 | 1.4 |
| H6 | 16px | 16px | 600 | 1.5 |
| Body | 16-18px | 16px | 400 | 1.6 |
| Small | 14-15px | 14px | 400 | 1.5 |
| Meta/Label | 12-14px | 12px | 400-500 | 1.4 |

### Variables typographiques CSS

```css
:root {
  /* Polices */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-brand: 'Montserrat', sans-serif;
  --font-mono: 'Menlo', monospace;

  /* Tailles de base */
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 28px;
  --text-4xl: 32px;
  --text-5xl: 40px;
  --text-6xl: 48px;
}
```

---

## Palette de couleurs

### Couleurs principales (theme sombre)

```css
:root {
  /* Brand */
  --brand-primary: #3085F5;
  --brand-link: #539DFF;

  /* UI */
  --bg-primary: #2B2E33;
  --bg-secondary: #42464D;
  --text-primary: #FFFFFF;
  --text-secondary: #E4E7EB;

  /* Boutons */
  --btn-primary-bg: #3085F5;
  --btn-primary-text: #202226;
  --btn-primary-hover: #539DFF;

  /* Etats */
  --border-default: #42464D;
  --border-focus: #3085F5;
}
```

### Couleurs d'appoint (usage limite)

```css
:root {
  --color-orange: #e05a03;
  --color-green: #009a2a;
  --color-yellow: #ffb200;
  --color-red: #db0e00;
  --color-purple: #641892;
  --color-magenta: #a82360;

  /* Etats de validation */
  --success: #009a2a;
  --error: #db0e00;
  --warning: #ffb200;
  --info: #2563EB;
}
```

---

## Systeme d'espacement

**Base sur Tailwind (multiples de 4px)**

```css
:root {
  --spacing-1: 4px;      /* 0.25rem */
  --spacing-2: 8px;      /* 0.5rem */
  --spacing-3: 12px;     /* 0.75rem */
  --spacing-4: 16px;     /* 1rem */
  --spacing-6: 24px;     /* 1.5rem */
  --spacing-8: 32px;     /* 2rem */
  --spacing-12: 48px;    /* 3rem */
  --spacing-16: 64px;    /* 4rem */
  --spacing-20: 80px;    /* 5rem */
  --spacing-24: 96px;    /* 6rem */
}
```

**Conventions d'usage**
- Padding composant : 24-32px (spacing-6 a spacing-8)
- Spacing formulaire : 24px (spacing-6)
- Espacement bouton : 24px horizontal, 12px vertical
- Marges sections : 32-48px (spacing-8 a spacing-12)

---

## Composants UI

### Boutons

**Primaire**
```css
.mlp-btn-primary {
  background: var(--btn-primary-bg);
  color: var(--btn-primary-text);
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;
  min-height: 48px;
  min-width: 44px; /* Accessibilite */
}

.mlp-btn-primary:hover {
  background: var(--btn-primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.mlp-btn-primary:active {
  transform: translateY(0);
}
```

**Secondaire**
```css
.mlp-btn-secondary {
  background: transparent;
  color: var(--brand-primary);
  border: 2px solid var(--brand-primary);
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;
  min-height: 48px;
}

.mlp-btn-secondary:hover {
  background: var(--brand-primary);
  color: var(--btn-primary-text);
}
```

### Cards

```css
.mlp-card {
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--border-default);
  transition: box-shadow 0.3s ease;
}

.mlp-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}
```

### Inputs

```css
.mlp-input {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 2px solid var(--border-default);
  border-radius: 8px;
  font-size: 16px;
  font-family: var(--font-sans);
  transition: border-color 0.2s ease;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.mlp-input:focus {
  outline: none;
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px rgba(7, 68, 145, 0.1);
}

.mlp-input::placeholder {
  color: var(--text-secondary);
  opacity: 0.6;
}
```

---

## Accessibilite

**Standards minimums**
- Contraste : WCAG AA (4.5:1 pour texte normal)
- Taille tactile : Minimum 44x44px
- Focus visible : Ring de 2-3px avec offset
- Labels : Toujours visibles (pas que placeholder)
- ARIA : Utiliser aria-label, aria-describedby

**Focus states**
```css
.mlp-focusable:focus {
  outline: none;
  box-shadow: 0 0 0 3px var(--border-focus);
  border-radius: 8px;
}
```

---

## Animations

**Principes**
- Animations minimalistes uniquement
- Contexte serieux (pas d'animations decoratives)
- Feedback utilisateur seulement

```css
:root {
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;
}

/* Transitions recommandees */
.mlp-transition-colors {
  transition: background-color var(--transition-base),
              border-color var(--transition-base),
              color var(--transition-base);
}

.mlp-transition-transform {
  transition: transform var(--transition-base);
}

.mlp-transition-shadow {
  transition: box-shadow var(--transition-base);
}
```

---

## Responsive Design

**Breakpoints**
```css
/* Mobile first */
:root {
  --breakpoint-sm: 640px;   /* Tablette */
  --breakpoint-md: 768px;   /* Tablette landscape */
  --breakpoint-lg: 1024px;  /* Desktop */
  --breakpoint-xl: 1280px;  /* Large desktop */
}

/* Usage */
@media (min-width: 768px) {
  /* Tablette et plus */
}

@media (min-width: 1024px) {
  /* Desktop et plus */
}
```

**Contraintes iframe Circle.so**
- Min-width : 320px
- Optimal : 400-600px
- Scroll vertical active
- Padding mobile : 16px minimum
