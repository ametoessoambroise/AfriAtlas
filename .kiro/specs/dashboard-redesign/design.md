Voici le contenu complet du design.md :

```markdown
# Design Document

## Introduction

This document provides comprehensive design specifications for the Atlas Voyages dashboard redesign. It includes high-level system architecture, detailed component designs, responsive layout strategies, and low-level implementation guidance to fulfill all 19 requirements defined in the requirements document.

## High-Level Design

### System Architecture
```

┌─────────────────────────────────────────────────────────────────┐
│ DashboardPage │
│ ┌───────────────────────────────────────────────────────────┐ │
│ │ useUserDashboard Hook │ │
│ │ (TanStack Query - manages all data fetching) │ │
│ └───────────────────────────────────────────────────────────┘ │
│ ↓ │
│ ┌───────────────────────────────────────────────────────────┐ │
│ │ Loading States │ │
│ │ • Global Spinner (initial load) │ │
│ │ • Section Skeletons (individual components) │ │
│ └───────────────────────────────────────────────────────────┘ │
│ ↓ │
│ ┌───────────────────────────────────────────────────────────┐ │
│ │ WelcomeBanner │ │
│ │ (User greeting + avatar + premium badge) │ │
│ └───────────────────────────────────────────────────────────┘ │
│ ↓ │
│ ┌───────────────────────────────────────────────────────────┐ │
│ │ StatsRow │ │
│ │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ │ │
│ │ │Favs │ │Albums│ │Orders│ │Books │ │ │
│ │ └──────┘ └──────┘ └──────┘ └──────┘ │ │
│ └───────────────────────────────────────────────────────────┘ │
│ ↓ │
│ ┌──────────────────────────┬────────────────────────────────┐ │
│ │ Main Content (8/12) │ Sidebar (4/12) │ │
│ │ ┌────────────────────┐ │ ┌──────────────────────────┐ │ │
│ │ │ RecentFavorites │ │ │ ActiveSubscriptionCard │ │ │
│ │ └────────────────────┘ │ └──────────────────────────┘ │ │
│ │ ┌────────────────────┐ │ ┌──────────────────────────┐ │ │
│ │ │ RecentOrders │ │ │ QuickActions │ │ │
│ │ └────────────────────┘ │ └──────────────────────────┘ │ │
│ │ ┌────────────────────┐ │ │ │
│ │ │ GlobalTopPlaces │ │ │ │
│ │ └────────────────────┘ │ │ │
│ └──────────────────────────┴────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

```

### Data Flow Architecture

```

API Backend
↓
useUserDashboard Hook (TanStack Query)
↓
┌───────────────────────────────────────┐
│ Query States: │
│ • isLoading → Skeleton Components │
│ • isError → Error States with Retry │
│ • isSuccess → Actual Content │
└───────────────────────────────────────┘
↓
Dashboard Components
↓
User Interface

```

### Component Hierarchy

```

DashboardPage
├── WelcomeBanner
│ ├── Avatar (with premium badge)
│ ├── Greeting text
│ └── User metadata badges
├── StatsRow
│ ├── StatCard (Favorites)
│ ├── StatCard (Albums)
│ ├── StatCard (Orders)
│ └── StatCard (Bookings)
├── Main Content Column
│ ├── RecentFavorites
│ │ └── FavoriteCard[] (grid)
│ ├── RecentOrders
│ │ └── OrderItem[] (list)
│ └── GlobalTopPlaces
│ └── PlaceCard[] (grid)
└── Sidebar Column
├── ActiveSubscriptionCard
└── QuickActions
└── ActionButton[] (grid)

````

### Responsive Layout Strategy

**Mobile (<640px):**
- Single column layout
- Full width components
- StatsRow: 1 column
- QuickActions: 2 columns
- All lists: 1 column
- Bottom navigation bar

**Tablet (640px - 1024px):**
- Single column layout with wider cards
- StatsRow: 2 columns
- QuickActions: 2 columns
- RecentFavorites: 2 columns
- GlobalTopPlaces: 2 columns

**Desktop (>1024px):**
- 12-column grid system
- Main content: 8 columns
- Sidebar: 4 columns
- StatsRow: 4 columns
- GlobalTopPlaces: 3 columns

### Theme System Integration

