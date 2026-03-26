import { useLayoutEffect, useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';
import { FaExternalLinkAlt, FaMedal, FaCheckCircle } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';
import CVModal from './CVModal';

gsap.registerPlugin(ScrollTrigger);

/* ─── Certifications data ─────────────────────────────────────────────────────
   Map to the actual PDF files in public/MyCertificates                        */
const certifications = [
  {
    id: 1,
    title: 'Data Structures & Algorithms',
    issuer: 'LPU-NeoColab',
    date: 'DEC-2024',
    credentialId: 'DSA-2023',
    skills: ['C++', 'Algorithms', 'Data Structures', 'Problem Solving'],
    credentialUrl: '/MyCertificates/DSA.pdf',
    color: { from: '#7c3aed', to: '#a855f7' },
    badge: '🧩',
    num: '01',
  },
  {
    id: 2,
    title: 'Programming in Java',
    issuer: 'LPU-NeoColab',
    date: 'MAY-2025',
    credentialId: 'JAVA-NPTEL-2023',
    skills: ['Java', 'OOP', 'Collections', 'Multithreading'],
    credentialUrl: '/MyCertificates/Java Certificate.pdf',
    color: { from: '#6d28d9', to: '#c4b5fd' },
    badge: '☕',
    num: '02',
  },
  {
    id: 3,
    title: 'Object Oriented Programming',
    issuer: 'NPTEL',
    date: '2023',
    credentialId: 'OOP-NPTEL-2023',
    skills: ['C++', 'Abstraction', 'Inheritance', 'Polymorphism'],
    credentialUrl: '/MyCertificates/OOP Certificate.pdf',
    color: { from: '#5b21b6', to: '#a855f7' },
    badge: '📦',
    num: '03',
  },
  {
    id: 4,
    title: 'Problem Solving through Programming in C',
    issuer: 'NPTEL',
    date: '2022',
    credentialId: 'C-PROG-2022',
    skills: ['C', 'Pointers', 'Memory Management', 'Logic'],
    credentialUrl: '/MyCertificates/C Programming.pdf',
    color: { from: '#8b5cf6', to: '#fbbf24' },
    badge: '⚙️',
    num: '04',
  },
  {
    id: 5,
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: '2023',
    credentialId: 'FCC-RWD-2023',
    skills: ['HTML5', 'CSS3', 'Flexbox', 'Grid'],
    credentialUrl: '/MyCertificates/Responsive Web Design.pdf',
    color: { from: '#7c3aed', to: '#818cf8' },
    badge: '📱',
    num: '05',
  },
  {
    id: 6,
    title: 'Hackathon Winner - 1st Position',
    issuer: 'University Hackathon',
    date: '2023',
    credentialId: 'HACK-WIN-23',
    skills: ['Rapid Prototyping', 'Teamwork', 'Innovation', 'Pitching'],
    credentialUrl: '/MyCertificates/hackathon-winner-certificate.pdf',
    color: { from: '#fbbf24', to: '#f59e0b' },
    badge: '🏆',
    num: '06',
  },
  {
    id: 7,
    title: 'Hackathon Participation',
    issuer: 'Tech Fest (Sem 1)',
    date: '2022',
    credentialId: 'HACK-SEM1-22',
    skills: ['Brainstorming', 'Coding Under Pressure', 'Collaboration'],
    credentialUrl: '/MyCertificates/sem1_hackathon.pdf',
    color: { from: '#6d28d9', to: '#a78bfa' },
    badge: '💻',
    num: '07',
  },
  {
    id: 8,
    title: 'Designing Human-Centered Technology',
    issuer: 'NPTEL',
    date: '2024',
    credentialId: 'HCI-NPTEL-2024',
    skills: ['HCI', 'UX Research', 'Prototyping', 'User Testing'],
    credentialUrl: '/MyCertificates/DHCINptelMooc.pdf',
    color: { from: '#a21caf', to: '#e879f9' },
    badge: '👥',
    num: '08',
  },
  {
    id: 9,
    title: 'Summer Training Program',
    issuer: 'Technical Institute',
    date: '2023',
    credentialId: 'ST-2023',
    skills: ['Web Dev', 'Practical Application', 'Project Building'],
    credentialUrl: '/MyCertificates/Satish_Raut_12301144_SummerTraining.pdf',
    color: { from: '#1d4ed8', to: '#60a5fa' },
    badge: '☀️',
    num: '09',
  },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/* ══════════════════════════════════════════════════════════════════════════════
   CERT CARD — content rendered inside each stacked card
══════════════════════════════════════════════════════════════════════════════ */
const CertCard = ({ cert, isDark, onViewCert }) => (
  <div
    style={{
      width: '100%', height: '100%',
      borderRadius: 18,
      padding: '2rem 2rem 1.6rem',
      display: 'flex', flexDirection: 'column', gap: '0.9rem',
      position: 'relative', overflow: 'hidden',
      background: isDark
        ? 'linear-gradient(145deg, #1a0d3a 0%, #0f0a22 100%)'
        : 'linear-gradient(145deg, #ffffff 0%, #f5f0ff 100%)',
      border: `1.5px solid ${isDark ? 'rgba(139,92,246,0.22)' : 'rgba(124,58,237,0.15)'}`,
    }}
  >
    {/* Top accent gradient bar */}
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 4,
      background: `linear-gradient(90deg, ${cert.color.from}, ${cert.color.to})`,
      borderRadius: '18px 18px 0 0',
    }} />

    {/* Large ghost number — exactly like the Lenis site */}
    <div style={{
      position: 'absolute', top: -16, left: 16,
      fontSize: 'clamp(5rem, 13vw, 9rem)',
      fontWeight: 900,
      lineHeight: 1,
      color: cert.color.from,
      opacity: isDark ? 0.11 : 0.07,
      fontFamily: 'monospace',
      userSelect: 'none',
      pointerEvents: 'none',
      letterSpacing: '-0.04em',
    }}>
      {cert.num}
    </div>

    {/* Header row */}
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', position: 'relative', zIndex: 1 }}>
      <div style={{
        width: 56, height: 56, borderRadius: 14, flexShrink: 0,
        background: `linear-gradient(135deg, ${cert.color.from}22, ${cert.color.to}18)`,
        border: `1.5px solid ${cert.color.from}35`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 26, boxShadow: `0 4px 14px ${cert.color.from}20`,
      }}>
        {cert.badge}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{
          margin: 0,
          fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
          fontWeight: 800, lineHeight: 1.3,
          color: isDark ? '#f0eeff' : '#18111a',
        }}>
          {cert.title}
        </h3>
        <p style={{
          margin: '5px 0 0', fontSize: 12, fontWeight: 600,
          color: cert.color.from,
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <HiAcademicCap /> {cert.issuer}
        </p>
      </div>

      <FaCheckCircle style={{
        fontSize: 19, color: cert.color.from,
        opacity: 0.9, flexShrink: 0, marginTop: 4,
      }} />
    </div>

    {/* Divider */}
    <div style={{
      height: 1,
      background: isDark ? 'rgba(139,92,246,0.14)' : 'rgba(124,58,237,0.10)',
      position: 'relative', zIndex: 1,
    }} />

    {/* Skill tags */}
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, position: 'relative', zIndex: 1 }}>
      {cert.skills.map(skill => (
        <span key={skill} style={{
          fontSize: 11, fontWeight: 700,
          padding: '3px 11px', borderRadius: 999,
          background: `${cert.color.from}14`,
          border: `1px solid ${cert.color.from}32`,
          color: cert.color.from,
        }}>
          {skill}
        </span>
      ))}
    </div>

    {/* Footer */}
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      marginTop: 'auto', position: 'relative', zIndex: 1,
      paddingTop: '0.7rem',
      borderTop: `1px solid ${isDark ? 'rgba(139,92,246,0.10)' : 'rgba(124,58,237,0.08)'}`,
    }}>
      <div>
        <p style={{
          margin: 0, fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: isDark ? 'rgba(167,139,250,0.48)' : 'rgba(109,40,217,0.38)',
        }}>Issued</p>
        <p style={{
          margin: '2px 0 0', fontSize: 14, fontWeight: 800,
          color: isDark ? '#c4b5fd' : '#6d28d9',
        }}>{cert.date}</p>
      </div>

      <button
        onClick={() => onViewCert(cert)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer',
          padding: '8px 16px', borderRadius: 10,
          background: `linear-gradient(135deg, ${cert.color.from}, ${cert.color.to})`,
          color: 'white',
          boxShadow: `0 4px 14px ${cert.color.from}45`,
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = `0 8px 22px ${cert.color.from}55`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = `0 4px 14px ${cert.color.from}45`;
        }}
      >
        <FaMedal style={{ fontSize: 11 }} />
        View Certificate
        <FaExternalLinkAlt style={{ fontSize: 9 }} />
      </button>
    </div>

    <p style={{
      margin: 0, fontSize: 10, fontWeight: 600, fontFamily: 'monospace',
      letterSpacing: '0.06em',
      color: isDark ? 'rgba(139,92,246,0.32)' : 'rgba(124,58,237,0.28)',
      position: 'relative', zIndex: 1,
    }}>
      ID: {cert.credentialId}
    </p>
  </div>
);

