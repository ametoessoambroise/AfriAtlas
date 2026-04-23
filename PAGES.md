# 🌍 WorldAtlas — Plan Complet des Interfaces Frontend

> Document de référence pour la création de toutes les pages et composants.  
> Organisé par **rôle utilisateur** et découpé en **phases de création**.

---

## Légende

| Badge  | Signification                     |
| ------ | --------------------------------- |
| `[P0]` | Déjà implémenté (live)            |
| `[P1]` | Prioritaire — fort impact         |
| `[P2]` | Important — complète l'expérience |
| `[P3]` | Nice-to-have                      |
| `🔒`   | Auth requise                      |
| `👑`   | Owner uniquement                  |
| `⚙️`   | Admin uniquement                  |
| `🤖`   | IA — Premium/Family               |
| `🗺️`   | Géolocalisation temps réel        |
| `💳`   | Paiement Stripe                   |

---

## 📐 Architecture Globale

```
src/
├── pages/
│   ├── public/          ← Accessible sans connexion
│   ├── auth/            ← Login, Register, Reset...
│   ├── user/            ← 🔒 Utilisateur connecté
│   ├── owner/           ← 🔒👑 Propriétaire de lieu
│   └── admin/           ← 🔒⚙️ Administrateur
│
├── components/
│   ├── shared/          ← Composants réutilisables
│   ├── layout/          ← Navbar, Sidebar, Footer, BottomNav
│   └── ui/              ← Boutons, Modales, Forms...
│
└── guards/
    ├── AuthGuard.tsx
    ├── OwnerGuard.tsx
    └── AdminGuard.tsx
```

---

---

# 🌐 PARTIE 1 — PAGES PUBLIQUES

---

## PHASE 1 : Page d'Accueil `/`

**Objectif** : Première impression, découverte de la plateforme.

### Composants à créer

| Composant                  | Description                                                             |
| -------------------------- | ----------------------------------------------------------------------- |
| `<HeroSection />`          | Vidéo ou image plein écran, titre accrocheur, barre de recherche rapide |
| `<FeaturedDestinations />` | Grille de destinations mises en avant (`is_featured: true`)             |
| `<LiveStats />`            | Compteurs animés : nb de destinations, utilisateurs, avis               |
| `<CategoryFilter />`       | Filtres rapides par type de lieu (Restaurant, Hôtel, Musée...)          |
| `<TestimonialsSection />`  | Témoignages utilisateurs, carrousel                                     |
| `<CtaBanner />`            | Appel à l'action : S'inscrire / Voir les plans                          |

### Hooks & Endpoints

```ts
usePlaces({ is_featured: true }); // GET /api/v1/places?is_featured=true
useGlobalStats(); // GET /api/v1/analytics/analytics/global
```

### États à gérer

- Chargement des destinations (skeleton)
- Erreur réseau (fallback gracieux)
- Animation au scroll (intersection observer)

---

## PHASE 2 : Page des Destinations `/destinations`

**Objectif** : Explorer et filtrer toutes les destinations disponibles.

### Composants à créer

| Composant             | Description                                               |
| --------------------- | --------------------------------------------------------- |
| `<SearchBar />`       | Recherche full-text avec debounce 300ms                   |
| `<FilterPanel />`     | Filtres : catégorie, ville, budget, note moyenne          |
| `<DestinationGrid />` | Grille responsive de cards (3 colonnes desktop, 1 mobile) |
| `<DestinationCard />` | Image, nom, catégorie, note, bouton `<FavoriteButton />`  |
| `<Pagination />`      | Navigation entre pages de résultats                       |
| `<SortSelect />`      | Trier par : popularité, note, distance, récent            |
| `<EmptyState />`      | Message si aucun résultat trouvé                          |

### Hooks & Endpoints

```ts
usePlaces({ search, category, city, page }); // GET /api/v1/places
usePlaceSearch(query); // GET /api/v1/places/search?q=
```

### États à gérer

- URL params synchronisés avec les filtres (React Router searchParams)
- Skeleton loading pendant la requête
- Réinitialisation des filtres

---

## PHASE 3 : Page Détail Destination `/destinations/:slug`

**Objectif** : Page fiche complète d'un lieu (hub central de l'app).

### Composants à créer

| Composant               | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| `<PlaceHero />`         | Galerie photos (lightbox), nom, catégorie, adresse, note     |
| `<PlaceInfoPanel />`    | Horaires, budget moyen, langues, site web, téléphone         |
| `<PlaceDescription />`  | Description longue, tags, équipements                        |
| `<ReviewSection />`     | Avis clients + `<ReviewForm />` pour les connectés           |
| `<SimilarPlaces />`     | Carrousel de lieux similaires                                |
| `<VrSessionCalendar />` | Calendrier des sessions VR disponibles + bouton réserver     |
| `<FavoriteButton />`    | Toggle favori (cœur) — `🔒` requis                           |
| `<AlbumPickerModal />`  | Associer ce lieu à un album — `🔒` requis                    |
| `<AnalyticsTracker />`  | Tracker silencieux monté au mount (`POST /analytics/visits`) |
| `<NavigateButton />`    | Bouton "Lancer l'itinéraire" → redirige vers `/map/:slug`    |

