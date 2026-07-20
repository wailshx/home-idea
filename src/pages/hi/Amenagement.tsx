import { useState } from "react";
import { toast } from "sonner";
import { Check, Ruler, Palette, Truck, ShieldCheck, ArrowRight } from "lucide-react";
import img from "@/assets/cat-amenagement.jpg";

const rooms = ["Salon", "Cuisine", "Chambre principale", "Chambre enfant", "Bureau", "Salle de bain", "Extérieur"];
const budgets = ["< 10k €", "10k – 30k €", "30k – 60k €", "60k – 120k €", "> 120k €"];

const Amenagement = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [style, setStyle] = useState("Moderne & Luxe");
  const [surface, setSurface] = useState(120);
  const [form, setForm] = useState({ nom: "", email: "", phone: "", ville: "", message: "" });
  const [done, setDone] = useState(false);

  const toggle = (r: string) => setSelected((s) => s.includes(r) ? s.filter((x) => x !== r) : [...s, r]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setDone(true);
      toast.success("Votre projet a été envoyé à notre studio");
    }, 400);
  };

  if (done) {
    return (
      <div className="pt-32 pb-16 container max-w-2xl text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-gold text-ink grid place-items-center mx-auto mb-8 anim-glow">
          <Check className="w-8 h-8" />
        </div>
        <h1 className="font-display text-5xl mb-4">Votre projet est en route</h1>
        <p className="text-muted-foreground">
          Notre studio de design étudie votre demande. Vous serez rappelé sous 48h pour convenir d'un rendez-vous découverte.
        </p>
      </div>
    );
  }

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={img} alt="Aménagement Home Idea" className="w-full h-full object-cover opacity-40" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/70 to-background" />
        </div>
        <div className="container relative py-24 lg:py-32 grid lg:grid-cols-2 gap-10 items-center">
          <div className="anim-rise">
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">Service Signature</div>
            <h1 className="font-display text-5xl lg:text-7xl leading-[1.05] mb-6">
              Aménagement<br />complet <span className="text-gradient-gold italic">de la maison</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Du plan 3D à la dernière poignée installée. Nous prenons en charge chaque pièce, chaque matière, chaque détail.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Ruler, title: "Étude & plans 3D", desc: "Relevés, moodboard, rendus photoréalistes" },
              { icon: Palette, title: "Direction artistique", desc: "Matières, palettes, mobilier signature" },
              { icon: Truck, title: "Logistique complète", desc: "Fabrication, livraison, installation" },
              { icon: ShieldCheck, title: "Garantie 5 ans", desc: "Suivi long terme sur toute réalisation" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="border border-gold/20 bg-card/60 backdrop-blur p-5">
                <Icon className="w-6 h-6 text-gold mb-3" />
                <div className="font-display text-lg mb-1">{title}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="container py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">Configurer mon projet</div>
          <h2 className="font-display text-4xl mb-10">Parlez-nous de votre maison</h2>

          <form onSubmit={submit} className="space-y-10">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">Pièces à aménager</div>
              <div className="flex flex-wrap gap-2">
                {rooms.map((r) => {
                  const on = selected.includes(r);
                  return (
                    <button
                      type="button"
                      key={r}
                      onClick={() => toggle(r)}
                      className={`px-4 py-2 text-xs tracking-[0.2em] uppercase border transition-colors ${
                        on ? "border-gold bg-gold/15 text-gold" : "border-gold/20 text-muted-foreground hover:border-gold/60"
                      }`}
                    >
                      {r}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">Style souhaité</div>
                <div className="flex flex-wrap gap-2">
                  {["Moderne & Luxe", "Minimaliste", "Classique revisité", "Industriel chic"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStyle(s)}
                      className={`px-4 py-2 text-xs tracking-[0.2em] uppercase border ${
                        style === s ? "border-gold bg-gold/15 text-gold" : "border-gold/20 text-muted-foreground hover:border-gold/60"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">Budget indicatif</div>
                <div className="flex flex-wrap gap-2">
                  {budgets.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(b)}
                      className={`px-4 py-2 text-xs tracking-[0.2em] uppercase border ${
                        budget === b ? "border-gold bg-gold/15 text-gold" : "border-gold/20 text-muted-foreground hover:border-gold/60"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Surface totale</span>
                <span className="font-display text-2xl text-gold">{surface} m²</span>
              </div>
              <input
                type="range"
                min={40}
                max={500}
                value={surface}
                onChange={(e) => setSurface(Number(e.target.value))}
                className="w-full accent-[hsl(var(--gold))]"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormInput label="Nom complet" value={form.nom} onChange={(v) => setForm({ ...form, nom: v })} required />
              <FormInput label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
              <FormInput label="Téléphone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
              <FormInput label="Ville" value={form.ville} onChange={(v) => setForm({ ...form, ville: v })} />
            </div>

            <div>
              <span className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Message</span>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Décrivez votre projet en quelques mots…"
                className="w-full bg-input border border-gold/20 focus:border-gold outline-none px-4 py-3 text-sm"
              />
            </div>

            <button type="submit" className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-gold text-ink font-medium tracking-wide">
              Envoyer mon projet <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

const FormInput = ({ label, value, onChange, type = "text", required = false }: any) => (
  <label className="block">
    <span className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">{label}{required && " *"}</span>
    <input
      type={type}
      value={value}
      required={required}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-input border border-gold/20 focus:border-gold outline-none px-4 py-3 text-sm"
    />
  </label>
);

export default Amenagement;
