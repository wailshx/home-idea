import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { Check, ArrowRight } from "lucide-react";

const Checkout = () => {
  const { detailed, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    prenom: "", nom: "", email: "", phone: "",
    adresse: "", ville: "", codePostal: "", pays: "",
    notes: "",
  });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (detailed.length === 0) {
      toast.error("Votre panier est vide");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
      clear();
      toast.success("Commande envoyée à Home Idea");
    }, 900);
  };

  if (done) {
    return (
      <div className="pt-32 pb-16 container max-w-2xl text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-gold text-ink grid place-items-center mx-auto mb-8 anim-glow">
          <Check className="w-8 h-8" />
        </div>
        <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3">Confirmation</div>
        <h1 className="font-display text-5xl mb-4">Merci pour votre commande</h1>
        <p className="text-muted-foreground mb-10">
          Nous avons reçu votre demande. Un conseiller Home Idea vous contactera sous 24h pour confirmer les détails de livraison et de paiement.
        </p>
        <Link to="/" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-gold text-ink tracking-wide">
          Retour à l'accueil <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16">
      <div className="container max-w-6xl">
        <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3">Commande</div>
        <h1 className="font-display text-5xl mb-12">Finaliser votre commande</h1>

        <form onSubmit={onSubmit} className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <Section title="Coordonnées">
              <Grid>
                <Field label="Prénom" value={form.prenom} onChange={(v) => update("prenom", v)} required />
                <Field label="Nom" value={form.nom} onChange={(v) => update("nom", v)} required />
                <Field label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} required />
                <Field label="Téléphone" value={form.phone} onChange={(v) => update("phone", v)} required />
              </Grid>
            </Section>

            <Section title="Adresse de livraison">
              <div className="grid gap-4">
                <Field label="Adresse" value={form.adresse} onChange={(v) => update("adresse", v)} required />
                <Grid>
                  <Field label="Ville" value={form.ville} onChange={(v) => update("ville", v)} required />
                  <Field label="Code postal" value={form.codePostal} onChange={(v) => update("codePostal", v)} required />
                </Grid>
                <Field label="Pays" value={form.pays} onChange={(v) => update("pays", v)} required />
              </div>
            </Section>

            <Section title="Notes (optionnel)">
              <textarea
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                rows={4}
                placeholder="Étage, code d'accès, préférences d'installation…"
                className="w-full bg-input border border-gold/20 focus:border-gold outline-none px-4 py-3 text-sm"
              />
            </Section>
          </div>

          <aside className="border border-gold/20 p-6 h-fit bg-card sticky top-28">
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">Récapitulatif</div>
            <div className="space-y-3 mb-4">
              {detailed.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between text-sm">
                  <span className="pr-3">{product.name} × {quantity}</span>
                  <span>{(product.price * quantity).toLocaleString("fr-FR")} €</span>
                </div>
              ))}
              {detailed.length === 0 && (
                <p className="text-sm text-muted-foreground">Votre panier est vide.</p>
              )}
            </div>
            <div className="border-t border-gold/15 pt-4 flex justify-between items-baseline mb-6">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Total</span>
              <span className="font-display text-2xl text-gradient-gold">{subtotal.toLocaleString("fr-FR")} €</span>
            </div>
            <button
              type="submit"
              disabled={submitting || detailed.length === 0}
              className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-gold text-ink font-medium tracking-wide disabled:opacity-50"
            >
              {submitting ? "Envoi…" : "Confirmer la commande"}
            </button>
            <p className="text-[10px] text-muted-foreground mt-4 leading-relaxed">
              Un conseiller vous recontactera pour valider le paiement (virement, CB ou paiement à la livraison).
            </p>
          </aside>
        </form>
      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="border border-gold/15 p-6 bg-card">
    <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-5">{title}</div>
    {children}
  </div>
);

const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid sm:grid-cols-2 gap-4">{children}</div>
);

const Field = ({
  label, value, onChange, type = "text", required = false,
}: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) => (
  <label className="block">
    <span className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">{label}{required && " *"}</span>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full bg-input border border-gold/20 focus:border-gold outline-none px-4 py-3 text-sm transition-colors"
    />
  </label>
);

export default Checkout;
