# Home Configurator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a flagship multi-room home configurator where users customize kitchens, living rooms, bedrooms, lighting, decoration, floors, walls, and furniture — with real-time cost estimation, a luxury 3D preview, and a fully responsive experience.

**Architecture:** A step-based wizard UI (one room/category at a time) backed by a React Context that holds the full configuration state. Each room type has its own configurator panel with material/color/furniture pickers. A Three.js 3D viewport renders a simplified room preview. Cost calculation runs reactively from selected options.

**Tech Stack:** React 18 + TypeScript + Tailwind CSS + Framer Motion (page transitions) + React Three Fiber (3D preview) + Zustand or React Context (state) + shadcn/ui primitives

---

## Global Constraints

- French-only UI, luxury brand tone, no emojis as icons
- Noir & Gold design system (`#0D0D0D` bg, `#C9A84C` gold, DM Serif Display headings, Fira Sans body)
- All colors via HSL CSS variables from `index.css`
- React 18.3, Vite 5, React Router v6
- Follow existing component patterns: default exports, `@/` path aliases
- Existing `src/components/hi/` directory structure for feature components
- No new npm dependencies beyond what's already installed (framer-motion, three, @react-three/fiber, @react-three/drei all present)
- Responsive: mobile-first, breakpoints at `sm` (640), `md` (768), `lg` (1024), `xl` (1280)

---

## File Structure

### New Files

| File | Responsibility |
|------|---------------|
| `src/lib/configurator-data.ts` | All room types, material options, color palettes, furniture catalog, pricing |
| `src/contexts/ConfiguratorContext.tsx` | Global configurator state (rooms, selections, cost) |
| `src/components/hi/configurator/ConfigWizard.tsx` | Step wizard shell (progress bar, nav, room panels) |
| `src/components/hi/configurator/RoomSelector.tsx` | Room type cards grid (Kitchen, Living Room, etc.) |
| `src/components/hi/configurator/panels/KitchenPanel.tsx` | Kitchen configurator (countertop, cabinets, island, appliances) |
| `src/components/hi/configurator/panels/LivingRoomPanel.tsx` | Living room (sofa, rug, shelves, accent wall) |
| `src/components/hi/configurator/panels/BedroomPanel.tsx` | Bedroom (bed, nightstands, wardrobe, headboard) |
| `src/components/hi/configurator/panels/LightingPanel.tsx` | Lighting (chandeliers, sconces, floor lamps, dimmer) |
| `src/components/hi/configurator/panels/DecorationPanel.tsx` | Decoration (art, plants, mirrors, vases) |
| `src/components/hi/configurator/panels/FloorPanel.tsx` | Flooring (hardwood, marble, carpet, herringbone) |
| `src/components/hi/configurator/panels/WallsPanel.tsx` | Walls (paint, wallpaper, wainscoting, panels) |
| `src/components/hi/configurator/panels/FurniturePanel.tsx` | Furniture (tables, chairs, shelving, storage) |
| `src/components/hi/configurator/OptionCard.tsx` | Reusable selectable option card (image + label + price delta) |
| `src/components/hi/configurator/ColorPicker.tsx` | Color/pattern picker grid |
| `src/components/hi/configurator/CostSummary.tsx` | Running cost estimate sidebar |
| `src/components/hi/configurator/LuxuryPreview.tsx` | 3D room preview with React Three Fiber |
| `src/components/hi/configurator/room-scenes/RoomScene.tsx` | 3D scene builder (floor, walls, furniture based on config) |
| `src/pages/hi/Configurator.tsx` | Page wrapper for the configurator route |
| `src/pages/hi/ConfigPreview.tsx` | Full-screen luxury preview + summary page |

### Modified Files

| File | Change |
|------|--------|
| `src/App.tsx` | Add `/configurateur` and `/configurateur/apercu` routes |
| `src/components/hi/Navbar.tsx` | Add "Configurateur" nav link |

---

## Tasks

### Task 1: Data Layer — Configurator Options & Pricing

**Files:**
- Create: `src/lib/configurator-data.ts`

**Interfaces:**
- Consumes: nothing (foundational)
- Produces: `RoomType`, `ConfigOption`, `RoomConfig`, `CONFIG_DEFAULTS`, `calculateRoomCost()`, `calculateTotalCost()`

- [ ] **Step 1: Create `src/lib/configurator-data.ts`**