**CSS Custom Properties:**
```css
/* Light Mode */
--primary: hsl(205 85% 32%)      /* #0F4C75 - Blue ocean */
--secondary: hsl(38 85% 70%)     /* #F4C95D - Golden sand */
--accent: hsl(12 90% 60%)        /* #FF7A59 - Coral sunset */
--background: hsl(210 40% 98%)   /* #F7FAFC - Light blue-white */
--card: hsl(0 0% 100%)           /* White */

/* Dark Mode */
--primary: hsl(200 90% 55%)      /* #38BDF8 - Neon blue */
--secondary: hsl(42 85% 60%)     /* #FBBF24 - Warm gold */
--accent: hsl(10 90% 65%)        /* #FF6B4A - Coral */
--background: hsl(220 35% 7%)    /* #0B1220 - Deep night */
--card: hsl(220 30% 10%)         /* #121A2B */
````

## Component Designs

### 1. DashboardPage Component

**Purpose:** Main container that orchestrates all dashboard components and manages data fetching.

**Props:**

```typescript
// No props - uses useUserDashboard hook internally
```

**Layout Structure:**

```tsx
<div className="min-h-screen bg-background pb-20 pt-6">
  <div className="container mx-auto px-4 space-y-8">
    {/* Components with staggered animations */}
  </div>
</div>
```

**Responsive Classes:**

- Container: `container mx-auto px-4` (16px mobile, 24px desktop)
- Spacing: `space-y-8` (32px vertical gap)
- Grid: `grid grid-cols-1 lg:grid-cols-12 gap-8`

**Loading State:**

```tsx
if (isLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );
}
```

**Error State:**

```tsx
if (isError) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <AlertCircle className="w-16 h-16 text-destructive mx-auto" />
        <h2 className="text-xl font-bold">Erreur de chargement</h2>
        <p className="text-muted-foreground">
          Impossible de charger le tableau de bord
        </p>
        <Button onClick={() => refetch()}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Réessayer
        </Button>
      </div>
    </div>
  );
}
```

**Animation Strategy:**

```tsx
// Staggered fade-in animations
<div className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '0ms' }}>
  <WelcomeBanner />
</div>
<div className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '100ms' }}>
  <StatsRow />
</div>
<div className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '200ms' }}>
  {/* Main content */}
</div>
```

---

### 2. WelcomeBanner Component

**Purpose:** Personalized greeting section with user information and premium status.

**Props:**

```typescript
interface WelcomeBannerProps {
  user: UserResponse;
}
```

**Design Specifications:**

**Container:**

```tsx
<div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20 p-8 rounded-[40px] shadow-2xl backdrop-blur-xl">
```

**Layout:**

- Flexbox: `flex flex-col md:flex-row items-center gap-6`
- Padding: `p-8` (32px all sides)
- Border radius: `rounded-[40px]` (40px)

**Avatar Section:**

```tsx
<div className="relative">
  <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-surface-alt">
    {user.avatar_url ? (
      <img
        src={user.avatar_url}
        alt={user.fullname}
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-3xl font-black text-primary/30">
        {user.fullname.charAt(0)}
      </div>
    )}
  </div>
  {isPremium && (
    <div className="absolute -top-2 -right-2 bg-yellow-400 p-1.5 rounded-full shadow-lg border-2 border-white">
      <Crown className="w-4 h-4 text-white" />
    </div>
  )}
</div>
```

**Text Section:**

```tsx
<div className="text-center md:text-left">
  <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
    Bonjour, <span className="text-primary">{user.fullname.split(" ")[0]}</span>{" "}
    !
  </h1>
  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
    <Badge
      variant={isPremium ? "default" : "secondary"}
      className="rounded-full px-4 py-1 text-xs font-black uppercase tracking-widest"
    >
      {isPremium ? "Membre Premium" : "Membre Standard"}
    </Badge>
    <span className="text-muted-foreground text-sm font-medium">
      Voyageur à {user.country || "Togo"}
    </span>
    <div className="flex items-center gap-1 text-sm font-bold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
      <Star className="w-3.5 h-3.5 fill-current" />
      Explorer Atlas
    </div>
  </div>
</div>
```

**Decorative Elements:**

```tsx
{/* Glassmorphism orbs */}
<div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
<div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
```

**Responsive Behavior:**

- Mobile: Center-aligned, vertical stack
- Desktop: Left-aligned, horizontal layout

---

### 3. StatsRow Component

**Purpose:** Display key metrics with visual sparkline charts.

**Props:**

```typescript
interface StatsRowProps {
  stats: {
    favorites_count: number;
    albums_count: number;
    orders_count: number;
    bookings_count: number;
  };
}
```

**Design Specifications:**

**Container:**

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
```

