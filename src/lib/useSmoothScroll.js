import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Page-level smooth scrolling, matching the reference site's setup
 * (same easing curve found in its production bundle: a standard
 * "expo out" curve, duration ~1.2s).
 *
 * Lenis intercepts wheel/touch input and interpolates the actual
 * scroll position each frame, then applies it via native scrollTo —
 * so existing scroll listeners (like the one in JourneySection) keep
 * working unchanged; they just receive smoothed values instead of
 * raw, jumpy wheel deltas.
 *
 * Usage: call useSmoothScroll() once, near the top of App().
 */
export function useSmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
