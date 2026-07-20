# Home Idea — Backend Architecture

> Complete Supabase database design. 16 domains. Ready for migration.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Core Tables](#2-core-tables)
3. [Products Domain](#3-products-domain)
4. [Orders Domain](#4-orders-domain)
5. [Customers Domain](#5-customers-domain)
6. [Projects Domain](#6-projects-domain)
7. [Services Domain](#7-services-domain)
8. [Appointments Domain](#8-appointments-domain)
9. [Inventory Domain](#9-inventory-domain)
10. [CMS Domain](#10-cms-domain)
11. [Blog Domain](#11-blog-domain)
12. [Reviews Domain](#12-reviews-domain)
13. [Wishlist Domain](#13-wishlist-domain)
14. [Analytics Domain](#14-analytics-domain)
15. [Notifications Domain](#15-notifications-domain)
16. [Roles & Permissions Domain](#16-roles--permissions-domain)
17. [Storage Buckets](#17-storage-buckets)
18. [Edge Functions](#18-edge-functions)
19. [Database Functions](#19-database-functions)
20. [RLS Policies](#20-rls-policies)
21. [Indexes](#21-indexes)
22. [Enums](#22-enums)
23. [Views](#23-views)
24. [Entity Relationship Diagram](#24-entity-relationship-diagram)

---

## 1. Architecture Overview

### Design Principles

1. **UUID primary keys** everywhere — no sequential IDs exposed
2. **Soft deletes** — `deleted_at` timestamp, never hard delete core data
3. **Audit timestamps** — `created_at`, `updated_at` on every table
4. **Money as integers** — store cents (centimes) to avoid floating point
5. **JSONB for flexible data** — attributes, metadata, pricing breakdowns
6. **Row Level Security** — every table has RLS enabled
7. **Normalization** — no duplicate data, foreign keys everywhere
8. **Slug uniqueness** — slugs are unique within their scope (products within categories)

### Naming Conventions

| Convention | Example |
|------------|---------|
| Table names | `snake_case`, plural (`products`, `order_items`) |
| Column names | `snake_case` (`created_at`, `user_id`) |
| Primary key | `id` (UUID, auto-generated) |
| Foreign key | `{table}_id` (`category_id`, `user_id`) |
| Timestamps | `created_at`, `updated_at`, `deleted_at` |
| Boolean flags | `is_{name}` (`is_featured`, `is_published`) |
| Status enums | `status` column with enum type |
| Money columns | `_cents` suffix or documented as integer cents |
| Indexes | `idx_{table}_{column}` |

### Supabase Configuration

| Setting | Value |
|---------|-------|
| Auth | Email/password + OAuth (Google, Apple) |
| Storage | Public buckets for products, private for admin |
| Edge Functions | Checkout, webhooks, cron jobs |
| Realtime | Orders, notifications, messages |
| RLS | Enabled on ALL tables |

---

## 2. Core Tables

### 2.1 Users (extends Supabase Auth)

Supabase Auth handles `auth.users`. We extend with a `profiles` table.

```sql
CREATE TABLE profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT NOT NULL,
  first_name    TEXT,
  last_name     TEXT,
  phone         TEXT,
  avatar_url    TEXT,
  locale        TEXT DEFAULT 'fr',
  timezone      TEXT DEFAULT 'Europe/Paris',
  status        user_status DEFAULT 'active',
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  last_login_at TIMESTAMPTZ,
  metadata      JSONB DEFAULT '{}',
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW(),
  deleted_at    TIMESTAMPTZ
);
```

### 2.2 Roles

```sql
CREATE TABLE roles (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL UNIQUE,
  description TEXT,
  is_system   BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Seed data
INSERT INTO roles (name, description, is_system) VALUES
  ('super_admin', 'Full system access', TRUE),
  ('admin', 'Administrative access', TRUE),
  ('editor', 'Content management access', TRUE),
  ('manager', 'Order and inventory management', TRUE),
  ('customer', 'Standard customer', TRUE);
```

### 2.3 User Roles

```sql
CREATE TABLE user_roles (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role_id    UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  granted_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role_id)
);
```

### 2.4 Permissions

```sql
CREATE TABLE permissions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL UNIQUE,
  resource    TEXT NOT NULL,
  action      TEXT NOT NULL,
  description TEXT,
  UNIQUE(resource, action)
);

-- Seed: product permissions
INSERT INTO permissions (name, resource, action, description) VALUES
  ('products.create', 'products', 'create', 'Create products'),
  ('products.read', 'products', 'read', 'View products'),
  ('products.update', 'products', 'update', 'Edit products'),
  ('products.delete', 'products', 'delete', 'Delete products'),
  ('orders.read', 'orders', 'read', 'View orders'),
  ('orders.update', 'orders', 'update', 'Manage orders'),
  ('customers.read', 'customers', 'read', 'View customers'),
  ('customers.update', 'customers', 'update', 'Edit customers'),
  ('blog.create', 'blog', 'create', 'Create blog posts'),
  ('blog.update', 'blog', 'update', 'Edit blog posts'),
  ('blog.delete', 'blog', 'delete', 'Delete blog posts'),
  ('cms.update', 'cms', 'update', 'Edit CMS content'),
  ('analytics.read', 'analytics', 'read', 'View analytics'),
  ('settings.update', 'settings', 'update', 'Edit settings'),
  ('projects.read', 'projects', 'read', 'View projects'),
  ('projects.update', 'projects', 'update', 'Manage projects'),
  ('reviews.moderate', 'reviews', 'moderate', 'Moderate reviews'),
  ('inventory.update', 'inventory', 'update', 'Manage inventory');
```

### 2.5 Role Permissions

```sql
CREATE TABLE role_permissions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id       UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(role_id, permission_id)
);

-- Super admin gets everything
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.name = 'super_admin';

-- Admin gets most things
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.name = 'admin'
AND p.name NOT IN ('settings.update');

-- Customer gets read-only
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.name = 'customer'
AND p.action = 'read'
AND p.resource IN ('products', 'blog');
```

---

## 3. Products Domain

### 3.1 Categories

```sql
CREATE TABLE categories (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id       UUID REFERENCES categories(id) ON DELETE SET NULL,
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  description     TEXT,
  image_url       TEXT,
  icon            TEXT,
  sort_order      INTEGER DEFAULT 0,
  is_active       BOOLEAN DEFAULT TRUE,
  is_featured     BOOLEAN DEFAULT FALSE,
  meta_title      TEXT,
  meta_description TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  deleted_at      TIMESTAMPTZ
);
```

**Relationship:** Self-referencing `parent_id` for hierarchy:
- Level 0: Salon, Cuisine, Chambres, Éclairage, Aménagement
- Level 1: Canapés, Fauteuils, Tables basses (under Salon)

### 3.2 Products

```sql
CREATE TABLE products (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id       UUID NOT NULL REFERENCES categories(id),
  name              TEXT NOT NULL,
  slug              TEXT NOT NULL UNIQUE,
  sku               TEXT UNIQUE,
  short_description TEXT,
  description       TEXT,
  price_cents       INTEGER NOT NULL DEFAULT 0,
  compare_at_cents  INTEGER,
  currency          TEXT DEFAULT 'EUR',
  cost_cents        INTEGER,
  materials         JSONB DEFAULT '[]',
  dimensions        TEXT,
  weight_grams      INTEGER,
  color             TEXT,
  finish            TEXT,
  care_instructions TEXT,
  warranty_info     TEXT,
  status            product_status DEFAULT 'draft',
  is_featured       BOOLEAN DEFAULT FALSE,
  is_new            BOOLEAN DEFAULT FALSE,
  is_digital        BOOLEAN DEFAULT FALSE,
  requires_shipping BOOLEAN DEFAULT TRUE,
  tax_rate          DECIMAL(5,2) DEFAULT 20.00,
  meta_title        TEXT,
  meta_description  TEXT,
  slug_id           TEXT,
  sort_order        INTEGER DEFAULT 0,
  published_at      TIMESTAMPTZ,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW(),
  deleted_at        TIMESTAMPTZ
);
```

### 3.3 Product Images

```sql
CREATE TABLE product_images (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url        TEXT NOT NULL,
  alt        TEXT,
  sort_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  width      INTEGER,
  height     INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.4 Product Variants

```sql
CREATE TABLE product_variants (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id      UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  sku             TEXT UNIQUE,
  price_cents     INTEGER NOT NULL,
  compare_at_cents INTEGER,
  cost_cents      INTEGER,
  attributes      JSONB DEFAULT '{}',
  stock_quantity  INTEGER DEFAULT 0,
  weight_grams    INTEGER,
  is_active       BOOLEAN DEFAULT TRUE,
  sort_order      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

**Attributes JSONB example:**
```json
{
  "color": "Noir",
  "finish": "Mat",
  "size": "180×200"
}
```

### 3.5 Product Collections

```sql
CREATE TABLE collections (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  description     TEXT,
  image_url       TEXT,
  is_active       BOOLEAN DEFAULT TRUE,
  is_featured     BOOLEAN DEFAULT FALSE,
  sort_order      INTEGER DEFAULT 0,
  meta_title      TEXT,
  meta_description TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.6 Product Collection Members

```sql
CREATE TABLE product_collections (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id    UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  collection_id UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  sort_order    INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_id, collection_id)
);
```

### 3.7 Product Attributes

```sql
CREATE TABLE product_attributes (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  key        TEXT NOT NULL,
  value      TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  UNIQUE(product_id, key)
);
```

---

## 4. Orders Domain

### 4.1 Orders

```sql
CREATE TABLE orders (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number        TEXT NOT NULL UNIQUE,
  user_id             UUID REFERENCES profiles(id),
  status              order_status DEFAULT 'pending',
  currency            TEXT DEFAULT 'EUR',
  subtotal_cents      INTEGER NOT NULL DEFAULT 0,
  discount_cents      INTEGER DEFAULT 0,
  shipping_cents      INTEGER DEFAULT 0,
  tax_cents           INTEGER DEFAULT 0,
  total_cents         INTEGER NOT NULL DEFAULT 0,
  notes               TEXT,
  internal_notes      TEXT,
  shipping_address    JSONB,
  billing_address     JSONB,
  payment_method      TEXT,
  payment_status      payment_status DEFAULT 'pending',
  payment_reference   TEXT,
  paid_at             TIMESTAMPTZ,
  shipped_at          TIMESTAMPTZ,
  delivered_at        TIMESTAMPTZ,
  cancelled_at        TIMESTAMPTZ,
  cancel_reason       TEXT,
  metadata            JSONB DEFAULT '{}',
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW(),
  deleted_at          TIMESTAMPTZ
);
```

### 4.2 Order Items

```sql
CREATE TABLE order_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id        UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id      UUID NOT NULL REFERENCES products(id),
  variant_id      UUID REFERENCES product_variants(id),
  name            TEXT NOT NULL,
  sku             TEXT,
  quantity        INTEGER NOT NULL DEFAULT 1,
  unit_price_cents INTEGER NOT NULL,
  discount_cents  INTEGER DEFAULT 0,
  tax_cents       INTEGER DEFAULT 0,
  total_cents     INTEGER NOT NULL,
  metadata        JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

### 4.3 Order Status History

```sql
CREATE TABLE order_status_history (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id   UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  status     order_status NOT NULL,
  note       TEXT,
  changed_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4.4 Coupons

```sql
CREATE TABLE coupons (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code              TEXT NOT NULL UNIQUE,
  description       TEXT,
  discount_type     discount_type NOT NULL,
  discount_value    INTEGER NOT NULL,
  minimum_order_cents INTEGER DEFAULT 0,
  maximum_discount_cents INTEGER,
  usage_limit       INTEGER,
  used_count        INTEGER DEFAULT 0,
  per_user_limit    INTEGER DEFAULT 1,
  starts_at         TIMESTAMPTZ,
  expires_at        TIMESTAMPTZ,
  is_active         BOOLEAN DEFAULT TRUE,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);
```

### 4.5 Order Coupons

```sql
CREATE TABLE order_coupons (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id   UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  coupon_id  UUID NOT NULL REFERENCES coupons(id),
  discount_cents INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 5. Customers Domain

### 5.1 Customer Profiles (extends profiles)

```sql
-- profiles table already has basic info
-- Add customer-specific fields via a separate table for clean separation

CREATE TABLE customer_profiles (
  id                  UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  loyalty_points      INTEGER DEFAULT 0,
  total_spent_cents   INTEGER DEFAULT 0,
  order_count         INTEGER DEFAULT 0,
  average_order_cents INTEGER DEFAULT 0,
  first_order_at      TIMESTAMPTZ,
  last_order_at       TIMESTAMPTZ,
  tags                TEXT[] DEFAULT '{}',
  notes               TEXT,
  referred_by         UUID REFERENCES profiles(id),
  referral_code       TEXT UNIQUE,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);
```

### 5.2 Customer Addresses

```sql
CREATE TABLE customer_addresses (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  label         TEXT DEFAULT 'Domicile',
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  company       TEXT,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city          TEXT NOT NULL,
  postal_code   TEXT NOT NULL,
  country_code  TEXT NOT NULL DEFAULT 'FR',
  phone         TEXT,
  is_default    BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 6. Projects Domain

### 6.1 Projects (Aménagement)

```sql
CREATE TABLE projects (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES profiles(id),
  reference       TEXT NOT NULL UNIQUE,
  title           TEXT,
  status          project_status DEFAULT 'new',
  priority        project_priority DEFAULT 'normal',
  rooms           JSONB DEFAULT '[]',
  style           TEXT,
  budget_min_cents INTEGER,
  budget_max_cents INTEGER,
  surface_sqm     INTEGER,
  description     TEXT,
  address         JSONB,
  city            TEXT,
  assigned_to     UUID REFERENCES profiles(id),
  quoted_at       TIMESTAMPTZ,
  quote_cents     INTEGER,
  accepted_at     TIMESTAMPTZ,
  started_at      TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ,
  notes           TEXT,
  internal_notes  TEXT,
  metadata        JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  deleted_at      TIMESTAMPTZ
);
```

### 6.2 Project Rooms

```sql
CREATE TABLE project_rooms (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  area_sqm   INTEGER,
  notes      TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 6.3 Project Images

```sql
CREATE TABLE project_images (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  room_id    UUID REFERENCES project_rooms(id) ON DELETE SET NULL,
  url        TEXT NOT NULL,
  caption    TEXT,
  type       TEXT DEFAULT 'reference',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 6.4 Project Files

```sql
CREATE TABLE project_files (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  url        TEXT NOT NULL,
  type       TEXT NOT NULL,
  size_bytes INTEGER,
  uploaded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 6.5 Project Timeline

```sql
CREATE TABLE project_timeline (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id  UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT,
  status      TEXT DEFAULT 'pending',
  due_date    DATE,
  completed_at TIMESTAMPTZ,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### 6.6 Project Messages

```sql
CREATE TABLE project_messages (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id    UUID NOT NULL REFERENCES profiles(id),
  body       TEXT NOT NULL,
  attachment_url TEXT,
  read_at    TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 7. Services Domain

### 7.1 Services

```sql
CREATE TABLE services (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  short_description TEXT,
  description     TEXT,
  icon            TEXT,
  image_url       TEXT,
  price_cents     INTEGER,
  price_type      TEXT DEFAULT 'fixed',
  duration_minutes INTEGER,
  is_active       BOOLEAN DEFAULT TRUE,
  is_featured     BOOLEAN DEFAULT FALSE,
  sort_order      INTEGER DEFAULT 0,
  meta_title      TEXT,
  meta_description TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  deleted_at      TIMESTAMPTZ
);
```

### 7.2 Service Packages

```sql
CREATE TABLE service_packages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id      UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  description     TEXT,
  price_cents     INTEGER NOT NULL,
  features        JSONB DEFAULT '[]',
  is_popular      BOOLEAN DEFAULT FALSE,
  sort_order      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

### 7.3 Service Add-ons

```sql
CREATE TABLE service_addons (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id      UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  description     TEXT,
  price_cents     INTEGER NOT NULL,
  is_active       BOOLEAN DEFAULT TRUE,
  sort_order      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 8. Appointments Domain

### 8.1 Appointments

```sql
CREATE TABLE appointments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES profiles(id),
  service_id      UUID REFERENCES services(id),
  project_id      UUID REFERENCES projects(id),
  title           TEXT NOT NULL,
  description     TEXT,
  status          appointment_status DEFAULT 'pending',
  type            TEXT DEFAULT 'consultation',
  start_at        TIMESTAMPTZ NOT NULL,
  end_at          TIMESTAMPTZ NOT NULL,
  location        TEXT,
  meeting_url     TEXT,
  notes           TEXT,
  reminder_sent   BOOLEAN DEFAULT FALSE,
  cancelled_at    TIMESTAMPTZ,
  cancel_reason   TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

### 8.2 Availability Rules

```sql
CREATE TABLE availability_rules (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES profiles(id),
  day_of_week INTEGER NOT NULL,
  start_time  TIME NOT NULL,
  end_time    TIME NOT NULL,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### 8.3 Availability Exceptions

```sql
CREATE TABLE availability_exceptions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES profiles(id),
  date        DATE NOT NULL,
  start_time  TIME,
  end_time    TIME,
  is_available BOOLEAN DEFAULT FALSE,
  reason      TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 9. Inventory Domain

### 9.1 Inventory

```sql
CREATE TABLE inventory (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id      UUID NOT NULL REFERENCES products(id),
  variant_id      UUID REFERENCES product_variants(id),
  quantity         INTEGER NOT NULL DEFAULT 0,
  reserved        INTEGER NOT NULL DEFAULT 0,
  available        INTEGER GENERATED ALWAYS AS (quantity - reserved) STORED,
  low_stock_threshold INTEGER DEFAULT 5,
  reorder_point   INTEGER,
  reorder_quantity INTEGER,
  location        TEXT,
  last_counted_at TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

### 9.2 Inventory Movements

```sql
CREATE TABLE inventory_movements (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inventory_id UUID NOT NULL REFERENCES inventory(id),
  type        movement_type NOT NULL,
  quantity    INTEGER NOT NULL,
  reference   TEXT,
  note        TEXT,
  created_by  UUID REFERENCES profiles(id),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### 9.3 Suppliers

```sql
CREATE TABLE suppliers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  contact_name TEXT,
  email       TEXT,
  phone       TEXT,
  address     JSONB,
  notes       TEXT,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### 9.4 Product Suppliers

```sql
CREATE TABLE product_suppliers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  supplier_id UUID NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
  cost_cents  INTEGER,
  lead_days   INTEGER,
  is_primary  BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_id, supplier_id)
);
```

---

## 10. CMS Domain

### 10.1 Pages

```sql
CREATE TABLE pages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  content         JSONB,
  excerpt         TEXT,
  template        TEXT DEFAULT 'default',
  status          page_status DEFAULT 'draft',
  featured_image  TEXT,
  meta_title      TEXT,
  meta_description TEXT,
  og_image        TEXT,
  sort_order      INTEGER DEFAULT 0,
  published_at    TIMESTAMPTZ,
  created_by      UUID REFERENCES profiles(id),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  deleted_at      TIMESTAMPTZ
);
```

### 10.2 Page Sections

```sql
CREATE TABLE page_sections (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id    UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  type       TEXT NOT NULL,
  title      TEXT,
  content    JSONB,
  image_url  TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active  BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 10.3 Media Library

```sql
CREATE TABLE media (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES profiles(id),
  file_name   TEXT NOT NULL,
  file_type   TEXT NOT NULL,
  file_size   INTEGER NOT NULL,
  url         TEXT NOT NULL,
  alt         TEXT,
  caption     TEXT,
  folder      TEXT DEFAULT '/',
  metadata    JSONB DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### 10.4 Navigation Menus

```sql
CREATE TABLE menus (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  slug       TEXT NOT NULL UNIQUE,
  is_active  BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE menu_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_id     UUID NOT NULL REFERENCES menus(id) ON DELETE CASCADE,
  parent_id   UUID REFERENCES menu_items(id) ON DELETE CASCADE,
  label       TEXT NOT NULL,
  url         TEXT,
  page_id     UUID REFERENCES pages(id),
  product_id  UUID REFERENCES products(id),
  category_id UUID REFERENCES categories(id),
  icon        TEXT,
  target      TEXT DEFAULT '_self',
  sort_order  INTEGER DEFAULT 0,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### 10.5 Site Settings

```sql
CREATE TABLE site_settings (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_name  TEXT NOT NULL,
  key         TEXT NOT NULL,
  value       JSONB,
  type        TEXT DEFAULT 'text',
  label       TEXT,
  description TEXT,
  is_public   BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(group_name, key)
);
```

---

## 11. Blog Domain

### 11.1 Blog Posts

```sql
CREATE TABLE blog_posts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  excerpt         TEXT,
  content         JSONB,
  featured_image  TEXT,
  author_id       UUID REFERENCES profiles(id),
  category_id     UUID REFERENCES blog_categories(id),
  status          blog_status DEFAULT 'draft',
  is_featured     BOOLEAN DEFAULT FALSE,
  reading_time    INTEGER,
  view_count      INTEGER DEFAULT 0,
  meta_title      TEXT,
  meta_description TEXT,
  og_image        TEXT,
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  deleted_at      TIMESTAMPTZ
);
```

### 11.2 Blog Categories

```sql
CREATE TABLE blog_categories (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  description     TEXT,
  image_url       TEXT,
  parent_id       UUID REFERENCES blog_categories(id),
  sort_order      INTEGER DEFAULT 0,
  is_active       BOOLEAN DEFAULT TRUE,
  meta_title      TEXT,
  meta_description TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

### 11.3 Blog Tags

```sql
CREATE TABLE blog_tags (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  slug       TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 11.4 Blog Post Tags

```sql
CREATE TABLE blog_post_tags (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id    UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id     UUID NOT NULL REFERENCES blog_tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, tag_id)
);
```

### 11.5 Blog Comments

```sql
CREATE TABLE blog_comments (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id    UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  user_id    UUID REFERENCES profiles(id),
  parent_id  UUID REFERENCES blog_comments(id) ON DELETE CASCADE,
  author_name TEXT,
  author_email TEXT,
  body       TEXT NOT NULL,
  status     moderation_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 12. Reviews Domain

### 12.1 Reviews

```sql
CREATE TABLE reviews (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES profiles(id),
  product_id  UUID REFERENCES products(id),
  service_id  UUID REFERENCES services(id),
  project_id  UUID REFERENCES projects(id),
  order_id    UUID REFERENCES orders(id),
  rating      INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title       TEXT,
  body        TEXT,
  pros        TEXT,
  cons        TEXT,
  status      moderation_status DEFAULT 'pending',
  is_verified BOOLEAN DEFAULT FALSE,
  helpful_count INTEGER DEFAULT 0,
  reported_at TIMESTAMPTZ,
  moderated_at TIMESTAMPTZ,
  moderated_by UUID REFERENCES profiles(id),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  deleted_at  TIMESTAMPTZ
);
```

### 12.2 Review Images

```sql
CREATE TABLE review_images (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id  UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  url        TEXT NOT NULL,
  alt        TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 12.3 Review Votes

```sql
CREATE TABLE review_votes (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id  UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  user_id    UUID NOT NULL REFERENCES profiles(id),
  helpful    BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(review_id, user_id)
);
```

---

## 13. Wishlist Domain

### 13.1 Wishlists

```sql
CREATE TABLE wishlists (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name       TEXT DEFAULT 'Ma liste',
  is_public  BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 13.2 Wishlist Items

```sql
CREATE TABLE wishlist_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wishlist_id UUID NOT NULL REFERENCES wishlists(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  note        TEXT,
  added_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(wishlist_id, product_id)
);
```

---

## 14. Analytics Domain

### 14.1 Page Views

```sql
CREATE TABLE page_views (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES profiles(id),
  session_id  TEXT NOT NULL,
  page_path   TEXT NOT NULL,
  page_title  TEXT,
  referrer    TEXT,
  utm_source  TEXT,
  utm_medium  TEXT,
  utm_campaign TEXT,
  device_type TEXT,
  browser     TEXT,
  os          TEXT,
  country     TEXT,
  city        TEXT,
  duration_ms INTEGER,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### 14.2 Events

```sql
CREATE TABLE analytics_events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES profiles(id),
  session_id  TEXT NOT NULL,
  event_name  TEXT NOT NULL,
  event_data  JSONB DEFAULT '{}',
  page_path   TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### 14.3 Product Views

```sql
CREATE TABLE product_views (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id),
  user_id    UUID REFERENCES profiles(id),
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 14.4 Search Queries

```sql
CREATE TABLE search_queries (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES profiles(id),
  query      TEXT NOT NULL,
  results_count INTEGER DEFAULT 0,
  clicked_product_id UUID REFERENCES products(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 15. Notifications Domain

### 15.1 Notifications

```sql
CREATE TABLE notifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type        notification_type NOT NULL,
  title       TEXT NOT NULL,
  body        TEXT,
  data        JSONB DEFAULT '{}',
  channel     TEXT DEFAULT 'in_app',
  read_at     TIMESTAMPTZ,
  sent_at     TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### 15.2 Notification Preferences

```sql
CREATE TABLE notification_preferences (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type            notification_type NOT NULL,
  email_enabled   BOOLEAN DEFAULT TRUE,
  push_enabled    BOOLEAN DEFAULT TRUE,
  in_app_enabled  BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, type)
);
```

### 15.3 Email Templates

```sql
CREATE TABLE email_templates (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL UNIQUE,
  subject     TEXT NOT NULL,
  html_body   TEXT NOT NULL,
  text_body   TEXT,
  variables   JSONB DEFAULT '[]',
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 16. Roles & Permissions Domain

(Already covered in Section 2. Here's the summary.)

### Tables
- `roles` — Role definitions
- `user_roles` — User-to-role assignments
- `permissions` — Granular permissions
- `role_permissions` — Role-to-permission assignments

### Built-in Roles
| Role | Description |
|------|-------------|
| `super_admin` | Full system access |
| `admin` | Administrative access |
| `editor` | Content management |
| `manager` | Order/inventory management |
| `customer` | Standard customer |

### Permission Pattern
`{resource}.{action}` — e.g., `products.create`, `orders.read`

---

## 17. Storage Buckets

| Bucket | Access | Purpose |
|--------|--------|---------|
| `products` | Public | Product images |
| `categories` | Public | Category images |
| `collections` | Public | Collection banners |
| `blog` | Public | Blog post images |
| `avatars` | Public | User avatars |
| `projects` | Authenticated | Project files, renders |
| `services` | Public | Service images |
| `media` | Authenticated | CMS media library |
| `reviews` | Authenticated | Review images |
| `notifications` | Private | Attachment files |

### Storage Policies

```sql
-- Public buckets: anyone can read
CREATE POLICY "Public read" ON storage.objects
  FOR SELECT USING (bucket_id IN ('products', 'categories', 'collections', 'blog', 'avatars', 'services'));

-- Authenticated buckets: only authenticated users
CREATE POLICY "Auth read" ON storage.objects
  FOR SELECT USING (bucket_id IN ('projects', 'media', 'reviews') AND auth.role() = 'authenticated');

-- Upload policies: authenticated users can upload
CREATE POLICY "Auth upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id IN ('projects', 'media', 'reviews') AND auth.role() = 'authenticated');

-- Users can upload avatars to their own folder
CREATE POLICY "Avatar upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
```

---

## 18. Edge Functions

| Function | Trigger | Purpose |
|----------|---------|---------|
| `checkout` | POST /checkout | Process order, validate inventory, send confirmation |
| `webhook-stripe` | POST /webhook-stripe | Handle Stripe payment events |
| `send-email` | Internal | Send transactional emails via Resend/SendGrid |
| `generate-invoice` | POST /invoice | Generate PDF invoice for order |
| `sync-analytics` | Cron (hourly) | Aggregate page views and events |
| `cleanup-expired` | Cron (daily) | Clean expired sessions, carts, temp data |
| `process-appointments` | Cron (daily) | Send appointment reminders |
| `sitemap-generator` | Cron (daily) | Generate sitemap.xml |

---

## 19. Database Functions

### 19.1 Order Number Generator

```sql
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number := 'HI-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' ||
    LPAD((EXTRACT(EPOCH FROM NOW())::BIGINT % 10000)::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### 19.2 Product Slug Generator

```sql
CREATE OR REPLACE FUNCTION generate_product_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := LOWER(REGEXP_REPLACE(
      REGEXP_REPLACE(NEW.name, '[^a-zA-Z0-9\s-]', '', 'g'),
      '\s+', '-', 'g'
    ));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### 19.3 Order Total Calculator

```sql
CREATE OR REPLACE FUNCTION calculate_order_total()
RETURNS TRIGGER AS $$
BEGIN
  NEW.total_cents := (
    SELECT COALESCE(SUM(total_cents), 0)
    FROM order_items
    WHERE order_id = NEW.id
  ) + NEW.shipping_cents + NEW.tax_cents - NEW.discount_cents;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### 19.4 Product Rating Calculator

```sql
CREATE OR REPLACE FUNCTION calculate_product_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE products SET
    rating_avg = (
      SELECT COALESCE(AVG(rating), 0)
      FROM reviews
      WHERE product_id = NEW.product_id AND status = 'approved'
    ),
    rating_count = (
      SELECT COUNT(*)
      FROM reviews
      WHERE product_id = NEW.product_id AND status = 'approved'
    ),
    updated_at = NOW()
  WHERE id = NEW.product_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### 19.5 Inventory Reservation

```sql
CREATE OR REPLACE FUNCTION reserve_inventory(
  p_product_id UUID,
  p_quantity INTEGER
) RETURNS BOOLEAN AS $$
DECLARE
  v_available INTEGER;
BEGIN
  SELECT available INTO v_available
  FROM inventory
  WHERE product_id = p_product_id;

  IF v_available >= p_quantity THEN
    UPDATE inventory
    SET reserved = reserved + p_quantity,
        updated_at = NOW()
    WHERE product_id = p_product_id;
    RETURN TRUE;
  END IF;

  RETURN FALSE;
END;
$$ LANGUAGE plpgsql;
```

### 19.6 Has Role Check

```sql
CREATE OR REPLACE FUNCTION has_role(p_user_id UUID, p_role_name TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = p_user_id AND r.name = p_role_name
  );
END;
$$ LANGUAGE plpgsql;
```

### 19.7 Has Permission Check

```sql
CREATE OR REPLACE FUNCTION has_permission(p_user_id UUID, p_permission_name TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM user_roles ur
    JOIN role_permissions rp ON ur.role_id = rp.role_id
    JOIN permissions p ON rp.permission_id = p.id
    WHERE ur.user_id = p_user_id AND p.name = p_permission_name
  );
END;
$$ LANGUAGE plpgsql;
```

---

## 20. RLS Policies

### Principle
Every table has RLS enabled. Policies are additive (no DENY).

### Pattern

```sql
-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public read for published products
CREATE POLICY "products_select_public" ON products
  FOR SELECT USING (status = 'published' AND deleted_at IS NULL);

-- Authenticated users can read their own data
CREATE POLICY "orders_select_own" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Admins can do everything
CREATE POLICY "products_admin_all" ON products
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Managers can update orders
CREATE POLICY "orders_manager_update" ON orders
  FOR UPDATE USING (has_role(auth.uid(), 'manager'));
```

### Policy Summary by Table

| Table | Public Read | Auth Read | Own Read | Admin | Manager |
|-------|-------------|-----------|----------|-------|---------|
| `products` | Published only | All | — | All | All |
| `categories` | Active only | All | — | All | All |
| `orders` | — | — | Own | All | All |
| `order_items` | — | — | Own orders | All | All |
| `reviews` | Approved | All | Own | All | Moderate |
| `profiles` | Public fields | All | Own | All | All |
| `projects` | — | — | Own | All | All |
| `appointments` | — | — | Own | All | All |
| `notifications` | — | — | Own | — | — |
| `wishlists` | Public only | Own | Own | — | — |
| `blog_posts` | Published | All | — | All | All |
| `pages` | Published | All | — | All | All |

---

## 21. Indexes

### Performance-Critical Indexes

```sql
-- Products
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_status ON products(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_featured ON products(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_products_price ON products(price_cents);
CREATE INDEX idx_products_published ON products(published_at DESC) WHERE status = 'published';

-- Categories
CREATE INDEX idx_categories_parent ON categories(parent_id);
CREATE INDEX idx_categories_slug ON categories(slug);

-- Orders
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_orders_number ON orders(order_number);

-- Order Items
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- Reviews
CREATE INDEX idx_reviews_product ON reviews(product_id) WHERE status = 'approved';
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- Blog
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_blog_posts_published ON blog_posts(published_at DESC) WHERE status = 'published';
CREATE INDEX idx_blog_posts_category ON blog_posts(category_id);

-- Wishlist
CREATE INDEX idx_wishlist_items_user ON wishlist_items(wishlist_id);

-- Notifications
CREATE INDEX idx_notifications_user ON notifications(user_id, read_at) WHERE read_at IS NULL;

-- Analytics
CREATE INDEX idx_page_views_created ON page_views(created_at DESC);
CREATE INDEX idx_page_views_path ON page_views(page_path);
CREATE INDEX idx_analytics_events_name ON analytics_events(event_name, created_at DESC);

-- Appointments
CREATE INDEX idx_appointments_user ON appointments(user_id);
CREATE INDEX idx_appointments_start ON appointments(start_at);
CREATE INDEX idx_appointments_status ON appointments(status);

-- Inventory
CREATE INDEX idx_inventory_product ON inventory(product_id);
CREATE INDEX idx_inventory_available ON inventory(available) WHERE available <= low_stock_threshold;

-- Projects
CREATE INDEX idx_projects_user ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_assigned ON projects(assigned_to);

-- Search
CREATE INDEX idx_search_queries_query ON search_queries USING GIN(to_tsvector('french', query));
```

---

## 22. Enums

```sql
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended', 'deleted');
CREATE TYPE product_status AS ENUM ('draft', 'pending', 'published', 'archived');
CREATE TYPE order_status AS ENUM (
  'pending', 'confirmed', 'processing', 'shipped', 'delivered',
  'completed', 'cancelled', 'refunded', 'on_hold'
);
CREATE TYPE payment_status AS ENUM (
  'pending', 'authorized', 'captured', 'partially_refunded',
  'refunded', 'failed', 'cancelled'
);
CREATE TYPE discount_type AS ENUM ('percentage', 'fixed_amount');
CREATE TYPE project_status AS ENUM (
  'new', 'contacted', 'quoted', 'accepted', 'in_progress',
  'review', 'completed', 'cancelled'
);
CREATE TYPE project_priority AS ENUM ('low', 'normal', 'high', 'urgent');
CREATE TYPE appointment_status AS ENUM (
  'pending', 'confirmed', 'completed', 'cancelled', 'no_show'
);
CREATE TYPE movement_type AS ENUM ('purchase', 'sale', 'return', 'adjustment', 'transfer');
CREATE TYPE page_status AS ENUM ('draft', 'review', 'published', 'archived');
CREATE TYPE blog_status AS ENUM ('draft', 'review', 'published', 'archived');
CREATE TYPE moderation_status AS ENUM ('pending', 'approved', 'rejected', 'spam');
CREATE TYPE notification_type AS ENUM (
  'order_confirmed', 'order_shipped', 'order_delivered',
  'order_cancelled', 'review_approved', 'review_rejected',
  'project_updated', 'appointment_reminder', 'appointment_confirmed',
  'low_stock', 'new_order', 'new_review', 'new_project',
  'payment_received', 'system', 'marketing'
);
```

---

## 23. Views

### 23.1 Public Product View

```sql
CREATE VIEW public_products AS
SELECT
  p.id, p.name, p.slug, p.short_description, p.description,
  p.price_cents, p.compare_at_cents, p.currency,
  p.materials, p.dimensions, p.is_new, p.is_featured,
  p.rating_avg, p.rating_count,
  c.name AS category_name, c.slug AS category_slug,
  pi.url AS primary_image_url
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
WHERE p.status = 'published' AND p.deleted_at IS NULL;
```

### 23.2 Public Category View

```sql
CREATE VIEW public_categories AS
SELECT
  c.id, c.name, c.slug, c.description, c.image_url,
  c.parent_id, c.sort_order,
  COUNT(p.id) AS product_count
FROM categories c
LEFT JOIN products p ON c.id = p.category_id AND p.status = 'published' AND p.deleted_at IS NULL
WHERE c.is_active = TRUE AND c.deleted_at IS NULL
GROUP BY c.id;
```

### 23.3 Order Summary View

```sql
CREATE VIEW order_summaries AS
SELECT
  o.id, o.order_number, o.status, o.total_cents,
  o.payment_status, o.created_at,
  p.first_name, p.last_name, p.email,
  COUNT(oi.id) AS item_count
FROM orders o
JOIN profiles p ON o.user_id = p.id
LEFT JOIN order_items oi ON o.id = oi.order_id
WHERE o.deleted_at IS NULL
GROUP BY o.id, p.id;
```

### 23.4 Product Stats View

```sql
CREATE VIEW product_stats AS
SELECT
  p.id, p.name, p.slug,
  COALESCE(SUM(oi.quantity), 0) AS total_sold,
  COALESCE(SUM(oi.total_cents), 0) AS total_revenue,
  p.rating_avg, p.rating_count,
  i.quantity AS stock_quantity,
  i.available AS stock_available
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN inventory i ON p.id = i.product_id
WHERE p.deleted_at IS NULL
GROUP BY p.id, i.id;
```

---

## 24. Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         CORE TABLES                                     │
│                                                                         │
│  auth.users ──┬── profiles ──┬── customer_profiles                      │
│               │              │   customer_addresses                     │
│               │              │                                           │
│               │              ├── user_roles ── roles ── role_permissions │
│               │              │                          permissions       │
│               │              │                                           │
│               │              ├── notifications                           │
│               │              │   notification_preferences                │
│               │              │                                           │
│               │              └── analytics_events                        │
│                   page_views                                             │
│                   product_views                                         │
│                   search_queries                                        │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                        PRODUCTS DOMAIN                                  │
│                                                                         │
│  categories ──────────── products ──┬── product_images                   │
│  (self-referencing)                  ├── product_variants                │
│                                      ├── product_attributes              │
│                                      ├── product_collections ── collections│
│                                      ├── product_suppliers ── suppliers   │
│                                      └── inventory ── inventory_movements │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                         ORDERS DOMAIN                                   │
│                                                                         │
│  orders ──┬── order_items ── products                                    │
│           ├── order_status_history                                       │
│           └── order_coupons ── coupons                                   │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                       PROJECTS DOMAIN                                   │
│                                                                         │
│  projects ──┬── project_rooms                                           │
│             ├── project_images                                          │
│             ├── project_files                                           │
│             ├── project_timeline                                        │
│             └── project_messages                                         │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                       SERVICES DOMAIN                                   │
│                                                                         │
│  services ──┬── service_packages                                        │
│             └── service_addons                                           │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                     APPOINTMENTS DOMAIN                                 │
│                                                                         │
│  appointments ── services, projects                                     │
│  availability_rules                                                     │
│  availability_exceptions                                                │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                         CMS DOMAIN                                      │
│                                                                         │
│  pages ── page_sections                                                 │
│  media                                                                  │
│  menus ── menu_items ── pages, products, categories                     │
│  site_settings                                                          │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                         BLOG DOMAIN                                     │
│                                                                         │
│  blog_posts ──┬── blog_categories                                       │
│               ├── blog_post_tags ── blog_tags                           │
│               └── blog_comments                                          │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                        REVIEWS DOMAIN                                   │
│                                                                         │
│  reviews ──┬── review_images                                            │
│            └── review_votes                                             │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                       WISHLIST DOMAIN                                   │
│                                                                         │
│  wishlists ── wishlist_items ── products                                 │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Summary

| Domain | Tables | Key Features |
|--------|--------|-------------|
| **Core** | 5 | profiles, roles, permissions, user_roles, role_permissions |
| **Products** | 7 | products, categories (hierarchical), variants, images, collections, attributes, suppliers |
| **Orders** | 4 | orders, order_items, order_status_history, coupons |
| **Customers** | 2 | customer_profiles, customer_addresses |
| **Projects** | 6 | projects, rooms, images, files, timeline, messages |
| **Services** | 3 | services, packages, add-ons |
| **Appointments** | 3 | appointments, availability_rules, availability_exceptions |
| **Inventory** | 4 | inventory, movements, suppliers, product_suppliers |
| **CMS** | 5 | pages, sections, media, menus, site_settings |
| **Blog** | 5 | posts, categories, tags, post_tags, comments |
| **Reviews** | 3 | reviews, review_images, review_votes |
| **Wishlist** | 2 | wishlists, wishlist_items |
| **Analytics** | 4 | page_views, events, product_views, search_queries |
| **Notifications** | 3 | notifications, preferences, email_templates |
| **TOTAL** | **56** | — |

| Infrastructure | Count |
|----------------|-------|
| Enums | 12 |
| Database functions | 7 |
| Views | 4 |
| Storage buckets | 10 |
| Edge functions | 8 |
| Indexes | 25+ |

---

*Backend architecture for Home Idea.*
*56 tables. 12 enums. 7 functions. 4 views. Ready for migration.*
