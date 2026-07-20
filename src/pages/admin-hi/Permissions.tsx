import { useState } from "react";

const PERMISSIONS = [
  "Voir le dashboard",
  "Gérer les produits",
  "Gérer les commandes",
  "Gérer les clients",
  "Gérer les projets",
  "Gérer les rendez-vous",
  "Gérer l'inventaire",
  "Voir les analytics",
  "Gérer le CMS",
  "Gérer les rôles",
  "Gérer les permissions",
  "Exporter les données",
  "Gérer les factures",
  "Gérer les retours",
];

const ROLES = [
  { name: "Admin", key: "admin" },
  { name: "Manager", key: "manager" },
  { name: "Éditeur", key: "editor" },
  { name: "Invité", key: "guest" },
];

const DEFAULT_MATRIX: Record<string, Record<string, boolean>> = {
  admin: Object.fromEntries(PERMISSIONS.map((p) => [p, true])),
  manager: Object.fromEntries(PERMISSIONS.map((p) => [p, !["Gérer les rôles", "Gérer les permissions"].includes(p)])),
  editor: Object.fromEntries(PERMISSIONS.map((p) => [p, ["Voir le dashboard", "Gérer les produits", "Gérer le CMS", "Voir les analytics"].includes(p)])),
  guest: Object.fromEntries(PERMISSIONS.map((p) => [p, ["Voir le dashboard"].includes(p)])),
};

const Permissions = () => {
  const [matrix, setMatrix] = useState(DEFAULT_MATRIX);

  const toggle = (role: string, perm: string) => {
    setMatrix((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [perm]: !prev[role][perm],
      },
    }));
  };

  const toggleAll = (role: string) => {
    const allChecked = PERMISSIONS.every((p) => matrix[role][p]);
    setMatrix((prev) => ({
      ...prev,
      [role]: Object.fromEntries(PERMISSIONS.map((p) => [p, !allChecked])),
    }));
  };

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-display text-3xl lg:text-4xl mb-2">Permissions</h1>
        <p className="text-sm text-muted-foreground">Matrice des droits d'accès</p>
      </div>

      <div className="overflow-x-auto border border-gold/15">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gold/15">
              <th className="px-4 py-3 text-left text-[10px] tracking-[0.2em] uppercase text-gold/70 font-normal min-w-[250px]">
                Permission
              </th>
              {ROLES.map((role) => (
                <th key={role.key} className="px-4 py-3 text-center">
                  <button
                    onClick={() => toggleAll(role.key)}
                    className="text-[10px] tracking-[0.2em] uppercase text-gold/70 hover:text-gold font-normal"
                  >
                    {role.name}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERMISSIONS.map((perm, i) => (
              <tr key={perm} className={`border-b border-gold/10 ${i % 2 === 0 ? "bg-gold/[0.02]" : ""}`}>
                <td className="px-4 py-3 text-sm">{perm}</td>
                {ROLES.map((role) => (
                  <td key={role.key} className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggle(role.key, perm)}
                      className={`w-5 h-5 grid place-items-center border transition-colors ${
                        matrix[role.key][perm]
                          ? "bg-gold border-gold text-ink"
                          : "border-gold/30 hover:border-gold/60"
                      }`}
                    >
                      {matrix[role.key][perm] && <span className="text-[10px]">✓</span>}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {PERMISSIONS.length} permissions × {ROLES.length} rôles
        </p>
        <button className="px-6 py-2.5 bg-gradient-gold text-ink text-sm font-medium tracking-wide">
          Enregistrer
        </button>
      </div>
    </div>
  );
};

export default Permissions;
