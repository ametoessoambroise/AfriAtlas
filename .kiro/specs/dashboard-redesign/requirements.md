# Requirements Document

## Introduction

This document defines the requirements for refactoring the Atlas Voyages dashboard to improve UI/UX attractiveness and responsive design. The redesign focuses on enhancing visual hierarchy, information architecture, micro-interactions, and cross-device responsiveness while maintaining the existing color palette and data structure.

## Glossary

- **Dashboard_System**: The complete dashboard interface including all components and the main DashboardPage
- **WelcomeBanner_Component**: User greeting section with avatar, premium badge, and glassmorphism effects
- **StatsRow_Component**: Four statistical cards displaying favorites, albums, orders, and bookings with sparkline charts
- **QuickActions_Component**: Four action buttons for navigation (Explorer, New Album, Profile, Help)
- **RecentFavorites_Component**: Grid display of user's recent favorite places
- **RecentOrders_Component**: List display of user's recent orders
- **GlobalTopPlaces_Component**: Grid display of popular places in Togo
- **ActiveSubscriptionCard_Component**: Subscription status card (Free/Premium)
- **Responsive_Breakpoint**: Screen size threshold (mobile: <640px, tablet: 640-1024px, desktop: >1024px)
- **Micro_Interaction**: Small animated feedback response to user actions (hover, click, scroll)
- **Visual_Hierarchy**: Organization of elements by importance using size, color, spacing, and typography
- **Information_Architecture**: Structural design of information to support usability and findability

## Requirements

### Requirement 1: Enhanced Visual Hierarchy

**User Story:** As a user, I want the dashboard to have clear visual hierarchy, so that I can quickly identify the most important information and actions.

#### Acceptance Criteria

1. THE Dashboard_System SHALL use typography scale with at least 3 distinct heading sizes (h1: 2.5rem+, h2: 2rem+, h3: 1.5rem+)
2. THE Dashboard_System SHALL apply consistent spacing scale (4px, 8px, 16px, 24px, 32px, 48px) between sections
3. WHEN displaying statistical data, THE StatsRow_Component SHALL emphasize numerical values with font-weight of 700 or higher and font-size at least 1.5x larger than labels
4. THE Dashboard_System SHALL use color contrast ratios meeting WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
5. THE Dashboard_System SHALL group related content using visual containers with consistent border-radius (rounded-2xl: 1rem, rounded-3xl: 1.5rem, rounded-[32px]: 2rem)

### Requirement 2: Mobile-First Responsive Layout

**User Story:** As a mobile user, I want the dashboard to adapt seamlessly to my device screen, so that I can access all features comfortably on any device.

#### Acceptance Criteria

1. WHEN viewport width is less than 640px, THE Dashboard_System SHALL display all components in single-column layout with full width
2. WHEN viewport width is between 640px and 1024px, THE Dashboard_System SHALL display StatsRow_Component in 2-column grid
3. WHEN viewport width is greater than 1024px, THE Dashboard_System SHALL display main content in 8-column span and sidebar in 4-column span within 12-column grid
4. THE Dashboard_System SHALL ensure touch targets are at least 44x44 pixels on mobile devices
5. WHEN viewport width is less than 640px, THE QuickActions_Component SHALL display action buttons in 2-column grid with minimum 12px gap
6. THE Dashboard_System SHALL use fluid typography scaling between 14px (mobile) and 16px (desktop) for body text
7. WHEN viewport width changes, THE Dashboard_System SHALL reflow content without horizontal scrolling

### Requirement 3: Engaging Micro-Interactions

**User Story:** As a user, I want interactive elements to provide visual feedback, so that the interface feels responsive and engaging.

#### Acceptance Criteria

1. WHEN user hovers over clickable cards, THE Dashboard_System SHALL apply scale transform of 1.02 to 1.05 within 200ms transition
2. WHEN user hovers over images, THE Dashboard_System SHALL apply scale transform of 1.1 to image within 300-700ms transition
3. WHEN user hovers over action buttons, THE Dashboard_System SHALL display elevation change using shadow increase within 200ms
4. THE Dashboard_System SHALL apply fade-in animation to all components on initial page load with staggered delays (0ms, 100ms, 200ms, 300ms)
5. WHEN user clicks interactive elements, THE Dashboard_System SHALL provide visual feedback using active state styling within 100ms
6. THE Dashboard_System SHALL apply smooth color transitions (200-300ms) to all interactive elements on state changes

### Requirement 4: Improved Card Design System

**User Story:** As a user, I want dashboard cards to be visually distinct and attractive, so that I can easily scan and interact with different content types.

