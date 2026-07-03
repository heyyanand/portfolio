import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { useRef, useEffect, useMemo, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

/* ---------- Mobile detection hook ---------- */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}

function PlanetModel({ isVisible, isMobile }) {
  const groupRef = useRef();
  const ringRef = useRef();
  const goldBallRef = useRef();
  const canMoveBall = useRef(false);
  const settled = useRef(false);

  const { scene } = useGLTF("/models/Planet.glb");
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  const target = useMemo(
    () =>
      new THREE.Vector3(
        -0.6470320224761963,
        -1.0304659605026245,
        -0.7236542701721191
      ),
    []
  );

  const baseRotation = useMemo(
    () => new THREE.Euler(0, Math.PI, -Math.PI),
    []
  );

  useEffect(() => {
    canMoveBall.current = false;
    settled.current = false;
    ringRef.current = null;
    goldBallRef.current = null;

    clonedScene.traverse((obj) => {
      if (obj.name === "Sphere2") {
        goldBallRef.current = obj;
        obj.position.set(0, 0, 0);
      }

      if (obj.name === "Ring") {
        ringRef.current = obj;
      }
    });

    const timer = setTimeout(() => {
      canMoveBall.current = true;
    }, 700);

    return () => {
      clearTimeout(timer);
      canMoveBall.current = false;
      settled.current = false;
    };
  }, [clonedScene]);

  const startY = 5;
  const targetY = 0;
  // Slightly slower spin on mobile keeps GPU load down without looking different
  const RING_SPIN_SPEED = isMobile ? 0.8 : 1.0;

  // Smaller / repositioned on narrow viewports so the model doesn't get
  // cropped by the taller, narrower aspect ratio of a phone screen.
  const scale = isMobile ? 1.15 : 1.7;
  const groupPosition = isMobile ? [0, startY, 0] : [0, startY, 0];

  useFrame((_, delta) => {
    if (!isVisible) return;

    const group = groupRef.current;
    if (!group) return;

    const t = performance.now() * 0.001;

    group.position.y += (targetY - group.position.y) * 0.035;

    const floatY = targetY + Math.sin(t * 0.65) * 0.22;
    const swayY = Math.sin(t * 0.28) * 0.06;
    const swayX = Math.cos(t * 0.22) * 0.025;
    const swayZ = Math.sin(t * 0.18) * 0.012;

    group.position.y += (floatY - group.position.y) * 0.04;

    const targetRotY = baseRotation.y + swayY;
    const targetRotX = baseRotation.x + swayX;
    const targetRotZ = baseRotation.z + swayZ;

    group.rotation.y += (targetRotY - group.rotation.y) * 0.03;
    group.rotation.x += (targetRotX - group.rotation.x) * 0.03;
    group.rotation.z += (targetRotZ - group.rotation.z) * 0.03;

    if (goldBallRef.current && canMoveBall.current && !settled.current) {
      const ball = goldBallRef.current;
      ball.position.lerp(target, 0.03);

      if (ball.position.distanceTo(target) < 0.01) {
        ball.position.copy(target);
        settled.current = true;
      }
    }

    if (ringRef.current) {
      ringRef.current.rotateY(RING_SPIN_SPEED * delta);
    }
  });

  return (
    <group
      ref={groupRef}
      scale={scale}
      position={groupPosition}
      rotation={[baseRotation.x, baseRotation.y, baseRotation.z]}
    >
      <primitive object={clonedScene} />
    </group>
  );
}

useGLTF.preload("/models/Planet.glb");

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <line x1="1" y1="1" x2="15" y2="15" stroke="white" strokeWidth="1.5" />
      <line x1="15" y1="1" x2="1" y2="15" stroke="white" strokeWidth="1.5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <line x1="5" y1="19" x2="19" y2="5" stroke="currentColor" strokeWidth="2" />
      <polyline points="8 5 19 5 19 16" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}

function XLogoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
    </svg>
  );
}

