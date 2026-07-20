import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { products, Product } from "@/lib/products";

type WishlistContextValue = {
  ids: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
  count: number;
  items: Product[];
};

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

const STORAGE_KEY = "home-idea-wishlist";

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [ids, setIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids]);

  const toggle = (productId: string) => {
    setIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const has = (productId: string) => ids.includes(productId);

  const count = ids.length;

  const items = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[];

  return (
    <WishlistContext.Provider value={{ ids, toggle, has, count, items }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
