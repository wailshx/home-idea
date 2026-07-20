import { useRef, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import heroImg from "@/assets/hero-salon.jpg";

const HeroScene = lazy(() => import("./HeroScene"));

function HeroFallback() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-dashed border-gold/20 anim-spin-slow" />
    </div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Stagger reveal for headline lines
      tl.from(".hero-label", {
        y: 20,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          ".hero-line",
          {
            y: 60,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
          },
          "-=0.4"
        )
        .from(
          ".hero-desc",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ".hero-cta",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.4"
        )
        .from(
          ".hero-stat",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
          },
          "-=0.3"
        );

      // Counter animation for stats
      gsap.fromTo(
        ".stat-number",
        { textContent: "0" },
        {
          textContent: (_i: number, el: Element) => el.getAttribute("data-target") || "0",
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          stagger: 0.2,
          delay: 1.5,
        }
      );

      // Hero image parallax on scroll
      gsap.to(".hero-image", {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Floating card entrance
      gsap.from(".hero-floating-card", {
        x: -40,
        opacity: 0,
        duration: 1,
        delay: 1.8,
        ease: "power3.out",
      });

      gsap.from(".hero-badge", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        delay: 2,
        ease: "back.out(1.7)",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-screen flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 grain" />

      {/* 3D Scene */}
      <Suspense fallback={<HeroFallback />}>
        <HeroScene />
      </Suspense>

      {/* Content */}
      <div className="container relative z-10 pt-32 pb-20 lg:pt-40 lg:pb-28 grid lg:grid-cols-2 gap-14 items-center">
        {/* Left — Text */}
        <div>
          <div className="hero-label flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-gold mb-6">
            <span className="w-8 h-px bg-gold" /> Maison de design
          </div>

          <h1
            ref={headlineRef}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.02] mb-6"
          >
            <span className="hero-line block overflow-hidden">
              <span className="block">L&apos;art de</span>
            </span>
            <span className="hero-line block overflow-hidden">
              <span className="block text-gradient-gold italic">vivre</span>,
            </span>
            <span className="hero-line block overflow-hidden">
              <span className="block">sculpté sur mesure.</span>
            </span>
          </h1>

          <p className="hero-desc text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed">
            Home Idea imagine, dessine et installe des intérieurs modernes et
            luxueux. Du meuble signature à l&apos;aménagement complet de votre
            maison.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/collection/salon"
              className="hero-cta group inline-flex items-center gap-3 px-8 py-4 bg-gradient-gold text-ink font-medium tracking-wide overflow-hidden relative"
            >
              <span className="relative z-10">Explorer la collection</span>
              <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <span className="absolute inset-0 anim-shimmer opacity-60" />
            </Link>
            <Link
              to="/amenagement"
              className="hero-cta inline-flex items-center gap-3 px-8 py-4 border border-gold/50 hover:border-gold hover:bg-gold/5 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              Aménager ma maison
            </Link>
          </div>

          <div ref={statsRef} className="mt-14 grid grid-cols-3 gap-6 max-w-md">
            {[
              { target: "12", suffix: "+", label: "Ans d'expertise" },
              { target: "500", suffix: "+", label: "Projets livrés" },
              { target: "100", suffix: "%", label: "Sur mesure" },
            ].map((s) => (
              <div key={s.label} className="hero-stat">
                <div className="font-display text-3xl text-gold">
                  <span
                    className="stat-number"
                    data-target={s.target}
                  >
                    0
                  </span>
                  {s.suffix}
                </div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Visual */}
        <div className="relative h-[480px] lg:h-[620px] perspective-1000">
          {/* Rotating gold rings */}
          <div className="absolute -inset-10 anim-spin-slow opacity-40 pointer-events-none">
            <div className="w-full h-full rounded-full border border-dashed border-gold/50" />
          </div>
          <div
            className="absolute inset-6 anim-spin-slow opacity-30 pointer-events-none"
            style={{ animationDirection: "reverse", animationDuration: "60s" }}
          >
            <div className="w-full h-full rounded-full border border-gold/30" />
          </div>

          {/* Hero image */}
          <div className="hero-image relative w-full h-full anim-float">
            <div className="absolute inset-0 rounded-sm overflow-hidden gold-border shadow-deep anim-glow">
              <img
                src={heroImg}
                alt="Salon luxueux Home Idea"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            </div>

            {/* Floating info card */}
            <div className="hero-floating-card absolute -left-6 lg:-left-14 bottom-16 bg-card/90 backdrop-blur-xl border border-gold/30 p-5 max-w-[240px] shadow-gold">
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">
                Signature
              </div>
              <div className="font-display text-lg leading-tight mb-2">
                Salon Nocturne — Édition 2026
              </div>
              <div className="text-xs text-muted-foreground">
                Marbre Carrara, velours italien, laiton brossé.
              </div>
            </div>

            {/* Floating gold badge */}
            <div className="hero-badge absolute -right-4 top-8 w-28 h-28 rounded-full bg-gradient-gold text-ink grid place-items-center text-center anim-glow">
              <div>
                <div className="font-display text-2xl leading-none">01</div>
                <div className="text-[9px] tracking-[0.25em] uppercase mt-1">
                  Édition
                  <br />
                  limitée
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
