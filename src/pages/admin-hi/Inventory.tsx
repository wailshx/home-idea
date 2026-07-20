import DataTable, { Column } from "@/components/admin-hi/DataTable";
import StatusBadge from "@/components/admin-hi/StatusBadge";

type StockItem = { product: string; sku: string; category: string; stock: number; status: string; lastRestocked: string; price: number };

const MOCK: StockItem[] = [
  { product: "Fauteuil Velours Oria", sku: "HI-FAU-ORIA", category: "Salon", stock: 12, status: "in-stock", lastRestocked: "2026-07-01", price: 1290 },
  { product: "Table Marbre Lune", sku: "HI-TAB-LUNE", category: "Salon", stock: 3, status: "low-stock", lastRestocked: "2026-06-15", price: 2450 },
  { product: "Lampadaire Halo", sku: "HI-LAM-HALO", category: "Éclairage", stock: 8, status: "in-stock", lastRestocked: "2026-07-10", price: 890 },
  { product: "Canapé Nero 3p", sku: "HI-CAN-NERO", category: "Salon", stock: 2, status: "low-stock", lastRestocked: "2026-06-20", price: 3890 },
  { product: "Lit Tokyo", sku: "HI-LIT-TOKYO", category: "Chambres", stock: 0, status: "out-of-stock", lastRestocked: "2026-05-01", price: 2190 },
  { product: "Chevet Aurea", sku: "HI-CHV-AUREA", category: "Chambres", stock: 15, status: "in-stock", lastRestocked: "2026-07-05", price: 590 },
  { product: "Suspension Drapé", sku: "HI-SUS-DRAPE", category: "Éclairage", stock: 5, status: "in-stock", lastRestocked: "2026-06-28", price: 1490 },
  { product: "Plafonnier Linéaire", sku: "HI-PLA-LINEAIRE", category: "Éclairage", stock: 1, status: "low-stock", lastRestocked: "2026-06-10", price: 780 },
];

const Inventory = () => {
  const columns: Column<StockItem>[] = [
    { key: "product", label: "Produit", sortable: true },
    { key: "sku", label: "SKU", sortable: true },
    { key: "category", label: "Catégorie", sortable: true },
    { key: "stock", label: "Stock", sortable: true, render: (r) => <span className={r.stock === 0 ? "text-red-400" : r.stock <= 3 ? "text-yellow-400" : ""}>{r.stock}</span> },
    { key: "status", label: "Statut", render: (r) => <StatusBadge status={r.status} /> },
    { key: "price", label: "Prix", sortable: true, render: (r) => <span className="text-gold">{r.price.toLocaleString("fr-FR")} €</span> },
    { key: "lastRestocked", label: "Dernier réappro.", sortable: true, render: (r) => <span className="text-muted-foreground">{new Date(r.lastRestocked).toLocaleDateString("fr-FR")}</span> },
  ];

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-display text-3xl lg:text-4xl mb-2">Inventaire</h1>
        <p className="text-sm text-muted-foreground">{MOCK.length} produits suivis</p>
      </div>
      <DataTable columns={columns} data={MOCK as unknown as Record<string, unknown>[]} searchPlaceholder="Rechercher un produit..." searchKey="product" />
    </div>
  );
};

export default Inventory;
