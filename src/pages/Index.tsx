import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import CustomCursor from "@/components/CustomCursor";
import NavigationDots from "@/components/NavigationDots";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import GallerySection from "@/components/GallerySection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

const SECTIONS = 5;

const Index = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const navigateTo = useCallback((index: number) => {
    if (isAnimating.current || index === activeIndex || index < 0 || index >= SECTIONS) return;
    isAnimating.current = true;

    const container = containerRef.current;
    if (!container) return;

    gsap.to(container, {
      x: -index * window.innerWidth,
      duration: 1.2,
      ease: "power3.inOut",
      onUpdate: () => {
        const progress = index / (SECTIONS - 1);
        setScrollProgress(progress);
      },
      onComplete: () => {
        setActiveIndex(index);
        isAnimating.current = false;
      },
    });
    setActiveIndex(index);
  }, [activeIndex]);

  useEffect(() => {
    let accumulated = 0;
    const threshold = 80;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      accumulated += e.deltaY;

      if (Math.abs(accumulated) > threshold) {
        if (accumulated > 0) navigateTo(activeIndex + 1);
        else navigateTo(activeIndex - 1);
        accumulated = 0;
      }

      // Reset accumulator after a pause
      setTimeout(() => { accumulated = 0; }, 200);
    };

    // Touch support
    let touchStartX = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStartX = e.touches[0].clientX; };
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 60) {
        if (diff > 0) navigateTo(activeIndex + 1);
        else navigateTo(activeIndex - 1);
      }
    };

    // Keyboard
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") navigateTo(activeIndex + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") navigateTo(activeIndex - 1);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKey);
    };
  }, [activeIndex, navigateTo]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-background">
      <CustomCursor />
      <NavigationDots activeIndex={activeIndex} onNavigate={navigateTo} />
      
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50">
        <div
          className="h-full transition-all duration-1000 ease-out"
          style={{
            width: `${((activeIndex) / (SECTIONS - 1)) * 100}%`,
            background: "var(--gradient-gold)",
          }}
        />
      </div>

      {/* Section counter */}
      <div className="fixed bottom-8 left-8 z-50 font-body text-xs tracking-[0.2em] text-muted-foreground">
        <span className="text-primary font-display text-2xl">{String(activeIndex + 1).padStart(2, "0")}</span>
        <span className="mx-2">/</span>
        <span>{String(SECTIONS).padStart(2, "0")}</span>
      </div>

      {/* Horizontal panels container */}
      <div
        ref={containerRef}
        className="flex h-screen"
        style={{ width: `${SECTIONS * 100}vw` }}
      >
        <HeroSection scrollProgress={scrollProgress} onNavigate={navigateTo} />
        <ProjectsSection isActive={activeIndex === 1} />
        <GallerySection isActive={activeIndex === 2} />
        <AboutSection isActive={activeIndex === 3} />
        <ContactSection isActive={activeIndex === 4} />
      </div>
    </div>
  );
};

export default Index;
