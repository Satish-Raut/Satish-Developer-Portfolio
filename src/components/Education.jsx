import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */
const education = [
  {
    id: 1,
    degree: 'B.Tech – Computer Science & Engineering',
    institution: 'Lovely Professional University',
    location: 'Phagwara, Punjab',
    period: 'Aug 2023 – Aug 2027',
    grade: '7.88',
    gradeLabel: 'CGPA',
    icon: '🎓',
    color: '#8b5cf6',
    tags: ['CSE', 'Full Stack', 'Data Science', 'ML / AI'],
    description:
      'Pursuing B.Tech in CSE with focus on full-stack development, machine learning, and generative AI. Ranked 9th on GeeksforGeeks at LPU with 600+ LeetCode & 550+ GFG problems solved.',
    side: 'left',
  },
  {
    id: 2,
    degree: 'Intermediate — Science',
    institution: 'RCM Science College',
    location: 'Ganjam, Odisha',
    period: 'Mar 2021 – May 2022',
    grade: '83%',
    gradeLabel: 'Score',
    icon: '📚',
    color: '#10b981',
    tags: ['Physics', 'Chemistry', 'Mathematics'],
    description:
      'Completed intermediate science with a strong foundation in Mathematics and Physics, building the analytical base for an engineering career.',
    side: 'right',
  },
  {
    id: 3,
    degree: 'Matriculation',
    institution: 'Sri Bateswara High School',
    location: 'Ganjam, Odisha',
    period: 'Mar 2019 – May 2020',
    grade: '72%',
    gradeLabel: 'Score',
    icon: '🏫',
    color: '#f59e0b',
    tags: ['Science', 'Mathematics', 'English'],
    description:
      'Completed secondary education focusing on core science subjects, sparking early curiosity in problem-solving and technology.',
    side: 'left',
  },
];

