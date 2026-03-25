import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SCROLLER = document.documentElement;

/**
 * Lenis + GSAP ScrollTrigger — full integration.
 *
 * Without scrollerProxy, ScrollTrigger reads native scroll while Lenis animates
 * scroll on its own timeline → pins/scrub feel broken or “wrong”.
 * Proxy routes all scrollTop reads/writes through Lenis.scroll / scrollTo(immediate).
 *
 * @see https://github.com/darkroomengineering/lenis#gsap-scrolltrigger
 */
const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: true,
      lerp: 0.09,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.1,
    });

    ScrollTrigger.defaults({ scroller: SCROLLER });

    ScrollTrigger.scrollerProxy(SCROLLER, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
          right: window.innerWidth,
          bottom: window.innerHeight,
        };
      },
      pinType: SCROLLER.style.transform ? 'transform' : 'fixed',
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.removeEventListener('resize', onResize);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      ScrollTrigger.scrollerProxy(SCROLLER, null);
      ScrollTrigger.refresh();
    };
  }, []);
};

export default useLenis;
