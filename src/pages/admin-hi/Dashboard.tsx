import { Package, ShoppingCart, Users, TrendingUp, Euro, AlertTriangle } from "lucide-react";
import StatCard from "@/components/admin-hi/StatCard";
import StatusBadge from "@/components/admin-hi/StatusBadge";
import { products } from "@/lib/products";

const MOCK_ORDERS = [
  { id: "CMD-001", customer: "Marie-Claire D.", total: 3890, status: "delivered", date: "2026-07-18" },
  { id: "CMD-002", customer: "Jean-Pierre L.", total: 1290, status: "shipped", date: "2026-07-17" },
  { id: "CMD-003", customer: "Sophie M.", total: 2450, status: "processing", date: "2026-07-17" },
  { id: "CMD-004", customer: "Philippe R.", total: 5890, status: "pending", date: "2026-07-16" },
  { id: "CMD-005", customer: "Isabelle V.", total: 1490, status: "delivered", date: "2026-07-15" },
];

const Dashboard = () => (
  <div>
    <div className="mb-10">
      <h1 className="font-display text-3xl lg:text-4xl mb-2">Dashboard</h1>
      <p className="text-sm text-muted-foreground">Vue d'ensemble de votre boutique</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <StatCard icon={Euro} label="Chiffre d'affaires" value="127 450 €" change={{ value: 12, positive: true }} />
      <StatCard icon={ShoppingCart} label="Commandes" value="89" change={{ value: 8, positive: true }} />
      <StatCard icon={Users} label="Clients" value="234" change={{ value: 15, positive: true }} />
      <StatCard icon={TrendingUp} label="Panier moyen" value="1 432 €" change={{ value: 3, positive: false }} />
    </div>

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

    <div className="grid lg:grid-cols-[1fr_350px] gap-6">
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

export default Dashboard;
