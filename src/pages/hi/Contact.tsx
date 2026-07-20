import { useState } from "react";
import { Mail, Instagram, MapPin, Phone, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ nom: "", email: "", sujet: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message envoyé à Home Idea");
    setForm({ nom: "", email: "", sujet: "", message: "" });
  };

  return (
    <div className="pt-28 pb-16">
      <div className="container max-w-5xl">
        <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3">Contact</div>
        <h1 className="font-display text-5xl lg:text-6xl mb-14">Restons en contact</h1>

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <InfoRow icon={MapPin} title="Showroom" value="Home Idea — Adresse à venir" />
            <InfoRow icon={Mail} title="Email" value="contact@homeidea.co" href="mailto:contact@homeidea.co" />
            <InfoRow icon={Phone} title="Téléphone" value="+000 000 000" href="tel:+000000000" />
            <InfoRow icon={Instagram} title="Instagram" value="@ho_me__idea" href="https://www.instagram.com/ho_me__idea" />

            <div className="mt-10 border border-gold/20 p-6 bg-card">
              <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3">Horaires</div>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>Lundi — Vendredi · 10:00 → 19:00</li>
                <li>Samedi · 11:00 → 18:00</li>
                <li>Dimanche · sur rendez-vous</li>
              </ul>
            </div>
          </div>

          <form onSubmit={submit} className="lg:col-span-3 border border-gold/20 p-8 bg-card space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Nom" value={form.nom} onChange={(v) => setForm({ ...form, nom: v })} required />
              <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
            </div>
            <Field label="Sujet" value={form.sujet} onChange={(v) => setForm({ ...form, sujet: v })} />
            <label className="block">
              <span className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Message *</span>
              <textarea
                required rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-input border border-gold/20 focus:border-gold outline-none px-4 py-3 text-sm"
              />
            </label>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-gold text-ink tracking-wide">
              Envoyer <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ icon: Icon, title, value, href }: any) => {
  const inner = (
    <div className="flex items-start gap-4 p-4 border border-gold/15 hover:border-gold/50 transition-colors">
      <Icon className="w-5 h-5 text-gold mt-0.5" />
      <div>
        <div className="text-[10px] tracking-[0.3em] uppercase text-gold/80 mb-1">{title}</div>
        <div className="text-sm">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} target="_blank" rel="noreferrer">{inner}</a> : inner;
};

const Field = ({ label, value, onChange, type = "text", required = false }: any) => (
  <label className="block">
    <span className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">{label}{required && " *"}</span>
    <input
      type={type} required={required} value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-input border border-gold/20 focus:border-gold outline-none px-4 py-3 text-sm"
    />
  </label>
);

export default Contact;
