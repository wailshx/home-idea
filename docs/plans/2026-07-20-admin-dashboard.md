# Phase 11 — Home Idea Admin Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full admin dashboard for the Home Idea furniture e-commerce store — Products, Orders, Customers, Projects, Appointments, Inventory, Analytics, CMS, Roles, and Permissions — with a Noir & Gold themed admin UI, Supabase data layer, and responsive layout.

**Architecture:** A dedicated `/admin` route tree with a sidebar layout. Each module is a self-contained page with its own data table, filters, and CRUD operations. Supabase RPC functions handle data fetching. Recharts for analytics charts. React Context for admin auth state. All admin components live under `src/components/admin/` and pages under `src/pages/admin/`.

**Tech Stack:** React 18 + TypeScript + Tailwind CSS + React Router v6 + Supabase + Recharts + Radix UI (shadcn) + Lucide icons + TanStack React Query

---

## Global Constraints

- French-only UI, luxury brand tone, no emojis as icons
- Noir & Gold design system (`#0D0D0D` bg, `#C9A84C` gold, DM Serif Display headings, Fira Sans body)
- All colors via HSL CSS variables from `index.css`
- React 18.3, Vite 5, React Router v6
- Follow existing patterns: default exports, `@/` path aliases
- Existing `src/components/admin/` directory has Rentely components — we create `src/components/admin-hi/` for Home Idea admin
- Responsive: mobile-first, breakpoints at `sm`, `md`, `lg`, `xl`
- Supabase URL: `https://epjumjpgazffryskufjs.supabase.co`
- 58 tables already exist in the schema (see `src/integrations/supabase/types.ts`)

---

## File Structure

### New Files

| File | Responsibility |
|------|---------------|
| `src/components/admin-hi/AdminLayout.tsx` | Sidebar layout wrapper with nav, header, outlet |
| `src/components/admin-hi/AdminSidebar.tsx` | Sidebar navigation with icons and active state |
| `src/components/admin-hi/AdminHeader.tsx` | Top header with search, notifications, user |
| `src/components/admin-hi/DataTable.tsx` | Reusable data table with sorting, search, pagination |
| `src/components/admin-hi/StatCard.tsx` | KPI stat card with icon, value, change |
| `src/components/admin-hi/StatusBadge.tsx` | Status badge component for various states |
| `src/components/admin-hi/Charts.tsx` | Shared Recharts wrapper components |
| `src/components/admin-hi/EmptyState.tsx` | Empty state placeholder |
| `src/components/admin-hi/ConfirmDialog.tsx` | Confirmation dialog |
| `src/components/admin-hi/ProductForm.tsx` | Product create/edit form |
| `src/components/admin-hi/OrderDetail.tsx` | Order detail modal/panel |
| `src/components/admin-hi/CustomerDetail.tsx` | Customer detail modal/panel |
| `src/pages/admin-hi/Dashboard.tsx` | Overview with KPIs, charts, recent activity |
| `src/pages/admin-hi/Products.tsx` | Products management (list, create, edit, delete) |
| `src/pages/admin-hi/Orders.tsx` | Orders management (list, status updates) |
| `src/pages/admin-hi/Customers.tsx` | Customer management (list, view, segment) |
| `src/pages/admin-hi/Projects.tsx` | Aménagement projects (list, status, assign) |
| `src/pages/admin-hi/Appointments.tsx` | Appointments calendar and list |
| `src/pages/admin-hi/Inventory.tsx` | Stock levels, alerts, adjustments |
| `src/pages/admin-hi/Analytics.tsx` | Charts, reports, export |
| `src/pages/admin-hi/CMS.tsx` | Content management (blog, pages, FAQ) |
| `src/pages/admin-hi/Roles.tsx` | Role management |
| `src/pages/admin-hi/Permissions.tsx` | Permission matrix |

### Modified Files

| File | Change |
|------|--------|
| `src/App.tsx` | Add `/admin/*` route tree with AdminLayout |
| `src/components/hi/Navbar.tsx` | Add admin link (visible when logged in as admin) |

---

## Tasks

### Task 1: Admin Layout — Sidebar + Header

**Files:**
- Create: `src/components/admin-hi/AdminLayout.tsx`
- Create: `src/components/admin-hi/AdminSidebar.tsx`
- Create: `src/components/admin-hi/AdminHeader.tsx`

**Interfaces:**
- Consumes: React Router `<Outlet>`, existing CSS variables
- Produces: `<AdminLayout>` component with sidebar nav and header

- [ ] **Step 1: Create `src/components/admin-hi/AdminSidebar.tsx`**

