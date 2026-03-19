import { useEffect, useRef } from "react";
import gsap from "gsap";
import sectionAbout from "@/assets/section-about.jpg";
import portrait1 from "@/assets/portrait-1.jpg";
import gallery1 from "@/assets/gallery-1.jpg";

const skills = [
  { name: "Brand Identity", value: 95 },
  { name: "Motion Design", value: 88 },
  { name: "3D Visualization", value: 82 },
  { name: "Photography", value: 91 },
];

const AboutSection = ({ isActive }: { isActive: boolean }) => {
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) {
      barsRef.current.forEach((bar, i) => {
        if (bar) {
          gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 1.2, delay: 0.3 + i * 0.1, ease: "power3.out" });
        }
      });
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { clipPath: "circle(0% at 50% 50%)" },
          { clipPath: "circle(75% at 50% 50%)", duration: 1.5, delay: 0.2, ease: "power3.inOut" }
        );
      }
      if (textRef.current) {
        gsap.fromTo(textRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.4, ease: "power3.out" });
      }
    }
  }, [isActive]);

  return (
    <section className="section-panel flex relative">
      <div className="absolute inset-0">
        <img src={sectionAbout} alt="About bg" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(0 0% 4% / 0.85), hsl(0 0% 4% / 0.6))" }} />
      </div>

      {/* Left: Image composition */}
      <div className="relative z-10 w-2/5 flex items-center justify-center">
        <div className="relative">
          <div ref={imageRef} className="w-80 h-96 overflow-hidden">
            <img src={portrait1} alt="Portrait" className="w-full h-full object-cover" />
          </div>
          {/* Floating accent image */}
          <div className="absolute -bottom-12 -right-12 w-40 h-40 overflow-hidden border-2 border-gold glow-gold animate-float">
            <img src={gallery1} alt="Accent" className="w-full h-full object-cover" />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-20 h-20 border border-gold/20" />
          <div className="absolute -bottom-4 -left-8 font-display text-8xl text-outline select-none opacity-30">A</div>
        </div>
      </div>

      {/* Right: Content */}
      <div ref={textRef} className="relative z-10 w-3/5 flex flex-col justify-center pr-20 pl-8">
        <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">About the Studio</p>
        <h2 className="font-display text-5xl font-bold text-foreground leading-tight mb-8">
          We Create
          <br />
          <span className="text-gradient-gold italic">Impossible</span> Things
        </h2>
        <p className="font-body text-muted-foreground text-sm leading-relaxed max-w-lg mb-12">
          Born from the intersection of obsession and craft, Obsidian Studio transforms abstract visions into tangible digital realities. Every pixel is intentional, every animation purposeful.
        </p>

        {/* Skill bars - unique diagonal style */}
        <div className="space-y-6 max-w-lg">
          {skills.map((skill, i) => (
            <div key={i} className="relative">
              <div className="flex justify-between items-center mb-2">
                <span className="font-body text-xs tracking-[0.2em] uppercase text-foreground">{skill.name}</span>
                <span className="font-display text-lg text-primary">{skill.value}%</span>
              </div>
              <div className="h-[2px] bg-border relative overflow-hidden">
                <div
                  ref={el => { barsRef.current[i] = el; }}
                  className="absolute inset-y-0 left-0 origin-left"
                  style={{ width: `${skill.value}%`, background: "var(--gradient-gold)" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Floating numbers */}
        <div className="flex gap-16 mt-16">
          {[{ num: "150+", label: "Projects" }, { num: "12", label: "Awards" }, { num: "8yr", label: "Experience" }].map((stat, i) => (
            <div key={i}>
              <p className="font-display text-4xl text-gradient-gold">{stat.num}</p>
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
