import { useEffect, useRef } from "react";

/**
 * ParticleBackground
 * ──────────────────
 * Full-screen fixed canvas with glowing, pulsing, connected particles.
 * NO internal Lenis — scroll velocity is derived from native scroll events
 * so it never conflicts with the app-level useLenis hook.
 *
 * Features:
 *  • 130 glowing particles with radial gradient halo + pulsing core
 *  • Connection lines between nearby particles (constellation web)
 *  • Mouse repulsion — particles push away from the cursor
 *  • Scroll warp — fast scrolling speeds particles up temporarily
 *  • Vignette overlay for depth
 *  • Dark / light theme aware
 */
const ParticleBackground = ({ isDark = true }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    /* ── Canvas size ── */
    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    /* ── Mouse tracking ── */
    const mouse = { x: W / 2, y: H / 2 };
    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    /* ── Scroll velocity (no Lenis needed) ── */
    let scrollVelocity = 0;
    let lastScrollY    = window.scrollY;
    let lastScrollTime = performance.now();

    const onScroll = () => {
      const now   = performance.now();
      const dy    = window.scrollY - lastScrollY;
      const dt    = Math.max(now - lastScrollTime, 1);
      scrollVelocity = dy / dt * 16; // normalise to ~px/frame
      lastScrollY    = window.scrollY;
      lastScrollTime = now;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ── Colour palettes ── */
    const DARK_COLORS  = ["#a78bfa", "#8b5cf6", "#c4b5fd", "#7c3aed", "#e879f9", "#818cf8"];
    const LIGHT_COLORS = ["#7c3aed", "#8b5cf6", "#a855f7", "#6d28d9", "#9333ea", "#6366f1"];

    const rand = (a, b) => Math.random() * (b - a) + a;
    const COUNT = 130;

    /* ── Particle class ── */
    class Particle {
      constructor() { this.reset(true); }

      reset(init = false) {
        this.x     = rand(0, W);
        this.y     = init ? rand(0, H) : rand(-20, -5);
        this.vx    = rand(-0.25, 0.25);
        this.vy    = rand(0.15, 0.55);
        this.size  = rand(1.5, 4);
        this.alpha = rand(0.3, 0.9);
        this.pulse = rand(0, Math.PI * 2);
        this.speed = rand(0.4, 1.1);
        const pal  = isDark ? DARK_COLORS : LIGHT_COLORS;
        this.color = pal[Math.floor(Math.random() * pal.length)];
      }

      update(scrollV) {
        this.pulse += 0.025;
        const warp = 1 + Math.min(Math.abs(scrollV) * 0.12, 3);

        this.x += this.vx * this.speed * warp;
        this.y += this.vy * this.speed * warp;

        /* Mouse repulsion */
        const dx   = this.x - mouse.x;
        const dy   = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 110 && dist > 0) {
          const force = (110 - dist) / 110;
          this.x += (dx / dist) * force * 2.2;
          this.y += (dy / dist) * force * 2.2;
        }

        /* Recycle off-screen */
        if (this.y > H + 12 || this.x < -25 || this.x > W + 25) {
          this.reset();
        }
      }

      draw() {
        const pulse = 0.65 + Math.sin(this.pulse) * 0.35;
        const a     = this.alpha * pulse;
        const s     = this.size * (0.82 + Math.sin(this.pulse * 0.7) * 0.18);
        const hex   = (v) => Math.round(Math.min(v, 1) * 255).toString(16).padStart(2, "0");

        /* Outer glow halo */
        const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, s * 5);
        glow.addColorStop(0,   this.color + hex(a));
        glow.addColorStop(0.4, this.color + hex(a * 0.3));
        glow.addColorStop(1,   this.color + "00");

        ctx.beginPath();
        ctx.arc(this.x, this.y, s * 5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        /* Solid core */
        ctx.beginPath();
        ctx.arc(this.x, this.y, s, 0, Math.PI * 2);
        ctx.fillStyle = this.color + hex(Math.min(a * 1.5, 1));
        ctx.fill();
      }
    }

    /* ── Create particles ── */
    const particles = Array.from({ length: COUNT }, () => new Particle());

    /* ── Connection lines ── */
    const MAX_DIST  = 115;
    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < MAX_DIST) {
            const a = (1 - dist / MAX_DIST) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(167,139,250,${a})`
              : `rgba(109,40,217,${a})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
    };

    /* ── Render loop ── */
    let rafId;

    const tick = () => {
      ctx.clearRect(0, 0, W, H);

      /* Vignette */
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.95);
      vig.addColorStop(0, "transparent");
      vig.addColorStop(1, isDark ? "rgba(13,13,26,0.4)" : "rgba(240,235,255,0.35)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      /* Update + draw */
      particles.forEach((p) => p.update(scrollVelocity));
      particles.forEach((p) => p.draw());

      /* Decay scroll velocity each frame */
      scrollVelocity *= 0.9;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize",      onResize);
      window.removeEventListener("mousemove",   onMouseMove);
      window.removeEventListener("scroll",      onScroll);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      "fixed",
        inset:          0,
        zIndex:         0,
        pointerEvents: "none",
        width:         "100%",
        height:        "100%",
        display:       "block",
      }}
    />
  );
};

export default ParticleBackground;