#### Acceptance Criteria

1. THE Dashboard_System SHALL apply consistent card styling with background color, border, padding (1.5rem minimum), and border-radius (rounded-2xl or larger)
2. WHEN displaying data cards, THE Dashboard_System SHALL include visual icon indicators with consistent sizing (20x20px minimum)
3. THE Dashboard_System SHALL use gradient backgrounds for premium or highlighted cards (ActiveSubscriptionCard_Component)
4. WHEN displaying image cards, THE Dashboard_System SHALL apply aspect-ratio constraints (square: 1/1, landscape: 16/9, portrait: 3/4)
5. THE Dashboard_System SHALL apply hover states to all interactive cards with border-color change to primary color
6. THE Dashboard_System SHALL ensure card shadows are subtle (shadow-sm) by default and elevated (shadow-md or shadow-lg) on hover

### Requirement 5: Enhanced Stats Visualization

**User Story:** As a user, I want statistical information to be visually engaging, so that I can quickly understand my activity metrics.

#### Acceptance Criteria

1. THE StatsRow_Component SHALL display each stat card with icon, label, value, and mini sparkline chart
2. THE StatsRow_Component SHALL use distinct colors for each stat category (favorites: red, albums: purple, orders: green, bookings: blue)
3. WHEN displaying sparkline charts, THE StatsRow_Component SHALL render line charts with 7 data points minimum
4. THE StatsRow_Component SHALL apply gradient fill to sparkline chart areas with 20% opacity
5. THE StatsRow_Component SHALL display numerical values with font-size of 1.875rem (30px) or larger
6. THE StatsRow_Component SHALL use uppercase labels with letter-spacing of 0.05em for visual distinction

### Requirement 6: Optimized Welcome Banner

**User Story:** As a user, I want a personalized welcome section, so that I feel recognized and engaged when I visit the dashboard.

#### Acceptance Criteria

1. THE WelcomeBanner_Component SHALL display user avatar with minimum size of 80x80 pixels
2. WHEN user has premium subscription, THE WelcomeBanner_Component SHALL display crown icon badge overlaying avatar
3. THE WelcomeBanner_Component SHALL apply glassmorphism effect using backdrop-blur and semi-transparent background
4. THE WelcomeBanner_Component SHALL display decorative gradient orbs with blur-3xl effect positioned absolutely
5. THE WelcomeBanner_Component SHALL use gradient background (from-primary/10 via-primary/5 to-background)
6. THE WelcomeBanner_Component SHALL display user's first name in primary color with font-size of 2rem or larger
7. WHEN viewport width is less than 768px, THE WelcomeBanner_Component SHALL center-align all content

### Requirement 7: Refined Quick Actions Interface

**User Story:** As a user, I want quick access to common actions, so that I can navigate efficiently to key features.

#### Acceptance Criteria

1. THE QuickActions_Component SHALL display 4 action buttons in grid layout
2. THE QuickActions_Component SHALL use distinct background colors for each action icon (blue, green, purple, orange)
3. WHEN user hovers over action button, THE QuickActions_Component SHALL scale icon by 1.1 within 200ms
4. THE QuickActions_Component SHALL display icon in rounded container (rounded-2xl) with padding of 0.75rem
5. THE QuickActions_Component SHALL use font-size of 0.75rem (12px) for action labels
6. THE QuickActions_Component SHALL apply shadow-lg to icon containers

### Requirement 8: Enhanced Content Lists

**User Story:** As a user, I want content lists to be scannable and visually organized, so that I can quickly find relevant information.

#### Acceptance Criteria

1. THE RecentFavorites_Component SHALL display items in grid with 1 column on mobile, 2 columns on tablet and desktop
2. THE RecentFavorites_Component SHALL display thumbnail images with size of 64x64 pixels minimum
3. WHEN displaying list items, THE Dashboard_System SHALL truncate text that exceeds container width with ellipsis
4. THE RecentOrders_Component SHALL display order items with divider lines between entries
5. THE GlobalTopPlaces_Component SHALL display place cards in grid with 2 columns on mobile, 3 columns on desktop
6. WHEN displaying place cards, THE GlobalTopPlaces_Component SHALL apply gradient overlay (from-black/80 via-transparent to-transparent) to images
7. THE Dashboard_System SHALL display "View All" links for expandable sections with hover underline effect

### Requirement 9: Improved Subscription Card

**User Story:** As a user, I want my subscription status to be clearly visible, so that I understand my current plan and can upgrade if needed.

#### Acceptance Criteria

