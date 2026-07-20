import { useState, useMemo, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { categories, products, getCategory, Product } from "@/lib/products";
import ProductCard from "@/components/hi/ProductCard";
import SearchBar from "@/components/hi/catalog/SearchBar";
import SortSelect from "@/components/hi/catalog/SortSelect";
import FilterPanel, { Filters } from "@/components/hi/catalog/FilterPanel";
import PaginationBar from "@/components/hi/catalog/PaginationBar";
import { ArrowLeft, SlidersHorizontal, X } from "lucide-react";

const ITEMS_PER_PAGE = 9;

const sortProducts = (list: Product[], sort: string): Product[] => {
  const sorted = [...list];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "newest":
      return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "popular":
    default:
      return sorted;
  }
};

const matchesMaterials = (product: Product, materials: string[]): boolean => {
  if (materials.length === 0) return true;
  return materials.some((m) =>
    product.materials.some((pm) => pm.toLowerCase().includes(m.toLowerCase()))
  );
};

const Catalog = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCategory(slug) : undefined;

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    subcategory: "",
    minPrice: 0,
    maxPrice: Infinity,
    materials: [],
  });

  const base = slug ? products.filter((p) => p.category === slug) : products;

  const filtered = useMemo(() => {
    let result = base;
    if (filters.subcategory) result = result.filter((p) => p.subcategory === filters.subcategory);
    if (filters.minPrice > 0 || filters.maxPrice < Infinity) {
      result = result.filter((p) => p.price >= filters.minPrice && p.price <= filters.maxPrice);
    }
    if (filters.materials.length > 0) {
      result = result.filter((p) => matchesMaterials(p, filters.materials));
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.short.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.materials.some((m) => m.toLowerCase().includes(q))
      );
    }
    return sortProducts(result, sort);
  }, [base, filters, sort, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleFiltersChange = useCallback((f: Filters) => {
    setFilters(f);
    setPage(1);
  }, []);

  const handleSearchChange = useCallback((v: string) => {
    setSearch(v);
    setPage(1);
  }, []);

  const handleSortChange = useCallback((v: string) => {
    setSort(v);
    setPage(1);
  }, []);

  if (slug && !category) {
    return (
      <div className="pt-32 container">
        <p className="text-muted-foreground">Collection introuvable.</p>
        <Link to="/" className="text-gold link-gold">Retour à l'accueil</Link>
      </div>
    );
  }

  const activeCount =
    (filters.subcategory ? 1 : 0) +
    (filters.minPrice > 0 || filters.maxPrice < Infinity ? 1 : 0) +
    filters.materials.length +
    (search ? 1 : 0);

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {category ? (
            <>
              <img src={category.image} alt={category.name} className="w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/70 to-background" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-ink/40 to-background" />
          )}
        </div>
        <div className="container relative py-24 lg:py-32">
          <Link to="/" className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-gold mb-6 link-gold">
            <ArrowLeft className="w-4 h-4" /> Accueil
          </Link>
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">Collection</div>
          <h1 className="font-display text-5xl lg:text-7xl mb-4">
            {category ? category.name : "Toutes nos collections"}
          </h1>
          {category && <p className="text-lg text-muted-foreground max-w-xl italic">{category.tagline}</p>}
          {!category && (
            <p className="text-lg text-muted-foreground max-w-xl italic">
              Découvrez l'ensemble de nos pièces signées
            </p>
          )}
        </div>
      </section>

      {/* Toolbar */}
      <section className="container py-6 border-b border-gold/10">
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-3 border border-gold/20 text-sm text-gold/80 hover:border-gold/50 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filtres
            {activeCount > 0 && (
              <span className="ml-1 w-5 h-5 grid place-items-center bg-gold/20 text-gold text-[10px] rounded-full">
                {activeCount}
              </span>
            )}
          </button>
          <SearchBar value={search} onChange={handleSearchChange} />
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-xs text-muted-foreground">
              {filtered.length} produit{filtered.length !== 1 ? "s" : ""}
            </span>
            <SortSelect value={sort} onChange={handleSortChange} />
          </div>
        </div>
        {activeCount > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {filters.subcategory && (
              <span className="inline-flex items-center gap-1 px-3 py-1 text-[11px] tracking-[0.15em] uppercase bg-gold/10 border border-gold/30 text-gold">
                {filters.subcategory}
                <button onClick={() => handleFiltersChange({ ...filters, subcategory: "" })}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.materials.map((m) => (
              <span key={m} className="inline-flex items-center gap-1 px-3 py-1 text-[11px] tracking-[0.15em] uppercase bg-gold/10 border border-gold/30 text-gold">
                {m}
                <button onClick={() => handleFiltersChange({ ...filters, materials: filters.materials.filter((x) => x !== m) })}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {(filters.minPrice > 0 || filters.maxPrice < Infinity) && (
              <span className="inline-flex items-center gap-1 px-3 py-1 text-[11px] tracking-[0.15em] uppercase bg-gold/10 border border-gold/30 text-gold">
                {filters.maxPrice === Infinity ? `> ${filters.minPrice} €` : `${filters.minPrice}–${filters.maxPrice} €`}
                <button onClick={() => handleFiltersChange({ ...filters, minPrice: 0, maxPrice: Infinity })}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {search && (
              <span className="inline-flex items-center gap-1 px-3 py-1 text-[11px] tracking-[0.15em] uppercase bg-gold/10 border border-gold/30 text-gold">
                "{search}"
                <button onClick={() => handleSearchChange("")}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </section>

      {/* Content */}
      <section className="container py-14">
        <div className="flex gap-10">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <FilterPanel filters={filters} onChange={handleFiltersChange} category={category} />
          </aside>

          {/* Mobile filter drawer */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/70" onClick={() => setMobileFiltersOpen(false)} />
              <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[90vw] bg-background border-l border-gold/20 overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl">Filtres</h2>
                  <button onClick={() => setMobileFiltersOpen(false)} className="p-2 hover:bg-gold/10 transition-colors">
                    <X className="w-5 h-5 text-gold" />
                  </button>
                </div>
                <FilterPanel filters={filters} onChange={handleFiltersChange} category={category} />
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full mt-6 py-3 bg-gradient-gold text-ink font-medium tracking-wide text-sm"
                >
                  Voir les résultats ({filtered.length})
                </button>
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {paginated.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-muted-foreground mb-4">Aucun produit ne correspond à votre recherche.</p>
                <button
                  onClick={() => {
                    setFilters({ subcategory: "", minPrice: 0, maxPrice: Infinity, materials: [] });
                    setSearch("");
                  }}
                  className="text-xs tracking-[0.2em] uppercase text-gold border-b border-gold/40 pb-0.5 hover:text-gold-soft transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginated.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </div>
                <PaginationBar page={page} totalPages={totalPages} onPageChange={setPage} />
              </>
            )}
          </div>
        </div>
      </section>

      {/* Other collections */}
      {slug && (
        <section className="container py-24 border-t border-gold/10">
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">Continuer la visite</div>
          <div className="grid gap-4 md:grid-cols-4">
            {categories
              .filter((c) => c.slug !== slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  to={`/collection/${c.slug}`}
                  className="group relative overflow-hidden aspect-[4/5] border border-gold/15 hover:border-gold/60"
                >
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-display text-2xl">{c.name}</h3>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      )}

      {/* All collections when browsing all */}
      {!slug && (
        <section className="container py-24 border-t border-gold/10">
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">Parcourir par catégorie</div>
          <div className="grid gap-4 md:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to={`/collection/${c.slug}`}
                className="group relative overflow-hidden aspect-[4/5] border border-gold/15 hover:border-gold/60"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display text-2xl">{c.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Catalog;
