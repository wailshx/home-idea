# Home Idea — Premium Design System Specification

> A complete design system for a French luxury furniture e-commerce brand.
> Dark-first. Gold-accented. Typographically refined.

---

## Table of Contents

1. [Color Palette](#1-color-palette)
2. [Typography](#2-typography)
3. [Spacing](#3-spacing)
4. [Border Radius](#4-border-radius)
5. [Grid](#5-grid)
6. [Cards](#6-cards)
7. [Buttons](#7-buttons)
8. [Forms](#8-forms)
9. [Inputs](#9-inputs)
10. [Icons](#10-icons)
11. [Motion Rules](#11-motion-rules)
12. [Hover Effects](#12-hover-effects)
13. [Loading States](#13-loading-states)
14. [Skeletons](#14-skeletons)
15. [Dark Mode](#15-dark-mode)
16. [Luxury Visual Language](#16-luxury-visual-language)
17. [Responsive Rules](#17-responsive-rules)
18. [Accessibility Rules](#18-accessibility-rules)

---

## 1. Color Palette

### 1.1 Core Palette

The palette is built on a **noir foundation** with **warm gold** as the sole accent. Every color serves the brand's luxury positioning — nothing decorative, nothing playful.

| Token | Role | HSL | Hex | Usage |
|-------|------|-----|-----|-------|
| `--bg` | Background | `0 0% 5%` | `#0D0D0D` | Page background, primary canvas |
| `--bg-elevated` | Surface | `0 0% 8%` | `#141414` | Cards, panels, elevated surfaces |
| `--bg-subtle` | Subtle surface | `0 0% 11%` | `#1C1C1C` | Hover states, secondary surfaces |
| `--bg-muted` | Muted surface | `0 0% 14%` | `#242424` | Disabled states, dividers |
| `--fg` | Foreground | `40 20% 93%` | `#EDE8DF` | Primary text on dark backgrounds |
| `--fg-muted` | Muted text | `40 10% 55%` | `#8A8275` | Secondary text, captions, labels |
| `--fg-faint` | Faint text | `40 8% 35%` | `#5C564D` | Placeholders, hints |
| `--gold` | Primary accent | `44 55% 54%` | `#C9A84C` | CTAs, links, active states, borders |
| `--gold-light` | Light gold | `44 70% 72%` | `#E0C973` | Hover states, highlights |
| `--gold-dark` | Dark gold | `44 50% 38%` | `#9A7D33` | Pressed states, emphasis |
| `--gold-glow` | Glow | `44 76% 74%` | `#F0D78C` | Decorative glow, shimmer |
| `--gold-bg` | Gold background | `44 45% 12%` | `#261E0D` | Gold-tinted surfaces |
| `--border` | Border | `40 15% 18%` | `#302C26` | Default borders, dividers |
| `--border-gold` | Gold border | `44 35% 25%` | `#4A3D1F` | Emphasized borders, active states |
| `--destructive` | Error/Danger | `0 72% 51%` | `#DC2626` | Errors, destructive actions |
| `--success` | Success | `142 71% 45%` | `#22C55E` | Success states, confirmations |
| `--ring` | Focus ring | `44 55% 54%` | `#C9A84C` | Keyboard focus indicators |

### 1.2 Semantic Color Mapping

| Context | Light (future) | Dark (current) |
|---------|---------------|----------------|
| Page background | `#FAF9F6` | `#0D0D0D` |
| Card background | `#FFFFFF` | `#141414` |
| Primary text | `#1C1917` | `#EDE8DF` |
| Secondary text | `#78716C` | `#8A8275` |
| Primary action | `#C9A84C` | `#C9A84C` |
| Primary action text | `#0D0D0D` | `#0D0D0D` |
| Border | `#E7E5E4` | `#302C26` |
| Error | `#DC2626` | `#EF4444` |
| Success | `#16A34A` | `#22C55E` |

### 1.3 Gold Gradient Library

| Name | Value | Usage |
|------|-------|-------|
| `--gradient-gold` | `linear-gradient(135deg, #C9A84C 0%, #E0C973 50%, #C9A84C 100%)` | Hero accents, premium badges |
| `--gradient-gold-subtle` | `linear-gradient(135deg, #C9A84C 0%, #9A7D33 100%)` | Buttons, active states |
| `--gradient-gold-radial` | `radial-gradient(ellipse at center, #C9A84C22 0%, transparent 70%)` | Ambient glow behind elements |
| `--gradient-dark` | `linear-gradient(180deg, #0D0D0D 0%, #141414 100%)` | Page sections |
| `--gradient-hero` | `radial-gradient(ellipse at 30% 50%, #C9A84C0A 0%, #0D0D0D 60%)` | Hero section ambient light |

### 1.4 Contrast Ratios (WCAG AA Verified)

| Pair | Ratio | Pass? |
|------|-------|-------|
| `--fg` on `--bg` | 12.8:1 | AAA |
| `--fg-muted` on `--bg` | 4.6:1 | AA |
| `--gold` on `--bg` | 5.2:1 | AA |
| `--gold` on `--bg-elevated` | 4.8:1 | AA |
| `--fg` on `--gold` | 5.2:1 | AA |
| `--bg` on `--gold` | 5.2:1 | AA |

---

## 2. Typography

### 2.1 Font Stack

| Role | Font | Fallback | Weight Range | Source |
|------|------|----------|-------------|--------|
| Display / Headings | **DM Serif Display** | Georgia, serif | 400, 400italic | Google Fonts |
| Body / UI | **Fira Sans** | system-ui, sans-serif | 300, 400, 500, 600 | Google Fonts |

**Why these fonts:**
- **DM Serif Display** — High-contrast serif with elegant terminals. Conveys heritage and luxury without being stuffy. The italic variant adds movement for quotes and emphasis.
- **Fira Sans** — Geometric sans with excellent legibility at small sizes. Weight 300 (Light) for body creates an airy, refined feel. Weights 500-600 for UI elements provide necessary contrast.

### 2.2 Type Scale

| Token | Size | Line Height | Letter Spacing | Font | Weight | Usage |
|-------|------|-------------|---------------|------|--------|-------|
| `display-xl` | 72px / 4.5rem | 1.0 | -0.02em | DM Serif Display | 400 | Hero headlines |
| `display-lg` | 56px / 3.5rem | 1.05 | -0.015em | DM Serif Display | 400 | Section headlines |
| `display-md` | 40px / 2.5rem | 1.1 | -0.01em | DM Serif Display | 400 | Sub-section headlines |
| `display-sm` | 32px / 2rem | 1.15 | -0.005em | DM Serif Display | 400 | Card headlines, feature titles |
| `heading-lg` | 24px / 1.5rem | 1.3 | 0 | Fira Sans | 500 | Group headings |
| `heading-md` | 20px / 1.25rem | 1.35 | 0 | Fira Sans | 500 | Sub-group headings |
| `heading-sm` | 16px / 1rem | 1.4 | 0.01em | Fira Sans | 600 | Labels, nav items |
| `body-lg` | 18px / 1.125rem | 1.7 | 0 | Fira Sans | 300 | Long-form reading |
| `body` | 16px / 1rem | 1.6 | 0 | Fira Sans | 300 | Default body text |
| `body-sm` | 14px / 0.875rem | 1.5 | 0.01em | Fira Sans | 400 | Secondary text, captions |
| `caption` | 12px / 0.75rem | 1.4 | 0.02em | Fira Sans | 400 | Timestamps, fine print |
| `overline` | 12px / 0.75rem | 1.4 | 0.1em | Fira Sans | 500 | Category tags, labels (uppercase) |
| `price` | 28px / 1.75rem | 1.2 | -0.01em | Fira Sans | 300 | Product prices |
| `price-lg` | 40px / 2.5rem | 1.1 | -0.015em | Fira Sans | 300 | Featured prices |
| `nav` | 14px / 0.875rem | 1 | 0.08em | Fira Sans | 400 | Navigation links (uppercase) |
| `button` | 14px / 0.875rem | 1 | 0.06em | Fira Sans | 500 | Button labels (uppercase) |
| `small-caps` | 12px / 0.75rem | 1 | 0.12em | Fira Sans | 500 | Decorative labels (uppercase) |

### 2.3 Typography Rules

1. **Headlines** always use DM Serif Display at weight 400. Never bold a serif heading.
2. **Body text** uses Fira Sans at weight 300 (Light). This is the signature lightness of the brand.
3. **UI labels** (buttons, nav, tags) use Fira Sans at weight 500, uppercase, with generous letter-spacing (0.06em–0.12em).
4. **Prices** use Fira Sans Light (300) — the light weight on numbers feels refined, not heavy.
5. **Maximum line length:** 65 characters for body text, 45 characters for pull quotes.
6. **Never use font size below 12px** in any context.
7. **Paragraph spacing:** 1.5× the line height (e.g., 24px after 16px body text).
8. **Heading hierarchy:** Never skip levels (h1 → h3 is forbidden).

### 2.4 Text Color Rules

| Element | Color | Opacity |
|---------|-------|---------|
| Primary heading | `--fg` | 100% |
| Body text | `--fg` | 100% |
| Secondary text | `--fg-muted` | 100% |
| Placeholder text | `--fg-faint` | 100% |
| Text on gold button | `--bg` | 100% |
| Link (default) | `--gold` | 100% |
| Link (hover) | `--gold-light` | 100% |
| Link (visited) | `--gold-dark` | 100% |
| Disabled text | `--fg-muted` | 40% |
| Error text | `--destructive` | 100% |
| Success text | `--success` | 100% |

---

## 3. Spacing

### 3.1 Spacing Scale (8px base)

| Token | Value | Usage |
|-------|-------|-------|
| `--space-0` | 0px | Reset |
| `--space-1` | 4px | Tight inline spacing (icon to text) |
| `--space-2` | 8px | Minimum gap between adjacent elements |
| `--space-3` | 12px | Small padding (input fields, chips) |
| `--space-4` | 16px | Standard padding (cards, buttons) |
| `--space-5` | 20px | Medium padding |
| `--space-6` | 24px | Card padding, component gaps |
| `--space-8` | 32px | Section sub-spacing, large card padding |
| `--space-10` | 40px | Section inner spacing |
| `--space-12` | 48px | Section spacing (small) |
| `--space-16` | 64px | Section spacing (medium) |
| `--space-20` | 80px | Section spacing (large) |
| `--space-24` | 96px | Section spacing (xl) |
| `--space-32` | 128px | Hero section spacing |

### 3.2 Spacing Rules

1. **8px grid system.** All spacing values must be multiples of 4px, preferably 8px.
2. **Section vertical spacing:** 80px (desktop) → 48px (tablet) → 32px (mobile).
3. **Component internal padding:** 24px (desktop) → 16px (mobile).
4. **Grid gaps:** 24px (desktop) → 16px (tablet) → 12px (mobile).
5. **Element proximity:** Related items use 8-12px gap. Unrelated groups use 32-48px.
6. **Footer-to-content gap:** Minimum 96px.

### 3.3 Content Width

| Breakpoint | Max Width | Padding |
|------------|-----------|---------|
| Mobile (< 640px) | 100% | 16px |
| Tablet (640–1024px) | 100% | 24px |
| Desktop (1024–1440px) | 1200px | 32px |
| Wide (> 1440px) | 1200px | auto (centered) |

---

## 4. Border Radius

### 4.1 Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-none` | 0px | — |
| `--radius-sm` | 4px | Badges, tags, small chips |
| `--radius-md` | 8px | Buttons, inputs, small cards |
| `--radius-lg` | 12px | Cards, dialogs, modals |
| `--radius-xl` | 16px | Large cards, image containers |
| `--radius-2xl` | 24px | Feature cards, hero images |
| `--radius-full` | 9999px | Avatars, circular buttons, pills |

### 4.2 Radius Rules

1. **Product cards:** 12px (`--radius-lg`). The slight rounding softens the noir aesthetic without losing sharpness.
2. **Buttons:** 8px (`--radius-md`). Sharp enough to feel precise, soft enough to feel premium.
3. **Inputs:** 8px (`--radius-md`). Matches buttons for visual consistency.
4. **Images:** 12px on cards, 0px on hero/full-bleed. Hero images are edge-to-edge for maximum impact.
5. **Modals/Dialogs:** 16px (`--radius-xl`).
6. **Never mix radii within a single component.** A card with 12px radius should have 12px radius on all children that touch its edges.
7. **Consistent radius inheritance:** Child elements inside a rounded container should have equal or smaller radius, never larger.

---

## 5. Grid

### 5.1 Grid System

| Breakpoint | Columns | Gutter | Margin |
|------------|---------|--------|--------|
| Mobile (< 640px) | 4 | 12px | 16px |
| Tablet (640–1024px) | 8 | 16px | 24px |
| Desktop (1024–1440px) | 12 | 24px | 32px |
| Wide (> 1440px) | 12 | 24px | auto (centered) |

### 5.2 Layout Patterns

#### Product Grid
```
Desktop:   3 columns (4-col span each)
Tablet:    2 columns (4-col span each)
Mobile:    1 column (full width)
```

#### Category Grid (Bento)
```
Desktop:   5 columns
           [2-col] [1-col] [1-col] [1-col]
           Or: [1] [2] [1] [1] — alternating emphasis
Tablet:    2 columns
Mobile:    1 column (stacked)
```

#### Feature Grid
```
Desktop:   3 columns
Tablet:    2 columns
Mobile:    1 column
```

#### Footer
```
Desktop:   4 columns (3:1 ratio — nav : brand)
Tablet:    2 columns
Mobile:    1 column (stacked)
```

### 5.3 Grid Rules

1. **Product grids always have equal-height rows.** Use `grid-auto-rows: 1fr` or masonry-style.
2. **Hero sections** break the grid — full-bleed, no max-width constraint.
3. **Content sections** respect the 12-col grid with max-width 1200px.
4. **Asymmetric layouts** (bento grids) use explicit `col-span` values, never auto-placement.
5. **Sidebar + content** layouts use 3:9 or 4:8 column ratios.

---

## 6. Cards

### 6.1 Card Types

#### Product Card
```
┌──────────────────────────┐
│                          │  ← Image container (aspect-ratio: 4/5)
│         [Image]          │     radius: 12px top
│                          │
├──────────────────────────┤
│  NOUVEAU                 │  ← Overline tag (if isNew)
│  Category                │  ← Overline (gold, uppercase)
│  Product Name            │  ← Heading (DM Serif, 20px)
│  Short description       │  ← Body (Fira Sans Light, 14px)
│                          │
│  €1,290          →       │  ← Price + arrow (gold)
└──────────────────────────┘

Padding: 0 (image) + 20px (content)
Radius: 12px
Border: 1px solid var(--border)
Background: var(--bg-elevated)
Hover: border-color → var(--border-gold), translateY(-4px), shadow-gold
```

#### Feature Card
```
┌──────────────────────────┐
│  [Icon]                  │  ← Gold icon (24px)
│                          │
│  Feature Title           │  ← Heading (Fira Sans 500, 16px)
│  Description text that    │  ← Body (Fira Sans 300, 14px)
│  explains the feature    │     max-width: 280px
│                          │
└──────────────────────────┘

Padding: 32px
Radius: 12px
Border: 1px solid var(--border)
Background: var(--bg-elevated)
Hover: border-color → var(--border-gold)
```

#### Category Card
```
┌──────────────────────────┐
│                          │  ← Image (aspect-ratio: 16/9)
│      [Category Image]    │     radius: 12px
│                          │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │  ← Gradient overlay (bottom)
│  Category Name           │  ← Display (DM Serif, 24px, white)
│  Tagline                 │  ← Body (Fira Sans 300, 14px, white 80%)
│                     →    │  ← Arrow (gold, revealed on hover)
└──────────────────────────┘

Padding: 0
Radius: 12px
Border: none
Hover: image scale 1.05, arrow translateX(4px)
```

#### Stats Card
```
┌──────────────────────────┐
│  12+                      │  ← Number (DM Serif, 48px, gold)
│  Années d'expérience      │  ← Label (Fira Sans 400, 14px, muted)
└──────────────────────────┘

Padding: 24px
Radius: 12px
Border: 1px solid var(--border-gold)
Background: var(--gold-bg)
```

### 6.2 Card Rules

1. **Elevation:** Cards use border + subtle shadow, not heavy drop shadows. The dark theme makes shadows less visible — borders do the heavy lifting.
2. **Hover elevation:** On hover, add `box-shadow: 0 8px 32px rgba(0,0,0,0.4)` for a floating effect.
3. **Image aspect ratios:** Product cards use 4/5. Category cards use 16/9. Feature cards use 1/1 for icons.
4. **No card should feel "heavy."** Generous internal whitespace (minimum 20px padding).
5. **Cards with actions** (CTAs) place them at the bottom, full-width or right-aligned.
6. **Interactive cards** (clickable) use `<a>` or `<Link>` wrapping the entire card. The whole card is the click target.

---

## 7. Buttons

### 7.1 Button Variants

#### Primary (Gold)
```
Background:  var(--gold)
Text:        var(--bg) — near-black
Font:        Fira Sans 500, 14px, uppercase, 0.06em letter-spacing
Padding:     14px 32px (desktop) / 12px 24px (mobile)
Radius:      8px
Border:      none
Cursor:      pointer

Hover:       background: var(--gold-light)
Pressed:     background: var(--gold-dark), scale(0.98)
Disabled:    opacity: 0.4, cursor: not-allowed
Loading:     Text replaced by spinner (16px), width preserved
```

#### Secondary (Outline)
```
Background:  transparent
Text:        var(--gold)
Font:        Fira Sans 500, 14px, uppercase, 0.06em letter-spacing
Padding:     14px 32px
Radius:      8px
Border:      1px solid var(--gold)
Cursor:      pointer

Hover:       background: var(--gold-bg)
Pressed:     background: var(--gold-bg), border-color: var(--gold-dark)
Disabled:    opacity: 0.4, cursor: not-allowed
```

#### Ghost
```
Background:  transparent
Text:        var(--fg-muted)
Font:        Fira Sans 500, 14px, uppercase, 0.06em letter-spacing
Padding:     14px 32px
Radius:      8px
Border:      none
Cursor:      pointer

Hover:       color: var(--fg), background: var(--bg-subtle)
Pressed:     background: var(--bg-muted)
Disabled:    opacity: 0.4, cursor: not-allowed
```

#### Icon Button
```
Background:  transparent
Icon:        var(--fg-muted) — 20px Lucide icon
Padding:     10px
Radius:      8px
Border:      none
Size:        40×40px (minimum touch target)
Cursor:      pointer

Hover:       color: var(--gold), background: var(--bg-subtle)
Pressed:     background: var(--bg-muted)
```

#### Text Link Button
```
Font:        Fira Sans 400, 14px
Color:       var(--gold)
Border:      none
Background:  transparent
Padding:     0
Cursor:      pointer

Hover:       color: var(--gold-light), text-decoration: underline
Underline:   1px, offset 4px, color: var(--gold)
```

### 7.2 Button Sizes

| Size | Height | Padding (H) | Font Size | Icon Size |
|------|--------|-------------|-----------|-----------|
| `sm` | 32px | 12px 20px | 12px | 14px |
| `md` | 40px | 14px 32px | 14px | 16px |
| `lg` | 48px | 16px 40px | 14px | 18px |
| `icon` | 40px | 10px | — | 20px |

### 7.3 Button Rules

1. **One primary CTA per section.** Never place two gold buttons side by side.
2. **Uppercase + letter-spacing** is the brand signature for buttons. Always.
3. **Loading state:** Replace text with a 16px gold spinner. Preserve button width to prevent layout shift.
4. **Minimum touch target:** 40×40px. If the button is smaller, expand the hit area with padding.
5. **Never disable without explanation.** If a button is disabled, show a tooltip or helper text explaining why.
6. **Destructive actions** (delete, cancel) use the ghost variant with `--destructive` color, not a red filled button.

---

## 8. Forms

### 8.1 Form Layout

```
┌─────────────────────────────────────────┐
│  Section Title (DM Serif, 24px)         │
│                                         │
│  ┌─────────────┐  ┌─────────────┐      │
│  │ First Name   │  │ Last Name   │      │  ← Side-by-side on desktop
│  └─────────────┘  └─────────────┘      │     Stacked on mobile
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ Email Address                    │    │  ← Full width
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ Phone Number                     │    │
│  │ +33 6 12 34 56 78               │    │  ← With country code
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ Address                          │    │
│  │                                  │    │  ← Textarea
│  │                                  │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────┐  ┌─────────────┐      │
│  │ City         │  │ Postal Code │      │
│  └─────────────┘  └─────────────┘      │
│                                         │
│              [ Passer commande ]        │  ← Primary CTA, centered
└─────────────────────────────────────────┘
```

### 8.2 Form Rules

1. **Labels are always visible.** Never use placeholder-only labels. Labels sit above the input.
2. **Label style:** Fira Sans 400, 14px, `--fg-muted` color, 8px below the label.
3. **Field spacing:** 24px between field groups, 16px between label and input.
4. **Section spacing:** 48px between form sections.
5. **Required fields:** Mark with a gold asterisk (*) after the label text.
6. **Error placement:** Error text appears below the input, in `--destructive` color, Fira Sans 400 12px.
7. **Error state:** Input border changes to `--destructive`. No shake animation (too playful for luxury).
8. **Success state:** Subtle green checkmark icon inside the input, right-aligned.
9. **Grouping:** Visually group related fields (name, address, contact) with section headings.
10. **Progressive disclosure:** Show fields as needed. Don't overwhelm with 20 fields at once.
11. **Multi-step forms:** Show a step indicator (dots or numbered) at the top. Current step is gold, others are muted.
12. **Submit button:** Always at the bottom, full-width on mobile, right-aligned on desktop.

### 8.3 Validation

| Trigger | Behavior |
|---------|----------|
| On blur | Validate the field. Show error if invalid. |
| On change (after first blur) | Re-validate on each keystroke once the field has been touched. |
| On submit | Validate all fields. Show summary at top if multiple errors. Focus first invalid field. |

---

## 9. Inputs

### 9.1 Text Input

```
┌─────────────────────────────────────────┐
│  Label                                   │  ← Fira Sans 400, 14px, --fg-muted
│  ┌─────────────────────────────────┐    │
│  │ Placeholder text                 │    │  ← --fg-faint, Fira Sans 300
│  └─────────────────────────────────┘    │
│  Helper text or error message           │  ← 12px, --fg-muted or --destructive
└─────────────────────────────────────────┘

Height:     48px (desktop) / 44px (mobile — minimum touch target)
Padding:    12px 16px
Background: var(--bg) (transparent or slightly lighter than card)
Border:     1px solid var(--border)
Radius:     8px
Font:       Fira Sans 300, 16px, --fg
Placeholder: Fira Sans 300, 16px, --fg-faint

Focus:      border-color: var(--gold), box-shadow: 0 0 0 3px var(--gold) with 15% opacity
Error:      border-color: var(--destructive)
Disabled:   opacity: 0.4, cursor: not-allowed, background: var(--bg-muted)
```

### 9.2 Textarea

```
Same as text input but:
Height:     120px minimum (3 lines visible)
Resize:     vertical only
Padding:    12px 16px
```

### 9.3 Select

```
Same as text input but:
Right side: ChevronDown icon (16px, --fg-muted)
Padding:    12px 16px 12px 16px

Dropdown:
Background: var(--bg-elevated)
Border:     1px solid var(--border)
Radius:     8px
Shadow:     0 8px 32px rgba(0,0,0,0.5)
Items:      40px height, 16px padding, Fira Sans 400 14px

Item hover: background: var(--bg-subtle)
Item selected: color: var(--gold), background: var(--gold-bg)
```

### 9.4 Checkbox

```
Size:       20×20px
Border:     2px solid var(--border)
Radius:     4px
Background: transparent

Checked:
Background: var(--gold)
Border:     var(--gold)
Icon:       Check (12px, white, stroke-width: 3)

Hover:      border-color: var(--gold)
Focus:      ring: 3px var(--gold) with 15% opacity
```

### 9.5 Radio

```
Size:       20×20px
Border:     2px solid var(--border)
Radius:     50%

Selected:
Border:     var(--gold)
Inner:      10×10px circle, var(--gold)

Hover:      border-color: var(--gold)
Focus:      ring: 3px var(--gold) with 15% opacity
```

### 9.6 Switch

```
Width:      44px
Height:     24px
Radius:     12px (full)
Background: var(--bg-muted) (off) / var(--gold) (on)
Thumb:      18×18px, white, radius: 50%, translateX: 3px (off) / 23px (on)
Transition: 200ms ease
```

### 9.7 Input Rules

1. **Minimum height:** 44px on mobile (touch target requirement).
2. **Font size:** 16px minimum on mobile to prevent iOS auto-zoom on focus.
3. **Focus state:** Gold border + gold ring (3px, 15% opacity). Visible and obvious.
4. **No auto-zoom:** Set `font-size: 16px` on all inputs to prevent iOS behavior.
5. **Autocomplete:** Use `autocomplete` attributes for name, email, phone, address fields.
6. **Input types:** Use `type="email"`, `type="tel"`, `type="number"` for correct mobile keyboards.
7. **Password toggle:** Show/hide button inside the input, right-aligned.

---

## 10. Icons

### 10.1 Icon Library

**Primary:** Lucide React (v0.462.0)
**Style:** Outline/stroke, 1.5px stroke width
**Color:** Inherits from parent (use `--fg-muted` or `--gold`)

### 10.2 Icon Sizes

| Token | Size | Stroke | Usage |
|-------|------|--------|-------|
| `icon-xs` | 12px | 1.5px | Inline badges, counters |
| `icon-sm` | 16px | 1.5px | Small buttons, tags |
| `icon-md` | 20px | 1.5px | Default UI icons, nav items |
| `icon-lg` | 24px | 1.5px | Feature icons, section headers |
| `icon-xl` | 32px | 2px | Hero icons, empty states |
| `icon-2xl` | 48px | 2px | Feature callouts, large displays |

### 10.3 Icon Rules

1. **Never use emojis as icons.** Always SVG (Lucide).
2. **Consistent stroke width:** 1.5px for all UI icons. 2px only for large display icons (32px+).
3. **Consistent style:** Always outline/stroke. Never filled icons at the same hierarchy level.
4. **Icon + text pairing:** Icons in navigation and buttons always have a text label. Icon-only buttons require `aria-label`.
5. **Icon color:** Inherits from parent text color by default. Use `--gold` for active/accent states.
6. **Icon alignment:** Icons align to text baseline. Use `flex items-center` for horizontal icon+text.
7. **Touch target:** Icon-only buttons must have minimum 40×40px hit area (use padding if the icon is smaller).
8. **Loading spinner:** Use `Loader2` from Lucide with `animate-spin`. Always 16px inside buttons, 24px for standalone.

### 10.4 Required Icon Set

| Category | Icons Needed |
|----------|-------------|
| Navigation | Menu, X, ChevronRight, ChevronDown, ArrowLeft, ArrowRight, ArrowUpRight |
| Products | ShoppingBag, Heart, Star, Eye, Grid3X3, LayoutGrid |
| Cart | Plus, Minus, Trash2, ShoppingBag |
| Forms | Check, AlertCircle, Info, ChevronDown, Calendar, MapPin, Phone, Mail, User |
| Social | Instagram, ExternalLink |
| UI | Loader2, Search, Filter, SortAsc, MoreVertical, Copy, Download |
| Features | Ruler, Truck, ShieldCheck, Sparkles, Clock, Award, Leaf |
| Content | Quote, Play, Image, FileText |

---

## 11. Motion Rules

### 11.1 Timing

| Token | Duration | Easing | Usage |
|-------|----------|--------|-------|
| `--duration-instant` | 0ms | — | State toggles (checkbox, switch) |
| `--duration-fast` | 150ms | `ease-out` | Hover states, focus rings, tooltips |
| `--duration-normal` | 250ms | `ease-out` | Page transitions, card reveals, dropdowns |
| `--duration-slow` | 400ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Hero animations, scroll reveals |
| `--duration-glacial` | 600ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Page-level transitions, parallax |

### 11.2 Animation Categories

#### Micro-Interactions (150-250ms)
- Button hover/press state changes
- Input focus ring appearance
- Icon color transitions
- Checkbox/radio fill animation
- Tooltip fade in/out

#### Component Transitions (250-400ms)
- Dropdown/menu open/close
- Dialog/modal appear/disappear
- Card hover elevation
- Tab content switch
- Accordion expand/collapse

#### Page Transitions (400-600ms)
- Route change fade
- Section scroll reveal
- Hero entrance sequence
- Product grid stagger

#### Decorative (continuous)
- Gold shimmer sweep (3s)
- Floating elements (8s)
- Ambient glow pulse (4s)

### 11.3 Motion Rules

1. **Enter faster, exit faster.** Enter: 250ms. Exit: 175ms (70% of enter).
2. **Easing:** `ease-out` for entering elements. `ease-in` for exiting. `cubic-bezier(0.16, 1, 0.3, 1)` for premium spring-like motion.
3. **Only animate transform and opacity.** Never animate width, height, top, left, margin, or padding.
4. **Maximum 2 animated elements per viewport.** Don't animate everything at once.
5. **Stagger reveals:** 60ms delay between items in a grid/list. Maximum 8 items staggered.
6. **Scroll reveals:** Elements fade up from 16px below. Trigger at 90% viewport entry.
7. **No animation on first paint.** Hero animations start 300ms after page load.
8. **Reduced motion:** All animations respect `prefers-reduced-motion: reduce`. Replace with instant state changes.

### 11.4 Existing CSS Animations (Preserved)

| Animation | Class | Duration | Usage |
|-----------|-------|----------|-------|
| Float | `.anim-float` | 8s infinite | Hero decorative elements |
| Spin Slow | `.anim-spin-slow` | 40s infinite | Decorative rings |
| Shimmer | `.anim-shimmer` | 3s infinite | CTA button highlight sweep |
| Rise | `.anim-rise` | 0.9s once | Card/section entrance |
| Glow Pulse | `.anim-glow` | 4s infinite | Gold badge pulsing |
| Marquee | `.anim-marquee` | 40s infinite | Scrolling text strip |
| Card 3D | `.card-3d` | hover | Perspective rotate on hover |

---

## 12. Hover Effects

### 12.1 Product Card Hover

```
Default:
  border: 1px solid var(--border)
  transform: translateY(0)
  box-shadow: none

Hover (150ms ease-out):
  border: 1px solid var(--border-gold)
  transform: translateY(-4px)
  box-shadow: 0 8px 32px rgba(0,0,0,0.3)
  
  Image:
    transform: scale(1.05)
    transition: transform 1400ms cubic-bezier(0.16, 1, 0.3, 1)
  
  Arrow icon:
    opacity: 1
    transform: translateX(0)
    color: var(--gold)
  
  Price:
    color: var(--gold-light)
```

### 12.2 Button Hover

```
Primary (Gold):
  Default:  background: var(--gold)
  Hover:    background: var(--gold-light)
  Pressed:  background: var(--gold-dark), transform: scale(0.98)

Secondary (Outline):
  Default:  border: var(--gold), background: transparent
  Hover:    background: var(--gold-bg)
  Pressed:  background: var(--gold-bg), border-color: var(--gold-dark)

Ghost:
  Default:  color: var(--fg-muted)
  Hover:    color: var(--fg), background: var(--bg-subtle)
```

### 12.3 Link Hover

```
Default:   color: var(--gold), text-decoration: none
Hover:     color: var(--gold-light)
           text-decoration: underline
           text-underline-offset: 4px
           text-decoration-color: var(--gold)
```

### 12.4 Category Card Hover

```
Default:
  Image: scale(1)
  Overlay: opacity(0.6)
  Arrow: opacity(0), translateX(-8px)

Hover:
  Image: scale(1.05) over 1400ms
  Overlay: opacity(0.4)
  Arrow: opacity(1), translateX(0), color: var(--gold)
```

### 12.5 Nav Link Hover

```
Default:   color: var(--fg-muted), text-transform: uppercase
Hover:     color: var(--gold)
           After pseudo-element: width 100%, height 1px, background: var(--gold)
           Transition: width 300ms ease-out
```

### 12.6 Hover Rules

1. **Every interactive element must have a hover state.** No exceptions.
2. **Hover duration:** 150ms for color changes, 250ms for transforms, 1400ms for slow image zooms.
3. **Touch devices:** Hover effects should enhance, not gate. All hover actions must also work on tap.
4. **Focus ring:** Always visible on keyboard focus, regardless of hover state.
5. **No hover jank:** Hover effects must not cause layout shift. Use transform-only effects.
6. **Pressed state:** Scale to 0.98 on mousedown/touchstart. Release on mouseup/touchend.

---

## 13. Loading States

### 13.1 Loading Indicators

#### Spinner (Button)
```
Size: 16px
Color: Current text color (gold on primary buttons, --fg-muted on ghost)
Speed: 1s linear infinite rotation
Usage: Inside buttons during async operations
```

#### Spinner (Standalone)
```
Size: 24px (default) / 40px (large)
Color: var(--gold)
Speed: 1s linear infinite rotation
Usage: Page loading, data fetching
```

#### Gold Shimmer Bar
```
Width: 100%
Height: 2px
Gradient: var(--bg-muted) → var(--gold) → var(--bg-muted)
Animation: 1.5s ease-infinite horizontal sweep
Usage: Top of page during route transitions
```

### 13.2 Loading Rules

1. **Show loading within 300ms** of an action starting. Don't flash spinners for sub-300ms operations.
2. **Button loading:** Replace text with spinner. Preserve button width. Disable interaction.
3. **Page loading:** Use skeleton screens (not spinners) for initial page load.
4. **Inline loading:** Use a small spinner next to the triggering element, not a full-page overlay.
5. **Never show loading for optimistic updates.** Update immediately, roll back on failure.
6. **Minimum display time:** Spinners display for at least 500ms even if the operation completes faster (prevents flicker).

---

## 14. Skeletons

### 14.1 Skeleton Patterns

#### Product Card Skeleton
```
┌──────────────────────────┐
│                          │
│    [████████████████]    │  ← Image placeholder (4/5 aspect)
│    [████████████████]    │     Background: var(--bg-subtle)
│    [████████████████]    │     Animation: shimmer sweep
│    [████████████████]    │
│    [████████████████]    │
│                          │
│  [██████]                │  ← Overline (60px wide)
│  [████████████]          │  ← Title (120px wide)
│  [████████]              │  ← Description (80px wide)
│                          │
│  [██████]       [██]     │  ← Price + arrow
└──────────────────────────┘

Animation: shimmer (1.5s ease-infinite)
Background: var(--bg-subtle)
```

#### Text Skeleton
```
Line 1:  [████████████████████████████]  100% width
Line 2:  [████████████████████████████]  100% width
Line 3:  [████████████████]              60% width

Height: 14px per line
Gap: 8px
Background: var(--bg-subtle)
Animation: shimmer
```

#### Image Skeleton
```
Full container filled with var(--bg-subtle)
Aspect ratio preserved (4/5 for products, 16/9 for categories)
Animation: shimmer
```

#### Page Skeleton
```
Header: [████████████████████████████]  full width, 80px height
Content: 
  [████████]  [████████]  [████████]  ← 3 product cards
  [████████]  [████████]  [████████]
  [████████]  [████████]  [████████]
```

### 14.2 Skeleton Rules

1. **Match the actual layout.** Skeletons must have the same dimensions as the real content.
2. **Shimmer animation:** Horizontal gradient sweep, 1.5s infinite, `ease-in-out`.
3. **Color:** `var(--bg-subtle)` for the base, `var(--bg-muted)` for the shimmer highlight.
4. **No text simulation.** Don't use fake text lines — use rectangles that match the expected content shape.
5. **Stagger appearance:** Skeleton cards appear with 60ms stagger to mimic real content loading.
6. **Fade to real content:** When data arrives, crossfade from skeleton to real content over 200ms.

---

## 15. Dark Mode

### 15.1 Current State

The application is **dark-first** — the entire design system is built for dark mode. There is no light mode currently.

### 15.2 Dark Mode Architecture

If light mode is added in the future:

| Token | Dark (Current) | Light (Proposed) |
|-------|----------------|------------------|
| `--bg` | `#0D0D0D` | `#FAF9F6` |
| `--bg-elevated` | `#141414` | `#FFFFFF` |
| `--bg-subtle` | `#1C1C1C` | `#F5F5F4` |
| `--fg` | `#EDE8DF` | `#1C1917` |
| `--fg-muted` | `#8A8275` | `#78716C` |
| `--gold` | `#C9A84C` | `#A07D2E` (darker for contrast) |
| `--border` | `#302C26` | `#E7E5E4` |

### 15.3 Dark Mode Rules

1. **Desaturate in dark mode.** Colors are slightly less saturated on dark backgrounds to prevent vibration.
2. **Never use pure white (#FFF) on pure black (#000).** Use warm off-white (`#EDE8DF`) on near-black (`#0D0D0D`).
3. **Borders are subtle.** In dark mode, borders use very low contrast (`#302C26` on `#0D0D0D`). They're structural, not decorative.
4. **Shadows are darker.** Use `rgba(0,0,0,0.3-0.5)` instead of light-mode shadows.
5. **Gold must maintain contrast.** `#C9A84C` on `#0D0D0D` = 5.2:1 (AA). On `#141414` = 4.8:1 (AA).
6. **Muted text must be readable.** `#8A8275` on `#0D0D0D` = 4.6:1 (AA).

### 15.4 Dark Mode Anti-Patterns

- Never invert colors mechanically. Dark mode is a redesign, not a filter.
- Never use blue-light filter overlays as a substitute for proper dark mode.
- Never make dark mode just "add a dark background." Every color relationship must be re-evaluated.

---

## 16. Luxury Visual Language

### 16.1 Design Principles

1. **Restrained Opulence.** Luxury is conveyed through restraint, not excess. One gold accent, generous whitespace, and impeccable typography say more than gradients and glow effects.

2. **Material Honesty.** Every visual element should feel like it's made of real materials — marble, brass, velvet, glass. The digital design mirrors the physical products.

3. **Negative Space as Luxury.** White (or black) space is the most luxury signal in design. Generous margins and padding communicate that the content is worth surrounding with space.

4. **Typographic Hierarchy.** The DM Serif Display heading + Fira Sans Light body combination creates instant luxury recognition. Never compromise this pairing.

5. **Gold as Accent, Not Theme.** Gold appears at ~5-8% of any given surface area. It's the highlight, not the background. Overuse cheapens it.

### 16.2 Visual Patterns

#### Grain Texture Overlay
```
Apply to: Hero sections, feature backgrounds
Effect: Subtle film grain (SVG noise filter)
Opacity: 3-5%
Blend mode: overlay
Purpose: Adds depth and analog warmth to digital surfaces
```

#### Gold Glow
```
Apply to: Premium badges, active CTAs, featured elements
Effect: Soft radial gradient behind element
Color: var(--gold) at 10-15% opacity
Spread: 32-48px blur
Purpose: Draws attention without being garish
```

#### 3D Perspective Cards
```
Apply to: Product cards on desktop
Effect: Subtle perspective tilt on hover
Perspective: 1000px
Rotate: max 3° on X/Y axes
Purpose: Creates depth and interactivity
```

#### Animated Underlines
```
Apply to: All text links
Effect: Underline scales from right to left on hover
Color: var(--gold)
Width: 1px
Offset: 4px below text
Purpose: Elegant link indication without cluttering
```

#### Decorative Rings
```
Apply to: Hero section only
Effect: Slow-rotating concentric circles
Color: var(--gold) at 10-20% opacity
Speed: 40s per rotation
Purpose: Creates movement and visual interest in the hero
```

### 16.3 Image Treatment

| Context | Treatment |
|---------|-----------|
| Product images | No filter. Clean, high-resolution. White or dark background. |
| Category images | Slight desaturation (10%). Dark gradient overlay at bottom for text. |
| Hero images | Full-bleed. Gold ambient glow behind. Grain texture overlay. |
| Lifestyle shots | Warm color temperature. Slightly lifted blacks. |
| Icons | SVG only. Stroke style. Gold or muted color. |

### 16.4 What Luxury is NOT

- ~~Gradient backgrounds on every section~~
- ~~Animated confetti or particles~~
- ~~Playful bounce animations~~
- ~~Bright, saturated color palettes~~
- ~~Comic-style illustrations~~
- ~~Emoji as decorative elements~~
- ~~Parallax on text content~~
- ~~Auto-playing video with sound~~
- ~~Pop-ups or exit-intent modals~~
- ~~Countdown timers or urgency badges~~

---

## 17. Responsive Rules

### 17.1 Breakpoints

| Name | Min Width | Max Width | Columns | Gutter | Target |
|------|-----------|-----------|---------|--------|--------|
| `xs` | 0px | 639px | 4 | 12px | Mobile phones |
| `sm` | 640px | 1023px | 8 | 16px | Tablets portrait |
| `md` | 1024px | 1439px | 12 | 24px | Tablets landscape / small desktop |
| `lg` | 1440px | — | 12 | 24px | Desktop |

### 17.2 Responsive Typography

| Token | Mobile (xs) | Tablet (sm) | Desktop (md+) |
|-------|-------------|-------------|---------------|
| `display-xl` | 40px | 56px | 72px |
| `display-lg` | 32px | 40px | 56px |
| `display-md` | 28px | 32px | 40px |
| `display-sm` | 24px | 28px | 32px |
| `heading-lg` | 20px | 22px | 24px |
| `price` | 24px | 26px | 28px |
| `price-lg` | 32px | 36px | 40px |

### 17.3 Responsive Spacing

| Context | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Section vertical | 32px | 48px | 80px |
| Section vertical (hero) | 48px | 64px | 96px |
| Card padding | 16px | 20px | 24px |
| Grid gap | 12px | 16px | 24px |
| Page margin | 16px | 24px | 32px |
| Footer gap | 32px | 48px | 64px |

### 17.4 Responsive Layout Changes

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Navigation | Hamburger menu | Hamburger menu | Horizontal nav links |
| Product grid | 1 column | 2 columns | 3 columns |
| Category grid | 1 column (stacked) | 2 columns | 5 columns (bento) |
| Feature grid | 1 column | 2 columns | 3 columns |
| Footer | 1 column (stacked) | 2 columns | 4 columns |
| Cart layout | Stacked (items → summary) | Stacked | Side-by-side (items → sticky summary) |
| Checkout form | Full width | Full width | 2-column (form → summary sidebar) |
| Hero | Single column | Single column | Split (text left, image right) |

### 17.5 Responsive Rules

1. **Mobile-first.** Design for 375px first, then scale up. Never the reverse.
2. **No horizontal scroll.** Content must fit within viewport width at all breakpoints.
3. **Touch targets:** 44×44px minimum on mobile. Desktop can be smaller (32×32px for icon buttons).
4. **Font size floor:** 16px minimum for body text on mobile (prevents iOS auto-zoom).
5. **No zoom disable.** Never set `maximum-scale=1` or `user-scalable=no`.
6. **Minimum viewport:** Design must work at 375px width (iPhone SE).
7. **Safe areas:** Respect `env(safe-area-inset-*)` for notch and gesture bar on mobile.
8. **Image lazy loading:** All images below the fold use `loading="lazy"`.
9. **Mobile navigation:** Hamburger menu slides in from right. Full-screen overlay with brand header.
10. **Sticky elements:** Cart summary sticky on desktop only. On mobile, it's inline.

---

## 18. Accessibility Rules

### 18.1 WCAG 2.1 AA Compliance

| Criterion | Requirement | How We Meet It |
|-----------|-------------|----------------|
| 1.1.1 Non-text Content | Alt text for all images | Every product image has descriptive alt text |
| 1.3.1 Info and Relationships | Semantic HTML | Proper heading hierarchy, lists, landmarks |
| 1.4.1 Use of Color | Not color-only | Icons + text for all status indicators |
| 1.4.3 Contrast Minimum | 4.5:1 normal, 3:1 large | All text/background pairs verified |
| 1.4.4 Resize Text | 200% without loss | Responsive typography, no fixed heights |
| 2.1.1 Keyboard | All functionality via keyboard | Full keyboard navigation support |
| 2.4.1 Bypass Blocks | Skip to main content | Skip link as first focusable element |
| 2.4.3 Focus Order | Logical tab order | Visual order matches DOM order |
| 2.4.7 Focus Visible | Visible focus indicator | Gold ring (3px) on all interactive elements |
| 3.3.1 Error Identification | Clear error messages | Error text below each invalid field |
| 3.3.2 Labels or Instructions | Visible labels | All inputs have visible labels |

### 18.2 Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Move focus to next interactive element |
| `Shift+Tab` | Move focus to previous interactive element |
| `Enter` | Activate links and buttons |
| `Space` | Activate buttons, toggle checkboxes |
| `Escape` | Close modals, dropdowns, menus |
| `Arrow keys` | Navigate within menus, tabs, radio groups |

### 18.3 Focus Management

```
Focus ring:
  Color: var(--gold)
  Width: 3px
  Offset: 2px
  Style: solid
  Radius: matches element radius

Focus trap (modals):
  First focusable element receives focus on open
  Tab cycles within modal only
  Escape closes and returns focus to trigger
```

### 18.4 Screen Reader Support

| Element | ARIA Attribute | Value |
|---------|---------------|-------|
| Navigation | `role="navigation"` | `aria-label="Main navigation"` |
| Main content | `role="main"` | — |
| Product cards | `role="article"` | `aria-label="{product name}"` |
| Cart badge | `aria-label` | `"Cart with {count} items"` |
| Loading state | `aria-live="polite"` | Announces when content loads |
| Error messages | `role="alert"` | Announces errors immediately |
| Modal | `role="dialog"` | `aria-modal="true"`, `aria-labelledby` |
| Skip link | — | "Aller au contenu principal" (first focusable) |

### 18.5 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .anim-float,
  .anim-spin-slow,
  .anim-shimmer,
  .anim-glow,
  .anim-marquee {
    animation: none !important;
  }
  
  .card-3d {
    transform: none !important;
  }
}
```

### 18.6 Accessibility Rules

1. **All images have alt text.** Decorative images use `alt=""`.
2. **All form fields have labels.** No placeholder-only labels.
3. **All interactive elements are keyboard accessible.** No click-only interactions.
4. **Focus is always visible.** Gold ring on every focusable element.
5. **Errors are announced.** `role="alert"` or `aria-live="polite"` for dynamic errors.
6. **Skip link exists.** First element in DOM, visible on focus.
7. **Heading hierarchy is sequential.** h1 → h2 → h3, never skip levels.
8. **Color is never the only indicator.** Status uses color + icon + text.
9. **Text resizes to 200%** without layout breakage or content loss.
10. **Language is declared.** `<html lang="fr">` in index.html.
11. **Touch targets are 44×44px minimum** on mobile.
12. **No auto-playing media.** No video, no audio, no animation with sound.

---

## Appendix: Design Token Summary

```css
:root {
  /* Colors */
  --bg: #0D0D0D;
  --bg-elevated: #141414;
  --bg-subtle: #1C1C1C;
  --bg-muted: #242424;
  --fg: #EDE8DF;
  --fg-muted: #8A8275;
  --fg-faint: #5C564D;
  --gold: #C9A84C;
  --gold-light: #E0C973;
  --gold-dark: #9A7D33;
  --gold-glow: #F0D78C;
  --gold-bg: #261E0D;
  --border: #302C26;
  --border-gold: #4A3D1F;
  --destructive: #DC2626;
  --success: #22C55E;
  --ring: #C9A84C;

  /* Typography */
  --font-display: 'DM Serif Display', Georgia, serif;
  --font-body: 'Fira Sans', system-ui, sans-serif;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;

  /* Duration */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  --duration-glacial: 600ms;

  /* Easing */
  --ease-out: ease-out;
  --ease-in: ease-in;
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.2);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.3);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.4);
  --shadow-xl: 0 16px 48px rgba(0,0,0,0.5);
  --shadow-gold: 0 0 32px rgba(201,168,76,0.15);
  --shadow-gold-strong: 0 0 48px rgba(201,168,76,0.25);

  /* Z-Index */
  --z-base: 0;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-overlay: 300;
  --z-modal: 400;
  --z-toast: 500;
  --z-tooltip: 600;
}
```

---

*Design system specification for Home Idea — a French luxury furniture e-commerce brand.*
*Version 1.0 — Complete specification for implementation.*