### Hooks & Endpoints

```ts
usePlace(slug); // GET /api/v1/places/{slug}
usePlaces(); // GET /api/v1/places (pour "similaires")
useVrSessions(slug); // GET /api/v1/vr-sessions?slug=
```

---

## PHASE 4 : Page Catalogue du Lieu `/destinations/:slug/catalog`

**Objectif** : Voir les produits/menu/chambres d'un lieu et les ajouter au panier.

### Composants à créer

| Composant              | Description                                                 |
| ---------------------- | ----------------------------------------------------------- |
| `<CatalogHeader />`    | Nom du lieu, catégorie catalog (retail / menu / hôtel)      |
| `<CategoryTabs />`     | Onglets par catégorie de produits                           |
| `<ProductGrid />`      | Grille de produits avec prix, stock, image                  |
| `<ProductCard />`      | Image, nom, prix, disponibilité, bouton "Ajouter au panier" |
| `<CartSidebar />`      | Panier latéral glissant (drawer) avec récapitulatif         |
| `<CartIcon />`         | Icône panier dans le header avec badge compteur             |
| `<QuantitySelector />` | Sélecteur +/- quantité sur la card                          |
| `<OutOfStockBadge />`  | Badge rouge "Rupture de stock"                              |

### Hooks & Endpoints

```ts
usePlace(slug); // GET /api/v1/places/{slug}
usePlaceProducts(slug); // GET /api/v1/products?place_slug=
useCart(); // State local (Zustand/Context)
```

### États à gérer

