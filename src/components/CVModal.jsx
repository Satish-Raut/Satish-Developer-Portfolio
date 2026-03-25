import { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { HiDownload } from 'react-icons/hi';
import { HiArrowTopRightOnSquare, HiXMark } from 'react-icons/hi2';
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi';

/* ══════════════════════════════════════════════════════════════
   CVModal — Premium redesign
   ─────────────────────────────────────────────────────────────
   Design direction: "OS-native meets editorial luxury"
   • Frosted-glass chrome with purple-tinted depth layers
   • Animated gradient mesh backdrop unique to each open
   • Toolbar with pill-grouped actions, not scattered buttons
   • Scanline/noise texture for analog warmth
   • Micro-spring on every interactive surface
══════════════════════════════════════════════════════════════ */

/* ── Noise SVG filter (renders inline, no external asset) ── */
const NoiseFilter = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }}>
    <filter id="cv-noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
      <feBlend in="SourceGraphic" mode="overlay" result="blend" />
      <feComposite in="blend" in2="SourceGraphic" operator="in" />
    </filter>
  </svg>
);

/* ── Animated mesh gradient blobs ── */
const MeshBlobs = ({ isDark }) => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
    <motion.div
      animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute', top: '-30%', right: '-10%',
        width: '55%', height: '70%', borderRadius: '50%',
        background: isDark
          ? 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 65%)'
          : 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 65%)',
        filter: 'blur(40px)',
      }}
    />
    <motion.div
      animate={{ x: [0, -20, 0], y: [0, 25, 0], scale: [1, 1.12, 1] }}
      transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      style={{
        position: 'absolute', bottom: '-20%', left: '-10%',
        width: '45%', height: '60%', borderRadius: '50%',
        background: isDark
          ? 'radial-gradient(circle, rgba(168,85,247,0.14) 0%, transparent 65%)'
          : 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 65%)',
        filter: 'blur(40px)',
      }}
    />
    <motion.div
      animate={{ x: [0, 15, -10, 0], y: [0, -30, 10, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      style={{
        position: 'absolute', top: '30%', left: '20%',
        width: '30%', height: '40%', borderRadius: '50%',
        background: isDark
          ? 'radial-gradient(circle, rgba(196,181,253,0.07) 0%, transparent 65%)'
          : 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 65%)',
        filter: 'blur(30px)',
      }}
    />
  </div>
);

/* ── Traffic-light dot ── */
const Dot = ({ color, glow, onClick, title }) => (
  <motion.button
    onClick={onClick}
    title={title}
    aria-label={title}
    whileHover={{ scale: 1.3 }}
    whileTap={{ scale: 0.85 }}
    style={{
      width: 12, height: 12, borderRadius: '50%',
      background: color,
      border: 'none', cursor: onClick ? 'pointer' : 'default',
      boxShadow: `0 0 0 1px rgba(0,0,0,0.15) inset, 0 0 8px ${glow}`,
      flexShrink: 0,
    }}
  />
);

/* ── Pill action button ── */
const PillBtn = ({ href, download, onClick, children, variant = 'ghost', isDark }) => {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    height: 32, padding: '0 14px',
    borderRadius: 999,
    fontSize: 12, fontWeight: 700,
    fontFamily: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer', border: 'none',
    whiteSpace: 'nowrap',
    transition: 'box-shadow 0.2s, background 0.2s',
  };

  const variants = {
    ghost: {
      background: isDark ? 'rgba(139,92,246,0.10)' : 'rgba(139,92,246,0.07)',
      border: `1px solid ${isDark ? 'rgba(139,92,246,0.22)' : 'rgba(139,92,246,0.15)'}`,
      color: isDark ? 'rgba(196,181,253,0.9)' : 'rgba(109,40,217,0.9)',
      boxShadow: 'none',
    },
    primary: {
      background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
      border: '1px solid rgba(124,58,237,0.0)',
      color: 'white',
      boxShadow: '0 4px 16px rgba(124,58,237,0.40), 0 0 0 1px rgba(168,85,247,0.3) inset',
    },
  };

  const Tag = href ? motion.a : motion.button;
  return (
    <Tag
      href={href}
      download={download}
      onClick={onClick}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.96 }}
      style={{ ...base, ...variants[variant] }}
    >
      {children}
    </Tag>
  );
};

