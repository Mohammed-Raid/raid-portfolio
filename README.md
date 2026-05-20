# Raid Portfolio — v3.2 Adaptive Edition

Portfolio personnel de **Mohamed Raid Abadou** — M2 ESET, ingénieur en systèmes embarqués.
React + Vite + TypeScript + Tailwind + Framer Motion avec direction éditoriale, animations cinématiques **et tier-adaptation pour appareils faibles**.

## Nouveautés v3.2 — Performance adaptive

Détection automatique du tier de l'appareil (high / mid / low) basée sur :
- `navigator.hardwareConcurrency` (nombre de cœurs CPU)
- `navigator.deviceMemory` (RAM)
- `navigator.connection.saveData` et `effectiveType`
- `prefers-reduced-motion`
- Probe FPS runtime sur 60 frames

**Désactivations par tier :**

| Effet | High | Mid | Low |
|---|---|---|---|
| Cursor follower | ✓ | — | — |
| Lenis smooth scroll | ✓ | ✓ (léger) | — (scroll natif) |
| Magnetic buttons | ✓ | — | — |
| Tilt 3D cards | ✓ | — | — |
| Char-scrubbed kinetic text | ✓ | — (fade simple) | — (fade simple) |
| Velocity-driven marquee skew | ✓ | — | — |
| Marquee scroll-parallax | ✓ | — | — |
| Animated blueprint grid | ✓ | static | hidden |
| Grain SVG noise overlay | ✓ | — | — |
| `backdrop-filter` blur (nav) | ✓ | solid bg | solid bg |
| Page transitions blur+slide | ✓ | opacity only | opacity only |
| Boot screen duration | 1.8s | 0.9s | 0.9s |
| Scroll progress bar | ✓ | ✓ | — |
| Hover decorations (line-by-line) | ✓ | static | static |

**Code splitting :**
- Initial JS : **15 KB gzipped** (au lieu de 116 KB)
- Pages secondaires chargées à la demande
- React, Framer Motion, Lenis dans des chunks séparés
- Lenis pas téléchargé du tout sur low-tier

## Stack

- **React 18** + **TypeScript** + **Vite 6**
- **Tailwind CSS** (config sur mesure, palette ink/signal/cobalt)
- **Framer Motion** (scroll-triggers, layout animations, presence)
- **Lenis** (smooth scrolling)
- **React Router v6** (SPA multi-pages) avec **View Transitions API** pour morph entre routes
- **Lucide React** (icônes)

## Pages

| Route | Contenu |
|---|---|
| `/` | Hero massif · manifesto · projets featured · contact teaser |
| `/work` | Index des projets — grille éditoriale |
| `/work/:slug` | Étude de cas détaillée par projet |
| `/stack` | Inventaire technique filtrable par catégorie |
| `/about` | Bio, chiffres, timeline parcours |
| `/contact` | Formulaire + canaux directs |

## Lancer en local

```bash
# Prérequis : Node ≥ 18
pnpm install     # ou: npm install / yarn install
pnpm dev         # serveur sur http://localhost:5173
pnpm build       # build prod dans /dist
pnpm preview     # tester le build
```

## Déploiement sur Vercel

1. Push ce dossier sur un repo GitHub.
2. Sur [vercel.com](https://vercel.com) → **New Project** → importer le repo.
3. Framework preset : **Vite** (détecté automatiquement).
4. Build command : `pnpm build` · Output : `dist`
5. Le fichier `vercel.json` gère les rewrites SPA.

Déploiement aussi compatible Netlify, Cloudflare Pages, GitHub Pages.

## Animations utilisées

- **View Transitions API** — morph entre pages (Chromium uniquement, fallback gracieux)
- **Framer Motion** :
  - `whileInView` avec stagger pour reveal cinématiques
  - `layoutId` pour l'indicateur de navigation
  - `useScroll` + `useTransform` pour parallax hero et marquees
  - `useSpring` pour magnétisme des boutons
  - `AnimatePresence` pour transitions de pages
- **Custom** :
  - Boot screen avec count-up
  - Marquee scroll-driven
  - Oscilloscope SVG animé en `pathLength`
  - Curseur natif conservé (pas de cursor custom)

## Personnalisation

Tout le contenu vit dans **`src/data/portfolio.ts`** — projets, stack, timeline, contact. Modifier ce fichier suffit pour mettre à jour les pages.

Les couleurs/typo sont dans **`tailwind.config.js`** + **`src/index.css`** (variables CSS).

## Mobile / responsive

- Breakpoints Tailwind par défaut (`sm`, `md`, `lg`)
- Menu mobile fullscreen avec animation `clipPath: circle()` 
- Inputs en `font-size: 16px` minimum pour éviter le zoom iOS
- Grain et particles allégés sur petit écran
- `prefers-reduced-motion` respecté partout

## Accessibilité

- Focus rings personnalisés (dashed signal-red)
- Tous les liens ont une cible visible
- Contrastes vérifiés sur thème clair et sombre
- `aria-label` sur les boutons icônes
- Reduced motion désactive Lenis et les animations longues

## Structure

```
src/
  components/       Nav, Footer, SectionTitle, Marquee, Magnetic, …
  pages/            Home, Work, WorkDetail, Stack, About, Contact, NotFound
  hooks/            useLenis, useTheme
  lib/              utils (cn, withViewTransition)
  data/             portfolio.ts (single source of truth)
  index.css         globals + Tailwind directives + view transitions
  main.tsx          entry
  App.tsx           routes + boot + layout shell
```

## Licence

Code privé. Contenu propriété de Mohamed Raid Abadou.