```typescript
// src/lib/configurator-data.ts

export type RoomType =
  | "kitchen"
  | "living-room"
  | "bedroom"
  | "lighting"
  | "decoration"
  | "floor"
  | "walls"
  | "furniture";

export type ConfigOption = {
  id: string;
  name: string;
  description?: string;
  priceDelta: number; // added to base room cost
  image?: string;
  color?: string; // hex for color swatches
  material?: string;
  category?: string; // sub-grouping within a room
};

export type RoomConfig = {
  type: RoomType;
  name: string;
  icon: string; // lucide icon name
  tagline: string;
  image: string; // category image from existing assets
  basePrice: number;
  options: ConfigOption[];
  selections: Record<string, string>; // optionId -> value or optionId
};

export type FullConfig = {
  rooms: Record<RoomType, RoomConfig>;
  activeRooms: RoomType[]; // rooms user has customized
};

const catSalon = "@/assets/hero-salon.jpg";
const catCuisine = "@/assets/cat-cuisine.jpg";
const catChambre = "@/assets/cat-chambre.jpg";
const catEclairage = "@/assets/cat-eclairage.jpg";
const catAmenagement = "@/assets/cat-amenagement.jpg";

export const ROOM_META: Record<RoomType, Omit<RoomConfig, "selections">> = {
  kitchen: {
    type: "kitchen",
    name: "Cuisine",
    icon: "ChefHat",
    tagline: "L'art culinaire, signé Home Idea",
    image: catCuisine,
    basePrice: 15000,
    options: [
      { id: "k-count-marble", name: "Plan Marbre Carrara", priceDelta: 3200, category: "Plan de travail", material: "Marbre Carrara" },
      { id: "k-count-quartz", name: "Plan Quartz Noir", priceDelta: 2400, category: "Plan de travail", material: "Quartz" },
      { id: "k-count-wood", name: "Plan Chêne Massif", priceDelta: 1800, category: "Plan de travail", material: "Chêne" },
      { id: "k-cab-mat", name: "Façades Mat Noir", priceDelta: 0, category: "Façades", color: "#1a1a1a" },
      { id: "k-cab-gloss", name: "Façades Laqué Brillant", priceDelta: 1500, category: "Façades", color: "#0d0d0d" },
      { id: "k-cab-wood", name: "Façades Noyer", priceDelta: 2200, category: "Façades", color: "#5c3d2e" },
      { id: "k-island-yes", name: "Îlot Central", priceDelta: 4500, category: "Îlot" },
      { id: "k-island-no", name: "Sans Îlot", priceDelta: 0, category: "Îlot" },
      { id: "k-appl-premium", name: "Électroménager Premium", priceDelta: 8000, category: "Équipement" },
      { id: "k-appl-standard", name: "Électroménager Standard", priceDelta: 0, category: "Équipement" },
      { id: "k-faucet-gold", name: "Robinetterie Laiton Doré", priceDelta: 600, category: "Robinetterie", color: "#c9a84c" },
      { id: "k-faucet-chrome", name: "Robinetterie Chrome", priceDelta: 0, category: "Robinetterie", color: "#c0c0c0" },
    ],
  },
  "living-room": {
    type: "living-room",
    name: "Salon",
    icon: "Sofa",
    tagline: "Confort sculpté, présence silencieuse",
    image: catSalon,
    basePrice: 8000,
    options: [
      { id: "lr-sofa-leather", name: "Canapé Cuir Noir", priceDelta: 4200, category: "Canapé", material: "Cuir" },
      { id: "lr-sofa-velvet", name: "Canapé Velours Impérial", priceDelta: 3800, category: "Canapé", material: "Velours" },
      { id: "lr-sofa-linen", name: "Canapé Lin Naturel", priceDelta: 2800, category: "Canapé", material: "Lin" },
      { id: "lr-rug-persian", name: "Tapis Persan Noir & Or", priceDelta: 1800, category: "Tapis" },
      { id: "lr-rug-wool", name: "Tapis Laine Nouvelle-Zélande", priceDelta: 1200, category: "Tapis" },
      { id: "lr-rug-none", name: "Sans Tapis", priceDelta: 0, category: "Tapis" },
      { id: "lr-shelf-custom", name: "Bibliothèque Sur Mesure", priceDelta: 3200, category: "Rangement" },
      { id: "lr-shelf-none", name: "Sans Rangement", priceDelta: 0, category: "Rangement" },
      { id: "lr-wall-marble", name: "Mur Marbre Fendu", priceDelta: 2800, category: "Mur d'accent" },
      { id: "lr-wall-wood", name: "Panneau Bois Doré", priceDelta: 1800, category: "Mur d'accent" },
      { id: "lr-wall-none", name: "Sans Mur d'accent", priceDelta: 0, category: "Mur d'accent" },
    ],
  },
  bedroom: {
    type: "bedroom",
    name: "Chambre",
    icon: "Bed",
    tagline: "Le repos comme rituel",
    image: catChambre,
    basePrice: 6000,
    options: [
      { id: "b-bed-upholstered", name: "Lit Capitonné Velours", priceDelta: 3200, category: "Lit" },
      { id: "b-bed-wood", name: "Lit Cadre Noyer", priceDelta: 2400, category: "Lit" },
      { id: "b-bed-platform", name: "Lit Plateforme Noir", priceDelta: 1800, category: "Lit" },
      { id: "b-headboard-height", name: "Tête de lit Haute 180cm", priceDelta: 1200, category: "Tête de lit" },
      { id: "b-headboard-panel", name: "Panneau Lumineux LED", priceDelta: 800, category: "Tête de lit" },
      { id: "b-wardrobe-walk", name: "Dressing Walk-in", priceDelta: 5500, category: "Rangement" },
      { id: "b-wardrobe-modular", name: "Dressing Modulaire", priceDelta: 3200, category: "Rangement" },
      { id: "b-nightstand-marble", name: "Chevets Marbre & Laiton", priceDelta: 900, category: "Chevets" },
      { id: "b-nightstand-wood", name: "Chevets Noyer", priceDelta: 600, category: "Chevets" },
    ],
  },
  lighting: {
    type: "lighting",
    name: "Éclairage",
    icon: "Lightbulb",
    tagline: "Sculpter la lumière",
    image: catEclairage,
    basePrice: 3500,
    options: [
      { id: "l-chandelier-crystal", name: "Lustre Cristal Doré", priceDelta: 4200, category: "Lustre" },
      { id: "l-chandelier-modern", name: "Suspension Modulaire LED", priceDelta: 2400, category: "Lustre" },
      { id: "l-chandelier-none", name: "Sans Lustre", priceDelta: 0, category: "Lustre" },
      { id: "l-sconce-gold", name: "Appliques Laiton Brossé", priceDelta: 800, category: "Appliques" },
      { id: "l-sconce-none", name: "Sans Appliques", priceDelta: 0, category: "Appliques" },
      { id: "l-floor-arc", name: "Lampadaire Arche Dorée", priceDelta: 900, category: "Lampadaire" },
      { id: "l-floor-none", name: "Sans Lampadaire", priceDelta: 0, category: "Lampadaire" },
      { id: "l-dimmer-smart", name: "Variateur Connecté", priceDelta: 400, category: "Commande" },
      { id: "l-dimmer-standard", name: "Variateur Standard", priceDelta: 0, category: "Commande" },
    ],
  },
  decoration: {
    type: "decoration",
    name: "Décoration",
    icon: "Frame",
    tagline: "Les détails qui font la différence",
    image: catAmenagement,
    basePrice: 2000,
    options: [
      { id: "d-art-painting", name: "Tableau Signature", priceDelta: 1800, category: "Art" },
      { id: "d-art-sculpture", name: "Sculpture Abstraite", priceDelta: 2400, category: "Art" },
      { id: "d-art-none", name: "Sans Art", priceDelta: 0, category: "Art" },
      { id: "d-plant-ficus", name: "Ficus Artificial Premium", priceDelta: 350, category: "Végétaux" },
      { id: "d-plant-orchid", name: "Orchidée Blanche", priceDelta: 200, category: "Végétaux" },
      { id: "d-plant-none", name: "Sans Végétal", priceDelta: 0, category: "Végétaux" },
      { id: "d-mirror-round", name: "Miroir Rond Doré", priceDelta: 600, category: "Miroir" },
      { id: "d-mirror-none", name: "Sans Miroir", priceDelta: 0, category: "Miroir" },
      { id: "d-vase-marble", name: "Vase Marbre Noir", priceDelta: 280, category: "Accessoires" },
      { id: "d-vase-none", name: "Sans Accessoire", priceDelta: 0, category: "Accessoires" },
    ],
  },
  floor: {
    type: "floor",
    name: "Sol",
    icon: "Layers",
    tagline: "La fondation de l'élégance",
    image: catSalon,
    basePrice: 5000,
    options: [
      { id: "f-hardwood-oak", name: "Parquet Chêne Massif", priceDelta: 0, category: "Parquet", color: "#8B7355" },
      { id: "f-hardwood-walnut", name: "Parquet Noyer", priceDelta: 1800, category: "Parquet", color: "#5c3d2e" },
      { id: "f-marble-carrara", name: "Marbre Carrara", priceDelta: 4500, category: "Marbre", color: "#f0f0f0" },
      { id: "f-marble-noir", name: "Marbre Noir Marquina", priceDelta: 5200, category: "Marbre", color: "#1a1a1a" },
      { id: "f-herringbone", name: "Chevron Chêne Doré", priceDelta: 3200, category: "Parquet", color: "#b8963e" },
      { id: "f-carpet-wool", name: "Moquette Laine Grise", priceDelta: 2000, category: "Moquette", color: "#666" },
      { id: "f-tile-cement", name: "Carrelage Ciment", priceDelta: 2800, category: "Carrelage", color: "#7a7a6e" },
    ],
  },
  walls: {
    type: "walls",
    name: "Murs",
    icon: "Square",
    tagline: "L'enveloppe de votre univers",
    image: catSalon,
    basePrice: 4000,
    options: [
      { id: "w-paint-noir", name: "Peinture Noir Profond", priceDelta: 0, category: "Peinture", color: "#0d0d0d" },
      { id: "w-paint-charcoal", name: "Peinture Anthracite", priceDelta: 0, category: "Peinture", color: "#333" },
      { id: "w-paint-ivory", name: "Peinture Ivoire", priceDelta: 0, category: "Peinture", color: "#f5f0e8" },
      { id: "w-wallpaper-gold", name: "Papier Peint Or Mat", priceDelta: 2200, category: "Papier peint", color: "#c9a84c" },
      { id: "w-wallpaper-dark", name: "Papier Peint Nocturne", priceDelta: 1800, category: "Papier peint", color: "#1a1a2e" },
      { id: "w-wainscot", name: "Lambris Haute Tranche", priceDelta: 3500, category: "Lambris" },
      { id: "w-panel-mdf", name: "Panneaux MDF Laqué", priceDelta: 2800, category: "Panneaux" },
      { id: "w-panel-wood", name: "Panneaux Bois Naturel", priceDelta: 3200, category: "Panneaux" },
    ],
  },
  furniture: {
    type: "furniture",
    name: "Mobilier",
    icon: "Armchair",
    tagline: "Pièces signées, présences durables",
    image: catAmenagement,
    basePrice: 4000,
    options: [
      { id: "fu-table-marble", name: "Table Basse Marbre", priceDelta: 2400, category: "Table" },
      { id: "fu-table-wood", name: "Table Basse Noyer", priceDelta: 1200, category: "Table" },
      { id: "fu-table-glass", name: "Table Basse Verre Fumé", priceDelta: 1800, category: "Table" },
      { id: "fu-chair-accent", name: "Fauteuil Accent Velours", priceDelta: 1290, category: "Fauteuil" },
      { id: "fu-chair-leather", name: "Fauteuil Cuir Noir", priceDelta: 1800, category: "Fauteuil" },
      { id: "fu-shelf-wall", name: "Étagère Murale Laiton", priceDelta: 800, category: "Rangement" },
      { id: "fu-cabinet-sideboard", name: "Sideboard Noyer & Or", priceDelta: 2800, category: "Rangement" },
      { id: "fu-console-marble", name: "Console Marbre Doré", priceDelta: 1600, category: "Table" },
    ],
  },
};

export const ROOM_TYPES: RoomType[] = [
  "kitchen",
  "living-room",
  "bedroom",
  "lighting",
  "decoration",
  "floor",
  "walls",
  "furniture",
];

export const createDefaultConfig = (): FullConfig => {
  const rooms: Record<RoomType, RoomConfig> = {} as Record<RoomType, RoomConfig>;
  for (const type of ROOM_TYPES) {
    const meta = ROOM_META[type];
    rooms[type] = { ...meta, selections: {} };
  }
  return { rooms, activeRooms: [] };
};

export const calculateRoomCost = (room: RoomConfig): number => {
  let total = room.basePrice;
  for (const optionId of Object.values(room.selections)) {
    const option = room.options.find((o) => o.id === optionId);
    if (option) total += option.priceDelta;
  }
  return total;
};

export const calculateTotalCost = (config: FullConfig): number => {
  let total = 0;
  for (const type of config.activeRooms) {
    total += calculateRoomCost(config.rooms[type]);
  }
  return total;
};
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /home/shx/Documents/home-idea && npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/configurator-data.ts
git commit -m "feat(configurator): add data layer with room types, options, and pricing"
```