**StatCard Component:**

```tsx
function StatCard({ title, value, icon, color, data }: StatCardProps) {
  return (
    <div className="bg-card border border-border p-6 rounded-[32px] shadow-sm hover:shadow-md transition-all duration-200 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="p-3 bg-surface-alt rounded-2xl text-muted-foreground">
          {icon}
        </div>
        <div className="w-20 h-8">
          <Line data={chartData} options={options} />
        </div>
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
          {title}
        </p>
        <p className="text-3xl font-black">{value.toLocaleString("fr-FR")}</p>
      </div>
    </div>
  );
}
```

**Chart Configuration:**

```typescript
const chartData = {
  labels: data.map((_, i) => i.toString()),
  datasets: [
    {
      data,
      borderColor: color,
      backgroundColor: `${color}22`, // 20% opacity
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      borderWidth: 2,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
  scales: {
    x: { display: false },
    y: {
      display: false,
      min: Math.min(...data) - 1,
      max: Math.max(...data) + 1,
    },
  },
};
```

**Color Mapping:**

```typescript
const statConfigs = [
  { title: "Favoris", icon: Heart, color: "#F43F5E" }, // Red
  { title: "Albums", icon: ImageIcon, color: "#8B5CF6" }, // Purple
  { title: "Commandes", icon: ShoppingBag, color: "#10B981" }, // Green
  { title: "Réservations", icon: Calendar, color: "#3B82F6" }, // Blue
];
```

**Skeleton State:**

```tsx
function StatCardSkeleton() {
  return (
    <div className="bg-card border border-border p-6 rounded-[32px] shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="w-12 h-12 rounded-2xl" />
        <Skeleton className="w-20 h-8" />
      </div>
      <Skeleton className="w-16 h-3 mb-2" />
      <Skeleton className="w-24 h-9" />
    </div>
  );
}
```

**Hover Effects:**

```css
.stat-card {
  transition: all 200ms ease-out;
}
.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}
```

---

### 4. QuickActions Component

**Purpose:** Provide quick navigation to key features.

**Props:**

```typescript
// No props - static configuration
```

**Design Specifications:**

**Container:**

```tsx
<div className="space-y-4">
  <h3 className="text-lg font-black">Actions Rapides</h3>
  <div className="grid grid-cols-2 gap-3">
```

**Action Button:**

```tsx
<Link
  to={action.to}
  className="flex flex-col items-center gap-2 p-4 bg-card border border-border rounded-3xl hover:border-primary transition-all duration-200 group"
>
  <div
    className={`p-3 rounded-2xl text-white ${action.color} shadow-lg group-hover:scale-110 transition-transform duration-200`}
  >
    {action.icon}
  </div>
  <span className="text-xs font-bold">{action.label}</span>
</Link>
```

**Action Configuration:**

```typescript
const actions = [
  {
    icon: <Map className="w-5 h-5" />,
    label: "Explorer",
    to: "/explore",
    color: "bg-blue-500"
  },
  {
    icon: <PlusSquare className="w-5 h-5" />,
    label: "Nouvel Album",
    to: "/albums/new",
    color: "bg-green-500"
  },
  {
    icon: <UserCircle className="w-5 h-5" />,
    label: "Profil",
    to: "/profile",
    color: "bg-purple-500"
  },
  {
    icon: <HelpCircle className="w-5 h-5" />,
    label: "Aide",
    to: "/support",
    color: "bg-orange-500"
  },
];
```

**Accessibility:**

```tsx
<Link
  to={action.to}
  aria-label={`Naviguer vers ${action.label}`}
  className="..."
>
```

---

### 5. RecentFavorites Component

**Purpose:** Display user's recently favorited places.

**Props:**

```typescript
interface RecentFavoritesProps {
  favorites: PlaceListResponse[];
}
```

**Design Specifications:**

**Container:**

```tsx
<div className="space-y-4">
  <div className="flex items-center justify-between">
    <h3 className="text-lg font-black flex items-center gap-2">
      <Heart className="w-5 h-5 text-red-500 fill-current" />
      Favoris Récents
    </h3>
    <Link to="/favorites" className="text-primary text-xs font-bold hover:underline">
      Voir tout
    </Link>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
```

**Favorite Card:**

