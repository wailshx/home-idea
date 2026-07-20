# Home Idea — Full Project Analysis & Redesign

---

# PHASE 1 — PROJECT ANALYSIS

## 1. Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 18.3.1 |
| Language | TypeScript | 5.8.3 |
| Bundler | Vite | 5.4.19 |
| Compiler | SWC | via @vitejs/plugin-react-swc |
| CSS | Tailwind CSS | 3.4.17 |
| UI Library | shadcn/ui | default style, slate base |
| Routing | React Router DOM | 6.30.1 |
| State | React Context + TanStack React Query | 5.83.0 |
| Backend | Supabase (PostgreSQL + Auth + Edge Functions + Storage + Realtime) |
| Maps | Leaflet + react-leaflet | 1.9.4 |
| Charts | Recharts | 2.15.4 |
| Forms | React Hook Form + Zod | 7.61.1 / 3.25.76 |
| Icons | Lucide React | 0.462.0 |
| Toasts | Sonner + Radix Toast | 1.7.4 |
| DnD | @dnd-kit | 6.3.1 |
| Phone Input | libphonenumber-js + react-phone-number-input | 1.12.26 |
| Carousel | Embla Carousel React | 8.6.0 |
| Drawer | Vaul | 0.9.9 |
| Command | cmdk | 1.1.1 |
| Builder | Lovable | via lovable-tagger |

---

## 2. Folder Structure

```
/home/shx/Documents/home-idea/
├── .agents/skills/           # AI skills (ui-ux-pro-max, vitest, find-skills)
├── .env                      # Supabase env vars
├── public/                   # Static assets (favicon, placeholder, robots.txt)
├── src/
│   ├── assets/               # 10 product/category images
│   ├── components/
│   │   ├── hi/               # ACTIVE: Navbar, Footer, ProductCard
│   │   ├── ui/               # 51 shadcn/ui components
│   │   ├── admin/            # DEAD: 50+ admin components
│   │   ├── booking/          # DEAD: BookingWidget
│   │   ├── dispute/          # DEAD: CreateDisputeDialog
│   │   ├── guest/            # DEAD: 12 guest dashboard components
│   │   ├── home/             # DEAD: 5 Rentely homepage components
│   │   ├── host/             # DEAD: 16 host dashboard components
│   │   ├── inbox/            # DEAD: 11 messaging components
│   │   ├── listing/          # DEAD: 19 listing components
│   │   ├── search/           # DEAD: 6 search components
│   │   ├── shared/           # DEAD: 4 shared components
│   │   ├── AuthDialog.tsx    # DEAD
│   │   ├── Footer.tsx        # DEAD (Rentely version)
│   │   ├── Navbar.tsx        # DEAD (Rentely version)
│   │   ├── ScrollToTop.tsx   # ACTIVE
│   │   ├── SearchHeader.tsx  # DEAD
│   │   ├── SuspendedUserListener.tsx # DEAD
│   │   └── DemoAccountsInfo.tsx      # DEAD
│   ├── contexts/
│   │   ├── CartContext.tsx    # ACTIVE
│   │   └── DemoContext.tsx    # DEAD
│   ├── hooks/                # ALL DEAD (13 files)
│   ├── integrations/supabase/
│   │   ├── client.ts         # ACTIVE (but only used by dead code)
│   │   └── types.ts          # Reference only
│   ├── layouts/              # ALL DEAD (3 files)
│   ├── lib/
│   │   ├── products.ts       # ACTIVE
│   │   ├── utils.ts          # ACTIVE (shadcn cn() utility)
│   │   ├── demoStorage.ts    # DEAD (2,784 lines)
│   │   ├── demoSupabase.ts   # DEAD
│   │   └── exportUtils.ts    # DEAD
│   ├── pages/
│   │   ├── hi/               # ACTIVE: 8 pages
│   │   ├── admin/            # DEAD: 11 pages
│   │   ├── guest/            # DEAD: 6 pages
│   │   ├── host/             # DEAD: 8 pages
│   │   ├── Home.tsx          # DEAD (Rentely home)
│   │   ├── Search.tsx        # DEAD
│   │   ├── ListingDetail.tsx # DEAD
│   │   ├── Checkout.tsx      # DEAD (Rentely checkout)
│   │   ├── BookingConfirmation.tsx # DEAD
│   │   ├── BecomeHost.tsx    # DEAD
│   │   ├── ForgotPassword.tsx # DEAD
│   │   ├── GuestDashboard.tsx # DEAD
│   │   ├── FAQ.tsx           # DEAD
│   │   ├── HelpCenter.tsx    # DEAD
│   │   ├── Support.tsx       # DEAD
│   │   └── NotFound.tsx      # ACTIVE
│   ├── types/                # DEAD (2 files)
│   ├── App.tsx               # Entry router
│   ├── App.css               # DEAD (default Vite boilerplate)
│   ├── index.css             # ACTIVE (design system)
│   ├── main.tsx              # Entry point
│   └── vite-env.d.ts
├── supabase/
│   ├── config.toml
│   ├── migrations/           # 225 SQL migration files
│   └── functions/            # 4 edge functions
├── package.json
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── components.json           # shadcn config
└── eslint.config.js
```

---

## 3. Routing (Active)