---

### Task 2: Configurator Context — Global State

**Files:**
- Create: `src/contexts/ConfiguratorContext.tsx`

**Interfaces:**
- Consumes: `FullConfig`, `RoomType`, `createDefaultConfig`, `calculateRoomCost`, `calculateTotalCost` from Task 1
- Produces: `ConfiguratorProvider`, `useConfigurator()` hook

- [ ] **Step 1: Create `src/contexts/ConfiguratorContext.tsx`**

```typescript
import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import {
  FullConfig,
  RoomType,
  RoomConfig,
  createDefaultConfig,
  calculateRoomCost,
  calculateTotalCost,
} from "@/lib/configurator-data";

type ConfiguratorContextValue = {
  config: FullConfig;
  setActive: (type: RoomType) => void;
  activeRoom: RoomType | null;
  setOption: (roomType: RoomType, optionId: string) => void;
  removeOption: (roomType: RoomType, optionId: string) => void;
  toggleActiveRoom: (type: RoomType) => void;
  getRoomCost: (type: RoomType) => number;
  totalCost: number;
  completedRooms: RoomType[];
  progress: number; // 0-100
  reset: () => void;
};

const ConfiguratorContext = createContext<ConfiguratorContextValue | undefined>(undefined);

const STORAGE_KEY = "home-idea-config";

export const ConfiguratorProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<FullConfig>(() => {
    if (typeof window === "undefined") return createDefaultConfig();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as FullConfig;
        // Merge with defaults to pick up any new fields
        const defaults = createDefaultConfig();
        for (const type of Object.keys(defaults.rooms) as RoomType[]) {
          if (!parsed.rooms[type]) {
            parsed.rooms[type] = defaults.rooms[type];
          }
        }
        return parsed;
      }
    } catch {}
    return createDefaultConfig();
  });

  const [activeRoom, setActiveRoom] = useState<RoomType | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const setActive = useCallback((type: RoomType) => {
    setActiveRoom(type);
  }, []);

  const toggleActiveRoom = useCallback((type: RoomType) => {
    setConfig((prev) => {
      const isActive = prev.activeRooms.includes(type);
      const activeRooms = isActive
        ? prev.activeRooms.filter((r) => r !== type)
        : [...prev.activeRooms, type];
      return { ...prev, activeRooms };
    });
  }, []);

  const setOption = useCallback((roomType: RoomType, optionId: string) => {
    setConfig((prev) => {
      const room = prev.rooms[roomType];
      const option = room.options.find((o) => o.id === optionId);
      if (!option) return prev;

      // Find the category of this option and replace existing selection in same category
      const category = option.category;
      const newSelections = { ...room.selections };

      // Remove any existing selection in the same category
      if (category) {
        for (const [key, val] of Object.entries(newSelections)) {
          const existingOpt = room.options.find((o) => o.id === key);
          if (existingOpt?.category === category && key !== optionId) {
            delete newSelections[key];
          }
        }
      }

      // Toggle: if same option clicked, deselect it; otherwise select it
      if (newSelections[optionId]) {
        delete newSelections[optionId];
      } else {
        newSelections[optionId] = optionId;
      }

      return {
        ...prev,
        rooms: {
          ...prev.rooms,
          [roomType]: { ...room, selections: newSelections },
        },
      };
    });
  }, []);

  const removeOption = useCallback((roomType: RoomType, optionId: string) => {
    setConfig((prev) => {
      const room = prev.rooms[roomType];
      const newSelections = { ...room.selections };
      delete newSelections[optionId];
      return {
        ...prev,
        rooms: {
          ...prev.rooms,
          [roomType]: { ...room, selections: newSelections },
        },
      };
    });
  }, []);

  const getRoomCost = useCallback(
    (type: RoomType) => calculateRoomCost(config.rooms[type]),
    [config]
  );

  const totalCost = calculateTotalCost(config);

  const completedRooms = config.activeRooms.filter(
    (type) => Object.keys(config.rooms[type].selections).length > 0
  );

  const progress = Math.round(
    (completedRooms.length / Math.max(config.activeRooms.length, 1)) * 100
  );

  const reset = useCallback(() => {
    setConfig(createDefaultConfig());
    setActiveRoom(null);
  }, []);

  return (
    <ConfiguratorContext.Provider
      value={{
        config,
        setActive,
        activeRoom,
        setOption,
        removeOption,
        toggleActiveRoom,
        getRoomCost,
        totalCost,
        completedRooms,
        progress,
        reset,
      }}
    >
      {children}
    </ConfiguratorContext.Provider>
  );
};

export const useConfigurator = () => {
  const ctx = useContext(ConfiguratorContext);
  if (!ctx) throw new Error("useConfigurator must be used within ConfiguratorProvider");
  return ctx;
};
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /home/shx/Documents/home-idea && npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/contexts/ConfiguratorContext.tsx
git commit -m "feat(configurator): add ConfiguratorContext with state management and cost calculation"
```

