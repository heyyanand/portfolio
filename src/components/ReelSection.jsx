import { useEffect, useRef } from "react";

function ReelSection() {
  const sectionRef = useRef(null);
  const reelRef = useRef(null);

  const pos = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(null);
  const activeRef = useRef(false);
  const frameRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const animate = () => {
      if (!activeRef.current) {
        frameRef.current = null;
        return;
      }

      pos.current -= 1.5 + velocity.current;
      velocity.current *= 0.94;

      const reelWidth =
        reelRef.current?.scrollWidth
          ? reelRef.current.scrollWidth / 2
          : 1920;

      if (pos.current <= -reelWidth) {
        pos.current = 0;
      }

      if (reelRef.current) {
        reelRef.current.style.transform = `translate3d(${pos.current}px, 0, 0)`;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (prefersReducedMotion || frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(animate);
    };

    const stopLoop = () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        activeRef.current = entry.isIntersecting;

        if (reelRef.current) {
          reelRef.current.style.willChange = entry.isIntersecting
            ? "transform"
            : "auto";
        }

        if (entry.isIntersecting) startLoop();
        else stopLoop();
      },
      {
        rootMargin: "50% 0px 50% 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      stopLoop();
    };
  }, []);

  const handleMouseMove = (e) => {
    if (lastX.current !== null) {
      const dx = e.clientX - lastX.current;
      velocity.current += dx * 0.05;
    }
    lastX.current = e.clientX;
  };

  const handleLeave = () => {
    lastX.current = null;
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      className="relative w-full overflow-hidden py-5 border-y border-white/10"
      style={{ backgroundColor: "#160306" }}
    >
      {/* Depth glow layers — visible across the whole strip, not faded out at edges,
          so the band reads as its own distinct section */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Pink glow, left */}
        <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-[420px] h-[300px] bg-pink-600/35 rounded-full blur-[100px]" />
        {/* Red glow, right */}
        <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-[420px] h-[300px] bg-red-600/35 rounded-full blur-[100px]" />
        {/* Center accent for extra depth */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[220px] bg-fuchsia-500/20 rounded-full blur-[90px]" />
      </div>

      <div
        ref={reelRef}
        className="relative z-10 flex whitespace-nowrap"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="shrink-0 text-white text-[42px] font-[400] leading-none tracking-normal px-16"
          >
            <div className="flex items-center gap-x-32">
              <span>✦ INNOVATION</span>
              <span>✦ TRUST</span>
              <span>✦ COLLABORATION</span>
            </div>
          </div>
        ))}

        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`dup-${i}`}
            className="shrink-0 text-white text-[42px] font-[400] leading-none tracking-normal px-16"
          >
            <div className="flex items-center gap-x-32">
              <span>✦ INNOVATION</span>
              <span>✦ TRUST</span>
              <span>✦ COLLABORATION</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ReelSection;