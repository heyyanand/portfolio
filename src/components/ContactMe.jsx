import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import emailjs from "@emailjs/browser";

// ---------------------------------------------------------------------------
// EmailJS config — hardcoded directly (no .env dependency)
// NOTE: The public key is safe to expose client-side by design.
// Just make sure "Allowed origins" is restricted to your domain(s)
// in your EmailJS dashboard: Account -> Security.
// ---------------------------------------------------------------------------
const EMAILJS_SERVICE_ID = "service_xtz1gs6";
const EMAILJS_TEMPLATE_ID = "template_8h8yqid";
const EMAILJS_PUBLIC_KEY = "SShfXXUmnyvjCPxnf";

// ---------------------------------------------------------------------------
// Icons (inline SVG, no extra dependency)
// ---------------------------------------------------------------------------
const XIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556z" />
  </svg>
);

const socials = [
  {
    name: "Twitter",
    handle: "",
    href: "https://x.com/heyyyyanand",
    Icon: XIcon,
    glow: "hover:shadow-[0_0_40px_rgba(236,72,153,0.35)] hover:border-pink-500/60",
  },
  {
    name: "LinkedIn",
    handle: "",
    href: "https://www.linkedin.com/in/heyanand/",
    Icon: LinkedInIcon,
    glow: "hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] hover:border-blue-500/60",
  },
];

const MARQUEE_TEXT = "LET'S TALK ✦ OPEN TO WORK ✦ DROP A LINE ✦ ";

// ---------------------------------------------------------------------------
// Magnetic wrapper — pulls its child gently toward the cursor on hover.
// A small, tactile signature interaction for the send button + social pills.
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

function ContactMe() {
  const marqueeRef = useRef(null);
  const sectionRef = useRef(null);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  // Init EmailJS once with the public key.
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  // Infinite marquee, GSAP-driven, seamless via a doubled track.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 18,
        ease: "linear",
        repeat: -1,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("sending");

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      });

      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => setStatus("idle"), 3500);
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Failed to send message. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white px-6 md:px-10 pt-28 pb-32 overflow-hidden"
    >
      {/* Ambient glow, consistent with the rest of the site */}
      <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] bg-violet-500/10 blur-[160px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-500/8 blur-[160px] rounded-full" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.9 }}
        className="relative z-10"
      >
        <h1 className="text-[56px] md:text-[130px] font-[200] tracking-[-6px] leading-[0.86]">
          LET'S <span className="block md:inline">CONNECT</span>
        </h1>

        <div className="mt-4 border-t-2 border-white/80" />

        <p className="mt-15 ml-auto max-w-[1250px] text-right text-[26px] md:text-[30px] uppercase text-white/60 leading-[1.8] px-8 md:px-20">
          GOT AN IDEA, A ROLE, OR JUST WANT TO SAY HI? MY INBOX IS ALWAYS OPEN.
        </p>
      </motion.div>

      {/* Main grid: intro + socials  |  message form */}
      <div className="relative z-10 mt-24 grid md:grid-cols-2 gap-16 md:gap-20 items-start">
        {/* Left: intro + socials */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-white/60 text-[18px] md:text-[24px] font-[300] leading-[1.7] max-w-[520px]">
            Whether it's a project, a full-time role, or a random tech
            tangent — I read everything myself and reply personally.
          </p>

          <div className="mt-12 flex flex-col gap-4 max-w-[420px]">
            {socials.map((social, i) => (
              <motion.div
                key={social.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <Magnetic strength={0.25}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center justify-between gap-6 rounded-lg border-2 border-white/15 bg-white/[0.03] backdrop-blur-xl px-6 py-4 transition-all duration-300 ${social.glow}`}
                  >
                    <span className="flex items-center gap-4">
                      <social.Icon className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                      <span className="text-[16px] md:text-[19px] font-[300] text-white/85">
                        {social.name}
                      </span>
                    </span>
                    <span className="text-white/35 text-sm">
                      {social.handle}
                    </span>
                  </a>
                </Magnetic>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: message form card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[28px] border-2 border-violet-500/40 shadow-[0_30px_100px_rgba(139,92,246,0.35)] bg-[#0a0a0a]/90 backdrop-blur-xl px-6 md:px-10 py-8 md:py-10"
        >
          <h3 className="text-[22px] md:text-[28px] font-[300] mb-8">
            Send a message
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="grid sm:grid-cols-2 gap-8">
              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[2px] text-white/40">
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="bg-transparent border-b-2 border-white/20 focus:border-violet-500 outline-none py-2 text-[17px] font-[300] placeholder-white/25 transition-colors duration-300"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[2px] text-white/40">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  required
                  className="bg-transparent border-b-2 border-white/20 focus:border-violet-500 outline-none py-2 text-[17px] font-[300] placeholder-white/25 transition-colors duration-300"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-[11px] uppercase tracking-[2px] text-white/40">
                Message
              </span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="What's on your mind?"
                required
                rows={4}
                className="bg-transparent border-b-2 border-white/20 focus:border-violet-500 outline-none py-2 text-[17px] font-[300] placeholder-white/25 transition-colors duration-300 resize-none"
              />
            </label>

            <Magnetic strength={0.3}>
              <button
                type="submit"
                disabled={status !== "idle"}
                className="relative w-full sm:w-auto px-10 py-4 rounded-full border-2 border-violet-500/60 bg-violet-500/10 text-[16px] font-[300] uppercase tracking-[2px] overflow-hidden transition-colors duration-300 hover:bg-violet-500/20 disabled:opacity-70"
              >
                <span className="relative z-10">
                  {status === "idle" && "Send message"}
                  {status === "sending" && "Sending..."}
                  {status === "sent" && "Message sent ✦"}
                </span>
              </button>
            </Magnetic>
          </form>
        </motion.div>
      </div>

      {/* Signature element: infinite GSAP marquee */}
      <div className="relative z-10 mt-32 border-t-2 border-white/15 pt-10 overflow-hidden">
        <div ref={marqueeRef} className="flex w-max whitespace-nowrap">
          <span className="text-[48px] md:text-[90px] font-[200] tracking-[-3px] text-white/10 uppercase pr-8">
            {MARQUEE_TEXT.repeat(4)}
          </span>
          <span className="text-[48px] md:text-[90px] font-[200] tracking-[-3px] text-white/10 uppercase pr-8">
            {MARQUEE_TEXT.repeat(4)}
          </span>
        </div>
      </div>
    </section>
  );
}

export default ContactMe;