---

### Task 3: UI Primitives — OptionCard & ColorPicker

**Files:**
- Create: `src/components/hi/configurator/OptionCard.tsx`
- Create: `src/components/hi/configurator/ColorPicker.tsx`

**Interfaces:**
- Consumes: `ConfigOption` from Task 1
- Produces: `<OptionCard>` component, `<ColorPicker>` component

- [ ] **Step 1: Create `src/components/hi/configurator/OptionCard.tsx`**

```typescript
import { ConfigOption } from "@/lib/configurator-data";
import { Check } from "lucide-react";

type OptionCardProps = {
  option: ConfigOption;
  selected: boolean;
  onSelect: (id: string) => void;
};

const OptionCard = ({ option, selected, onSelect }: OptionCardProps) => {
  return (
    <button
      onClick={() => onSelect(option.id)}
      className={`relative group text-left p-4 border transition-all duration-300 ${
        selected
          ? "border-gold bg-gold/10 shadow-gold"
          : "border-gold/15 hover:border-gold/40 bg-card"
      }`}
    >
      {selected && (
        <div className="absolute top-3 right-3 w-6 h-6 grid place-items-center bg-gradient-gold text-ink">
          <Check className="w-3.5 h-3.5" />
        </div>
      )}

      {option.color && (
        <div
          className="w-full h-16 mb-3 border border-gold/20"
          style={{ backgroundColor: option.color }}
        />
      )}

      {option.material && (
        <div className="text-[10px] tracking-[0.2em] uppercase text-gold/60 mb-1">
          {option.material}
        </div>
      )}

      <h4 className="font-display text-sm mb-1 group-hover:text-gold transition-colors">
        {option.name}
      </h4>

      {option.description && (
        <p className="text-xs text-muted-foreground mb-2">{option.description}</p>
      )}

      <div className="text-sm text-gold">
        {option.priceDelta > 0
          ? `+ ${option.priceDelta.toLocaleString("fr-FR")} €`
          : option.priceDelta === 0
          ? "Inclus"
          : ""}
      </div>
    </button>
  );
};

export default OptionCard;
```

- [ ] **Step 2: Create `src/components/hi/configurator/ColorPicker.tsx`**

