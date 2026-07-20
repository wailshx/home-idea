# Home Idea — Frontend Architecture

> Production-ready React architecture. Feature-based, type-safe, scalable.

---

## Table of Contents

1. [Architecture Principles](#1-architecture-principles)
2. [Folder Structure](#2-folder-structure)
3. [Feature Modules](#3-feature-modules)
4. [Reusable UI Components](#4-reusable-ui-components)
5. [Hooks](#5-hooks)
6. [Services Layer](#6-services-layer)
7. [API Layer](#7-api-layer)
8. [State Management](#8-state-management)
9. [Utilities](#9-utilities)
10. [Types](#10-types)
11. [Constants](#11-constants)
12. [Animations](#12-animations)
13. [Assets](#13-assets)
14. [Best Practices](#14-best-practices)

---

## 1. Architecture Principles

### Core Tenets

1. **Feature-based organization** — Code is grouped by domain, not by type. A "product" feature contains its components, hooks, services, and types together.
2. **Colocation** — Files that change together live together. A product card's styles, tests, and types are in the same directory.
3. **Explicit boundaries** — Features communicate through public APIs (index.ts barrel exports). No reaching into other features' internals.
4. **Type safety** — TypeScript strict mode. No `any`. All API responses, props, and state are typed.
5. **Server state is remote** — API data lives in React Query cache, not local state. Local state is for UI-only concerns.
6. **Composition over configuration** — Small, composable components. No mega-components with 20 props.
7. **Convention over configuration** — Consistent naming, file patterns, and import paths. No surprises.

### Technology Choices

| Concern | Choice | Why |
|---------|--------|-----|
| Framework | React 18 + Vite | Fast dev, fast build, mature ecosystem |
| Language | TypeScript (strict) | Type safety, IDE support, refactoring confidence |
| Routing | React Router v6 | Nested routes, layouts, data loading |
| Server State | TanStack React Query | Caching, background refetch, optimistic updates |
| Forms | React Hook Form + Zod | Performance (uncontrolled), validation, type inference |
| Styling | Tailwind CSS + shadcn/ui | Utility-first, consistent design system, accessible |
| Backend | Supabase | Auth, DB, storage, realtime, edge functions |
| Animation | CSS animations + GSAP (optional) | CSS for micro-interactions, GSAP for scroll/complex |
| Notifications | Sonner | Lightweight, unobtrusive, dark-mode native |

---

## 2. Folder Structure

```
src/
├── app/                          # App shell and global configuration
│   ├── providers.tsx             # All providers composed (Query, Auth, Cart, Theme)
│   ├── router.tsx                # Route definitions (lazy-loaded)
│   ├── layout.tsx                # Root layout (Navbar + Footer + Outlet)
│   ├── error-boundary.tsx        # Global error boundary
│   └── head.tsx                  # Default <head> meta tags
│
├── features/                     # Feature modules (domain-based)
│   ├── auth/                     # Authentication feature
│   │   ├── index.ts              # Public API
│   │   ├── components/
│   │   │   ├── LoginDialog.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── ForgotPasswordForm.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── useSession.ts
│   │   ├── services/
│   │   │   └── auth.service.ts
│   │   ├── types.ts
│   │   └── constants.ts
│   │
│   ├── products/                 # Product catalog feature
│   │   ├── index.ts
│   │   ├── components/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductHero.tsx
│   │   │   ├── ProductSpecs.tsx
│   │   │   ├── ProductGallery.tsx
│   │   │   ├── RelatedProducts.tsx
│   │   │   └── ProductFilters.tsx
│   │   ├── hooks/
│   │   │   ├── useProduct.ts
│   │   │   ├── useProducts.ts
│   │   │   ├── useCategory.ts
│   │   │   └── useCategories.ts
│   │   ├── services/
│   │   │   ├── products.service.ts
│   │   │   └── categories.service.ts
│   │   ├── types.ts
│   │   └── constants.ts
│   │
│   ├── cart/                     # Shopping cart feature
│   │   ├── index.ts
│   │   ├── components/
│   │   │   ├── CartDrawer.tsx
│   │   │   ├── CartItem.tsx
│   │   │   ├── CartSummary.tsx
│   │   │   └── CartBadge.tsx
│   │   ├── hooks/
│   │   │   └── useCart.ts
│   │   ├── store.ts              # Zustand store
│   │   ├── types.ts
│   │   └── constants.ts
│   │
│   ├── checkout/                 # Checkout feature
│   │   ├── index.ts
│   │   ├── components/
│   │   │   ├── CheckoutForm.tsx
│   │   │   ├── ShippingSection.tsx
│   │   │   ├── PaymentSection.tsx
│   │   │   ├── OrderSummary.tsx
│   │   │   └── ConfirmationScreen.tsx
│   │   ├── hooks/
│   │   │   └── useCheckout.ts
│   │   ├── services/
│   │   │   └── orders.service.ts
│   │   ├── schema.ts             # Zod validation schemas
│   │   ├── types.ts
│   │   └── constants.ts
│   │
│   ├── projects/                 # Aménagement projects feature
│   │   ├── index.ts
│   │   ├── components/
│   │   │   ├── ProjectWizard.tsx
│   │   │   ├── RoomSelector.tsx
│   │   │   ├── StyleSelector.tsx
│   │   │   ├── BudgetSelector.tsx
│   │   │   ├── SurfaceSlider.tsx
│   │   │   └── ProjectContactForm.tsx
│   │   ├── hooks/
│   │   │   ├── useProject.ts
│   │   │   └── useProjects.ts
│   │   ├── services/
│   │   │   └── projects.service.ts
│   │   ├── schema.ts
│   │   ├── types.ts
│   │   └── constants.ts
│   │
│   ├── appointments/             # Appointment booking feature
│   │   ├── index.ts
│   │   ├── components/
│   │   │   ├── CalendarPicker.tsx
│   │   │   ├── TimeSlotPicker.tsx
│   │   │   └── AppointmentForm.tsx
│   │   ├── hooks/
│   │   │   └── useAppointments.ts
│   │   ├── services/
│   │   │   └── appointments.service.ts
│   │   ├── types.ts
│   │   └── constants.ts
│   │
│   ├── reviews/                  # Reviews feature
│   │   ├── index.ts
│   │   ├── components/
│   │   │   ├── ReviewCard.tsx
│   │   │   ├── ReviewList.tsx
│   │   │   ├── ReviewForm.tsx
│   │   │   ├── RatingStars.tsx
│   │   │   └── ReviewSummary.tsx
│   │   ├── hooks/
│   │   │   ├── useReviews.ts
│   │   │   └── useReviewForm.ts
│   │   ├── services/
│   │   │   └── reviews.service.ts
│   │   ├── schema.ts
│   │   ├── types.ts
│   │   └── constants.ts
│   │
│   ├── wishlist/                 # Wishlist feature
│   │   ├── index.ts
│   │   ├── components/
│   │   │   ├── WishlistButton.tsx
│   │   │   └── WishlistGrid.tsx
│   │   ├── hooks/
│   │   │   └── useWishlist.ts
│   │   ├── services/
│   │   │   └── wishlist.service.ts
│   │   ├── types.ts
│   │   └── constants.ts
│   │
│   ├── blog/                     # Blog feature
│   │   ├── index.ts
│   │   ├── components/
│   │   │   ├── BlogPostCard.tsx
│   │   │   ├── BlogGrid.tsx
│   │   │   ├── BlogSidebar.tsx
│   │   │   ├── BlogHero.tsx
│   │   │   └── CommentSection.tsx
│   │   ├── hooks/
│   │   │   ├── useBlogPost.ts
│   │   │   └── useBlogPosts.ts
│   │   ├── services/
│   │   │   └── blog.service.ts
│   │   ├── types.ts
│   │   └── constants.ts
│   │
│   ├── search/                   # Search feature
│   │   ├── index.ts
│   │   ├── components/
│   │   │   ├── SearchBar.tsx
│   │   │   ├── SearchResults.tsx
│   │   │   ├── SearchFilters.tsx
│   │   │   └── RecentSearches.tsx
│   │   ├── hooks/
│   │   │   └── useSearch.ts
│   │   ├── services/
│   │   │   └── search.service.ts
│   │   ├── types.ts
│   │   └── constants.ts
│   │
│   ├── account/                  # User account feature
│   │   ├── index.ts
│   │   ├── components/
│   │   │   ├── AccountSidebar.tsx
│   │   │   ├── ProfileForm.tsx
│   │   │   ├── OrderHistory.tsx
│   │   │   ├── OrderDetail.tsx
│   │   │   └── SettingsPanel.tsx
│   │   ├── hooks/
│   │   │   ├── useProfile.ts
│   │   │   └── useOrders.ts
│   │   ├── services/
│   │   │   └── account.service.ts
│   │   ├── schema.ts
│   │   ├── types.ts
│   │   └── constants.ts
│   │
│   ├── notifications/            # Notifications feature
│   │   ├── index.ts
│   │   ├── components/
│   │   │   ├── NotificationBell.tsx
│   │   │   ├── NotificationList.tsx
│   │   │   └── NotificationItem.tsx
│   │   ├── hooks/
│   │   │   └── useNotifications.ts
│   │   ├── services/
│   │   │   └── notifications.service.ts
│   │   ├── types.ts
│   │   └── constants.ts
│   │
│   └── cms/                      # CMS feature (admin)
│       ├── index.ts
│       ├── components/
│       │   ├── PageEditor.tsx
│       │   ├── MediaLibrary.tsx
│       │   ├── SettingsPanel.tsx
│       │   └── NavigationEditor.tsx
│       ├── hooks/
│       │   └── useCms.ts
│       ├── services/
│       │   └── cms.service.ts
│       ├── types.ts
│       └── constants.ts
│
├── layouts/                      # Page layout components
│   ├── RootLayout.tsx            # Navbar + Footer + main wrapper
│   ├── AdminLayout.tsx           # Sidebar + admin header + Outlet
│   ├── AccountLayout.tsx         # Account sidebar + Outlet
│   └── MinimalLayout.tsx         # No navbar/footer (auth pages)
│
├── pages/                        # Page components (thin, compose features)
│   ├── home/
│   │   └── HomePage.tsx
│   ├── catalog/
│   │   └── CatalogPage.tsx
│   ├── product/
│   │   └── ProductDetailPage.tsx
│   ├── cart/
│   │   └── CartPage.tsx
│   ├── checkout/
│   │   └── CheckoutPage.tsx
│   ├── amenagement/
│   │   └── AmenagementPage.tsx
│   ├── about/
│   │   └── AboutPage.tsx
│   ├── contact/
│   │   └── ContactPage.tsx
│   ├── search/
│   │   └── SearchPage.tsx
│   ├── blog/
│   │   ├── BlogListPage.tsx
│   │   └── BlogPostPage.tsx
│   ├── account/
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── OrdersPage.tsx
│   │   ├── WishlistPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── SettingsPage.tsx
│   ├── legal/
│   │   ├── MentionsLegalesPage.tsx
│   │   ├── CGVPage.tsx
│   │   ├── ConfidentialitePage.tsx
│   │   └── CookiesPage.tsx
│   └── not-found/
│       └── NotFoundPage.tsx
│
├── shared/                       # Shared, non-feature-specific code
│   ├── components/               # Reusable UI components
│   │   ├── ui/                   # shadcn/ui components (51 files)
│   │   ├── layout/               # Layout primitives
│   │   │   ├── Container.tsx
│   │   │   ├── Section.tsx
│   │   │   ├── Grid.tsx
│   │   │   ├── Stack.tsx
│   │   │   ├── Split.tsx
│   │   │   └── AspectRatio.tsx
│   │   ├── display/              # Display components
│   │   │   ├── Overline.tsx
│   │   │   ├── Heading.tsx
│   │   │   ├── Price.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   └── LoadingState.tsx
│   │   ├── feedback/             # Feedback components
│   │   │   ├── Toast.tsx
│   │   │   ├── Alert.tsx
│   │   │   ├── ConfirmDialog.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── Spinner.tsx
│   │   ├── navigation/           # Navigation components
│   │   │   ├── Breadcrumb.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── Tabs.tsx
│   │   │   └── BackLink.tsx
│   │   └── forms/                # Form components
│   │       ├── FormField.tsx
│   │       ├── FormInput.tsx
│   │       ├── FormTextarea.tsx
│   │       ├── FormSelect.tsx
│   │       ├── FormCheckbox.tsx
│   │       ├── FormRadioGroup.tsx
│   │       ├── FormChipSelect.tsx
│   │       ├── FormRangeSlider.tsx
│   │       ├── FormPhoneInput.tsx
│   │       └── FormSubmitButton.tsx
│   │
│   ├── hooks/                    # Shared custom hooks
│   │   ├── useDebounce.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useScrollPosition.ts
│   │   ├── useIntersectionObserver.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useClickOutside.ts
│   │   ├── useKeyboard.ts
│   │   ├── useBodyScroll.ts
│   │   └── usePrevious.ts
│   │
│   ├── lib/                      # Core libraries and utilities
│   │   ├── supabase.ts           # Supabase client singleton
│   │   ├── queryClient.ts        # React Query client config
│   │   ├── formatters.ts         # Currency, date, phone formatters
│   │   ├── validators.ts         # Shared Zod schemas
│   │   ├── storage.ts            # localStorage abstraction
│   │   ├── animations.ts         # Animation presets and helpers
│   │   ├── seo.ts                # SEO helper functions
│   │   └── cn.ts                 # clsx + tailwind-merge
│   │
│   ├── types/                    # Shared TypeScript types
│   │   ├── api.ts                # API response types
│   │   ├── database.ts           # Supabase generated types
│   │   ├── global.ts             # Global type declarations
│   │   └── utils.ts              # Utility types (Partial, Pick, etc.)
│   │
│   └── constants/                # Shared constants
│       ├── routes.ts             # Route path constants
│       ├── config.ts             # App configuration
│       ├── messages.ts           # User-facing messages
│       └── theme.ts              # Design tokens as constants
│
├── assets/                       # Static assets
│   ├── images/                   # Product and category images
│   ├── icons/                    # Custom SVG icons (if any)
│   └── fonts/                    # Self-hosted fonts (if any)
│
├── styles/                       # Global styles
│   ├── index.css                 # Tailwind directives + design tokens
│   ├── animations.css            # Keyframe animations
│   └── typography.css            # Font definitions
│
├── App.tsx                       # App entry (providers + router)
├── main.tsx                      # DOM render
├── vite-env.d.ts                 # Vite type declarations
└── index.html                    # HTML entry
```

---

## 3. Feature Modules

### Anatomy of a Feature

Every feature follows this structure:

```
features/
└── products/
    ├── index.ts              # Public API (barrel export)
    ├── components/           # UI components
    ├── hooks/                # Business logic hooks
    ├── services/             # API calls
    ├── schema.ts             # Zod validation schemas
    ├── types.ts              # Feature-specific types
    └── constants.ts          # Feature-specific constants
```

### Feature Index (Public API)

Every feature exports its public API through `index.ts`:

```typescript
// features/products/index.ts

// Components
export { ProductCard } from './components/ProductCard'
export { ProductGrid } from './components/ProductGrid'
export { ProductHero } from './components/ProductHero'

// Hooks
export { useProduct } from './hooks/useProduct'
export { useProducts } from './hooks/useProducts'
export { useCategory } from './hooks/useCategory'

// Types
export type { Product, ProductVariant, ProductImage } from './types'

// Constants
export { PRODUCT_STATUSES } from './constants'
```

### Feature Communication Rules

1. **Never import from another feature's internal files.** Only import from `features/{name}`.
2. **Shared types** go in `shared/types/`, not in a specific feature.
3. **Shared components** go in `shared/components/`, not in a specific feature.
4. **If two features need the same data**, create a shared hook in `shared/hooks/`.

### Feature Dependency Graph

```
auth ← (independent)
products ← (independent)
cart ← products (for product data)
checkout ← cart, auth, products
reviews ← products, auth
wishlist ← products, auth
search ← products
account ← auth, orders
notifications ← auth
blog ← (independent)
cms ← (independent)
projects ← auth
appointments ← auth, projects
```

---

## 4. Reusable UI Components

### 4.1 Layout Primitives

#### Container
```typescript
interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'section' | 'article'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}
// sm: max-w-3xl, md: max-w-5xl, lg: max-w-7xl, xl: max-w-[1400px]
```

#### Section
```typescript
interface SectionProps {
  children: React.ReactNode
  className?: string
  as?: 'section' | 'div'
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  // none: 0, sm: 32px, md: 48px, lg: 80px, xl: 96px (vertical padding)
}
```

#### Grid
```typescript
interface GridProps {
  children: React.ReactNode
  className?: string
  cols?: { sm?: number; md?: number; lg?: number }
  gap?: 'sm' | 'md' | 'lg'
  // sm: 12px, md: 16px, lg: 24px
}
```

#### Split
```typescript
interface SplitProps {
  children: React.ReactNode
  className?: string
  ratio?: '1:1' | '1:2' | '2:1' | '3:7' | '7:3'
  align?: 'start' | 'center' | 'end'
  gap?: 'sm' | 'md' | 'lg'
}
```

### 4.2 Display Components

#### Overline
```typescript
interface OverlineProps {
  children: React.ReactNode
  className?: string
  as?: 'p' | 'span' | 'div'
}
// Renders: 12px, uppercase, 0.4em letter-spacing, gold color
```

#### Heading
```typescript
interface HeadingProps {
  children: React.ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  gradient?: boolean  // Gold gradient text
}
// Maps level to DM Serif Display sizes
```

#### Price
```typescript
interface PriceProps {
  amount: number           // In cents
  currency?: string        // Default: 'EUR'
  compareAt?: number       // Strikethrough price
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}
// Formats: 1 290 € (French locale)
```

#### EmptyState
```typescript
interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: { label: string; href?: string; onClick?: () => void }
  className?: string
}
```

#### LoadingState
```typescript
interface LoadingStateProps {
  type?: 'page' | 'section' | 'card' | 'inline'
  count?: number           // Number of skeleton items
  className?: string
}
```

### 4.3 Form Components

#### FormField
```typescript
interface FormFieldProps {
  label: string
  error?: string
  hint?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}
// Wraps label + input + error/hint in consistent layout
```

#### FormInput
```typescript
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
  leftIcon?: LucideIcon
  rightIcon?: LucideIcon
}
// 48px height, gold focus ring, consistent styling
```

#### FormChipSelect
```typescript
interface FormChipSelectProps<T extends string> {
  label: string
  options: { value: T; label: string }[]
  value: T[]
  onChange: (value: T[]) => void
  multiple?: boolean
  error?: string
}
// Multi-select chip buttons for amenagement rooms, styles, etc.
```

### 4.4 Component Rules

1. **Every component has a TypeScript interface** for its props.
2. **Components are pure** — no side effects, no data fetching. Data comes from hooks.
3. **Components are composable** — small pieces that combine, not large pieces that configure.
4. **Components use `forwardRef`** when they wrap DOM elements (inputs, buttons).
5. **Components accept `className`** for style overrides via `cn()`.
6. **Components are tested** — at minimum, render tests for all shared components.

---

## 5. Hooks

### 5.1 Feature Hooks (in each feature's `hooks/` directory)

#### Product Hooks
```typescript
// features/products/hooks/useProduct.ts
function useProduct(slug: string): {
  product: Product | null
  isLoading: boolean
  error: Error | null
}

// features/products/hooks/useProducts.ts
function useProducts(filters?: ProductFilters): {
  products: Product[]
  isLoading: boolean
  error: Error | null
  total: number
}

// features/products/hooks/useCategory.ts
function useCategory(slug: string): {
  category: Category | null
  products: Product[]
  isLoading: boolean
}
```

#### Cart Hooks
```typescript
// features/cart/hooks/useCart.ts
function useCart(): {
  items: CartItem[]
  addItem: (productId: string, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
  itemsWithDetails: CartItemWithProduct[]
}
```

#### Checkout Hooks
```typescript
// features/checkout/hooks/useCheckout.ts
function useCheckout(): {
  submitOrder: (data: CheckoutFormData) => Promise<Order>
  isSubmitting: boolean
  error: Error | null
}
```

#### Auth Hooks
```typescript
// features/auth/hooks/useAuth.ts
function useAuth(): {
  user: User | null
  session: Session | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
}

// features/auth/hooks/useSession.ts
function useSession(): {
  user: User | null
  profile: Profile | null
  roles: string[]
  hasRole: (role: string) => boolean
}
```

### 5.2 Shared Hooks (in `shared/hooks/`)

```typescript
// shared/hooks/useDebounce.ts
function useDebounce<T>(value: T, delay: number): T

// shared/hooks/useMediaQuery.ts
function useMediaQuery(query: string): boolean

// shared/hooks/useScrollPosition.ts
function useScrollPosition(): number

// shared/hooks/useIntersectionObserver.ts
function useIntersectionObserver(
  ref: RefObject<HTMLElement>,
  options?: IntersectionObserverInit
): { isIntersecting: boolean; entry: IntersectionObserverEntry | null }

// shared/hooks/useLocalStorage.ts
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void]

// shared/hooks/useClickOutside.ts
function useClickOutside(ref: RefObject<HTMLElement>, handler: () => void): void

// shared/hooks/useBodyScroll.ts
function useBodyScroll(locked: boolean): void
```

---

## 6. Services Layer

### 6.1 Service Pattern

Every feature has a service file that wraps Supabase calls:

```typescript
// features/products/services/products.service.ts

import { supabase } from '@/shared/lib/supabase'
import type { Product, ProductFilters } from '../types'

export const productsService = {
  async getBySlug(slug: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(*), images:product_images(*)')
      .eq('slug', slug)
      .is('deleted_at', null)
      .single()

    if (error) throw error
    return data
  },

  async list(filters?: ProductFilters): Promise<{ products: Product[]; total: number }> {
    let query = supabase
      .from('products')
      .select('*, category:categories(*), images:product_images(*)', { count: 'exact' })
      .is('deleted_at', null)
      .eq('status', 'published')

    if (filters?.category_id) query = query.eq('category_id', filters.category_id)
    if (filters?.min_price) query = query.gte('price_cents', filters.min_price)
    if (filters?.max_price) query = query.lte('price_cents', filters.max_price)
    if (filters?.search) query = query.textSearch('name', filters.search)

    const { data, error, count } = await query
      .order('sort_order')
      .range(0, (filters?.page || 1) * (filters?.per_page || 20) - 1)

    if (error) throw error
    return { products: data || [], total: count || 0 }
  },

  async getFeatured(limit = 6): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(*), images:product_images(*)')
      .eq('is_featured', true)
      .eq('status', 'published')
      .is('deleted_at', null)
      .order('sort_order')
      .limit(limit)

    if (error) throw error
    return data || []
  },
}
```

### 6.2 Service Rules

1. **Services are pure functions.** No React hooks, no side effects.
2. **Services throw on error.** Callers handle errors.
3. **Services return typed data.** Never return raw Supabase responses.
4. **Services use the shared Supabase client.** Never create new clients.
5. **Services are testable.** Mock the Supabase client, test the logic.

---

## 7. API Layer

### 7.1 Supabase Client

```typescript
// shared/lib/supabase.ts

import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/shared/types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
```

### 7.2 React Query Integration

```typescript
// shared/lib/queryClient.ts

import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // 5 minutes
      gcTime: 30 * 60 * 1000,        // 30 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
})
```

### 7.3 Query Key Factory

```typescript
// shared/lib/queryKeys.ts

export const queryKeys = {
  products: {
    all: ['products'] as const,
    bySlug: (slug: string) => ['products', slug] as const,
    byCategory: (slug: string) => ['products', 'category', slug] as const,
    featured: ['products', 'featured'] as const,
    search: (query: string) => ['products', 'search', query] as const,
  },
  categories: {
    all: ['categories'] as const,
    bySlug: (slug: string) => ['categories', slug] as const,
  },
  orders: {
    all: ['orders'] as const,
    byId: (id: string) => ['orders', id] as const,
    mine: ['orders', 'mine'] as const,
  },
  reviews: {
    byProduct: (productId: string) => ['reviews', 'product', productId] as const,
  },
  blog: {
    all: ['blog'] as const,
    bySlug: (slug: string) => ['blog', slug] as const,
  },
  cart: ['cart'] as const,
  wishlist: ['wishlist'] as const,
  profile: ['profile'] as const,
} as const
```

### 7.4 Hook Pattern (React Query)

```typescript
// features/products/hooks/useProduct.ts

import { useQuery } from '@tanstack/react-query'
import { productsService } from '../services/products.service'
import { queryKeys } from '@/shared/lib/queryKeys'

export function useProduct(slug: string) {
  return useQuery({
    queryKey: queryKeys.products.bySlug(slug),
    queryFn: () => productsService.getBySlug(slug),
    enabled: !!slug,
  })
}
```

---

## 8. State Management

### 8.1 State Categories

| Category | Tool | Examples |
|----------|------|----------|
| **Server State** | React Query | Products, orders, reviews, blog posts |
| **Client State (Simple)** | React Context | Cart, Auth |
| **Client State (Complex)** | Zustand | UI state, form wizard state |
| **Form State** | React Hook Form | Checkout form, contact form, project config |
| **URL State** | React Router | Search filters, pagination, active tab |
| **Local State** | useState | Modal open/close, hover state, temporary input |

### 8.2 Zustand Store Pattern

```typescript
// features/cart/store.ts

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartState {
  items: CartItem[]
  addItem: (productId: string, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: () => number
  subtotal: (products: Product[]) => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === productId)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === productId
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            }
          }
          return { items: [...state.items, { productId, quantity }] }
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId
              ? { ...i, quantity: Math.max(1, quantity) }
              : i
          ),
        })),

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: (products) =>
        get().items.reduce((sum, i) => {
          const product = products.find((p) => p.id === i.productId)
          return sum + (product?.price_cents || 0) * i.quantity
        }, 0),
    }),
    {
      name: 'home-idea-cart',
    }
  )
)
```

### 8.3 State Rules

1. **Server state goes in React Query.** Never store API responses in local state.
2. **URL is state.** Search filters, pagination, and active tabs are URL params.
3. **Forms are controlled by React Hook Form.** Never manual useState for forms.
4. **Global client state is Zustand.** Simple, no boilerplate, no providers.
5. **Auth is React Context.** Used by many features, needs to be available everywhere.
6. **localStorage is for persistence.** Cart, wishlist, recent searches, preferences.

---

## 9. Utilities

### 9.1 Formatters

```typescript
// shared/lib/formatters.ts

export function formatPrice(cents: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(cents / 100)
}

export function formatDate(date: string | Date, format = 'long'): string {
  const d = new Date(date)
  if (format === 'short') return d.toLocaleDateString('fr-FR')
  return d.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatPhone(phone: string): string {
  // +33 6 12 34 56 78
  return phone.replace(/(\+\d{2})(\d)(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5 $6')
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('fr-FR').format(n)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
```

### 9.2 Validators

```typescript
// shared/lib/validators.ts

import { z } from 'zod'

export const emailSchema = z.string().email('Email invalide')
export const phoneSchema = z.string().min(10, 'Numéro de téléphone invalide')
export const nameSchema = z.string().min(2, 'Minimum 2 caractères')
export const passwordSchema = z.string().min(8, 'Minimum 8 caractères')

export const addressSchema = z.object({
  line1: z.string().min(1, 'Adresse requise'),
  line2: z.string().optional(),
  city: z.string().min(1, 'Ville requise'),
  postal_code: z.string().min(5, 'Code postal invalide'),
  country_code: z.string().default('FR'),
})

export const checkoutSchema = z.object({
  email: emailSchema,
  first_name: nameSchema,
  last_name: nameSchema,
  phone: phoneSchema,
  shipping_address: addressSchema,
  notes: z.string().optional(),
})
```

### 9.3 cn() Utility

```typescript
// shared/lib/cn.ts

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## 10. Types

### 10.1 Database Types (Auto-generated)

```typescript
// shared/types/database.ts
// Auto-generated by Supabase CLI: supabase gen types typescript
// Contains all table, enum, and function types
```

### 10.2 Feature Types

```typescript
// features/products/types.ts

import type { Database } from '@/shared/types/database'

type Tables = Database['public']['Tables']

export type Product = Tables['products']['Row'] & {
  category: Category
  images: ProductImage[]
  variants?: ProductVariant[]
}

export type Category = Tables['categories']['Row'] & {
  subcategories?: Category[]
  product_count?: number
}

export type ProductImage = Tables['product_images']['Row']

export type ProductVariant = Tables['product_variants']['Row']

export interface ProductFilters {
  category_id?: string
  min_price?: number
  max_price?: number
  materials?: string[]
  in_stock?: boolean
  search?: string
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'popular'
  page?: number
  per_page?: number
}
```

### 10.3 API Types

```typescript
// shared/types/api.ts

export interface ApiResponse<T> {
  data: T
  error: null
}

export interface ApiError {
  data: null
  error: {
    message: string
    code: string
    details?: unknown
  }
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  per_page: number
  total_pages: number
}

export interface QueryParams {
  page?: number
  per_page?: number
  sort?: string
  order?: 'asc' | 'desc'
  search?: string
}
```

### 10.4 Utility Types

```typescript
// shared/types/utils.ts

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type Required<T, K extends keyof T> = T & { [P in K]-?: T[P] }
export type Prettify<T> = { [K in keyof T]: T[K] } & {}
export type StrictOmit<T, K extends keyof T> = Omit<T, K>
```

---

## 11. Constants

### 11.1 Routes

```typescript
// shared/constants/routes.ts

export const ROUTES = {
  HOME: '/',
  CATALOG: '/collection/:slug',
  PRODUCT: '/produit/:slug',
  CART: '/panier',
  CHECKOUT: '/commande',
  AMENAGEMENT: '/amenagement',
  ABOUT: '/a-propos',
  CONTACT: '/contact',
  SEARCH: '/recherche',
  LOGIN: '/connexion',
  REGISTER: '/inscription',
  ACCOUNT: '/compte',
  ACCOUNT_DASHBOARD: '/compte/tableau-de-bord',
  ACCOUNT_ORDERS: '/compte/commandes',
  ACCOUNT_WISHLIST: '/compte/favoris',
  ACCOUNT_PROFILE: '/compte/profil',
  ACCOUNT_SETTINGS: '/compte/parametres',
  BLOG: '/blog',
  BLOG_POST: '/blog/:slug',
  LEGAL: '/mentions-legales',
  CGV: '/cgv',
  PRIVACY: '/confidentialite',
  COOKIES: '/cookies',
} as const

export function catalogPath(slug: string) {
  return `/collection/${slug}`
}

export function productPath(slug: string) {
  return `/produit/${slug}`
}

export function blogPostPath(slug: string) {
  return `/blog/${slug}`
}
```

### 11.2 Configuration

```typescript
// shared/constants/config.ts

export const CONFIG = {
  APP_NAME: 'Home Idea',
  APP_URL: 'https://home-idea.fr',
  DEFAULT_LOCALE: 'fr',
  DEFAULT_CURRENCY: 'EUR',
  ITEMS_PER_PAGE: 20,
  MAX_CART_ITEMS: 99,
  SEARCH_DEBOUNCE_MS: 300,
  TOAST_DURATION_MS: 4000,
  IMAGE_OPTIMIZATION: {
    QUALITY: 80,
    SIZES: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  },
  SEO: {
    DEFAULT_TITLE: 'Home Idea — Meubles & Design d\'intérieur de luxe',
    DEFAULT_DESCRIPTION: 'Home Idea conçoit et vend du mobilier moderne, luxueux et élégant.',
    DEFAULT_OG_IMAGE: '/og-default.jpg',
  },
  STORAGE_BUCKETS: {
    PRODUCTS: 'products',
    AVATARS: 'avatars',
    BLOG: 'blog',
    PROJECTS: 'projects',
  },
} as const
```

### 11.3 Messages

```typescript
// shared/constants/messages.ts

export const MESSAGES = {
  EMPTY_CART: 'Votre panier est vide.',
  EMPTY_WISHLIST: 'Votre liste de favoris est vide.',
  EMPTY_ORDERS: 'Aucune commande pour le moment.',
  ORDER_CONFIRMED: 'Commande confirmée ! Un conseiller vous contactera sous 24h.',
  REVIEW_SUBMITTED: 'Votre avis a été soumis et sera publié après modération.',
  PROJECT_SUBMITTED: 'Votre projet a été envoyé à notre studio.',
  CONTACT_SENT: 'Message envoyé. Nous vous répondrons sous 24h.',
  LOGIN_REQUIRED: 'Connectez-vous pour accéder à cette page.',
  AUTH_ERROR: 'Email ou mot de passe incorrect.',
  GENERIC_ERROR: 'Une erreur est survenue. Veuillez réessayer.',
  NETWORK_ERROR: 'Problème de connexion. Vérifiez votre réseau.',
} as const
```

### 11.4 Theme

```typescript
// shared/constants/theme.ts

export const THEME = {
  BREAKPOINTS: {
    SM: 640,
    MD: 1024,
    LG: 1440,
  },
  SPACING: {
    SECTION_SM: 32,
    SECTION_MD: 48,
    SECTION_LG: 80,
    SECTION_XL: 96,
    CARD_PADDING: 24,
    GRID_GAP: 24,
  },
  NAVBAR_HEIGHT: 80,
  SIDEBAR_WIDTH: 280,
  Z_INDEX: {
    BASE: 0,
    DROPDOWN: 100,
    STICKY: 200,
    OVERLAY: 300,
    MODAL: 400,
    TOAST: 500,
    TOOLTIP: 600,
  },
} as const
```

---

## 12. Animations

### 12.1 Animation Presets

```typescript
// shared/lib/animations.ts

export const ANIMATIONS = {
  // Entrance
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },

  fadeUp: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },

  fadeUpStagger: (index: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] },
  }),

  // Hover
  hoverLift: {
    whileHover: { y: -4 },
    transition: { duration: 0.2, ease: 'easeOut' },
  },

  hoverScale: {
    whileHover: { scale: 1.02 },
    transition: { duration: 0.2, ease: 'easeOut' },
  },

  // Page transitions
  pageEnter: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
} as const

// CSS animation class names (for non-GSAP usage)
export const CSS_ANIMATIONS = {
  RISE: 'anim-rise',
  FLOAT: 'anim-float',
  SHIMMER: 'anim-shimmer',
  GLOW: 'anim-glow',
  MARQUEE: 'anim-marquee',
  SPIN_SLOW: 'anim-spin-slow',
  CARD_3D: 'card-3d',
} as const
```

### 12.2 Reduced Motion

```typescript
// shared/lib/animations.ts (continued)

export function respectsReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function getAnimationDuration(ms: number): number {
  return respectsReducedMotion() ? 0 : ms
}
```

---

## 13. Assets

### 13.1 Asset Organization

```
assets/
├── images/
│   ├── products/              # Product images (by slug)
│   │   ├── fauteuil-velours-oria.webp
│   │   ├── table-marbre-lune.webp
│   │   └── ...
│   ├── categories/            # Category hero images
│   │   ├── salon.webp
│   │   ├── cuisine.webp
│   │   └── ...
│   ├── hero/                  # Homepage hero images
│   │   └── homepage-hero.webp
│   ├── blog/                  # Blog post images
│   ├── about/                 # About page images
│   └── og/                    # Open Graph images
│       ├── og-default.jpg
│       ├── og-home.jpg
│       └── ...
├── icons/                     # Custom SVG icons (if needed beyond Lucide)
└── fonts/                     # Self-hosted fonts (if needed)
```

### 13.2 Image Optimization Rules

| Format | When | Quality |
|--------|------|---------|
| WebP | Primary format for all web images | 80% |
| AVIF | Hero images, large feature images | 60% |
| JPEG fallback | OG images, social sharing | 85% |
| SVG | Icons, logos, decorative elements | N/A |

### 13.3 Image Sizes

| Context | Width | Aspect Ratio |
|---------|-------|-------------|
| Product card | 400px | 4/5 |
| Product detail | 800px | 1/1 |
| Category card | 600px | 16/9 |
| Hero image | 1200px | 16/9 |
| Blog post | 800px | 16/9 |
| Avatar | 200px | 1/1 |
| OG image | 1200px | 1.91/1 |

---

## 14. Best Practices

### 14.1 Import Order

```typescript
// 1. External libraries
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

// 2. Shared code (absolute imports)
import { cn } from '@/shared/lib/cn'
import { formatPrice } from '@/shared/lib/formatters'
import { Button } from '@/shared/components/ui/button'

// 3. Feature code (relative imports)
import { useProduct } from '../hooks/useProduct'
import { productsService } from '../services/products.service'
import type { Product } from '../types'
```

### 14.2 Component Patterns

#### Props Destructuring
```typescript
// Good: Destructure props in function signature
function ProductCard({ product, index = 0 }: ProductCardProps) {
  // ...
}

// Bad: Access via props object
function ProductCard(props: ProductCardProps) {
  return <div>{props.product.name}</div>
}
```

#### Early Returns
```typescript
// Good: Early return for loading/error/empty states
function ProductDetail({ slug }: Props) {
  const { product, isLoading } = useProduct(slug)

  if (isLoading) return <LoadingState type="page" />
  if (!product) return <NotFound />

  return <ProductHero product={product} />
}
```

#### Composition over Configuration
```typescript
// Good: Composable components
<Section spacing="lg">
  <Container size="lg">
    <Grid cols={{ sm: 1, md: 2, lg: 3 }} gap="lg">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </Grid>
  </Container>
</Section>

// Bad: Mega-component with many props
<ProductGrid
  products={products}
  columns={3}
  spacing="lg"
  containerSize="lg"
  gap="lg"
  showBadges
  showPrices
  showDescriptions
/>
```

### 14.3 Error Handling

```typescript
// Service: Throw errors
async function getProduct(slug: string): Promise<Product> {
  const { data, error } = await supabase.from('products').select('*').eq('slug', slug).single()
  if (error) throw new Error(error.message)
  return data
}

// Hook: Let React Query handle errors
function useProduct(slug: string) {
  return useQuery({
    queryKey: ['products', slug],
    queryFn: () => productsService.getBySlug(slug),
  })
}

// Component: Handle error state
function ProductDetail({ slug }: Props) {
  const { product, isLoading, error } = useProduct(slug)

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState message={error.message} />
  if (!product) return <NotFoundState />

  return <ProductHero product={product} />
}
```

### 14.4 Performance

1. **Lazy load routes.** Every page component uses `React.lazy()`.
2. **Memoize expensive computations.** `useMemo` for filtered/sorted lists.
3. **Virtualize long lists.** Use `react-window` for 50+ items.
4. **Optimize images.** WebP format, lazy loading, responsive sizes.
5. **Debounce search input.** 300ms debounce on search queries.
6. **Avoid unnecessary re-renders.** `React.memo` for pure components.
7. **Use `useCallback` for event handlers** passed to child components.
8. **Code split by feature.** Each feature is a separate chunk.

### 14.5 Testing

1. **Unit test:** All utility functions, formatters, validators.
2. **Component test:** All shared UI components (render, props, interactions).
3. **Hook test:** All custom hooks (using `@testing-library/react-hooks`).
4. **Integration test:** Key user flows (add to cart, checkout, submit project).
5. **E2E test:** Critical paths (browse → add to cart → checkout).

### 14.6 File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `ProductCard.tsx` |
| Hooks | camelCase with `use` prefix | `useProduct.ts` |
| Services | camelCase with `.service` suffix | `products.service.ts` |
| Types | PascalCase | `types.ts` |
| Constants | UPPER_SNAKE_CASE | `ROUTES.ts` |
| Utilities | camelCase | `formatters.ts` |
| Schemas | camelCase with `.schema` suffix | `checkout.schema.ts` |
| Tests | Same as source + `.test` | `ProductCard.test.tsx` |

### 14.7 Git Conventions

| Prefix | Usage |
|--------|-------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `refactor:` | Code refactoring |
| `style:` | CSS/style changes |
| `docs:` | Documentation |
| `test:` | Tests |
| `chore:` | Build, config, dependencies |

---

## Appendix: Migration Checklist

### From Current Architecture

| Current | New | Action |
|---------|-----|--------|
| `src/components/hi/` | `src/features/products/components/` | Move and refactor |
| `src/contexts/CartContext.tsx` | `src/features/cart/store.ts` | Convert to Zustand |
| `src/lib/products.ts` | `src/features/products/` | Split into service + types |
| `src/pages/hi/` | `src/pages/` | Flatten and rename |
| `src/hooks/useAuth.tsx` | `src/features/auth/hooks/useAuth.ts` | Move to feature |
| `src/integrations/supabase/` | `src/shared/lib/supabase.ts` | Simplify |
| `src/components/ui/` | `src/shared/components/ui/` | Keep as-is |
| All dead code | Delete | Remove ~150 files |

### Implementation Order

1. Create `src/shared/` structure (lib, types, constants, hooks, components)
2. Create `src/features/products/` (first feature)
3. Create `src/features/cart/` (Zustand store)
4. Create `src/features/auth/` (Supabase auth)
5. Create `src/pages/` (thin page components)
6. Create `src/app/` (router, providers, layout)
7. Migrate remaining features one by one
8. Delete dead code
9. Add tests

---

*Frontend architecture for Home Idea.*
*Feature-based. Type-safe. Production-ready.*
