import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { gsap } from "gsap";
import anandImage from "../assets/anand.jpg";

// ---------------------------------------------------------------------------
// Magnetic wrapper — pulls its child gently toward the cursor on hover.
// ---------------------------------------------------------------------------
function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      x: relX * strength,
      y: relY * strength,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block will-change-transform"
    >
      {children}
    </div>
  );
}

const experiences = [
  {
    title: "Student Ambassador - Google",
    period: "September 2025 – July 2026",
    description:
    "As a campus ambassador and student community leader, I actively fostered innovation and tech engagement by organizing impactful events such as HackOphobia, a hackathon supported by organizations like Google, MLH, Red Bull, and Unstop.",
    skills: ["Leadership", "Community Development", "Team Collaboration"],
    color: "pink",
  },
  {
    title: "Core Member - CodeX",
    period: "December 2025 – July 2026",
    description:
      "As a  founding member of CodeX, a coding club focused on helping students explore programming, DSA, and emerging technologies. Through hackathons, coding contests like FlowJam and CrackTheC, and community initiatives.",
    skills: ["Mentorship", "Community"],
    color: "green",
  },
  {
    title: "Intern - To Be Updated",
    period: "Month 2027 – Month Year",
    description:
      "As a intern at ...",
    skills: ["Leadership", "Problem Solving", "Collaboration", "Testing"],
    color: "blue",
  },
];

// Tailwind-safe class maps per accent color (kept static so JIT can pick them up)
const colorStyles = {
  pink: {
    border: "border-pink-500/50",
    shadow: "shadow-[0_30px_100px_rgba(236,72,153,0.45)]",
    period: "text-pink-400",
    index: "text-pink-400",
    divider: "border-pink-500/20",
  },
  green: {
    border: "border-green-500/50",
    shadow: "shadow-[0_30px_100px_rgba(34,197,94,0.45)]",
    period: "text-green-400",
    index: "text-green-400",
    divider: "border-green-500/20",
  },
  blue: {
    border: "border-blue-500/50",
    shadow: "shadow-[0_30px_100px_rgba(59,130,246,0.45)]",
    period: "text-blue-400",
    index: "text-blue-400",
    divider: "border-blue-500/20",
  },
};

const skillGroups = [
  {
    title: "Programming Languages",
    items: ["C", "C++", "Python", "Java", "SQL"],
  },
  {
    title: "Web Development",
    items: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
  },
  {
    title: "Tools & Technologies",
    items: ["Git", "GitHub", "VS Code", "AI", "DSA"],
  },
];

function ExperienceSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["end end", "end start"],
  });

  const borderOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const lineScale = useTransform(borderOpacity, [0, 1], [0.7, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-40 sm:pb-60 md:pb-80 rounded-t-[24px] md:rounded-t-[32px]"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.9 }}
      >
        <h1 className="text-[34px] sm:text-[52px] md:text-[100px] font-[200] tracking-[-1px] sm:tracking-[-3px] md:tracking-[-6px] leading-[0.95] md:leading-[0.86]">
          EXPERIENCE <span className="block md:inline">& SKILLS</span>
        </h1>

        <div className="mt-4 border-t-2 border-white/80" />

        {/*
          Original had this backwards: text-[80px] on mobile shrinking to
          text-[30px] on desktop, which overflows badly on phones. Also
          "mt-15" isn't a real Tailwind class (no-op) and text-right at
          large sizes reads poorly on narrow screens.
        */}
        <p className="mt-8 md:mt-14 md:ml-auto max-w-full md:max-w-[1250px] text-left md:text-right text-[16px] sm:text-[19px] md:text-[30px] uppercase text-white/60 leading-[1.6] md:leading-[1.8] px-0 sm:px-4 md:px-20">
          A MIX OF PROFESSIONAL EXPERIENCES AND THE TECHNICAL TOOLKIT I BRING
          TO EVERY PROJECT.
        </p>
      </motion.div>

      {/* Experience Cards */}
      <div className="mt-16 sm:mt-20 md:mt-28 space-y-10 sm:space-y-14 md:space-y-20">
        {experiences.map((exp, index) => {
          const styles = colorStyles[exp.color];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{
                duration: 0.8,
                ease: [0.19, 1, 0.22, 1],
              }}
              className={`relative rounded-[20px] md:rounded-[28px] border-2 ${styles.border} ${styles.shadow} bg-[#0a0a0a]/90 backdrop-blur-xl px-5 sm:px-6 md:px-10 pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-10`}
            >
              <div className="flex justify-between gap-3 sm:gap-6 flex-col md:flex-row">
                <h2 className="text-[22px] sm:text-[28px] md:text-[48px] font-[300] tracking-[-0.5px] md:tracking-[-1px]">
                  {exp.title}
                </h2>

                <span
                  className={`text-xs uppercase ${styles.period} shrink-0`}
                >
                  {exp.period}
                </span>
              </div>

              <p className="mt-4 sm:mt-6 text-white/70 text-[14px] sm:text-[15px] md:text-[18px] max-w-full md:max-w-[1200px] leading-relaxed">
                {exp.description}
              </p>

              <div className="mt-6 sm:mt-8 flex flex-col gap-2.5 sm:gap-3">
                {exp.skills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{
                      delay: i * 0.12,
                      duration: 0.45,
                    }}
                    className="flex items-center gap-3 sm:gap-4"
                  >
                    <span className={`${styles.index} text-base sm:text-lg shrink-0`}>✦</span>

                    <span className="text-[15px] sm:text-[18px] md:text-[26px] font-[300]">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Skills */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.9 }}
        className="mt-20 sm:mt-24 md:mt-32"
      >
        <h2 className="text-[40px] sm:text-[56px] md:text-[110px] font-[300] tracking-[-1.5px] sm:tracking-[-2.5px] md:tracking-[-4px] leading-none mb-10 sm:mb-12 md:mb-16">
          SKILLS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {skillGroups.map((group) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="
                relative
                rounded-[22px] md:rounded-[28px]
                bg-[#111111]/85
                backdrop-blur-xl
                border-2 border-violet-500/50
                shadow-[0_30px_100px_rgba(139,92,246,0.45)]
                px-5 sm:px-6 md:px-8
                py-5 sm:py-6 md:py-8
              "
            >
              <div className="absolute inset-0 rounded-[22px] md:rounded-[28px] bg-violet-500/8 blur-3xl pointer-events-none" />

              <h3 className="text-[19px] sm:text-[22px] md:text-[28px] font-[300] mb-5 sm:mb-6 relative z-10">
                {group.title}
              </h3>

              <div className="mb-5 sm:mb-6 border-t border-white/15 relative z-10" />

              <div className="flex flex-wrap gap-3 sm:gap-5 relative z-10">
                {group.items.map((item) => (
                  <Magnetic key={item} strength={0.25}>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.35 }}
                      className="inline-block px-3.5 sm:px-4 py-1.5 rounded-lg text-[13px] sm:text-sm text-white/80 bg-white/5 border border-white/15 cursor-default"
                    >
                      {item}
                    </motion.span>
                  </Magnetic>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ABOUT PANEL */}
      {/*
        The original used a single fixed mb-[-850px], tuned for the desktop
        two-column layout. On mobile the image + 3 stacked paragraphs are
        much taller than 850px worth of overlap, so a flat -850px would
        either not overlap enough (gap below) or clip content, depending on
        actual copy length. Scaling the negative margin down at each
        breakpoint keeps the intended "curtain" overlap effect without
        eating the panel's own content on narrow screens. Treat these three
        values as a starting point — verify the transition into the next
        section at your real breakpoints, since it's design-tuned rather
        than something CSS can derive automatically.
      */}
      <motion.section
        initial={{ opacity: 0, y: 160 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{
          duration: 1.3,
          ease: [0.19, 1, 0.22, 1],
        }}
        className="
          relative z-50
          mt-16 sm:mt-20 md:mt-24
          mb-[-420px] sm:mb-[-560px] md:mb-[-850px]
          bg-[#111111]
          backdrop-blur-xl
          rounded-t-[28px] md:rounded-t-[36px] rounded-b-[40px] md:rounded-b-[60px]
          border-t border-white/15
          shadow-[0_110px_250px_rgba(0,0,0,0.9)]
          px-5 sm:px-6 md:px-10
          pt-12 sm:pt-16 md:pt-20 pb-20 sm:pb-24 md:pb-32
        "
      >
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

        <h2 className="text-[40px] sm:text-[56px] md:text-[110px] font-[300] tracking-[-1.5px] sm:tracking-[-2.5px] md:tracking-[-4px] leading-none">
          ABOUT
        </h2>

        <div className="mt-4 border-t-2 border-white/60" />

        <p className="mt-8 sm:mt-10 md:mt-14 text-[17px] sm:text-[22px] md:text-[34px] uppercase leading-[1.4] sm:leading-[1.5] text-white max-w-full md:max-w-[1500px]">
          I’M A SOFTWARE DEVELOPER WITH A PASSION FOR CREATING IMPACTFUL DIGITAL
          EXPERIENCES.
        </p>

        <div className="grid md:grid-cols-[420px_1fr] gap-8 sm:gap-10 md:gap-16 mt-10 sm:mt-14 md:mt-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden rounded-[20px] md:rounded-[28px]"
          >
            {/*
              Fixed h-[520px] made the photo look absurdly tall and narrow
              once the column shrinks to a phone's width. A shorter, more
              landscape-leaning height at small breakpoints reads much
              better; it climbs back up to the original 520px on desktop.
            */}
            <img
              src={anandImage}
              alt="Anand Kumar"
              className="w-full h-[280px] sm:h-[360px] md:h-[520px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="text-white/55 text-[16px] sm:text-[19px] md:text-[28px] leading-[1.6] sm:leading-[1.7] md:leading-[1.8] font-[300]"
          >
            <p>
              Hi, I’m <span className="text-white">Anand Kumar</span>, a
              Computer Science and Engineering student at Chandigarh University.
              I’m passionate about technology, problem-solving, and building
              impactful digital experiences.
            </p>

            <p className="mt-5 sm:mt-6">
              My interests span software development, web development, AI, and
              competitive programming. I work with languages like C, Python,
              Java, and SQL while continuously improving my DSA and development
              skills.
            </p>

            <p className="mt-5 sm:mt-6">
              I enjoy turning ideas into real products, whether it’s interactive
              web experiences, intelligent systems, or scalable software
              solutions.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Curved fading transition to Works */}
      <motion.div
        style={{ opacity: borderOpacity }}
        className="pointer-events-none absolute bottom-0 left-0 w-full z-30"
      >
        <div className="h-16 bg-gradient-to-b from-black via-black/70 to-transparent" />

        <div className="relative h-32 bg-black rounded-t-[42px] overflow-hidden">
          <motion.div
            style={{
              opacity: borderOpacity,
              scaleX: lineScale,
            }}
            className="origin-center absolute top-0 left-1/2 -translate-x-1/2 w-[96%] h-[1px] bg-white/25"
          />
        </div>
      </motion.div>
    </section>
  );
}

export default ExperienceSection;