```typescript
import { ConfigOption } from "@/lib/configurator-data";
import { Check } from "lucide-react";

type ColorPickerProps = {
  options: ConfigOption[];
  selected: string;
  onSelect: (id: string) => void;
};

const ColorPicker = ({ options, selected, onSelect }: ColorPickerProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onSelect(opt.id)}
          className="group relative flex flex-col items-center gap-2"
          title={opt.name}
        >
          <div
            className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
              selected === opt.id
                ? "border-gold scale-110 shadow-gold"
                : "border-gold/30 hover:border-gold/60 hover:scale-105"
            }`}
            style={{ backgroundColor: opt.color || "#333" }}
          >
            {selected === opt.id && (
              <div className="w-full h-full grid place-items-center">
                <Check className="w-4 h-4 text-gold drop-shadow-lg" />
              </div>
            )}
          </div>
          <span className="text-[10px] tracking-wider text-muted-foreground group-hover:text-gold transition-colors text-center leading-tight max-w-[70px]">
            {opt.name.split(" ").slice(-1)}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ColorPicker;
```

- [ ] **Step 3: Verify it compiles**

Run: `cd /home/shx/Documents/home-idea && npx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/components/hi/configurator/OptionCard.tsx src/components/hi/configurator/ColorPicker.tsx
git commit -m "feat(configurator): add OptionCard and ColorPicker UI primitives"
```

---

### Task 4: Room Selector — Entry Point

**Files:**
- Create: `src/components/hi/configurator/RoomSelector.tsx`

**Interfaces:**
- Consumes: `useConfigurator()` from Task 2, `ROOM_TYPES`, `ROOM_META` from Task 1
- Produces: `<RoomSelector>` component

- [ ] **Step 1: Create `src/components/hi/configurator/RoomSelector.tsx`**

```typescript
import { ROOM_TYPES, ROOM_META, RoomType } from "@/lib/configurator-data";
import { useConfigurator } from "@/contexts/ConfiguratorContext";
import {
  ChefHat,
  Sofa,
  Bed,
  Lightbulb,
  Frame,
  Layers,
  Square,
  Armchair,
  Check,
} from "lucide-react";

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

