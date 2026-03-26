import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaExternalLinkAlt, FaStar } from 'react-icons/fa';
import { projects } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

/*
  Color palette — stays within the portfolio's purple/violet/yellow theme.
  Every pair is a subtle variation: dark purple → light purple/violet/yellow accent.
  No random greens, blues, reds that clash with the rest of the site.
*/
const CARD_ACCENTS = [
  { from: '#7c3aed', to: '#a855f7' },   /* core purple → light purple  */
  { from: '#6d28d9', to: '#8b5cf6' },   /* deep violet → mid purple    */
  { from: '#7c3aed', to: '#c4b5fd' },   /* purple → lavender           */
  { from: '#5b21b6', to: '#a855f7' },   /* indigo-purple → violet      */
  { from: '#8b5cf6', to: '#fbbf24' },   /* purple → yellow accent      */
  { from: '#6d28d9', to: '#c4b5fd' },   /* deep violet → soft lavender */
  { from: '#7c3aed', to: '#a78bfa' },   /* purple → periwinkle         */
];

/* ══════════════════════════════════════════════════
   PROJECT CARD — modern glass with 3D tilt
══════════════════════════════════════════════════ */
const ProjectCard = ({ project, isDark, index }) => {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt]       = useState({ x: 0, y: 0 });
  const cardRef               = useRef(null);
  const accent                = CARD_ACCENTS[index % CARD_ACCENTS.length];

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = (e.clientX - rect.left) / rect.width  - 0.5;
    const cy = (e.clientY - rect.top)  / rect.height - 0.5;
    setTilt({ x: cy * -8, y: cx * 8 });
  };
  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.article
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); resetTilt(); }}
      onMouseMove={handleMouseMove}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale:   hovered ? 1.02 : 1,
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      style={{
        /* sizing */
        width: 'min(calc(100vw - 2.5rem), 380px)',
        height: 'min(76dvh, 580px)', // Rigid geometry ensures strict viewport matching
        flexShrink: 0,
        display: 'flex', flexDirection: 'column',
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'default',
        transformStyle: 'flat',
        /* border changes on hover */
        border: `1.5px solid ${hovered
          ? accent.from + '70'
          : isDark ? 'rgba(139,92,246,0.18)' : 'rgba(124,58,237,0.14)'}`,
        /* background */
        background: isDark
          ? hovered ? 'rgba(26,16,56,0.95)' : 'rgba(15,10,35,0.88)'
          : hovered ? 'rgba(250,248,255,1)' : 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(16px)',
        /* shadow */
        boxShadow: hovered
          ? `0 20px 50px rgba(124,58,237,0.22), 0 0 0 1px ${accent.from}25`
          : isDark
            ? '0 4px 20px rgba(0,0,0,0.45)'
            : '0 4px 20px rgba(124,58,237,0.07)',
        transition: 'border-color 0.3s, box-shadow 0.3s, background 0.3s',
      }}
    >
      {/* ── Top accent gradient bar ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3, zIndex: 10,
        background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
        opacity: hovered ? 1 : 0.55,
        transition: 'opacity 0.3s',
      }} />

      {/* ── Image / hero area ── */}
      <div style={{
        position: 'relative',
        height: '35%', minHeight: 110, // Adjusted smaller for mobile breathing room
        flexShrink: 0, overflow: 'hidden',
        background: isDark
          ? `linear-gradient(135deg, ${accent.from}1a, rgba(13,10,28,0.9))`
          : `linear-gradient(135deg, ${accent.from}12, rgba(245,240,255,0.8))`,
      }}>
        {project.imageUrl ? (
          <img
            src={project.imageUrl} alt={project.title}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              opacity: hovered ? 0.88 : 0.62,
              transform: `scale(${hovered ? 1.05 : 1})`,
              transition: 'opacity 0.5s, transform 0.5s',
            }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 40, fontFamily: 'monospace', fontWeight: 700,
            color: accent.from,
            opacity: hovered ? 0.3 : 0.14,
            transition: 'opacity 0.3s',
          }}>{'</>'}</div>
        )}

        {/* bottom fade into card body */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
          background: isDark
            ? 'linear-gradient(to top, rgba(15,10,35,0.95), transparent)'
            : 'linear-gradient(to top, rgba(255,255,255,0.95), transparent)',
        }} />

        {/* Featured badge */}
        {project.featured && (
          <div style={{
            position: 'absolute', top: 12, right: 12,
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '5px 11px', borderRadius: 999,
            background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
            fontSize: 11, fontWeight: 800, color: 'white',
            boxShadow: `0 4px 12px ${accent.from}55`,
            letterSpacing: '0.03em',
          }}>
            <FaStar style={{ fontSize: 8 }} /> Featured
          </div>
        )}

        {/* Card index */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          width: 28, height: 28, borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: isDark ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(8px)',
          fontSize: 11, fontWeight: 900,
          color: accent.from,
          border: `1px solid ${accent.from}35`,
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* ── Card content ── */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        padding: '1.25rem', // Tighter spacing internally
        gap: '0.7rem',
        overflow: 'hidden',
      }}>

        {/* Title */}
        <h3 style={{
          fontSize: 16, fontWeight: 800, lineHeight: 1.3, shrink: 0,
          color: isDark ? '#f0eeff' : '#18111a', flexShrink: 0
        }}>
          {project.title}
        </h3>

        {/* Scrollable Center Block for mobile cramming constraints */}
        <div style={{ 
          flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem', 
          overflowY: 'auto', paddingRight: '4px', scrollbarWidth: 'none', msOverflowStyle: 'none' 
        }}>
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>
          
          {/* Description */}
          <p style={{
            fontSize: 13, lineHeight: 1.6,
            color: isDark ? 'rgba(167,139,250,0.7)' : 'rgba(109,40,217,0.6)',
          }}>
            {project.description}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingBottom: '0.5rem' }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                fontSize: 11, fontWeight: 600,
                padding: '4px 10px', borderRadius: 999,
                background: hovered
                  ? `${accent.from}18`
                  : isDark ? 'rgba(139,92,246,0.1)' : 'rgba(124,58,237,0.07)',
                border: `1px solid ${hovered
                  ? accent.from + '45'
                  : isDark ? 'rgba(139,92,246,0.22)' : 'rgba(124,58,237,0.18)'}`,
                color: hovered ? accent.from : isDark ? '#c4b5fd' : '#7c3aed',
                transition: 'all 0.25s',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: 1, flexShrink: 0, marginTop: 'auto',
          background: isDark
            ? 'rgba(139,92,246,0.12)'
            : 'rgba(124,58,237,0.08)',
        }} />

        {/* Links */}
        <div style={{ display: 'flex', gap: 10, flexShrink: 0, paddingTop: '4px' }}>
          {/* GitHub — ghost */}
          <a href={project.githubUrl} target="_blank" rel="noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 13, fontWeight: 600, textDecoration: 'none',
              padding: '7px 14px', borderRadius: 9,
              color: isDark ? '#c4b5fd' : '#7c3aed',
              background: isDark ? 'rgba(139,92,246,0.1)' : 'rgba(124,58,237,0.07)',
              border: `1px solid ${isDark ? 'rgba(139,92,246,0.22)' : 'rgba(124,58,237,0.18)'}`,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = accent.from + '22';
              e.currentTarget.style.borderColor = accent.from + '55';
              e.currentTarget.style.color = accent.from;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = isDark ? 'rgba(139,92,246,0.1)' : 'rgba(124,58,237,0.07)';
              e.currentTarget.style.borderColor = isDark ? 'rgba(139,92,246,0.22)' : 'rgba(124,58,237,0.18)';
              e.currentTarget.style.color = isDark ? '#c4b5fd' : '#7c3aed';
            }}
          >
            <FaGithub style={{ fontSize: 13 }} /> Code
          </a>

          {/* Live Demo — solid gradient */}
          <a href={project.liveUrl} target="_blank" rel="noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 13, fontWeight: 700, textDecoration: 'none',
              padding: '7px 16px', borderRadius: 9,
              color: 'white',
              background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
              boxShadow: hovered
                ? `0 6px 18px ${accent.from}45`
                : `0 3px 10px ${accent.from}28`,
              transition: 'box-shadow 0.3s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <FaExternalLinkAlt style={{ fontSize: 10 }} /> Live Demo
          </a>
        </div>
      </div>

      {/* ── Shimmer sweep on hover ── */}
      {hovered && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '260%' }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5,
            background: 'linear-gradient(105deg, transparent 30%, rgba(167,139,250,0.07) 50%, transparent 70%)',
          }}
        />
      )}
    </motion.article>
  );
};