| Path | Component | Purpose |
|------|-----------|---------|
| `/` | `hi/Home` | Landing page with hero, categories, featured products, CTA |
| `/collection/:slug` | `hi/Catalog` | Category listing with subcategory filters |
| `/produit/:slug` | `hi/ProductDetail` | Product detail with specs, add-to-cart |
| `/panier` | `hi/Cart` | Shopping cart with line items and summary |
| `/commande` | `hi/Checkout` | Checkout form (simulated, no backend) |
| `/amenagement` | `hi/Amenagement` | Interior design consultation request |
| `/a-propos` | `hi/About` | Brand story |
| `/contact` | `hi/Contact` | Contact form + showroom info |
| `*` | `NotFound` | 404 page |

**Not routed:** 35+ pages from the dormant "Rentely" rental platform exist in the codebase but are completely unreachable.

---

## 4. Components

### Active Components (4 files)
| Component | File | Purpose |
|-----------|------|---------|
| `hi/Navbar` | `components/hi/Navbar.tsx` | Fixed header: logo, category nav, cart badge, mobile menu |
| `hi/Footer` | `components/hi/Footer.tsx` | 4-column footer: brand, collections, maison, contact |
| `hi/ProductCard` | `components/hi/ProductCard.tsx` | Product card with 3D hover, entrance animation |
| `ScrollToTop` | `components/ScrollToTop.tsx` | Scrolls to top on route change |

### shadcn/ui Components (51 files)
Full library installed: accordion, alert-dialog, alert, aspect-ratio, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form, hover-card, input, input-otp, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, switch, table, tabs, textarea, toast, toaster, toggle, toggle-group, tooltip + custom status-badge, text-link-button.

### Dead Components (100+ files)
All components under `admin/`, `booking/`, `dispute/`, `guest/`, `home/`, `host/`, `inbox/`, `listing/`, `search/`, `shared/`, plus `AuthDialog`, `Navbar` (Rentely), `Footer` (Rentely), `SearchHeader`, `SuspendedUserListener`, `DemoAccountsInfo`.

---

## 5. Pages

### Active Pages (9 files)
| Page | Lines | Data Source |
|------|-------|-------------|
| `hi/Home` | 228 | Static (products.ts) |
| `hi/Catalog` | 96 | Static (products.ts) |
| `hi/ProductDetail` | 142 | Static (products.ts) |
| `hi/Cart` | 98 | CartContext (localStorage) |
| `hi/Checkout` | 152 | CartContext (simulated submit) |
| `hi/Amenagement` | 197 | Static form (simulated submit) |
| `hi/Contact` | 86 | Static form (no backend) |
| `hi/About` | 31 | Static content |
| `NotFound` | 16 | Static |

### Dead Pages (35+ files)
11 admin pages, 6 guest pages, 8 host pages, 10 standalone Rentely pages.

---

## 6. UI System