function ContactPanel({ isOpen, onClose }) {
  const EMAIL = "heyyyyanand@gmail.com";
  const X_URL = "https://x.com/heyyyyanand";
  const LINKEDIN_URL = "https://www.linkedin.com/in/heyanand/";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
          />

          <motion.div
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-black text-white z-[100] flex flex-col px-6 sm:px-10 py-8 sm:py-10 overflow-y-auto"
          >
            <button
              onClick={onClose}
              aria-label="Close contact panel"
              className="self-end w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 transition-colors flex items-center justify-center shrink-0"
            >
              <CloseIcon />
            </button>

            <div className="mt-10 sm:mt-16 flex flex-col gap-10 sm:gap-16">
              <div>
                <p className="tracking-[4px] sm:tracking-[6px] text-[12px] sm:text-[13px] text-white/50 mb-5 sm:mb-6">
                  CONTACT ME
                </p>

                <a
                  href={`mailto:${EMAIL}`}
                  className="group flex items-center justify-between border border-white/20 rounded-xl px-5 sm:px-6 py-4 sm:py-5 hover:border-white/60 hover:bg-white/5 active:bg-white/10 transition-all"
                >
                  <span className="text-[18px] sm:text-[22px] tracking-[1px]">SAY HELLO</span>
                  <span className="group-hover:translate-x-1 transition-transform shrink-0 ml-3">
                    <ArrowIcon />
                  </span>
                </a>
              </div>

              <div>
                <p className="tracking-[4px] sm:tracking-[6px] text-[12px] sm:text-[13px] text-white/50 mb-5 sm:mb-6">
                  CONNECT ME
                </p>

                <div className="flex items-center gap-4">
                  <a
                    href={X_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X profile"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/20 hover:border-white/60 hover:bg-white/5 active:bg-white/10 transition-all flex items-center justify-center"
                  >
                    <XLogoIcon />
                  </a>

                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/20 hover:border-white/60 hover:bg-white/5 active:bg-white/10 transition-all flex items-center justify-center"
                  >
                    <LinkedinIcon />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function HeroSection() {
  const [isVisible, setIsVisible] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const rise = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  };

  const line = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.3,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  };

  return (
    <>
      {/*
        min-h-[100dvh] (with min-h-screen as a fallback for older browsers)
        avoids the classic mobile-browser bug where 100vh includes the area
        hidden behind the address bar, causing a jump/scroll on load.
      */}
      <section
        ref={sectionRef}
        className="relative min-h-screen min-h-[100dvh] bg-[#ECECE8] overflow-hidden px-5 sm:px-8 lg:px-10 py-6 sm:py-8"
      >
        <div
          onClick={() => setIsPanelOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setIsPanelOpen(true);
          }}
          aria-label="Open contact panel"
          className="absolute top-5 right-5 sm:top-8 sm:right-8 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-black flex items-center justify-center z-50 cursor-pointer active:scale-95 transition-transform touch-manipulation"
        >
          <div className="space-y-1.5 sm:space-y-2">
            <div className="w-5 sm:w-6 lg:w-8 h-[2px] bg-white"></div>
            <div className="w-5 sm:w-6 lg:w-8 h-[2px] bg-white"></div>
          </div>
        </div>

        {/*
          touch-action: pan-y keeps vertical page scroll working over the
          canvas on Android/iOS instead of the canvas swallowing the gesture.
        */}
        <div className="absolute inset-0 z-10" style={{ touchAction: "pan-y" }}>
          <Canvas
            dpr={isMobile ? [1, 1.5] : [1, 2]}
            gl={{ powerPreference: "high-performance", antialias: !isMobile }}
            camera={{ position: [0, 0, 8], fov: isMobile ? 45 : 40 }}
          >
            <ambientLight intensity={2} />
            <directionalLight position={[5, 5, 5]} intensity={3} />
            {/* Lower-res environment on mobile: same look, lighter GPU/network cost */}
            <Environment preset="city" resolution={isMobile ? 128 : 256} />
            <Suspense fallback={null}>
              <PlanetModel isVisible={isVisible} isMobile={isMobile} />
            </Suspense>
          </Canvas>
        </div>

        <motion.div
          className="relative z-30 pt-40 sm:pt-56 lg:pt-72"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.15, delayChildren: 0.3 }}
        >
          <motion.p
            variants={rise}
            className="tracking-[3px] sm:tracking-[5px] lg:tracking-[8px] text-[11px] sm:text-[13px] lg:text-[15px] font-light mb-6 sm:mb-8 lg:mb-12"
          >
            404 NO BUGS FOUND
          </motion.p>

          <motion.h1
            variants={rise}
            className="text-[13vw] sm:text-[64px] md:text-[76px] lg:text-[90px] font-[400] tracking-[-1px] lg:tracking-[-2px] leading-[0.95] break-words"
            style={{ WebkitTextStroke: "0.4px black" }}
          >
            ANAND KUMAR
          </motion.h1>

          <motion.div
            variants={line}
            className="border-t border-black mt-3 mb-8 sm:mb-12 lg:mb-16 origin-left"
          />

          <motion.p
            initial={{ y: 70, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                duration: 1.2,
                delay: 0.8,
                ease: [0.19, 1, 0.22, 1],
              },
            }}
            className="text-[18px] sm:text-[24px] lg:text-[34px] tracking-[-0.01px] leading-[1.4] lg:leading-[1.45] max-w-full lg:max-w-[1400px] lg:ml-auto text-left lg:text-right font-[300]"
            style={{ WebkitTextStroke: "0.4px black" }}
          >
            I CAN WORK ON BOTH FRONT-END AND BACK-END DEVELOPMENT, CREATING
            SEAMLESS AND EFFICIENT WEB APPLICATIONS AND CAN GUARANTEE A SMOOTH
            USER EXPERIENCE.
          </motion.p>
        </motion.div>
      </section>

      <ContactPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />
    </>
  );
}

export default HeroSection;