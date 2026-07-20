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
  priceDelta: number;
  image?: string;
  color?: string;
  material?: string;
  category?: string;
};

export type RoomConfig = {
  type: RoomType;
  name: string;
  icon: string;
  tagline: string;
  image: string;
  basePrice: number;
  options: ConfigOption[];
  selections: Record<string, string>;
};

export type FullConfig = {
  rooms: Record<RoomType, RoomConfig>;
  activeRooms: RoomType[];
};

import catSalon from "@/assets/hero-salon.jpg";
import catCuisine from "@/assets/cat-cuisine.jpg";
import catChambre from "@/assets/cat-chambre.jpg";
import catEclairage from "@/assets/cat-eclairage.jpg";
import catAmenagement from "@/assets/cat-amenagement.jpg";

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