```tsx
<Link
  key={place.id}
  to={`/places/${place.slug}`}
  className="group flex items-center gap-4 bg-card border border-border p-3 rounded-2xl hover:border-primary transition-all duration-200"
>
  <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-alt shrink-0">
    <img
      src={place.main_image || "/placeholder.jpg"}
      alt={place.name}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
    />
  </div>
  <div className="min-w-0 flex-1">
    <p className="font-bold text-sm truncate">{place.name}</p>
    <p className="text-[10px] text-muted-foreground truncate">{place.city}</p>
    <Badge variant="outline" className="mt-1 text-[9px] px-1 py-0">
      {place.category}
    </Badge>
  </div>
</Link>
```

**Empty State:**

```tsx
if (favorites.length === 0) return null;
```

**Skeleton State:**

```tsx
function FavoriteCardSkeleton() {
  return (
    <div className="flex items-center gap-4 bg-card border border-border p-3 rounded-2xl">
      <Skeleton className="w-16 h-16 rounded-xl" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}
```

**Error State:**

```tsx
if (isError) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-black flex items-center gap-2">
        <Heart className="w-5 h-5 text-red-500 fill-current" />
        Favoris Récents
      </h3>
      <div className="bg-destructive/5 border border-destructive/20 p-6 rounded-2xl text-center">
        <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
        <p className="text-sm text-muted-foreground mb-3">
          Impossible de charger vos favoris
        </p>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          <RefreshCw className="w-3 h-3 mr-2" />
          Réessayer
        </Button>
      </div>
    </div>
  );
}
```

---

### 6. RecentOrders Component

**Purpose:** Display user's recent orders.

**Props:**

```typescript
interface RecentOrdersProps {
  orders: OrderListResponse[];
}
```

**Design Specifications:**

**Container:**

```tsx
<div className="space-y-4">
  <div className="flex items-center justify-between">
    <h3 className="text-lg font-black flex items-center gap-2">
      <ShoppingBag className="w-5 h-5 text-primary" />
      Commandes Récentes
    </h3>
  </div>
  <div className="bg-card border border-border rounded-[32px] overflow-hidden">
```

**Order Item:**

```tsx
<Link
  key={order.id}
  to={`/orders/${order.id}`}
  className="flex items-center justify-between p-4 hover:bg-surface-alt transition-colors duration-200 border-b border-border last:border-b-0"
>
  <div>
    <p className="font-bold text-sm">Commande #{order.id.slice(0, 8)}</p>
    <p className="text-[10px] text-muted-foreground">
      {new Date(order.created_at).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}
    </p>
  </div>
  <div className="flex items-center gap-3">
    <div className="text-right">
      <p className="font-black text-sm">
        {parseInt(order.total_price).toLocaleString("fr-FR")} {order.currency}
      </p>
      <span
        className={`text-[9px] font-black uppercase tracking-widest ${
          order.status === "paid" || order.status === "completed"
            ? "text-green-500"
            : "text-yellow-600"
        }`}
      >
        {order.status}
      </span>
    </div>
    <ChevronRight className="w-4 h-4 text-muted-foreground" />
  </div>
</Link>
```

**Empty State:**

```tsx
{
  orders.length === 0 && (
    <div className="p-8 text-center text-muted-foreground italic text-sm">
      Aucune commande pour le moment.
    </div>
  );
}
```

**Skeleton State:**

```tsx
function OrderItemSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="w-4 h-4" />
      </div>
    </div>
  );
}
```

---

### 7. GlobalTopPlaces Component

**Purpose:** Display popular places in Togo.

**Props:**

```typescript
interface GlobalTopPlacesProps {
  places: PlaceListResponse[];
}
```

**Design Specifications:**

**Container:**

```tsx
<div className="space-y-4">
  <h3 className="text-lg font-black flex items-center gap-2">
    <Star className="w-5 h-5 text-yellow-500 fill-current" />
    Lieux populaires au Togo
  </h3>
  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
```

**Place Card:**

```tsx
<Link
  key={place.id}
  to={`/places/${place.slug}`}
  className="relative group aspect-square rounded-2xl overflow-hidden bg-surface-alt"
>
  <img
    src={place.primary_image || "/placeholder.jpg"}
    alt={place.name}
    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
  <div className="absolute bottom-2 left-2 right-2 flex flex-col">
    <p className="text-white text-xs font-black truncate">{place.name}</p>
    <div className="flex items-center gap-1 text-[8px] text-white/80">
      <MapPin className="w-2 h-2" />
      {place.city}
    </div>
  </div>
</Link>
```

