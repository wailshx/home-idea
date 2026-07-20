import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { products, Product } from "@/lib/products";
import DataTable, { Column } from "@/components/admin-hi/DataTable";
import StatusBadge from "@/components/admin-hi/StatusBadge";
import ConfirmDialog from "@/components/admin-hi/ConfirmDialog";
import { toast } from "sonner";
import { X } from "lucide-react";

const ProductForm = ({
  product,
  onSave,
  onCancel,
}: {
  product: Product | null;
  onSave: (data: Partial<Product>) => void;
  onCancel: () => void;
}) => {
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
        <button type="button" onClick={onCancel} className="p-2 hover:bg-gold/10"><X className="w-4 h-4 text-gold/60" /></button>
      </div>
      <div className="p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-2">Nom *</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 bg-background border border-gold/20 text-sm focus:outline-none focus:border-gold/50" />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-2">Prix (€)</label>
            <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="w-full px-4 py-2.5 bg-background border border-gold/20 text-sm focus:outline-none focus:border-gold/50" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-2">Catégorie</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 bg-background border border-gold/20 text-sm focus:outline-none focus:border-gold/50">
              <option value="salon">Salon</option>
              <option value="cuisine">Cuisine</option>
              <option value="chambres">Chambres</option>
              <option value="eclairage">Éclairage</option>
              <option value="amenagement">Aménagement</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-2">Sous-catégorie</label>
            <input value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })} className="w-full px-4 py-2.5 bg-background border border-gold/20 text-sm focus:outline-none focus:border-gold/50" />
          </div>
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-2">Description courte</label>
          <input value={form.short} onChange={(e) => setForm({ ...form, short: e.target.value })} className="w-full px-4 py-2.5 bg-background border border-gold/20 text-sm focus:outline-none focus:border-gold/50" />
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-2">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 bg-background border border-gold/20 text-sm focus:outline-none focus:border-gold/50 resize-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-2">Matériaux</label>
            <input value={form.materials} onChange={(e) => setForm({ ...form, materials: e.target.value })} className="w-full px-4 py-2.5 bg-background border border-gold/20 text-sm focus:outline-none focus:border-gold/50" placeholder="Séparés par virgule" />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-2">Dimensions</label>
            <input value={form.dimensions} onChange={(e) => setForm({ ...form, dimensions: e.target.value })} className="w-full px-4 py-2.5 bg-background border border-gold/20 text-sm focus:outline-none focus:border-gold/50" />
          </div>
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={form.isNew} onChange={(e) => setForm({ ...form, isNew: e.target.checked })} className="w-4 h-4 accent-gold" />
          <span className="text-sm">Marquer comme nouveauté</span>
        </label>
      </div>
      <div className="flex items-center justify-end gap-4 px-6 py-4 border-t border-gold/15">
        <button type="button" onClick={onCancel} className="px-6 py-2.5 border border-gold/20 text-sm text-muted-foreground hover:text-foreground transition-colors">Annuler</button>
        <button type="submit" className="px-6 py-2.5 bg-gradient-gold text-ink text-sm font-medium tracking-wide">{product ? "Enregistrer" : "Créer"}</button>
      </div>
    </form>
  );
};

const Products = () => {
  const [data, setData] = useState<Product[]>(products);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleting, setDeleting] = useState<Product | null>(null);

  const columns: Column<Product>[] = [
    { key: "image", label: "", className: "w-16", render: (row) => <img src={row.image} alt={row.name} className="w-12 h-12 object-cover border border-gold/20" /> },
    { key: "name", label: "Nom", sortable: true },
    { key: "category", label: "Catégorie", sortable: true },
    { key: "subcategory", label: "Sous-cat.", sortable: true },
    { key: "price", label: "Prix", sortable: true, render: (row) => <span className="text-gold">{row.price > 0 ? `${row.price.toLocaleString("fr-FR")} €` : "Sur devis"}</span> },
    { key: "isNew", label: "Statut", render: (row) => <StatusBadge status={row.isNew ? "active" : "draft"} /> },
    {
      key: "actions", label: "", className: "w-24", render: (row) => (
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); setEditing(row); setShowForm(true); }} className="p-1.5 hover:bg-gold/10"><Pencil className="w-3.5 h-3.5 text-gold/60" /></button>
          <button onClick={(e) => { e.stopPropagation(); setDeleting(row); }} className="p-1.5 hover:bg-red-500/10"><Trash2 className="w-3.5 h-3.5 text-red-400/60" /></button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display text-3xl lg:text-4xl mb-2">Produits</h1>
          <p className="text-sm text-muted-foreground">{data.length} produits au catalogue</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-gold text-ink text-sm font-medium tracking-wide">
          <Plus className="w-4 h-4" /> Ajouter
        </button>
      </div>

      <DataTable columns={columns} data={data as unknown as Record<string, unknown>[]} searchPlaceholder="Rechercher un produit..." searchKey="name" />

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={() => { setShowForm(false); setEditing(null); }} />
          <div className="relative bg-card border border-gold/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4 anim-tilt-in">
            <ProductForm product={editing} onSave={(p) => { toast.success(editing ? "Produit modifié" : "Produit créé"); setShowForm(false); setEditing(null); }} onCancel={() => { setShowForm(false); setEditing(null); }} />
          </div>
        </div>
      )}

      <ConfirmDialog open={!!deleting} title="Supprimer ce produit ?" description={`"${deleting?.name}" sera définitivement supprimé.`} confirmLabel="Supprimer" onConfirm={() => { setData((p) => p.filter((x) => x.id !== deleting!.id)); toast.success("Produit supprimé"); setDeleting(null); }} onCancel={() => setDeleting(null)} danger />
    </div>
  );
};

export default Products;
