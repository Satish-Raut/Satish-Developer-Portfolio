import './index.css';
import { useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import useLenis from './hooks/useLenis';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingBook3D from './components/FloatingBook3D';
import Splash from './components/Splash';
import Skills from './components/Skills';
import Certifications from './components/Certification';
import ParticleBackground from './components/ParticleBackground';

const AppInner = () => {
  useLenis();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    document.documentElement.style.background = isDark ? '#0d0d1a' : '#faf8ff';
  }, [isDark]);

  return (
    <>
      {/* <ParticleBackground isDark={isDark} /> */}
      {/* <FloatingBook3D /> */}
      <Splash />
      <CustomCursor />

      <div className="relative z-10 bg-transparent">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certifications />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

const App = () => (
  <ThemeProvider>
    <AppInner />
  </ThemeProvider>
);

export default App;