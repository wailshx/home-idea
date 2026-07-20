import DataTable, { Column } from "@/components/admin-hi/DataTable";
import StatusBadge from "@/components/admin-hi/StatusBadge";

type Appointment = { id: string; client: string; type: string; date: string; time: string; status: string; assignedTo: string };

const MOCK: Appointment[] = [
  { id: "RDV-001", client: "Marie-Claire D.", type: "Consultation", date: "2026-07-22", time: "10:00", status: "confirmed", assignedTo: "Sophie L." },
  { id: "RDV-002", client: "Jean-Pierre L.", type: "Visite sur site", date: "2026-07-22", time: "14:30", status: "confirmed", assignedTo: "Marc T." },
  { id: "RDV-003", client: "Sophie M.", type: "Installation", date: "2026-07-23", time: "09:00", status: "pending", assignedTo: "Équipe B" },
  { id: "RDV-004", client: "Philippe R.", type: "Consultation", date: "2026-07-24", time: "11:00", status: "confirmed", assignedTo: "Claire D." },
  { id: "RDV-005", client: "Isabelle V.", type: "Livraison", date: "2026-07-25", time: "15:00", status: "pending", assignedTo: "Équipe A" },
  { id: "RDV-006", client: "Antoine B.", type: "Visite sur site", date: "2026-07-20", time: "10:00", status: "cancelled", assignedTo: "Marc T." },
];

const Appointments = () => {
  const columns: Column<Appointment>[] = [
    { key: "id", label: "Rendez-vous", sortable: true },
    { key: "client", label: "Client", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "date", label: "Date", sortable: true, render: (r) => <span className="text-muted-foreground">{new Date(r.date).toLocaleDateString("fr-FR")}</span> },
    { key: "time", label: "Heure", sortable: true },
    { key: "status", label: "Statut", render: (r) => <StatusBadge status={r.status} /> },
    { key: "assignedTo", label: "Assigné à", sortable: true },
  ];

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-display text-3xl lg:text-4xl mb-2">Rendez-vous</h1>
        <p className="text-sm text-muted-foreground">{MOCK.length} rendez-vous planifiés</p>
      </div>
      <DataTable columns={columns} data={MOCK as unknown as Record<string, unknown>[]} searchPlaceholder="Rechercher un rendez-vous..." searchKey="client" />
    </div>
  );
};

export default Appointments;