/* ══ MAIN COMPONENT ══ */
const CVModal = ({
  isOpen,
  onClose,
  resumeUrl,
  fileName  = 'Satish_Raut_CV.pdf',
  fileSub   = 'Résumé · 2026',
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [expanded, setExpanded] = useState(false);
  const [loaded, setLoaded] = useState(false);

  /* keyboard close */
  const handleKey = useCallback(
    (e) => { if (e.key === 'Escape') onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
      setLoaded(false);
    }
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKey]);

  /* reset expand on close */
  useEffect(() => { if (!isOpen) setExpanded(false); }, [isOpen]);

  const isPdf = resumeUrl?.toLowerCase().endsWith('.pdf');

  /* ── design tokens ── */
  const surface  = isDark ? 'rgba(10, 7, 22, 0.97)'  : 'rgba(252, 250, 255, 0.98)';
  const chrome   = isDark ? 'rgba(15, 10, 32, 0.95)' : 'rgba(248, 245, 255, 0.95)';
  const border   = isDark ? 'rgba(139,92,246,0.18)'  : 'rgba(139,92,246,0.13)';
  const subtext  = isDark ? 'rgba(167,139,250,0.5)'  : 'rgba(109,40,217,0.45)';
  const titleClr = isDark ? '#ede9fe'                 : '#1e0a4a';
  const viewerBg = isDark ? '#06040f'                 : '#ede9fb';

  /* Modal dimensions */
  const modalW = expanded ? '100vw'      : 'min(96vw, 880px)';
  const modalH = expanded ? '100dvh'     : 'min(92dvh, 740px)';
  const modalR = expanded ? 0           : 18;

  return (
    <>
      <NoiseFilter />

      <AnimatePresence>
        {isOpen && (
          <>
            {/* ── Backdrop ── */}
            <motion.div
              key="cv-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={onClose}
              style={{
                position: 'fixed', inset: 0, zIndex: 60,
                background: isDark
                  ? 'rgba(3, 1, 12, 0.85)'
                  : 'rgba(10, 5, 30, 0.50)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
              }}
            />

            {/* ── Modal shell ── */}
            <motion.div
              key="cv-modal"
              initial={{ opacity: 0, scale: 0.94, y: 32 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 32 }}
              transition={{ type: 'spring', stiffness: 380, damping: 36, mass: 0.8 }}
              style={{
                position: 'fixed', inset: 0, zIndex: 70,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: expanded ? 0 : '1rem',
                pointerEvents: 'none',
              }}
            >
              <motion.div
                animate={{ width: modalW, height: modalH, borderRadius: modalR }}
                transition={{ type: 'spring', stiffness: 300, damping: 32 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  pointerEvents: 'auto',
                  display: 'flex', flexDirection: 'column',
                  overflow: 'hidden',
                  background: surface,
                  border: `1px solid ${border}`,
                  boxShadow: isDark
                    ? `0 0 0 1px rgba(139,92,246,0.07),
                       0 60px 120px rgba(0,0,0,0.75),
                       0 0 120px rgba(124,58,237,0.08)`
                    : `0 60px 120px rgba(80,40,160,0.14),
                       0 0 0 1px rgba(139,92,246,0.08)`,
                  position: 'relative',
                }}
              >
                {/* Animated mesh blobs in the viewer area */}
                <MeshBlobs isDark={isDark} />

                {/* ══ TITLEBAR ══ */}
                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 16px',
                  height: 52,
                  flexShrink: 0,
                  background: chrome,
                  borderBottom: `1px solid ${border}`,
                  backdropFilter: 'blur(12px)',
                  position: 'relative', zIndex: 10,
                  gap: 12,
                }}>

                  {/* LEFT: traffic lights + file identity */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                    {/* Traffic lights */}
                    <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
                      <Dot color="#ff5f57" glow="#ff5f5766" onClick={onClose}  title="Close" />
                      <Dot color="#febc2e" glow="#febc2e55" onClick={null}     title="" />
                      <Dot color="#28c840" glow="#28c84055"
                        onClick={() => setExpanded(v => !v)}
                        title={expanded ? 'Restore' : 'Expand'}
                      />
                    </div>

                    {/* Separator */}
                    <div style={{ width: 1, height: 20, background: border, flexShrink: 0 }} />

                    {/* File identity */}
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      minWidth: 0, overflow: 'hidden',
                    }}>
                      {/* Gradient PDF badge */}
                      <div style={{
                        width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                        background: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 8.5, fontWeight: 900, color: 'white',
                        letterSpacing: '0.06em',
                        boxShadow: '0 4px 12px rgba(124,58,237,0.45)',
                        position: 'relative', overflow: 'hidden',
                      }}>
                        {/* Shimmer on badge */}
                        <motion.div
                          animate={{ x: ['-120%', '200%'] }}
                          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                          style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                          }}
                        />
                        PDF
                      </div>

                      <div style={{ minWidth: 0 }}>
                        <p style={{
                          margin: 0,
                          fontSize: 13, fontWeight: 800,
                          color: titleClr,
                          letterSpacing: '-0.01em',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          {fileName}
                        </p>
                        <p style={{
                          margin: '2px 0 0',
                          fontSize: 10.5, color: subtext,
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          {fileSub}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: action pill group */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    flexShrink: 0,
                    /* Pill group outline */
                    background: isDark ? 'rgba(139,92,246,0.05)' : 'rgba(139,92,246,0.04)',
                    border: `1px solid ${border}`,
                    borderRadius: 999,
                    padding: '3px 4px 3px 8px',
                  }}>
                    {/* Expand/Collapse — icon only */}
                    <motion.button
                      onClick={() => setExpanded(v => !v)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title={expanded ? 'Restore' : 'Expand'}
                      style={{
                        width: 28, height: 28, borderRadius: 999,
                        border: 'none', background: 'transparent',
                        color: subtext, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      {expanded
                        ? <FiMinimize2 size={13} />
                        : <FiMaximize2 size={13} />
                      }
                    </motion.button>

                    {/* Divider */}
                    <div style={{ width: 1, height: 16, background: border }} />

                    {/* Open in new tab */}
                    <PillBtn href={resumeUrl} variant="ghost" isDark={isDark}>
                      <HiArrowTopRightOnSquare size={13} />
                      <span className="hidden sm:inline">Open</span>
                    </PillBtn>

                    {/* Download — primary */}
                    <PillBtn href={resumeUrl} download variant="primary" isDark={isDark}>
                      <HiDownload size={14} />
                      <span className="hidden xs:inline">Download</span>
                    </PillBtn>
                  </div>
                </div>

                {/* ══ PDF VIEWER AREA ══ */}
                <div style={{
                  flex: 1, minHeight: 0,
                  position: 'relative',
                  background: viewerBg,
                  overflow: 'hidden',
                }}>
                  {/* Subtle scanline texture */}
                  <div style={{
                    position: 'absolute', inset: 0, zIndex: 1,
                    pointerEvents: 'none',
                    backgroundImage: `repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 3px,
                      ${isDark ? 'rgba(0,0,0,0.04)' : 'rgba(0,0,0,0.015)'} 3px,
                      ${isDark ? 'rgba(0,0,0,0.04)' : 'rgba(0,0,0,0.015)'} 4px
                    )`,
                  }} />

                  {/* Top inner glow edge */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0,
                    height: 48, zIndex: 2, pointerEvents: 'none',
                    background: `linear-gradient(to bottom, ${
                      isDark ? 'rgba(124,58,237,0.06)' : 'rgba(124,58,237,0.04)'
                    }, transparent)`,
                  }} />

                  {isPdf ? (
                    <>
                      {/* Loading shimmer */}
                      <AnimatePresence>
                        {!loaded && (
                          <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            style={{
                              position: 'absolute', inset: 0, zIndex: 5,
                              display: 'flex', flexDirection: 'column',
                              alignItems: 'center', justifyContent: 'center',
                              gap: 20,
                              background: viewerBg,
                            }}
                          >
                            {/* Pulsing PDF badge */}
                            <motion.div
                              animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 1.6, repeat: Infinity }}
                              style={{
                                width: 56, height: 56, borderRadius: 14,
                                background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 13, fontWeight: 900, color: 'white',
                                letterSpacing: '0.06em',
                                boxShadow: '0 8px 28px rgba(124,58,237,0.4)',
                              }}
                            >
                              PDF
                            </motion.div>

                            {/* Shimmer bar stack */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 200 }}>
                              {[100, 75, 88, 60].map((w, i) => (
                                <motion.div
                                  key={i}
                                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                                  transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.15 }}
                                  style={{
                                    height: 8, borderRadius: 999,
                                    width: `${w}%`,
                                    background: isDark
                                      ? 'rgba(139,92,246,0.2)'
                                      : 'rgba(139,92,246,0.12)',
                                  }}
                                />
                              ))}
                            </div>

                            <p style={{
                              margin: 0, fontSize: 12, fontWeight: 600,
                              color: subtext, letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                            }}>
                              Loading résumé…
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <iframe
                        src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                        title="CV Preview"
                        onLoad={() => setLoaded(true)}
                        style={{
                          position: 'relative', zIndex: 3,
                          width: '100%', height: '100%',
                          border: 'none', display: 'block',
                        }}
                      />
                    </>
                  ) : (
                    /* ── No-PDF fallback ── */
                    <div style={{
                      position: 'relative', zIndex: 3,
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      height: '100%', gap: 20,
                    }}>
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                          width: 72, height: 72, borderRadius: 18,
                          background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 16, fontWeight: 900, color: 'white',
                          letterSpacing: '0.06em',
                          boxShadow: '0 12px 32px rgba(124,58,237,0.4)',
                        }}
                      >
                        PDF
                      </motion.div>
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: titleClr }}>
                          Preview unavailable
                        </p>
                        <p style={{ margin: '6px 0 0', fontSize: 13, color: subtext }}>
                          Use the Download button above to get the file.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* ══ STATUS BAR ══ */}
                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 16px',
                  height: 36,
                  flexShrink: 0,
                  background: chrome,
                  borderTop: `1px solid ${border}`,
                  position: 'relative', zIndex: 10,
                }}>
                  {/* Left: keyboard hint */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <kbd style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      padding: '2px 7px', borderRadius: 6,
                      fontSize: 10, fontFamily: 'monospace', fontWeight: 700,
                      background: isDark ? 'rgba(139,92,246,0.10)' : 'rgba(139,92,246,0.07)',
                      border: `1px solid ${border}`,
                      color: subtext,
                    }}>
                      Esc
                    </kbd>
                    <span style={{ fontSize: 11, color: subtext }} className="hidden sm:inline">
                      to close
                    </span>
                  </div>

                  {/* Center: progress dots (decorative pages indicator) */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}
                    className="hidden sm:flex">
                    {[0,1,2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ opacity: i === 0 ? [0.9,0.5,0.9] : [0.25,0.5,0.25] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                        style={{
                          width: i === 0 ? 16 : 6, height: 4,
                          borderRadius: 999,
                          background: isDark ? 'rgba(167,139,250,0.5)' : 'rgba(124,58,237,0.4)',
                          transition: 'width 0.3s',
                        }}
                      />
                    ))}
                  </div>

                  {/* Right: live indicator */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1], scale: [1, 0.85, 1] }}
                      transition={{ duration: 2.2, repeat: Infinity }}
                      style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: '#28c840',
                        boxShadow: '0 0 6px #28c840bb',
                      }}
                    />
                    <span style={{ fontSize: 11, color: subtext }} className="hidden sm:inline">
                      Updated 2026
                    </span>
                  </div>
                </div>

                {/* Corner close button — always visible shortcut */}
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, background: isDark ? 'rgba(255,95,87,0.2)' : 'rgba(255,95,87,0.12)' }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    position: 'absolute', top: 10, right: 12,
                    width: 28, height: 28, borderRadius: 8,
                    border: 'none', background: 'transparent',
                    color: isDark ? 'rgba(167,139,250,0.35)' : 'rgba(109,40,217,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', zIndex: 20,
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  title="Close"
                  aria-label="Close modal"
                >
                  <HiXMark size={16} />
                </motion.button>

              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CVModal;