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

  const title = "LET'S TALK";

  return (
    <section ref={containerRef} className="section-panel flex relative">
      <div className="absolute inset-0">
        <img src={sectionContact} alt="Contact bg" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 50%, hsl(0 0% 4% / 0.6), hsl(0 0% 4% / 0.95))" }} />
      </div>

      {/* Left side: giant text */}
      <div className="relative z-10 w-1/2 flex flex-col justify-center pl-16">
        <div className="overflow-hidden" style={{ perspective: "600px" }}>
          <h2 className="font-display text-8xl font-bold tracking-tight leading-none">
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
        <div className="w-24 h-[1px] bg-primary my-10" />
        <p className="font-body text-muted-foreground text-sm max-w-sm leading-relaxed">
          Have a project in mind? Let's create something extraordinary together. Every great collaboration starts with a conversation.
        </p>

        <div className="flex gap-8 mt-12">
          {["Instagram", "Behance", "Dribbble"].map((social, i) => (
            <a
              key={i}
              href="#"
              data-cursor-hover
              className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
            >
              {social}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-500" />
            </a>
          ))}
        </div>
      </div>

      {/* Right side: contact form & image */}
      <div className="relative z-10 w-1/2 flex items-center justify-center pr-16">
        <div className="relative w-full max-w-md">
          {/* Background image accent */}
          <div className="absolute -top-20 -right-20 w-48 h-48 overflow-hidden opacity-40 animate-float">
            <img src={heroBg} alt="Accent" className="w-full h-full object-cover" />
          </div>

          <div className="relative space-y-6">
            <div className="group">
              <label className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Name</label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-border py-3 font-body text-foreground focus:outline-none focus:border-primary transition-colors duration-300"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Email</label>
              <input
                type="email"
                className="w-full bg-transparent border-b border-border py-3 font-body text-foreground focus:outline-none focus:border-primary transition-colors duration-300"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Message</label>
              <textarea
                rows={3}
                className="w-full bg-transparent border-b border-border py-3 font-body text-foreground focus:outline-none focus:border-primary transition-colors duration-300 resize-none"
                placeholder="Tell us about your vision..."
              />
            </div>
            <button
              data-cursor-hover
              className="magnetic-btn w-full py-4 border border-gold font-body text-xs tracking-[0.3em] uppercase text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 mt-4"
            >
              Send Message
            </button>
          </div>

          {/* Corner decoration */}
          <div className="absolute -bottom-8 -left-8 w-16 h-16 border-b border-l border-gold/20" />
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
        © 2024 Obsidian Studio. All rights reserved.
      </div>
    </section>
  );
};

export default ContactSection;
