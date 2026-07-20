import { useState } from "react";
import { useConfigurator } from "@/contexts/ConfiguratorContext";
import { ROOM_TYPES, ROOM_META } from "@/lib/configurator-data";
import RoomSelector from "./RoomSelector";
import CostSummary from "./CostSummary";
import KitchenPanel from "./panels/KitchenPanel";
import LivingRoomPanel from "./panels/LivingRoomPanel";
import BedroomPanel from "./panels/BedroomPanel";
import LightingPanel from "./panels/LightingPanel";
import DecorationPanel from "./panels/DecorationPanel";
import FloorPanel from "./panels/FloorPanel";
import WallsPanel from "./panels/WallsPanel";
import FurniturePanel from "./panels/FurniturePanel";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Eye,
  ChefHat,
  Sofa,
  Bed,
  Lightbulb,
  Frame,
  Layers,
  Square,
  Armchair,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PANEL_MAP: Record<string, React.FC> = {
  kitchen: KitchenPanel,
  "living-room": LivingRoomPanel,
  bedroom: BedroomPanel,
  lighting: LightingPanel,
  decoration: DecorationPanel,
  floor: FloorPanel,
  walls: WallsPanel,
  furniture: FurniturePanel,
};

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  ChefHat,
  Sofa,
  Bed,
  Lightbulb,
  Frame,
  Layers,
  Square,
  Armchair,
};

