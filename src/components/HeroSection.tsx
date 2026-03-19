import { useEffect, useRef } from "react";
import gsap from "gsap";
import heroBg from "@/assets/hero-bg.jpg";
import Scene3D from "./Scene3D";

interface HeroSectionProps {
  scrollProgress: number;
  onNavigate: (index: number) => void;
}

const HeroSection = ({ scrollProgress, onNavigate }: HeroSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    tl.from(titleRef.current, { y: 120, opacity: 0, duration: 1.4, ease: "power4.out" })
      .from(subtitleRef.current, { y: 40, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8")
      .from(lineRef.current, { scaleX: 0, duration: 1.2, ease: "power2.inOut" }, "-=0.6");
  }, []);

  return (
    <section ref={containerRef} className="section-panel flex items-center justify-center relative">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Hero background" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-overlay" />
      </div>
      
      <Scene3D scrollProgress={scrollProgress} />

      <div className="relative z-20 text-center px-8 max-w-5xl">
        <div className="overflow-hidden mb-4">
          <p className="font-body text-sm tracking-[0.4em] uppercase text-primary mb-8">Creative Portfolio</p>
        </div>
        <div className="overflow-hidden">
          <h1 ref={titleRef} className="font-display text-7xl md:text-[10rem] leading-[0.85] font-bold tracking-tight">
            <span className="text-gradient-gold">Obsidian</span>
            <br />
            <span className="text-outline text-7xl md:text-[8rem]">Studio</span>
          </h1>
        </div>
        <div ref={lineRef} className="w-24 h-[1px] bg-primary mx-auto my-10 origin-left" />
        <p ref={subtitleRef} className="font-body text-muted-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
          Where darkness meets brilliance. Crafting immersive digital experiences that transcend the ordinary.
        </p>
        <button
          data-cursor-hover
          onClick={() => onNavigate(1)}
          className="magnetic-btn mt-12 px-8 py-4 border border-gold font-body text-xs tracking-[0.3em] uppercase text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500"
        >
          Enter Experience
        </button>
      </div>

      {/* Floating corner elements */}
      <div className="absolute top-8 left-8 z-20 font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">
        Est. 2024
      </div>
      <div className="absolute bottom-8 right-8 z-20 font-body text-xs tracking-[0.2em] text-muted-foreground animate-pulse-glow">
        Scroll to explore →
      </div>
    </section>
  );
};

export default HeroSection;
