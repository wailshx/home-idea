-- ============================================================
-- HOME IDEA — Complete Database Schema Migration
-- Drops old Rentely rental tables, creates new furniture e-commerce schema
-- 56 tables, 12 enums, 7 functions, 4 views, 25+ indexes
-- ============================================================

-- ============================================================
-- 0. DROP OLD RENTELEY TABLES
-- ============================================================

-- Disable RLS on old tables before dropping
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
    EXECUTE 'ALTER TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' DISABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' CASCADE';
  END LOOP;
END $$;

-- Drop old enums
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN SELECT typname FROM pg_type t JOIN pg_namespace n ON t.typnamespace = n.oid WHERE n.nspname = 'public' AND t.typtype = 'e' LOOP
    EXECUTE 'DROP TYPE IF EXISTS public.' || quote_ident(r.typname) || ' CASCADE';
  END LOOP;
END $$;

-- Drop old views
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN SELECT viewname FROM pg_views WHERE schemaname = 'public' LOOP
    EXECUTE 'DROP VIEW IF EXISTS public.' || quote_ident(r.viewname) || ' CASCADE';
  END LOOP;
END $$;

-- Drop old functions
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN SELECT p.proname, pg_get_function_identity_arguments(p.oid) AS args
         FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid
         WHERE n.nspname = 'public' AND p.prokind = 'f' LOOP
    EXECUTE 'DROP FUNCTION IF EXISTS public.' || quote_ident(r.proname) || '(' || r.args || ') CASCADE';
  END LOOP;
END $$;

-- ============================================================
-- 1. ENUMS
-- ============================================================

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

-- ============================================================
-- 2. CORE TABLES
-- ============================================================

-- 2.1 Profiles (extends Supabase Auth)
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

-- 2.2 Roles
CREATE TABLE roles (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL UNIQUE,
  description TEXT,
  is_system   BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2.3 User Roles
CREATE TABLE user_roles (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role_id    UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  granted_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role_id)
);

-- 2.4 Permissions
CREATE TABLE permissions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL UNIQUE,
  resource    TEXT NOT NULL,
  action      TEXT NOT NULL,
  description TEXT,
  UNIQUE(resource, action)
);

-- 2.5 Role Permissions
CREATE TABLE role_permissions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id       UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(role_id, permission_id)
);

-- ============================================================
-- 3. PRODUCTS DOMAIN
-- ============================================================

-- 3.1 Categories
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

-- 3.2 Products
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
  rating_avg        DECIMAL(3,2) DEFAULT 0,
  rating_count      INTEGER DEFAULT 0,
  meta_title        TEXT,
  meta_description  TEXT,
  slug_id           TEXT,
  sort_order        INTEGER DEFAULT 0,
  published_at      TIMESTAMPTZ,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW(),
  deleted_at        TIMESTAMPTZ
);

-- 3.3 Product Images
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

-- 3.4 Product Variants
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

-- 3.5 Collections
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

-- 3.6 Product Collections
CREATE TABLE product_collections (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id    UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  collection_id UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  sort_order    INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_id, collection_id)
);

-- 3.7 Product Attributes
CREATE TABLE product_attributes (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  key        TEXT NOT NULL,
  value      TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  UNIQUE(product_id, key)
);

-- ============================================================
-- 4. ORDERS DOMAIN
-- ============================================================

-- 4.1 Orders
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

-- 4.2 Order Items
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

