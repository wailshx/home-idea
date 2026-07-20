import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

type QuoteFormProps = {
  productName: string;
  productPrice: number;
};

const QuoteForm = ({ productName, productPrice }: QuoteFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    quantity: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Veuillez remplir les champs obligatoires");
      return;
    }
    setSubmitted(true);
    toast.success("Demande de devis envoyée avec succès");
  };

  if (submitted) {
    return (
      <div className="text-center py-10 border border-gold/15">
        <CheckCircle className="w-12 h-12 text-gold mx-auto mb-4" />
        <h3 className="font-display text-2xl mb-2">Merci pour votre demande</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Notre équipe vous recontactera sous 24h avec un devis personnalisé.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs tracking-[0.2em] uppercase text-gold border-b border-gold/40 pb-0.5 hover:text-gold-soft transition-colors"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="p-4 border border-gold/15 bg-gold/5 mb-6">
        <div className="text-xs text-muted-foreground mb-1">Produit</div>
        <div className="font-display text-lg">{productName}</div>
        <div className="text-sm text-gold mt-1">
          {productPrice > 0 ? `${productPrice.toLocaleString("fr-FR")} €` : "Sur devis"}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-2">
            Nom complet *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 bg-card border border-gold/20 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-gold/60 transition-colors"
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-2">
            Email *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 bg-card border border-gold/20 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-gold/60 transition-colors"
            placeholder="votre@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-2">
            Téléphone
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 bg-card border border-gold/20 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-gold/60 transition-colors"
            placeholder="+33 6 00 00 00 00"
          />
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-2">
            Quantité
          </label>
          <input
            type="number"
            min={1}
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: Math.max(1, parseInt(e.target.value) || 1) })}
            className="w-full px-4 py-3 bg-card border border-gold/20 text-sm text-foreground focus:outline-none focus:border-gold/60 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-2">
          Message
        </label>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 bg-card border border-gold/20 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-gold/60 transition-colors resize-none"
          placeholder="Décrivez votre projet, vos contraintes, votre budget..."
        />
      </div>

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-gold text-ink font-medium tracking-wide hover:opacity-90 transition-opacity"
      >
        <Send className="w-4 h-4" /> Demander un devis gratuit
      </button>

      <p className="text-[10px] text-muted-foreground text-center">
        Réponse sous 24h. Sans engagement.
      </p>
    </form>
  );
};

export default QuoteForm;