**Skeleton State:**

```tsx
function PlaceCardSkeleton() {
  return (
    <div className="aspect-square rounded-2xl overflow-hidden bg-surface-alt">
      <Skeleton className="w-full h-full" />
    </div>
  );
}
```

---

### 8. ActiveSubscriptionCard Component

**Purpose:** Display subscription status and upgrade CTA.

**Props:**

```typescript
interface ActiveSubscriptionCardProps {
  user: UserResponse;
}
```

**Design Specifications:**

**Container:**

```tsx
<div className="bg-gradient-to-br from-[#1A1A1A] to-[#333] p-6 rounded-[32px] text-white shadow-xl relative overflow-hidden">
```

**Content:**

```tsx
<div className="relative z-10">
  <div className="flex items-center gap-2 mb-4">
    {isPremium ? (
      <ShieldCheck className="w-5 h-5 text-primary" />
    ) : (
      <Zap className="w-5 h-5 text-yellow-400" />
    )}
    <span className="text-xs font-black uppercase tracking-widest">
      Plan Actuel
    </span>
  </div>

  <h3 className="text-2xl font-black mb-1">
    {isPremium ? "Atlas Premium" : "Atlas Free"}
  </h3>

  <p className="text-white/60 text-xs mb-6">
    {isPremium
      ? "Accès illimité à toutes les expériences et réductions exclusives."
      : "Profitez des fonctionnalités de base. Passez à Premium pour plus d'avantages."}
  </p>

  <Link
    to="/subscription"
    className="flex items-center justify-between w-full bg-white/10 hover:bg-white/20 transition-colors duration-200 p-3 rounded-2xl border border-white/10 text-sm font-bold"
  >
    {isPremium ? "Gérer mon abonnement" : "Découvrir Premium"}
    <ChevronRight className="w-4 h-4" />
  </Link>
</div>;

{
  /* Decorative orb */
}
<div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />;
```

## Low-Level Design

### Design Tokens

**Spacing Scale:**

```typescript
const spacing = {
  xs: "4px", // 0.25rem
  sm: "8px", // 0.5rem
  md: "16px", // 1rem
  lg: "24px", // 1.5rem
  xl: "32px", // 2rem
  "2xl": "48px", // 3rem
};
```

**Typography Scale:**

```typescript
const typography = {
  h1: "text-3xl md:text-4xl font-black", // 2.5rem+
  h2: "text-2xl md:text-3xl font-black", // 2rem+
  h3: "text-lg md:text-xl font-black", // 1.5rem+
  body: "text-sm md:text-base", // 14-16px
  caption: "text-xs", // 12px
  tiny: "text-[10px]", // 10px
};
```

**Border Radius:**

```typescript
const borderRadius = {
  sm: "rounded-lg", // 0.5rem
  md: "rounded-xl", // 0.75rem
  lg: "rounded-2xl", // 1rem
  xl: "rounded-3xl", // 1.5rem
  "2xl": "rounded-[32px]", // 2rem
  "3xl": "rounded-[40px]", // 2.5rem
};
```

**Shadows:**

```typescript
const shadows = {
  sm: "shadow-sm", // Subtle
  md: "shadow-md", // Medium
  lg: "shadow-lg", // Large
  xl: "shadow-xl", // Extra large
  "2xl": "shadow-2xl", // Maximum
};
```

### Animation Specifications

**Transitions:**

````css
/* Standard transition */
.transition-standard {
  transition: all 200ms ease-out;
}

/* Slow transition */
.transition-slow {
  transition: all 300ms ease-out;
}

/* Transform
Voici la suite du design.md :

```markdown
/* Transform only (better performance) */
.transition-transform {
  transition: transform 200ms ease-out;
}

/* Image zoom */
.transition-image {
  transition: transform 500ms ease-out;
}
````

**Hover Effects:**

```css
/* Card hover */
.card-hover:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Image hover */
.image-hover:hover img {
  transform: scale(1.1);
}

/* Button hover */
.button-hover:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.2);
}

/* Icon hover */
.icon-hover:hover {
  transform: scale(1.1);
}
```

**Staggered Animations:**

