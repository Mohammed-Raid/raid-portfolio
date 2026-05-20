# Raid Portfolio — v3.3

Portfolio personnel de **Mohamed Raid Abadou** — M2 ESET, ingénieur en systèmes embarqués.
React + Vite + TypeScript + Tailwind + Framer Motion. Contenu enrichi après audit technique.

## Stack technique

- React 18 + TypeScript + Vite 6
- Tailwind CSS (palette éditoriale ink / signal-red / cobalt)
- Framer Motion (scroll-triggers, view transitions, layouts)
- Lenis (smooth scroll, gated par tier de l'appareil)
- React Router v6 + View Transitions API

## Pages

| Route | Contenu |
|---|---|
| `/` | Hero, manifesto kinetic, 7 projets featured, contact teaser |
| `/work` | Index complet des projets — cartes tilt 3D |
| `/work/:slug` | Étude de cas par projet |
| `/stack` | Inventaire technique 80+ entrées filtrable (LANG, MCU, RTOS, DSP, FPGA, RF, NET, BUS, EDA, BUILD, LAB, HW, SENS, AI, METH, QA, SEC) |
| `/about` | Bio, chiffres, langues, secteurs cibles, soft skills, timeline |
| `/contact` | Formulaire mailto + canaux directs |

## Performance adaptive

Détection automatique du tier (high / mid / low) :
- `hardwareConcurrency`, `deviceMemory`, `prefers-reduced-motion`, `saveData`
- Probe FPS runtime sur 60 frames
- Désactivations progressives : cursor follower, Lenis, tilt 3D, blur, animations infinies

**Code splitting** : initial JS ~18 KB gzipped. Chunks séparés pour React, Framer Motion, Lenis.

## Lancer en local (Windows / Mac / Linux)

Prérequis : Node.js 18+ installé.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production
npm run preview  # tester le build
```

## Déployer sur Vercel

1. Push sur GitHub
2. Importer le repo sur [vercel.com](https://vercel.com)
3. Framework preset : Vite (auto-détecté)
4. `vercel.json` inclus gère les rewrites SPA

## Personnaliser le contenu

Tout vit dans **`src/data/portfolio.ts`** — projets (WORK), stack (STACK), secteurs (SECTORS),
parcours (TIMELINE), profil (PROFILE), contact (CONTACT). Modifier ce fichier suffit.

## Mises à jour futures

```bash
git add .
git commit -m "Update content"
git push
```
Vercel redéploie automatiquement.

© 2026 — Mohamed Raid Abadou
