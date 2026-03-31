import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import sectionArch from "@/assets/section-architecture.jpg";
import Project1 from "@/assets/Project1.jpg";
import Project2 from "@/assets/Project2.jpg";
import Project3 from "@/assets/Project3.jpg";
import Project4 from "@/assets/Project4.jpeg";
import Project5 from "@/assets/Insta1.png";
import Project6 from "@/assets/3.png";
import Project7 from "@/assets/4.png";
import Project9 from "@/assets/16.png";
import Project10 from "@/assets/17.png";
import Project11 from "@/assets/18.png";
import Project12 from "@/assets/19.png";
import Project13 from "@/assets/20.png";

import ProjectModal from "@/components/ProjectModal";

export type Project = {
  title: string;
  category: string;
  video: string;
  gallery: string[];
  description: string;
  link: string;
};

const workTypes = [
  { img: Project10, title: "Landing Page", category: "Лендинг", price: "от 199 BYN" },
  { img: Project11, title: "E-commerce", category: "Магазин", price: "от 899 BYN" },
  { img: Project12, title: "Corporate", category: "Корпоративный", price: "от 599 BYN" },
  { img: Project13, title: "Custom Web", category: "Сложные проекты", price: "Индивидуально" },
];

const projectsData: Project[] = [
  {
    title: "Landing Page",
    category: "Лендинг",
    video: "/videos/landing.mp4",
    gallery: [Project1, Project2, Project3],
    description: "Современный лендинг с высокой конверсией.",
    link: "#",
  },
  {
    title: "E-commerce",
    category: "Магазин",
    video: "/videos/store.mp4",
    gallery: [Project4, Project5, Project6],
    description: "Интернет-магазин с удобной навигацией и оплатой.",
    link: "#",
  },
  {
    title: "Corporate",
    category: "Корпоративный",
    video: "/videos/corporate.mp4",
    gallery: [Project7, Project9, Project10],
    description: "Корпоративный сайт для представления бизнеса.",
    link: "#",
  },
  {
    title: "Custom Web",
    category: "Сложные проекты",
    video: "/videos/custom.mp4",
    gallery: [Project11, Project12, Project13],
    description: "Индивидуальные решения под любые задачи.",
    link: "#",
  },
];

const ProjectsSection = ({ isActive }: { isActive: boolean }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) {
      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 100, opacity: 0, rotateY: -15 },
            {
              y: 0,
              opacity: 1,
              rotateY: 0,
              duration: 1,
              delay: i * 0.1,
              ease: "power3.out",
            }
          );
        }
      });
    }
  }, [isActive]);

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
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, hsl(0 0% 4% / 0.9), hsl(0 0% 4% / 0.4))",
          }}
        />
      </div>

      {/* Left side info */}
      <div className="relative z-10 w-full lg:w-1/3 flex flex-col justify-center px-6 lg:pl-16 lg:pr-8 mb-12 lg:mb-0">
        <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">
          Направления
        </p>
        <h2 className="font-display text-5xl md:text-6xl font-bold leading-tight text-foreground mb-6">
          Проекты
          <br />
          <span className="text-gradient-gold">Студии</span>
        </h2>
        <div className="w-16 h-[1px] bg-primary mb-6" />
        <p className="font-body text-muted-foreground text-sm leading-relaxed max-w-sm">
          Каждый проект — это инструмент для бизнеса. Выберите формат, который подходит под ваши задачи. Выберите подходящий формат сайта. Все проекты адаптируем под мобильные устройства и SEO- требования."
        </p>

        <div className="hidden lg:block h-24 mt-12 transition-all">
          {hoveredIndex !== null && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <p className="font-display text-3xl text-foreground">
                {workTypes[hoveredIndex].title}
              </p>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mt-2">
                {workTypes[hoveredIndex].category}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right side */}
      <div className="relative z-10 w-full lg:w-2/3 flex lg:grid lg:grid-cols-4 overflow-x-auto lg:overflow-visible items-center lg:items-start gap-4 lg:gap-4 lg:gap-y-5 px-6 lg:pr-16 lg:pl-8 pb-8 lg:pb-0 snap-x snap-mandatory lg:snap-none hide-scrollbar lg:my-auto">
        {workTypes.map((work, i) => (
          <div
            key={i}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className={`relative group cursor-pointer flex-none w-[75vw] sm:w-[350px] lg:w-auto snap-center ${getInterlockMargin(i)}`}
            onClick={() => setSelectedProject(projectsData[i])}
            onMouseEnter={() => {
              setHoveredIndex(i);
              const card = cardsRef.current[i];
              if (card && window.innerWidth > 1024)
                gsap.to(card, { scale: 1.03, y: -5, zIndex: 20, duration: 0.4, ease: "power2.out" });
            }}
            onMouseLeave={() => {
              setHoveredIndex(null);
              const card = cardsRef.current[i];
              if (card && window.innerWidth > 1024)
                gsap.to(card, { scale: 1, y: 0, zIndex: 1, duration: 0.4, ease: "power2.out" });
            }}
          >
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

      {/* MODAL */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default ProjectsSection;
