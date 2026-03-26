import { useState, useEffect } from "react";
import { navLinks, personal } from "../data/portfolio";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { BsSun, BsMoon } from "react-icons/bs";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = theme === "dark";

  const handleScroll = (e) => {
    e.preventDefault();
    setMenuOpen(false); // Close mobile menu if open
    const href = e.currentTarget.getAttribute("href");
    const targetId = href.replace(/.*\#/, "");
    const elem = document.getElementById(targetId);
    
    if (elem) {
      // Allow the layout shift to compute before scrolling
      setTimeout(() => {
        const offset = isMobile ? 60 : 80; // Compensate for sticky navbar height
        const bodyPosition = document.body.getBoundingClientRect().top;
        const elemPosition = elem.getBoundingClientRect().top;
        const scrollTarget = elemPosition - bodyPosition - offset;
        
        window.scrollTo({ top: scrollTarget, behavior: "smooth" });
      }, 50);
    }
  };

  /* ── Theme Toggle Button ── */
  const ThemeToggle = ({ mobile = false }) => (
    <motion.button
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.1 }}
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex items-center justify-center rounded-xl border-2 transition-all duration-300
        ${mobile ? "w-10 h-10" : "w-9 h-9"}
        ${isDark
          ? "border-purple-500 bg-purple-900/40 text-yellow-300 hover:bg-purple-800/60"
          : "border-purple-300 bg-white text-purple-700 hover:bg-purple-50 shadow-sm"
        }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.25 }}
          className="text-lg leading-none flex items-center justify-center"
        >
          {isDark ? <BsSun size={18} /> : <BsMoon size={17} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );

  return (
    <>
      {/* ───── DESKTOP NAV — animated pill ───── */}
      {!isMobile && (
        <motion.nav
          animate={{
            width: scrolled ? "1000px" : "1280px",
            backgroundColor: isDark
              ? scrolled ? "rgba(15,10,35,0.92)" : "rgba(15,10,35,0)"
              : scrolled ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0)",
            backdropFilter: scrolled ? "blur(14px)" : "blur(0px)",
            boxShadow: scrolled
              ? isDark ? "0 4px 24px rgba(124,58,237,0.25)" : "0 4px 24px rgba(124,58,237,0.1)"
              : "none",
          }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className={`hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-2xl transition-colors duration-300`}
        >
          <div style={{ padding: "10px 40px" }} className="flex items-center justify-between gap-8">

            {/* Logo */}
            <a
              href="#home"
              onClick={handleScroll}
              className={`text-2xl font-black flex items-center gap-0.5 tracking-tight transition-colors duration-300
                ${isDark ? "text-white" : "text-gray-900"}`}
            >
              {personal.name}
              <span className="text-purple-500">.</span>
              <span className={`font-light text-lg ${isDark ? "text-purple-300" : "text-gray-400"}`}>dev</span>
            </a>

            {/* File path style nav links + theme toggle */}
            <div className="flex items-center gap-4">
              <ul className="flex items-center gap-3">
                {navLinks.map((link, index) => (
                  <li key={link.label} className="flex items-center">
                    {index !== 0 && (
                      <span className="text-purple-400 mx-4 select-none font-light">/</span>
                    )}
                    <a
                      href={link.href}
                      onClick={handleScroll}
                      className={`text-base font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:text-purple-500
                        ${isDark
                          ? "text-gray-300 hover:bg-purple-900/40"
                          : "text-gray-500 hover:bg-purple-50"
                        }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>
          </div>
        </motion.nav>
      )}

      {/* ───── MOBILE NAV — full width ───── */}
      {isMobile && (
        <div className="md:hidden fixed top-0 left-0 w-full z-50">
          <motion.nav
            animate={{
              marginLeft: scrolled ? 16 : 0,
              marginRight: scrolled ? 16 : 0,
              marginTop: scrolled ? 12 : 0,
              borderRadius: scrolled ? 20 : 0,
              backgroundColor: scrolled
                ? isDark ? "rgba(10,8,30,0.92)" : "rgba(255,255,255,0.92)"
                : "rgba(255,255,255,0)",
              backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
              boxShadow: scrolled
                ? isDark ? "0 4px 24px rgba(124,58,237,0.2)" : "0 4px 24px rgba(124,58,237,0.08)"
                : "none",
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`transition-colors duration-300
              ${!scrolled && menuOpen
                ? isDark
                  ? "bg-gray-950/95 backdrop-blur-xl"
                  : "bg-white/95 backdrop-blur-xl"
                : ""
              }`}
          >
          <div style={{ padding: "14px 24px" }} className="flex items-center justify-between">

            {/* Logo */}
            <a
              href="#home"
              onClick={handleScroll}
              className={`text-lg font-black flex items-center gap-0.5 transition-colors duration-300
                ${isDark ? "text-white" : "text-gray-900"}`}
            >
              {personal.name}
              <span className="text-purple-500">.</span>
              <span className={`font-light text-sm ${isDark ? "text-purple-300" : "text-gray-400"}`}>dev</span>
            </a>

            {/* Right side: theme toggle + hamburger */}
            <div className="flex items-center gap-2">
              <ThemeToggle mobile />

              <button
                className={`flex flex-col justify-center items-center w-11 h-11 rounded-xl border-2 gap-1.5 transition-colors duration-300
                  ${isDark
                    ? "border-purple-600 bg-purple-900/30"
                    : "border-purple-300 bg-white shadow-md"
                  }`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block w-5 h-1 bg-purple-600 rounded-full origin-center"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  className="block w-5 h-1 bg-purple-600 rounded-full"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block w-5 h-1 bg-purple-600 rounded-full origin-center"
                />
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className={`overflow-hidden border-t transition-colors duration-300
                  ${isDark ? "bg-gray-950 border-purple-900" : "bg-white border-purple-100"}`}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "1px", padding: "10px" }}>
                  <p className="text-xl text-purple-400 font-mono tracking-wider" style={{ marginBottom: "2px" }}>
                    ~/{personal.name.toLowerCase()}/
                  </p>
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      onClick={handleScroll}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      style={{ padding: "6px 8px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "10px", fontSize: "16px", fontWeight: 600 }}
                      className={`transition-colors duration-200
                        ${isDark
                          ? "text-gray-200 hover:text-purple-400 hover:bg-purple-900/30"
                          : "text-gray-700 hover:text-purple-700 hover:bg-purple-50"
                        }`}
                    >
                      <span className="text-purple-400 font-mono">›</span>
                      {link.label}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </motion.nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
