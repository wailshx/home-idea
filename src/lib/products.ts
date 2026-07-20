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

export type ProductReview = {
  author: string;
  rating: number;
  date: string;
  text: string;
  verified?: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  image: string;
  gallery: string[];
  short: string;
  description: string;
  materials: string[];
  dimensions: string;
  dimensionValues?: { w?: number; h?: number; d?: number; dia?: number; unit: string };
  isNew?: boolean;
  rating?: number;
  reviewCount?: number;
  reviews?: ProductReview[];
  weight?: string;
  deliveryWeeks?: number;
  warranty?: string;
  sku?: string;
};

export const products: Product[] = [
  { id: "p1", slug: "fauteuil-velours-oria", name: "Fauteuil Velours Oria", category: "salon", subcategory: "Fauteuils", price: 1290, image: armchair, gallery: [armchair, table, lamp], short: "Velours profond, piètement doré brossé", description: "Assise sculpturale en velours haute densité, structure hêtre massif et piètement en laiton brossé. Une pièce signature qui ancre le salon.", materials: ["Velours italien", "Hêtre massif", "Laiton brossé"], dimensions: "80 × 82 × 78 cm", dimensionValues: { w: 80, h: 78, d: 82, unit: "cm" }, isNew: true, rating: 4.8, reviewCount: 24, weight: "18 kg", deliveryWeeks: 3, warranty: "5 ans", sku: "HI-FAU-ORIA", reviews: [
    { author: "Marie-Claire D.", rating: 5, date: "2026-06-15", text: "Un fauteuil magnifique, le velours est d'une douceur incroyable. La livraison était impeccable.", verified: true },
    { author: "Jean-Pierre L.", rating: 5, date: "2026-05-20", text: "Finitions parfaites, très confortable. Exactement comme sur les photos.", verified: true },
    { author: "Sophie M.", rating: 4, date: "2026-04-10", text: "Très beau fauteuil, mais le délais de livraison était un peu long. Qualité au rendez-vous.", verified: true },
  ]},
  { id: "p2", slug: "table-marbre-lune", name: "Table Marbre Lune", category: "salon", subcategory: "Tables basses", price: 2450, image: table, gallery: [table, armchair, lamp], short: "Plateau marbre Carrara, base laiton", description: "Table basse ronde en marbre de Carrara véritable, socle massif en laiton poli. Chaque veine est unique.", materials: ["Marbre Carrara", "Laiton poli"], dimensions: "Ø 110 × 45 cm", dimensionValues: { dia: 110, h: 45, unit: "cm" }, rating: 4.9, reviewCount: 18, weight: "32 kg", deliveryWeeks: 4, warranty: "5 ans", sku: "HI-TAB-LUNE", reviews: [
    { author: "Philippe R.", rating: 5, date: "2026-06-01", text: "La pierre est absolument sublime. Chaque pièce est unique, c'est exactement ce que je cherchais.", verified: true },
    { author: "Isabelle V.", rating: 5, date: "2026-05-15", text: "Un chef-d'œuvre. Le laiton et le marbre forment un duo parfait.", verified: true },
  ]},
  { id: "p3", slug: "lampadaire-halo", name: "Lampadaire Halo", category: "eclairage", subcategory: "Lampes de sol", price: 890, image: lamp, gallery: [lamp, table, armchair], short: "Disque doré, lumière indirecte chaude", description: "Lampadaire au design architectural, diffuseur doré satiné et LED intégrée 2700K variable.", materials: ["Laiton satiné", "LED 24W dimmable"], dimensions: "H 175 × Ø 42 cm", dimensionValues: { h: 175, dia: 42, unit: "cm" }, isNew: true, rating: 4.7, reviewCount: 12, weight: "8 kg", deliveryWeeks: 2, warranty: "3 ans", sku: "HI-LAM-HALO", reviews: [
    { author: "Antoine B.", rating: 5, date: "2026-06-20", text: "La lumière est magnifique, très chaleureuse. Le design est épuré et élégant.", verified: true },
  ]},
  { id: "p4", slug: "canape-nero-3p", name: "Canapé Nero 3 places", category: "salon", subcategory: "Canapés", price: 3890, image: armchair, gallery: [armchair, table, lamp], short: "Velours nuit, coutures apparentes", description: "Canapé trois places aux lignes sobres, velours nuit et détails cousus main.", materials: ["Velours technique", "Mousse HR", "Chêne massif"], dimensions: "220 × 95 × 78 cm", dimensionValues: { w: 220, h: 78, d: 95, unit: "cm" }, rating: 4.6, reviewCount: 31, weight: "45 kg", deliveryWeeks: 5, warranty: "5 ans", sku: "HI-CAN-NERO", reviews: [
    { author: "Claire F.", rating: 5, date: "2026-06-10", text: "Canapé très confortable et très élégant. Le velours nuit est sublime.", verified: true },
    { author: "Marc D.", rating: 4, date: "2026-05-25", text: "Bon rapport qualité-prix pour un canapé de cette qualité.", verified: true },
  ]},
  { id: "p5", slug: "lit-noir-tokyo", name: "Lit Tokyo", category: "chambres", subcategory: "Lits", price: 2190, image: armchair, gallery: [armchair, table, lamp], short: "Tête de lit capitonnée, cadre bas", description: "Lit à cadre bas et tête haute capitonnée en velours noir profond.", materials: ["Velours", "Contreplaqué", "Acier noir"], dimensions: "180 × 200 cm", dimensionValues: { w: 180, d: 200, unit: "cm" }, rating: 4.8, reviewCount: 15, weight: "38 kg", deliveryWeeks: 4, warranty: "5 ans", sku: "HI-LIT-TOKYO", reviews: [] },
  { id: "p6", slug: "chevet-doree", name: "Chevet Aurea", category: "chambres", subcategory: "Chevets", price: 590, image: table, gallery: [table, armchair, lamp], short: "Marbre & laiton, un tiroir sourdine", description: "Table de chevet compacte en marbre veiné et laiton, tiroir à fermeture douce.", materials: ["Marbre", "Laiton"], dimensions: "45 × 40 × 55 cm", dimensionValues: { w: 45, h: 55, d: 40, unit: "cm" }, rating: 4.5, reviewCount: 9, weight: "12 kg", deliveryWeeks: 2, warranty: "3 ans", sku: "HI-CHV-AUREA", reviews: [] },
  { id: "p7", slug: "suspension-drape", name: "Suspension Drapé", category: "eclairage", subcategory: "Suspensions", price: 1490, image: lamp, gallery: [lamp, table, armchair], short: "Cascade de globes ambrés", description: "Suspension multi-globes en verre soufflé ambré, structure laiton.", materials: ["Verre soufflé", "Laiton"], dimensions: "H ajustable", dimensionValues: { h: 120, dia: 60, unit: "cm" }, rating: 4.9, reviewCount: 22, weight: "6 kg", deliveryWeeks: 3, warranty: "3 ans", sku: "HI-SUS-DRAPE", reviews: [
    { author: "Nathalie G.", rating: 5, date: "2026-06-18", text: "Magnifique, la lumière à travers le verre ambré crée une ambiance incroyable.", verified: true },
  ]},
  { id: "p8", slug: "plafonnier-lineaire", name: "Plafonnier Linéaire", category: "eclairage", subcategory: "Éclairage au plafond", price: 780, image: lamp, gallery: [lamp, table, armchair], short: "Ligne LED encastrée dorée", description: "Éclairage au plafond linéaire encastrable, finition dorée mate.", materials: ["Aluminium doré", "LED 40W"], dimensions: "L 120 cm", dimensionValues: { w: 120, unit: "cm" }, rating: 4.4, reviewCount: 7, weight: "3 kg", deliveryWeeks: 2, warranty: "3 ans", sku: "HI-PLA-LINEAIRE", reviews: [] },
  { id: "p9", slug: "ilot-cuisine-nera", name: "Îlot Cuisine Nera", category: "cuisine", subcategory: "Îlots", price: 5890, image: catCuisine, gallery: [catCuisine, catSalon, catChambre], short: "Façades laquées, plan marbre", description: "Îlot central sur mesure : façades laquées noir mat, plan de travail marbre, poignées laiton.", materials: ["MDF laqué", "Marbre", "Laiton"], dimensions: "240 × 100 × 90 cm", dimensionValues: { w: 240, h: 90, d: 100, unit: "cm" }, rating: 4.7, reviewCount: 11, weight: "85 kg", deliveryWeeks: 8, warranty: "10 ans", sku: "HI-ILOT-NERA", reviews: [] },
  { id: "p10", slug: "cuisine-complete-obscura", name: "Cuisine Obscura", category: "cuisine", subcategory: "Cuisines complètes", price: 12900, image: catCuisine, gallery: [catCuisine, catSalon, catChambre], short: "Composition modulaire signature", description: "Cuisine complète modulaire avec électroménager intégré, finition noir & or.", materials: ["Sur mesure"], dimensions: "Sur mesure", rating: 5.0, reviewCount: 6, weight: "Sur mesure", deliveryWeeks: 12, warranty: "10 ans", sku: "HI-CUI-OBSCURA", reviews: [] },
  { id: "p11", slug: "amenagement-appartement", name: "Aménagement Appartement", category: "amenagement", subcategory: "Appartements", price: 0, image: catAmenagement, gallery: [catAmenagement, catSalon, catCuisine], short: "Étude, design 3D & installation", description: "Nous prenons en charge votre projet de A à Z : plans, moodboard, sourcing, livraison, installation.", materials: ["Service complet"], dimensions: "Sur devis", rating: 4.9, reviewCount: 14, reviews: [] },
  { id: "p12", slug: "dressing-nera", name: "Dressing Nera", category: "chambres", subcategory: "Dressings", price: 3490, image: catChambre, gallery: [catChambre, catSalon, catCuisine], short: "Dressing modulaire noir et doré", description: "Dressing sur mesure, tiroirs à sortie totale, LED intégrée.", materials: ["Bois", "Aluminium doré"], dimensions: "Sur mesure", rating: 4.6, reviewCount: 8, weight: "Sur mesure", deliveryWeeks: 10, warranty: "5 ans", sku: "HI-DRE-NERA", reviews: [] },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const productsByCategory = (slug: string) => products.filter((p) => p.category === slug);
