import armchair from "@/assets/prod-armchair.jpg";
import table from "@/assets/prod-table.jpg";
import lamp from "@/assets/prod-lamp.jpg";
import catCuisine from "@/assets/cat-cuisine.jpg";
import catSalon from "@/assets/hero-salon.jpg";
import catChambre from "@/assets/cat-chambre.jpg";
import catEclairage from "@/assets/cat-eclairage.jpg";
import catAmenagement from "@/assets/cat-amenagement.jpg";

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  subcategories: string[];
};

export const categories: Category[] = [
  {
    slug: "salon",
    name: "Salon",
    tagline: "Confort sculpté, présence silencieuse",
    image: catSalon,
    subcategories: ["Canapés", "Fauteuils", "Tables basses", "Rangements"],
  },
  {
    slug: "cuisine",
    name: "Cuisine",
    tagline: "L'art d'habiter la matière",
    image: catCuisine,
    subcategories: ["Cuisines complètes", "Îlots", "Rangements", "Accessoires"],
  },
  {
    slug: "chambres",
    name: "Chambres",
    tagline: "Le repos comme rituel",
    image: catChambre,
    subcategories: ["Lits", "Têtes de lit", "Chevets", "Dressings"],
  },
  {
    slug: "eclairage",
    name: "Éclairage",
    tagline: "Sculpter la lumière",
    image: catEclairage,
    subcategories: ["Suspensions", "Lampes de sol", "Appliques", "Éclairage au plafond"],
  },
  {
    slug: "amenagement",
    name: "Aménagement",
    tagline: "Du design à l'exécution",
    image: catAmenagement,
    subcategories: ["Appartements", "Villas", "Espaces professionnels"],
  },
];

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  image: string;
  short: string;
  description: string;
  materials: string[];
  dimensions: string;
  isNew?: boolean;
};

export const products: Product[] = [
  { id: "p1", slug: "fauteuil-velours-oria", name: "Fauteuil Velours Oria", category: "salon", subcategory: "Fauteuils", price: 1290, image: armchair, short: "Velours profond, piètement doré brossé", description: "Assise sculpturale en velours haute densité, structure hêtre massif et piètement en laiton brossé. Une pièce signature qui ancre le salon.", materials: ["Velours italien", "Hêtre massif", "Laiton brossé"], dimensions: "80 × 82 × 78 cm", isNew: true },
  { id: "p2", slug: "table-marbre-lune", name: "Table Marbre Lune", category: "salon", subcategory: "Tables basses", price: 2450, image: table, short: "Plateau marbre Carrara, base laiton", description: "Table basse ronde en marbre de Carrara véritable, socle massif en laiton poli. Chaque veine est unique.", materials: ["Marbre Carrara", "Laiton poli"], dimensions: "Ø 110 × 45 cm" },
  { id: "p3", slug: "lampadaire-halo", name: "Lampadaire Halo", category: "eclairage", subcategory: "Lampes de sol", price: 890, image: lamp, short: "Disque doré, lumière indirecte chaude", description: "Lampadaire au design architectural, diffuseur doré satiné et LED intégrée 2700K variable.", materials: ["Laiton satiné", "LED 24W dimmable"], dimensions: "H 175 × Ø 42 cm", isNew: true },
  { id: "p4", slug: "canape-nero-3p", name: "Canapé Nero 3 places", category: "salon", subcategory: "Canapés", price: 3890, image: armchair, short: "Velours nuit, coutures apparentes", description: "Canapé trois places aux lignes sobres, velours nuit et détails cousus main.", materials: ["Velours technique", "Mousse HR", "Chêne massif"], dimensions: "220 × 95 × 78 cm" },
  { id: "p5", slug: "lit-noir-tokyo", name: "Lit Tokyo", category: "chambres", subcategory: "Lits", price: 2190, image: armchair, short: "Tête de lit capitonnée, cadre bas", description: "Lit à cadre bas et tête haute capitonnée en velours noir profond.", materials: ["Velours", "Contreplaqué", "Acier noir"], dimensions: "180 × 200 cm" },
  { id: "p6", slug: "chevet-doree", name: "Chevet Aurea", category: "chambres", subcategory: "Chevets", price: 590, image: table, short: "Marbre & laiton, un tiroir sourdine", description: "Table de chevet compacte en marbre veiné et laiton, tiroir à fermeture douce.", materials: ["Marbre", "Laiton"], dimensions: "45 × 40 × 55 cm" },
  { id: "p7", slug: "suspension-drape", name: "Suspension Drapé", category: "eclairage", subcategory: "Suspensions", price: 1490, image: lamp, short: "Cascade de globes ambrés", description: "Suspension multi-globes en verre soufflé ambré, structure laiton.", materials: ["Verre soufflé", "Laiton"], dimensions: "H ajustable" },
  { id: "p8", slug: "plafonnier-lineaire", name: "Plafonnier Linéaire", category: "eclairage", subcategory: "Éclairage au plafond", price: 780, image: lamp, short: "Ligne LED encastrée dorée", description: "Éclairage au plafond linéaire encastrable, finition dorée mate.", materials: ["Aluminium doré", "LED 40W"], dimensions: "L 120 cm" },
  { id: "p9", slug: "ilot-cuisine-nera", name: "Îlot Cuisine Nera", category: "cuisine", subcategory: "Îlots", price: 5890, image: catCuisine, short: "Façades laquées, plan marbre", description: "Îlot central sur mesure : façades laquées noir mat, plan de travail marbre, poignées laiton.", materials: ["MDF laqué", "Marbre", "Laiton"], dimensions: "240 × 100 × 90 cm" },
  { id: "p10", slug: "cuisine-complete-obscura", name: "Cuisine Obscura", category: "cuisine", subcategory: "Cuisines complètes", price: 12900, image: catCuisine, short: "Composition modulaire signature", description: "Cuisine complète modulaire avec électroménager intégré, finition noir & or.", materials: ["Sur mesure"], dimensions: "Sur mesure" },
  { id: "p11", slug: "amenagement-appartement", name: "Aménagement Appartement", category: "amenagement", subcategory: "Appartements", price: 0, image: catAmenagement, short: "Étude, design 3D & installation", description: "Nous prenons en charge votre projet de A à Z : plans, moodboard, sourcing, livraison, installation.", materials: ["Service complet"], dimensions: "Sur devis" },
  { id: "p12", slug: "dressing-nera", name: "Dressing Nera", category: "chambres", subcategory: "Dressings", price: 3490, image: catChambre, short: "Dressing modulaire noir et doré", description: "Dressing sur mesure, tiroirs à sortie totale, LED intégrée.", materials: ["Bois", "Aluminium doré"], dimensions: "Sur mesure" },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const productsByCategory = (slug: string) => products.filter((p) => p.category === slug);
