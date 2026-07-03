import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { projects } from "../data/projects";

function WorksSection() {
  const [activeId, setActiveId] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [isTouch, setIsTouch] = useState(false);

  const sectionRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);
  const scale = useMotionValue(0.95);

  // Detect touch/coarse-pointer devices (Android phones/tablets) once on mount
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsTouch(mq.matches);
    const handler = (e) => setIsTouch(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setActiveId(null);
          animate(opacity, 0, { duration: 0.25 });
          animate(scale, 0.95, { duration: 0.25 });
        }
      },
      { threshold: 0 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [opacity, scale]);

  // Skip the expensive mousemove spring-follow entirely on touch devices —
  // the floating preview panel is desktop-only (hidden md:block) anyway,
  // so this saves needless work/jank on Android.
  const handleMouseMove = useCallback(
    (e) => {
      if (isTouch) return;

      animate(x, e.clientX - 60, {
        type: "spring",
        stiffness: 80,
        damping: 20,
      });

      animate(y, e.clientY - 40, {
        type: "spring",
        stiffness: 80,
        damping: 20,
      });
    },
    [isTouch, x, y]
  );

  const handleEnter = (project) => {
    setActiveId(project.id);
    setCurrentImage(project.image);

    animate(opacity, 1, { duration: 0.3 });
    animate(scale, 1, {
      type: "spring",
      stiffness: 180,
      damping: 18,
    });
  };

  const handleLeave = () => {
    setActiveId(null);

    animate(opacity, 0, { duration: 0.3 });
    animate(scale, 0.95, {
      duration: 0.3,
    });
  };

  // Touch equivalent: tapping a row toggles the background-reveal effect
  // (the image preview stays desktop-only, since it's hidden on mobile viewports)
  const handleTouch = (project) => {
    setActiveId((prev) => (prev === project.id ? null : project.id));
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#ECECE8] text-black px-5 py-6 pt-[300px] md:pt-[770px] overflow-x-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
    >
      <h1 className="text-[56px] sm:text-[72px] md:text-[92px] font-[300] tracking-[-2px] md:tracking-[-4px] leading-none">
        MY WORKS
      </h1>

      <div className="mt-4 border-t border-black/70"></div>

      <div className="mt-20">
        {projects.map((project) => {
          const isActive = activeId === project.id;

          return (
            <div
              key={project.id}
              onMouseEnter={() => !isTouch && handleEnter(project)}
              onClick={() => isTouch && handleTouch(project)}
              className="relative h-[96px] px-4 py-5 cursor-pointer overflow-hidden touch-manipulation"
            >
              <motion.div
                className="absolute inset-0 bg-[#4E5564]"
                initial={{ y: "105%" }}
                animate={{
                  y: isActive ? "0%" : "105%",
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.19, 1, 0.22, 1],
                }}
              />

              <div
                className={`relative z-10 flex flex-col gap-1 transition-colors duration-300 ${
                  isActive ? "text-white" : "text-black"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-[24px] sm:text-[28px] md:text-[31px] font-[500] leading-none tracking-[-0.5px]">
                    {project.title}
                  </h2>
                  <span className="text-[26px]">↗</span>
                </div>

                <div className="border-t border-current"></div>

                <div className="flex gap-5 flex-wrap">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-[14px] font-[300] uppercase leading-[28px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <motion.div
        style={{ x, y, opacity, scale }}
        className="fixed -top-2/6 left-0 z-50 w-[960px] h-[430px] overflow-hidden border-[4px] border-black bg-white pointer-events-none hidden md:block"
      >
        {currentImage && (
          <motion.img
            key={currentImage}
            src={currentImage}
            alt=""
            className="absolute inset-0 w-full h-full object-contain bg-white"
            initial={{
              opacity: 0,
              scale: 1.08,
              filter: "blur(12px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.7,
              ease: [0.19, 1, 0.22, 1],
            }}
          />
        )}
      </motion.div>
    </section>
  );
}

export default WorksSection;
