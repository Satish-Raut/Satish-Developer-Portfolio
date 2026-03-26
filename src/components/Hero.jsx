import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useScroll, useTransform } from "framer-motion";
import { personal, socials } from "../data/portfolio";
import { HiDownload } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import CVModal from "./CVModal";
import { SiLeetcode } from "react-icons/si";

/* ─── Mouse Parallax Hook ──────────────────────────────── */
const useParallax = (strength = 0.02) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 20 });
  const springY = useSpring(y, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const handleMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      x.set((e.clientX - cx) * strength);
      y.set((e.clientY - cy) * strength);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y, strength]);

  return { springX, springY };
};

/* ─── Animation variants ────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 1.5 + i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

/* ═══════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════ */
const Hero = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [cvModalOpen, setCvModalOpen] = useState(false);

  const slow = useParallax(0.015);

  const { scrollY } = useScroll();
  const devScale = useTransform(scrollY, [0, 800], [1, 2.5]);
  const devY = useTransform(scrollY, [0, 800], [0, 400]);
  const devOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setCvModalOpen(false);
    };
    if (cvModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [cvModalOpen]);

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-300
        ${isDark ? 'bg-[#0d0d1a]' : 'bg-[#faf8ff]'}`}
      style={{ padding: 0 }}
    >
      {/* ══ HUGE BLURRED "DEVELOPER" BACKGROUND TEXT ══ */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        aria-hidden="true"
        style={{ scale: devScale, y: devY, opacity: devOpacity }}
      >
        <motion.span
          initial={{ opacity: 0, filter: "blur(20px)", scale: 2 }}
          animate={{ opacity: 1, filter: "blur(3px)", scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            fontSize: "clamp(40px, 10vw, 240px)",
            fontWeight: 900,
            letterSpacing: "0.12em",
            color: isDark ? "rgba(124,58,237,0.09)" : "rgba(124,58,237,0.07)",
            userSelect: "none",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          DEVELOPER
        </motion.span>
      </motion.div>

      {/* ── Ambient glow blobs ── */}
      <div
        className="absolute top-20 left-8 w-48 h-36 md:w-72 md:h-56 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-16 right-8 w-40 h-32 md:w-64 md:h-48 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.09) 0%, transparent 70%)" }}
      />

      {/* ══ CONSTRAINED WRAPPER ══ */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* ══ SOCIAL SIDEBAR — always left, larger and shifted up on mobile ══ */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center justify-center z-30 -translate-y-16 lg:translate-y-0"
          style={{ width: "clamp(40px, 5vw, 50px)" }}
        >
          {/* Top line */}
          <div
            className={`w-px mb-5 flex-shrink-0 ${isDark ? "bg-purple-900/50" : "bg-purple-200"}`}
            style={{ height: "clamp(40px, 8vw, 120px)" }}
          />

          {/* Icons */}
          <div className="flex flex-col relative left-0.5" style={{ gap: "clamp(18px, 4vw, 26px)" }}>
            {socials.map((social, i) => {
              const Icon =
                social.label === "GitHub" ? FaGithub
                : social.label === "LinkedIn" ? FaLinkedin
                : SiLeetcode;
              return (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8 + i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4, scale: 1.15 }}
                  className={`transition-colors duration-300 ${
                    isDark ? "text-purple-400/70 hover:text-purple-300" : "text-purple-400 hover:text-purple-600"
                  }`}
                  style={{ fontSize: "clamp(20px, 4.5vw, 24px)" }}
                >
                  <Icon />
                </motion.a>
              );
            })}
          </div>

          {/* Bottom line */}
          <div
            className={`w-px mt-5 flex-shrink-0 ${isDark ? "bg-purple-900/50" : "bg-purple-200"}`}
            style={{ height: "clamp(40px, 8vw, 120px)" }}
          />
        </div>

        {/* ══ MAIN GRID ══ */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] items-center gap-8 lg:gap-12 w-full"
          style={{ paddingTop: "clamp(80px, 15vw, 120px)", paddingBottom: "60px" }}
        >
          {/* ══ Photo — top on mobile, right on desktop ══ */}
          <div className="flex justify-center lg:hidden">
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
              className="relative"
              style={{ maxWidth: "260px", width: "100%" }}
            >
              <img
                src="/images/Satish_Raut.png"
                alt={personal.name}
                className="w-full transition-all duration-500 relative z-10"
                style={{
                  filter: isDark
                    ? "drop-shadow(0 10px 30px rgba(0,0,0,0.3))"
                    : "drop-shadow(0 10px 24px rgba(124,58,237,0.2))",
                  WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 98%)",
                  maskImage: "linear-gradient(to bottom, black 70%, transparent 98%)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none -z-10 blur-3xl opacity-30"
                style={{
                  background: isDark ? "var(--purple)" : "var(--purple-light)",
                  borderRadius: "50% 50% 0 0",
                }}
              />
            </motion.div>
          </div>

          {/* ══ LEFT — Text Content ══ */}
          <div
            className="flex flex-col items-start gap-6 lg:gap-12"
            style={{ paddingLeft: "clamp(36px, 7vw, 100px)" }}
          >
            <div className="space-y-6 lg:space-y-10 w-full">

              {/* Available badge */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
                className={`inline-flex items-center gap-2 border rounded-full px-4 py-1.5 text-sm font-semibold shadow-sm
                  ${isDark
                    ? "bg-purple-900/40 border-purple-700 text-purple-300"
                    : "bg-white border-purple-200 text-purple-700"
                  }`}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available for work
              </motion.div>

              {/* Name & Intro */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-2"
              >
                {/* ── Greeting line ── */}
                <div className="flex items-center gap-3 mb-1">
                  {/* Waving hand */}
                  <motion.span
                    animate={{ rotate: [0, 18, -8, 18, 0] }}
                    transition={{ delay: 2, duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
                    style={{ display: "inline-block", fontSize: "clamp(1.1rem, 3vw, 1.6rem)", transformOrigin: "70% 80%" }}
                  >
                    👋
                  </motion.span>

                  {/* "Hello, I'm" in italic serif */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.6 }}
                    style={{
                      fontFamily: "'Georgia', 'Times New Roman', serif",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
                      letterSpacing: "0.01em",
                      color: isDark ? "rgba(196,181,253,0.75)" : "rgba(109,40,217,0.7)",
                      margin: 0,
                    }}
                  >
                    Hello, I&apos;m
                  </motion.p>

                  {/* Animated dashes */}
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "clamp(20px, 4vw, 48px)", opacity: 1 }}
                    transition={{ delay: 1.9, duration: 0.6 }}
                    style={{
                      height: "1.5px",
                      background: isDark
                        ? "linear-gradient(90deg, rgba(167,139,250,0.5), transparent)"
                        : "linear-gradient(90deg, rgba(139,92,246,0.4), transparent)",
                      borderRadius: "2px",
                      flexShrink: 0,
                    }}
                  />
                </div>
                <h1
                  className={`font-black leading-tight ${isDark ? "text-white" : "text-gray-900"}`}
                  style={{ fontSize: "clamp(2rem, 7vw, 4.5rem)", letterSpacing: "-0.02em" }}
                >
                  {"Satish Raut".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 30, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        delay: 1.65 + i * 0.045,
                        duration: 0.45,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.25, duration: 0.4, type: "spring", stiffness: 300 }}
                    className="text-purple-500"
                    style={{ display: "inline-block" }}
                  >
                    .
                  </motion.span>
                </h1>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.3, duration: 0.5 }}
                  className="flex items-center gap-2 pt-1"
                >
                  <span
                    style={{
                      fontFamily: "'Courier New', 'Consolas', monospace",
                      fontWeight: 700,
                      fontSize: "clamp(0.85rem, 2.2vw, 1.25rem)",
                      letterSpacing: "0.04em",
                      color: isDark ? "rgba(167,139,250,0.9)" : "rgba(109,40,217,0.85)",
                    }}
                  >
                    {personal.title}
                  </span>
                  {/* Blinking cursor */}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "steps(1)" }}
                    style={{
                      display: "inline-block",
                      width: "clamp(2px, 0.4vw, 3px)",
                      height: "clamp(14px, 2.5vw, 22px)",
                      borderRadius: "1px",
                      background: isDark ? "#a78bfa" : "#7c3aed",
                      flexShrink: 0,
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* Bio snippet */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.9 }}
                className={`max-w-lg text-sm md:text-base leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                {personal.bio}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1, duration: 0.6 }}
                className="flex flex-row gap-3"
              >
                <a
                  href="#projects"
                  className="btn-purple px-5 md:px-8 py-2.5 md:py-3 rounded-full font-bold text-sm md:text-base shadow-lg shadow-purple-500/20 whitespace-nowrap"
                >
                  View My Work →
                </a>
                <motion.button
                  onClick={() => setCvModalOpen(true)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`btn-outline relative overflow-hidden cursor-pointer px-5 md:px-8 py-2.5 md:py-3 rounded-full text-sm md:text-base font-bold border-2 whitespace-nowrap ${
                    isDark ? "border-purple-700 text-white" : "border-purple-200 text-gray-800"
                  }`}
                >
                  <span className="relative inline-flex items-center gap-2">
                    <HiDownload /> Download CV
                  </span>
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.3 }}
                className="flex gap-10 md:gap-16 lg:gap-24"
              >
                {[
                  { num: "10+", label: "Projects" },
                  { num: "1000+", label: "Problems Solved" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl md:text-3xl font-black text-purple-500">{s.num}</div>
                    <div className={`text-xs uppercase tracking-widest font-bold mt-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </motion.div>


            </div>
          </div>

          {/* ══ RIGHT — Photo (desktop only) ══ */}
          <div className="hidden lg:flex flex-col items-end justify-center">
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
              style={{ x: slow.springX, y: slow.springY, maxWidth: "420px", width: "100%" }}
            >
              <img
                src="/images/Satish_Raut.png"
                alt={personal.name}
                className="w-full transition-all duration-500 relative z-10"
                style={{
                  filter: isDark
                    ? "drop-shadow(0 10px 30px rgba(0,0,0,0.3))"
                    : "drop-shadow(0 10px 24px rgba(124,58,237,0.2))",
                  WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 98%)",
                  maskImage: "linear-gradient(to bottom, black 70%, transparent 98%)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none -z-10 blur-3xl opacity-30"
                style={{
                  background: isDark ? "var(--purple)" : "var(--purple-light)",
                  borderRadius: "50% 50% 0 0",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 text-xs tracking-widest uppercase z-20"
      >
        <span>Scroll</span>
        <div
          className="w-0.5 h-8 rounded-full"
          style={{ background: "linear-gradient(to bottom, #7c3aed, transparent)" }}
        />
      </motion.div>

      {/* CV Modal */}
      <CVModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
        resumeUrl={personal.resumeUrl}
      />
    </section>
  );
};

export default Hero;