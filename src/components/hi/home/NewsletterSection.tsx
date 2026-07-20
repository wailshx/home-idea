import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function NewsletterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");

  useGSAP(
    () => {
      gsap.from(".nl-content > *", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="container py-24">
      <div className="nl-content relative border border-gold/20 bg-card p-10 lg:p-16 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-xl mx-auto">
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">
            Newsletter
          </div>
          <h2 className="font-display text-3xl sm:text-4xl mb-4">
            Restez inspiré
          </h2>
          <p className="text-muted-foreground mb-8">
            Recevez nos dernières créations, conseils de design et avant-premières
            de collections. Une fois par mois, rien de plus.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEmail("");
            }}
            className="flex gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="flex-1 px-5 py-3.5 bg-ink border border-gold/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors text-sm"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-gradient-gold text-ink font-medium tracking-wide inline-flex items-center gap-2 hover:shadow-gold transition-shadow"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">S&apos;inscrire</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
