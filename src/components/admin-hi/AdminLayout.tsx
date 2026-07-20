import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
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
      <AdminSidebar />

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