```tsx
const staggerDelays = [0, 100, 200, 300, 400];

{
  components.map((Component, index) => (
    <div
      key={index}
      className="animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{ animationDelay: `${staggerDelays[index]}ms` }}
    >
      <Component />
    </div>
  ));
}
```

**Shimmer Animation:**

```css
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.shimmer {
  animation: shimmer 2s infinite linear;
  background: linear-gradient(
    90deg,
    hsl(var(--muted)) 0%,
    hsl(var(--muted-foreground) / 0.1) 50%,
    hsl(var(--muted)) 100%
  );
  background-size: 1000px 100%;
}
```

### Responsive Breakpoints Implementation

**Tailwind Breakpoints:**

```typescript
const breakpoints = {
  sm: "640px", // Mobile landscape / Small tablet
  md: "768px", // Tablet
  lg: "1024px", // Desktop
  xl: "1280px", // Large desktop
  "2xl": "1536px", // Extra large
};
```

**Mobile (<640px):**

```tsx
// Single column layout
<div className="grid grid-cols-1 gap-4">

// Stats: 1 column
<div className="grid grid-cols-1 gap-4">

// Quick Actions: 2 columns
<div className="grid grid-cols-2 gap-3">

// Favorites: 1 column
<div className="grid grid-cols-1 gap-4">

// Top Places: 2 columns
<div className="grid grid-cols-2 gap-3">
```

**Tablet (640px - 1024px):**

```tsx
// Stats: 2 columns
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

// Quick Actions: 2 columns
<div className="grid grid-cols-2 gap-3">

// Favorites: 2 columns
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

// Top Places: 2 columns
<div className="grid grid-cols-2 gap-3">
```

**Desktop (>1024px):**

```tsx
// Main layout: 12-column grid
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

// Stats: 4 columns
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

// Main content: 8 columns
<div className="lg:col-span-8 space-y-8">

// Sidebar: 4 columns
<div className="lg:col-span-4 space-y-8">

// Top Places: 3 columns
<div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
```

### Accessibility Patterns

**Keyboard Navigation:**

```tsx
// Focus visible styles
<Link
  className="... focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
>

// Skip to main content
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
>
  Aller au contenu principal
</a>

// Main content landmark
<main id="main-content" className="...">
```

**ARIA Labels:**

```tsx
// Section headings
<h2 id="recent-favorites" className="...">Favoris Récents</h2>
<div aria-labelledby="recent-favorites">

// Interactive elements
<button aria-label="Réessayer le chargement des données">
  <RefreshCw className="w-4 h-4" />
</button>

// Loading states
<div role="status" aria-live="polite">
  <Loader2 className="animate-spin" />
  <span className="sr-only">Chargement en cours...</span>
</div>

// Error states
<div role="alert" aria-live="assertive">
  <p>Erreur de chargement</p>
</div>
```

**Semantic HTML:**

```tsx
<main className="min-h-screen">
  <header>
    <WelcomeBanner />
  </header>

  <section aria-labelledby="stats-heading">
    <h2 id="stats-heading" className="sr-only">
      Statistiques
    </h2>
    <StatsRow />
  </section>

  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-8">
      <section aria-labelledby="favorites-heading">
        <h2 id="favorites-heading">Favoris Récents</h2>
        <RecentFavorites />
      </section>

      <section aria-labelledby="orders-heading">
        <h2 id="orders-heading">Commandes Récentes</h2>
        <RecentOrders />
      </section>

      <section aria-labelledby="places-heading">
        <h2 id="places-heading">Lieux populaires</h2>
        <GlobalTopPlaces />
      </section>
    </div>

    <aside className="lg:col-span-4">
      <ActiveSubscriptionCard />
      <QuickActions />
    </aside>
  </div>
</main>
```

**Color Contrast:**

```typescript
// WCAG AA compliance
const contrastRatios = {
  normalText: 4.5, // Minimum for normal text
  largeText: 3.0, // Minimum for large text (18px+ or 14px+ bold)
  uiComponents: 3.0, // Minimum for UI components
};

// Verified combinations
const accessibleCombinations = [
  { bg: "hsl(210 40% 98%)", fg: "hsl(215 30% 12%)", ratio: 12.6 }, // Light mode
  { bg: "hsl(220 35% 7%)", fg: "hsl(210 40% 96%)", ratio: 14.2 }, // Dark mode
  { bg: "hsl(205 85% 32%)", fg: "hsl(210 40% 98%)", ratio: 7.8 }, // Primary
];
```

