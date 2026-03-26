import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personal } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

const About = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      id="about"
      className={`relative min-h-screen flex items-center py-20 md:py-28 transition-colors duration-300
        ${isDark ? 'bg-[#13112b]' : 'bg-[#f5f0ff]'}`}
    >
      <div className="page-container flex flex-col items-center w-full">
      {/* Section Heading */}
      <motion.div
        ref={ref}
        variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
        className="text-center mb-7 sm:mb-9 md:mb-11 lg:mb-12 w-full max-w-xl mx-auto"
      >
        <p className="text-[var(--muted)] text-[10px] sm:text-xs tracking-[0.18em] uppercase mb-2">
          Get to know me
        </p>
        <div className="flex flex-col items-center gap-2 sm:gap-2.5">
          <h2
            className={`font-black transition-colors duration-300 text-center text-balance px-1 ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={{ fontSize: 'clamp(1.35rem, 3.8vw, 2.35rem)', lineHeight: 1.15 }}
          >
            About <span className="gradient-text">Me</span>
          </h2>
          {/* Symmetric accent — reads centered under the full title, not a stray chip */}
          <div
            className="h-0.5 w-[min(8.5rem,58vw)] rounded-full mx-auto shrink-0"
            style={{
              background: 'linear-gradient(90deg, transparent, var(--purple) 35%, var(--purple-light) 65%, transparent)',
            }}
            aria-hidden
          />
        </div>
      </motion.div>

      <div
        className="max-w-[1200px] w-full min-w-0 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-10 lg:gap-14 xl:gap-20 items-center md:items-start lg:items-center"
      >

        {/* Left — Illustration */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
          className="relative flex justify-center order-2 md:order-1 w-full min-w-0 pt-2 md:pt-0"
        >
          <div className="relative group w-full max-w-[min(100%,220px)] sm:max-w-[min(100%,280px)] md:max-w-[min(100%,360px)] lg:max-w-[min(100%,420px)] mx-auto">
            <img
              src="/images/ghibli_coder01.png"
              alt="Ghibli coder illustration"
              className="w-full h-auto max-h-[min(44vh,320px)] sm:max-h-[min(50vh,380px)] md:max-h-none object-contain object-center drop-shadow-2xl"
              style={{
                filter: isDark
                  ? "drop-shadow(0 10px 30px rgba(0,0,0,0.3))"
                  : "drop-shadow(0 10px 24px rgba(124,58,237,0.2))",
              }}
            />
            <div className={`absolute -inset-4 rounded-3xl -z-10 blur-2xl opacity-20 transition-colors duration-500
              ${isDark ? 'bg-purple-600' : 'bg-purple-400'}`} />
          </div>
        </motion.div>

        {/* Right — Info Stack */}
        <style>{`
          .about-mobile-box { padding: 32px 24px; border-width: 2px; }
          .about-quote-box { padding-top: 24px; padding-bottom: 8px; margin-top: 8px; }
          @media (min-width: 768px) {
            .about-mobile-box { padding: 0 !important; border-width: 0 !important; }
            .about-quote-box { margin-top: 16px; }
          }
        `}</style>
        <div
          className={`about-mobile-box overflow-hidden
            order-1 md:order-2 w-full min-w-0 flex flex-col gap-4 sm:gap-5 md:gap-6
            rounded-[24px] md:rounded-none
            ${isDark
              ? 'border-white/[0.08] bg-white/[0.04] shadow-[0_8px_32px_rgba(0,0,0,0.2)] md:bg-transparent md:shadow-none'
              : 'border-purple-100 bg-white shadow-[0_12px_40px_rgba(124,58,237,0.08)] md:bg-transparent md:shadow-none'
            }
            backdrop-blur-md md:backdrop-blur-0
          `}
        >
          {/* Professional Headline */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2}
          >
            <h3
              className={`font-black transition-colors duration-300 text-balance break-words ${isDark ? 'text-white' : 'text-gray-900'}`}
              style={{ fontSize: 'clamp(1.15rem, 2.8vw + 0.5rem, 1.85rem)', lineHeight: 1.35 }}
            >
              {personal.about.headline}
            </h3>
          </motion.div>

          {/* Professional Summary */}
          <motion.p
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2.2}
            className="text-[var(--muted)] text-[15px] sm:text-base leading-relaxed max-w-[62ch] md:max-w-none text-pretty"
          >
            {personal.about.summary}
          </motion.p>

          {/* Background Story */}
          <motion.p
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2.3}
            className="text-[var(--muted)] text-[15px] sm:text-base leading-relaxed max-w-[62ch] md:max-w-none text-pretty"
          >
            {personal.about.background}
          </motion.p>

          {/* Expertise Areas - Intentionally omitted from mobile to save space previously */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2.4}
            className="space-y-3 sm:space-y-3.5"
          >
          </motion.div>

          {/* Professional Approach */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2.8}
            className={`about-quote-box border-t ${isDark ? 'border-white/10' : 'border-purple-100'}`}
          >
            <p className={`leading-relaxed italic text-[15px] sm:text-base text-pretty font-medium ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>
              &ldquo;{personal.about.approach}&rdquo;
            </p>
          </motion.div>
        </div>
      </div>
      </div>{/* end page-container */}
    </section>
  );
};

export default About;