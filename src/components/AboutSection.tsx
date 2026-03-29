import { useEffect, useRef } from "react";
import gsap from "gsap";
import sectionAbout from "@/assets/section-about.jpg";
import portrait1 from "@/assets/portrait-1.jpg";
import gallery1 from "@/assets/gallery-1.jpg";

const coreCapabilities = [
  { 
    title: "Кастомная архитектура", 
    desc: "Индивидуальные, масштабируемые решения на базе современных фреймворков." 
  },
  { 
    title: "Адаптивный UI/UX", 
    desc: "Плавные, ориентированные на пользователя интерфейсы, идеально работающие на любых устройствах." 
  },
  { 
    title: "Оптимизация производительности", 
    desc: "Молниеносная загрузка, спроектированная для максимальной конверсии и высоких позиций в SEO." 
  },
];

const AboutSection = ({ isActive }: { isActive: boolean }) => {
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) {
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { clipPath: "circle(0% at 50% 50%)" },
          { clipPath: "circle(75% at 50% 50%)", duration: 1.5, delay: 0.2, ease: "power3.inOut" }
        );
      }
      if (textRef.current) {
        gsap.fromTo(textRef.current, 
          { y: 40, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 1, delay: 0.4, ease: "power3.out" }
        );
      }
      featuresRef.current.forEach((feature, i) => {
        if (feature) {
          gsap.fromTo(feature, 
            { opacity: 0, x: -20 }, 
            { opacity: 1, x: 0, duration: 1, delay: 0.6 + i * 0.15, ease: "power3.out" }
          );
        }
      });
    }
  }, [isActive]);

  return (
    <section className="section-panel flex flex-col lg:flex-row relative w-full min-h-screen overflow-hidden py-20 lg:py-0">
      {/* Background with overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <img src={sectionAbout} alt="Фон студии" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(0 0% 4% / 0.95), hsl(0 0% 4% / 0.80))" }} />
      </div>

      {/* Left: Image composition (Enhanced for Mobile) */}
      <div className="relative z-10 w-full lg:w-2/5 flex items-center justify-center mb-24 lg:mb-0 px-4 sm:px-0">
        <div className="relative mt-8 lg:mt-0">
          
          {/* NEW: Striking mobile-only ambient glow behind the image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gold/20 blur-[60px] rounded-full lg:hidden animate-pulse pointer-events-none" />

          <div ref={imageRef} className="relative z-10 w-72 h-84 sm:w-80 lg:w-80 lg:h-96 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.6)] lg:shadow-2xl border border-white/5 lg:border-none">
            <img src={portrait1} alt="Рабочее пространство" className="w-full h-full object-cover" />
          </div>
          
          {/* Floating accent image - Now visible and optimized for mobile impact */}
          <div className="absolute -bottom-10 -right-6 lg:-bottom-12 lg:-right-12 w-32 h-32 lg:w-40 lg:h-40 overflow-hidden border-2 border-gold glow-gold animate-float shadow-2xl z-20">
            <img src={gallery1} alt="Мокап сайта" className="w-full h-full object-cover" />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 lg:-top-6 lg:-left-6 w-16 h-16 lg:w-20 lg:h-20 border border-gold/40 z-20" />
          <div className="absolute -bottom-6 -left-2 lg:-bottom-4 lg:-left-8 font-display text-8xl text-outline select-none opacity-20 z-0">W</div>
        </div>
      </div>

      {/* Right: Content */}
      <div className="relative z-10 w-full lg:w-3/5 flex flex-col justify-center px-6 sm:px-12 lg:pr-24 lg:pl-12">
        <div ref={textRef}>
          <p className="font-body text-[10px] lg:text-xs tracking-[0.4em] uppercase text-primary mb-4">Веб-студия</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
            Мы создаем
            <br />
            <span className="text-gradient-gold italic">Цифровые</span> экосистемы
          </h2>
          <p className="font-body text-muted-foreground text-sm lg:text-base leading-relaxed max-w-xl mb-10">
            Рожденные из страсти к безупречному коду и потрясающему дизайну, мы превращаем ваше видение в высокоэффективные веб-проекты. Мы не просто создаем страницы; мы проектируем цифровые платформы, оптимизированные для скорости, масштабируемости и результата.
          </p>
        </div>

        {/* Capabilities grid */}
        <div className="space-y-6 max-w-xl">
          {coreCapabilities.map((item, i) => (
            <div 
              key={i} 
              ref={el => { featuresRef.current[i] = el; }}
              className="group pl-4 border-l-2 border-border hover:border-gold transition-colors duration-300"
            >
              <h3 className="font-display text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Floating numbers - Structured perfectly for mobile and desktop */}
        <div className="flex flex-wrap gap-8 sm:gap-10 lg:gap-16 justify-between sm:justify-start mt-12 lg:mt-16 border-t border-white/5 lg:border-none pt-8 lg:pt-0">
          {[
            { num: "250+", label: "Сайтов запущено" }, 
            { num: "99%", label: "Довольных клиентов" }, 
            { num: "10л", label: "Опыта в индустрии" }
          ].map((stat, i) => (
            <div key={i} className="min-w-[45%] sm:min-w-0">
              <p className="font-display text-4xl text-gradient-gold">{stat.num}</p>
              <p className="font-body text-[9px] lg:text-[10px] tracking-[0.15em] lg:tracking-[0.3em] uppercase text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