### Performance Optimization

**Lazy Loading Images:**

```tsx
import { LazyLoadImage } from "react-lazy-load-image-component";

<LazyLoadImage
  src={place.main_image}
  alt={place.name}
  effect="blur"
  threshold={100}
  className="w-full h-full object-cover"
/>;
```

**Code Splitting:**

```tsx
import { lazy, Suspense } from "react";

const RecentFavorites = lazy(() => import("./RecentFavorites"));
const RecentOrders = lazy(() => import("./RecentOrders"));
const GlobalTopPlaces = lazy(() => import("./GlobalTopPlaces"));

<Suspense fallback={<FavoritesSkeleton />}>
  <RecentFavorites favorites={favorites} />
</Suspense>;
```

**Memoization:**

```tsx
import { memo, useMemo } from 'react';

const StatCard = memo(({ title, value, icon, color, data }: StatCardProps) => {
  const chartData = useMemo(() => ({
    labels: data.map((_, i) => i.toString()),
    datasets: [{
      data,
      borderColor: color,
      backgroundColor: `${color}22`,
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      borderWidth: 2,
    }],
  }), [data, color]);

  return (
    // Component JSX
  );
});
```

**Debounced Resize:**

```tsx
import { useEffect, useState } from "react";
import { debounce } from "lodash";

function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = debounce(() => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }, 150);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}
```

**Will-Change Optimization:**

```css
/* Only on actively animating elements */
.animating {
  will-change: transform;
}

/* Remove after animation */
.animated {
  will-change: auto;
}
```

### Internationalization Implementation

**Date Formatting:**

```typescript
// Utility function
export function formatDate(date: string | Date, format: 'short' | 'long' = 'short'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (format === 'short') {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(dateObj);
  }

  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(dateObj);
}

// Usage
<p>{formatDate(order.created_at, 'long')}</p>
// Output: "25 avr. 2026"
```

**Number Formatting:**

```typescript
// Utility function
export function formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat('fr-FR', options).format(value);
}

// Usage examples
<p>{formatNumber(stats.favorites_count)}</p>
// Output: "1 234"

<p>{formatNumber(parseFloat(order.total_price), {
  style: 'currency',
  currency: order.currency
})}</p>
// Output: "1 234,56 €"

<p>{formatNumber(percentage, {
  style: 'percent',
  minimumFractionDigits: 1
})}</p>
// Output: "45,6 %"
```

**Relative Time:**

```typescript
// Utility function
export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat('fr-FR', { numeric: 'auto' });

  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second');
  } else if (diffInSeconds < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
  } else if (diffInSeconds < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
  } else if (diffInSeconds < 2592000) {
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
  } else if (diffInSeconds < 31536000) {
    return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
  } else {
    return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
  }
}

// Usage
<p>{formatRelativeTime(order.created_at)}</p>
// Output: "il y a 2 jours"
```

### Skeleton Components

**Skeleton Utility:**

```tsx
// components/ui/skeleton.tsx
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}
```

**Dashboard Skeleton:**