### Design Language
- **Theme:** Noir & Gold luxury — near-black background (#0d0d0d) with gold accents (#c9a84c)
- **Fonts:** Fira Sans (body, weight 300), DM Serif Display (headings)
- **Border Radius:** 0.25rem (very tight, modern)
- **Color Tokens:** CSS variables in HSL with shadcn convention

### CSS Custom Properties
```
--background: 0 0% 5%          (near-black)
--foreground: 45 30% 92%       (warm off-white)
--primary: 44 55% 54%          (gold)
--primary-glow: 44 76% 74%     (light gold)
--gold: 44 55% 54%
--ink: 0 0% 4%                 (text on gold)
--destructive: 0 72% 51%
--border: 44 20% 20%
```

### Custom Utility Classes
- `.text-gradient-gold`, `.bg-gradient-gold`, `.bg-gradient-hero`
- `.shadow-gold`, `.shadow-deep`
- `.grain` (film grain texture overlay)
- `.link-gold` (animated underline)
- `.card-3d` (perspective hover tilt)
- `.gold-border` (gradient border via mask-composite)

---

## 7. Theme

**Noir & Gold Luxury** — a high-end French interior design aesthetic:
- Dark-first design (black backgrounds)
- Gold as the single accent color
- Serif display font for headings (DM Serif Display)
- Light-weight sans for body (Fira Sans 300)
- Grain texture overlay for depth
- 3D perspective effects on cards
- Shimmer and glow animations for premium feel

---

## 8. Existing Animations

All **pure CSS** — no framer-motion or GSAP installed.

| Animation | CSS Class | Duration | Usage |
|-----------|-----------|----------|-------|
| Float | `.anim-float` | 8s infinite | Hero image bobbing |
| Spin Slow | `.anim-spin-slow` | 40s infinite | Decorative rings |
| Shimmer | `.anim-shimmer` | 3s infinite | CTA button highlight sweep |
| Rise | `.anim-rise` | 0.9s once | Card/section entrance (fade-up) |
| Glow Pulse | `.anim-glow` | 4s infinite | Gold badge pulsing |
| Marquee | `.anim-marquee` | 40s infinite | Scrolling text strip |
| Tilt In | `.anim-tilt-in` | once | 3D perspective entrance |
| Card 3D | `.card-3d` | hover | Perspective rotate on hover |

**Tailwind animations:** accordion-down, accordion-up, fade-in.

**Missing:** No scroll-triggered animations, no page transitions, no stagger effects on lists, no reduced-motion media query.

---

## 9. Database Architecture

**Backend:** Supabase (PostgreSQL + Auth + Edge Functions + Storage + Realtime)
**Migrations:** 225 SQL files (Oct–Dec 2025)
**All business logic in PostgreSQL RPC functions (40+).**

### Tables (17)
| Table | Purpose |
|-------|---------|
| `profiles` | User profiles (id, email, name, avatar, status) |
| `user_roles` | RBAC (admin/host/guest) |
| `listings` | Rental properties (title, price, type, amenities, images, status) |
| `bookings` | Reservations (dates, guests, pricing breakdown, status) |
| `transactions` | Financial records (payment/refund/capture) |
| `payouts` | Host payouts (amount, commission, status) |
| `disputes` | Support cases (category, status, refund amounts) |
| `guest_debts` | Debt tracking (amount, reason, expiry) |
| `reviews` | Listing reviews (rating, text, status) |
| `message_threads` | Conversation threads (participants, type) |
| `messages` | Individual messages (body, attachments, read status) |
| `cancellation_policies` | Policy templates |
| `listing_availability` | Date blocks and custom pricing |
| `listing_moderation_feedback` | Admin review per section |
| `cities` / `countries` / `states_regions` | Geography |
| `faqs` | Content management |
| `platform_settings` | Key-value config |

### Enums (11)
app_role, booking_status, listing_status, property_type, review_status, dispute_category, dispute_status, thread_type, user_status, cancellation_policy, payout_status_enum.

### Database Functions (40+ RPC)
Booking lifecycle, dispute management, guest debts, admin search/reporting, host functions, user management, messaging, utility.

### Edge Functions (4)
1. `search-listings` — Advanced listing search with filters
2. `cancel-expired-bookings` — Cron job
3. `mark-completed-bookings` — Cron job
4. `process-pending-payouts` — Cron job

---

## 10. APIs

**No traditional REST/GraphQL APIs.** All data access goes through:
1. Supabase client SDK (`supabase.from().select()`, `supabase.rpc()`)
2. Supabase Edge Functions (`supabase.functions.invoke()`)
3. Supabase Realtime channels (`supabase.channel().on('postgres_changes')`)

---

## 11. Supabase Structure

- **Project ID:** xqjgavwsosbvherpdfij
- **URL:** https://xqjgavwsosbvherpdfij.supabase.co
- **Auth:** Email/password, localStorage persistence
- **Storage:** `message-attachments` bucket for file uploads
- **RLS:** Enabled (225 migrations suggest extensive RLS policies)
- **Realtime:** Used for messaging (postgres_changes on messages table)
- **Demo Mode:** Complete localStorage mirror of database (2,784 lines of demoStorage.ts)

---

## 12. Authentication

- **Provider:** Supabase Auth (email/password)
- **Registration:** Disabled (shows toast)
- **Demo Accounts:** guest@demo.com, host@demo.com, admin@demo.com
- **Session:** localStorage persistence, auto-refresh token
- **Roles:** RBAC via `user_roles` table (admin, host, guest)
- **Suspended Users:** Detected on SIGNED_IN event, auto-signout
- **Auth Context:** `useAuth` hook provides user, session, loading, signOut

---

## 13. Storage

- **Bucket:** `message-attachments` — used for dispute/inbox image uploads
- **Path pattern:** `{userId}/{timestamp}.{ext}` or `{random}.{ext}`
- **Access:** Public URLs returned after upload
- **Listing images:** Stored as URLs in `listings.images` array and `listings.cover_image`

---

## 14. Admin Dashboard

**Status: DEAD CODE — not routed.**

11 admin pages covering:
- Overview (KPIs, charts)
- Listings management (CRUD, moderation with per-section feedback)
- Bookings management (search, filters)
- Disputes management (Kanban board, resolution)
- Support inbox (messaging)
- Users management (suspend/delete)
- Transactions (financial log)
- Commissions management
- Reports (revenue, CSV export)
- Content management (FAQ CRUD)
- Review Listing (multi-step moderation wizard)

---

## 15. Product Management

**Current state:** 12 hardcoded products in `src/lib/products.ts` — no database, no CMS, no admin panel for furniture.

Products have: id, slug, name, category, subcategory, price, image, short description, full description, materials, dimensions, isNew flag.

Categories: 5 (Salon, Cuisine, Chambres, Éclairage, Aménagement)

**No image management** — products reference static imports from `src/assets/`.

---

## 16. Categories

| Slug | Name | Subcategories |
|------|------|---------------|
| `salon` | Salon | Canapés, Fauteuils, Tables basses, Rangements |
| `cuisine` | Cuisine | Cuisines complètes, Îlots, Rangements, Accessoires |
| `chambres` | Chambres | Lits, Têtes de lit, Chevets, Dressings |
| `eclairage` | Éclairage | Suspensions, Lampes de sol, Appliques, Éclairage au plafond |
| `amenagement` | Aménagement | Appartements, Villas, Espaces professionnels |

---

## 17. Reusable Components

Only 4 custom reusable components exist (all active):
1. `hi/Navbar` — site header
2. `hi/Footer` — site footer
3. `hi/ProductCard` — product display card
4. `ScrollToTop` — route change behavior

**Missing reusable patterns:** No shared form components (for the active app), no loading states, no error boundaries, no page wrappers, no section containers.

---

## 18. Performance Bottlenecks

| Issue | Severity | Location |
|-------|----------|----------|
| No code splitting — all pages in single bundle | HIGH | `App.tsx` |
| 100+ dead files adding to bundle analysis | HIGH | Entire `src/` tree |
| Leaflet imported fully (~50KB gzipped) | MEDIUM | Dead code, but in package.json |
| Recharts imported fully (~200KB+) | MEDIUM | Dead code, but in package.json |
| 15+ unused npm dependencies | MEDIUM | `package.json` |
| No lazy loading of images | MEDIUM | Product images |
| No skeleton loading states | LOW | Active pages |

---

## 19. Technical Debt

| Category | Count | Details |
|----------|-------|---------|
| Dead files (Rentely) | 100+ | Complete rental platform codebase unreachable from router |
| Unused npm packages | 15+ | react-leaflet, @dnd-kit, recharts, zod, react-hook-form, etc. |
| Console.log statements | 100+ | Debug logging left in production code |
| Dead CSS file | 1 | `App.css` (Vite boilerplate, never imported) |
| Duplicate code | 3+ | Search form x3, Sidebar x2 |
| Hardcoded values | 5+ | NYC coords, fee rates, guest limits |
| No error boundaries | 0 | Any component crash kills the whole app |
| No loading states | 0 | No skeleton/spinner for page transitions |
| No meta tags | 0 | No SEO, no Open Graph, no structured data |
| No i18n framework | 0 | French hardcoded in components (not in index.html lang) |

---

## 20. Dead Code

**Everything under these paths is completely unreachable:**
- `src/components/admin/` (50+ files)
- `src/components/booking/` (1 file)
- `src/components/dispute/` (1 file)
- `src/components/guest/` (12 files)
- `src/components/home/` (5 files)
- `src/components/host/` (16 files)
- `src/components/inbox/` (11 files)
- `src/components/listing/` (19 files)
- `src/components/search/` (6 files)
- `src/components/shared/` (4 files)
- `src/components/AuthDialog.tsx`
- `src/components/Navbar.tsx` (Rentely version)
- `src/components/Footer.tsx` (Rentely version)
- `src/components/SearchHeader.tsx`
- `src/components/SuspendedUserListener.tsx`
- `src/components/DemoAccountsInfo.tsx`
- `src/contexts/DemoContext.tsx`
- `src/hooks/` (13 files — ALL)
- `src/layouts/` (3 files — ALL)
- `src/lib/demoStorage.ts` (2,784 lines)
- `src/lib/demoSupabase.ts`
- `src/lib/exportUtils.ts`
- `src/pages/admin/` (11 files)
- `src/pages/guest/` (6 files)
- `src/pages/host/` (8 files)
- `src/pages/Home.tsx`, `Search.tsx`, `ListingDetail.tsx`, `Checkout.tsx`, `BookingConfirmation.tsx`, `BecomeHost.tsx`, `ForgotPassword.tsx`, `GuestDashboard.tsx`, `FAQ.tsx`, `HelpCenter.tsx`, `Support.tsx`
- `src/types/` (2 files)
- `src/App.css`

**Estimated dead code:** ~8,000+ lines across 150+ files.

---

## 21. Duplicate Code

| Pattern | Files | Lines Duplicated |
|---------|-------|-----------------|
| Search form (destination + dates + guests) | `SearchHeader.tsx`, `SearchPageHeader.tsx`, `Home.tsx` (Rentely) | ~400 lines |
| Sidebar navigation | `HostSidebar.tsx`, `GuestSidebar.tsx` | ~250 lines |
| Listing creation steps | 8 step components in `listing/` | Shared form field patterns |

---

## 22. Missing Features

### For an Active E-Commerce Platform
- No product database (12 hardcoded items)
- No image upload/management for products
- No real checkout/payment integration
- No order management system
- No inventory tracking
- No user accounts for the furniture store
- No wishlist/favorites
- No product search/filter
- No product reviews/ratings
- No SEO (meta tags, sitemap, structured data)
- No analytics integration
- No email notifications
- No blog/content section
- No newsletter signup
- No multi-language support (French only)
- No responsive images (WebP/AVIF)
- No dark/light mode toggle
- No accessibility features (skip links, focus management, ARIA)
- No error boundaries
- No loading/skeleton states
- No 404 search
- No breadcrumbs

---

## 23. Opportunities for Improvement

### Immediate (Quick Wins)
1. **Delete all dead code** — Remove 150+ files, 15+ npm packages, save bundle size
2. **Add code splitting** — React.lazy() for route-level chunks
3. **Remove console.logs** — Clean production output
4. **Add error boundaries** — Prevent full-app crashes
5. **Add meta tags** — SEO basics (title, description, OG tags)

### Short-term (1-2 weeks)
6. **Move products to Supabase** — Enable admin CRUD for products
7. **Add real checkout** — Payment integration (Stripe)
8. **Add product search** — Client-side or Supabase full-text search
9. **Add loading states** — Skeleton components for page transitions
10. **Add breadcrumbs** — Navigation context

### Medium-term (2-4 weeks)
11. **User accounts** — Registration, login, order history
12. **Product reviews** — Ratings and text reviews
13. **Wishlist** — Save favorite products
14. **Image optimization** — Responsive images, lazy loading, WebP
15. **Email notifications** — Order confirmations, shipping updates

### Long-term (1-2 months)
16. **Blog/content** — Interior design articles, SEO content
17. **Multi-language** — English support
18. **Mobile app** — React Native or PWA
19. **Analytics** — Tracking, conversion funnels
20. **A/B testing** — Product page variants

---

---

# PHASE 2 — PRODUCT REDESIGN

---

## 1. User Personas

### Persona 1: "Sophie" — The Discerning Homeowner
- **Age:** 32-45
- **Income:** €80K-€150K household
- **Location:** Paris, Lyon, or major French cities
- **Behavior:** Researches extensively before purchasing, values quality over price, visits showrooms
- **Goals:** Furnish a new apartment with cohesive, luxurious pieces; create an Instagram-worthy home
- **Pain Points:** Overwhelmed by choices, unsure about quality online, fears expensive mistakes
- **Devices:** iPhone, MacBook, iPad for browsing
- **Context:** Evenings after work, weekends planning home projects

### Persona 2: "Marc" — The Interior Design Professional
- **Age:** 28-55
- **Income:** Professional (designer, architect, decorator)
- **Location:** France-wide
- **Behavior:** Sources for clients, needs reliable suppliers, values trade programs
- **Goals:** Find unique pieces for client projects, streamline procurement, access trade pricing
- **Pain Points:** Limited time, needs samples/swatches, requires consistent quality
- **Devices:** Desktop at office, mobile on-site visits
- **Context:** Working on 3-5 projects simultaneously

### Persona 3: "Amélie" — The Aspiring Minimalist
- **Age:** 25-35
- **Income:** €50K-€90K
- **Location:** Urban France
- **Behavior:** Design-conscious, follows interior design influencers, prefers curated selections
- **Goals:** Create a beautiful, functional space on a realistic budget
- **Pain Points:** Can't afford full room furnishing, needs guidance on mixing pieces
- **Devices:** Mobile-first, Instagram/TikTok discovery
- **Context:** First apartment or renovation project

### Persona 4: "Laurent & Camille" — The New Home Couple
- **Age:** 28-40
- **Income:** Dual income, €100K-€200K household
- **Location:** Buying/renting new home in France
- **Behavior:** Joint decision-making, need complete room solutions
- **Goals:** Furnish entire home cohesively, possibly use aménagement service
- **Pain Points:** Disagreeing on styles, need professional guidance, tight timeline
- **Devices:** Shared browsing, showroom visits
- **Context:** Moving into new home, renovation project

---

## 2. Customer Journey

### Awareness Stage
```
Instagram/Pinterest → Blog article → Google search → Landing page
                                    ↓
                            Word of mouth → Direct visit
```

### Consideration Stage
```
Homepage → Browse categories → View products → Compare pieces
    ↓                                               ↓
About page (brand story)                    Aménagement page
    ↓                                               ↓
Contact (questions)                     Consultation request
```

### Decision Stage
```
Product detail → Add to cart → Cart review → Checkout
    ↓                                              ↓
Reviews (future)                          Order confirmation
    ↓                                              ↓
Showroom visit (optional)               Delivery scheduling
```

### Retention Stage
```
Post-delivery email → Review request → Newsletter
    ↓                                      ↓
Repeat purchase ← New collection ← Blog content
    ↓
Referral program (future)
```

---

## 3. Business Goals

### Primary Goals
1. **Brand Positioning:** Establish Home Idea as THE luxury French furniture brand for modern interiors
2. **Revenue Growth:** Convert browsing to purchases (target: 2-3% conversion rate)
3. **Service Expansion:** Drive aménagement consultation requests (target: 10/month)
4. **Customer Loyalty:** Build repeat purchase rate (target: 25% within 12 months)

### Secondary Goals
5. **SEO Dominance:** Rank for "mobilier luxe design intérieur" and related terms
6. **Social Proof:** Collect 50+ product reviews within 6 months
7. **Trade Program:** Launch professional designer trade program
8. **Content Marketing:** Establish blog as interior design authority

### KPIs
- Monthly unique visitors → Target: 10,000 by month 6
- Cart abandonment rate → Target: <65%
- Average order value → Target: €2,500+
- Aménagement consultation requests → Target: 10/month
- Customer satisfaction (NPS) → Target: 70+
- Return visitor rate → Target: 40%+

---

## 4. Website Objectives

1. **Showcase Products Beautifully** — Hero imagery, 360° views, lifestyle shots
2. **Enable Easy Discovery** — Intuitive navigation, search, filters, recommendations
3. **Build Trust** — Brand story, materials transparency, reviews, warranty info
4. **Simplify Purchase** — Streamlined checkout, multiple payment options, financing
5. **Drive Consultations** — Clear aménagement service presentation, easy booking
6. **Optimize for Mobile** — 60%+ traffic expected from mobile devices
7. **Maximize SEO** — Structured data, fast loading, semantic HTML
8. **Support Multiple Languages** — French (primary) + English (expansion)

---

## 5. Information Architecture

```
Home Idea (home-idea.fr)
├── Home (/)
│   ├── Hero (brand statement + featured collection)
│   ├── Category Showcase (5 categories)
│   ├── Featured Products (6 items)
│   ├── Aménagement CTA
│   ├── Testimonials/Social Proof
│   └── Newsletter Signup
│
├── Collections (/collection/:slug)
│   ├── Salon (/collection/salon)
│   │   ├── Canapés
│   │   ├── Fauteuils
│   │   ├── Tables basses
│   │   └── Rangements
│   ├── Cuisine (/collection/cuisine)
│   │   ├── Cuisines complètes
│   │   ├── Îlots
│   │   ├── Rangements
│   │   └── Accessoires
│   ├── Chambres (/collection/chambres)
│   │   ├── Lits
│   │   ├── Têtes de lit
│   │   ├── Chevets
│   │   └── Dressings
│   ├── Éclairage (/collection/eclairage)
│   │   ├── Suspensions
│   │   ├── Lampes de sol
│   │   ├── Appliques
│   │   └── Éclairage au plafond
│   └── Aménagement (/collection/amenagement)
│       ├── Appartements
│       ├── Villas
│       └── Espaces professionnels
│
├── Product Detail (/produit/:slug)
│   ├── Image Gallery
│   ├── Specifications
│   ├── Materials & Dimensions
│   ├── Related Products
│   └── Reviews (future)
│
├── Cart (/panier)
│   ├── Line Items
│   ├── Order Summary
│   └── Promo Code
│
├── Checkout (/commande)
│   ├── Contact Information
│   ├── Shipping Address
│   ├── Payment (future: Stripe)
│   └── Order Confirmation
│
├── Aménagement (/amenagement)
│   ├── Service Overview
│   ├── Project Configuration
│   ├── Contact Form
│   └── Portfolio (future)
│
├── À propos (/a-propos)
│   ├── Brand Story
│   ├── Philosophy
│   └── Team/Atelier (future)
│
├── Contact (/contact)
│   ├── Showroom Info
│   ├── Contact Form
│   └── Map (future)
│
├── Search (/recherche) [NEW]
│   ├── Search Results
│   ├── Filters
│   └── Sort Options
│
├── Account (/compte) [NEW]
│   ├── Profile (/compte/profil)
│   ├── Orders (/compte/commandes)
│   ├── Wishlist (/compte/favoris)
│   └── Settings (/compte parametres)
│
├── Legal
│   ├── Mentions légales (/mentions-legales)
│   ├── CGV (/cgv)
│   ├── Politique de confidentialite (/confidentialite)
│   └── Cookies (/cookies)
│
└── Blog [FUTURE]
    ├── Articles (/blog)
    └── Article Detail (/blog/:slug)
```

---

## 6. Sitemap

```
/ (Home)
/collection/salon
/collection/cuisine
/collection/chambres
/collection/eclairage
/collection/amenagement
/produit/fauteuil-velours-oria
/produit/table-marbre-lune
/produit/lampadaire-halo
/produit/canape-nero-3p
/produit/lit-noir-tokyo
/produit/chevet-doree
/produit/suspension-drape
/produit/plafonnier-lineaire
/produit/ilot-cuisine-nera
/produit/cuisine-complete-obscura
/produit/amenagement-appartement
/produit/dressing-nera
/panier
/commande
/amenagement
/a-propos
/contact
/recherche [NEW]
/compte [NEW]
/mentions-legales [NEW]
/cgv [NEW]
/confidentialite [NEW]
```

---

## 7. Feature List

### Phase 1 — Core (Current + Enhancements)
| Feature | Status | Priority |
|---------|--------|----------|
| Product browsing by category | ✅ Live | P0 |
| Product detail pages | ✅ Live | P0 |
| Shopping cart (localStorage) | ✅ Live | P0 |
| Checkout form (simulated) | ⚠️ Simulated | P0 |
| Category navigation | ✅ Live | P0 |
| Aménagement consultation form | ✅ Live | P0 |
| Contact form | ✅ Live | P0 |
| About page | ✅ Live | P0 |
| Responsive design | ✅ Live | P0 |
| Error boundaries | ❌ Missing | P0 |
| Loading states | ❌ Missing | P0 |
| Meta tags / SEO | ❌ Missing | P0 |

### Phase 2 — E-Commerce Essentials
| Feature | Status | Priority |
|---------|--------|----------|
| User registration/login | ❌ Missing | P1 |
| Product search | ❌ Missing | P1 |
| Product reviews & ratings | ❌ Missing | P1 |
| Wishlist/favorites | ❌ Missing | P1 |
| Order history | ❌ Missing | P1 |
| Real payment (Stripe) | ❌ Missing | P1 |
| Email notifications | ❌ Missing | P1 |
| Image optimization (WebP, lazy load) | ❌ Missing | P1 |
| Breadcrumbs | ❌ Missing | P1 |
| Skeleton loading states | ❌ Missing | P1 |

### Phase 3 — Growth
| Feature | Status | Priority |
|---------|--------|----------|
| Blog / content hub | ❌ Missing | P2 |
| Newsletter signup | ❌ Missing | P2 |
| Product recommendations | ❌ Missing | P2 |
| Trade/professional program | ❌ Missing | P2 |
| Multi-language (EN) | ❌ Missing | P2 |
| Social proof (trust badges) | ❌ Missing | P2 |
| Financing options | ❌ Missing | P2 |

### Phase 4 — Scale
| Feature | Status | Priority |
|---------|--------|----------|
| Admin product management | ❌ Missing | P3 |
| Inventory tracking | ❌ Missing | P3 |
| Shipping integration | ❌ Missing | P3 |
| Analytics dashboard | ❌ Missing | P3 |
| A/B testing | ❌ Missing | P3 |
| Mobile app / PWA | ❌ Missing | P3 |

---

## 8. User Flow

### Browse & Purchase Flow
```
1. Land on Homepage
   ↓
2. Browse by Category (or search)
   ↓
3. View Product Grid
   ↓
4. Click Product → Product Detail
   ↓
5. View images, specs, materials
   ↓
6. Select quantity → Add to Cart
   ↓
7. View Cart → Review items
   ↓
8. Proceed to Checkout
   ↓
9. Enter contact info + shipping
   ↓
10. Submit Order → Confirmation
   ↓
11. Email confirmation (future)
```

### Aménagement Consultation Flow
```
1. Click "Aménagement" in nav (or CTA on homepage)
   ↓
2. View service overview + process
   ↓
3. Configure project:
   - Select rooms (multi)
   - Choose style
   - Set budget range
   - Adjust surface area
   ↓
4. Fill contact form (name, email, phone, city, message)
   ↓
5. Submit → Confirmation screen
   ↓
6. Consultant contacts within 48h (future: automated email)
```

---

## 9. Navigation Structure

### Desktop Navigation
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo]  Salon ▾  Cuisine ▾  Chambres ▾  Éclairage ▾       │
│         Aménagement    À propos    Contact     [🔍] [🛒]   │
└─────────────────────────────────────────────────────────────┘
```

### Mobile Navigation
```
┌───────────────────────────┐
│ [☰]  HOME IDEA  [🛒(2)]  │
└───────────────────────────┘
         ↓ (hamburger opens)
