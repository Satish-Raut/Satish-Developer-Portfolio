import { useEffect, useRef, useState } from 'react';

/**
 * CustomCursor — replaces the default cursor with a premium dot + ring.
 * The dot follows instantly; the ring follows with a slight lag (lerp effect).
 * On hoverable elements, the ring expands and changes color.
 */
const CustomCursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: 0, y: 0 });  // current mouse
  const ring    = useRef({ x: 0, y: 0 });  // ring lags behind
  const raf     = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Track mouse position
    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };

      // Move dot instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    // Smooth ring with RAF loop
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;

      if (ringRef.current) {
        const size = hovering ? 52 : 36;
        ringRef.current.style.transform = `translate(${ring.current.x - size / 2}px, ${ring.current.y - size / 2}px)`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    // Hover detection for interactive elements
    const onMouseEnter = () => setHovering(true);
    const onMouseLeave = () => setHovering(false);

    const hoverEls = document.querySelectorAll('a, button, [data-cursor-hover]');
    hoverEls.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    window.addEventListener('mousemove', onMouseMove);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf.current);
      hoverEls.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, [hovering]);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot" />
      <div ref={ringRef} className={`cursor-ring ${hovering ? 'hovering' : ''}`} />
    </>
  );
};

export default CustomCursor;
