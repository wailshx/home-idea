import img from "@/assets/cat-amenagement.jpg";

const About = () => (
  <div className="pt-28 pb-16">
    <div className="container max-w-4xl">
      <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3">À propos</div>
      <h1 className="font-display text-5xl lg:text-6xl mb-10">Du design à l'exécution</h1>

      <div className="aspect-[16/9] overflow-hidden mb-12 gold-border">
        <img src={img} alt="Studio Home Idea" className="w-full h-full object-cover" loading="lazy" />
      </div>

      <div className="prose prose-invert max-w-none space-y-6 text-foreground/80 leading-relaxed">
        <p className="text-xl font-display italic text-gold">
          « Une maison n'est pas décorée, elle est composée. »
        </p>
        <p>
          Home Idea est un studio de design intérieur et une maison de mobilier de luxe. Depuis plus d'une décennie, nous accompagnons particuliers et institutions dans l'aménagement complet de leurs espaces, du concept à la mise en œuvre.
        </p>
        <p>
          Chaque projet est unique. Nos architectes, décorateurs et artisans travaillent main dans la main pour composer des intérieurs modernes, élégants et durables, où le noir absorbe la lumière et où l'or vient la sculpter.
        </p>
        <p>
          Notre atelier produit à la commande. Nos collections cuisine, salon, chambres et éclairage puisent dans les meilleurs matériaux : marbre de Carrara, laiton brossé, velours italiens, chêne massif.
        </p>
      </div>
    </div>
  </div>
);

export default About;
