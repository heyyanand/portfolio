import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import anandImage from "../assets/anand.jpg";

const experiences = [
  {
    title: "Student Ambassador - Google",
    period: "September 2025 – July 2026",
    description:
    "As a campus ambassador and student community leader, I actively fostered innovation and tech engagement by organizing impactful events such as HackOphobia, a hackathon supported by organizations like Google, MLH, Red Bull, and Unstop.",
    skills: ["Leadership", "Community Development", "Team-Coolaboration"],
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
      className="relative bg-black text-white px-6 md:px-10 pt-28 pb-80 rounded-t-[32px]"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.9 }}
      >
        <h1 className="text-[40px] md:text-[100px] font-[200] tracking-[-6px] leading-[0.86]">
          EXPERIENCE <span className="block md:inline">& SKILLS</span>
        </h1>

        <div className="mt-4 border-t-2 border-white/80" />

        <p className="mt-15 ml-auto max-w-[1250px] text-right text-[80px] md:text-[30px] uppercase text-white/60 leading-[1.8] px-8 md:px-20">
          A MIX OF PROFESSIONAL EXPERIENCES AND THE TECHNICAL TOOLKIT I BRING
          TO EVERY PROJECT.
        </p>
      </motion.div>

      {/* Experience Cards */}
      <div className="mt-28 space-y-20">
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
              className={`relative rounded-[28px] border-2 ${styles.border} ${styles.shadow} bg-[#0a0a0a]/90 backdrop-blur-xl px-6 md:px-10 pt-8 pb-8 md:pt-10 md:pb-10`}
            >
              <div className="flex justify-between gap-6 flex-col md:flex-row">
                <h2 className="text-[28px] md:text-[48px] font-[300] tracking-[-1px]">
                  {exp.title}
                </h2>

                <span
                  className={`text-xs uppercase ${styles.period} shrink-0`}
                >
                  {exp.period}
                </span>
              </div>

              <p className="mt-6 text-white/70 text-[15px] md:text-[18px] max-w-[1200px]">
                {exp.description}
              </p>

              <div className="mt-8 flex flex-col gap-3">
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
                    className="flex items-center gap-4"
                  >
                    <span className={`${styles.index} text-lg`}>✦</span>

                    <span className="text-[18px] md:text-[26px] font-[300]">
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
        className="mt-32"
      >
        <h2 className="text-[60px] md:text-[110px] font-[300] tracking-[-4px] leading-none mb-16">
          SKILLS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {skillGroups.map((group) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="
                relative
                rounded-[28px]
                bg-[#111111]/85
                backdrop-blur-xl
                border-2 border-violet-500/50
                shadow-[0_30px_100px_rgba(139,92,246,0.45)]
                px-6 md:px-8
                py-6 md:py-8
              "
            >
              <div className="absolute inset-0 rounded-[28px] bg-violet-500/8 blur-3xl pointer-events-none" />

              <h3 className="text-[22px] md:text-[28px] font-[300] mb-6 relative z-10">
                {group.title}
              </h3>

              <div className="mb-6 border-t border-white/15 relative z-10" />

              <div className="flex flex-wrap gap-2.5 relative z-10">
                {group.items.map((item) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.35 }}
                    className="px-4 py-1.5 rounded-full text-sm text-white/80 bg-white/5 border border-white/15"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ABOUT PANEL */}
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
          mt-24
          mb-[-850px]
          bg-[#111111]
          backdrop-blur-xl
          rounded-t-[36px] rounded-b-[60px]
          border-t border-white/15
          shadow-[0_110px_250px_rgba(0,0,0,0.9)]
          px-6 md:px-10
          pt-20 pb-32
        "
      >
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

        <h2 className="text-[60px] md:text-[110px] font-[300] tracking-[-4px] leading-none">
          ABOUT
        </h2>

        <div className="mt-4 border-t-2 border-white/60" />

        <p className="mt-14 text-[22px] md:text-[34px] uppercase leading-[1.5] text-white max-w-[1500px]">
          I’M A SOFTWARE DEVELOPER WITH A PASSION FOR CREATING IMPACTFUL DIGITAL
          EXPERIENCES.
        </p>

        <div className="grid md:grid-cols-[420px_1fr] gap-16 mt-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden rounded-[28px]"
          >
            <img
              src={anandImage}
              alt="Anand Kumar"
              className="w-full h-[520px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="text-white/55 text-[20px] md:text-[28px] leading-[1.8] font-[300]"
          >
            <p>
              Hi, I’m <span className="text-white">Anand Kumar</span>, a
              Computer Science and Engineering student at Chandigarh University.
              I’m passionate about technology, problem-solving, and building
              impactful digital experiences.
            </p>

            <p className="mt-6">
              My interests span software development, web development, AI, and
              competitive programming. I work with languages like C, Python,
              Java, and SQL while continuously improving my DSA and development
              skills.
            </p>

            <p className="mt-6">
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