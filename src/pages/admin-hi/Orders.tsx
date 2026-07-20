import { useState } from "react";
import { Eye } from "lucide-react";
import DataTable, { Column } from "@/components/admin-hi/DataTable";
import StatusBadge from "@/components/admin-hi/StatusBadge";

type Order = { id: string; customer: string; total: number; status: string; date: string; payment: string; items: number };

const MOCK: Order[] = [
  { id: "CMD-001", customer: "Marie-Claire Dupont", total: 1880, status: "delivered", date: "2026-07-18", payment: "Carte bancaire", items: 2 },
  { id: "CMD-002", customer: "Jean-Pierre Laurent", total: 3890, status: "shipped", date: "2026-07-17", payment: "Virement", items: 1 },
  { id: "CMD-003", customer: "Sophie Martin", total: 2450, status: "processing", date: "2026-07-17", payment: "Carte bancaire", items: 1 },
  { id: "CMD-004", customer: "Philippe Royer", total: 7380, status: "pending", date: "2026-07-16", payment: "Chèque", items: 2 },
  { id: "CMD-005", customer: "Isabelle Vincent", total: 890, status: "delivered", date: "2026-07-15", payment: "Carte bancaire", items: 1 },
  { id: "CMD-006", customer: "Antoine Bertrand", total: 2780, status: "cancelled", date: "2026-07-14", payment: "Carte bancaire", items: 2 },
  { id: "CMD-007", customer: "Claire Fontaine", total: 1670, status: "delivered", date: "2026-07-13", payment: "Virement", items: 2 },
  { id: "CMD-008", customer: "Marc Dubois", total: 3490, status: "processing", date: "2026-07-12", payment: "Carte bancaire", items: 1 },
];

const STATUSES = ["", "pending", "processing", "shipped", "delivered", "cancelled"];
const STATUS_LABELS: Record<string, string> = { "": "Tous", pending: "En attente", processing: "En cours", shipped: "Expédié", delivered: "Livré", cancelled: "Annulé" };

const Orders = () => {
  const [filter, setFilter] = useState("");
  const data = filter ? MOCK.filter((o) => o.status === filter) : MOCK;

  const columns: Column<Order>[] = [
    { key: "id", label: "Commande", sortable: true },
    { key: "customer", label: "Client", sortable: true },
    { key: "items", label: "Produits", render: (r) => <span className="text-xs text-muted-foreground">{r.items} article{r.items > 1 ? "s" : ""}</span> },
    { key: "total", label: "Total", sortable: true, render: (r) => <span className="text-gold">{r.total.toLocaleString("fr-FR")} €</span> },
    { key: "status", label: "Statut", render: (r) => <StatusBadge status={r.status} /> },
    { key: "date", label: "Date", sortable: true, render: (r) => <span className="text-muted-foreground">{new Date(r.date).toLocaleDateString("fr-FR")}</span> },
    { key: "payment", label: "Paiement", sortable: true },
    { key: "actions", label: "", className: "w-12", render: () => <button className="p-1.5 hover:bg-gold/10"><Eye className="w-3.5 h-3.5 text-gold/60" /></button> },
  ];

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-display text-3xl lg:text-4xl mb-2">Commandes</h1>
        <p className="text-sm text-muted-foreground">{MOCK.length} commandes au total</p>
      </div>
      <DataTable columns={columns} data={data as unknown as Record<string, unknown>[]} searchPlaceholder="Rechercher une commande..." searchKey="customer"
        actions={
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-4 py-2.5 bg-background border border-gold/20 text-sm focus:outline-none focus:border-gold/50">
            {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
          </select>
        }
      />
    </div>
  );
};

export default Orders;
