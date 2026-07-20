import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import DataTable, { Column } from "@/components/admin-hi/DataTable";
import StatusBadge from "@/components/admin-hi/StatusBadge";
import ConfirmDialog from "@/components/admin-hi/ConfirmDialog";
import { toast } from "sonner";

type CMSItem = { id: string; title: string; type: string; status: string; date: string; author: string };

const MOCK: CMSItem[] = [
  { id: "1", title: "L'art du mobilier de luxe", type: "Article", status: "published", date: "2026-07-15", author: "Admin" },
  { id: "2", title: "Guide matériaux nobles", type: "Guide", status: "published", date: "2026-07-10", author: "Admin" },
  { id: "3", title: "Tendances salon 2026", type: "Article", status: "draft", date: "2026-07-18", author: "Admin" },
  { id: "4", title: "FAQ — Livraison", type: "FAQ", status: "published", date: "2026-06-20", author: "Admin" },
  { id: "5", title: "FAQ — Garanties", type: "FAQ", status: "published", date: "2026-06-20", author: "Admin" },
  { id: "6", title: "Mentions légales", type: "Page", status: "published", date: "2026-01-01", author: "Admin" },
  { id: "7", title: "Politique de confidentialité", type: "Page", status: "published", date: "2026-01-01", author: "Admin" },
];

const CMS = () => {
  const [data, setData] = useState<CMSItem[]>(MOCK);
  const [deleting, setDeleting] = useState<CMSItem | null>(null);

  const columns: Column<CMSItem>[] = [
    { key: "title", label: "Titre", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "status", label: "Statut", render: (r) => <StatusBadge status={r.status} /> },
    { key: "author", label: "Auteur", sortable: true },
    { key: "date", label: "Date", sortable: true, render: (r) => <span className="text-muted-foreground">{new Date(r.date).toLocaleDateString("fr-FR")}</span> },
    {
      key: "actions", label: "", className: "w-24", render: (r) => (
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); toast.success("Édition — à venir"); }} className="p-1.5 hover:bg-gold/10"><Pencil className="w-3.5 h-3.5 text-gold/60" /></button>
          <button onClick={(e) => { e.stopPropagation(); setDeleting(r); }} className="p-1.5 hover:bg-red-500/10"><Trash2 className="w-3.5 h-3.5 text-red-400/60" /></button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display text-3xl lg:text-4xl mb-2">CMS</h1>
          <p className="text-sm text-muted-foreground">{data.length} contenus</p>
        </div>
        <button onClick={() => toast.success("Création — à venir")} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-gold text-ink text-sm font-medium tracking-wide">
          <Plus className="w-4 h-4" /> Ajouter
        </button>
      </div>
      <DataTable columns={columns} data={data as unknown as Record<string, unknown>[]} searchPlaceholder="Rechercher un contenu..." searchKey="title" />
      <ConfirmDialog open={!!deleting} title="Supprimer ce contenu ?" description={`"${deleting?.title}" sera définitivement supprimé.`} confirmLabel="Supprimer" onConfirm={() => { setData((p) => p.filter((x) => x.id !== deleting!.id)); toast.success("Contenu supprimé"); setDeleting(null); }} onCancel={() => setDeleting(null)} danger />
    </div>
  );
};

export default CMS;
