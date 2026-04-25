# Implementation Tasks

## Phase 1: Foundation & Utilities

### Task 1: Create Utility Functions for Internationalization

**Requirements:** Req 19

Create utility functions for French locale formatting of dates, numbers, and currency.

**Sub-tasks:**

- [x] 1.1 Create `src/lib/utils/formatters.ts` file
- [x] 1.2 Implement `formatDate(date, format)` function using Intl.DateTimeFormat with 'fr-FR' locale
- [x] 1.3 Implement `formatNumber(value, options)` function using Intl.NumberFormat with 'fr-FR' locale
- [x] 1.4 Implement `formatCurrency(value, currency)` function with French formatting
- [x] 1.5 Implement `formatRelativeTime(date)` function for relative dates in French
- [x] 1.6 Add unit tests for all formatter functions

**Acceptance Criteria:**

- All dates display in DD/MM/YYYY or DD MMM YYYY format
- Numbers use space as thousands separator (1 234)
- Decimals use comma as separator (1 234,56)
- Relative times display in French (il y a 2 jours)

---

### Task 2: Create Skeleton Component System

**Requirements:** Req 16

Create reusable skeleton components with shimmer animation for loading states.

**Sub-tasks:**

- [x] 2.1 Verify `src/components/ui/skeleton.tsx` exists with shimmer animation
- [x] 2.2 Create `src/components/dashboard/skeletons/StatCardSkeleton.tsx`
- [x] 2.3 Create `src/components/dashboard/skeletons/FavoriteCardSkeleton.tsx`
- [x] 2.4 Create `src/components/dashboard/skeletons/OrderItemSkeleton.tsx`
- [x] 2.5 Create `src/components/dashboard/skeletons/PlaceCardSkeleton.tsx`
- [x] 2.6 Create `src/components/dashboard/skeletons/DashboardSkeleton.tsx` (full page skeleton)
- [x] 2.7 Add shimmer gradient animation with 2-second duration

**Acceptance Criteria:**

- Skeleton components match dimensions of actual content
- Shimmer animation moves left to right
- Skeletons use pulse animation
- All skeletons use consistent styling

---

### Task 3: Create Error State Components

**Requirements:** Req 18

Create reusable error components with retry functionality.

**Sub-tasks:**

- [x] 3.1 Create `src/components/dashboard/ErrorBoundary.tsx` component
- [x] 3.2 Create `src/components/dashboard/SectionError.tsx` component with retry button
- [x] 3.3 Add error message variants (network, server, auth)
- [x] 3.4 Style error states with destructive colors
- [x] 3.5 Add AlertCircle and RefreshCw icons from lucide-react
- [x] 3.6 Implement retry functionality that calls refetch

**Acceptance Criteria:**

- Error states display descriptive French messages
- Retry button triggers data refetch
- Error styling uses border-destructive and bg-destructive/5
- Console logs detailed errors for debugging

---

## Phase 2: Core Component Refactoring

### Task 4: Refactor DashboardPage with Loading and Error States

**Requirements:** Req 10, Req 16, Req 18

Update DashboardPage to use skeleton loading and error states.

**Sub-tasks:**

- [x] 4.1 Wrap DashboardPage with ErrorBoundary component
- [x] 4.2 Replace global spinner with DashboardSkeleton during initial load
- [x] 4.3 Add error state handling with retry functionality
- [x] 4.4 Implement staggered fade-in animations with delays (0ms, 100ms, 200ms, 300ms)
- [x] 4.5 Add semantic HTML structure (main, section, aside)
- [x] 4.6 Add skip-to-content link for accessibility
- [x] 4.7 Update bottom padding for mobile navigation (pb-20 on mobile, pb-6 on desktop)

**Acceptance Criteria:**

- Initial load shows full page skeleton
- Error state shows centered error with retry button
- Components fade in with staggered delays
- Semantic HTML structure is correct
- Skip-to-content link works with keyboard

---

### Task 5: Refactor WelcomeBanner Component

**Requirements:** Req 1, Req 3, Req 6, Req 11

Enhance WelcomeBanner with improved styling and accessibility.

**Sub-tasks:**