const RoomSelector = () => {
  const { config, toggleActiveRoom, setActive } = useConfigurator();

  return (
    <div>
      <div className="text-center mb-12">
        <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">
          Étape 1
        </div>
        <h2 className="font-display text-3xl lg:text-5xl mb-4">
          Choisissez vos espaces
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Sélectionnez les pièces que vous souhaitez personnaliser. Chaque espace
          devient une toile pour votre vision.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {ROOM_TYPES.map((type) => {
          const meta = ROOM_META[type];
          const isActive = config.activeRooms.includes(type);
          const Icon = ICON_MAP[meta.icon] || Square;
          const hasSelections = Object.keys(config.rooms[type].selections).length > 0;

          return (
            <button
              key={type}
              onClick={() => toggleActiveRoom(type)}
              className={`group relative aspect-[3/4] overflow-hidden border transition-all duration-500 ${
                isActive
                  ? "border-gold shadow-gold"
                  : "border-gold/15 hover:border-gold/50"
              }`}
            >
              <img
                src={meta.image}
                alt={meta.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />

              {isActive && (
                <div className="absolute top-3 right-3 w-7 h-7 grid place-items-center bg-gradient-gold text-ink">
                  <Check className="w-4 h-4" />
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <Icon className="w-6 h-6 text-gold mb-2" />
                <h3 className="font-display text-xl mb-1">{meta.name}</h3>
                <p className="text-[10px] tracking-[0.2em] uppercase text-gold/60">
                  {meta.tagline}
                </p>
                {isActive && hasSelections && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActive(type);
                    }}
                    className="mt-3 text-[10px] tracking-[0.2em] uppercase text-gold border-b border-gold/40 pb-0.5 hover:text-gold-soft transition-colors"
                  >
                    Personnaliser →
                  </button>
                )}
                {isActive && !hasSelections && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActive(type);
                    }}
                    className="mt-3 text-[10px] tracking-[0.2em] uppercase text-gold border-b border-gold/40 pb-0.5 hover:text-gold-soft transition-colors"
                  >
                    Commencer →
                  </button>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RoomSelector;
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /home/shx/Documents/home-idea && npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/hi/configurator/RoomSelector.tsx
git commit -m "feat(configurator): add RoomSelector with toggle activation"
```

---

### Task 5: Room Configurator Panels

**Files:**
- Create: `src/components/hi/configurator/panels/KitchenPanel.tsx`
- Create: `src/components/hi/configurator/panels/LivingRoomPanel.tsx`
- Create: `src/components/hi/configurator/panels/BedroomPanel.tsx`
- Create: `src/components/hi/configurator/panels/LightingPanel.tsx`
- Create: `src/components/hi/configurator/panels/DecorationPanel.tsx`
- Create: `src/components/hi/configurator/panels/FloorPanel.tsx`
- Create: `src/components/hi/configurator/panels/WallsPanel.tsx`
- Create: `src/components/hi/configurator/panels/FurniturePanel.tsx`
- Create: `src/components/hi/configurator/panels/RoomPanel.tsx` (shared base)

**Interfaces:**
- Consumes: `useConfigurator()` from Task 2, `OptionCard` and `ColorPicker` from Task 3, `RoomConfig`, `ConfigOption` from Task 1
- Produces: `<RoomPanel>` base component + 8 specialized panels

- [ ] **Step 1: Create `src/components/hi/configurator/panels/RoomPanel.tsx`**

This is the shared base that all room panels use. It groups options by category and renders them in sections.

```typescript
import { RoomType } from "@/lib/configurator-data";
import { useConfigurator } from "@/contexts/ConfiguratorContext";
import OptionCard from "@/components/hi/configurator/OptionCard";
import ColorPicker from "@/components/hi/configurator/ColorPicker";

type RoomPanelProps = {
  roomType: RoomType;
};

const RoomPanel = ({ roomType }: RoomPanelProps) => {
  const { config, setOption, getRoomCost } = useConfigurator();
  const room = config.rooms[roomType];

  // Group options by category
  const categories = room.options.reduce<Record<string, typeof room.options>>((acc, opt) => {
    const cat = opt.category || "Autre";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(opt);
    return acc;
  }, {});

  const hasColorOptions = room.options.some((o) => o.color);

  return (
    <div className="space-y-10">
      {Object.entries(categories).map(([category, options]) => {
        const isColorCategory = options.every((o) => o.color && options.length <= 8);

        return (
          <div key={category}>
            <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4 flex items-center gap-3">
              <span>{category}</span>
              <div className="flex-1 h-px bg-gold/15" />
            </div>

            {isColorCategory ? (
              <ColorPicker
                options={options}
                selected={Object.values(room.selections).find((id) =>
                  options.some((o) => o.id === id)
                ) || ""}
                onSelect={(id) => setOption(roomType, id)}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {options.map((opt) => (
                  <OptionCard
                    key={opt.id}
                    option={opt}
                    selected={!!room.selections[opt.id]}
                    onSelect={(id) => setOption(roomType, id)}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RoomPanel;
```

- [ ] **Step 2: Create all 8 room panels**

Each is a thin wrapper that passes the room type to `RoomPanel`:

```typescript
// src/components/hi/configurator/panels/KitchenPanel.tsx
import RoomPanel from "./RoomPanel";
const KitchenPanel = () => <RoomPanel roomType="kitchen" />;
export default KitchenPanel;

// src/components/hi/configurator/panels/LivingRoomPanel.tsx
import RoomPanel from "./RoomPanel";
const LivingRoomPanel = () => <RoomPanel roomType="living-room" />;
export default LivingRoomPanel;

// src/components/hi/configurator/panels/BedroomPanel.tsx
import RoomPanel from "./RoomPanel";
const BedroomPanel = () => <RoomPanel roomType="bedroom" />;
export default BedroomPanel;

// src/components/hi/configurator/panels/LightingPanel.tsx
import RoomPanel from "./RoomPanel";
const LightingPanel = () => <RoomPanel roomType="lighting" />;
export default LightingPanel;

// src/components/hi/configurator/panels/DecorationPanel.tsx
import RoomPanel from "./RoomPanel";
const DecorationPanel = () => <RoomPanel roomType="decoration" />;
export default DecorationPanel;

// src/components/hi/configurator/panels/FloorPanel.tsx
import RoomPanel from "./RoomPanel";
const FloorPanel = () => <RoomPanel roomType="floor" />;
export default FloorPanel;

// src/components/hi/configurator/panels/WallsPanel.tsx
import RoomPanel from "./RoomPanel";
const WallsPanel = () => <RoomPanel roomType="walls" />;
export default WallsPanel;

// src/components/hi/configurator/panels/FurniturePanel.tsx
import RoomPanel from "./RoomPanel";
const FurniturePanel = () => <RoomPanel roomType="furniture" />;
export default FurniturePanel;
```

- [ ] **Step 3: Verify it compiles**

Run: `cd /home/shx/Documents/home-idea && npx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/components/hi/configurator/panels/
git commit -m "feat(configurator): add room panels with category grouping and option selection"
```

---

### Task 6: Cost Summary Sidebar

**Files:**
- Create: `src/components/hi/configurator/CostSummary.tsx`

**Interfaces:**
- Consumes: `useConfigurator()` from Task 2
- Produces: `<CostSummary>` component

- [ ] **Step 1: Create `src/components/hi/configurator/CostSummary.tsx`**

```typescript
import { useConfigurator } from "@/contexts/ConfiguratorContext";
import { ROOM_META, ROOM_TYPES } from "@/lib/configurator-data";
import { Calculator, ChevronRight } from "lucide-react";

const CostSummary = () => {
  const { config, activeRoom, totalCost, getRoomCost } = useConfigurator();

  return (
    <div className="border border-gold/15 bg-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 grid place-items-center border border-gold/30">
          <Calculator className="w-5 h-5 text-gold" />
        </div>
        <div>
          <h3 className="font-display text-lg">Estimation</h3>
          <p className="text-[10px] tracking-[0.2em] uppercase text-gold/60">
            Budget prévisionnel
          </p>
        </div>
      </div>

      {/* Active rooms breakdown */}
      <div className="space-y-3 mb-6">
        {config.activeRooms.map((type) => {
          const meta = ROOM_META[type];
          const cost = getRoomCost(type);
          const room = config.rooms[type];
          const selectionCount = Object.keys(room.selections).length;

          return (
            <div
              key={type}
              className={`flex items-center justify-between py-2 px-3 transition-colors ${
                activeRoom === type ? "bg-gold/10 border-l-2 border-gold" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{meta.name}</span>
                {selectionCount > 0 && (
                  <span className="text-[10px] text-gold/60">
                    ({selectionCount})
                  </span>
                )}
              </div>
              <span className="text-sm text-gold font-medium">
                {cost.toLocaleString("fr-FR")} €
              </span>
            </div>
          );
        })}
      </div>

      {config.activeRooms.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-6">
          Sélectionnez des espaces pour commencer
        </p>
      )}

      {/* Total */}
      {config.activeRooms.length > 0 && (
        <div className="border-t border-gold/15 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm tracking-[0.15em] uppercase text-gold">
              Total estimé
            </span>
            <span className="font-display text-2xl text-gradient-gold">
              {totalCost.toLocaleString("fr-FR")} €
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">
            * Estimation indicative. Prix finaux sur devis.
          </p>
        </div>
      )}
    </div>
  );
};

export default CostSummary;
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /home/shx/Documents/home-idea && npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/hi/configurator/CostSummary.tsx
git commit -m "feat(configurator): add CostSummary with room breakdown and total"
```

---

### Task 7: Config Wizard Shell

**Files:**
- Create: `src/components/hi/configurator/ConfigWizard.tsx`

**Interfaces:**
- Consumes: `useConfigurator()` from Task 2, `RoomSelector` from Task 4, all room panels from Task 5, `CostSummary` from Task 6
- Produces: `<ConfigWizard>` component (full wizard UI with progress, room nav, panel content)

- [ ] **Step 1: Create `src/components/hi/configurator/ConfigWizard.tsx`**

```typescript
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
                {activeRooms.map((type, i) => {
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

                {/* Back to rooms */}
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

                {/* Navigation */}
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

                {/* Preview CTA */}
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
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /home/shx/Documents/home-idea && npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/hi/configurator/ConfigWizard.tsx
git commit -m "feat(configurator): add ConfigWizard with step navigation and responsive layout"
```

---

### Task 8: Luxury Preview — 3D Scene

**Files:**
- Create: `src/components/hi/configurator/LuxuryPreview.tsx`
- Create: `src/components/hi/configurator/room-scenes/RoomScene.tsx`

**Interfaces:**
- Consumes: `useConfigurator()` from Task 2
- Produces: `<LuxuryPreview>` component with 3D scene

- [ ] **Step 1: Create `src/components/hi/configurator/room-scenes/RoomScene.tsx`**

A simplified 3D room preview that reflects user selections.

```typescript
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Text3D, Center, RoundedBox } from "@react-three/drei";
import { useConfigurator } from "@/contexts/ConfiguratorContext";
import * as THREE from "three";

function Room() {
  const { config } = useConfigurator();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  // Get floor color from selections
  const floorSelections = Object.values(config.rooms.floor.selections);
  const floorColor = useMemo(() => {
    if (floorSelections.length === 0) return "#8B7355";
    const opt = config.rooms.floor.options.find((o) => o.id === floorSelections[0]);
    return opt?.color || "#8B7355";
  }, [floorSelections, config.rooms.floor.options]);

  // Get wall color
  const wallSelections = Object.values(config.rooms.walls.selections);
  const wallColor = useMemo(() => {
    if (wallSelections.length === 0) return "#1a1a1a";
    const opt = config.rooms.walls.options.find((o) => o.id === wallSelections[0]);
    return opt?.color || "#1a1a1a";
  }, [wallSelections, config.rooms.walls.options]);

  // Check for furniture selections
  const hasSofa = config.rooms["living-room"].selections["lr-sofa-leather"] ||
    config.rooms["living-room"].selections["lr-sofa-velvet"] ||
    config.rooms["living-room"].selections["lr-sofa-linen"];

  const hasBed = config.rooms.bedroom.selections["b-bed-upholstered"] ||
    config.rooms.bedroom.selections["b-bed-wood"] ||
    config.rooms.bedroom.selections["b-bed-platform"];

  const hasTable = config.rooms.furniture.selections["fu-table-marble"] ||
    config.rooms.furniture.selections["fu-table-wood"] ||
    config.rooms.furniture.selections["fu-table-glass"];

  const hasChandelier = config.rooms.lighting.selections["l-chandelier-crystal"] ||
    config.rooms.lighting.selections["l-chandelier-modern"];

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color={floorColor} roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 2, -4]} receiveShadow>
        <planeGeometry args={[8, 4]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-4, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 4]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </mesh>

      {/* Gold accent strip on floor edge */}
      <mesh position={[0, 0.01, -3.95]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 0.1]} />
        <meshStandardMaterial color="#c9a84c" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Sofa if selected */}
      {hasSofa && (
        <group position={[0, 0.4, -2.5]}>
          <RoundedBox args={[3, 0.8, 1.2]} radius={0.1} position={[0, 0, 0]}>
            <meshStandardMaterial color="#1a1a2e" roughness={0.6} />
          </RoundedBox>
          <RoundedBox args={[3, 0.6, 0.2]} radius={0.08} position={[0, 0.5, -0.5]}>
            <meshStandardMaterial color="#1a1a2e" roughness={0.6} />
          </RoundedBox>
        </group>
      )}

      {/* Bed if selected */}
      {hasBed && (
        <group position={[0, 0.3, -2.5]}>
          <RoundedBox args={[2.5, 0.5, 3]} radius={0.05} position={[0, 0, 0]}>
            <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
          </RoundedBox>
          <RoundedBox args={[2.5, 1.2, 0.3]} radius={0.05} position={[0, 0.5, -1.35]}>
            <meshStandardMaterial color="#c9a84c" metalness={0.3} roughness={0.4} />
          </RoundedBox>
        </group>
      )}

      {/* Coffee table if selected */}
      {hasTable && (
        <RoundedBox args={[1.2, 0.3, 0.8]} radius={0.05} position={[0, 0.15, -0.5]}>
          <meshStandardMaterial color="#f0f0f0" roughness={0.1} metalness={0.2} />
        </RoundedBox>
      )}

      {/* Chandelier if selected */}
      {hasChandelier && (
        <group position={[0, 3.5, -2]}>
          <mesh>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial
              color="#c9a84c"
              metalness={0.9}
              roughness={0.1}
              emissive="#c9a84c"
              emissiveIntensity={0.3}
            />
          </mesh>
          <pointLight position={[0, -0.5, 0]} intensity={2} color="#f0d78c" distance={8} />
        </group>
      )}

      {/* Ambient gold particles */}
      <GoldParticles />
    </group>
  );
}

function GoldParticles() {
  const count = 40;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = Math.random() * 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#c9a84c" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

const RoomScene = () => {
  return (
    <Canvas
      camera={{ position: [5, 4, 5], fov: 50 }}
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1} castShadow />
      <pointLight position={[0, 4, 0]} intensity={0.5} color="#f0d78c" />
      <Room />
      <Environment preset="apartment" />
    </Canvas>
  );
};

export default RoomScene;
```

- [ ] **Step 2: Create `src/components/hi/configurator/LuxuryPreview.tsx`**

```typescript
import { useNavigate } from "react-router-dom";
import { useConfigurator } from "@/contexts/ConfiguratorContext";
import { ROOM_META, ROOM_TYPES, calculateRoomCost } from "@/lib/configurator-data";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { Suspense } from "react";
import { toast } from "sonner";

const RoomScene = React.lazy(() => import("./room-scenes/RoomScene"));

const LuxuryPreview = () => {
  const { config, totalCost, completedRooms } = useConfigurator();
  const navigate = useNavigate();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Lien copié dans le presse-papier");
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate("/configurateur")}
            className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-gold hover:text-gold-soft transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Retour au configurateur
          </button>
        </div>

        <div className="text-center mb-12">
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">
            Aperçu Luxe
          </div>
          <h1 className="font-display text-4xl lg:text-6xl mb-4">
            Votre Vision
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto italic">
            Une preview de votre espace personnalisé, avec estimation détaillée.
          </p>
        </div>

        {/* 3D Preview */}
        <div className="relative aspect-video max-w-4xl mx-auto mb-16 gold-border shadow-deep overflow-hidden bg-ink">
          <div className="absolute inset-0">
            <Suspense
              fallback={
                <div className="w-full h-full grid place-items-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-xs tracking-[0.2em] uppercase text-gold/60">
                      Chargement de la scène 3D…
                    </p>
                  </div>
                </div>
              }
            >
              <RoomScene />
            </Suspense>
          </div>
          <div className="absolute bottom-4 left-4 text-[10px] tracking-[0.2em] uppercase text-gold/50 bg-background/60 backdrop-blur px-3 py-1.5">
            Aperçu 3D interactif — rotation automatique
          </div>
        </div>

        {/* Summary grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {completedRooms.map((type) => {
            const meta = ROOM_META[type];
            const room = config.rooms[type];
            const cost = calculateRoomCost(room);
            const selections = Object.values(room.selections)
              .map((id) => room.options.find((o) => o.id === id))
              .filter(Boolean);

            return (
              <div
                key={type}
                className="border border-gold/15 p-6 hover:border-gold/40 transition-colors"
              >
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">
                  {meta.name}
                </div>
                <ul className="space-y-1 mb-4">
                  {selections.map((opt) => (
                    <li key={opt!.id} className="text-sm text-foreground/80">
                      — {opt!.name}
                    </li>
                  ))}
                </ul>
                <div className="text-sm text-gold font-medium">
                  {cost.toLocaleString("fr-FR")} €
                </div>
              </div>
            );
          })}
        </div>

        {/* Total */}
        <div className="text-center py-12 border-t border-b border-gold/15 mb-12">
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">
            Investissement total
          </div>
          <div className="font-display text-5xl lg:text-7xl text-gradient-gold mb-4">
            {totalCost.toLocaleString("fr-FR")} €
          </div>
          <p className="text-sm text-muted-foreground">
            Estimation indicative. Contactez-nous pour un devis personnalisé.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-8 py-4 border border-gold/40 text-sm text-gold hover:border-gold hover:bg-gold/10 transition-colors"
          >
            <Share2 className="w-4 h-4" /> Partager ma configuration
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="flex items-center gap-3 px-10 py-4 bg-gradient-gold text-ink font-medium tracking-wide text-sm"
          >
            Demander un devis gratuit
          </button>
        </div>
      </div>
    </div>
  );
};

export default LuxuryPreview;
```

- [ ] **Step 3: Verify it compiles**

Run: `cd /home/shx/Documents/home-idea && npx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/components/hi/configurator/LuxuryPreview.tsx src/components/hi/configurator/room-scenes/RoomScene.tsx
git commit -m "feat(configurator): add LuxuryPreview with 3D room scene"
```

---

### Task 9: Page Wrappers + Route Integration

**Files:**
- Create: `src/pages/hi/Configurator.tsx`
- Create: `src/pages/hi/ConfigPreview.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/hi/Navbar.tsx`

**Interfaces:**
- Consumes: `ConfiguratorProvider` from Task 2, `ConfigWizard` from Task 7, `LuxuryPreview` from Task 8
- Produces: Page components and routing

- [ ] **Step 1: Create `src/pages/hi/Configurator.tsx`**

```typescript
import { ConfiguratorProvider } from "@/contexts/ConfiguratorContext";
import ConfigWizard from "@/components/hi/configurator/ConfigWizard";

const Configurator = () => (
  <ConfiguratorProvider>
    <ConfigWizard />
  </ConfiguratorProvider>
);

export default Configurator;
```

- [ ] **Step 2: Create `src/pages/hi/ConfigPreview.tsx`**

```typescript
import { ConfiguratorProvider } from "@/contexts/ConfiguratorContext";
import LuxuryPreview from "@/components/hi/configurator/LuxuryPreview";

const ConfigPreview = () => (
  <ConfiguratorProvider>
    <LuxuryPreview />
  </ConfiguratorProvider>
);

export default ConfigPreview;
```

- [ ] **Step 3: Add routes to `src/App.tsx`**

Add these imports:
```typescript
import Configurator from "./pages/hi/Configurator";
import ConfigPreview from "./pages/hi/ConfigPreview";
```

Add these routes inside `<Routes>`:
```typescript
<Route path="/configurateur" element={<Configurator />} />
<Route path="/configurateur/apercu" element={<ConfigPreview />} />
```

- [ ] **Step 4: Add nav link to `src/components/hi/Navbar.tsx`**

Add in the desktop nav (after "Collection" link):
```typescript
<NavLink to="/configurateur" className="link-gold">Configurateur</NavLink>
```

Add in the mobile nav:
```typescript
<NavLink onClick={() => setOpen(false)} to="/configurateur" className="link-gold">Configurateur</NavLink>
```

- [ ] **Step 5: Verify it compiles**

Run: `cd /home/shx/Documents/home-idea && npx tsc --noEmit`
Expected: no errors

- [ ] **Step 6: Run full build**

Run: `cd /home/shx/Documents/home-idea && npx vite build`
Expected: success

- [ ] **Step 7: Commit**

```bash
git add src/pages/hi/Configurator.tsx src/pages/hi/ConfigPreview.tsx src/App.tsx src/components/hi/Navbar.tsx
git commit -m "feat(configurator): add Configurator and ConfigPreview pages with routes and nav"
```

---

### Task 10: Add Home Page CTA + Final Polish

**Files:**
- Modify: `src/components/hi/home/AmenagementCTA.tsx` (or create a new `ConfiguratorCTA.tsx`)

**Interfaces:**
- Consumes: existing home page patterns
- Produces: CTA section linking to configurator

- [ ] **Step 1: Create `src/components/hi/home/ConfiguratorCTA.tsx`**

```typescript
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const ConfiguratorCTA = () => {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink/80" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-gold/30 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-gold/20 blur-[100px]" />
        </div>
      </div>

      <div className="container relative">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-gold/30 mb-8">
            <Sparkles className="w-3 h-3 text-gold" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-gold">
              Nouveau — Configurateur
            </span>
          </div>

          <h2 className="font-display text-4xl lg:text-6xl mb-6">
            Concevez votre
            <br />
            <span className="text-gradient-gold">espace sur mesure</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-10 italic max-w-lg mx-auto">
            Choisissez chaque détail — du sol au plafond — et visualisez votre
            intérieur de luxe en temps réel.
          </p>

          <Link
            to="/configurateur"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-gold text-ink font-medium tracking-wide text-sm hover:opacity-90 transition-opacity"
          >
            Lancer le configurateur
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ConfiguratorCTA;
```

- [ ] **Step 2: Add it to Home page**

In `src/pages/hi/Home.tsx`, import and render `ConfiguratorCTA` after `AmenagementCTA`.

- [ ] **Step 3: Verify it compiles**

Run: `cd /home/shx/Documents/home-idea && npx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Run full build**

Run: `cd /home/shx/Documents/home-idea && npx vite build`
Expected: success

- [ ] **Step 5: Commit**

```bash
git add src/components/hi/home/ConfiguratorCTA.tsx src/pages/hi/Home.tsx
git commit -m "feat(configurator): add ConfiguratorCTA to home page"
```
