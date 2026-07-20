import { Euro, ShoppingCart, Users, TrendingUp, Package, Eye } from "lucide-react";
import StatCard from "@/components/admin-hi/StatCard";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const REVENUE_DATA = [
  { month: "Jan", revenue: 42000 },
  { month: "Fév", revenue: 38000 },
  { month: "Mar", revenue: 55000 },
  { month: "Avr", revenue: 48000 },
  { month: "Mai", revenue: 62000 },
  { month: "Jun", revenue: 71000 },
  { month: "Jul", revenue: 58000 },
];

const ORDERS_DATA = [
  { category: "Salon", orders: 34 },
  { category: "Cuisine", orders: 12 },
  { category: "Chambres", orders: 22 },
  { category: "Éclairage", orders: 28 },
  { category: "Aménagement", orders: 8 },
];

const PIE_DATA = [
  { name: "Salon", value: 34, color: "#B98A4D" },
  { name: "Cuisine", value: 12, color: "#f0d78c" },
  { name: "Chambres", value: 22, color: "#8B7355" },
  { name: "Éclairage", value: 28, color: "#5c3d2e" },
  { name: "Aménagement", value: 8, color: "#333" },
];

const TOP_PRODUCTS = [
  { name: "Fauteuil Velours Oria", sold: 24, revenue: 30960 },
  { name: "Canapé Nero 3p", sold: 18, revenue: 70020 },
  { name: "Table Marbre Lune", sold: 15, revenue: 36750 },
  { name: "Suspension Drapé", sold: 14, revenue: 20860 },
  { name: "Lampadaire Halo", sold: 12, revenue: 10680 },
];

const Analytics = () => (
  <div>
    <div className="mb-10">
      <h1 className="font-display text-3xl lg:text-4xl mb-2">Analytics</h1>
      <p className="text-sm text-muted-foreground">Performances et tendances</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <StatCard icon={Euro} label="CA ce mois" value="58 000 €" change={{ value: 18, positive: true }} />
      <StatCard icon={ShoppingCart} label="Commandes" value="89" change={{ value: 12, positive: true }} />
      <StatCard icon={Users} label="Nouveaux clients" value="34" change={{ value: 8, positive: true }} />
      <StatCard icon={Eye} label="Visites page" value="12 450" change={{ value: 5, positive: false }} />
    </div>

    <div className="grid lg:grid-cols-2 gap-6 mb-10">
      <div className="border border-gold/15 p-6 bg-card">
        <h3 className="font-display text-lg mb-6">Chiffre d'affaires mensuel</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={REVENUE_DATA}>
            <defs>
              <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#B98A4D" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#B98A4D" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,168,76,0.1)" />
            <XAxis dataKey="month" stroke="rgba(201,168,76,0.5)" fontSize={11} />
            <YAxis stroke="rgba(201,168,76,0.5)" fontSize={11} tickFormatter={(v) => `${v / 1000}k`} />
            <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 0, fontSize: 12 }} />
            <Area type="monotone" dataKey="revenue" stroke="#B98A4D" fill="url(#goldGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="border border-gold/15 p-6 bg-card">
        <h3 className="font-display text-lg mb-6">Commandes par catégorie</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ORDERS_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,168,76,0.1)" />
            <XAxis dataKey="category" stroke="rgba(201,168,76,0.5)" fontSize={11} />
            <YAxis stroke="rgba(201,168,76,0.5)" fontSize={11} />
            <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 0, fontSize: 12 }} />
            <Bar dataKey="orders" fill="#B98A4D" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="grid lg:grid-cols-[1fr_350px] gap-6">
      <div className="border border-gold/15 bg-card">
        <div className="px-6 py-4 border-b border-gold/15">
          <h3 className="font-display text-lg">Top produits</h3>
        </div>
        <div className="divide-y divide-gold/10">
          {TOP_PRODUCTS.map((p, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-4">
              <div>
                <div className="text-sm font-medium">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.sold} vendus</div>
              </div>
              <div className="text-sm text-gold">{p.revenue.toLocaleString("fr-FR")} €</div>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-gold/15 p-6 bg-card">
        <h3 className="font-display text-lg mb-6">Répartition ventes</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
              {PIE_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
            <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 0, fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-3 mt-4 justify-center">
          {PIE_DATA.map((d) => (
            <div key={d.name} className="flex items-center gap-2 text-xs">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="text-muted-foreground">{d.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Analytics;