- [-] 5.1 Verify glassmorphism effect (backdrop-blur-xl, gradient background)
- [ ] 5.2 Ensure avatar size is 96x96 pixels (w-24 h-24)
- [ ] 5.3 Verify premium crown badge positioning and styling
- [ ] 5.4 Update heading to use text-3xl md:text-4xl font-black
- [ ] 5.5 Ensure first name is highlighted in primary color
- [ ] 5.6 Verify decorative gradient orbs with blur-3xl
- [ ] 5.7 Add responsive center alignment on mobile (< 768px)
- [ ] 5.8 Add proper alt text for avatar image
- [ ] 5.9 Ensure WCAG AA contrast ratios

**Acceptance Criteria:**

- Avatar is 96x96 pixels minimum
- Premium users see crown badge
- Glassmorphism effect is visible
- Mobile layout is center-aligned
- All text meets WCAG AA contrast

---

### Task 6: Refactor StatsRow Component with Skeletons

**Requirements:** Req 1, Req 3, Req 5, Req 16, Req 19

Enhance StatsRow with French formatting and skeleton loading.

**Sub-tasks:**

- [ ] 6.1 Add loading state that displays 4 StatCardSkeleton components
- [ ] 6.2 Update value display to use `formatNumber()` for French formatting
- [ ] 6.3 Verify sparkline charts have 7 data points minimum
- [ ] 6.4 Ensure gradient fill has 20% opacity (color + '22')
- [ ] 6.5 Verify numerical values use text-3xl font-black (1.875rem)
- [ ] 6.6 Ensure labels use uppercase with tracking-widest
- [ ] 6.7 Add hover effect (translateY(-2px) and shadow-md)
- [ ] 6.8 Verify responsive grid (1 col mobile, 2 cols tablet, 4 cols desktop)
- [ ] 6.9 Ensure icon size is 20x20 pixels minimum

**Acceptance Criteria:**

- Loading state shows 4 skeleton cards
- Numbers formatted with French locale (1 234)
- Sparkline charts render correctly
- Hover effects work smoothly
- Responsive grid adapts correctly

---

### Task 7: Refactor QuickActions Component

**Requirements:** Req 3, Req 7, Req 11

Enhance QuickActions with improved interactions and accessibility.

**Sub-tasks:**

- [ ] 7.1 Verify 2-column grid layout
- [ ] 7.2 Ensure icon containers use rounded-2xl with p-3
- [ ] 7.3 Add hover scale effect (scale-110) to icons with 200ms transition
- [ ] 7.4 Verify shadow-lg on icon containers
- [ ] 7.5 Ensure labels use text-xs font-bold
- [ ] 7.6 Add aria-label to each action link
- [ ] 7.7 Verify touch targets are 44x44 pixels minimum
- [ ] 7.8 Add focus-visible styles with ring

**Acceptance Criteria:**

- Icons scale on hover
- Touch targets meet 44x44px minimum
- Aria labels are descriptive
- Focus indicators are visible
- Grid displays 2 columns

---

### Task 8: Refactor RecentFavorites Component

**Requirements:** Req 3, Req 8, Req 16, Req 18

Enhance RecentFavorites with skeleton loading and error states.

**Sub-tasks:**

- [ ] 8.1 Add loading state with 4 FavoriteCardSkeleton components
- [ ] 8.2 Add error state using SectionError component
- [ ] 8.3 Verify thumbnail images are 64x64 pixels (w-16 h-16)
- [ ] 8.4 Add image hover scale effect (scale-110) with 500ms duration
- [ ] 8.5 Ensure text truncation with ellipsis
- [ ] 8.6 Verify responsive grid (1 col mobile, 2 cols tablet/desktop)
- [ ] 8.7 Add hover border color change to primary
- [ ] 8.8 Verify "Voir tout" link has hover underline
- [ ] 8.9 Keep empty state behavior (hide component if no favorites)

**Acceptance Criteria:**

- Loading shows 4 skeleton cards
- Error state shows retry button
- Images scale on hover
- Text truncates properly
- Empty state hides component

---

### Task 9: Refactor RecentOrders Component

**Requirements:** Req 8, Req 16, Req 18, Req 19

Enhance RecentOrders with French formatting, skeleton loading, and error states.

**Sub-tasks:**

- [ ] 9.1 Add loading state with 3 OrderItemSkeleton components
- [ ] 9.2 Add error state using SectionError component
- [ ] 9.3 Update date formatting to use `formatDate(order.created_at, 'long')`
- [ ] 9.4 Update price formatting to use `formatNumber(parseInt(order.total_price))`
- [ ] 9.5 Verify divider lines between order items
- [ ] 9.6 Add hover background color change (hover:bg-surface-alt)
- [ ] 9.7 Ensure empty state message is "Aucune commande pour le moment"
- [ ] 9.8 Verify empty state styling (italic, muted-foreground, p-8)