```typescript
import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FolderKanban,
  Calendar,
  Warehouse,
  BarChart3,
  FileText,
  Shield,
  Key,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/produits", icon: Package, label: "Produits" },
  { to: "/admin/commandes", icon: ShoppingCart, label: "Commandes" },
  { to: "/admin/clients", icon: Users, label: "Clients" },
  { to: "/admin/projets", icon: FolderKanban, label: "Projets" },
  { to: "/admin/rendez-vous", icon: Calendar, label: "Rendez-vous" },
  { to: "/admin/inventaire", icon: Warehouse, label: "Inventaire" },
  { to: "/admin/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/admin/cms", icon: FileText, label: "CMS" },
  { to: "/admin/roles", icon: Shield, label: "Rôles" },
  { to: "/admin/permissions", icon: Key, label: "Permissions" },
];

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`hidden lg:flex flex-col h-screen sticky top-0 border-r border-gold/15 bg-card transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-64"
      }`}
    >
      {/* Logo */}
      <Link to="/admin" className="flex items-center gap-3 px-5 h-20 border-b border-gold/15">
        <div className="relative w-9 h-9 grid place-items-center shrink-0">
          <div className="absolute inset-0 rotate-45 bg-gradient-gold opacity-90" />
          <span className="relative font-display text-ink text-lg leading-none">H</span>
        </div>
        {!collapsed && (
          <div className="leading-tight">
            <div className="font-display text-lg tracking-wide">Home Idea</div>
            <div className="text-[10px] tracking-[0.2em] text-gold/60 uppercase">Admin</div>
          </div>
        )}
      </Link>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-3 text-sm transition-all ${
                isActive
                  ? "bg-gold/10 text-gold border-r-2 border-gold"
                  : "text-muted-foreground hover:text-foreground hover:bg-gold/5"
              }`
            }
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-12 border-t border-gold/15 text-gold/40 hover:text-gold transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
};

export default AdminSidebar;
```

- [ ] **Step 2: Create `src/components/admin-hi/AdminHeader.tsx`**

```typescript
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, Menu, X, Home, LogOut } from "lucide-react";

const AdminHeader = ({ onToggleMobile }: { onToggleMobile: () => void }) => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="h-20 border-b border-gold/15 bg-card/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Mobile menu */}
      <button onClick={onToggleMobile} className="lg:hidden p-2 hover:bg-gold/10 transition-colors">
        <Menu className="w-5 h-5 text-gold" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md mx-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-gold/15 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/40 transition-colors"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 text-xs tracking-[0.15em] uppercase text-gold/60 hover:text-gold border border-gold/20 hover:border-gold/40 transition-colors"
        >
          <Home className="w-3.5 h-3.5" /> Site
        </Link>
        <button className="relative p-2 hover:bg-gold/10 transition-colors">
          <Bell className="w-5 h-5 text-gold/60" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full" />
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-gold grid place-items-center text-ink font-display text-sm">
          A
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
```

- [ ] **Step 3: Create `src/components/admin-hi/AdminLayout.tsx`**

```typescript
import { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FolderKanban,
  Calendar,
  Warehouse,
  BarChart3,
  FileText,
  Shield,
  Key,
  X,
} from "lucide-react";

