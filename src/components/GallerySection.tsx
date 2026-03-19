import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import portrait1 from "@/assets/portrait-1.jpg";
import sectionLandscape from "@/assets/section-landscape.jpg";

const images = [gallery1, gallery2, gallery3, gallery4, portrait1, sectionLandscape];

const GallerySection = ({ isActive }: { isActive: boolean }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && titleRef.current) {
      gsap.fromTo(titleRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" });
    }
  }, [isActive]);

  return (
    <section className="section-panel flex flex-col relative">
      <div className="absolute inset-0">
        <img src={sectionLandscape} alt="Landscape" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      {/* Marquee text */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden py-6 z-10 border-b border-border">
        <div ref={marqueeRef} className="marquee-track whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="font-display text-8xl text-outline mx-8 select-none">
              GALLERY
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center pt-32 pb-16">
        <div className="px-16 mb-12">
          <h2 ref={titleRef} className="font-display text-5xl font-bold text-foreground">
            Visual <span className="text-gradient-gold">Journey</span>
          </h2>
          <p className="font-body text-muted-foreground text-sm mt-4 max-w-md">
            A curated collection exploring the interplay between light, shadow, and form.
          </p>
        </div>

        {/* Coverflow Swiper */}
        <div className="w-full">
          <Swiper
            modules={[EffectCoverflow, Autoplay]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView={3}
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 200,
              modifier: 1.5,
              slideShadows: false,
            }}
            className="w-full"
          >
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <div className="relative overflow-hidden group" data-cursor-hover>
                  <img
                    src={img}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-[55vh] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute bottom-4 left-4 font-body text-xs tracking-[0.3em] uppercase text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    View {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Bottom stats bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-border flex">
        {["Photography", "Art Direction", "Motion", "Branding"].map((label, i) => (
          <div key={i} className="flex-1 py-4 px-8 border-r border-border last:border-r-0 group" data-cursor-hover>
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground group-hover:text-primary transition-colors duration-300">{label}</p>
            <p className="font-display text-2xl text-foreground mt-1">{[24, 18, 12, 31][i]}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;
