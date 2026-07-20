# Home Idea — Page Design Specification

> Every page designed: purpose, sections, components, animations, interactions, data, SEO, and responsive layouts.

---

## Table of Contents

1. [Home](#1-home-)
2. [Catalog](#2-catalog-collectionslug)
3. [Product Detail](#3-product-detail-produitslug)
4. [Cart](#4-cart-panier)
5. [Checkout](#5-checkout-commande)
6. [Aménagement](#6-aménagement-amenagement)
7. [About](#7-about-a-propos)
8. [Contact](#8-contact-contact)
9. [Search](#9-search-recherche-new)
10. [Account](#10-account-compte-new)
11. [Legal Pages](#11-legal-pages-new)
12. [NotFound](#12-notfound)

---

## 1. Home (`/`)

### Purpose
The brand's front door. Establishes the luxury positioning, showcases the five collections, highlights signature products, and drives two primary actions: browse the catalog and request an aménagement consultation.

### Sections

#### 1A. Hero
- **Layout:** Split — left text, right floating image with decorative rings
- **Left column:**
  - Overline: "Maison de design" with gold horizontal rule
  - Headline: `L'art de <em>vivre</em>, sculpté sur mesure.` (DM Serif Display, 72px desktop / 40px mobile)
  - Subtitle: Brand value proposition (Fira Sans 300, 18px)
  - Two CTAs: "Explorer la collection" (primary gold) + "Aménager ma maison" (secondary outline)
  - Stats row: 12+ years, 500+ projects, 100% custom
- **Right column:**
  - Floating hero image with gold-border frame
  - Two decorative spinning rings (CSS animation)
  - Floating info card (bottom-left): "Salon Nocturne — Édition 2026"
  - Floating gold badge (top-right): "01 — Édition limitée"
- **Background:** Radial gradient ambient glow + grain texture overlay

#### 1B. Marquee
- **Layout:** Full-width horizontal scroll strip
- **Content:** Repeating text: "Design ✦ Exécution · Cuisine · Salon · Chambres · Éclairage · Sur mesure · Made with ✦ Home Idea"
- **Style:** Gold text, uppercase, 0.4em letter-spacing, infinite scroll animation

#### 1C. Categories (Bento Grid)
- **Layout:** 6-column bento grid on desktop
  - Salon: col-span-3, row-span-2 (largest)
  - Cuisine: col-span-3
  - Chambres: col-span-2
  - Éclairage: col-span-2
  - Aménagement: col-span-2
- **Each card:**
  - Full-bleed category image with gradient overlay (bottom)
  - Overline: "Collection"
  - Title: Category name (DM Serif Display)
  - Tagline: Category description
  - Arrow icon (revealed on hover)
  - Gold circle with arrow (top-right, hover only)

#### 1D. Featured Products
- **Layout:** 3-column grid (6 products)
- **Header:** "Pièces signature" overline + "Le meilleur du moment" title + "Toute la collection" link
- **Cards:** ProductCard component (image, overline, name, short description, price, arrow)

#### 1E. Aménagement CTA
- **Layout:** Full-width split card — left text, right image
- **Left side:**
  - Overline: "Service Signature"
  - Title: `Aménagement complet <em>de votre maison</em>`
  - Description: Service overview
  - Feature icons: Étude 3D, Livraison, Garantie 5 ans
  - CTA: "Démarrer mon projet" (primary gold)
- **Right side:** Aménagement category image with gradient overlay

### Components Used
- `hi/Navbar` (sticky header)
- `hi/Footer`
- `hi/ProductCard` (×6)
- `ScrollToTop`

### Animations

| Element | Animation | Timing |
|---------|-----------|--------|
| Hero text | `anim-rise` (fade-up 28px) | 0.9s, ease-out |
| Hero image | `anim-float` (gentle bob) | 8s infinite |
| Decorative rings | `anim-spin-slow` | 40s / 60s infinite |
| Gold badge | `anim-glow` (pulse shadow) | 4s infinite |
| CTA button | `anim-shimmer` (sweep) | 3s infinite |
| Marquee | `anim-marquee` (horizontal scroll) | 40s infinite |
| Category cards | `anim-rise` staggered | 80ms delay per card |
| Product cards | `anim-rise` staggered | 60ms delay per card |
| Category image | `scale(1.1)` on hover | 1400ms ease-out |
| Product image | `scale(1.1)` on hover | 1400ms ease-out |
| Category arrow | `opacity(0→1)` + `translateX(0)` on hover | 300ms |

### Interactions
- Click category card → navigate to `/collection/:slug`
- Click product card → navigate to `/produit/:slug`
- Click "Explorer la collection" → navigate to `/collection/salon`
- Click "Aménager ma maison" → navigate to `/amenagement`
- Click "Toute la collection" → navigate to `/collection/salon`
- Click "Démarrer mon projet" → navigate to `/amenagement`
- Navbar scroll: transparent → `bg-background/85 backdrop-blur-xl` after 20px

### Data Required
| Data | Source | Trigger |
|------|--------|---------|
| Categories (5) | `lib/products.ts` (static) | On mount |
| Featured products (6) | `lib/products.ts` (static) | On mount |

### SEO
| Tag | Value |
|-----|-------|
| `<title>` | Home Idea — Meubles & Design d'intérieur de luxe |
| `<meta description>` | Home Idea conçoit et vend du mobilier moderne, luxueux et élégant : cuisine, salon, chambres, éclairage et aménagement complet de maison. |
| `<meta og:title>` | Home Idea — Meubles & Design d'intérieur de luxe |
| `<meta og:description>` | Mobilier de luxe sur mesure. Cuisine, salon, chambres, éclairage. Aménagement complet. |
| `<meta og:image>` | `/og-home.jpg` (1200×630) |
| `<meta og:type>` | website |
| `<link rel="canonical">` | `https://home-idea.fr/` |
| Schema.org | `Organization` + `WebSite` with `SearchAction` |

### Responsive Layout

| Element | Mobile (< 640px) | Tablet (640–1024px) | Desktop (1024px+) |
|---------|-------------------|---------------------|-------------------|
| Hero layout | Stacked (text → image) | Stacked | Split (50/50) |
| Hero headline | 40px | 56px | 72px |
| Hero image height | 360px | 480px | 620px |
| Category grid | 1 column | 2 columns | 6-col bento |
| Product grid | 1 column | 2 columns | 3 columns |
| Aménagement CTA | Stacked | Stacked | Split |
| Stats row | 3-col (compact) | 3-col | 3-col |
| Section padding | 32px | 48px | 80px |

---

## 2. Catalog (`/collection/:slug`)

### Purpose
Display all products within a category. Enable subcategory filtering. Cross-promote other collections.

### Sections

#### 2A. Category Header
- **Layout:** Full-bleed hero with category image background
- **Content:**
  - Breadcrumb: ← Accueil
  - Overline: "Collection"
  - Title: Category name (DM Serif Display, 72px)
  - Tagline: Category tagline (italic)
- **Background:** Category image at 30% opacity with gradient overlay (top dark → bottom transparent)

#### 2B. Subcategory Filter
- **Layout:** Horizontal pill buttons, wrapped on mobile
- **Content:** "Tout" + all subcategory names
- **Active state:** Gold border + gold background (10% opacity) + gold text
- **Inactive state:** Gold/20 border + muted text

#### 2C. Product Grid
- **Layout:** 3-column grid on desktop
- **Empty state:** Centered message: "Aucun produit dans cette sous-catégorie pour l'instant."
- **Cards:** ProductCard component

#### 2D. Other Collections
- **Layout:** 4-column grid (excluding current category)
- **Each card:** Full-bleed category image, gradient overlay, category name
- **Hover:** Image scale 1.05, arrow reveal

### Components Used
- `hi/Navbar`
- `hi/Footer`
- `hi/ProductCard` (×N)
- `ScrollToTop`

### Animations

| Element | Animation | Timing |
|---------|-----------|--------|
| Header | `anim-rise` | 0.9s |
| Filter buttons | `anim-rise` staggered | 40ms each |
| Product cards | `anim-rise` staggered | 60ms each |
| Other collection cards | `anim-rise` staggered | 80ms each |
| Other collection image | `scale(1.1)` on hover | 1000ms |

### Interactions
- Click subcategory filter → filter products (local state, no navigation)
- Click product card → navigate to `/produit/:slug`
- Click other collection card → navigate to `/collection/:slug`
- Click "← Accueil" → navigate to `/`

### Data Required
| Data | Source | Trigger |
|------|--------|---------|
| Category by slug | `getCategory(slug)` from `lib/products.ts` | On mount, when slug changes |
| Products by category | `productsByCategory(slug)` from `lib/products.ts` | On mount, when slug changes |
| All categories (for "other") | `categories` from `lib/products.ts` | On mount |

### SEO
| Tag | Value |
|-----|-------|
| `<title>` | {Category Name} — Home Idea |
| `<meta description>` | Découvrez notre collection {Category Name}. Mobilier de luxe, design moderne et matériaux nobles. Home Idea. |
| `<meta og:image>` | `/og-collection-{slug}.jpg` |
| `<link rel="canonical">` | `https://home-idea.fr/collection/{slug}` |
| Schema.org | `CollectionPage` with `ItemList` of products |

### Responsive Layout

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Header height | 200px | 280px | 320px |
| Filter layout | Wrapped pills | Horizontal scroll | Horizontal row |
| Product grid | 1 column | 2 columns | 3 columns |
| Other collections | 1 column | 2 columns | 4 columns |
| Section padding | 32px | 48px | 80px |

---

## 3. Product Detail (`/produit/:slug`)

### Purpose
Showcase a single product with full details, enable add-to-cart, and drive related product discovery.

### Sections

#### 3A. Breadcrumb
- **Content:** ← {Category Name} (links back to catalog)

#### 3B. Product Hero (Split)
- **Left column — Image:**
  - Product image (aspect-square) with gold-border frame
  - Decorative spinning ring (behind image)
  - "Nouveauté" badge (if `isNew`)
  - Floating: `anim-float` effect
- **Right column — Info:**
  - Overline: Subcategory name
  - Title: Product name (DM Serif Display, 48px)
  - Short description (italic, muted)
  - Price: `€X,XXX` or "Sur devis" (DM Serif Display, 40px, gold gradient)
  - Full description (Fira Sans 300, 18px)
  - Materials list + Dimensions (2-column grid with icons)
  - Quantity selector (+/- buttons) + "Ajouter au panier" button
  - Trust line: "Livraison & installation par nos équipes. Garantie 5 ans."

#### 3C. Related Products
- **Layout:** 3-column grid
- **Header:** "Vous pourriez aimer" overline
- **Cards:** ProductCard component

### Components Used
- `hi/Navbar`
- `hi/Footer`
- `hi/ProductCard` (×3)
- `ScrollToTop`

### Animations

| Element | Animation | Timing |
|---------|-----------|--------|
| Product image | `anim-float` | 8s infinite |
| Decorative ring | `anim-spin-slow` | 40s infinite |
| Info section | `anim-rise` | 0.9s |
| "Nouveauté" badge | `anim-glow` | 4s infinite |
| Quantity buttons | `scale(0.95)` on press | 100ms |
| Add to cart | Text → Check icon + "Ajouté" | 200ms |
| Related cards | `anim-rise` staggered | 60ms each |

### Interactions
- Click quantity +/- → update local quantity state (min 1)
- Click "Ajouter au panier" → add to CartContext, show toast, button changes to "Ajouté" for 2s
- If price is 0 (aménagement): click → navigate to `/amenagement`
- Click category breadcrumb → navigate to `/collection/:category`
- Click related product → navigate to `/produit/:slug`

### Data Required
| Data | Source | Trigger |
|------|--------|---------|
| Product by slug | `getProduct(slug)` from `lib/products.ts` | On mount, when slug changes |
| Related products | `productsByCategory(category)` filtered | On mount, when product changes |
| Cart state | `CartContext` | On add |

### SEO
| Tag | Value |
|-----|-------|
| `<title>` | {Product Name} — Home Idea |
| `<meta description>` | {Product short description}. {Materials}. Prix : {price}€. Livraison et installation incluses. |
| `<meta og:image>` | Product image URL |
| `<meta og:type>` | product |
| `<link rel="canonical">` | `https://home-idea.fr/produit/{slug}` |
| Schema.org | `Product` with `Offer`, `AggregateRating` (future) |

### Responsive Layout

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Layout | Stacked (image → info) | Stacked | Split (50/50) |
| Image height | 400px | 500px | Full (aspect-square) |
| Image ring | Hidden | Visible | Visible |
| Title size | 32px | 40px | 48px |
| Price size | 32px | 36px | 40px |
| Specs grid | 1 column | 2 columns | 2 columns |
| Add to cart | Full width | Full width | Auto width |
| Related grid | 1 column | 2 columns | 3 columns |

---

## 4. Cart (`/panier`)

### Purpose
Review selected products, adjust quantities, proceed to checkout.

### Sections

#### 4A. Cart Header
- **Content:** "Panier" overline + "Votre sélection" title

#### 4B. Empty State (if cart is empty)
- **Layout:** Centered card
- **Content:** ShoppingBag icon (gold, muted) + "Votre panier est vide." + "Explorer les collections" CTA

#### 4C. Cart Items (if cart has items)
- **Layout:** 2-column (items list + order summary)
- **Each item:**
  - Product image (112×112px, linked to product page)
  - Overline: Subcategory
  - Product name (linked, DM Serif Display)
  - Quantity controls (+/-) in gold-bordered box
  - Line total (DM Serif Display)
  - Remove button (X icon)

#### 4D. Order Summary (Sticky Sidebar)
- **Layout:** Right column, sticky at top-28
- **Content:**
  - "Récapitulatif" overline
  - Items count
  - Subtotal
  - Shipping: "Estimée au checkout"
  - Total (DM Serif Display, gold gradient)
  - "Passer commande" CTA (primary gold, full-width)
  - "Continuer les achats" link

### Components Used
- `hi/Navbar`
- `hi/Footer`
- `ScrollToTop`

### Animations

| Element | Animation | Timing |
|---------|-----------|--------|
| Cart items | `anim-rise` staggered | 60ms each |
| Remove item | Fade out + slide left | 200ms |
| Empty state | `anim-rise` | 0.9s |
| Quantity change | Number crossfade | 100ms |

### Interactions
- Click +/- → update quantity in CartContext (min 1, max 99)
- Click X → remove item from CartContext
- Click product image/name → navigate to `/produit/:slug`
- Click "Passer commande" → navigate to `/commande`
- Click "Continuer les achats" → navigate to `/`

### Data Required
| Data | Source | Trigger |
|------|--------|---------|
| Cart items | `CartContext.detailed` | Real-time |
| Subtotal | `CartContext.subtotal` | Real-time |
| Item count | `CartContext.count` | Real-time |

### SEO
| Tag | Value |
|-----|-------|
| `<title>` | Panier — Home Idea |
| `<meta robots>` | noindex, nofollow |
| `<link rel="canonical">` | `https://home-idea.fr/panier` |

### Responsive Layout

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Layout | Stacked (items → summary) | Stacked | Side-by-side (2:1) |
| Item image | 80×80px | 96×96px | 112×112px |
| Summary | Inline after items | Inline after items | Sticky sidebar |
| Section padding | 16px | 24px | 32px |

---

## 5. Checkout (`/commande`)

### Purpose
Collect contact and shipping information. Confirm order. (Currently simulated — no real payment.)

### Sections

#### 5A. Checkout Header
- **Content:** "Commande" overline + "Finaliser votre commande" title

#### 5B. Checkout Form
- **Layout:** 2-column (form + order summary)
- **Form sections:**
  1. **Coordonnées** — Prénom, Nom, Email, Téléphone (2×2 grid)
  2. **Adresse de livraison** — Adresse (full), Ville, Code postal, Pays
  3. **Notes (optionnel)** — Textarea for delivery notes
- **Each section:** Gold-bordered card with overline title

#### 5C. Order Summary (Sticky Sidebar)
- **Layout:** Right column, sticky at top-28
- **Content:**
  - "Récapitulatif" overline
  - Line items (name × quantity, price)
  - Total (DM Serif Display, gold gradient)
  - "Confirmer la commande" CTA (primary gold, full-width)
  - Payment note: "Un conseiller vous recontactera pour valider le paiement"

#### 5D. Confirmation State (post-submit)
- **Layout:** Centered card
- **Content:**
  - Gold circle with Check icon + `anim-glow`
  - "Confirmation" overline
  - "Merci pour votre commande" title
  - Description: "Un conseiller Home Idea vous contactera sous 24h"
  - "Retour à l'accueil" CTA

### Components Used
- `hi/Navbar`
- `hi/Footer`
- `ScrollToTop`

### Animations

| Element | Animation | Timing |
|---------|-----------|--------|
| Form sections | `anim-rise` staggered | 80ms each |
| Confirmation check | `anim-glow` | 4s infinite |
| Submit button | Loading spinner → text | 200ms |
| Confirmation | `anim-rise` | 0.9s |

### Interactions
- Fill form fields (controlled state)
- Submit → 900ms simulated delay → clear cart → show confirmation
- Empty cart guard: show toast error if cart is empty

### Data Required
| Data | Source | Trigger |
|------|--------|---------|
| Cart items | `CartContext.detailed` | On mount |
| Subtotal | `CartContext.subtotal` | On mount |

### SEO
| Tag | Value |
|-----|-------|
| `<title>` | Commande — Home Idea |
| `<meta robots>` | noindex, nofollow |

### Responsive Layout

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Layout | Stacked (form → summary) | Stacked | Side-by-side (2:1) |
| Form sections | Full width | Full width | Full width |
| Summary | Inline after form | Inline after form | Sticky sidebar |
| Section padding | 16px | 24px | 32px |

---

## 6. Aménagement (`/amenagement`)

### Purpose
Present the interior design consultation service. Collect project details and contact information.

### Sections

#### 6A. Hero
- **Layout:** Split — left text, right feature cards
- **Left column:**
  - Overline: "Service Signature"
  - Title: `Aménagement complet <em>de la maison</em>` (72px)
  - Description: Service overview
- **Right column:** 2×2 grid of feature cards:
  - Étude & plans 3D (Ruler icon)
  - Direction artistique (Palette icon)
  - Logistique complète (Truck icon)
  - Garantie 5 ans (ShieldCheck icon)
- **Background:** Aménagement image at 40% opacity with gradient overlay

#### 6B. Project Configuration Form
- **Layout:** Single column, max-width 896px centered
- **Sections:**
  1. **Pièces à aménager** — Multi-select chip buttons (7 rooms)
  2. **Style souhaité** — Single-select chips (4 styles)
  3. **Budget indicatif** — Single-select chips (5 ranges)
  4. **Surface totale** — Range slider (40–500m²) with live value display
  5. **Contact** — Nom, Email, Téléphone, Ville (2×2 grid)
  6. **Message** — Textarea
  7. **Submit:** "Envoyer mon projet" CTA

#### 6C. Confirmation State (post-submit)
- **Layout:** Centered card
- **Content:**
  - Gold circle with Check icon + `anim-glow`
  - "Votre projet est en route" title
  - Description: "Notre studio vous contactera sous 48h"

### Components Used
- `hi/Navbar`
- `hi/Footer`
- `ScrollToTop`

### Animations

| Element | Animation | Timing |
|---------|-----------|--------|
| Hero | `anim-rise` | 0.9s |
| Feature cards | `anim-rise` staggered | 80ms each |
| Room chips | `scale(0.95→1)` on select | 100ms |
| Surface slider | Gold thumb glow on drag | Continuous |
| Confirmation | `anim-glow` | 4s infinite |

### Interactions
- Click room chips → toggle multi-select (add/remove)
- Click style chips → single-select
- Click budget chips → single-select
- Drag surface slider → update displayed value
- Submit → 400ms delay → show confirmation
- All chip selections update local state

### Data Required
| Data | Source | Trigger |
|------|--------|---------|
| None (all static) | — | — |

### SEO
| Tag | Value |
|-----|-------|
| `<title>` | Aménagement complet — Home Idea |
| `<meta description>` | Service d'aménagement intérieur complet. Plans 3D, direction artistique, fabrication, livraison, installation. Home Idea. |
| `<meta og:image>` | `/og-amenagement.jpg` |
| Schema.org | `Service` with `Offer` |

### Responsive Layout

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Hero layout | Stacked | Stacked | Split |
| Feature cards | 1 column | 2 columns | 2 columns |
| Room chips | Wrapped | Wrapped | Wrapped |
| Form fields | 1 column | 2 columns | 2 columns |
| Section padding | 32px | 48px | 80px |

---

## 7. About (`/a-propos`)

### Purpose
Tell the brand story. Establish credibility and design philosophy.

### Sections

#### 7A. About Header
- **Content:** "À propos" overline + "Du design à l'exécution" title

#### 7B. Hero Image
- **Layout:** Full-width 16:9 image with gold border

#### 7C. Brand Story
- **Layout:** Single column, max-width 896px
- **Content:**
  - Pull quote (DM Serif Display, italic, gold): "Une maison n'est pas décorée, elle est composée."
  - 3 paragraphs of brand story (Fira Sans 300, 18px)

#### 7D. Values (NEW)
- **Layout:** 3-column feature grid
- **Content:** 3 value cards with icon + title + description:
  - Matière noble (materials focus)
  - Sur mesure (custom approach)
  - Durabilité (sustainability)

#### 7E. CTA Banner (NEW)
- **Layout:** Full-width card
- **Content:** "Prêt à transformer votre espace?" + "Contactez notre studio" CTA

### Components Used
- `hi/Navbar`
- `hi/Footer`
- `ScrollToTop`

### Animations

| Element | Animation | Timing |
|---------|-----------|--------|
| Header | `anim-rise` | 0.9s |
| Hero image | `anim-rise` | 0.9s |
| Pull quote | `anim-rise` | 0.9s |
| Paragraphs | `anim-rise` staggered | 100ms each |
| Value cards | `anim-rise` staggered | 80ms each |
| CTA banner | `anim-rise` | 0.9s |

### Interactions
- Click CTA → navigate to `/contact`

### Data Required
| Data | Source | Trigger |
|------|--------|---------|
| None (all static) | — | — |

### SEO
| Tag | Value |
|-----|-------|
| `<title>` | À propos — Home Idea |
| `<meta description>` | Depuis plus d'une décennie, Home Idea accompagne particuliers et institutions dans l'aménagement de leurs espaces. |
| Schema.org | `Organization` with `foundingDate`, `description` |

### Responsive Layout

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Hero image | 16:9 full width | 16:9 full width | 16:9 max-width 896px |
| Values grid | 1 column | 3 columns | 3 columns |
| Content width | 100% | 100% | 896px centered |
| Section padding | 32px | 48px | 80px |

---

## 8. Contact (`/contact`)

### Purpose
Provide contact information. Enable message submission.

### Sections

#### 8A. Contact Header
- **Content:** "Contact" overline + "Restons en contact" title

#### 8B. Contact Info (Left Column)
- **Layout:** 2-column (info + form) on desktop
- **Info cards:**
  - Showroom (MapPin icon) — address
  - Email (Mail icon) — contact@homeidea.co (mailto link)
  - Téléphone (Phone icon) — phone number (tel link)
  - Instagram (Instagram icon) — @ho_me__idea (external link)
- **Hours card:** Gold-bordered card with opening hours

#### 8C. Contact Form (Right Column)
- **Layout:** Gold-bordered card
- **Fields:**
  - Nom, Email (2-column)
  - Sujet (full width)
  - Message (textarea, 6 rows)
  - "Envoyer" CTA (primary gold)

### Components Used
- `hi/Navbar`
- `hi/Footer`
- `ScrollToTop`

### Animations

| Element | Animation | Timing |
|---------|-----------|--------|
| Info cards | `anim-rise` staggered | 80ms each |
| Form | `anim-rise` | 0.9s |
| Submit | Loading → toast success | 200ms |

### Interactions
- Click info card (email/phone/instagram) → open link
- Submit form → toast success, reset form

### Data Required
| Data | Source | Trigger |
|------|--------|---------|
| None (all static) | — | — |

### SEO
| Tag | Value |
|-----|-------|
| `<title>` | Contact — Home Idea |
| `<meta description>` | Contactez Home Idea. Showroom, email, téléphone. Nous répondons sous 24h. |
| Schema.org | `LocalBusiness` with `address`, `openingHours` |

### Responsive Layout

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Layout | Stacked (info → form) | Stacked | Side-by-side (2:3) |
| Info cards | Full width | 2 columns | 1 column (stacked) |
| Form | Full width | Full width | Full width |
| Section padding | 16px | 24px | 32px |

---

## 9. Search (`/recherche`) — NEW

### Purpose
Enable users to search products by name, category, or keyword.

### Sections

#### 9A. Search Header
- **Layout:** Full-width search bar at top
- **Content:**
  - Search input with Search icon (large, prominent)
  - Placeholder: "Rechercher un meuble, un style, une pièce..."
  - Close button (X) when active

#### 9B. Search Results
- **Layout:** 3-column product grid
- **Content:** ProductCard components for matching results
- **Empty state:** "Aucun résultat pour « {query} »" + suggestion chips

#### 9C. Recent Searches (NEW)
- **Layout:** List below search bar
- **Content:** Last 5 searches (localStorage)
- **Style:** Muted text with clock icon, click to re-search

#### 9D. Popular Categories (when no query)
- **Layout:** Category chips
- **Content:** All 5 category names
- **Click:** Navigate to `/collection/:slug`

### Components Used
- `hi/Navbar`
- `hi/Footer`
- `hi/ProductCard`
- `ScrollToTop`

### Animations

| Element | Animation | Timing |
|---------|-----------|--------|
| Results grid | `anim-rise` staggered | 60ms each |
| Empty state | `anim-rise` | 0.9s |
| Search input | Focus ring glow | 150ms |

### Interactions
- Type in search → debounce 300ms → filter products client-side
- Click product → navigate to `/produit/:slug`
- Click category chip → navigate to `/collection/:slug`
- Click recent search → populate search input
- Press Escape → clear search, close results

### Data Required
| Data | Source | Trigger |
|------|--------|---------|
| All products | `products` from `lib/products.ts` | On mount |
| All categories | `categories` from `lib/products.ts` | On mount |
| Recent searches | localStorage | On mount, on search |

### SEO
| Tag | Value |
|-----|-------|
| `<title>` | Recherche — Home Idea |
| `<meta robots>` | noindex, nofollow |

### Responsive Layout

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Search bar | Full width | Full width | Max-width 600px centered |
| Results grid | 1 column | 2 columns | 3 columns |
| Recent searches | 1 column | 2 columns | 1 column |

---

## 10. Account (`/compte/*`) — NEW

### Purpose
Enable user registration, login, order history, and profile management.

### Sections

#### 10A. Login/Register (`/compte`)

##### Auth Form
- **Layout:** Centered card, max-width 400px
- **Tabs:** "Connexion" / "Inscription"
- **Login fields:** Email, Mot de passe, "Mot de passe oublié?" link
- **Register fields:** Prénom, Nom, Email, Mot de passe, Confirmer le mot de passe
- **Submit:** "Se connecter" / "Créer mon compte"
- **Divider:** "ou" with social login buttons (future)
- **Footer:** "Pas encore de compte? Créer un compte" / "Déjà un compte? Se connecter"

#### 10B. Dashboard (`/compte/tableau-de-bord`)

##### Welcome Header
- **Content:** "Bonjour, {Prénom}" + account summary

##### Order History
- **Layout:** Table/list of recent orders
- **Each order:** Order number, date, items count, total, status badge
- **Click:** Navigate to order detail

##### Quick Links
- **Layout:** 2×2 grid of cards
- **Content:** Commandes, Favoris, Profil, Paramètres

#### 10C. Orders (`/compte/commandes`)

##### Orders List
- **Layout:** Table/list
- **Each order:** Order number, date, status badge, total, "Voir" link
- **Empty state:** "Aucune commande pour le moment"

##### Order Detail (`/compte/commandes/:id`)
- **Layout:** Stacked sections
- **Content:** Order info, line items, shipping address, payment status

#### 10D. Wishlist (`/compte/favoris`)

##### Wishlist Grid
- **Layout:** 3-column product grid
- **Each card:** ProductCard with heart icon overlay (filled = in wishlist)
- **Empty state:** "Votre liste de favoris est vide"

#### 10E. Profile (`/compte/profil`)

##### Profile Form
- **Layout:** Single column, max-width 600px
- **Fields:** Prénom, Nom, Email (readonly), Téléphone, Avatar upload
- **Save:** "Enregistrer les modifications" CTA

#### 10F. Settings (`/compte/parametres`)

##### Settings Sections
- **Notifications:** Email toggle, Marketing toggle
- **Privacy:** Profile visibility toggle
- **Danger zone:** "Supprimer mon compte" (red, confirmation dialog)

### Components Used
- `hi/Navbar`
- `hi/Footer`
- `hi/ProductCard` (for wishlist)
- `ScrollToTop`

### Animations

| Element | Animation | Timing |
|---------|-----------|--------|
| Auth form | `anim-rise` | 0.9s |
| Dashboard cards | `anim-rise` staggered | 80ms each |
| Order list | `anim-rise` staggered | 60ms each |
| Wishlist grid | `anim-rise` staggered | 60ms each |
| Heart icon | `scale(1.2→1)` on toggle | 200ms |

### Interactions
- Login → redirect to dashboard
- Register → redirect to dashboard
- Toggle wishlist → update localStorage/Supabase
- Edit profile → save to Supabase
- Delete account → confirmation dialog → soft delete

### Data Required
| Data | Source | Trigger |
|------|--------|---------|
| Auth session | Supabase Auth | On mount |
| User profile | `profiles` table | On auth |
| Orders | `bookings` table (filtered) | On mount |
| Wishlist | localStorage / `wishlists` table (future) | On mount |

### SEO
| Tag | Value |
|-----|-------|
| `<title>` | Mon compte — Home Idea |
| `<meta robots>` | noindex, nofollow |

### Responsive Layout

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Auth form | Full width | Max 400px centered | Max 400px centered |
| Dashboard cards | 1 column | 2 columns | 2 columns |
| Orders table | Card layout | Table | Table |
| Wishlist grid | 1 column | 2 columns | 3 columns |
| Profile form | Full width | Max 600px | Max 600px |

---

## 11. Legal Pages — NEW

### Purpose
Provide legal compliance: terms, privacy policy, cookie policy.

### Pages

| Page | Route | Content |
|------|-------|---------|
| Mentions légales | `/mentions-legales` | Company info, hosting, credits |
| CGV | `/cgv` | Terms and conditions of sale |
| Politique de confidentialité | `/confidentialite` | GDPR privacy policy |
| Politique de cookies | `/cookies` | Cookie usage policy |

### Layout (same for all)
- **Header:** Page title (DM Serif Display)
- **Content:** Prose-formatted legal text (Fira Sans 300, 16px, max-width 768px)
- **Sections:** Numbered headings, paragraphs, lists

### Components Used
- `hi/Navbar`
- `hi/Footer`
- `ScrollToTop`

### SEO
| Tag | Value |
|-----|-------|
| `<title>` | {Page Title} — Home Idea |
| `<meta robots>` | noindex |

---

## 12. NotFound

### Purpose
Handle 404 errors gracefully. Guide users back to valid content.

### Sections

#### 12A. NotFound Content
- **Layout:** Centered card
- **Content:**
  - "404" in gold gradient (DM Serif Display, 96px)
  - "Page introuvable" title
  - "La page que vous recherchez n'existe pas ou a été déplacée." description
  - "Retour à l'accueil" CTA (primary gold)

### Components Used
- `hi/Navbar`
- `hi/Footer`
- `ScrollToTop`

### Animations

| Element | Animation | Timing |
|---------|-----------|--------|
| 404 text | `anim-rise` | 0.9s |
| Content | `anim-rise` | 0.9s, delay 200ms |

### Interactions
- Click "Retour à l'accueil" → navigate to `/`

### SEO
| Tag | Value |
|-----|-------|
| HTTP Status | 404 |
| `<title>` | 404 — Page introuvable — Home Idea |
| `<meta robots>` | noindex, nofollow |

### Responsive Layout

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| 404 size | 64px | 80px | 96px |
| Content width | 100% | 100% | 400px centered |
| Padding | 16px | 24px | 32px |

---

## Appendix: Global Page Patterns

### Page Wrapper Pattern
Every page follows this structure:
```
<div className="pt-20">  ← Account for fixed navbar (80px)
  <Section>...</Section>
  <Section>...</Section>
</div>
```

### Section Spacing
| Context | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Between sections | 32px | 48px | 80px |
| Section internal padding | 16px | 24px | 32px |
| Hero section | 32px top, 48px bottom | 48px top, 64px bottom | 64px top, 96px bottom |

### Overline Pattern (used on every page)
```
<div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3">
  {Overline Text}
</div>
```

### Empty State Pattern
```
<div className="border border-gold/15 p-16 text-center">
  <Icon className="w-12 h-12 text-gold mx-auto mb-6 opacity-60" />
  <p className="text-muted-foreground mb-6">{Empty message}</p>
  <Link to="/" className="...">{CTA}</Link>
</div>
```

### Form Field Pattern
```
<label className="block">
  <span className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
    {Label}{required && " *"}
  </span>
  <input className="w-full bg-input border border-gold/20 focus:border-gold outline-none px-4 py-3 text-sm transition-colors" />
</label>
```

### Card Border Pattern
```
border border-gold/15 bg-card hover:border-gold/60 transition-colors
```

---

*Page design specification for Home Idea.*
*12 pages fully designed with sections, components, animations, interactions, data, SEO, and responsive layouts.*
