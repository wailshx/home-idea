import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { products } from "@/lib/products";
import ProductCard from "@/components/hi/ProductCard";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { y: 40, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function FeaturedProducts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const featured = products.slice(0, 6);

  return (
    <section className="container py-24" ref={ref}>
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14">
        <div>
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3">
            Pièces signature
          </div>
          <h2 className="font-display text-4xl sm:text-5xl">
            Le meilleur du moment
          </h2>
        </div>
        <Link
          to="/collection/salon"
          className="text-sm tracking-[0.25em] uppercase text-gold link-gold"
        >
          Toute la collection
        </Link>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        {featured.map((p, i) => (
          <motion.div key={p.id} variants={item}>
            <ProductCard product={p} index={i} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