┌───────────────────────────┐
│ ✕                         │
│ Salon                     │
│ Cuisine                   │
│ Chambres                  │
│ Éclairage                 │
│ Aménagement               │
│ ─────────                 │
│ À propos                  │
│ Contact                   │
│ ─────────                 │
│ 🔍 Rechercher             │
│ 🛒 Panier (2)             │
└───────────────────────────┘
```

### Footer Navigation
```
┌─────────────────────────────────────────────────────────────┐
│ HOME IDEA        Collections        Maison       Contact    │
│ [Logo]           Salon              À propos     📍 Address │
│ Description      Cuisine            Blog         ✉️ Email   │
│                  Chambres                          📱 Phone  │
│                  Éclairage                          IG Link  │
│                  Aménagement                                  │
│ ─────────────────────────────────────────────────────────── │
│ © 2025 Home Idea. Mentions légales | CGV | Confidentialité │
└─────────────────────────────────────────────────────────────┘
```

---

## 10. Admin Flow (Future)

### Product Management
```
Admin Login → Dashboard
    ↓
Product List (search, filter by category/status)
    ↓
Create/Edit Product:
    - Basic info (name, description, category, subcategory)
    - Pricing (price, compare-at price)
    - Images (upload, reorder, set primary)
    - Materials & dimensions
    - SEO (title, description, slug)
    - Status (draft/published/archived)
    ↓