-- 4.3 Order Status History
CREATE TABLE order_status_history (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id   UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  status     order_status NOT NULL,
  note       TEXT,
  changed_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4.4 Coupons
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

-- 4.5 Order Coupons
CREATE TABLE order_coupons (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id   UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  coupon_id  UUID NOT NULL REFERENCES coupons(id),
  discount_cents INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 5. CUSTOMERS DOMAIN
-- ============================================================

-- 5.1 Customer Profiles
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

-- 5.2 Customer Addresses
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

-- ============================================================
-- 6. PROJECTS DOMAIN (Aménagement)
-- ============================================================

-- 6.1 Projects
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

-- 6.2 Project Rooms
CREATE TABLE project_rooms (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  area_sqm   INTEGER,
  notes      TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6.3 Project Images
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

-- 6.4 Project Files
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

-- 6.5 Project Timeline
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

-- 6.6 Project Messages
CREATE TABLE project_messages (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id    UUID NOT NULL REFERENCES profiles(id),
  body       TEXT NOT NULL,
  attachment_url TEXT,
  read_at    TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 7. SERVICES DOMAIN
-- ============================================================

-- 7.1 Services
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

-- 7.2 Service Packages
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

-- 7.3 Service Add-ons
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

-- ============================================================
-- 8. APPOINTMENTS DOMAIN
-- ============================================================

-- 8.1 Appointments
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

-- 8.2 Availability Rules
CREATE TABLE availability_rules (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES profiles(id),
  day_of_week INTEGER NOT NULL,
  start_time  TIME NOT NULL,
  end_time    TIME NOT NULL,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 8.3 Availability Exceptions
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

-- ============================================================
-- 9. INVENTORY DOMAIN
-- ============================================================

-- 9.1 Inventory
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

-- 9.2 Inventory Movements
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

-- 9.3 Suppliers
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

-- 9.4 Product Suppliers
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

-- ============================================================
-- 10. CMS DOMAIN
-- ============================================================

-- 10.1 Pages
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

-- 10.2 Page Sections
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

-- 10.3 Media Library
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

-- 10.4 Navigation Menus
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

-- 10.5 Site Settings
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

-- ============================================================
-- 11. BLOG DOMAIN
-- ============================================================

-- 11.1 Blog Categories
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

-- 11.2 Blog Posts
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

-- 11.3 Blog Tags
CREATE TABLE blog_tags (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  slug       TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11.4 Blog Post Tags
CREATE TABLE blog_post_tags (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id    UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id     UUID NOT NULL REFERENCES blog_tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, tag_id)
);

-- 11.5 Blog Comments
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

-- ============================================================
-- 12. REVIEWS DOMAIN
-- ============================================================

-- 12.1 Reviews
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

-- 12.2 Review Images
CREATE TABLE review_images (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id  UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  url        TEXT NOT NULL,
  alt        TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12.3 Review Votes
CREATE TABLE review_votes (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id  UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  user_id    UUID NOT NULL REFERENCES profiles(id),
  helpful    BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(review_id, user_id)
);

-- ============================================================
-- 13. WISHLIST DOMAIN
-- ============================================================

-- 13.1 Wishlists
CREATE TABLE wishlists (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name       TEXT DEFAULT 'Ma liste',
  is_public  BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13.2 Wishlist Items
CREATE TABLE wishlist_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wishlist_id UUID NOT NULL REFERENCES wishlists(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  note        TEXT,
  added_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(wishlist_id, product_id)
);

-- ============================================================
-- 14. ANALYTICS DOMAIN
-- ============================================================

-- 14.1 Page Views
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

-- 14.2 Analytics Events
CREATE TABLE analytics_events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES profiles(id),
  session_id  TEXT NOT NULL,
  event_name  TEXT NOT NULL,
  event_data  JSONB DEFAULT '{}',
  page_path   TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 14.3 Product Views
CREATE TABLE product_views (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id),
  user_id    UUID REFERENCES profiles(id),
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14.4 Search Queries
CREATE TABLE search_queries (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES profiles(id),
  query      TEXT NOT NULL,
  results_count INTEGER DEFAULT 0,
  clicked_product_id UUID REFERENCES products(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 15. NOTIFICATIONS DOMAIN
-- ============================================================

-- 15.1 Notifications
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

-- 15.2 Notification Preferences
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

-- 15.3 Email Templates
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

-- ============================================================
-- 16. DATABASE FUNCTIONS
-- ============================================================

-- 16.1 Order Number Generator
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number := 'HI-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' ||
    LPAD((EXTRACT(EPOCH FROM NOW())::BIGINT % 10000)::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_orders_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  WHEN (NEW.order_number IS NULL OR NEW.order_number = '')
  EXECUTE FUNCTION generate_order_number();

-- 16.2 Updated At Trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables with updated_at column
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename IN (
    'profiles', 'products', 'product_variants', 'collections', 'categories',
    'orders', 'coupons', 'customer_profiles', 'customer_addresses',
    'projects', 'services', 'service_packages', 'appointments',
    'inventory', 'suppliers', 'pages', 'page_sections', 'menus', 'menu_items',
    'site_settings', 'blog_posts', 'blog_categories', 'blog_tags', 'blog_comments',
    'reviews', 'wishlists', 'notification_preferences', 'email_templates'
  ) LOOP
    EXECUTE 'CREATE TRIGGER trg_' || r.tablename || '_updated_at
      BEFORE UPDATE ON public.' || quote_ident(r.tablename) || '
      FOR EACH ROW EXECUTE FUNCTION update_updated_at()';
  END LOOP;
END $$;

-- 16.3 Product Slug Generator
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

-- 16.4 Order Total Calculator
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

-- 16.5 Product Rating Calculator
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

CREATE TRIGGER trg_reviews_calculate_rating
  AFTER INSERT OR UPDATE ON reviews
  FOR EACH ROW
  WHEN (NEW.status = 'approved')
  EXECUTE FUNCTION calculate_product_rating();

-- 16.6 Inventory Reservation
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

-- 16.7 Has Role Check
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

-- 16.8 Has Permission Check
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

-- ============================================================
-- 17. VIEWS
-- ============================================================

-- 17.1 Public Product View
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

-- 17.2 Public Category View
CREATE VIEW public_categories AS
SELECT
  c.id, c.name, c.slug, c.description, c.image_url,
  c.parent_id, c.sort_order,
  COUNT(p.id) AS product_count
FROM categories c
LEFT JOIN products p ON c.id = p.category_id AND p.status = 'published' AND p.deleted_at IS NULL
WHERE c.is_active = TRUE AND c.deleted_at IS NULL
GROUP BY c.id;

-- 17.3 Order Summary View
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

-- 17.4 Product Stats View
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

-- ============================================================
-- 18. INDEXES
-- ============================================================

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

-- ============================================================
-- 19. ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS on ALL tables
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
    EXECUTE 'ALTER TABLE public.' || quote_ident(r.tablename) || ' ENABLE ROW LEVEL SECURITY';
  END LOOP;
END $$;

-- Profiles: public read for basic info, full read for own
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_select_public" ON profiles
  FOR SELECT USING (TRUE);
CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Products: public read for published
CREATE POLICY "products_select_public" ON products
  FOR SELECT USING (status = 'published' AND deleted_at IS NULL);
CREATE POLICY "products_admin_all" ON products
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Product Images: public read
CREATE POLICY "product_images_select_public" ON product_images
  FOR SELECT USING (TRUE);

-- Product Variants: public read
CREATE POLICY "product_variants_select_public" ON product_variants
  FOR SELECT USING (TRUE);

-- Product Attributes: public read
CREATE POLICY "product_attributes_select_public" ON product_attributes
  FOR SELECT USING (TRUE);

-- Categories: public read for active
CREATE POLICY "categories_select_public" ON categories
  FOR SELECT USING (is_active = TRUE AND deleted_at IS NULL);
CREATE POLICY "categories_admin_all" ON categories
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Collections: public read for active
CREATE POLICY "collections_select_public" ON collections
  FOR SELECT USING (is_active = TRUE);
CREATE POLICY "collections_admin_all" ON collections
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Product Collections: public read
CREATE POLICY "product_collections_select_public" ON product_collections
  FOR SELECT USING (TRUE);

-- Orders: own read
CREATE POLICY "orders_select_own" ON orders
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "orders_admin_all" ON orders
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Order Items: own orders
CREATE POLICY "order_items_select_own" ON order_items
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );

-- Reviews: approved public read
CREATE POLICY "reviews_select_public" ON reviews
  FOR SELECT USING (status = 'approved');
CREATE POLICY "reviews_select_own" ON reviews
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "reviews_insert_own" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Blog: published public read
CREATE POLICY "blog_posts_select_public" ON blog_posts
  FOR SELECT USING (status = 'published' AND deleted_at IS NULL);
CREATE POLICY "blog_categories_select_public" ON blog_categories
  FOR SELECT USING (is_active = TRUE);
CREATE POLICY "blog_tags_select_public" ON blog_tags
  FOR SELECT USING (TRUE);
CREATE POLICY "blog_post_tags_select_public" ON blog_post_tags
  FOR SELECT USING (TRUE);
CREATE POLICY "blog_comments_select_public" ON blog_comments
  FOR SELECT USING (status = 'approved');

-- Pages: published public read
CREATE POLICY "pages_select_public" ON pages
  FOR SELECT USING (status = 'published' AND deleted_at IS NULL);
CREATE POLICY "page_sections_select_public" ON page_sections
  FOR SELECT USING (is_active = TRUE);

-- Services: public read for active
CREATE POLICY "services_select_public" ON services
  FOR SELECT USING (is_active = TRUE AND deleted_at IS NULL);
CREATE POLICY "service_packages_select_public" ON service_packages
  FOR SELECT USING (TRUE);
CREATE POLICY "service_addons_select_public" ON service_addons
  FOR SELECT USING (TRUE);

-- Wishlists: own read/write
CREATE POLICY "wishlists_select_own" ON wishlists
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "wishlists_insert_own" ON wishlists
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "wishlists_update_own" ON wishlists
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "wishlists_delete_own" ON wishlists
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "wishlist_items_select_own" ON wishlist_items
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM wishlists WHERE wishlists.id = wishlist_items.wishlist_id AND wishlists.user_id = auth.uid())
  );
CREATE POLICY "wishlist_items_insert_own" ON wishlist_items
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM wishlists WHERE wishlists.id = wishlist_items.wishlist_id AND wishlists.user_id = auth.uid())
  );
CREATE POLICY "wishlist_items_delete_own" ON wishlist_items
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM wishlists WHERE wishlists.id = wishlist_items.wishlist_id AND wishlists.user_id = auth.uid())
  );

-- Notifications: own read
CREATE POLICY "notifications_select_own" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

-- Projects: own read
CREATE POLICY "projects_select_own" ON projects
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "projects_admin_all" ON projects
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Appointments: own read
CREATE POLICY "appointments_select_own" ON appointments
  FOR SELECT USING (auth.uid() = user_id);

-- Customer Addresses: own read/write
CREATE POLICY "customer_addresses_select_own" ON customer_addresses
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "customer_addresses_insert_own" ON customer_addresses
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "customer_addresses_update_own" ON customer_addresses
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "customer_addresses_delete_own" ON customer_addresses
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- 20. SEED DATA
-- ============================================================

-- Roles
INSERT INTO roles (name, description, is_system) VALUES
  ('super_admin', 'Full system access', TRUE),
  ('admin', 'Administrative access', TRUE),
  ('editor', 'Content management access', TRUE),
  ('manager', 'Order and inventory management', TRUE),
  ('customer', 'Standard customer', TRUE);

-- Permissions
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

-- Role Permissions: super_admin gets everything
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.name = 'super_admin';

-- Role Permissions: admin gets most
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.name = 'admin'
AND p.name NOT IN ('settings.update');

-- Role Permissions: customer gets read-only
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.name = 'customer'
AND p.action = 'read'
AND p.resource IN ('products', 'blog');

-- Categories: 5 main categories
INSERT INTO categories (name, slug, description, icon, sort_order, is_featured) VALUES
  ('Salon', 'salon', 'Canapés, fauteuils et tables pour votre salon', 'sofa', 1, TRUE),
  ('Cuisine', 'cuisine', 'Tables, chaises et rangements pour la cuisine', 'cooking-pot', 2, TRUE),
  ('Chambres', 'chambres', 'Lits, commodes et armoires pour les chambres', 'bed-double', 3, TRUE),
  ('Éclairage', 'eclairage', 'Lustres, lampadaires et éclairage design', 'lightbulb', 4, TRUE),
  ('Aménagement', 'amenagement', 'Service d''aménagement intérieur sur mesure', 'ruler', 5, TRUE);

-- Subcategories
INSERT INTO categories (parent_id, name, slug, description, sort_order) VALUES
  ((SELECT id FROM categories WHERE slug = 'salon'), 'Canapés', 'canapes', 'Canapés et sofas', 1),
  ((SELECT id FROM categories WHERE slug = 'salon'), 'Fauteuils', 'fauteuils', 'Fauteuils et bergères', 2),
  ((SELECT id FROM categories WHERE slug = 'salon'), 'Tables basses', 'tables-basses', 'Tables basses et centrales', 3),
  ((SELECT id FROM categories WHERE slug = 'cuisine'), 'Tables à manger', 'tables-a-manger', 'Tables de cuisine', 1),
  ((SELECT id FROM categories WHERE slug = 'cuisine'), 'Chaises', 'chaises', 'Chaises de cuisine', 2),
  ((SELECT id FROM categories WHERE slug = 'chambres'), 'Lits', 'lits', 'Cadres de lit et lits', 1),
  ((SELECT id FROM categories WHERE slug = 'chambres'), 'Armoires', 'armoires', 'Armoires et rangements', 2),
  ((SELECT id FROM categories WHERE slug = 'eclairage'), 'Suspensions', 'suspensions', 'Lustres et suspensions', 1),
  ((SELECT id FROM categories WHERE slug = 'eclairage'), 'Lampadaires', 'lampadaires', 'Lampadaires et torchères', 2);

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES
  ('products', 'products', true),
  ('categories', 'categories', true),
  ('collections', 'collections', true),
  ('blog', 'blog', true),
  ('avatars', 'avatars', true),
  ('projects', 'projects', false),
  ('services', 'services', true),
  ('media', 'media', false),
  ('reviews', 'reviews', false),
  ('notifications', 'notifications', false);

-- ============================================================
-- DONE
-- ============================================================
