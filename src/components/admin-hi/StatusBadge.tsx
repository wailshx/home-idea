const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  confirmed: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  processing: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  shipped: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  delivered: "bg-green-500/15 text-green-400 border-green-500/30",
  completed: "bg-green-500/15 text-green-400 border-green-500/30",
  active: "bg-green-500/15 text-green-400 border-green-500/30",
  published: "bg-green-500/15 text-green-400 border-green-500/30",
  "in-stock": "bg-green-500/15 text-green-400 border-green-500/30",
  cancelled: "bg-red-500/15 text-red-400 border-red-500/30",
  failed: "bg-red-500/15 text-red-400 border-red-500/30",
  draft: "bg-gray-500/15 text-gray-400 border-gray-500/30",
  "low-stock": "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  "out-of-stock": "bg-red-500/15 text-red-400 border-red-500/30",
};

const LABELS: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmé",
  processing: "En cours",
  shipped: "Expédié",
  delivered: "Livré",
  completed: "Terminé",
  active: "Actif",
  published: "Publié",
  "in-stock": "En stock",
  cancelled: "Annulé",
  failed: "Échoué",
  draft: "Brouillon",
  "low-stock": "Stock bas",
  "out-of-stock": "Rupture",
};

const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={`inline-flex px-2.5 py-1 text-[10px] tracking-[0.15em] uppercase border ${
      STATUS_STYLES[status] || STATUS_STYLES.draft
    }`}
  >
    {LABELS[status] || status}
  </span>
);

export default StatusBadge;
