import { Package, Layers } from "lucide-react";

type MaterialsPanelProps = {
  materials: string[];
};

const MATERIAL_ICONS: Record<string, string> = {
  "velours": "🟢",
  "marbre": "⚪",
  "laiton": "🟡",
  "verre": "🔵",
  "bois": "🟤",
  "acier": "⚫",
  "métal": "⚪",
  "led": "💡",
  "mdf": "🟤",
  "aluminium": "⚪",
  "mousse": "🟢",
  "chêne": "🟤",
  "hêtre": "🟤",
};

const getMaterialIcon = (material: string): string => {
  const lower = material.toLowerCase();
  for (const [key, icon] of Object.entries(MATERIAL_ICONS)) {
    if (lower.includes(key)) return icon;
  }
  return "◆";
};

const MaterialsPanel = ({ materials }: MaterialsPanelProps) => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 grid place-items-center border border-gold/30">
          <Package className="w-5 h-5 text-gold" />
        </div>
        <div>
          <h3 className="font-display text-xl">Matériaux</h3>
          <p className="text-[10px] tracking-[0.2em] uppercase text-gold/60">Sélection premium</p>
        </div>
      </div>
      <div className="space-y-3">
        {materials.map((mat) => (
          <div
            key={mat}
            className="flex items-center gap-4 px-4 py-3 border border-gold/10 hover:border-gold/30 transition-colors group"
          >
            <span className="text-lg">{getMaterialIcon(mat)}</span>
            <span className="text-sm group-hover:text-gold transition-colors">{mat}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-gold/50">
        <Layers className="w-3 h-3" /> Certifié & sourcé responsablement
      </div>
    </div>
  );
};

export default MaterialsPanel;