/* ══════════════════════════════════════════════════════════
   CARD
══════════════════════════════════════════════════════════ */
const EduCard = ({ item, isDark, isLeft = false, desktop = false }) => (
  <div
    className={`
      relative rounded-2xl border-2
      transition-all duration-300 group
      ${isDark
        ? 'bg-white/[0.04] backdrop-blur-xl hover:bg-white/[0.07]'
        : 'bg-white shadow-md shadow-purple-50/80 hover:shadow-xl hover:shadow-purple-100/50'
      }
    `}
    style={{
      borderColor: `${item.color}30`,
      padding: '2rem 1.75rem 1.75rem',  /* top=32px, sides=28px, bottom=28px */
    }}
  >
    {/* Top accent bar */}
    <div
      className="absolute top-0 left-0 right-0 h-[4px] rounded-t-2xl"
      style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
    />

    {/* Desktop connector to timeline */}
    {desktop && (
      <div
        className={`hidden md:block absolute top-10 h-px w-6 lg:w-8
          ${isLeft ? '-right-6 lg:-right-8' : '-left-6 lg:-left-8'}`}
        style={{
          background: `linear-gradient(${isLeft ? '90deg' : '270deg'}, ${item.color}70, transparent)`,
        }}
      />
    )}

    {/* Header */}
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        {/* Icon bubble */}
        <div
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center
            text-2xl flex-shrink-0"
          style={{ background: item.color + '18', border: `1.5px solid ${item.color}35` }}
        >
          {item.icon}
        </div>

        <div className="min-w-0">
          <h3
            className={`font-black text-base sm:text-lg leading-tight
              ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            {item.degree}
          </h3>
          <p className="font-bold text-sm mt-1" style={{ color: item.color }}>
            {item.institution}
          </p>
        </div>
      </div>

      {/* Grade badge */}
      <div
        className="flex-shrink-0 text-center px-3 py-2 rounded-xl border"
        style={{ color: item.color, background: item.color + '14', borderColor: item.color + '35' }}
      >
        <p className="font-black text-base sm:text-lg leading-none">{item.grade}</p>
        <p className="text-[10px] font-semibold opacity-60 tracking-wider uppercase mt-1">
          {item.gradeLabel}
        </p>
      </div>
    </div>

    {/* Meta row */}
    <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-4">
      <span className={`text-xs sm:text-sm flex items-center gap-1.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        📍 {item.location}
      </span>
      <span className={`text-xs sm:text-sm flex items-center gap-1.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        📅 {item.period}
      </span>
    </div>

    {/* Description */}
    <p className={`mt-4 text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
      {item.description}
    </p>

    {/* Tags */}
    <div className="flex flex-wrap gap-2 mt-4">
      {item.tags.map(tag => (
        <span
          key={tag}
          className="text-xs px-3 py-1.5 rounded-full font-semibold border"
          style={{ color: item.color, background: item.color + '12', borderColor: item.color + '28' }}
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════
   TIMELINE ITEM WRAPPER
══════════════════════════════════════════════════════════ */
const TimelineItem = ({ item, isDark }) => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-70px' });
  const isLeft = item.side === 'left';

  return (
    <div ref={ref} className="relative">

      {/* ── Desktop dot on center line ── */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, type: 'spring', stiffness: 280, damping: 22, delay: 0.1 }}
        className="hidden md:flex absolute left-1/2 top-7 -translate-x-1/2 z-20
          w-5 h-5 lg:w-6 lg:h-6 rounded-full items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${item.color}, ${item.color}99)`,
          boxShadow: `0 0 0 4px var(--bg-cream), 0 0 0 6px ${item.color}40, 0 4px 16px ${item.color}50`,
        }}
      >
        <div className="w-2 h-2 bg-white rounded-full opacity-80" />
      </motion.div>

      {/* ── Mobile dot on left line ── */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, type: 'spring', stiffness: 280, damping: 22, delay: 0.1 }}
        className="md:hidden absolute left-4 top-6 -translate-x-1/2 z-20
          w-4 h-4 rounded-full flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${item.color}, ${item.color}99)`,
          boxShadow: `0 0 0 3px ${item.color}35`,
        }}
      >
        <div className="w-1.5 h-1.5 bg-white rounded-full opacity-80" />
      </motion.div>

      {/* ── Mobile layout — card always right of left line ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden pl-10 sm:pl-12"
      >
        <EduCard item={item} isDark={isDark} isLeft={false} desktop={false} />
      </motion.div>

      {/* ── Desktop layout — alternating left / right ── */}
      <div className={`hidden md:flex items-start
        ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
      >
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -48 : 48 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-[calc(50%-2rem)] lg:w-[calc(50%-2.5rem)]"
        >
          <EduCard item={item} isDark={isDark} isLeft={isLeft} desktop={true} />
        </motion.div>

        {/* Centre gap (holds the timeline line + dot) */}
        <div className="w-16 lg:w-20 flex-shrink-0" />

        {/* Empty opposite side */}
        <div className="w-[calc(50%-2rem)] lg:w-[calc(50%-2.5rem)]" />
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   SECTION
══════════════════════════════════════════════════════════ */
const Education = () => {
  const { theme } = useTheme();
  const isDark    = theme === 'dark';

  const sectionRef  = useRef(null);
  const headingRef  = useRef(null);
  const timelineRef = useRef(null);

  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });

  /* Scroll-driven line growth — tied to the timeline div */
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 85%', 'end 15%'],
  });
  const lineH = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="education"
      ref={sectionRef}
      className={`relative min-h-screen py-20 md:py-28 transition-colors duration-300
        ${isDark
          ? 'bg-[#13112b] border-t border-purple-900/40'
          : 'bg-[#f5f0ff] border-t border-purple-100'
        }`}
    >
      {/* ── Bg orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full opacity-[0.04]"
          style={{ background: 'conic-gradient(from 0deg, #7c3aed, #10b981, #f59e0b, #7c3aed)' }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-32 -left-32 w-[380px] h-[380px] rounded-full opacity-[0.035]"
          style={{ background: 'conic-gradient(from 180deg, #8b5cf6, #f59e0b, #10b981, #8b5cf6)' }}
        />
      </div>

      <div className="page-container relative z-10">

        {/* ── Heading ── */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center text-center mb-14 md:mb-20"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={headingInView ? { opacity: 1, letterSpacing: '0.22em' } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`text-xs sm:text-sm uppercase mb-4 font-semibold
              ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
            style={{ letterSpacing: '0.22em' }}
          >
            Academic Journey
          </motion.p>

          <h2
            className={`font-black leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}
          >
            My{' '}
            <span className="relative inline-block">
              <span style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 55%, #10b981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Education
              </span>
              {/* Squiggle underline */}
              <svg viewBox="0 0 240 14" className="absolute -bottom-2 left-0 w-full" fill="none">
                <motion.path
                  d="M2 9 Q30 3,60 9 Q90 15,120 9 Q150 3,180 9 Q210 15,238 9"
                  stroke="url(#edu-line)" strokeWidth="3" strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={headingInView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.6, duration: 1 }}
                />
                <defs>
                  <linearGradient id="edu-line" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={headingInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.45 }}
            className={`mt-6 max-w-md text-sm md:text-base leading-relaxed
              ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
          >
            The academic path that shaped my passion for technology and problem-solving.
          </motion.p>
        </motion.div>

        {/* ══ TIMELINE ══ */}
        <div ref={timelineRef} className="relative">

          {/* ── Desktop centre line ── */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 z-10">
            <div
              className={`absolute inset-0 rounded-full ${isDark ? 'bg-white/[0.08]' : 'bg-purple-100'}`}
            />
            <motion.div
              className="absolute top-0 left-0 right-0 rounded-full origin-top"
              style={{
                height: lineH,
                background: 'linear-gradient(to bottom, #7c3aed, #a855f7 50%, #10b981)',
                boxShadow: '0 0 10px rgba(139,92,246,0.45)',
              }}
            />
          </div>

          {/* ── Mobile left line ── */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 z-10">
            <div
              className={`absolute inset-0 rounded-full ${isDark ? 'bg-white/[0.08]' : 'bg-purple-100'}`}
            />
            <motion.div
              className="absolute top-0 left-0 right-0 rounded-full origin-top"
              style={{
                height: lineH,
                background: 'linear-gradient(to bottom, #7c3aed, #a855f7 50%, #10b981)',
                boxShadow: '0 0 8px rgba(139,92,246,0.35)',
              }}
            />
          </div>

          {/* ── Items ── */}
          <div className="flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-14">
            {education.map(item => (
              <TimelineItem key={item.id} item={item} isDark={isDark} />
            ))}
          </div>

          {/* ── Bottom cap ── */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-2 z-20
              w-3 h-3 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #10b981, #7c3aed)',
              boxShadow: '0 0 10px rgba(16,185,129,0.5)',
            }}
          />
        </div>

      </div>
    </section>
  );
};

export default Education;