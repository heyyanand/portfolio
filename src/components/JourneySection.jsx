import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SPEED = 0.25;

function JourneySection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const row1X = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${20 * SPEED}%`]
  );

  const row2X = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${-30 * SPEED}%`]
  );

  const row3X = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${100 * SPEED}%`]
  );

  const row4X = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${-100 * SPEED}%`]
  );

  return (
    <section
      ref={sectionRef}
      className="mt-20 overflow-hidden font-light leading-snug text-center mb-32 md:mb-42"
    >
      <motion.div
        style={{ x: row1X }}
        className="text-[42px] md:text-[70px] lg:text-[92px] tracking-[-2px]"
      >
        <p>Architecture</p>
      </motion.div>

      <motion.div
        style={{ x: row2X }}
        className="flex items-center justify-center gap-3 text-[42px] md:text-[70px] lg:text-[92px] tracking-[-2px]"
      >
        <p className="font-normal">Development</p>
        <div className="w-10 h-1.5 md:w-32 bg-[#C6A15B]" />
        <p>Deployment</p>
      </motion.div>

      <motion.div
        style={{ x: row3X }}
        className="flex items-center justify-center gap-3 text-[42px] md:text-[70px] lg:text-[92px] tracking-[-2px]"
      >
        <p>APIs</p>
        <div className="w-10 h-1.5 md:w-32 bg-[#C6A15B]" />
        <p className="italic">Frontends</p>
        <div className="w-10 h-1.5 md:w-32 bg-[#C6A15B]" />
        <p>Scalability</p>
      </motion.div>

      <motion.div
        style={{ x: row4X }}
        className="text-[42px] md:text-[70px] lg:text-[92px] tracking-[-2px]"
      >
        <p>Databases</p>
      </motion.div>
    </section>
  );
}

export default JourneySection;