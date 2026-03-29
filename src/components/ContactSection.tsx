import { useEffect, useRef } from "react";
import gsap from "gsap";
import sectionContact from "@/assets/section-contact.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const ContactSection = ({ isActive }: { isActive: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (isActive) {
      lettersRef.current.forEach((letter, i) => {
        if (letter) {
          gsap.fromTo(letter,
            { y: 120, rotateX: 90, opacity: 0 },
            { y: 0, rotateX: 0, opacity: 1, duration: 1, delay: i * 0.05, ease: "power4.out" }
          );
        }
      });
    }
  }, [isActive]);

  const title = "Свяжитесь с     нами";

  return (
    <section ref={containerRef} className="section-panel flex flex-col lg:flex-row relative min-h-screen py-20 lg:py-0 overflow-x-hidden">
      <div className="absolute inset-0">
        <img src={sectionContact} alt="Contact bg" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 50%, hsl(0 0% 4% / 0.6), hsl(0 0% 4% / 0.95))" }} />
      </div>

      {/* Left side: giant text */}
      <div className="relative z-10 w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:pl-16 lg:pr-0 mb-16 lg:mb-0 mt-8 lg:mt-0">
        <div className="overflow-hidden" style={{ perspective: "600px" }}>
          <h2 className="font-display text-center text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none flex flex-wrap">
            {title.split("").map((char, i) => (
              <span
                key={i}
                ref={el => { lettersRef.current[i] = el; }}
                className="inline-block text-gradient-gold"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
        </div>
        <div className="w-16 lg:w-24 h-[1px] bg-primary my-6 lg:my-10" />
        <p className="font-body text-muted-foreground text-sm max-w-sm leading-relaxed">
          Есть идея для сайта? Давайте создадим нечто выдающееся вместе. Каждый успешный веб-проект начинается с простого разговора.
        </p>

        <div className="flex flex-wrap gap-6 lg:gap-8 mt-10 lg:mt-12">
          {["Telegram", "Behance", "Dribbble"].map((social, i) => (
            <a
              key={i}
              href="#"
              data-cursor-hover
              className="font-body text-[10px] lg:text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
            >
              {social}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-500" />
            </a>
          ))}
        </div>
      </div>

      {/* Right side: contact form & image */}
      <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center px-6 md:px-12 lg:pr-16 lg:pl-0 pb-12 lg:pb-0">
        <div className="relative w-full max-w-md">
          {/* Background image accent - hidden on mobile to prevent clutter */}
          <div className="hidden lg:block absolute -top-20 -right-20 w-48 h-48 overflow-hidden opacity-40 animate-float pointer-events-none">
            <img src={heroBg} alt="Accent" className="w-full h-full object-cover" />
          </div>

          <div className="relative space-y-6 bg-background/5 lg:bg-transparent p-6 lg:p-0 rounded-2xl border border-white/5 lg:border-none backdrop-blur-sm lg:backdrop-blur-none">
            <div className="group">
              <label className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Имя</label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-border py-3 font-body text-foreground focus:outline-none focus:border-primary transition-colors duration-300"
                placeholder="Ваше имя"
              />
            </div>
            <div>
              <label className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Email</label>
              <input
                type="email"
                className="w-full bg-transparent border-b border-border py-3 font-body text-foreground focus:outline-none focus:border-primary transition-colors duration-300"
                placeholder="ваш@email.com"
              />
            </div>
            <div>
              <label className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Сообщение</label>
              <textarea
                rows={3}
                className="w-full bg-transparent border-b border-border py-3 font-body text-foreground focus:outline-none focus:border-primary transition-colors duration-300 resize-none"
                placeholder="Какой сайт вам нужен? Расскажите о вашей идее..."
              />
            </div>
            <button
              data-cursor-hover
              className="magnetic-btn w-full py-4 border border-gold font-body text-[10px] lg:text-xs tracking-[0.3em] uppercase text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 mt-4"
            >
              Отправить сообщение
            </button>
          </div>

          {/* Corner decoration - adjusted for mobile */}
          <div className="absolute -bottom-4 -left-4 lg:-bottom-8 lg:-left-8 w-12 h-12 lg:w-16 lg:h-16 border-b border-l border-gold/20 pointer-events-none" />
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="absolute bottom-6 left-0 right-0 text-center z-10 font-body text-[9px] lg:text-[10px] tracking-[0.3em] uppercase text-muted-foreground px-4">
        © 2026 Студия Obsidian. Все права защищены.
      </div>
    </section>
  );
};

export default ContactSection;