**Acceptance Criteria:**

- Loading shows 3 skeleton items
- Error state shows retry button
- Dates formatted as "25 avr. 2026"
- Numbers formatted as "1 234 €"
- Empty state displays correct message

---

### Task 10: Refactor GlobalTopPlaces Component

**Requirements:** Req 3, Req 8, Req 16, Req 18

Enhance GlobalTopPlaces with skeleton loading and error states.

**Sub-tasks:**

- [ ] 10.1 Add loading state with 6 PlaceCardSkeleton components
- [ ] 10.2 Add error state using SectionError component
- [ ] 10.3 Fix TypeScript error for `place.primary_image` (handle PlaceImageResponse type)
- [ ] 10.4 Verify aspect-square ratio for place cards
- [ ] 10.5 Ensure gradient overlay (from-black/80 via-transparent to-transparent)
- [ ] 10.6 Add image hover scale effect (scale-110) with 700ms duration
- [ ] 10.7 Verify responsive grid (2 cols mobile, 3 cols desktop)
- [ ] 10.8 Ensure text truncation for place names

**Acceptance Criteria:**

- Loading shows 6 skeleton cards
- Error state shows retry button
- TypeScript error is resolved
- Images scale on hover
- Gradient overlay is visible

---

### Task 11: Refactor ActiveSubscriptionCard Component

**Requirements:** Req 3, Req 9

Enhance ActiveSubscriptionCard with improved interactions.

**Sub-tasks:**