/* ══════════════════════════════════════════════════
   PROJECTS SECTION
══════════════════════════════════════════════════ */
const Projects = () => {
  const headingRef    = useRef(null);
  const pinRef        = useRef(null);
  const trackRef      = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });
  const { theme }     = useTheme();
  const isDark        = theme === 'dark';

  useLayoutEffect(() => {
    const scroller = pinRef.current;
    const track    = trackRef.current;
    if (!scroller || !track || projects.length === 0) return;

    const rafId = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        const getAmount = () => Math.max(track.scrollWidth - scroller.clientWidth, 0);

        gsap.to(track, {
          x: () => -getAmount(),
          ease: 'none',
          scrollTrigger: {
            scroller:            document.documentElement,
            trigger:             scroller,
            start:               'top top',
            end:                 () => `+=${Math.max(getAmount(), 1)}`,
            pin:                 true,
            scrub:               true,
            anticipatePin:       1,
            invalidateOnRefresh: true,
            fastScrollEnd:       true,
            onRefresh:           self => self.update(),
          },
        });
      }, scroller);

      ScrollTrigger.refresh();
      scroller._gsapCtx = ctx;
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('load', onLoad);
      cancelAnimationFrame(rafId);
      if (pinRef.current?._gsapCtx) pinRef.current._gsapCtx.revert();
      ScrollTrigger.refresh();
    };
  }, [projects.length, theme]);

  return (
    <section
      id="projects"
      className={`relative transition-colors duration-300 ${isDark ? 'bg-[#0d0d1a]' : 'bg-[#faf8ff]'}`}
    >
      {/* ── Heading ── */}
      <div className="page-container" style={{ paddingTop: '4.5rem', paddingBottom: '2rem' }}>
        <motion.div
          ref={headingRef}
          variants={fadeUp} initial="hidden"
          animate={headingInView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', maxWidth: '42rem', marginLeft: 'auto', marginRight: 'auto' }}
        >
          <p style={{
            fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em',
            fontWeight: 700, color: 'var(--muted)', marginBottom: 12,
          }}>
            What I&apos;ve built
          </p>
          <h2
            className={`font-black ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', textAlign: 'center', lineHeight: 1.1 }}
          >
            My <span className="gradient-text">Projects</span>
          </h2>
          <div style={{
            width: 64, height: 4, borderRadius: 999,
            background: 'linear-gradient(90deg, #7c3aed, #a855f7)',
            margin: '1rem auto 0',
          }} />
          <p style={{
            marginTop: '1rem', fontSize: 14, lineHeight: 1.65, textAlign: 'center',
            color: isDark ? 'rgba(156,163,175,0.8)' : 'rgba(107,114,128,0.9)',
            maxWidth: '28rem', marginLeft: 'auto', marginRight: 'auto',
          }}>
            Scroll to swipe through projects — each one crafted with care.
          </p>

          {/* count pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: '1.25rem', flexWrap: 'wrap' }}>
            {[
              { label: `${projects.length} Projects`,                      color: '#7c3aed' },
              { label: `${projects.filter(p => p.featured).length} Featured`, color: '#fbbf24' },
            ].map(p => (
              <span key={p.label} style={{
                fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 999,
                background: p.color + '15', border: `1px solid ${p.color}35`,
                color: p.color, letterSpacing: '0.06em',
              }}>{p.label}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Pinned horizontal stage ── */}
      <div
        ref={pinRef}
        style={{
          position: 'relative', display: 'flex',
          height: '100vh', width: '100%',
          flexDirection: 'column', justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex', width: 'max-content',
            alignItems: 'stretch',
            gap: '1.5rem',
            padding: '1.5rem 4vw',
            willChange: 'transform',
          }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} isDark={isDark} index={i} />
          ))}
        </div>

        {/* animated scroll hint */}
        <div style={{
          position: 'absolute', bottom: 22, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.2em', pointerEvents: 'none',
          color: isDark ? 'rgba(139,92,246,0.45)' : 'rgba(124,58,237,0.4)',
        }}>
          <motion.span animate={{ x: [-3, 0, -3] }} transition={{ duration: 1.5, repeat: Infinity }}>←</motion.span>
          scroll
          <motion.span animate={{ x: [3, 0, 3] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
        </div>
      </div>
    </section>
  );
};

export default Projects;