1. THE ActiveSubscriptionCard_Component SHALL use dark gradient background (from-[#1A1A1A] to-[#333])
2. THE ActiveSubscriptionCard_Component SHALL display plan icon (ShieldCheck for premium, Zap for free)
3. THE ActiveSubscriptionCard_Component SHALL display plan name with font-size of 1.5rem or larger
4. THE ActiveSubscriptionCard_Component SHALL include call-to-action button with chevron icon
5. THE ActiveSubscriptionCard_Component SHALL apply decorative gradient orb (primary/20 with blur-2xl) positioned absolutely
6. WHEN user hovers over call-to-action button, THE ActiveSubscriptionCard_Component SHALL change background opacity from 10% to 20%

### Requirement 10: Consistent Loading States

**User Story:** As a user, I want to see appropriate loading indicators, so that I know the system is working when data is being fetched.

#### Acceptance Criteria

1. WHEN dashboard data is loading, THE Dashboard_System SHALL display centered loading spinner with primary color
2. THE Dashboard_System SHALL use Loader2 icon with spin animation and minimum size of 40x40 pixels
3. THE Dashboard_System SHALL center loading indicator both vertically and horizontally in viewport
4. THE Dashboard_System SHALL apply min-height of 100vh to loading container
5. WHEN data loads successfully, THE Dashboard_System SHALL remove loading indicator and display content with fade-in animation

### Requirement 11: Accessibility Enhancements

**User Story:** As a user with accessibility needs, I want the dashboard to be keyboard navigable and screen reader friendly, so that I can use all features effectively.

#### Acceptance Criteria

1. THE Dashboard_System SHALL ensure all interactive elements are keyboard accessible with visible focus indicators
2. THE Dashboard_System SHALL apply focus-visible styles with ring-2 ring-ring ring-offset-2
3. THE Dashboard_System SHALL use semantic HTML elements (nav, main, section, article) for proper document structure
4. THE Dashboard_System SHALL provide alt text for all images with descriptive content
5. THE Dashboard_System SHALL ensure color is not the only means of conveying information
6. THE Dashboard_System SHALL maintain focus order that follows visual layout (top to bottom, left to right)

### Requirement 12: Dark Mode Optimization

**User Story:** As a user who prefers dark mode, I want the dashboard to look attractive in dark theme, so that I can use the app comfortably in low-light conditions.

#### Acceptance Criteria

1. THE Dashboard_System SHALL support dark mode using CSS custom properties defined in index.css
2. WHEN dark mode is active, THE Dashboard_System SHALL use background color of hsl(220 35% 7%)
3. WHEN dark mode is active, THE Dashboard_System SHALL use card background color of hsl(220 30% 10%)
4. WHEN dark mode is active, THE Dashboard_System SHALL use primary color of hsl(200 90% 55%)
5. THE Dashboard_System SHALL ensure all text maintains WCAG AA contrast ratios in both light and dark modes
6. WHEN dark mode is active, THE Dashboard_System SHALL adjust shadow opacity to prevent excessive contrast

### Requirement 13: Performance Optimization

**User Story:** As a user, I want the dashboard to load and render quickly, so that I can access information without delays.

#### Acceptance Criteria

1. THE Dashboard_System SHALL render initial content within 2 seconds on 3G network connection
2. THE Dashboard_System SHALL lazy-load images that are below the fold
3. THE Dashboard_System SHALL use CSS transforms for animations instead of layout-triggering properties
4. THE Dashboard_System SHALL minimize layout shifts during content loading (CLS < 0.1)
5. THE Dashboard_System SHALL use will-change CSS property only on actively animating elements
6. THE Dashboard_System SHALL debounce resize event handlers with minimum 150ms delay

### Requirement 14: Grid Layout Consistency

**User Story:** As a user, I want content to be aligned and organized consistently, so that the interface feels cohesive and professional.

#### Acceptance Criteria

1. THE Dashboard_System SHALL use 12-column grid system for desktop layout (>1024px)
2. THE Dashboard_System SHALL apply consistent gap spacing of 2rem (32px) between grid columns
3. THE Dashboard_System SHALL use container max-width of 1280px for 2xl breakpoint
4. THE Dashboard_System SHALL apply horizontal padding of 1rem (16px) on mobile and 1.5rem (24px) on desktop
5. THE Dashboard_System SHALL align all section headings to grid columns
6. THE Dashboard_System SHALL maintain consistent vertical spacing of 2rem (32px) between major sections

### Requirement 15: Enhanced Empty States

**User Story:** As a new user with no data, I want to see helpful empty states, so that I understand what content will appear and how to add it.

#### Acceptance Criteria

1. WHEN RecentOrders_Component has no orders, THE Dashboard_System SHALL display centered message "Aucune commande pour le moment"
2. WHEN RecentFavorites_Component has no favorites, THE Dashboard_System SHALL hide the component entirely
3. THE Dashboard_System SHALL style empty state messages with italic text and muted-foreground color
4. THE Dashboard_System SHALL apply padding of 2rem to empty state containers
5. WHERE empty states include call-to-action, THE Dashboard_System SHALL display button with primary styling and icon

### Requirement 16: Skeleton Loading States

**User Story:** As a user, I want to see skeleton placeholders while content loads, so that I understand the layout structure and perceive faster loading times.

#### Acceptance Criteria

1. THE StatsRow_Component SHALL display 4 skeleton cards with shimmer animation while stats data is loading
2. THE RecentFavorites_Component SHALL display skeleton grid items (2-4 items) with shimmer animation while favorites data is loading
3. THE RecentOrders_Component SHALL display skeleton list items (3 items) with shimmer animation while orders data is loading
4. THE GlobalTopPlaces_Component SHALL display skeleton grid cards with shimmer animation while places data is loading
5. THE Dashboard_System SHALL use Skeleton component with pulse animation and matching dimensions to actual content
6. THE Dashboard_System SHALL replace skeleton placeholders with actual content using fade-in transition within 200ms
7. THE Dashboard_System SHALL display skeletons for individual sections independently based on their loading state
8. THE Dashboard_System SHALL use shimmer gradient animation moving from left to right with 2-second duration

### Requirement 17: Mobile Navigation Adaptation

**User Story:** As a mobile user, I want accessible navigation controls, so that I can easily move between different sections of the application.

#### Acceptance Criteria

1. WHEN viewport width is less than 768px, THE Dashboard_System SHALL ensure navigation is accessible via bottom navigation bar or drawer menu
2. THE Dashboard_System SHALL maintain navigation accessibility with touch targets of at least 44x44 pixels on mobile
3. THE Dashboard_System SHALL ensure dashboard content does not overlap with mobile navigation controls
4. THE Dashboard_System SHALL apply bottom padding of at least 80px to dashboard content on mobile to prevent content being hidden behind bottom navigation
5. THE Dashboard_System SHALL ensure all navigation links are reachable within one-handed thumb zone on mobile devices
6. WHEN mobile navigation is active, THE Dashboard_System SHALL highlight current page/section with distinct visual indicator

### Requirement 18: Error State Management

**User Story:** As a user, I want clear error messages and recovery options when data fails to load, so that I can understand what went wrong and try again.

#### Acceptance Criteria

1. WHEN data fetching fails for any section, THE Dashboard_System SHALL display error state with descriptive message in that section
2. THE Dashboard_System SHALL include retry button in error state with icon and clear label "Réessayer"
3. THE Dashboard_System SHALL style error states with destructive color (red) for icon and muted text for message
4. WHEN user clicks retry button, THE Dashboard_System SHALL re-fetch data for that specific section
5. THE Dashboard_System SHALL display different error messages for network errors vs. server errors vs. authentication errors
6. THE Dashboard_System SHALL log error details to console for debugging while showing user-friendly message in UI
7. WHEN global dashboard data fails, THE Dashboard_System SHALL display centered error state with retry button instead of spinner
8. THE Dashboard_System SHALL apply error state styling with border-destructive and bg-destructive/5 to error containers

### Requirement 19: Internationalization of Dates and Numbers

**User Story:** As a French-speaking user, I want dates and numbers formatted according to French conventions, so that information is familiar and easy to understand.

#### Acceptance Criteria

1. THE Dashboard_System SHALL format all dates using Intl.DateTimeFormat with locale 'fr-FR'
2. THE Dashboard_System SHALL format all currency values using Intl.NumberFormat with locale 'fr-FR' and appropriate currency code
3. THE Dashboard_System SHALL format large numbers (stats, counts) using Intl.NumberFormat with locale 'fr-FR' and space as thousands separator
4. WHEN displaying relative dates (e.g., "il y a 2 jours"), THE Dashboard_System SHALL use French language strings
5. THE Dashboard_System SHALL display dates in format "DD/MM/YYYY" or "DD MMM YYYY" (e.g., "25 avr. 2026")
6. THE Dashboard_System SHALL format decimal numbers with comma as decimal separator (e.g., "1 234,56")
7. THE Dashboard_System SHALL use French month and day names (janvier, février, lundi, mardi, etc.)
