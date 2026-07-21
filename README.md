# Afriatlas Travel — Frontend

Interface web de la plateforme **Afriatlas Travel**, une application de découverte touristique immersive centrée sur le Togo. Elle permet aux voyageurs d'explorer des destinations, réserver des expériences VR, gérer leurs albums photo, et aux propriétaires d'établissements de gérer leur présence sur la plateforme.

---

## Stack technique

| Couche        | Technologie                             |
| ------------- | --------------------------------------- |
| Framework     | React 18 + TypeScript                   |
| Bundler       | Vite 5 (plugin SWC)                     |
| Routing       | React Router DOM v6                     |
| State serveur | TanStack Query v5                       |
| State client  | Zustand                                 |
| UI Components | shadcn/ui (Radix UI primitives)         |
| Styling       | Tailwind CSS v3 + CSS variables         |
| Animations    | Framer Motion                           |
| Cartes        | Leaflet + React Leaflet + MarkerCluster |
| Formulaires   | React Hook Form + Zod                   |
| Paiements     | Stripe (react-stripe-js)                |
| Charts        | Recharts + Chart.js                     |
| Tests         | Vitest + Testing Library                |
| Déploiement   | Vercel                                  |

---

## Prérequis

- **Node.js** ≥ 18 (ou **Bun** ≥ 1.0)
- Backend Afriatlas lancé sur `http://localhost:8000` (voir `../backend/README.md`)
- Un compte [Stripe](https://stripe.com) pour les paiements (clé publique test suffisante en dev)

---

## Installation

```bash
# Cloner le repo (si ce n'est pas déjà fait)
git clone <url-du-repo>
cd worldAtlas-travel-main/frontend

# Installer les dépendances
npm install
# ou avec bun
bun install
```

### Variables d'environnement

Créer un fichier `.env` à la racine du dossier `frontend/` :

```env
VITE_API_URL=http://localhost:8000/api/v1
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxx
```

| Variable                 | Description                                     |
| ------------------------ | ----------------------------------------------- |
| `VITE_API_URL`           | URL de base de l'API backend                    |
| `VITE_STRIPE_PUBLIC_KEY` | Clé publique Stripe (préfixe `pk_test_` en dev) |

---

## Lancement

```bash
# Développement (hot reload sur http://localhost:8080)
npm run dev

# Build de production
npm run build

# Prévisualiser le build de production
npm run preview

# Linter
npm run lint

# Tests (single run)
npm run test

# Tests en mode watch
npm run test:watch
```

---

## Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── admin/           # Interface d'administration
│   ├── ads/             # Gestion des publicités
│   ├── albums/          # Albums photo de voyage
│   ├── auth/            # Formulaires et guards d'authentification
│   ├── bookings/        # Réservations VR
│   ├── cart/            # Panier d'achat
│   ├── catalog/         # Catalogue de lieux
│   ├── checkout/        # Tunnel de paiement
│   ├── dashboard/       # Tableau de bord utilisateur
│   ├── destinations/    # Pages de destinations
│   ├── layout/          # Navbar, Footer, BottomNav, OwnerLayout, AdminLayout
│   ├── map/             # Carte interactive Leaflet
│   ├── orders/          # Historique des commandes
│   ├── profile/         # Profil utilisateur
│   ├── tripplanification/ # Planification de voyage
│   ├── ui/              # Composants shadcn/ui générés
│   └── vr-sessions/     # Expériences VR
├── hooks/               # Hooks personnalisés
│   ├── queries/         # Hooks TanStack Query par domaine
│   ├── useAuth.ts       # Authentification
│   ├── useTokenRefresh.ts # Rafraîchissement automatique JWT
│   └── ...
├── pages/               # Pages (une par route)
│   ├── admin/           # Dashboard admin
│   ├── albums/          # Gestion albums
│   ├── auth/            # Login, Register, OAuth callback...
│   ├── bookings/        # Mes réservations
│   ├── orders/          # Mes commandes
│   ├── owner/           # Espace propriétaire
│   ├── subscription/    # Plans tarifaires et espace famille
│   └── vr-sessions/     # Sessions VR
├── stores/              # State global (Zustand)
│   └── cartStore.ts     # Panier
├── lib/                 # Utilitaires (cn, api client...)
├── providers/           # Context providers
├── constants/           # Constantes partagées
└── App.tsx              # Routeur principal + QueryClient
```

---

## Fonctionnalités principales

### Pour les visiteurs

- Exploration des destinations touristiques du Togo (Lomé, Kpalimé, Kara...)
- Catalogue de lieux : hôtels, restaurants, sites culturels
- Carte interactive avec clustering de marqueurs
- Navigation GPS vers un lieu

### Pour les utilisateurs connectés

- Tableau de bord personnalisé
- Albums photo de voyage (upload avec EXIF)
- Favoris
- Réservation de sessions VR immersives
- Panier et paiement en ligne (Stripe)
- Historique des commandes et réservations
- Planification de voyage
- Abonnement premium (individuel ou famille)

### Espace propriétaire (`/owner`)

- Dashboard avec statistiques
- Gestion des lieux et produits associés
- Gestion des sessions VR et de leurs réservations
- Suivi des réclamations de propriété

### Espace admin (`/admin`)

- Dashboard global de la plateforme
- Analytics détaillées
- Gestion des destinations, publicités et réclamations
- Revenus des propriétaires

---

## Authentification

L'application utilise des **JWT** avec rafraîchissement automatique toutes les 25 minutes (`useTokenRefresh`). Les routes protégées sont enveloppées dans `<ProtectedWrapper>`. L'accès admin/owner est géré par `<RoleGuard>`.

Les flux supportés :

- Email / mot de passe
- OAuth Google & Facebook (`/auth/callback`)
- Vérification email et réinitialisation de mot de passe

---

## Déploiement (Vercel)

Le fichier `vercel.json` configure un rewrite SPA — toutes les routes redirigent vers `index.html` :

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Pour déployer :

```bash
# Installer Vercel CLI si nécessaire
npm i -g vercel

vercel --prod
```

Penser à définir les variables d'environnement `VITE_API_URL` et `VITE_STRIPE_PUBLIC_KEY` dans les settings du projet Vercel.

---

## Design system

Les tokens de design (couleurs, typographie, espacements) sont définis en CSS variables dans `src/index.css` et exposés dans `tailwind.config.ts`. Les polices utilisées sont :

- **Cormorant Garamond** — titres (`font-heading`)
- **DM Sans** — corps de texte (`font-body`, `font-sans`)
- **Mate SC** — affichage display (`font-display`)
- **DM Mono** — code (`font-mono`)

Les composants UI sont issus de [shadcn/ui](https://ui.shadcn.com) (base color : Slate) et personnalisés via les CSS variables du thème.

---

## Licence

Propriétaire — AfriAtlas Travel
