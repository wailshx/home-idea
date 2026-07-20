import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import DataTable, { Column } from "@/components/admin-hi/DataTable";
import StatusBadge from "@/components/admin-hi/StatusBadge";
import ConfirmDialog from "@/components/admin-hi/ConfirmDialog";
import { toast } from "sonner";

type Role = { id: string; name: string; description: string; users: number; permissions: number; status: string };

const MOCK: Role[] = [
  { id: "r1", name: "Admin", description: "Accès complet au système", users: 2, permissions: 24, status: "active" },
  { id: "r2", name: "Manager", description: "Gestion des commandes et clients", users: 3, permissions: 18, status: "active" },
  { id: "r3", name: "Éditeur", description: "Gestion du contenu et catalog", users: 4, permissions: 12, status: "active" },
  { id: "r4", name: "Invité", description: "Lecture seule", users: 0, permissions: 4, status: "draft" },
];

const Roles = () => {
  const [data, setData] = useState<Role[]>(MOCK);
  const [deleting, setDeleting] = useState<Role | null>(null);

  const columns: Column<Role>[] = [
    { key: "name", label: "Rôle", sortable: true },
    { key: "description", label: "Description", sortable: true },
    { key: "users", label: "Utilisateurs", sortable: true, render: (r) => <span>{r.users}</span> },
    { key: "permissions", label: "Permissions", sortable: true, render: (r) => <span className="text-gold">{r.permissions}</span> },
    { key: "status", label: "Statut", render: (r) => <StatusBadge status={r.status} /> },
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
          <h1 className="font-display text-3xl lg:text-4xl mb-2">Rôles</h1>
          <p className="text-sm text-muted-foreground">{data.length} rôles définis</p>
        </div>
        <button onClick={() => toast.success("Création — à venir")} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-gold text-ink text-sm font-medium tracking-wide">
          <Plus className="w-4 h-4" /> Ajouter
        </button>
      </div>
      <DataTable columns={columns} data={data as unknown as Record<string, unknown>[]} searchPlaceholder="Rechercher un rôle..." searchKey="name" />
      <ConfirmDialog open={!!deleting} title="Supprimer ce rôle ?" description={`Le rôle "${deleting?.name}" sera définitivement supprimé.`} confirmLabel="Supprimer" onConfirm={() => { setData((p) => p.filter((x) => x.id !== deleting!.id)); toast.success("Rôle supprimé"); setDeleting(null); }} onCancel={() => setDeleting(null)} danger />
    </div>
  );
};

export default Roles;