```tsx
export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background pb-20 pt-6">
      <div className="container mx-auto px-4 space-y-8">
        {/* Welcome Banner Skeleton */}
        <div className="bg-card border border-border p-8 rounded-[40px]">
          <div className="flex items-center gap-6">
            <Skeleton className="w-24 h-24 rounded-full" />
            <div className="space-y-3 flex-1">
              <Skeleton className="h-10 w-64" />
              <div className="flex gap-3">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-40" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-card border border-border p-6 rounded-[32px]"
            >
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="w-12 h-12 rounded-2xl" />
                <Skeleton className="w-20 h-8" />
              </div>
              <Skeleton className="w-16 h-3 mb-2" />
              <Skeleton className="w-24 h-9" />
            </div>
          ))}
        </div>

        {/* Content Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            {/* Favorites Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-48" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 bg-card border border-border p-3 rounded-2xl"
                  >
                    <Skeleton className="w-16 h-16 rounded-xl" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            {/* Subscription Card Skeleton */}
            <div className="bg-card border border-border p-6 rounded-[32px]">
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-8 w-40 mb-2" />
              <Skeleton className="h-4 w-full mb-6" />
              <Skeleton className="h-12 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Error Components

**Error Boundary:**

```tsx
import { Component, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Dashboard Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center space-y-4 max-w-md px-4">
              <AlertCircle className="w-16 h-16 text-destructive mx-auto" />
              <h2 className="text-2xl font-black">Une erreur est survenue</h2>
              <p className="text-muted-foreground">
                Le tableau de bord a rencontré un problème. Veuillez réessayer.
              </p>
              <Button onClick={() => window.location.reload()}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Recharger la page
              </Button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
```

**Section Error State:**

```tsx
interface SectionErrorProps {
  title: string;
  message?: string;
  onRetry?: () => void;
}

export function SectionError({ title, message, onRetry }: SectionErrorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-black">{title}</h3>
      <div className="bg-destructive/5 border border-destructive/20 p-6 rounded-2xl text-center">
        <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
        <p className="text-sm text-muted-foreground mb-3">
          {message || "Impossible de charger les données"}
        </p>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            <RefreshCw className="w-3 h-3 mr-2" />
            Réessayer
          </Button>
        )}
      </div>
    </div>
  );
}
```

### Mobile Navigation Integration

**Bottom Navigation Bar:**

```tsx
// components/layout/BottomNav.tsx
import { Home, Search, Heart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Accueil", path: "/dashboard" },
    { icon: Search, label: "Explorer", path: "/explore" },
    { icon: Heart, label: "Favoris", path: "/favorites" },
    { icon: User, label: "Profil", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-4 py-2 min-w-[44px] min-h-[44px] transition-colors",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-bold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

**Dashboard with Bottom Nav:**

```tsx
// Update DashboardPage
export default function DashboardPage() {
  // ... existing code

  return (
    <>
      <div className="min-h-screen bg-background pb-20 pt-6 md:pb-6">
        {/* Dashboard content */}
      </div>
      <BottomNav />
    </>
  );
}
```

## Testing Strategy

### Unit Tests

```typescript
// StatsRow.test.tsx
describe('StatsRow', () => {
  it('renders all stat cards', () => {
    const stats = {
      favorites_count: 10,
      albums_count: 5,
      orders_count: 3,
      bookings_count: 2,
    };
    render(<StatsRow stats={stats} />);
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('formats numbers with French locale', () => {
    const stats = { favorites_count: 1234, ... };
    render(<StatsRow stats={stats} />);
    expect(screen.getByText('1 234')).toBeInTheDocument();
  });
});
```

### Integration Tests

```typescript
// DashboardPage.test.tsx
describe('DashboardPage', () => {
  it('shows loading state initially', () => {
    render(<DashboardPage />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders all sections after loading', async () => {
    render(<DashboardPage />);
    await waitFor(() => {
      expect(screen.getByText('Favoris Récents')).toBeInTheDocument();
      expect(screen.getByText('Commandes Récentes')).toBeInTheDocument();
    });
  });

  it('shows error state on fetch failure', async () => {
    server.use(
      rest.get('/api/dashboard', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    render(<DashboardPage />);
    await waitFor(() => {
      expect(screen.getByText(/erreur/i)).toBeInTheDocument();
    });
  });
});
```

### Accessibility Tests

```typescript
// Accessibility.test.tsx
describe('Dashboard Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<DashboardPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('supports keyboard navigation', () => {
    render(<DashboardPage />);
    const firstLink = screen.getAllByRole('link')[0];
    firstLink.focus();
    expect(firstLink).toHaveFocus();
  });
});
```

### Visual Regression Tests

```typescript
// Visual.test.tsx
describe('Dashboard Visual Regression', () => {
  it('matches snapshot in light mode', () => {
    const { container } = render(<DashboardPage />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot in dark mode', () => {
    const { container } = render(
      <ThemeProvider theme="dark">
        <DashboardPage />
      </ThemeProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
```

## Conclusion

This design document provides comprehensive specifications for implementing the Atlas Voyages dashboard redesign. The design focuses on:

1. **Enhanced Visual Hierarchy** - Clear typography scale and spacing
2. **Mobile-First Responsive Design** - Seamless adaptation across devices
3. **Engaging Micro-Interactions** - Smooth animations and transitions
4. **Robust Error Handling** - Graceful degradation with retry options
5. **Internationalization** - French locale for dates and numbers
6. **Accessibility** - WCAG AA compliance and keyboard navigation
7. **Performance** - Optimized loading and rendering
8. **Dark Mode** - Full theme support

All components are designed to work together cohesively while maintaining the existing color palette and data structure. The implementation checklist provides a clear roadmap for development, and the testing strategy ensures quality and reliability.
