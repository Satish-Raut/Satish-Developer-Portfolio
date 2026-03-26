import { createContext, useContext, useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

const ThemeContext = createContext();

const globalTransitionCss = `
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-old(root) {
  z-index: 1;
}
::view-transition-new(root) {
  z-index: 2;
}
`;

/* ══════════════════════════════════════════════════════════
   THEME DROP ANIMATION COMPONENT
══════════════════════════════════════════════════════════ */
const ThemeDropAnimation = ({ x, y, nextTheme, onMidpoint, onComplete }) => {
  const controls = useAnimation();
  const isDark = nextTheme === "dark";
  const dropColor = isDark ? "#0d0d1a" : "#faf8ff";

  useEffect(() => {
    let active = true;
    const sequence = async () => {
      // 1. Drop down purely vertically from the button in slow-motion
      await controls.start({
        y: window.innerHeight - 50, // Drop directly to the bottom edge
        transition: { duration: 1.1, ease: "easeIn" } // Slow-motion trajectory
      });
      if (!active) return;

      const finalX = x;
      const finalY = window.innerHeight - 40; // Approx center of 20px dot at the bottom

      // Hide the physical dummy dot before the real view transition starts
      controls.set({ opacity: 0 });

      // 2. The True "Smooth Open" mask using the browser View Transitions API
      if (typeof document.startViewTransition === "function") {
        const transition = document.startViewTransition(() => {
          if (active) onMidpoint(); // Swaps the DOM underneath
        });

        transition.ready.then(() => {
          const maxRadius = Math.hypot(
             Math.max(finalX, window.innerWidth - finalX),
             Math.max(finalY, window.innerHeight - finalY)
          );
          
          document.documentElement.animate(
            {
              clipPath: [
                `circle(10px at ${finalX}px ${finalY}px)`,
                `circle(${maxRadius}px at ${finalX}px ${finalY}px)`
              ]
            },
            {
              duration: 850,
              easing: "ease-in-out",
              pseudoElement: "::view-transition-new(root)"
            }
          );
        });

        if (active) await transition.finished;
      } else {
        // Fallback for browsers without View Transitions (e.g. Safari 16, very old Firefox)
        if (active) onMidpoint();
      }

      if (!active) return;
      onComplete();
    };
    
    sequence();
    return () => { active = false; };
  }, [controls, onMidpoint, onComplete, x]);

  return (
    <motion.div
      initial={{ 
        x: x - 10, // Center 20px dot exactly on click point
        y: y - 10, 
        scale: 1, 
        opacity: 1,
        borderRadius: "50%",
      }}
      animate={controls}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: 20, height: 20, // Smaller dot size
        background: dropColor,
        boxShadow: isDark 
          ? '0 0 24px 8px rgba(124,58,237,0.65)' 
          : '0 0 24px 8px rgba(168,85,247,0.55)',
        zIndex: 999999, // Ensure it sits physically on top of EVERYTHING
        pointerEvents: 'none'
      }}
    />
  );
};

/* ══════════════════════════════════════════════════════════
   THEME PROVIDER
══════════════════════════════════════════════════════════ */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("portfolio-theme") || "light"
  );
  
  const [animating, setAnimating] = useState(false);
  const [animData, setAnimData] = useState({ x: 0, y: 0, nextTheme: 'dark' });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = (e) => {
    if (animating) return; // Prevent double trigger
    
    // Default fallback starting point (top rightish)
    let x = window.innerWidth - 80;
    let y = 80;
    
    // Intelligently extract exact coordinate position of whatever button the user clicked
    if (e && e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    } else if (e && e.clientX) {
      x = e.clientX;
      y = e.clientY;
    }
    
    const nextTheme = theme === "light" ? "dark" : "light";
    setAnimData({ x, y, nextTheme });
    setAnimating(true); // Engages the overlay portal!
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <style>{globalTransitionCss}</style>
      {children}
      
      {/* ── Mounts globally on top of the App when theme shifts ── */}
      <AnimatePresence>
        {animating && (
          <ThemeDropAnimation
            x={animData.x}
            y={animData.y}
            nextTheme={animData.nextTheme}
            onMidpoint={() => setTheme(animData.nextTheme)}
            onComplete={() => setAnimating(false)}
          />
        )}
      </AnimatePresence>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