- [ ] 11.1 Verify dark gradient background (from-[#1A1A1A] to-[#333])
- [ ] 11.2 Ensure plan name uses text-2xl font-black
- [ ] 11.3 Verify decorative gradient orb (bg-primary/20 blur-2xl)
- [ ] 11.4 Add hover effect to CTA button (bg-white/10 to bg-white/20)
- [ ] 11.5 Ensure CTA button has 200ms transition
- [ ] 11.6 Verify icon display (ShieldCheck for premium, Zap for free)
- [ ] 11.7 Add aria-label to CTA link

**Acceptance Criteria:**

- Gradient background is correct
- CTA button hover effect works
- Icons display correctly
- Decorative orb is visible
- Aria label is descriptive

---

## Phase 3: Mobile Navigation

### Task 12: Create Bottom Navigation Component

**Requirements:** Req 17

Create mobile bottom navigation bar.

**Sub-tasks:**

- [ ] 12.1 Create `src/components/layout/BottomNav.tsx` component
- [ ] 12.2 Add 4 navigation items (Home, Explorer, Favoris, Profil)
- [ ] 12.3 Implement active state highlighting with primary color
- [ ] 12.4 Ensure touch targets are 44x44 pixels minimum
- [ ] 12.5 Add fixed positioning (fixed bottom-0 left-0 right-0)
- [ ] 12.6 Hide on desktop (md:hidden)
- [ ] 12.7 Add z-index (z-50) to stay above content
- [ ] 12.8 Add aria-current for active page
- [ ] 12.9 Style with bg-card and border-t

**Acceptance Criteria:**

- Bottom nav shows on mobile only
- Active page is highlighted
- Touch targets meet 44x44px
- Navigation is fixed at bottom
- Aria attributes are correct

---

### Task 13: Integrate Bottom Navigation with Dashboard

**Requirements:** Req 17

Integrate BottomNav component into DashboardPage.

**Sub-tasks:**

- [ ] 13.1 Import BottomNav component in DashboardPage
- [ ] 13.2 Add BottomNav component after main content
- [ ] 13.3 Update dashboard container padding (pb-20 on mobile, pb-6 on desktop)
- [ ] 13.4 Verify content doesn't overlap with bottom nav
- [ ] 13.5 Test navigation on mobile viewport

**Acceptance Criteria:**

- Bottom nav displays on mobile
- Content has proper bottom padding
- No overlap between content and nav
- Navigation works correctly

---

## Phase 4: Performance & Accessibility

### Task 14: Implement Lazy Loading for Images

**Requirements:** Req 13

Add lazy loading to all dashboard images.

**Sub-tasks:**

- [ ] 14.1 Install `react-lazy-load-image-component` if not already installed
- [ ] 14.2 Update RecentFavorites to use LazyLoadImage
- [ ] 14.3 Update GlobalTopPlaces to use LazyLoadImage
- [ ] 14.4 Add loading="lazy" attribute to WelcomeBanner avatar
- [ ] 14.5 Set threshold to 100px for lazy loading
- [ ] 14.6 Add blur effect during image load

**Acceptance Criteria:**

- Images below fold load lazily
- Blur effect shows during load
- Performance improves (measure LCP)
- No layout shifts occur

---

### Task 15: Add Memoization to Components

**Requirements:** Req 13

Optimize component rendering with React.memo and useMemo.

**Sub-tasks:**

- [ ] 15.1 Wrap StatCard component with React.memo
- [ ] 15.2 Add useMemo to chartData in StatCard
- [ ] 15.3 Wrap FavoriteCard with React.memo (if extracted)
- [ ] 15.4 Wrap OrderItem with React.memo (if extracted)
- [ ] 15.5 Wrap PlaceCard with React.memo (if extracted)
- [ ] 15.6 Add useMemo for expensive calculations

**Acceptance Criteria:**

- Components don't re-render unnecessarily
- Chart data is memoized
- Performance improves (measure render time)
- No functionality is broken

---

### Task 16: Implement Accessibility Enhancements

**Requirements:** Req 11

Add comprehensive accessibility features.

**Sub-tasks:**

- [ ] 16.1 Add semantic HTML structure (main, section, aside, article)
- [ ] 16.2 Add ARIA landmarks and labels to all sections
- [ ] 16.3 Add skip-to-content link at top of page
- [ ] 16.4 Verify focus-visible styles on all interactive elements
- [ ] 16.5 Add descriptive alt text to all images
- [ ] 16.6 Verify keyboard navigation works for all interactive elements
- [ ] 16.7 Test with screen reader (NVDA or JAWS)
- [ ] 16.8 Verify focus order follows visual layout
- [ ] 16.9 Add aria-live regions for dynamic content

**Acceptance Criteria:**

- All interactive elements are keyboard accessible
- Focus indicators are visible
- Screen reader announces content correctly
- Skip-to-content link works
- ARIA labels are descriptive

---

### Task 17: Verify Dark Mode Compatibility

**Requirements:** Req 12

Test and fix dark mode styling across all components.

**Sub-tasks:**

- [ ] 17.1 Test WelcomeBanner in dark mode
- [ ] 17.2 Test StatsRow in dark mode
- [ ] 17.3 Test QuickActions in dark mode
- [ ] 17.4 Test RecentFavorites in dark mode
- [ ] 17.5 Test RecentOrders in dark mode
- [ ] 17.6 Test GlobalTopPlaces in dark mode
- [ ] 17.7 Test ActiveSubscriptionCard in dark mode
- [ ] 17.8 Verify contrast ratios meet WCAG AA in dark mode
- [ ] 17.9 Adjust shadow opacity if needed

**Acceptance Criteria:**

- All components look good in dark mode
- Contrast ratios meet WCAG AA
- Shadows are appropriate
- No visual glitches
- Theme toggle works smoothly

---

## Phase 5: Testing & Polish

### Task 18: Write Unit Tests for Utility Functions

**Requirements:** Req 19

Create comprehensive tests for formatter utilities.

**Sub-tasks:**

- [ ] 18.1 Write tests for formatDate function
- [ ] 18.2 Write tests for formatNumber function
- [ ] 18.3 Write tests for formatCurrency function
- [ ] 18.4 Write tests for formatRelativeTime function
- [ ] 18.5 Test edge cases (null, undefined, invalid dates)
- [ ] 18.6 Verify French locale formatting

**Acceptance Criteria:**

- All formatter functions have tests
- Edge cases are covered
- Tests pass consistently
- Code coverage > 80%

---

### Task 19: Write Component Tests

**Requirements:** All

Create tests for dashboard components.

**Sub-tasks:**

- [ ] 19.1 Write tests for DashboardPage (loading, error, success states)
- [ ] 19.2 Write tests for WelcomeBanner (premium vs free user)
- [ ] 19.3 Write tests for StatsRow (rendering, formatting)
- [ ] 19.4 Write tests for QuickActions (navigation, hover)
- [ ] 19.5 Write tests for RecentFavorites (loading, error, empty, success)
- [ ] 19.6 Write tests for RecentOrders (loading, error, empty, success)
- [ ] 19.7 Write tests for GlobalTopPlaces (loading, error, success)
- [ ] 19.8 Write tests for ActiveSubscriptionCard

**Acceptance Criteria:**

- All components have tests
- Loading, error, and success states are tested
- User interactions are tested
- Tests pass consistently

---

### Task 20: Accessibility Testing

**Requirements:** Req 11

Perform comprehensive accessibility testing.

**Sub-tasks:**

- [ ] 20.1 Run axe-core accessibility tests
- [ ] 20.2 Test keyboard navigation through entire dashboard
- [ ] 20.3 Test with screen reader (NVDA or JAWS)
- [ ] 20.4 Verify color contrast with tools (WebAIM, Lighthouse)
- [ ] 20.5 Test focus management
- [ ] 20.6 Verify ARIA attributes are correct
- [ ] 20.7 Fix any accessibility violations found

**Acceptance Criteria:**

- No axe-core violations
- Keyboard navigation works completely
- Screen reader announces correctly
- Color contrast meets WCAG AA
- Focus management is correct

---

### Task 21: Performance Testing

**Requirements:** Req 13

Measure and optimize dashboard performance.

**Sub-tasks:**

- [ ] 21.1 Run Lighthouse performance audit
- [ ] 21.2 Measure Core Web Vitals (LCP, FID, CLS)
- [ ] 21.3 Verify CLS < 0.1
- [ ] 21.4 Verify LCP < 2.5s
- [ ] 21.5 Verify FID < 100ms
- [ ] 21.6 Test on 3G network throttling
- [ ] 21.7 Optimize any performance bottlenecks found

**Acceptance Criteria:**

- Lighthouse score > 90
- LCP < 2.5 seconds
- FID < 100ms
- CLS < 0.1
- Dashboard loads in < 2s on 3G

---

### Task 22: Cross-Browser Testing

**Requirements:** All

Test dashboard across different browsers and devices.

**Sub-tasks:**

- [ ] 22.1 Test on Chrome (desktop and mobile)
- [ ] 22.2 Test on Firefox (desktop and mobile)
- [ ] 22.3 Test on Safari (desktop and mobile)
- [ ] 22.4 Test on Edge
- [ ] 22.5 Test responsive breakpoints (320px, 640px, 768px, 1024px, 1280px)
- [ ] 22.6 Fix any browser-specific issues
- [ ] 22.7 Verify animations work smoothly on all browsers

**Acceptance Criteria:**

- Dashboard works on all major browsers
- Responsive design works at all breakpoints
- No visual glitches
- Animations are smooth
- No console errors

---

### Task 23: Final Polish and Code Review

**Requirements:** All

Final review and polish before deployment.

**Sub-tasks:**

- [ ] 23.1 Review all component code for consistency
- [ ] 23.2 Verify all Tailwind classes follow design system
- [ ] 23.3 Remove any console.log statements
- [ ] 23.4 Verify all TypeScript types are correct
- [ ] 23.5 Check for unused imports and variables
- [ ] 23.6 Verify all comments are helpful and up-to-date
- [ ] 23.7 Run ESLint and fix any warnings
- [ ] 23.8 Format code with Prettier
- [ ] 23.9 Update documentation if needed

**Acceptance Criteria:**

- Code is clean and consistent
- No TypeScript errors
- No ESLint warnings
- Code is properly formatted
- Documentation is up-to-date

---

## Summary

**Total Tasks:** 23
**Estimated Effort:** 5-7 days for a single developer

**Priority Order:**

1. Phase 1 (Tasks 1-3): Foundation - Required for all other tasks
2. Phase 2 (Tasks 4-11): Core Components - Main implementation work
3. Phase 3 (Tasks 12-13): Mobile Navigation - Critical for mobile UX
4. Phase 4 (Tasks 14-17): Performance & Accessibility - Quality improvements
5. Phase 5 (Tasks 18-23): Testing & Polish - Final validation

**Dependencies:**

- Task 1 must be completed before Tasks 6, 9 (formatters needed)
- Task 2 must be completed before Tasks 4, 6, 8, 9, 10 (skeletons needed)
- Task 3 must be completed before Tasks 4, 8, 9, 10 (error states needed)
- Task 12 must be completed before Task 13 (BottomNav needed)
- All implementation tasks (1-13) should be completed before testing tasks (18-23)
