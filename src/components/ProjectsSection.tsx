import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import sectionArch from "@/assets/section-architecture.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const projects = [
  { img: project1, title: "Noir Chronograph", category: "Product Design", year: "2024" },
  { img: project2, title: "Volcanic Shores", category: "Photography", year: "2024" },
  { img: project3, title: "Lumina Installation", category: "Art Direction", year: "2023" },
  { img: project4, title: "Metropolis Nights", category: "Urban Studies", year: "2023" },
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
    <section className="section-panel flex relative">
      <div ref={bgRef} className="absolute inset-0">
        <img src={sectionArch} alt="Architecture" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, hsl(0 0% 4% / 0.9), hsl(0 0% 4% / 0.4))" }} />
      </div>

      {/* Left side info */}
      <div className="relative z-10 w-1/3 flex flex-col justify-center pl-16 pr-8">
        <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">Selected Works</p>
        <h2 className="font-display text-6xl font-bold leading-tight text-foreground mb-6">
          Curated<br />
          <span className="text-gradient-gold">Projects</span>
        </h2>
        <div className="w-16 h-[1px] bg-primary mb-6" />
        <p className="font-body text-muted-foreground text-sm leading-relaxed">
          Each project is a world unto itself. We don't follow trends — we set the atmosphere.
        </p>
        
        {/* Active project info */}
        {hoveredIndex !== null && (
          <div className="mt-12 transition-all">
            <p className="font-display text-3xl text-foreground">{projects[hoveredIndex].title}</p>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mt-2">{projects[hoveredIndex].category}</p>
          </div>
        )}
      </div>

      {/* Right side: project cards - staggered vertical layout */}
      <div className="relative z-10 w-2/3 flex items-center gap-6 pr-16 pl-8">
        {projects.map((project, i) => (
          <div
            key={i}
            ref={el => { cardsRef.current[i] = el; }}
            className="relative group cursor-pointer flex-1"
            style={{ marginTop: i % 2 === 0 ? "0" : "80px" }}
            onMouseEnter={() => {
              setHoveredIndex(i);
              const card = cardsRef.current[i];
              if (card) gsap.to(card, { scale: 1.05, y: -10, duration: 0.4, ease: "power2.out" });
            }}
            onMouseLeave={() => {
              setHoveredIndex(null);
              const card = cardsRef.current[i];
              if (card) gsap.to(card, { scale: 1, y: i % 2 === 0 ? 0 : 0, duration: 0.4, ease: "power2.out" });
            }}
            data-cursor-hover
          >
            <div className="relative overflow-hidden aspect-[3/4]">
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-overlay opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-primary">{project.year}</p>
                <p className="font-display text-lg text-foreground mt-1">{project.title}</p>
              </div>
              {/* Gold accent line */}
              <div className="absolute top-0 left-0 w-[1px] h-0 bg-primary transition-all duration-700 group-hover:h-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
