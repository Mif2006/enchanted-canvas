import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import sectionArch from "@/assets/section-architecture.jpg";
import typeLanding from "@/assets/project-1.jpg";
import typeStore from "@/assets/project-2.jpg";
import typeCorporate from "@/assets/project-3.jpg";
import typeCustom from "@/assets/project-4.jpg";

const workTypes = [
  { img: typeLanding, title: "Landing Page", category: "Лендинг", price: "от 199 BYN" },
  { img: typeStore, title: "E-commerce", category: "Магазин", price: "от 899 BYN" },
  { img: typeCorporate, title: "Corporate", category: "Корпоративный", price: "от 599 BYN" },
  { img: typeCustom, title: "Custom Web", category: "Сложные проекты", price: "Индивидуально" },
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
            { y: 0, opacity: 1, rotateY: 0, duration: 1, delay: i * 0.15, ease: "power3.out" }
          );
        }
      });
    }
  }, [isActive]);

  return (
    <section className="section-panel flex flex-col lg:flex-row relative min-h-screen py-20 lg:py-0">
      <div ref={bgRef} className="absolute inset-0">
        <img src={sectionArch} alt="Фон" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, hsl(0 0% 4% / 0.9), hsl(0 0% 4% / 0.4))" }} />
      </div>

      {/* Left side info (Верх на мобильных, слева на ПК) */}
      <div className="relative z-10 w-full lg:w-1/3 flex flex-col justify-center px-6 lg:pl-16 lg:pr-8 mb-12 lg:mb-0">
        <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">Направления</p>
        <h2 className="font-display text-5xl md:text-6xl font-bold leading-tight text-foreground mb-6">
          Проекты<br />
          <span className="text-gradient-gold">Студии</span>
        </h2>
        <div className="w-16 h-[1px] bg-primary mb-6" />
        <p className="font-body text-muted-foreground text-sm leading-relaxed max-w-sm">
          Каждый проект — это инструмент для бизнеса. Выберите формат, который подходит под ваши задачи.
        </p>
        
        {/* Active project info (Только для ПК, как в оригинале) */}
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

      {/* Right side: project cards (Горизонтальный скролл на мобильных, оригинальная сетка на ПК) */}
      <div 
        className="relative z-10 w-full lg:w-2/3 flex overflow-x-auto lg:overflow-visible items-center gap-6 px-6 lg:pr-16 lg:pl-8 pb-8 lg:pb-0 snap-x snap-mandatory lg:snap-none hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {workTypes.map((work, i) => (
          <div
            key={i}
            ref={el => { cardsRef.current[i] = el; }}
            // На мобильных: фиксированная ширина для карусели. На ПК: flex-1 с оригинальным margin-top
            className={`relative group cursor-pointer flex-none w-[75vw] sm:w-[350px] lg:w-auto lg:flex-1 snap-center ${
              i % 2 !== 0 ? "lg:mt-[80px]" : ""
            }`}
            onMouseEnter={() => {
              setHoveredIndex(i);
              const card = cardsRef.current[i];
              // Анимация наведения только для десктопа, чтобы не баговало при скролле на телефоне
              if (card && window.innerWidth > 1024) gsap.to(card, { scale: 1.05, y: -10, duration: 0.4, ease: "power2.out" });
            }}
            onMouseLeave={() => {
              setHoveredIndex(null);
              const card = cardsRef.current[i];
              if (card && window.innerWidth > 1024) gsap.to(card, { scale: 1, y: 0, duration: 0.4, ease: "power2.out" });
            }}
            data-cursor-hover
          >
            <div className="relative overflow-hidden aspect-[3/4] border border-white/5 lg:border-none">
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
                {/* Категория видна только на мобильных, так как на ПК она выводится слева */}
                <p className="font-body text-xs text-muted-foreground mt-1 lg:hidden">
                  {work.category}
                </p>
              </div>
              {/* Gold accent line */}
              <div className="absolute top-0 left-0 w-[1px] h-0 bg-primary transition-all duration-700 group-hover:h-full hidden lg:block" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
