import DataTable, { Column } from "@/components/admin-hi/DataTable";
import StatusBadge from "@/components/admin-hi/StatusBadge";

type Project = { id: string; client: string; type: string; status: string; budget: number; assignedTo: string; date: string };

const MOCK: Project[] = [
  { id: "PRJ-001", client: "Marie-Claire D.", type: "Appartement", status: "completed", budget: 45000, assignedTo: "Sophie L.", date: "2026-06-01" },
  { id: "PRJ-002", client: "Jean-Pierre L.", type: "Villa", status: "processing", budget: 120000, assignedTo: "Marc T.", date: "2026-05-15" },
  { id: "PRJ-003", client: "Sophie M.", type: "Espace pro", status: "pending", budget: 35000, assignedTo: "Claire D.", date: "2026-07-10" },
  { id: "PRJ-004", client: "Philippe R.", type: "Appartement", status: "completed", budget: 28000, assignedTo: "Sophie L.", date: "2026-04-20" },
  { id: "PRJ-005", client: "Isabelle V.", type: "Villa", status: "processing", budget: 85000, assignedTo: "Marc T.", date: "2026-07-01" },
];

const Projects = () => {
  const columns: Column<Project>[] = [
    { key: "id", label: "Projet", sortable: true },
    { key: "client", label: "Client", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "status", label: "Statut", render: (r) => <StatusBadge status={r.status} /> },
    { key: "budget", label: "Budget", sortable: true, render: (r) => <span className="text-gold">{r.budget.toLocaleString("fr-FR")} €</span> },
    { key: "assignedTo", label: "Assigné à", sortable: true },
    { key: "date", label: "Date", sortable: true, render: (r) => <span className="text-muted-foreground">{new Date(r.date).toLocaleDateString("fr-FR")}</span> },
  ];

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-display text-3xl lg:text-4xl mb-2">Projets</h1>
        <p className="text-sm text-muted-foreground">{MOCK.length} projets d'aménagement</p>
      </div>
      <DataTable columns={columns} data={MOCK as unknown as Record<string, unknown>[]} searchPlaceholder="Rechercher un projet..." searchKey="client" />
    </div>
  );
};

export default Projects;
