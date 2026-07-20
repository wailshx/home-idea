import DataTable, { Column } from "@/components/admin-hi/DataTable";
import StatusBadge from "@/components/admin-hi/StatusBadge";

type Customer = { name: string; email: string; orders: number; totalSpent: number; joined: string; status: string };

const MOCK: Customer[] = [
  { name: "Marie-Claire Dupont", email: "mc@example.com", orders: 5, totalSpent: 8420, joined: "2025-03-12", status: "active" },
  { name: "Jean-Pierre Laurent", email: "jp@example.com", orders: 3, totalSpent: 5180, joined: "2025-06-20", status: "active" },
  { name: "Sophie Martin", email: "sophie@example.com", orders: 2, totalSpent: 3240, joined: "2025-09-01", status: "active" },
  { name: "Philippe Royer", email: "phil@example.com", orders: 7, totalSpent: 15890, joined: "2024-11-15", status: "active" },
  { name: "Isabelle Vincent", email: "isa@example.com", orders: 1, totalSpent: 890, joined: "2026-01-10", status: "active" },
  { name: "Antoine Bertrand", email: "ab@example.com", orders: 4, totalSpent: 6780, joined: "2025-04-22", status: "active" },
  { name: "Claire Fontaine", email: "claire@example.com", orders: 2, totalSpent: 2560, joined: "2025-08-05", status: "active" },
  { name: "Marc Dubois", email: "marc@example.com", orders: 1, totalSpent: 3490, joined: "2026-02-18", status: "active" },
];

const Customers = () => {
  const columns: Column<Customer>[] = [
    { key: "name", label: "Nom", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "orders", label: "Commandes", sortable: true, render: (r) => <span>{r.orders}</span> },
    { key: "totalSpent", label: "Total dépensé", sortable: true, render: (r) => <span className="text-gold">{r.totalSpent.toLocaleString("fr-FR")} €</span> },
    { key: "joined", label: "Inscrit le", sortable: true, render: (r) => <span className="text-muted-foreground">{new Date(r.joined).toLocaleDateString("fr-FR")}</span> },
    { key: "status", label: "Statut", render: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-display text-3xl lg:text-4xl mb-2">Clients</h1>
        <p className="text-sm text-muted-foreground">{MOCK.length} clients enregistrés</p>
      </div>
      <DataTable columns={columns} data={MOCK as unknown as Record<string, unknown>[]} searchPlaceholder="Rechercher un client..." searchKey="name" />
    </div>
  );
};

export default Customers;
