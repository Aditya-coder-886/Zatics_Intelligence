"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function SmoothScroll() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Throttle ScrollTrigger update via rAF
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ScrollTrigger.update();
        ticking = false;
      });
    };
    lenis.on("scroll", onScroll);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const onReduceChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        lenis.destroy();
        gsap.ticker.remove(updateLenis);
      }
    };
    mediaQuery.addEventListener("change", onReduceChange);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
      mediaQuery.removeEventListener("change", onReduceChange);
    };
  }, []);

  return null;
}
