import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { createPortal } from "react-dom";

type Project = {
  title: string;
  category: string;
  video: string;
  gallery: string[];
  description: string;
  link: string;
};

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeMedia, setActiveMedia] = useState<string | null>(null);
  const [fullscreen, setFullscreen] = useState(false);

  const isDesktop =
    typeof window !== "undefined" && window.innerWidth >= 1024;

  /* ---------- OPEN ANIMATION ---------- */

  useEffect(() => {
    if (!project || !modalRef.current) return;

    gsap.fromTo(
      modalRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }
    );
  }, [project]);

  /* ---------- BODY LOCK ---------- */

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      setActiveMedia(project.video);
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [project]);

  if (!project) return null;

  const modalUI = (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        style={{
          zIndex: 20,
        }}
        onClick={onClose}
      >
        {/* MODAL */}
        <div
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          className="w-full lg:h-[95vh] max-w-6xl bg-[#0b0b0b] rounded-xl border border-white/10 overflow-hidden shadow-2xl pointer-events-auto"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center p-5 border-b border-white/10">
            <div>
              <h3 className="font-display text-2xl">{project.title}</h3>
              <p className="text-xs tracking-widest text-primary uppercase">
                {project.category}
              </p>
            </div>

            <button
              onClick={onClose}
              className="text-white/60 hover:text-white text-xl"
            >
              ✕
            </button>
          </div>

          {/* CONTENT */}
          <div className="p-5 space-y-5">
            {/* DESKTOP LAYOUT */}
            <div className="lg:flex lg:gap-6 lg:h-[75%]">
              {/* MAIN MEDIA */}
              <div className="relative lg:w-[70%] aspect-video bg-black rounded-lg overflow-hidden">
                {activeMedia?.endsWith(".mp4") ? (
                  <video
                    src={activeMedia}
                    autoPlay
                    controls
                    playsInline
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <img
                    src={activeMedia!}
                    onClick={() => setFullscreen(true)}
                    className="w-full h-full object-cover cursor-zoom-in"
                  />
                )}
              </div>

              {/* RIGHT SIDE (DESKTOP ONLY) */}
              <div className="hidden lg:flex lg:flex-col lg:justify-between lg:w-[30%]">
                <p className="text-sm text-white/70 leading-relaxed">
                  {project.description}
                </p>

                <a
                  href={project.link}
                  target="_blank"
                  className="mt-4 inline-block text-center border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary hover:text-black transition"
                >
                  Смотреть проект
                </a>
              </div>
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-3 overflow-x-auto">
              <button
                onClick={() => setActiveMedia(project.video)}
                className={`relative aspect-video min-w-[120px] rounded-md overflow-hidden border ${
                  activeMedia === project.video
                    ? "border-primary"
                    : "border-white/10"
                }`}
              >
                <video
                  src={project.video}
                  muted
                  className="w-full h-full object-cover opacity-80"
                />
              </button>

              {project.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveMedia(img)}
                  className={`aspect-video min-w-[120px] rounded-md overflow-hidden border ${
                    activeMedia === img
                      ? "border-primary"
                      : "border-white/10"
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* MOBILE LINK BUTTON */}
            <div className="lg:hidden mt-5 text-center">
              <a
                href={project.link}
                target="_blank"
                className="inline-block border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary hover:text-black transition"
              >
                Смотреть проект
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN IMAGE */}
      {fullscreen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-default"
          style={{
            zIndex: 20,
            pointerEvents: "auto",
          }}
          onClick={onClose}
        >
          <img
            src={activeMedia!}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
    </>
  );

  return createPortal(modalUI, document.body);
}