const MOBILE_NAV = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/produits", icon: Package, label: "Produits" },
  { to: "/admin/commandes", icon: ShoppingCart, label: "Commandes" },
  { to: "/admin/clients", icon: Users, label: "Clients" },
  { to: "/admin/projets", icon: FolderKanban, label: "Projets" },
  { to: "/admin/rendez-vous", icon: Calendar, label: "Rendez-vous" },
  { to: "/admin/inventaire", icon: Warehouse, label: "Inventaire" },
  { to: "/admin/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/admin/cms", icon: FileText, label: "CMS" },
  { to: "/admin/roles", icon: Shield, label: "Rôles" },
  { to: "/admin/permissions", icon: Key, label: "Permissions" },
];

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <AdminSidebar />

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-card border-r border-gold/20 overflow-y-auto">
            <div className="flex items-center justify-between px-5 h-20 border-b border-gold/15">
              <div className="font-display text-lg">Home Idea Admin</div>
              <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-gold/10">
                <X className="w-5 h-5 text-gold" />
              </button>
            </div>
            <nav className="py-4">
              {MOBILE_NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-5 py-3 text-sm transition-colors ${
                      isActive
                        ? "bg-gold/10 text-gold border-r-2 border-gold"
                        : "text-muted-foreground hover:text-foreground"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onToggleMobile={() => setMobileOpen(!mobileOpen)} />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
```

- [ ] **Step 4: Verify it compiles**

Run: `cd /home/shx/Documents/home-idea && npx tsc --noEmit`
Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add src/components/admin-hi/
git commit -m "feat(admin): add AdminLayout with sidebar, header, and mobile nav"
```

---

### Task 2: Shared UI Components

**Files:**
- Create: `src/components/admin-hi/StatCard.tsx`
- Create: `src/components/admin-hi/StatusBadge.tsx`
- Create: `src/components/admin-hi/DataTable.tsx`
- Create: `src/components/admin-hi/EmptyState.tsx`
- Create: `src/components/admin-hi/ConfirmDialog.tsx`

**Interfaces:**
- Consumes: existing CSS variables, Lucide icons
- Produces: Reusable admin UI primitives

- [ ] **Step 1: Create all shared components**

```typescript
// src/components/admin-hi/StatCard.tsx
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

type StatCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: { value: number; positive: boolean };
};

const StatCard = ({ icon: Icon, label, value, change }: StatCardProps) => (
  <div className="p-6 border border-gold/15 bg-card hover:border-gold/30 transition-colors">
    <div className="flex items-start justify-between mb-4">
      <div className="w-10 h-10 grid place-items-center border border-gold/25">
        <Icon className="w-5 h-5 text-gold" />
      </div>
      {change && (
        <div
          className={`flex items-center gap-1 text-xs ${
            change.positive ? "text-green-400" : "text-red-400"
          }`}
        >
          {change.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(change.value)}%
        </div>
      )}
    </div>
    <div className="font-display text-2xl mb-1">{value}</div>
    <div className="text-[10px] tracking-[0.2em] uppercase text-gold/60">{label}</div>
  </div>
);

export default StatCard;
```

```typescript
// src/components/admin-hi/StatusBadge.tsx
const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  confirmed: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  processing: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  shipped: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  delivered: "bg-green-500/15 text-green-400 border-green-500/30",
  completed: "bg-green-500/15 text-green-400 border-green-500/30",
  active: "bg-green-500/15 text-green-400 border-green-500/30",
  cancelled: "bg-red-500/15 text-red-400 border-red-500/30",
  failed: "bg-red-500/15 text-red-400 border-red-500/30",
  draft: "bg-gray-500/15 text-gray-400 border-gray-500/30",
  published: "bg-green-500/15 text-green-400 border-green-500/30",
  "in-stock": "bg-green-500/15 text-green-400 border-green-500/30",
  "low-stock": "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  "out-of-stock": "bg-red-500/15 text-red-400 border-red-500/30",
};

const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={`inline-flex px-2.5 py-1 text-[10px] tracking-[0.15em] uppercase border ${
      STATUS_STYLES[status] || STATUS_STYLES.draft
    }`}
  >
    {status}
  </span>
);

export default StatusBadge;
```

```typescript
// src/components/admin-hi/DataTable.tsx
import { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, Search, ChevronLeft, ChevronRight } from "lucide-react";

export type Column<T> = {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  className?: string;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  searchPlaceholder?: string;
  searchKey?: string;
  pageSize?: number;
  onRowClick?: (row: T) => void;
  actions?: React.ReactNode;
};

function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  searchPlaceholder = "Rechercher...",
  searchKey,
  pageSize = 10,
  onRowClick,
  actions,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    let result = data;
    if (search && searchKey) {
      const q = search.toLowerCase();
      result = result.filter((row) =>
        String(row[searchKey] || "").toLowerCase().includes(q)
      );
    }
    if (sortKey) {
      result = [...result].sort((a, b) => {
        const av = a[sortKey] ?? "";
        const bv = b[sortKey] ?? "";
        const cmp = String(av).localeCompare(String(bv), "fr", { numeric: true });
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return result;
  }, [data, search, searchKey, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice(page * pageSize, (page + 1) * pageSize);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            placeholder={searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-gold/15 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/40 transition-colors"
          />
        </div>
        {actions}
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gold/15">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gold/15">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left text-[10px] tracking-[0.2em] uppercase text-gold/70 font-normal ${
                    col.sortable ? "cursor-pointer hover:text-gold select-none" : ""
                  } ${col.className || ""}`}
                  onClick={() => col.sortable && toggleSort(col.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((row, i) => (
              <tr
                key={i}
                onClick={() => onRowClick?.(row)}
                className={`border-b border-gold/10 hover:bg-gold/5 transition-colors ${
                  onRowClick ? "cursor-pointer" : ""
                }`}
              >
                {columns.map((col) => (
                  <td key={col.key} className={`px-4 py-3 ${col.className || ""}`}>
                    {col.render ? col.render(row) : String(row[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-muted-foreground">
            {filtered.length} résultat{filtered.length !== 1 ? "s" : ""}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="w-8 h-8 grid place-items-center border border-gold/20 text-gold/60 hover:border-gold/50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-muted-foreground px-3">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              className="w-8 h-8 grid place-items-center border border-gold/20 text-gold/60 hover:border-gold/50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
```

```typescript
// src/components/admin-hi/EmptyState.tsx
import { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
};

const EmptyState = ({ icon: Icon, title, description, action }: EmptyStateProps) => (
  <div className="py-20 text-center">
    <Icon className="w-12 h-12 text-gold/30 mx-auto mb-4" />
    <h3 className="font-display text-xl mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">{description}</p>
    {action}
  </div>
);

export default EmptyState;
```

```typescript
// src/components/admin-hi/ConfirmDialog.tsx
import { X } from "lucide-react";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
};

const ConfirmDialog = ({
  open,
  title,
  description,
  confirmLabel = "Confirmer",
  onConfirm,
  onCancel,
  danger,
}: ConfirmDialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onCancel} />
      <div className="relative bg-card border border-gold/20 p-8 max-w-md w-full mx-4 anim-tilt-in">
        <button onClick={onCancel} className="absolute top-4 right-4 p-1 hover:bg-gold/10">
          <X className="w-4 h-4 text-gold/60" />
        </button>
        <h3 className="font-display text-xl mb-3">{title}</h3>
        <p className="text-sm text-muted-foreground mb-8">{description}</p>
        <div className="flex items-center gap-4 justify-end">
          <button
            onClick={onCancel}
            className="px-6 py-2.5 border border-gold/20 text-sm text-muted-foreground hover:text-foreground hover:border-gold/40 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className={`px-6 py-2.5 text-sm font-medium tracking-wide ${
              danger
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-gradient-gold text-ink hover:opacity-90"
            } transition-opacity`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /home/shx/Documents/home-idea && npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/admin-hi/StatCard.tsx src/components/admin-hi/StatusBadge.tsx src/components/admin-hi/DataTable.tsx src/components/admin-hi/EmptyState.tsx src/components/admin-hi/ConfirmDialog.tsx
git commit -m "feat(admin): add shared UI primitives (StatCard, StatusBadge, DataTable, EmptyState, ConfirmDialog)"
```

---

### Task 3: Dashboard Overview

**Files:**
- Create: `src/pages/admin-hi/Dashboard.tsx`

**Interfaces:**
- Consumes: `StatCard`, `StatusBadge` from Task 2
- Produces: Dashboard page with KPIs, charts, recent activity

- [ ] **Step 1: Create `src/pages/admin-hi/Dashboard.tsx`**

```typescript
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  Euro,
  AlertTriangle,
} from "lucide-react";
import StatCard from "@/components/admin-hi/StatCard";
import StatusBadge from "@/components/admin-hi/StatusBadge";
import { products } from "@/lib/products";

const MOCK_STATS = {
  revenue: { value: "127 450 €", change: { value: 12, positive: true } },
  orders: { value: "89", change: { value: 8, positive: true } },
  customers: { value: "234", change: { value: 15, positive: true } },
  avgOrder: { value: "1 432 €", change: { value: 3, positive: false } },
};

const MOCK_ORDERS = [
  { id: "CMD-001", customer: "Marie-Claire D.", total: 3890, status: "delivered", date: "2026-07-18" },
  { id: "CMD-002", customer: "Jean-Pierre L.", total: 1290, status: "shipped", date: "2026-07-17" },
  { id: "CMD-003", customer: "Sophie M.", total: 2450, status: "processing", date: "2026-07-17" },
  { id: "CMD-004", customer: "Philippe R.", total: 5890, status: "pending", date: "2026-07-16" },
  { id: "CMD-005", customer: "Isabelle V.", total: 1490, status: "delivered", date: "2026-07-15" },
];

const Dashboard = () => {
  return (
    <div>
      <div className="mb-10">
        <h1 className="font-display text-3xl lg:text-4xl mb-2">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Vue d'ensemble de votre boutique</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard icon={Euro} label="Chiffre d'affaires" value={MOCK_STATS.revenue.value} change={MOCK_STATS.revenue.change} />
        <StatCard icon={ShoppingCart} label="Commandes" value={MOCK_STATS.orders.value} change={MOCK_STATS.orders.change} />
        <StatCard icon={Users} label="Clients" value={MOCK_STATS.customers.value} change={MOCK_STATS.customers.change} />
        <StatCard icon={TrendingUp} label="Panier moyen" value={MOCK_STATS.avgOrder.value} change={MOCK_STATS.avgOrder.change} />
      </div>

      {/* Charts placeholder */}
      <div className="grid lg:grid-cols-2 gap-6 mb-10">
        <div className="border border-gold/15 p-6 bg-card">
          <h3 className="font-display text-lg mb-4">Ventes mensuelles</h3>
          <div className="h-64 flex items-center justify-center border border-gold/10">
            <p className="text-xs text-muted-foreground">Graphique Recharts — à connecter</p>
          </div>
        </div>
        <div className="border border-gold/15 p-6 bg-card">
          <h3 className="font-display text-lg mb-4">Commandes par catégorie</h3>
          <div className="h-64 flex items-center justify-center border border-gold/10">
            <p className="text-xs text-muted-foreground">Graphique Recharts — à connecter</p>
          </div>
        </div>
      </div>

      {/* Recent Orders + Low Stock */}
      <div className="grid lg:grid-cols-[1fr_350px] gap-6">
        {/* Recent Orders */}
        <div className="border border-gold/15 bg-card">
          <div className="px-6 py-4 border-b border-gold/15">
            <h3 className="font-display text-lg">Commandes récentes</h3>
          </div>
          <div className="divide-y divide-gold/10">
            {MOCK_ORDERS.map((order) => (
              <div key={order.id} className="flex items-center justify-between px-6 py-4 hover:bg-gold/5 transition-colors">
                <div>
                  <div className="text-sm font-medium">{order.id}</div>
                  <div className="text-xs text-muted-foreground">{order.customer}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gold">{order.total.toLocaleString("fr-FR")} €</div>
                  <StatusBadge status={order.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="border border-gold/15 bg-card">
          <div className="px-6 py-4 border-b border-gold/15 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <h3 className="font-display text-lg">Alertes stock</h3>
          </div>
          <div className="divide-y divide-gold/10">
            {products.slice(0, 5).map((p) => (
              <div key={p.id} className="px-6 py-4">
                <div className="text-sm">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.subcategory}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /home/shx/Documents/home-idea && npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/pages/admin-hi/Dashboard.tsx
git commit -m "feat(admin): add Dashboard overview with KPI cards, charts, recent orders, alerts"
```

---

### Task 4: Products Management

**Files:**
- Create: `src/pages/admin-hi/Products.tsx`
- Create: `src/components/admin-hi/ProductForm.tsx`

**Interfaces:**
- Consumes: `DataTable`, `StatusBadge`, `EmptyState`, `ConfirmDialog` from Task 2, `products` data from `src/lib/products.ts`
- Produces: Full CRUD products page

- [ ] **Step 1: Create `src/pages/admin-hi/Products.tsx`**

```typescript
import { useState } from "react";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { products, Product } from "@/lib/products";
import DataTable, { Column } from "@/components/admin-hi/DataTable";
import StatusBadge from "@/components/admin-hi/StatusBadge";
import ConfirmDialog from "@/components/admin-hi/ConfirmDialog";
import ProductForm from "@/components/admin-hi/ProductForm";
import { toast } from "sonner";

const Products = () => {
  const [data, setData] = useState<Product[]>(products);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleting, setDeleting] = useState<Product | null>(null);

  const columns: Column<Product>[] = [
    {
      key: "image",
      label: "",
      className: "w-16",
      render: (row) => (
        <img src={row.image} alt={row.name} className="w-12 h-12 object-cover border border-gold/20" />
      ),
    },
    { key: "name", label: "Nom", sortable: true },
    { key: "category", label: "Catégorie", sortable: true },
    { key: "subcategory", label: "Sous-catégorie", sortable: true },
    {
      key: "price",
      label: "Prix",
      sortable: true,
      render: (row) => (
        <span className="text-gold">
          {row.price > 0 ? `${row.price.toLocaleString("fr-FR")} €` : "Sur devis"}
        </span>
      ),
    },
    {
      key: "isNew",
      label: "Statut",
      render: (row) => <StatusBadge status={row.isNew ? "active" : "draft"} />,
    },
    {
      key: "actions",
      label: "",
      className: "w-24",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEditing(row);
              setShowForm(true);
            }}
            className="p-1.5 hover:bg-gold/10 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5 text-gold/60" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDeleting(row);
            }}
            className="p-1.5 hover:bg-red-500/10 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-400/60" />
          </button>
        </div>
      ),
    },
  ];

  const handleSave = (product: Partial<Product>) => {
    if (editing) {
      setData((prev) =>
        prev.map((p) => (p.id === editing.id ? { ...p, ...product } : p))
      );
      toast.success("Produit modifié");
    } else {
      const newProduct: Product = {
        ...product,
        id: `p${Date.now()}`,
        slug: product.name?.toLowerCase().replace(/\s+/g, "-") || "new",
        gallery: [product.image || ""],
      } as Product;
      setData((prev) => [newProduct, ...prev]);
      toast.success("Produit créé");
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = () => {
    if (deleting) {
      setData((prev) => prev.filter((p) => p.id !== deleting.id));
      toast.success("Produit supprimé");
      setDeleting(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display text-3xl lg:text-4xl mb-2">Produits</h1>
          <p className="text-sm text-muted-foreground">{data.length} produits au catalogue</p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-gold text-ink text-sm font-medium tracking-wide"
        >
          <Plus className="w-4 h-4" /> Ajouter
        </button>
      </div>

      <DataTable
        columns={columns}
        data={data as unknown as Record<string, unknown>[]}
        searchPlaceholder="Rechercher un produit..."
        searchKey="name"
      />

      {/* Form dialog */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={() => { setShowForm(false); setEditing(null); }} />
          <div className="relative bg-card border border-gold/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4 anim-tilt-in">
            <ProductForm
              product={editing}
              onSave={handleSave}
              onCancel={() => { setShowForm(false); setEditing(null); }}
            />
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleting}
        title="Supprimer ce produit ?"
        description={`"${deleting?.name}" sera définitivement supprimé du catalogue.`}
        confirmLabel="Supprimer"
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
        danger
      />
    </div>
  );
};

export default Products;
```

- [ ] **Step 2: Create `src/components/admin-hi/ProductForm.tsx`**

```typescript
import { useState } from "react";
import { Product } from "@/lib/products";
import { X } from "lucide-react";

type ProductFormProps = {
  product: Product | null;
  onSave: (data: Partial<Product>) => void;
  onCancel: () => void;
};

const ProductForm = ({ product, onSave, onCancel }: ProductFormProps) => {
  const [form, setForm] = useState({
    name: product?.name || "",
    category: product?.category || "salon",
    subcategory: product?.subcategory || "",
    price: product?.price || 0,
    short: product?.short || "",
    description: product?.description || "",
    materials: product?.materials.join(", ") || "",
    dimensions: product?.dimensions || "",
    isNew: product?.isNew || false,
    image: product?.image || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      materials: form.materials.split(",").map((m) => m.trim()).filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gold/15">
        <h2 className="font-display text-xl">{product ? "Modifier" : "Créer"} un produit</h2>
        <button type="button" onClick={onCancel} className="p-2 hover:bg-gold/10">
          <X className="w-4 h-4 text-gold/60" />
        </button>
      </div>

      <div className="p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-2">Nom *</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-gold/20 text-sm focus:outline-none focus:border-gold/50"
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-2">Prix (€)</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              className="w-full px-4 py-2.5 bg-background border border-gold/20 text-sm focus:outline-none focus:border-gold/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-2">Catégorie</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-gold/20 text-sm focus:outline-none focus:border-gold/50"
            >
              <option value="salon">Salon</option>
              <option value="cuisine">Cuisine</option>
              <option value="chambres">Chambres</option>
              <option value="eclairage">Éclairage</option>
              <option value="amenagement">Aménagement</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-2">Sous-catégorie</label>
            <input
              value={form.subcategory}
              onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-gold/20 text-sm focus:outline-none focus:border-gold/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-2">Description courte</label>
          <input
            value={form.short}
            onChange={(e) => setForm({ ...form, short: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-gold/20 text-sm focus:outline-none focus:border-gold/50"
          />
        </div>

        <div>
          <label className="block text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-2">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 bg-background border border-gold/20 text-sm focus:outline-none focus:border-gold/50 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-2">Matériaux (séparés par virgule)</label>
            <input
              value={form.materials}
              onChange={(e) => setForm({ ...form, materials: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-gold/20 text-sm focus:outline-none focus:border-gold/50"
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-2">Dimensions</label>
            <input
              value={form.dimensions}
              onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
              className="w-full px-4 py-2.5 bg-background border border-gold/20 text-sm focus:outline-none focus:border-gold/50"
            />
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isNew}
            onChange={(e) => setForm({ ...form, isNew: e.target.checked })}
            className="w-4 h-4 accent-gold"
          />
          <span className="text-sm">Marquer comme nouveauté</span>
        </label>
      </div>

      <div className="flex items-center justify-end gap-4 px-6 py-4 border-t border-gold/15">
        <button type="button" onClick={onCancel} className="px-6 py-2.5 border border-gold/20 text-sm text-muted-foreground hover:text-foreground transition-colors">
          Annuler
        </button>
        <button type="submit" className="px-6 py-2.5 bg-gradient-gold text-ink text-sm font-medium tracking-wide">
          {product ? "Enregistrer" : "Créer"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
```

- [ ] **Step 3: Verify it compiles**

Run: `cd /home/shx/Documents/home-idea && npx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/pages/admin-hi/Products.tsx src/components/admin-hi/ProductForm.tsx
git commit -m "feat(admin): add Products management page with CRUD and form dialog"
```

---

### Task 5: Orders Management

**Files:**
- Create: `src/pages/admin-hi/Orders.tsx`

**Interfaces:**
- Consumes: `DataTable`, `StatusBadge` from Task 2
- Produces: Orders management page

- [ ] **Step 1: Create `src/pages/admin-hi/Orders.tsx`**

```typescript
import { useState } from "react";
import { Eye, Package } from "lucide-react";
import DataTable, { Column } from "@/components/admin-hi/DataTable";
import StatusBadge from "@/components/admin-hi/StatusBadge";

type Order = {
  id: string;
  customer: string;
  email: string;
  products: string[];
  total: number;
  status: string;
  date: string;
  paymentMethod: string;
};

const MOCK_ORDERS: Order[] = [
  { id: "CMD-001", customer: "Marie-Claire Dupont", email: "mc@example.com", products: ["Fauteuil Velours Oria", "Chevet Aurea"], total: 1880, status: "delivered", date: "2026-07-18", paymentMethod: "Carte bancaire" },
  { id: "CMD-002", customer: "Jean-Pierre Laurent", email: "jp@example.com", products: ["Canapé Nero 3 places"], total: 3890, status: "shipped", date: "2026-07-17", paymentMethod: "Virement" },
  { id: "CMD-003", customer: "Sophie Martin", email: "sophie@example.com", products: ["Table Marbre Lune"], total: 2450, status: "processing", date: "2026-07-17", paymentMethod: "Carte bancaire" },
  { id: "CMD-004", customer: "Philippe Royer", email: "phil@example.com", products: ["Îlot Cuisine Nera", "Suspension Drapé"], total: 7380, status: "pending", date: "2026-07-16", paymentMethod: "Chèque" },
  { id: "CMD-005", customer: "Isabelle Vincent", email: "isa@example.com", products: ["Lampadaire Halo"], total: 890, status: "delivered", date: "2026-07-15", paymentMethod: "Carte bancaire" },
  { id: "CMD-006", customer: "Antoine Bertrand", email: "ab@example.com", products: ["Lit Tokyo", "Chevet Aurea"], total: 2780, status: "cancelled", date: "2026-07-14", paymentMethod: "Carte bancaire" },
  { id: "CMD-007", customer: "Claire Fontaine", email: "claire@example.com", products: ["Plafonnier Linéaire", "Lampadaire Halo"], total: 1670, status: "delivered", date: "2026-07-13", paymentMethod: "Virement" },
  { id: "CMD-008", customer: "Marc Dubois", email: "marc@example.com", products: ["Dressing Nera"], total: 3490, status: "processing", date: "2026-07-12", paymentMethod: "Carte bancaire" },
];

const STATUS_OPTIONS = [
  { value: "", label: "Tous les statuts" },
  { value: "pending", label: "En attente" },
  { value: "processing", label: "En cours" },
  { value: "shipped", label: "Expédié" },
  { value: "delivered", label: "Livré" },
  { value: "cancelled", label: "Annulé" },
];

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const filtered = statusFilter
    ? MOCK_ORDERS.filter((o) => o.status === statusFilter)
    : MOCK_ORDERS;

  const columns: Column<Order>[] = [
    { key: "id", label: "Commande", sortable: true },
    { key: "customer", label: "Client", sortable: true },
    {
      key: "products",
      label: "Produits",
      render: (row) => (
        <span className="text-xs text-muted-foreground">
          {row.products.length} produit{row.products.length > 1 ? "s" : ""}
        </span>
      ),
    },
    {
      key: "total",
      label: "Total",
      sortable: true,
      render: (row) => <span className="text-gold">{row.total.toLocaleString("fr-FR")} €</span>,
    },
    {
      key: "status",
      label: "Statut",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (row) => (
        <span className="text-muted-foreground">
          {new Date(row.date).toLocaleDateString("fr-FR")}
        </span>
      ),
    },
    { key: "paymentMethod", label: "Paiement", sortable: true },
    {
      key: "actions",
      label: "",
      className: "w-12",
      render: () => (
        <button className="p-1.5 hover:bg-gold/10 transition-colors">
          <Eye className="w-3.5 h-3.5 text-gold/60" />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display text-3xl lg:text-4xl mb-2">Commandes</h1>
          <p className="text-sm text-muted-foreground">{MOCK_ORDERS.length} commandes au total</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filtered as unknown as Record<string, unknown>[]}
        searchPlaceholder="Rechercher une commande..."
        searchKey="customer"
        actions={
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-background border border-gold/20 text-sm focus:outline-none focus:border-gold/50"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        }
      />
    </div>
  );
};

export default Orders;
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /home/shx/Documents/home-idea && npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/pages/admin-hi/Orders.tsx
git commit -m "feat(admin): add Orders management page with status filtering"
```

---

### Task 6: Customers, Projects, Appointments

**Files:**
- Create: `src/pages/admin-hi/Customers.tsx`
- Create: `src/pages/admin-hi/Projects.tsx`
- Create: `src/pages/admin-hi/Appointments.tsx`

**Interfaces:**
- Consumes: `DataTable`, `StatusBadge` from Task 2
- Produces: Three management pages

- [ ] **Step 1: Create all three pages**

Each follows the same pattern as Orders — a DataTable with mock data, search, filtering, and status badges. Create them in `src/pages/admin-hi/`:

- `Customers.tsx` — Columns: name, email, phone, orders count, total spent, registered date, status
- `Projects.tsx` — Columns: client, type (appartement/villa/pro), status (en cours/terminé/en attente), budget, assigned to, date
- `Appointments.tsx` — Columns: client, type (visite/consultation/installation), date, time, status (confirmé/en attente/annulé), assigned to

- [ ] **Step 2: Verify it compiles**

Run: `cd /home/shx/Documents/home-idea && npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/pages/admin-hi/Customers.tsx src/pages/admin-hi/Projects.tsx src/pages/admin-hi/Appointments.tsx
git commit -m "feat(admin): add Customers, Projects, and Appointments management pages"
```

---

### Task 7: Inventory + Analytics

**Files:**
- Create: `src/pages/admin-hi/Inventory.tsx`
- Create: `src/pages/admin-hi/Analytics.tsx`

**Interfaces:**
- Consumes: `DataTable`, `StatusBadge`, `StatCard` from Task 2
- Produces: Inventory management + Analytics dashboard with Recharts

- [ ] **Step 1: Create `src/pages/admin-hi/Inventory.tsx`**

Follows DataTable pattern — Columns: product name, SKU, category, stock level, status (in-stock/low-stock/out-of-stock), last restocked, price.

- [ ] **Step 2: Create `src/pages/admin-hi/Analytics.tsx`**

KPI cards at top, then Recharts area/bar charts for revenue over time, orders by category, top products, customer acquisition. Use mock data with Recharts `<AreaChart>`, `<BarChart>`, `<PieChart>`.

- [ ] **Step 3: Verify it compiles**

Run: `cd /home/shx/Documents/home-idea && npx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/pages/admin-hi/Inventory.tsx src/pages/admin-hi/Analytics.tsx
git commit -m "feat(admin): add Inventory management and Analytics dashboard with Recharts"
```

---

### Task 8: CMS, Roles, Permissions

**Files:**
- Create: `src/pages/admin-hi/CMS.tsx`
- Create: `src/pages/admin-hi/Roles.tsx`
- Create: `src/pages/admin-hi/Permissions.tsx`

**Interfaces:**
- Consumes: `DataTable`, `StatusBadge` from Task 2
- Produces: CMS, Roles, and Permissions pages

- [ ] **Step 1: Create `src/pages/admin-hi/CMS.tsx`**

Content management — Tabs for Blog Posts (list with status), Pages (list), FAQ (list with create/edit). Uses DataTable pattern.

- [ ] **Step 2: Create `src/pages/admin-hi/Roles.tsx`**

Role management — Table of roles (Admin, Manager, Editor, Viewer) with description, user count, permissions count. Create/edit dialog.

- [ ] **Step 3: Create `src/pages/admin-hi/Permissions.tsx`**

Permission matrix — Grid/table with roles as columns and permissions as rows. Checkboxes for each intersection. Export/import.

- [ ] **Step 4: Verify it compiles**

Run: `cd /home/shx/Documents/home-idea && npx tsc --noEmit`
Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add src/pages/admin-hi/CMS.tsx src/pages/admin-hi/Roles.tsx src/pages/admin-hi/Permissions.tsx
git commit -m "feat(admin): add CMS, Roles, and Permissions management pages"
```

---

### Task 9: Route Integration + Final Polish

**Files:**
- Modify: `src/App.tsx`
- Create: `src/components/hi/home/AdminCTA.tsx`

**Interfaces:**
- Consumes: `AdminLayout` from Task 1, all pages from Tasks 3-8
- Produces: Full admin route tree

- [ ] **Step 1: Add admin routes to `src/App.tsx`**

```typescript
// Add imports
import AdminLayout from "./components/admin-hi/AdminLayout";
import AdminDashboard from "./pages/admin-hi/Dashboard";
import AdminProducts from "./pages/admin-hi/Products";
import AdminOrders from "./pages/admin-hi/Orders";
import AdminCustomers from "./pages/admin-hi/Customers";
import AdminProjects from "./pages/admin-hi/Projects";
import AdminAppointments from "./pages/admin-hi/Appointments";
import AdminInventory from "./pages/admin-hi/Inventory";
import AdminAnalytics from "./pages/admin-hi/Analytics";
import AdminCMS from "./pages/admin-hi/CMS";
import AdminRoles from "./pages/admin-hi/Roles";
import AdminPermissions from "./pages/admin-hi/Permissions";

// Add routes inside <Routes>
<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboard />} />
  <Route path="produits" element={<AdminProducts />} />
  <Route path="commandes" element={<AdminOrders />} />
  <Route path="clients" element={<AdminCustomers />} />
  <Route path="projets" element={<AdminProjects />} />
  <Route path="rendez-vous" element={<AdminAppointments />} />
  <Route path="inventaire" element={<AdminInventory />} />
  <Route path="analytics" element={<AdminAnalytics />} />
  <Route path="cms" element={<AdminCMS />} />
  <Route path="roles" element={<AdminRoles />} />
  <Route path="permissions" element={<AdminPermissions />} />
</Route>
```

- [ ] **Step 2: Add admin link to Navbar**

In `src/components/hi/Navbar.tsx`, add a small admin link (visible always for dev, later behind auth):

```typescript
<NavLink to="/admin" className="link-gold text-[10px]">Admin</NavLink>
```

- [ ] **Step 3: Verify full build**

Run: `cd /home/shx/Documents/home-idea && npx tsc --noEmit && npx vite build`
Expected: success

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx src/components/hi/Navbar.tsx
git commit -m "feat(admin): add full admin route tree and navbar link"
```