- Panier persistant (Context global sécurisé)
- Animation ajout au panier (micro-interaction)
- Produits épuisés non cliquables
- Synchronisation avec le backend(je vais te fournir les endpoints, l'interface et les types)

---

## PHASE 5 : Page Carte Interactive `/carte`

**Objectif** : Explorer tous les lieux sur une carte Leaflet.

### Composants à créer

| Composant             | Description                                         |
| --------------------- | --------------------------------------------------- |
| `<MapContainer />`    | Carte Leaflet plein écran                           |
| `<PlaceMarker />`     | Marker coloré selon le type de lieu                 |
| `<PlacePopup />`      | Popup au clic : nom, image miniature, bouton "Voir" |
| `<MapFilters />`      | Panel de filtres flottant sur la carte              |
| `<ClusterLayer />`    | Regroupement de markers (MarkerCluster)             |
| `<UserLocationDot />` | Point bleu position utilisateur si autorisé         |

### Hooks & Endpoints

```ts
usePlaces({ page_size: 200 }); // GET /api/v1/places?page_size=200
```

---

## PHASE 6 : Page Navigation Temps Réel `/map/:slug` 🗺️

**Objectif** : Lancer un itinéraire vers un lieu, à la manière de Google Maps.

### Composants à créer

| Composant                | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| `<NavigationMap />`      | Carte Leaflet avec tracé de l'itinéraire                 |
| `<RoutePanel />`         | Panneau latéral : destination, durée estimée, distance   |
| `<TravelModeSelector />` | Icônes : 🚶 à pied / 🚗 voiture / 🚴 vélo / 🚌 transport |
| `<EtaDisplay />`         | Heure d'arrivée estimée, mise à jour en temps réel       |
| `<UserTracker />`        | Géolocalisation watchPosition() — point bleu animé       |
| `<RouteProgress />`      | Barre de progression de l'itinéraire                     |
| `<RerouteAlert />`       | Notification si l'utilisateur s'écarte du chemin         |
| `<ArrivalBanner />`      | Bannière "Vous êtes arrivé !"                            |

### Logique technique

```ts
// Géolocalisation temps réel
navigator.geolocation.watchPosition(callback, error, {
  enableHighAccuracy: true,
  maximumAge: 5000,
  timeout: 10000,
});

// Calcul d'itinéraire (OSRM ou Leaflet Routing Machine)
import L from "leaflet";
import "leaflet-routing-machine";

// Mise à jour de la position toutes les 5s
// Recalcul de l'ETA à chaque mise à jour
// Alerte si déviation > 50m du tracé
```

### Données requises

```ts
usePlace(slug); // Coordonnées de destination
// Position utilisateur via Web Geolocation API
// Routage via OSRM public API ou Leaflet Routing Machine
```

---

---

# 🔑 PARTIE 2 — AUTHENTIFICATION

---

## PHASE 7 : Pages Auth (`/login`, `/register`, `/forgot-password`, `/reset-password`, `/verify-email`)

### Page Login `/login`

| Composant                | Description                          |
| ------------------------ | ------------------------------------ |
| `<LoginForm />`          | Email + mot de passe, validation Zod |
| `<OAuthButtons />`       | Boutons Google / Facebook OAuth      |
| `<RememberMe />`         | Checkbox "Se souvenir de moi"        |
| `<ForgotPasswordLink />` | Lien vers `/forgot-password`         |

### Page Register `/register`

| Composant              | Description                                     |
| ---------------------- | ----------------------------------------------- |
| `<RegisterForm />`     | Prénom, nom, email, mot de passe, confirmation  |
| `<PasswordStrength />` | Indicateur visuel de force du mot de passe      |
| `<TermsCheckbox />`    | Acceptation CGU et politique de confidentialité |
| `<OAuthButtons />`     | Inscription via Google / Facebook               |

### Autres pages auth

| Page               | Composants principaux                                      |
| ------------------ | ---------------------------------------------------------- |
| `/forgot-password` | `<EmailForm />`, message de confirmation envoyé            |
| `/reset-password`  | `<NewPasswordForm />` (token en query param), confirmation |
| `/verify-email`    | Spinner, message succès/erreur, redirection auto           |

### Endpoints

```ts
POST /api/v1/auth/auth/login
POST /api/v1/auth/auth/register
POST /api/v1/auth/auth/forgot-password
POST /api/v1/auth/auth/reset-password
GET  /api/v1/auth/auth/verify-email?token=
```

---

---

# 👤 PARTIE 3 — ESPACE UTILISATEUR `🔒`

---

## PHASE 8 : Panier & Commande `/cart` + `/checkout` + `/checkout/confirm` 💳

**Objectif** : Finaliser un achat depuis le panier.

### Page Panier `/cart`

| Composant            | Description                                        |
| -------------------- | -------------------------------------------------- |
| `<CartItemList />`   | Liste des produits avec image, nom, prix, quantité |
| `<QuantityEditor />` | Modifier la quantité ou supprimer un article       |
| `<CartSummary />`    | Sous-total, frais, total TTC                       |
| `<PromoCodeInput />` | Champ code promo (optionnel)                       |
| `<CheckoutButton />` | Bouton "Passer la commande" → `/checkout`          |
| `<EmptyCart />`      | État panier vide avec suggestion de destinations   |

### Page Checkout `/checkout` 💳

| Composant               | Description                                          |
| ----------------------- | ---------------------------------------------------- |
| `<OrderSummary />`      | Récapitulatif produits commandés                     |
| `<DeliveryForm />`      | Adresse de livraison (si applicable)                 |
| `<StripePaymentForm />` | Intégration Stripe Elements (carte, Apple Pay, etc.) |
| `<OrderTotalPanel />`   | Total final avant confirmation                       |
| `<PlaceOrderButton />`  | Bouton "Confirmer et payer"                          |

### Page Confirmation `/checkout/confirm`

| Composant            | Description                                           |
| -------------------- | ----------------------------------------------------- |
| `<SuccessBanner />`  | Animation succès, numéro de commande                  |
| `<OrderReceipt />`   | Détail de la commande confirmée                       |
| `<NextStepsPanel />` | Liens : "Voir mes commandes" / "Continuer mes achats" |

### Endpoints

```py
GET /orders → list current user's orders with optional status filter
POST /orders → create a new order with Stripe payment
GET /orders/{order_id} → get order detail with items
POST /orders/{order_id}/cancel → cancel order and refund
```

---

## PHASE 9 : Dashboard Utilisateur `/dashboard`

**Objectif** : Vue synthétique de l'activité de l'utilisateur.

### Composants à créer

| Composant                    | Description                                                   |
| ---------------------------- | ------------------------------------------------------------- |
| `<WelcomeBanner />`          | "Bonjour [Prénom]", avatar, plan actuel                       |
| `<StatsRow />`               | Cartes : nb favoris, nb albums, nb commandes, nb réservations |
| `<RecentFavorites />`        | 4 dernières destinations favorites                            |
| `<RecentOrders />`           | 3 dernières commandes avec statut                             |
| `<ActiveSubscriptionCard />` | Plan actuel, date renouvellement, bouton gérer                |
| `<QuickActions />`           | Raccourcis : Explorer, Créer album, Réserver VR               |

### Endpoints

```ts
GET / api / v1 / auth / auth / me;
GET / api / v1 / users / users / me / dashboard;
```

---

## PHASE 10 : Profil Utilisateur `/profile` + `/profile/edit` + `/profile/avatar`

### Page Profil `/profile`

| Composant               | Description                                       |
| ----------------------- | ------------------------------------------------- |
| `<ProfileHeader />`     | Avatar, nom, email, plan actuel, date inscription |
| `<ProfileStats />`      | Favoris, albums, commandes, réservations          |
| `<EditProfileButton />` | Lien vers `/profile/edit`                         |

### Page Édition `/profile/edit`

| Composant          | Description                                       |
| ------------------ | ------------------------------------------------- |
| `<ProfileForm />`  | Modifier prénom, nom, email, langues préférées    |
| `<AvatarUpload />` | Upload avatar — prévisualisation avant sauvegarde |
| `<SaveButton />`   | Bouton sauvegarder avec feedback visuel           |
| `<DangerZone />`   | Section : changer mot de passe, supprimer compte  |

### Endpoints

```ts
GET / api / v1 / auth / auth / me;
PUT / api / v1 / users / users / me;
POST / api / v1 / users / users / me / avatar; // FormData
```

---

## PHASE 11 : Paramètres `/settings`

**Objectif** : Régler les préférences personnelles.

### Composants à créer

| Composant                 | Description                                             |
| ------------------------- | ------------------------------------------------------- |
| `<SettingsNav />`         | Navigation entre sections (sidebar)                     |
| `<LanguageSelector />`    | Sélectionner langue de l'interface                      |
| `<NotificationsPanel />`  | Activer/désactiver types de notifications (email, push) |
| `<PrivacyPanel />`        | Visibilité du profil, partage de données                |
| `<SecurityPanel />`       | Changer mot de passe, sessions actives                  |
| `<LogoutAllButton />`     | Déconnecter tous les appareils (`POST /logout-all`)     |
| `<DeleteAccountButton />` | Supprimer le compte — double confirmation modale        |
| `<ThemeToggle />`         | Mode clair / sombre                                     |

---

## PHASE 12 : Favoris `/favorites`

### Composants à créer

| Composant             | Description                               |
| --------------------- | ----------------------------------------- |
| `<FavoritesGrid />`   | Grille des destinations sauvegardées      |
| `<DestinationCard />` | Réutilisé, avec bouton retrait favori     |
| `<EmptyFavorites />`  | État vide — CTA explorer les destinations |
| `<Pagination />`      | Navigation entre pages                    |

### Endpoints

```ts
GET / api / v1 / users / users / me / favorites;
DELETE / api / v1 / destinations / destinations / { id } / favorite;
```

---

## PHASE 13 : Albums Photos `/albums` 🤖

### Page Liste `/albums`

| Composant               | Description                                         |
| ----------------------- | --------------------------------------------------- |
| `<AlbumsGrid />`        | Grille des albums avec couverture, titre, nb photos |
| `<AlbumCard />`         | Miniature, titre, description courte, date          |
| `<CreateAlbumButton />` | Bouton flottant "+" → `/albums/new`                 |
| `<EmptyAlbums />`       | État vide avec photos unsplash en grid et avec CTA créer son premier album          |

### Page Création `/albums/new`

| Composant         | Description                             |
| ----------------- | --------------------------------------- |
| `<AlbumForm />`   | Titre, description, image de couverture |
| `<CoverUpload />` | Upload image de couverture              |

### Page Détail `/albums/:id`

| Composant                    | Description                                       |
| ---------------------------- | ------------------------------------------------- |
| `<AlbumHeader />`            | Couverture, titre, description, date création     |
| `<PhotoGallery />`           | Galerie masonry des photos, lightbox au clic      |
| `<PhotoUploadZone />`        | Zone drag & drop pour ajouter des photos          |
| `<AssociatedPlaces />`       | Lieux associés à l'album                          |
| `<AddPlaceButton />`         | Ouvre `<AlbumPickerModal />`                      |
| `<AiStoryPanel />` 🤖        | Récit IA généré, bouton "Générer" (SSE streaming) |
| `<AiDescriptionButton />` 🤖 | Générer titre/description automatiquement         |
| `<PremiumGate />`            | Verrouillage si plan insuffisant                  |

### Endpoints

```ts
GET / api / v1 / albums / albums;
POST / api / v1 / albums / albums;
GET / api / v1 / albums / albums / { id };
PUT / api / v1 / albums / albums / { id };
POST / api / v1 / albums / albums / { id } / images; // FormData
POST / api / v1 / albums / albums / { id } / places;
POST / api / v1 / albums / albums / { id } / generate - story; // SSE streaming 🤖
POST / api / v1 / albums / albums / { id } / generate - description; // 🤖
```

---

## PHASE 14 : Réservations VR `/vr-sessions` + `/bookings`

### Page Sessions VR `/vr-sessions`

| Composant               | Description                                      |
| ----------------------- | ------------------------------------------------ |
| `<VrSessionCalendar />` | Calendrier des sessions disponibles              |
| `<SessionCard />`       | Date, heure, durée, lieu, prix, places restantes |
| `<BookButton />`        | Réserver → `/vr-sessions/:id/book`               |
| `<FilterByPlace />`     | Filtrer par lieu                                 |

### Page Réservation `/vr-sessions/:id/book` 💳

| Composant               | Description                     |
| ----------------------- | ------------------------------- |
| `<SessionSummary />`    | Détail de la session choisie    |
| `<BookingForm />`       | Nb de participants, coordonnées |
| `<StripePaymentForm />` | Paiement sécurisé               |
| `<ConfirmButton />`     | Confirmer la réservation        |

### Page Mes Réservations `/bookings`

| Composant               | Description                                 |
| ----------------------- | ------------------------------------------- |
| `<BookingsList />`      | Liste avec filtres (à venir, passé, annulé) |
| `<BookingCard />`       | Session, date, lieu, statut, montant        |
| `<BookingDetailPage />` | QR code, statut paiement, bouton annuler    |

### Endpoints

```ts
GET  /api/v1/vr-sessions?slug=
POST /api/v1/vr-sessions/{id}/book
GET  /api/v1/bookings/bookings
GET  /api/v1/bookings/bookings/{id}
POST /api/v1/bookings/bookings/{id}/cancel
```

---

## PHASE 15 : Commandes `/orders`

| Composant         | Description                                           |
| ----------------- | ----------------------------------------------------- |
| `<OrdersList />`  | Historique avec filtres statut                        |
| `<OrderCard />`   | Date, lieu, montant, statut livraison                 |
| `<OrderDetail />` | Items commandés, adresse, timeline livraison          |
| `<StatusBadge />` | Badge coloré : En attente / Confirmé / Livré / Annulé |

---

## PHASE 16 : Abonnement & Famille `/subscription` + `/family`

### Page Plans `/subscription`

| Composant                | Description                                       |
| ------------------------ | ------------------------------------------------- |
| `<PricingTable />`       | Comparaison 3 plans : Gratuit / Premium / Famille |
| `<CurrentPlanBadge />`   | Plan actuel mis en avant                          |
| `<StripeBuyButton />` 💳 | Souscrire / Upgrader                              |
| `<CancelButton />`       | Résilier avec modale de confirmation              |
| `<FeatureList />`        | Détail des fonctionnalités par plan               |

### Page Famille `/family`

| Composant              | Description                                       |
| ---------------------- | ------------------------------------------------- |
| `<FamilyMemberList />` | Liste des membres du groupe (avatar, nom, statut) |
| `<InviteMemberForm />` | Champ email + bouton "Inviter"                    |
| `<PendingInvites />`   | Invitations en attente                            |
| `<FamilyCreateForm />` | Créer un groupe (Plan Family requis)              |
| `<LeaveGroupButton />` | Quitter le groupe familial                        |

---

---

# 👑 PARTIE 4 — ESPACE PROPRIÉTAIRE `🔒👑`

> Layout dédié : sidebar owner + header avec sélecteur de lieu actif.

---

## PHASE 17 : Dashboard Owner `/owner/dashboard`

| Composant            | Description                                      |
| -------------------- | ------------------------------------------------ |
| `<OwnerWelcome />`   | Nom du propriétaire, nb de lieux gérés           |
| `<KpiRow />`         | Cartes : vues totales, favoris, avis, revenus VR |
| `<RevenueChart />`   | Graphique revenus sur 30 jours                   |
| `<ViewsChart />`     | Graphique vues par jour                          |
| `<PlaceSwitcher />`  | Sélecteur du lieu dont voir les stats            |
| `<RecentBookings />` | 5 dernières réservations VR                      |
| `<AlertsPanel />`    | Stocks faibles, avis récents, revendications     |

---

## PHASE 18 : Gestion du Lieu `/owner/places/:slug/edit`

**Objectif** : L'owner modifie les détails de son lieu.

| Composant                 | Description                                                  |
| ------------------------- | ------------------------------------------------------------ |
| `<PlaceEditForm />`       | Modifier : nom, description, catégorie, adresse, coordonnées |
| `<HoursEditor />`         | Horaires par jour de la semaine (ouvert/fermé + horaires)    |
| `<BudgetSelector />`      | Budget moyen (€ / €€ / €€€ / €€€€)                           |
| `<TagsEditor />`          | Ajouter/retirer des tags                                     |
| `<ContactEditor />`       | Téléphone, email, site web                                   |
| `<ImageGalleryManager />` | Voir, réordonner, supprimer les images existantes            |
| `<ImageUploadZone />`     | Upload nouvelles images (drag & drop, multi)                 |
| `<SaveChangesButton />`   | Sauvegarder avec feedback                                    |
| `<DeletePlaceButton />`   | Supprimer le lieu — double confirmation                      |

---

## PHASE 19 : Gestion des Produits `/owner/products`

### Liste des Produits `/owner/products`

| Composant                | Description                                                      |
| ------------------------ | ---------------------------------------------------------------- |
| `<ProductsTable />`      | Tableau : image, nom, prix, catégorie, stock, statut             |
| `<StockBadge />`         | Indicateur coloré : En stock / Faible / Rupture                  |
| `<QuickEditRow />`       | Modifier prix et stock directement dans le tableau (inline edit) |
| `<ToggleActiveSwitch />` | Activer/désactiver un produit                                    |
| `<FilterByCategory />`   | Filtrer par catégorie de produit                                 |
| `<AddProductButton />`   | CTA → `/owner/products/create`                                   |

### Créer/Modifier Produit `/owner/products/create` & `/owner/products/:id/edit`

| Composant                | Description                                       |
| ------------------------ | ------------------------------------------------- |
| `<ProductForm />`        | Nom, description, prix, catégorie, unité, TVA     |
| `<StockManager />`       | Quantité en stock, seuil d'alerte, statut rupture |
| `<ProductImageUpload />` | Upload images produit (multi)                     |
| `<PriceEditor />`        | Prix normal + prix promo (optionnel)              |
| `<AvailabilityToggle />` | Rendre le produit visible/invisible               |

### Endpoints

```ts
GET / api / v1 / products;
POST / api / v1 / products;
PUT / api / v1 / products / { id };
POST / api / v1 / products / { id } / images;
DELETE / api / v1 / products / { id };
```

---

## PHASE 20 : Sessions VR Owner `/owner/vr-sessions`

### Liste des Sessions

| Composant                | Description                                             |
| ------------------------ | ------------------------------------------------------- |
| `<VrSessionsTable />`    | Tableau : date, heure, lieu, prix, places, réservations |
| `<CalendarView />`       | Vue calendrier des sessions (toggle liste/calendrier)   |
| `<SessionStatusBadge />` | À venir / En cours / Passé / Annulé                     |
| `<ExportCsvButton />`    | Exporter les réservations en CSV                        |

### Créer/Modifier Session

| Composant                 | Description                                             |
| ------------------------- | ------------------------------------------------------- |
| `<VrSessionForm />`       | Date, heure début/fin, durée, lieu, prix, nb places max |
| `<RecurrenceEditor />`    | Répéter la session (hebdo, quotidien) — optionnel       |
| `<PlaceSelector />`       | Choisir parmi ses lieux                                 |
| `<CancelSessionButton />` | Annuler une session (avec notification aux réservants)  |

### Réservations d'une session `/owner/vr-sessions/:id/bookings`

| Composant                | Description                                        |
| ------------------------ | -------------------------------------------------- |
| `<BookingsTable />`      | Liste des réservants : nom, email, statut paiement |
| `<AttendanceCheckbox />` | Marquer la présence                                |
| `<ExportButton />`       | Exporter liste en CSV/PDF                          |

---

## PHASE 21 : Revendications de Lieux `/owner/claims`

| Composant              | Description                                               |
| ---------------------- | --------------------------------------------------------- |
| `<ClaimsList />`       | Mes demandes avec statut : En attente / Approuvé / Rejeté |
| `<ClaimStatusBadge />` | Badge coloré selon statut                                 |
| `<ClaimDetailPanel />` | Détail demande + commentaire admin                        |
| `<NewClaimForm />`     | Choisir un lieu existant + uploader justificatifs         |
| `<FileUploadZone />`   | Upload documents justificatifs                            |

---

---

# ⚙️ PARTIE 5 — ESPACE ADMINISTRATEUR `🔒⚙️`

> Layout dédié : full-screen, sidebar togglagnle.

---

## PHASE 22 : Dashboard Admin `/admin/dashboard`

| Composant                | Description                                                |
| ------------------------ | ---------------------------------------------------------- |
| `<PlatformKpis />`       | Cartes : total users, lieux, revenus, réservations actives |
| `<RevenueByOwner />`     | Tableau revenus générés par owner (top 10)                 |
| `<UsersGrowthChart />`   | Graphique inscriptions par semaine/mois                    |
| `<BookingsChart />`      | Graphique réservations VR dans le temps                    |
| `<PendingClaimsAlert />` | Nombre de revendications en attente, lien direct           |
| `<RecentActivity />`     | Fil d'activité récente (nouveaux users, lieux, avis)       |

---

## PHASE 23 : Analytics Global `/admin/analytics`

| Composant                 | Description                                   |
| ------------------------- | --------------------------------------------- |
| `<DateRangePicker />`     | Sélecteur de période (7j, 30j, 90j, custom)   |
| `<VisitsChart />`         | Graphique visites par jour                    |
| `<SearchTrendsChart />`   | Top recherches (bar chart)                    |
| `<FavoritesChart />`      | Favoris ajoutés dans le temps                 |
| `<TopDestinations />`     | Classement des destinations les plus visitées |
| `<GeoHeatmap />`          | Heatmap géographique des visites              |
| `<PlanDistributionPie />` | Répartition Gratuit / Premium / Famille       |

---

## PHASE 24 : Gestion des Destinations `/admin/destinations`

| Composant                  | Description                                         |
| -------------------------- | --------------------------------------------------- |
| `<DestinationsTable />`    | Tableau : nom, catégorie, owner, vérifiée, featured |
| `<FeaturedToggle />`       | Toggle is_featured inline                           |
| `<VerifiedToggle />`       | Toggle is_verified inline                           |
| `<DestinationSearch />`    | Recherche par nom, ville, slug                      |
| `<EditDestinationModal />` | Modifier traductions, featured, verified            |
| `<BulkActions />`          | Actions groupées : vérifier, featured, supprimer    |

---

## PHASE 25 : Gestion des Revendications `/admin/claims`

| Composant           | Description                                 |
| ------------------- | ------------------------------------------- |
| `<ClaimsQueue />`   | File des demandes en attente, tri par date  |
| `<ClaimCard />`     | Owner demandant, lieu concerné, documents   |
| `<ReviewPanel />`   | Voir justificatifs + champ commentaire      |
| `<ApproveButton />` | Approuver → `PUT /admin/claims/{id}/status` |
| `<RejectButton />`  | Rejeter avec raison obligatoire             |
| `<ClaimsHistory />` | Historique des revendications traitées      |

---

## PHASE 26 : Gestion des Publicités `/admin/ads`

| Composant            | Description                                              |
| -------------------- | -------------------------------------------------------- |
| `<AdsTable />`       | Campagnes actives/inactives : lieu, image, dates, budget |
| `<AdStatusToggle />` | Activer/désactiver une campagne                          |
| `<CreateAdForm />`   | Lieu cible, image, date début/fin, budget, CTA           |
| `<AdPreview />`      | Aperçu rendu de la publicité                             |
| `<AdMetrics />`      | Impressions, clics, CTR par campagne                     |

---

## PHASE 27 : Analytics Revenus des Owners `/admin/owner-revenues`

| Composant                 | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| `<RevenueTable />`        | Tableau : owner, lieux, nb réservations, montant total |
| `<RevenueChart />`        | Graphique revenus par owner dans le temps              |
| `<DateRangePicker />`     | Filtrer par période                                    |
| `<ExportRevenueButton />` | Exporter en CSV                                        |
| `<OwnerDetailPanel />`    | Détail revenus d'un owner spécifique                   |

---

---

# 🧩 PARTIE 6 — COMPOSANTS PARTAGÉS

---

## PHASE 28 : Composants UI Globaux

| Composant               | Description                   | Usage                           |
| ----------------------- | ----------------------------- | ------------------------------- |
| `<FavoriteButton />`    | Toggle cœur + appel API       | DestinationCard (toutes pages)  |
| `<ReviewForm />`        | Étoiles + texte + soumission  | DestinationDetail, Catalog      |
| `<VrSessionCalendar />` | Calendrier sessions + booking | DestinationDetail sidebar       |
| `<AlbumPickerModal />`  | Picker + associer lieu        | DestinationDetail               |
| `<ImageUploadZone />`   | Drag & drop multi-fichiers    | Places, Albums, Products        |
| `<StripeBuyButton />`   | Checkout Stripe               | Pricing, Subscription           |
| `<AnalyticsTracker />`  | Tracker silencieux            | DestinationDetail (mount)       |
| `<PremiumGate />`       | Lock UI si plan insuffisant   | Albums IA features              |
| `<ConfirmModal />`      | Modale double confirmation    | Delete, Cancel, Logout-all      |
| `<StatusBadge />`       | Badge coloré générique        | Commandes, Réservations, Claims |
| `<EmptyState />`        | État vide illustré + CTA      | Toutes les listes               |
| `<SkeletonCard />`      | Skeleton loading animé        | Toutes les grilles              |
| `<Pagination />`        | Navigation pages              | Toutes les listes paginées      |
| `<SortSelect />`        | Sélecteur de tri              | Destinations, Produits          |
| `<DateRangePicker />`   | Picker de période             | Analytics admin/owner           |

---

## PHASE 29 : Guards & Layout

| Composant          | Description                                |
| ------------------ | ------------------------------------------ |
| `<AuthGuard />`    | Redirige vers `/login` si non connecté     |
| `<OwnerGuard />`   | Redirige si pas rôle owner ou admin        |
| `<AdminGuard />`   | Redirige si pas rôle admin                 |
| `<PremiumGuard />` | Bloque si plan Gratuit                     |
| `<PublicLayout />` | Navbar publique + Footer                   |
| `<UserLayout />`   | Navbar user + bottom nav mobile            |
| `<OwnerLayout />`  | Sidebar owner + header avec sélecteur lieu |
| `<AdminLayout />`  | Sidebar admin full-screen dark             |

---

---

# 🔒 Matrice des Permissions Complète

| Route                               |       Public       | User 🔒 | Owner 🔒👑 | Admin 🔒⚙️ |
| ----------------------------------- | :----------------: | :-----: | :--------: | :--------: |
| `/` `/destinations` `/carte`        |         ✅         |   ✅    |     ✅     |     ✅     |
| `/destinations/:slug`               |         ✅         |   ✅    |     ✅     |     ✅     |
| `/destinations/:slug/catalog`       |         ✅         |   ✅    |     ✅     |     ✅     |
| `/map/:slug` 🗺️                     |         ✅         |   ✅    |     ✅     |     ✅     |
| `/pricing`                          |         ✅         |   ✅    |     ✅     |     ✅     |
| `/login` `/register`                | ✅ (redir si auth) |    —    |     —      |     —      |
| `/cart` `/checkout`                 |         ❌         |   ✅    |     ✅     |     ✅     |
| `/dashboard` `/profile` `/settings` |         ❌         |   ✅    |     ✅     |     ✅     |
| `/favorites` `/history`             |         ❌         |   ✅    |     ✅     |     ✅     |
| `/albums/*`                         |         ❌         |   ✅    |     ✅     |     ✅     |
| `/bookings/*` `/vr-sessions/*`      |         ❌         |   ✅    |     ✅     |     ✅     |
| `/orders/*`                         |         ❌         |   ✅    |     ✅     |     ✅     |
| `/subscription/*` `/family/*`       |         ❌         |   ✅    |     ✅     |     ✅     |
| `/owner/*`                          |         ❌         |   ❌    |     ✅     |     ✅     |
| `/admin/*`                          |         ❌         |   ❌    |     ❌     |     ✅     |

---

---

# 📋 Récapitulatif des Phases

| Phase        | Page(s)                                       | Rôle     | Priorité |
| ------------ | --------------------------------------------- | -------- | -------- |
| **Phase 1**  | Page d'accueil `/`                            | Public   | `[P0]`   |
| **Phase 2**  | Liste destinations `/destinations`            | Public   | `[P0]`   |
| **Phase 3**  | Détail destination `/destinations/:slug`      | Public   | `[P0]`   |
| **Phase 4**  | Catalogue lieu `/destinations/:slug/catalog`  | Public   | `[P0]`   |
| **Phase 5**  | Carte interactive `/carte`                    | Public   | `[P0]`   |
| **Phase 6**  | Navigation temps réel `/map/:slug` 🗺️         | Public   | `[P1]`   |
| **Phase 7**  | Auth (login, register, forgot, reset, verify) | Public   | `[P1]`   |
| **Phase 8**  | Panier + Checkout + Confirmation              | User 🔒  | `[P1]`   |
| **Phase 9**  | Dashboard utilisateur `/dashboard`            | User 🔒  | `[P1]`   |
| **Phase 10** | Profil + Édition + Avatar                     | User 🔒  | `[P1]`   |
| **Phase 11** | Paramètres `/settings`                        | User 🔒  | `[P1]`   |
| **Phase 12** | Favoris `/favorites`                          | User 🔒  | `[P1]`   |
| **Phase 13** | Albums photos `/albums` 🤖                    | User 🔒  | `[P1]`   |
| **Phase 14** | Réservations VR `/vr-sessions` + `/bookings`  | User 🔒  | `[P1]`   |
| **Phase 15** | Commandes `/orders`                           | User 🔒  | `[P1]`   |
| **Phase 16** | Abonnement + Famille                          | User 🔒  | `[P1]`   |
| **Phase 17** | Dashboard owner `/owner/dashboard`            | Owner 👑 | `[P1]`   |
| **Phase 18** | Gestion lieu `/owner/places/:slug/edit`       | Owner 👑 | `[P1]`   |
| **Phase 19** | Produits `/owner/products`                    | Owner 👑 | `[P1]`   |
| **Phase 20** | Sessions VR `/owner/vr-sessions`              | Owner 👑 | `[P1]`   |
| **Phase 21** | Revendications `/owner/claims`                | Owner 👑 | `[P1]`   |
| **Phase 22** | Dashboard admin `/admin/dashboard`            | Admin ⚙️ | `[P1]`   |
| **Phase 23** | Analytics global `/admin/analytics`           | Admin ⚙️ | `[P2]`   |
| **Phase 24** | Destinations admin `/admin/destinations`      | Admin ⚙️ | `[P1]`   |
| **Phase 25** | Revendications admin `/admin/claims`          | Admin ⚙️ | `[P1]`   |
| **Phase 26** | Publicités `/admin/ads`                       | Admin ⚙️ | `[P3]`   |
| **Phase 27** | Revenus owners `/admin/owner-revenues`        | Admin ⚙️ | `[P2]`   |
| **Phase 28** | Composants partagés                           | Tous     | `[P1]`   |
| **Phase 29** | Guards & Layouts                              | Tous     | `[P0]`   |

---

## ⚠️ Points Techniques Clés

### Navigation temps réel (Phase 6)

- Utiliser `navigator.geolocation.watchPosition()` avec `enableHighAccuracy: true`
- Recalcul ETA toutes les 5 secondes
- Bibliothèque recommandée : **Leaflet Routing Machine** (OSRM backend)
- Alerter si déviation > 50m du tracé calculé

### Panier (Phase 8)

- Persistance via **Zustand** + `persist` middleware (localStorage)
- Panier lié à l'utilisateur après connexion
- Stripe Elements pour le paiement (ne pas gérer les données carte en direct)

### Upload d'images (Phases 10, 13, 18, 19)

- Ne **jamais** définir `Content-Type` manuellement pour les FormData
- Laisser le navigateur générer le boundary automatiquement
- Prévisualisation avant upload avec `FileReader` ou `URL.createObjectURL()`

### Streaming IA (Phase 13)

- Utiliser `ReadableStream` ou `EventSource` pour la génération de story
- Afficher le texte mot par mot au fur et à mesure
- Bouton "Stop" pour interrompre la génération

### Guards

- `AuthGuard` : vérifier token + `GET /me` → rediriger si 401
- `OwnerGuard` : vérifier `user.role === 'owner' || 'admin'`
- `AdminGuard` : vérifier `user.role === 'admin'`
- Stocker le rôle dans le store global (Zustand/Context)
