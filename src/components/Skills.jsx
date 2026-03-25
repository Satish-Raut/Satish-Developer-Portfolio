import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaFolder, FaFolderOpen, FaLayerGroup } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { skillCategories } from '../data/portfolio';

/* ══════════════════════════════════════════════════════════
   ALL SKILLS — merged flat list for the "All" tab
══════════════════════════════════════════════════════════ */
const ALL_TAB = {
  id: 'all',
  label: 'All',
  icon: '✦',
  color: '#a855f7',
  skills: skillCategories.flatMap(c => c.skills),
};

const TABS = [ALL_TAB, ...skillCategories];

/* ══════════════════════════════════════════════════════════
   SINGLE SKILL CARD
══════════════════════════════════════════════════════════ */
const SkillCard = ({ item, index, accentColor, isDark }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.75, y: 28 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.75, y: 16 }}
      transition={{
        delay: index * 0.04,
        duration: 0.42,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8, scale: 1.07 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative w-full flex flex-col items-center justify-center gap-3 cursor-default"
    >
      {/* Glow halo behind card */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.6 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 rounded-2xl blur-lg -z-10"
        style={{ background: accentColor + '35' }}
      />

      {/* Card body */}
      <div
        className={`
          relative w-full aspect-square max-w-[130px]
          rounded-2xl border-2 flex flex-col items-center justify-center gap-3
          overflow-hidden transition-all duration-300
          ${isDark
            ? 'bg-[#0f0e1e] border-white/10'
            : 'bg-white border-purple-100 shadow-md shadow-purple-50'
          }
        `}
        style={{
          borderColor: hovered ? accentColor + '80' : undefined,
          boxShadow: hovered
            ? `0 12px 36px ${accentColor}28, 0 0 0 1px ${accentColor}30`
            : undefined,
        }}
      >
        {/* Top accent bar */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 left-0 right-0 h-[3px] origin-left"
          style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}66)` }}
        />

        {/* Shimmer sweep */}
        <motion.div
          animate={{ x: hovered ? '280%' : '-120%' }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? 'linear-gradient(110deg, transparent, rgba(255,255,255,0.055), transparent)'
              : 'linear-gradient(110deg, transparent, rgba(255,255,255,0.8), transparent)',
            width: '50%',
          }}
        />

        {/* Logo */}
        <motion.img
          animate={{ scale: hovered ? 1.18 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          src={item.logo}
          alt={item.name}
          width={44}
          height={44}
          loading="lazy"
          className="object-contain relative z-10"
          style={{
            filter: hovered ? `drop-shadow(0 0 8px ${accentColor}bb)` : 'none',
            transition: 'filter 0.25s ease',
          }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        {/* Fallback if logo fails */}
        <div
          className="hidden items-center justify-center w-11 h-11 rounded-xl text-lg font-black relative z-10"
          style={{ background: accentColor + '22', color: accentColor }}
        >
          {item.name.slice(0, 2).toUpperCase()}
        </div>

        {/* Name */}
        <span
          className={`text-[11px] font-bold text-center leading-tight px-2 relative z-10
            transition-colors duration-200
            ${isDark
              ? hovered ? 'text-white' : 'text-gray-400'
              : hovered ? 'text-gray-900' : 'text-gray-500'
            }`}
        >
          {item.name}
        </span>
      </div>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════════════
   CATEGORY TAB BUTTON
══════════════════════════════════════════════════════════ */
const TabButton = ({ tab, active, onClick, isDark }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className="relative flex items-center gap-2 rounded-2xl text-xs sm:text-sm font-bold border-2 outline-none transition-all duration-250 overflow-hidden flex-shrink-0"
    style={{
      padding: '10px 20px',
      ...(active ? {
        color: 'white',
        background: `linear-gradient(135deg, ${tab.color}dd, ${tab.color}99)`,
        borderColor: tab.color,
        boxShadow: `0 6px 24px ${tab.color}45, 0 2px 8px ${tab.color}25`,
      } : {
        color: isDark ? 'rgba(156,163,175,1)' : 'rgba(107,114,128,1)',
        background: isDark ? 'rgba(255,255,255,0.04)' : 'white',
        borderColor: isDark ? 'rgba(255,255,255,0.09)' : 'rgba(139,92,246,0.15)',
        boxShadow: isDark ? 'none' : '0 2px 8px rgba(139,92,246,0.07)',
      }),
    }}
  >
    {active && (
      <motion.div
        animate={{ x: ['−100%', '200%'] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
        }}
      />
    )}
    <span className="text-base relative z-10 leading-none">{tab.icon}</span>
    <span className="relative z-10 whitespace-nowrap leading-none">{tab.label}</span>
    {active && (
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="relative z-10 text-[11px] font-black opacity-75 ml-0.5 leading-none"
      >
        {tab.skills.length}
      </motion.span>
    )}
  </motion.button>
);

/* ══════════════════════════════════════════════════════════
   SKILLS SECTION
══════════════════════════════════════════════════════════ */
const Skills = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeId, setActiveId] = useState('all');
  const activeTab = TABS.find(t => t.id === activeId) ?? TABS[0];

  return (
    <section
      id="skills"
      ref={ref}
      className={`relative overflow-hidden transition-colors duration-300
        ${isDark ? 'bg-[#0d0d1a]' : 'bg-[#faf8ff]'}`}
      style={{ paddingTop: '5rem', paddingBottom: '6rem' }}
    >
      {/* ── Decorative orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full opacity-[0.035]"
          style={{ background: 'conic-gradient(from 0deg, #7c3aed, #a855f7, #ec4899, #3b82f6, #10b981, #7c3aed)' }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: 'conic-gradient(from 180deg, #a855f7, #ec4899, #f59e0b, #a855f7)' }}
        />
      </div>

      {/* ── Content wrapper ── */}
      <div className="page-container relative z-10">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center text-center mb-12 md:mb-16"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={inView ? { opacity: 1, letterSpacing: '0.25em' } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            className={`text-xs sm:text-sm uppercase mb-4 font-semibold tracking-[0.25em]
              ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
          >
            What I work with
          </motion.p>

          <h2
            className={`font-black leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}
          >
            My{' '}
            <span className="relative inline-block">
              <span style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Skillset
              </span>
              <svg viewBox="0 0 220 14" className="absolute -bottom-2 left-0 w-full" fill="none">
                <motion.path
                  d="M2 9 Q28 3,55 9 Q82 15,110 9 Q138 3,165 9 Q192 15,218 9"
                  stroke="url(#sq)" strokeWidth="3" strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.55, duration: 0.9 }}
                />
                <defs>
                  <linearGradient id="sq" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className={`mt-6 max-w-md mx-auto text-sm md:text-base leading-relaxed
              ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
          >
            Technologies I use to craft fast, scalable & intelligent digital experiences.
          </motion.p>
        </motion.div>

        {/* ── Category Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-3 mb-10 md:mb-12 overflow-x-auto pb-2 sm:pb-0 scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TABS.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              active={activeId === tab.id}
              onClick={() => setActiveId(tab.id)}
              isDark={isDark}
            />
          ))}
        </motion.div>

        {/* ── Skill deck: fixed min-height so switching tabs (few vs many skills) doesn’t shrink the page ── */}
        <div className="flex w-full min-h-[min(58vh,38rem)] flex-col sm:min-h-[40rem] md:min-h-[42rem] lg:min-h-[44rem]">
        {/* ── Active category header ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id + '-header'}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.3 }}
            className="mb-6 flex flex-wrap items-center justify-center gap-3 overflow-hidden text-center sm:mb-8"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{
                background: activeTab.color + '20',
                border: `1.5px solid ${activeTab.color}40`,
                boxShadow: `0 4px 16px ${activeTab.color}20`,
              }}
            >
              {activeTab.icon}
            </div>
            <div className="min-w-0 text-center">
              <h3 className={`font-black text-base md:text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {activeTab.label}
              </h3>
              <p className={`text-xs font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {activeTab.skills.length} technologies
              </p>
            </div>
            <div className="hidden h-px min-w-[2rem] flex-1 md:block ml-2" style={{ background: `linear-gradient(90deg, ${activeTab.color}40, transparent)` }} />
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border flex-shrink-0"
              style={{ borderColor: activeTab.color + '35', background: activeTab.color + '10' }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: activeTab.color }} />
              <span className="text-[11px] font-bold font-mono" style={{ color: activeTab.color }}>active</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Skills grid (fills remaining deck height; content top-aligned) ── */}
        <div className="flex flex-1 flex-col min-h-[min(48vh,26rem)] sm:min-h-[28rem] md:min-h-[30rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid w-full flex-1 content-start justify-center justify-items-center"
            style={{
              gap: '0.75rem',
              padding: '0 4px',
              gridTemplateColumns: 'repeat(auto-fill, minmax(112px, 128px))',
              gridAutoRows: 'min-content',
            }}
          >
            {activeTab.skills.map((skill, i) => (
              <SkillCard
                key={`${activeTab.id}-${skill.name}`}
                item={skill}
                index={i}
                accentColor={activeTab.color}
                isDark={isDark}
              />
            ))}
          </motion.div>
        </AnimatePresence>
        </div>
        </div>
        {/* end skill deck */}

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className={`rounded-3xl border-2
            ${isDark
              ? 'bg-white/[0.03] border-white/[0.07]'
              : 'bg-white/70 border-purple-100 shadow-lg shadow-purple-50'
            }
          `}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            padding: '2rem 1.5rem',
            gap: 0,
            maxWidth: '42rem',
            margin: '3.5rem auto 0',
            width: '100%',
          }}
        >
          {[
            { num: `${ALL_TAB.skills.length}+`, label: 'Technologies', icon: '⚡' },
            { num: `${skillCategories.length}`,  label: 'Categories',   icon: '📂' },
            { num: '3+',                          label: 'Years Learning', icon: '📅' },
          ].map((s, i) => (
            <div key={s.label}
              style={{
                textAlign: 'center',
                padding: '0 1rem',
                borderLeft: i > 0 ? `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(139,92,246,0.15)'}` : 'none',
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div
                className="font-black"
                style={{
                  fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)',
                  background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {s.num}
              </div>
              <div style={{
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 700,
                marginTop: 4,
                color: isDark ? '#6b7280' : '#9ca3af',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;