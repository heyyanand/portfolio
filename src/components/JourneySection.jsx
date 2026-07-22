import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SPEED = 0.25;

// Android WebView can flicker/tear on animated transforms unless the
// compositor is explicitly hinted to promote the layer to its own GPU
// layer. This object is shared by every row so the hint is identical
// across all four.
const gpuHint = {
  willChange: "transform",
  WebkitBackfaceVisibility: "hidden",
  backfaceVisibility: "hidden",
  WebkitTransformStyle: "preserve-3d",
  transformStyle: "preserve-3d",
};

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
      // touchAction: pan-y stops Android WebView from ever interpreting the
      // scroll gesture as a horizontal swipe over this section, since the
      // rows themselves move on the x-axis.
      style={{ touchAction: "pan-y" }}
      className="mt-20 w-full overflow-x-hidden overflow-y-visible px-3 sm:px-0 font-light leading-snug text-center mb-32 md:mb-42"
    >
      <motion.div
        style={{ x: row1X, ...gpuHint }}
        className="whitespace-nowrap text-[42px] md:text-[70px] lg:text-[92px] tracking-[-2px]"
      >
        <p>Architecture</p>
      </motion.div>

      <motion.div
        style={{ x: row2X, ...gpuHint }}
        className="flex flex-nowrap items-center justify-center gap-3 whitespace-nowrap text-[clamp(22px,7vw,42px)] md:text-[70px] lg:text-[92px] tracking-[-2px]"
      >
        <p className="font-normal">Development</p>
        <div className="w-10 h-1.5 md:w-32 shrink-0 bg-[#C6A15B]" />
        <p>Deployment</p>
      </motion.div>

      <motion.div
        style={{ x: row3X, ...gpuHint }}
        className="flex flex-nowrap items-center justify-center gap-3 whitespace-nowrap text-[clamp(18px,5.5vw,42px)] md:text-[70px] lg:text-[92px] tracking-[-2px]"
      >
        <p>APIs</p>
        <div className="w-10 h-1.5 md:w-32 shrink-0 bg-[#C6A15B]" />
        <p className="italic">Frontends</p>
        <div className="w-10 h-1.5 md:w-32 shrink-0 bg-[#C6A15B]" />
        <p>Scalability</p>
      </motion.div>

      <motion.div
        style={{ x: row4X, ...gpuHint }}
        className="whitespace-nowrap text-[42px] md:text-[70px] lg:text-[92px] tracking-[-2px]"
      >
        <p>Databases</p>
      </motion.div>
    </section>
  );
}

export default JourneySection;