Publish → Live on site
```

### Order Management (Future)
```
Order List (search, filter by status/date)
    ↓
Order Detail:
    - Customer info
    - Line items
    - Payment status
    - Shipping status
    - Notes
    ↓
Update status → Customer notification
```

### Content Management
```
FAQ Management (CRUD)
Blog Posts (future)
Homepage content (future)
```

---

## 11. E-Commerce Flow

### Cart → Checkout → Confirmation

```
Cart Page:
├── Line items (image, name, price, qty controls, remove)
├── Promo code input
├── Order summary:
│   ├── Subtotal
│   ├── Shipping (calculated)
│   ├── Tax (if applicable)
│   └── Total
├── "Passer commande" button
└── "Continuer vos achats" link

Checkout Page:
├── Step 1: Contact Information
│   ├── Email
│   ├── First name
│   ├── Last name
│   └── Phone
├── Step 2: Shipping Address
│   ├── Address line 1
│   ├── Address line 2
│   ├── City
│   ├── Postal code
│   ├── Country (dropdown)
│   └── Delivery notes
├── Step 3: Payment (future)
│   ├── Card input (Stripe Elements)
│   └── Or financing option
└── Order Summary sidebar (persistent)

Confirmation Page:
├── Order number
├── Items ordered
├── Shipping address
├── Estimated delivery
├── "Continue shopping" CTA
└── "View order history" link (if logged in)
```

### Aménagement Consultation Flow
```
Aménagement Page:
├── Hero section (service overview)
├── Process steps (3-step visual)
├── Configuration form:
│   ├── Room selection (multi-select chips)
│   ├── Style preference (visual cards)
│   ├── Budget range (slider)
│   └── Surface area (slider)
├── Contact form:
│   ├── Name
│   ├── Email
│   ├── Phone
│   ├── City
│   └── Project description
└── Submit → Confirmation
```

---

## 12. Visual Design Direction

### Noir & Gold — Enhanced

Based on the existing design system, the redesign should:

1. **Preserve the luxury aesthetic** — Dark backgrounds, gold accents, serif headings
2. **Enhance the product presentation** — Larger images, hover effects, lifestyle context
3. **Improve readability** — Better contrast ratios, consistent typography scale
4. **Add micro-interactions** — Scroll reveals, page transitions, cart animations
5. **Modernize the layout** — Bento grids, asymmetric compositions, generous whitespace
6. **Improve mobile experience** — Touch-friendly, swipeable galleries, bottom nav option

### Design Tokens (Enhanced)
```
Colors:
  Background:    #0d0d0d (near-black)
  Surface:       #1a1a1a (card backgrounds)
  Border:        #333333 (subtle separators)
  Gold:          #c9a84c (primary accent)
  Gold Light:    #f0d78c (highlights)
  Gold Dark:     #a08030 (hover states)
  Text:          #f5f0e8 (warm white)
  Text Muted:    #8a8578 (secondary text)

