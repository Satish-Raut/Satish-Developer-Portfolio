import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaArrowUp } from 'react-icons/fa';
import { SiReact, SiTailwindcss, SiFramer, SiLeetcode } from 'react-icons/si';
import { personal, techStack, socials, navLinks } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';

const iconMap = { FaGithub, FaLinkedin, SiLeetcode };

/* ── Floating ambient glow blob ── */
const Blob = ({ style }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    animate={{ y: [0, -20, 0], scale: [1, 1.15, 1], opacity: [style.op, style.op * 1.6, style.op] }}
    transition={{ duration: style.dur, repeat: Infinity, delay: style.delay, ease: 'easeInOut' }}
    style={{
      width: style.size, height: style.size,
      left: style.left, top: style.top,
      background: style.color,
      filter: `blur(${style.blur}px)`,
    }}
  />
);

const blobs = [
  { size: 340, left: '-8%',  top: '5%',   color: 'rgba(124,58,237,0.18)',  blur: 70, dur: 8,  delay: 0,   op: 0.18 },
  { size: 220, left: '70%',  top: '-8%',  color: 'rgba(168,85,247,0.15)',  blur: 55, dur: 10, delay: 1.5, op: 0.15 },
  { size: 160, left: '45%',  top: '55%',  color: 'rgba(236,72,153,0.12)',  blur: 45, dur: 7,  delay: 0.8, op: 0.12 },
  { size: 100, left: '15%',  top: '70%',  color: 'rgba(99,102,241,0.20)',  blur: 35, dur: 9,  delay: 2,   op: 0.20 },
  { size: 80,  left: '85%',  top: '50%',  color: 'rgba(139,92,246,0.22)',  blur: 28, dur: 6,  delay: 0.4, op: 0.22 },
];

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const year   = new Date().getFullYear();
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const muted = isDark ? 'rgba(156,163,175,0.75)' : 'rgba(107,114,128,0.85)';
  const faint = isDark ? 'rgba(107,114,128,0.6)'  : 'rgba(156,163,175,0.8)';
  const border = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(124,58,237,0.1)';

  return (
    <footer
      ref={ref}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: isDark
          ? 'linear-gradient(180deg, #0d0d1a 0%, #09071a 50%, #060412 100%)'
          : 'linear-gradient(180deg, #faf8ff 0%, #f3eeff 50%, #ede8ff 100%)',
        borderTop: isDark
          ? '1px solid rgba(124,58,237,0.22)'
          : '1px solid rgba(124,58,237,0.14)',
      }}
    >
      {/* ── Texture grid overlay ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: isDark
          ? 'linear-gradient(rgba(124,58,237,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.045) 1px,transparent 1px)'
          : 'linear-gradient(rgba(124,58,237,0.055) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.055) 1px,transparent 1px)',
        backgroundSize: '56px 56px',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
      }} />

      {/* ── Dot texture layer ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `radial-gradient(circle, ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(124,58,237,0.08)'} 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 100%)',
      }} />

      {/* ── Ambient blobs ── */}
      {blobs.map((b, i) => <Blob key={i} style={b} />)}

      {/* ══ MARQUEE STRIP ══ */}
      <div style={{
        position: 'relative', zIndex: 2, overflow: 'hidden',
        borderBottom: isDark ? '1px solid rgba(124,58,237,0.12)' : '1px solid rgba(124,58,237,0.1)',
        padding: '10px 0',
      }}>
        <div className="marquee-track" style={{ gap: 28 }}>
          {[...techStack, ...techStack].map((tech, i) => (
            <span key={i} style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.16em',
              textTransform: 'uppercase', whiteSpace: 'nowrap',
              padding: '4px 14px', borderRadius: 999,
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(124,58,237,0.15)'}`,
              color: isDark ? 'rgba(156,163,175,0.7)' : 'rgba(107,114,128,0.75)',
            }}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* ══ BIG NAME HERO ══ */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '4.5rem 1rem 0', overflow: 'hidden' }}>

        {/* Radial glow behind name */}
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%,-50%)',
          width: '80%', height: '60%',
          background: isDark
            ? 'radial-gradient(ellipse, rgba(124,58,237,0.22) 0%, transparent 70%)'
            : 'radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)',
          filter: 'blur(32px)', pointerEvents: 'none',
        }} />

        {/* Animated BIG name */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', display: 'inline-block' }}
        >
          {/* Outline ghost text behind */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            fontSize: 'clamp(3.5rem, 16vw, 11rem)',
            fontWeight: 900, lineHeight: 1,
            WebkitTextStroke: isDark ? '1px rgba(124,58,237,0.2)' : '1px rgba(124,58,237,0.12)',
            color: 'transparent',
            userSelect: 'none', pointerEvents: 'none',
            transform: 'translateY(4px)',
          }}>
            {personal.name}
            <span style={{ WebkitTextStroke: '1px rgba(168,85,247,0.25)' }}>.</span>
            <span style={{ fontSize: 'clamp(2rem, 8vw, 6rem)', fontWeight: 300 }}>dev</span>
          </div>

          {/* Main animated shine name */}
          <motion.h2
            initial={{ letterSpacing: '0.35em', opacity: 0 }}
            animate={inView ? { letterSpacing: '0.02em', opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-shine"
            style={{
              fontSize: 'clamp(3.5rem, 16vw, 11rem)',
              fontWeight: 900, lineHeight: 1,
              position: 'relative', zIndex: 1,
              display: 'inline-block',
            }}
          >
            {personal.name}
            <motion.span
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              style={{ color: '#a855f7', WebkitTextFillColor: '#a855f7' }}
            >.</motion.span>
            <span style={{
              fontWeight: 300,
              fontSize: 'clamp(2rem, 8vw, 6rem)',
              opacity: 0.45,
            }}>dev</span>
          </motion.h2>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
          style={{
            fontSize: 'clamp(0.85rem, 2vw, 1.05rem)',
            color: muted, marginTop: '1.25rem',
            letterSpacing: '0.05em', maxWidth: 500, margin: '1.25rem auto 0',
          }}
        >
          {personal.tagline}
        </motion.p>

        {/* Animated gradient divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ delay: 0.55, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: 1, width: '100%',
            background: isDark
              ? 'linear-gradient(90deg,transparent,rgba(124,58,237,0.5) 25%,rgba(168,85,247,0.9) 50%,rgba(124,58,237,0.5) 75%,transparent)'
              : 'linear-gradient(90deg,transparent,rgba(124,58,237,0.25) 25%,rgba(168,85,247,0.5) 50%,rgba(124,58,237,0.25) 75%,transparent)',
            transformOrigin: 'left',
            margin: '3rem 0 0',
          }}
        />
      </div>

      {/* ══ FOOTER BODY ══ */}
      <div className="page-container" style={{ position: 'relative', zIndex: 2, paddingTop: '3rem', paddingBottom: '0' }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          paddingBottom: '3rem',
        }}>

          {/* Col 1 — Brand */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
              <span style={{ fontSize: 20, fontWeight: 900, color: isDark ? '#fff' : '#111' }}>
                {personal.name}
              </span>
              <span style={{ color: '#a855f7', fontSize: 20, fontWeight: 900 }}>.</span>
              <span style={{ fontSize: 14, fontWeight: 300, color: isDark ? 'rgba(196,181,253,0.5)' : 'rgba(124,58,237,0.45)' }}>
                dev
              </span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.75, color: muted, maxWidth: 260, marginBottom: 20 }}>
              {personal.bio}
            </p>

            {/* Socials */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', width: '100%' }}>
              
              {/* GITHUB */}
              <motion.a href="https://github.com/Satish-Raut" target="_blank" rel="noreferrer" aria-label="GitHub"
                whileHover={{ y: -4, scale: 1.15 }} className="pulse-ring"
                style={{
                  width: 42, height: 42, minWidth: 42, flexShrink: 0, borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, transition: 'all 0.2s',
                  background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(124,58,237,0.07)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(124,58,237,0.18)'}`,
                  color: isDark ? 'rgba(196,181,253,0.8)' : '#7c3aed',
                }}
              >
                <FaGithub />
              </motion.a>

              {/* LINKEDIN */}
              <motion.a href="https://www.linkedin.com/in/satish-raut12/" target="_blank" rel="noreferrer" aria-label="LinkedIn"
                whileHover={{ y: -4, scale: 1.15 }} className="pulse-ring"
                style={{
                  width: 42, height: 42, minWidth: 42, flexShrink: 0, borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, transition: 'all 0.2s',
                  background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(124,58,237,0.07)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(124,58,237,0.18)'}`,
                  color: isDark ? 'rgba(196,181,253,0.8)' : '#7c3aed',
                }}
              >
                <FaLinkedin />
              </motion.a>

              {/* LEETCODE */}
              <motion.a href="https://leetcode.com/u/__Satish__/" target="_blank" rel="noreferrer" aria-label="LeetCode"
                whileHover={{ y: -4, scale: 1.15 }} className="pulse-ring"
                style={{
                  width: 42, height: 42, minWidth: 42, flexShrink: 0, borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, transition: 'all 0.2s',
                  background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(124,58,237,0.07)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(124,58,237,0.18)'}`,
                  color: isDark ? 'rgba(196,181,253,0.8)' : '#7c3aed',
                }}
              >
                <SiLeetcode />
              </motion.a>
              
            </div>
          </motion.div>

          {/* Col 2 — Nav */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.42, duration: 0.6 }}
          >
            <h4 style={{
              fontSize: 10, fontWeight: 800, textTransform: 'uppercase',
              letterSpacing: '0.18em', marginBottom: 18,
              color: isDark ? 'rgba(196,181,253,0.7)' : '#7c3aed',
            }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {navLinks.map((link, i) => (
                <motion.a key={link.label} href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.42 + i * 0.06 }}
                  whileHover={{ x: 6 }}
                  style={{
                    fontSize: 14, fontWeight: 500, color: muted,
                    textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8,
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#a855f7'}
                  onMouseLeave={e => e.currentTarget.style.color = muted}
                >
                  <span style={{
                    width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(124,58,237,0.12)', fontSize: 10, color: '#a855f7',
                  }}>›</span>
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Col 3 — Contact */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.54, duration: 0.6 }}
          >
            <h4 style={{
              fontSize: 10, fontWeight: 800, textTransform: 'uppercase',
              letterSpacing: '0.18em', marginBottom: 18,
              color: isDark ? 'rgba(196,181,253,0.7)' : '#7c3aed',
            }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { Icon: FaEnvelope,     text: personal.email,    href: `mailto:${personal.email}`, color: '#7c3aed' },
                { Icon: FaMapMarkerAlt, text: personal.location, href: null,                        color: '#10b981' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: item.color + '18', color: item.color, fontSize: 14,
                    border: `1px solid ${item.color}30`,
                  }}>
                    <item.Icon />
                  </div>
                  {item.href
                    ? <a href={item.href} style={{ fontSize: 13, color: muted, textDecoration: 'none' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#a855f7'}
                        onMouseLeave={e => e.currentTarget.style.color = muted}
                      >{item.text}</a>
                    : <span style={{ fontSize: 13, color: muted }}>{item.text}</span>
                  }
                </div>
              ))}

              {/* Built with */}
              <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, color: faint, fontWeight: 600 }}>Built with</span>
                {[
                  { Icon: SiReact,       color: '#61dafb', label: 'React'    },
                  { Icon: SiTailwindcss, color: '#06b6d4', label: 'Tailwind' },
                  { Icon: SiFramer,      color: '#a855f7', label: 'Framer'   },
                ].map(({ Icon, color, label }) => (
                  <motion.span key={label} whileHover={{ scale: 1.25, y: -3 }}
                    title={label} style={{ fontSize: 17, color, cursor: 'default' }}>
                    <Icon />
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          borderTop: `1px solid ${border}`,
          padding: '1.25rem 0 1.5rem',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '0.75rem',
        }}>
          <p style={{ fontSize: 12, color: faint }}>
            © {year}&nbsp;{personal.fullName} &nbsp;·&nbsp; Crafted with{' '}
            <span style={{ color: '#f87171' }}>♥</span>
            &nbsp;and lots of&nbsp;
            <span style={{ color: '#a855f7' }}>☕</span>
          </p>

          <motion.a
            href="#home"
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 11, fontWeight: 800, textDecoration: 'none',
              padding: '8px 18px', borderRadius: 999,
              color: '#a855f7', letterSpacing: '0.08em', textTransform: 'uppercase',
              background: isDark ? 'rgba(168,85,247,0.1)' : 'rgba(168,85,247,0.08)',
              border: '1px solid rgba(168,85,247,0.28)',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div className="shimmer-line" />
            <FaArrowUp style={{ fontSize: 10 }} />
            Back to top
          </motion.a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;