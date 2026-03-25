import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  "Turning caffeine into code...",
  "Compiling reality...",
  "Resolving dependencies...",
  "Debugging the universe...",
  "Pushing to production...",
  "Pixel perfect passion...",
];

// ✅ YOUR CUSTOM QUOTE
const mainQuote =
  "I don’t fear bugs — I follow them, because they always lead to deeper understanding.";

const badges = [
  { label: "React", top: "15%", left: "10%", delay: 0 },
  { label: "Node.js", top: "25%", right: "15%", delay: 0.2 },
  { label: "TypeScript", bottom: "20%", left: "20%", delay: 0.4 },
  { label: "Tailwind", bottom: "15%", right: "10%", delay: 0.6 },
  { label: "Next.js", top: "45%", left: "5%", delay: 0.8 },
  { label: "GraphQL", top: "65%", right: "8%", delay: 1.0 },
];

const textVariant = {
  initial: {
    opacity: 0,
    filter: "blur(20px)",
    scale: 1.5,
    letterSpacing: "0.5em",
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    letterSpacing: "0.12em",
    transition: { duration: 1.5, ease: "easeOut" },
  },
};

const SplashContent = ({ progress, quoteIndex }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 pointer-events-none">

    {/* 🔥 MAIN QUOTE */}
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: 0.8, duration: 1 }}
      className="absolute top-[18%] max-w-2xl text-center px-6"
    >
      <p className="text-purple-200/70 font-light text-lg md:text-2xl leading-relaxed italic tracking-wide">
        "{mainQuote}"
      </p>
      <p className="text-purple-400/60 font-medium text-xs md:text-sm mt-3 tracking-widest uppercase">
        — Your Journey Awaits
      </p>
    </motion.div>

    {/* LOGO WITH "Satish.dev" */}
    <motion.div
      variants={textVariant}
      initial="initial"
      animate="animate"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
    >
      <div className="flex items-baseline gap-1">
        <span className="text-7xl md:text-8xl font-black text-white drop-shadow-2xl">
          Satish
        </span>
        <span className="text-5xl md:text-6xl font-light text-purple-300/70 drop-shadow-lg">
          .dev
        </span>
      </div>
    </motion.div>

    {/* LOADER (BOTTOM — SAME AS YOURS) */}
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">

      {/* Progress */}
      <div className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 font-mono mb-4 drop-shadow-lg">
        {progress}%
      </div>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-purple-900/50 rounded-full overflow-hidden mb-6 backdrop-blur-sm shadow-inner shadow-purple-900/50">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut", duration: 0.3 }}
        />
      </div>

      {/* rotating quotes */}
      <AnimatePresence mode="wait">
        <motion.p
          key={quoteIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-purple-300/80 font-mono text-xs md:text-sm tracking-widest text-center h-10 w-full"
        >
          {quotes[quoteIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  </div>
);

const Splash = () => {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);

  // loading logic (same feel, slightly smooth)
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 4) + 2;

      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);

        // important for smooth unboxing timing
        setTimeout(() => setShow(false), 600);
      }

      setProgress(currentProgress);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 1000);
    return () => clearInterval(quoteInterval);
  }, []);

  // ✅ KEEP YOUR DIAGONAL UNBOXING (UNCHANGED)
  const slideUpRight = {
    initial: { x: 0, y: 0 },
    exit: {
      x: "100%",
      y: "-100%",
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const slideDownLeft = {
    initial: { x: 0, y: 0 },
    exit: {
      x: "-100%",
      y: "100%",
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[999] pointer-events-none flex items-center justify-center overflow-hidden">

          {/* TOP RIGHT */}
          <motion.div
            variants={slideUpRight}
            initial="initial"
            exit="exit"
            className="absolute inset-0 bg-gradient-to-br from-[#2e1065] to-[#1e1b4b]"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
          >
            <SplashContent progress={progress} quoteIndex={quoteIndex} />
          </motion.div>

          {/* BOTTOM LEFT */}
          <motion.div
            variants={slideDownLeft}
            initial="initial"
            exit="exit"
            className="absolute inset-0 bg-gradient-to-br from-[#2e1065] to-[#1e1b4b]"
            style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
          >
            <SplashContent progress={progress} quoteIndex={quoteIndex} />
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
};

export default Splash;