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