/* ══════════════════════════════════════════════════════════════════════════════
   TRUE LENIS STACKED DECK
   Cards fly in from bottom-right one-by-one and land in a stacked pile.
   Fixes: CSS opacity:0 prevents flash, window scroller, overflow:hidden on stage.
══════════════════════════════════════════════════════════════════════════════ */
const StackedDeck = ({ isDark, onViewCert }) => {
  const wrapperRef = useRef(null);
  const stickyRef  = useRef(null);

  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const sticky  = stickyRef.current;
    if (!wrapper || !sticky) return;

    const cards = Array.from(sticky.querySelectorAll('.deck-card'));
    const N = cards.length;

    // Each card's resting position in the stack
    // On mobile, cards fan out slightly with a tilt but come from the bottom
    const LAYER_X = isMobile ? 8 : 22;      // Less offset so it doesn't push off-screen
    const LAYER_Y = isMobile ? -14 : -16;   // Tighter stack vertically
    const LAYER_R = isMobile ? 2.5 : 3;     // Maintain the tilt for the 'fan' effect

    const restPos = cards.map((_, i) => {
      const depth = N - 1 - i; // card 0 = back (depth N-1), card N-1 = front (depth 0)
      return {
        x:      depth * LAYER_X,
        y:      depth * LAYER_Y,
        rotate: depth * -LAYER_R,
        scale:  1 - depth * 0.02,
        opacity: 1,
      };
    });

    // Override CSS opacity:0 and set off-screen position
    // If mobile, come straight up from the bottom (x: 0, y: 120vh). If desktop, from bottom-right.
    const startX = isMobile ? '0vw' : '110vw';
    const startY = isMobile ? '120vh' : '75vh';
    const startR = isMobile ? -5 : 15;     // Slight spin entry on mobile from bottom
    
    gsap.set(cards, { x: startX, y: startY, rotate: startR, opacity: 0, scale: 0.85 });

    const rafId = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {

        const tl = gsap.timeline({
          scrollTrigger: {
            scroller:            window,
            trigger:             wrapper,
            start:               'top top',
            end:                 () => `+=${wrapper.clientHeight - window.innerHeight}`,
            scrub:               1.4,
            pin:                 sticky,
            pinSpacing:          false,
            anticipatePin:       1,
            invalidateOnRefresh: true,
          },
        });

        // card 0 (back of pile) arrives first → last card (front) arrives last
        cards.forEach((card, i) => {
          const p = restPos[i];
          tl.to(
            card,
            {
              x: p.x, y: p.y,
              rotate:  p.rotate,
              opacity: 1,
              scale:   p.scale,
              duration: 1,
              ease: 'power3.out',
            },
            i * 0.25
          );
        });

      }, wrapper);

      ScrollTrigger.refresh();
      wrapper._gsapCtx = ctx;
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (wrapperRef.current?._gsapCtx) wrapperRef.current._gsapCtx.revert();
      ScrollTrigger.refresh();
    };
  }, [isDark, isMobile]);

  // Wrapper height = 100vh (pinned) + extra scroll per card
  // Reduced multiplier from 58 to 36 to remove the large blank scroll gap at the end
  const wrapperH = `${100 + certifications.length * 36}vh`;

  // Responsive card size
  const CW = isMobile ? 'min(92vw, 360px)' : 'clamp(340px, 46vw, 480px)';
  const CH = isMobile ? 'min(62vh, 420px)' : 'clamp(300px, 42vh, 360px)';

  // Nudge the anchor left so the rightward stack offsets look centred
  // For mobile, LAYER_X is 8, so total width shift is 8*(N-1). Half of that is 4*(N-1).
  const anchorNudge = isMobile ? -((certifications.length - 1) * 4) : -((certifications.length - 1) * 11);

  // ── Mouse-follow glow ────────────────────────────────────────────────────
  const glowRef = useRef(null);
  useEffect(() => {
    const stage = stickyRef.current;
    if (!stage) return;
    const onMove = (e) => {
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (glowRef.current) {
        glowRef.current.style.left = `${x}px`;
        glowRef.current.style.top  = `${y}px`;
      }
    };
    stage.addEventListener('mousemove', onMove);
    return () => stage.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{ height: wrapperH, position: 'relative' }}
    >
      {/* Pinned 100vh stage */}
      <div
        ref={stickyRef}
        style={{
          height: '100vh', position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}
      >

        {/* ── BACKGROUND LAYER ──────────────────────────────────────── */}

        {/* Large morphing blobs */}
        {[
          { color: isDark ? '#7c3aed' : '#a78bfa', size: 520, top: '5%',  left: '-8%',  dur: 14, delay: 0    },
          { color: isDark ? '#a21caf' : '#c084fc', size: 380, top: '-10%',right: '-5%', dur: 18, delay: 2    },
          { color: isDark ? '#1d4ed8' : '#818cf8', size: 300, top: '60%', left: '10%',  dur: 16, delay: 4    },
          { color: isDark ? '#6d28d9' : '#ddd6fe', size: 260, top: '30%', right: '5%',  dur: 20, delay: 1.5  },
        ].map((b, i) => (
          <motion.div
            key={i}
            aria-hidden
            animate={{
              x:      [0, 30, -20, 15, 0],
              y:      [0, -25, 20, -10, 0],
              scale:  [1, 1.08, 0.95, 1.05, 1],
              borderRadius: ['40% 60% 70% 30%/40% 50% 60% 50%', '60% 40% 30% 70%/60% 30% 70% 40%', '40% 60% 70% 30%/40% 50% 60% 50%'],
            }}
            transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
            style={{
              position: 'absolute',
              top: b.top, left: b.left, right: b.right,
              width: b.size, height: b.size,
              background: `radial-gradient(circle at 40% 40%, ${b.color}${isDark ? '28' : '20'}, transparent 70%)`,
              filter: 'blur(48px)',
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Ghibli-inspired SVG texture */}
        <svg
          aria-hidden
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            pointerEvents: 'none',
          }}
        >
          <defs>
            {/* Grass blade sway */}
            <style>{`
              @keyframes sway { 0%,100%{transform-origin:bottom center;transform:rotate(-4deg)}50%{transform-origin:bottom center;transform:rotate(4deg)} }
              @keyframes sway2{ 0%,100%{transform-origin:bottom center;transform:rotate(3deg)} 50%{transform-origin:bottom center;transform:rotate(-5deg)} }
              @keyframes twinkle{ 0%,100%{opacity:.9;r:2.5} 50%{opacity:.2;r:1.2} }
              @keyframes twinkle2{ 0%,100%{opacity:.4;r:1.8} 50%{opacity:1;r:3} }
              @keyframes cloudDrift{ 0%{transform:translateX(0)} 100%{transform:translateX(18px)} }
              @keyframes moonGlow{ 0%,100%{filter:drop-shadow(0 0 8px #c084fc88)} 50%{filter:drop-shadow(0 0 18px #a855f7cc)} }
            `}</style>

            {/* Hill gradient fills */}
            <linearGradient id="hill1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDark ? '#4c1d95' : '#ddd6fe'} stopOpacity={isDark ? 0.55 : 0.7} />
              <stop offset="100%" stopColor={isDark ? '#2e1065' : '#c4b5fd'} stopOpacity={isDark ? 0.3 : 0.5} />
            </linearGradient>
            <linearGradient id="hill2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDark ? '#5b21b6' : '#ede9fe'} stopOpacity={isDark ? 0.45 : 0.6} />
              <stop offset="100%" stopColor={isDark ? '#3b0764' : '#ddd6fe'} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hill3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDark ? '#7c3aed' : '#f5f3ff'} stopOpacity={isDark ? 0.35 : 0.5} />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* ── Rolling hills ── */}
          {/* Back hill */}
          <path
            d="M0 680 Q180 560 360 620 Q540 680 720 590 Q900 500 1080 580 Q1260 660 1440 600 L1440 900 L0 900 Z"
            fill="url(#hill3)" />
          {/* Mid hill */}
          <path
            d="M0 740 Q200 650 400 700 Q600 750 800 670 Q1000 590 1200 690 Q1350 740 1440 700 L1440 900 L0 900 Z"
            fill="url(#hill2)" />
          {/* Front hill */}
          <path
            d="M0 820 Q160 780 300 800 Q480 820 640 780 Q800 740 960 790 Q1120 840 1280 800 Q1380 780 1440 810 L1440 900 L0 900 Z"
            fill="url(#hill1)" />

          {/* ── Grass blades (front hill) ── */}
          {[60,110,170,230,290,360,430,510,590,660,740,820,900,970,1040,1120,1190,1260,1340,1410].map((x, i) => (
            <g key={x} style={{ animation: `${i % 2 === 0 ? 'sway' : 'sway2'} ${1.8 + (i % 5) * 0.4}s ease-in-out infinite`, animationDelay: `${(i * 0.17) % 1.5}s` }}>
              <path
                d={`M${x} 830 Q${x - 5} ${800 + (i % 3) * 8} ${x - 10} ${775 + (i % 4) * 10}`}
                stroke={isDark ? '#a78bfa' : '#7c3aed'}
                strokeWidth={1.2 + (i % 3) * 0.4}
                strokeOpacity={isDark ? 0.45 : 0.35}
                fill="none"
                strokeLinecap="round"
              />
              <path
                d={`M${x} 830 Q${x + 4} ${805 + (i % 4) * 6} ${x + 8} ${782 + (i % 3) * 9}`}
                stroke={isDark ? '#c084fc' : '#8b5cf6'}
                strokeWidth={1 + (i % 2) * 0.5}
                strokeOpacity={isDark ? 0.3 : 0.25}
                fill="none"
                strokeLinecap="round"
              />
            </g>
          ))}

          {/* ── Sparkle stars ── */}
          {[
            {cx:120, cy:80,  r:2.5, dur:'3.1s', anim:'twinkle' },
            {cx:340, cy:140, r:2,   dur:'2.4s', anim:'twinkle2'},
            {cx:580, cy:60,  r:3,   dur:'4.0s', anim:'twinkle' },
            {cx:780, cy:110, r:1.8, dur:'2.8s', anim:'twinkle2'},
            {cx:960, cy:50,  r:2.2, dur:'3.5s', anim:'twinkle' },
            {cx:1160,cy:130, r:2.8, dur:'2.2s', anim:'twinkle2'},
            {cx:1350,cy:80,  r:2,   dur:'3.8s', anim:'twinkle' },
            {cx:200, cy:200, r:1.5, dur:'4.2s', anim:'twinkle2'},
            {cx:500, cy:170, r:2.4, dur:'2.6s', anim:'twinkle' },
            {cx:1050,cy:190, r:1.8, dur:'3.3s', anim:'twinkle2'},
            {cx:1280,cy:210, r:2.1, dur:'2.9s', anim:'twinkle' },
            {cx:70,  cy:300, r:1.6, dur:'4.5s', anim:'twinkle2'},
          ].map((s, i) => (
            <circle
              key={i}
              cx={s.cx} cy={s.cy} r={s.r}
              fill={isDark ? '#e9d5ff' : '#7c3aed'}
              fillOpacity={0.9}
              style={{ animation: `${s.anim} ${s.dur} ease-in-out infinite` }}
            />
          ))}

          {/* ✦ Four-pointed star accents */}
          {[[420,90],[850,55],[1230,95],[300,250],[1100,240]].map(([x, y], i) => (
            <text key={i} x={x} y={y}
              fontSize={10 + (i % 3) * 4}
              fill={isDark ? '#c084fc' : '#8b5cf6'}
              fillOpacity={isDark ? 0.55 : 0.45}
              textAnchor="middle"
              style={{ userSelect: 'none', animation: `twinkle ${2.5 + i * 0.6}s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }}
            >✦</text>
          ))}

          {/* ── Wispy clouds ── */}
          {[
            { x: 80,  y: 180, scale: 1,    delay: '0s'   },
            { x: 620, y: 130, scale: 0.75, delay: '1.2s' },
            { x: 1100,y: 160, scale: 0.9,  delay: '0.6s' },
            { x: 350, y: 260, scale: 0.6,  delay: '1.9s' },
          ].map((c, i) => (
            <g key={i} transform={`translate(${c.x},${c.y}) scale(${c.scale})`}
              style={{ animation: `cloudDrift ${8 + i * 2}s ease-in-out infinite alternate`, animationDelay: c.delay }}>
              <ellipse cx="60" cy="20" rx="52" ry="18"
                fill={isDark ? '#4c1d95' : '#ede9fe'} fillOpacity={isDark ? 0.28 : 0.55} />
              <ellipse cx="32" cy="22" rx="32" ry="14"
                fill={isDark ? '#5b21b6' : '#f5f3ff'} fillOpacity={isDark ? 0.22 : 0.5} />
              <ellipse cx="88" cy="22" rx="28" ry="12"
                fill={isDark ? '#5b21b6' : '#f5f3ff'} fillOpacity={isDark ? 0.22 : 0.5} />
            </g>
          ))}

          {/* ── Crescent moon ── */}
          <g transform="translate(1340, 90)" style={{ animation: 'moonGlow 4s ease-in-out infinite' }}>
            <circle cx="0" cy="0" r="28"
              fill={isDark ? '#4c1d95' : '#ede9fe'} fillOpacity={isDark ? 0.6 : 0.5} />
            <circle cx="10" cy="-6" r="22"
              fill={isDark ? '#0f0b24' : '#f7f3ff'} />
          </g>

          {/* ── Distant tiny flying specks (like soot sprites / fireflies) ── */}
          {[[200,320],[480,280],[700,350],[1000,300],[1300,270],[900,410],[150,410],[1200,380]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={1.4}
              fill={isDark ? '#f0abfc' : '#7c3aed'}
              fillOpacity={0}
              style={{
                animation: `twinkle ${2 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </svg>

        {/* Floating orb particles */}
        {[
          { size: 10, top: '15%', left: '12%',  delay: 0,   dur: 4.2 },
          { size:  7, top: '70%', left: '22%',  delay: 0.8, dur: 5.5 },
          { size: 12, top: '80%', left: '72%',  delay: 1.5, dur: 3.8 },
          { size:  6, top: '25%', left: '80%',  delay: 2.1, dur: 6.0 },
          { size:  9, top: '50%', left: '90%',  delay: 0.3, dur: 4.9 },
          { size:  5, top: '88%', left: '48%',  delay: 1.9, dur: 5.2 },
          { size: 14, top: '10%', left: '55%',  delay: 0.6, dur: 7.0 },
          { size:  8, top: '40%', left: '5%',   delay: 2.5, dur: 4.6 },
        ].map((p, i) => (
          <motion.div
            key={i} aria-hidden
            animate={{ y: [0, -18, 0], opacity: [0.5, 1, 0.5], scale: [1, 1.25, 1] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
            style={{
              position: 'absolute',
              top: p.top, left: p.left,
              width: p.size, height: p.size,
              borderRadius: '50%',
              background: isDark
                ? `radial-gradient(circle, #c084fc, #7c3aed)`
                : `radial-gradient(circle, #7c3aed, #a855f7)`,
              boxShadow: isDark
                ? `0 0 ${p.size * 2}px #a78bfa88`
                : `0 0 ${p.size * 2}px #7c3aed55`,
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Horizontal shimmer lines */}
        {[15, 42, 68, 85].map((pct, i) => (
          <motion.div
            key={i} aria-hidden
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'linear', delay: i * 1.5 }}
            style={{
              position: 'absolute',
              top: `${pct}%`, left: 0,
              width: '30%', height: 1,
              background: isDark
                ? 'linear-gradient(90deg, transparent, rgba(167,139,250,0.35), transparent)'
                : 'linear-gradient(90deg, transparent, rgba(124,58,237,0.25), transparent)',
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Mouse-follow spotlight glow */}
        <div
          ref={glowRef}
          aria-hidden
          style={{
            position: 'absolute',
            width: 340, height: 340,
            borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            transition: 'left 0.08s linear, top 0.08s linear',
            zIndex: 0,
          }}
        />

        {/* ── CARD STACK (above bg) ─────────────────────────────────── */}
        <div style={{
          position: 'relative', zIndex: 10,
          width: CW, height: CH,
          flexShrink: 0,
          marginLeft: `${anchorNudge}px`,
        }}>
          {certifications.map((cert, i) => (
            <div
              key={cert.id}
              className="deck-card"
              style={{
                position: 'absolute', top: 0, left: 0,
                width: CW, height: CH,
                borderRadius: 18,
                zIndex: i,
                opacity: 0,
                boxShadow: isDark
                  ? '0 20px 56px rgba(0,0,0,0.65), 0 2px 10px rgba(124,58,237,0.2)'
                  : '0 14px 40px rgba(124,58,237,0.18), 0 2px 8px rgba(0,0,0,0.08)',
                willChange: 'transform, opacity',
              }}
            >
              <CertCard cert={cert} isDark={isDark} onViewCert={onViewCert} />
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <motion.div
          animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', bottom: 24, left: '50%', zIndex: 20,
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            fontSize: 9, fontWeight: 700, letterSpacing: '0.22em',
            textTransform: 'uppercase', pointerEvents: 'none',
            color: isDark ? 'rgba(139,92,246,0.55)' : 'rgba(124,58,237,0.5)',
          }}
        >
          scroll down
          <span style={{ fontSize: 13, lineHeight: 1 }}>↓</span>
        </motion.div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
   CERTIFICATIONS — exported section
══════════════════════════════════════════════════════════════════════════════ */
const Certifications = () => {
  const headingRef    = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });
  const { theme }     = useTheme();
  const isDark        = theme === 'dark';

  // Modal State
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section
      id="certifications"
      className={`relative transition-colors duration-300 ${isDark ? 'bg-[#0f0b24]' : 'bg-[#f7f3ff]'}`}
      style={{ overflow: 'hidden' }}   /* prevent card bleed into adjacent sections */
    >
      {/* Ambient orbs */}
      <div aria-hidden style={{
        position: 'absolute', top: '6%', right: '-5%',
        width: 400, height: 400, borderRadius: '50%', pointerEvents: 'none',
        background: isDark
          ? 'radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
      }} />
      <div aria-hidden style={{
        position: 'absolute', bottom: '8%', left: '-5%',
        width: 320, height: 320, borderRadius: '50%', pointerEvents: 'none',
        background: isDark
          ? 'radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)',
      }} />

      {/* ── Heading ── */}
      <div className="page-container" style={{ paddingTop: '2.5rem', paddingBottom: '0.25rem' }}>
        <motion.div
          ref={headingRef}
          variants={fadeUp} initial="hidden"
          animate={headingInView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto' }}
        >
          <p style={{
            fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em',
            fontWeight: 700, color: 'var(--muted)', marginBottom: 12,
          }}>
            Proof of learning
          </p>

          <h2
            className={`font-black ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', lineHeight: 1.1 }}
          >
            My <span className="gradient-text">Certifications</span>
          </h2>

          <div style={{
            width: 64, height: 4, borderRadius: 999,
            background: 'linear-gradient(90deg, #7c3aed, #a855f7)',
            margin: '1rem auto 0',
          }} />

          <p style={{
            marginTop: '1rem', fontSize: 14, lineHeight: 1.65,
            color: isDark ? 'rgba(156,163,175,0.8)' : 'rgba(107,114,128,0.9)',
          }}>
            Scroll to deal the deck — each card a milestone earned.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.25rem' }}>
            <span style={{
              fontSize: 11, fontWeight: 700, padding: '4px 16px', borderRadius: 999,
              background: '#7c3aed15', border: '1px solid #7c3aed35',
              color: '#7c3aed', letterSpacing: '0.06em',
            }}>
              {certifications.length} Certificates
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── The stacked card deck animation ── */}
      <StackedDeck isDark={isDark} onViewCert={setSelectedCert} />

      {/* ── View Certificate Modal ── */}
      <CVModal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        resumeUrl={selectedCert?.credentialUrl}
        fileName={selectedCert ? `${selectedCert.title}.pdf` : ''}
        fileSub={selectedCert ? `${selectedCert.issuer} · ${selectedCert.date}` : ''}
      />
    </section>
  );
};

export default Certifications;