const ConfigWizard = () => {
  const { config, activeRoom, setActive, totalCost, completedRooms, reset } =
    useConfigurator();
  const navigate = useNavigate();
  const [step, setStep] = useState<"select" | "configure">("select");

  const activeRooms = config.activeRooms;
  const currentIdx = activeRoom ? activeRooms.indexOf(activeRoom) : -1;

  const goNext = () => {
    if (currentIdx < activeRooms.length - 1) {
      setActive(activeRooms[currentIdx + 1]);
    }
  };

  const goPrev = () => {
    if (currentIdx > 0) {
      setActive(activeRooms[currentIdx - 1]);
    }
  };

  const startConfiguring = () => {
    if (activeRooms.length > 0) {
      setActive(activeRooms[0]);
      setStep("configure");
    }
  };

  const ActivePanel = activeRoom ? PANEL_MAP[activeRoom] : null;

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-2">
              Configurateur
            </div>
            <h1 className="font-display text-4xl lg:text-5xl">
              {step === "select"
                ? "Créez votre espace"
                : activeRoom
                ? ROOM_META[activeRoom].name
                : "Configuration"}
            </h1>
          </div>
          <button
            onClick={reset}
            className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gold/60 hover:text-gold transition-colors"
          >
            <RotateCcw className="w-3 h-3" /> Réinitialiser
          </button>
        </div>

        {step === "select" ? (
          <>
            <RoomSelector />
            {activeRooms.length > 0 && (
              <div className="mt-12 text-center">
                <button
                  onClick={startConfiguring}
                  className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-gold text-ink font-medium tracking-wide text-sm"
                >
                  Commencer la configuration ({activeRooms.length} espace
                  {activeRooms.length > 1 ? "s" : ""})
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="grid lg:grid-cols-[280px_1fr_280px] gap-8">
            {/* Left — Room navigation */}
            <aside className="hidden lg:block">
              <div className="sticky top-32 space-y-2">
                {activeRooms.map((type) => {
                  const meta = ROOM_META[type];
                  const Icon = ICON_MAP[meta.icon] || Square;
                  const isActive = activeRoom === type;
                  const isComplete = completedRooms.includes(type);
                  const room = config.rooms[type];
                  const selectionCount = Object.keys(room.selections).length;

                  return (
                    <button
                      key={type}
                      onClick={() => setActive(type)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                        isActive
                          ? "bg-gold/10 border-l-2 border-gold text-gold"
                          : "hover:bg-gold/5 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm truncate">{meta.name}</div>
                        {selectionCount > 0 && (
                          <div className="text-[10px] text-gold/60">
                            {selectionCount} sélection{selectionCount > 1 ? "s" : ""}
                          </div>
                        )}
                      </div>
                      {isComplete && (
                        <div className="w-5 h-5 grid place-items-center bg-gold/20 text-gold text-[10px]">
                          ✓
                        </div>
                      )}
                    </button>
                  );
                })}

                <button
                  onClick={() => {
                    setStep("select");
                    setActive(activeRooms[0] || "kitchen");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-muted-foreground hover:text-gold transition-colors mt-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">Modifier les espaces</span>
                </button>
              </div>
            </aside>

            {/* Mobile room tabs */}
            <div className="lg:hidden col-span-full overflow-x-auto pb-4 -mx-4 px-4">
              <div className="flex gap-2 min-w-max">
                {activeRooms.map((type) => {
                  const meta = ROOM_META[type];
                  const isActive = activeRoom === type;
                  return (
                    <button
                      key={type}
                      onClick={() => setActive(type)}
                      className={`px-4 py-2 text-xs tracking-[0.15em] uppercase whitespace-nowrap transition-colors ${
                        isActive
                          ? "bg-gold/15 border border-gold text-gold"
                          : "border border-gold/20 text-muted-foreground"
                      }`}
                    >
                      {meta.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Center — Active panel */}
            <main className="min-w-0">
              {ActivePanel && (
                <div className="anim-rise" key={activeRoom}>
                  <div className="mb-8">
                    <h2 className="font-display text-2xl lg:text-3xl mb-2">
                      {activeRoom && ROOM_META[activeRoom].name}
                    </h2>
                    <p className="text-sm text-muted-foreground italic">
                      {activeRoom && ROOM_META[activeRoom].tagline}
                    </p>
                  </div>
                  <ActivePanel />
                </div>
              )}
            </main>

            {/* Right — Cost + nav */}
            <aside className="hidden lg:block">
              <div className="sticky top-32 space-y-6">
                <CostSummary />

                <div className="flex items-center gap-3">
                  <button
                    onClick={goPrev}
                    disabled={currentIdx <= 0}
                    className="flex-1 flex items-center justify-center gap-2 py-3 border border-gold/20 text-sm text-gold/60 hover:border-gold/50 hover:text-gold disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Précédent
                  </button>
                  <button
                    onClick={goNext}
                    disabled={currentIdx >= activeRooms.length - 1}
                    className="flex-1 flex items-center justify-center gap-2 py-3 border border-gold/20 text-sm text-gold/60 hover:border-gold/50 hover:text-gold disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  >
                    Suivant <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {completedRooms.length > 0 && (
                  <button
                    onClick={() => navigate("/configurateur/apercu")}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-gold text-ink font-medium tracking-wide text-sm"
                  >
                    <Eye className="w-4 h-4" /> Aperçu Luxe
                  </button>
                )}
              </div>
            </aside>

            {/* Mobile bottom bar */}
            <div className="lg:hidden col-span-full fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-gold/15 p-4 z-50">
              <div className="container flex items-center gap-4">
                <div className="flex-1">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-gold/60">
                    Total estimé
                  </div>
                  <div className="font-display text-xl text-gradient-gold">
                    {totalCost.toLocaleString("fr-FR")} €
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={goPrev}
                    disabled={currentIdx <= 0}
                    className="w-10 h-10 grid place-items-center border border-gold/30 text-gold disabled:opacity-30"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={goNext}
                    disabled={currentIdx >= activeRooms.length - 1}
                    className="w-10 h-10 grid place-items-center border border-gold/30 text-gold disabled:opacity-30"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                {completedRooms.length > 0 && (
                  <button
                    onClick={() => navigate("/configurateur/apercu")}
                    className="px-6 py-3 bg-gradient-gold text-ink text-sm font-medium tracking-wide"
                  >
                    <Eye className="w-4 h-4 inline mr-2" /> Aperçu
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigWizard;
