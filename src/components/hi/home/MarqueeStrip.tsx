const items = [
  "Design ✦ Exécution",
  "Cuisine · Salon · Chambres · Éclairage",
  "Sur mesure",
  "Made with ✦ Home Idea",
  "Livraison & installation",
  "Pièces signature",
  "Aménagement complet",
  "Luxe français",
];

export default function MarqueeStrip() {
  const doubled = [...items, ...items];

  return (
    <div className="border-y border-gold/10 py-5 overflow-hidden">
      <div className="flex gap-14 whitespace-nowrap anim-marquee text-gold/70 text-sm tracking-[0.4em] uppercase">
        {doubled.map((item, i) => (
          <span key={i} className="shrink-0">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
