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
  const featuresRef = useRef<HTMLDivElement>(null); // Добавлен ref для нового блока

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    tl.from(titleRef.current, { y: 120, opacity: 0, duration: 1.4, ease: "power4.out" })
      .from(subtitleRef.current, { y: 40, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8")
      .from(lineRef.current, { scaleX: 0, duration: 1.2, ease: "power2.inOut" }, "-=0.6")
      .from(featuresRef.current, { y: 20, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.4");
  }, []);

  return (
    <section ref={containerRef} className="section-panel flex items-center justify-center relative">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Фон студии" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-overlay" />
      </div>
      
      {/* <Scene3D scrollProgress={scrollProgress} /> */}

      <div className="relative z-20 text-center px-8 max-w-5xl">
        <div className="overflow-hidden mb-4">
          <p className="font-body text-sm tracking-[0.4em] uppercase text-primary mb-8">
            Веб-разработка & Дизайн
          </p>
        </div>
        
        <div className="overflow-hidden">
          <h1 ref={titleRef} className="font-display text-7xl md:text-[10rem] leading-[0.85] font-bold tracking-tight">
            <span className="text-gradient-gold">Code</span>
            <br />
            <span className="text-gradient-gold text-7xl md:text-[8rem]">LAB</span>
          </h1>
        </div>
        
        <div ref={lineRef} className="w-24 h-[1px] bg-primary mx-auto my-10 origin-left" />
        
        <p ref={subtitleRef} className="font-body text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Создаем сайты, которые приносят результат. Беремся за <strong>проекты любой сложности</strong>: от стильных визиток до мощных интернет-магазинов. Безупречный код и современный дизайн.
        </p>

        {/* Добавленный блок с ценой и преимуществами */}
        <div ref={featuresRef} className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8 font-body text-lg text-primary">
          <span className="bg-primary/10 px-5 py-3 rounded-full border border-primary/20 tracking-wider">
            Цены от 199 BYN
          </span>
          <span className="hidden md:inline-block text-muted-foreground">•</span>
          <span className="tracking-widest uppercase text-xs text-muted-foreground">
            Лендинги / Корпоративные сайты / E-commerce
          </span>
        </div>

        <button
          data-cursor-hover
          onClick={() => onNavigate(1)}
          className="magnetic-btn mt-12 px-8 py-4 border border-gold font-body text-xs tracking-[0.3em] uppercase text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500"
        >
          Обсудить проект
        </button>
      </div>

      {/* Плавающие элементы по углам */}
     
      <div className="absolute bottom-8 right-8 z-20 font-body text-xs tracking-[0.2em] text-muted-foreground animate-pulse-glow">
        Листайте вниз →
      </div>
    </section>
  );
};

export default HeroSection;
