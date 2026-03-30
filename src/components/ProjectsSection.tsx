import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import sectionArch from "@/assets/section-architecture.jpg";
import typeLanding from "@/assets/project-1.jpg";
import typeStore from "@/assets/project-2.jpg";
import typeCorporate from "@/assets/project-3.jpg";
import typeCustom from "@/assets/project-4.jpg";
import Web1 from "@/assets/Web1.jpeg";
import Web2 from "@/assets/Web2.jpeg";
import Web3 from "@/assets/Web3.jpeg";
import Web4 from "@/assets/Web4.jpeg";
import Web5 from "@/assets/Web5.jpeg";
import Web7 from "@/assets/Web7.jpeg";
import Web8 from "@/assets/Web8.jpeg";
import Web9 from "@/assets/Web9.jpeg";
import Web10 from "@/assets/Web10.jpeg";
import Web11 from "@/assets/Web11.jpeg";

const workTypes = [
  { img: Web1, title: "Landing Page", category: "Лендинг", price: "от 199 BYN" },
  { img: Web2, title: "E-commerce", category: "Магазин", price: "от 899 BYN" },
  { img: Web3, title: "Corporate", category: "Корпоративный", price: "от 599 BYN" },
  { img: Web4, title: "Custom Web", category: "Сложные проекты", price: "Индивидуально" },
  { img: Web5, title: "Promo Site", category: "Промо", price: "от 299 BYN" },
  { img: Web7, title: "Marketplace", category: "Платформа", price: "от 1499 BYN" },
];

const ProjectsSection = ({ isActive }: { isActive: boolean }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) {
      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(card,
            { y: 100, opacity: 0, rotateY: -15 },
            { y: 0, opacity: 1, rotateY: 0, duration: 1, delay: i * 0.1, ease: "power3.out" }
          );
        }
      });
    }
  }, [isActive]);

  // Logic to perfectly interlock the two rows like a zipper
  const getInterlockMargin = (index: number) => {
    if (index < 4) {
      return index % 2 !== 0 ? "lg:mt-[24px]" : "lg:mt-0";
    } else {
      const posInRow = index - 4;
      if (posInRow === 0) {
        return "lg:col-start-2 lg:mt-[24px]";
      } else {
        return "lg:mt-0";
      }
    }
  };

  return (
    <section className="section-panel flex flex-col lg:flex-row relative min-h-screen py-20 lg:py-0">
      <div ref={bgRef} className="absolute inset-0">
        <img src={sectionArch} alt="Фон" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, hsl(0 0% 4% / 0.9), hsl(0 0% 4% / 0.4))" }} />
      </div>

      {/* Left side info */}
      <div className="relative z-10 w-full lg:w-1/3 flex flex-col justify-center px-6 lg:pl-16 lg:pr-8 mb-12 lg:mb-0">
        <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">Направления</p>
        <h2 className="font-display text-5xl md:text-6xl font-bold leading-tight text-foreground mb-6">
          Проекты<br />
          <span className="text-gradient-gold">Студии</span>
        </h2>
        <div className="w-16 h-[1px] bg-primary mb-6" />
        <p className="font-body text-muted-foreground text-sm leading-relaxed max-w-sm">
          Каждый проект — это инструмент для бизнеса. Выберите формат, который подходит под ваши задачи. Выберите подходящий формат сайта. Все проекты адаптируем под мобильные устройства и SEO- требования."
        </p>
        
        {/* Active project info */}
        <div className="hidden lg:block h-24 mt-12 transition-all">
          {hoveredIndex !== null && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <p className="font-display text-3xl text-foreground">{workTypes[hoveredIndex].title}</p>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mt-2">
                {workTypes[hoveredIndex].category}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right side: project cards */}
      <div 
        // Changed gap-6/gap-y-12 to tight gap-2/gap-y-2 (8px) to bring them closer
        className="relative z-10 w-full lg:w-2/3 flex lg:grid lg:grid-cols-4 overflow-x-auto lg:overflow-visible items-center lg:items-start gap-4 lg:gap-4 lg:gap-y-5 px-6 lg:pr-16 lg:pl-8 pb-8 lg:pb-0 snap-x snap-mandatory lg:snap-none hide-scrollbar lg:my-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {workTypes.map((work, i) => (
          <div
            key={i}
            ref={el => { cardsRef.current[i] = el; }}
            // Apply the interlocking logic here
            className={`relative group cursor-pointer flex-none w-[75vw] sm:w-[350px] lg:w-auto snap-center ${getInterlockMargin(i)}`}
            onMouseEnter={() => {
              setHoveredIndex(i);
              const card = cardsRef.current[i];
              // Reduced scale up slightly (1.05 -> 1.03) so they don't overlap too aggressively since they are so close together
              if (card && window.innerWidth > 1024) gsap.to(card, { scale: 1.03, y: -5, zIndex: 20, duration: 0.4, ease: "power2.out" });
            }}
            onMouseLeave={() => {
              setHoveredIndex(null);
              const card = cardsRef.current[i];
              if (card && window.innerWidth > 1024) gsap.to(card, { scale: 1, y: 0, zIndex: 1, duration: 0.4, ease: "power2.out" });
            }}
            data-cursor-hover
          >
            {/* Added a subtle rounding so the tight spacing looks a bit smoother (rounded-md) */}
            <div className="relative overflow-hidden aspect-[3/4] rounded-md border border-white/5 lg:border-none">
              <img
                src={work.img}
                alt={work.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-overlay opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-primary">
                  {work.price}
                </p>
                <p className="font-display text-lg text-foreground mt-1">
                  {work.title}
                </p>
                <p className="font-body text-xs text-muted-foreground mt-1 lg:hidden">
                  {work.category}
                </p>
              </div>
              <div className="absolute top-0 left-0 w-[1px] h-0 bg-primary transition-all duration-700 group-hover:h-full hidden lg:block" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