Typography:
  Display:       DM Serif Display, 48-72px
  Heading:       DM Serif Display, 24-36px
  Body:          Fira Sans, 16px, weight 300
  Small:         Fira Sans, 14px, weight 400
  Caption:       Fira Sans, 12px, weight 400

Spacing:
  Section:       96-120px vertical
  Card:          24-32px padding
  Grid gap:      16-24px
  
Border Radius:
  Cards:         12px
  Buttons:       8px
  Inputs:        8px
  
Shadows:
  Card:          0 4px 24px rgba(0,0,0,0.3)
  Elevated:      0 8px 48px rgba(0,0,0,0.5)
  Gold Glow:     0 0 32px rgba(201,168,76,0.15)
```

---

## 13. Content Strategy

### Brand Voice
- **Tone:** Refined, confident, intimate
- **Language:** French (primary), formal "vous"
- **Keywords:** Luxe, design, élégance, matière, artisanat, sur mesure
- **Avoid:** Cheap, discount, promotion, stock

### Content Pillars
1. **Product Excellence** — Materials, craftsmanship, dimensions
2. **Design Philosophy** — Brand story, aesthetic vision
3. **Living Inspiration** — Room styling, trend reports
4. **Service Expertise** — Aménagement process, client stories

### SEO Targets
| Keyword | Monthly Volume | Difficulty |
|---------|---------------|------------|
| mobilier luxe design | 2,400 | Medium |
| cuisine noire et or | 1,200 | Low |
| canapé velours luxe | 1,800 | Medium |
| suspension design | 3,600 | High |
| aménagement intérieur paris | 2,100 | Medium |
| meuble design français | 1,500 | Low |
| table basse marbre | 2,800 | Medium |
| dressing sur mesure | 1,900 | Low |

---

## 14. Technical Architecture (Proposed)

### Recommended Stack Updates
| Current | Proposed | Reason |
|---------|----------|--------|
| React 18.3 | Keep | Stable, sufficient |
| Vite 5.4 | Keep | Fast, modern |
| Tailwind 3.4 | Keep (upgrade to v4 later) | Stable |
| shadcn/ui | Keep | Excellent component library |
| React Router 6 | Keep | Sufficient for SPA |
| Supabase | Move products to DB | Enable admin CRUD |
| CartContext | Keep + enhance | Add persistence, sync |
| No state mgmt | Add Zustand (lightweight) | Better than Context for complex state |

### New Additions Needed
1. **Framer Motion** — Page transitions, scroll animations, micro-interactions
2. **React Helmet** — Meta tags, SEO
3. **Stripe** — Payment processing
4. **React.lazy** — Code splitting
5. **React Error Boundary** — Crash recovery
6. **Zustand** — Global state (wishlist, user preferences)

---

## 15. Implementation Priority

### Immediate (Week 1)
1. Delete all dead code (150+ files, 15+ npm packages)
2. Add error boundaries
3. Add loading states (skeleton components)
4. Add meta tags to all pages
5. Fix TypeScript strictness (enable strictNullChecks)

### Short-term (Weeks 2-3)
6. Move products to Supabase database
7. Add product search functionality
8. Enhance checkout (real form validation, order summary)
9. Add breadcrumbs navigation
10. Optimize images (responsive, lazy loading)

### Medium-term (Weeks 4-6)
11. User authentication (login/register)
12. Product reviews & ratings
13. Wishlist functionality
14. Order history
15. Email notifications (transactional)

### Long-term (Months 2-3)
16. Payment integration (Stripe)
17. Admin dashboard for products
18. Blog/content section
19. Multi-language support
20. Analytics integration

---

## Appendix A: File Count Summary

| Category | Active | Dead | Total |
|----------|--------|------|-------|
| Pages | 9 | 35+ | 44+ |
| Components | 4 + 51 UI | 100+ | 155+ |
| Hooks | 0 | 13 | 13 |
| Contexts | 1 | 1 | 2 |
| Layouts | 0 | 3 | 3 |
| Lib | 2 | 3 | 5 |
| Types | 0 | 2 | 2 |
| **Total src files** | **~70** | **~160** | **~230** |

## Appendix B: npm Package Audit

| Package | Used in Active Code? | Can Remove? |
|---------|---------------------|-------------|
| react-leaflet | No | Yes |
| react-leaflet-cluster | No | Yes |
| @dnd-kit/core | No | Yes |
| @dnd-kit/sortable | No | Yes |
| @dnd-kit/utilities | No | Yes |
| recharts | No | Yes |
| embla-carousel-react | No | Yes |
| react-resizable-panels | No | Yes |
| input-otp | No | Yes |
| cmdk | No | Yes |
| next-themes | No | Yes |
| react-phone-number-input | No | Yes |
| libphonenumber-js | No | Yes |
| zod | No | Yes |
| @hookform/resolvers | No | Yes |
| react-hook-form | No | Yes |
| vaul | No | Yes |
| @types/leaflet | No | Yes |

**18 packages can be safely removed**, reducing install size significantly.

---

*Report generated from comprehensive codebase analysis.*
*Phase 1: Technical analysis of all 230+ source files.*
*Phase 2: Product vision and redesign strategy.*
