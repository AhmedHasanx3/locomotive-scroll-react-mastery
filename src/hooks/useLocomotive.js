import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";

/**
 * Custom hook to initialize Locomotive Scroll v5 (Lenis-based).
 * Optimized for React 18+ and enterprise-level performance.
 */
export const useLocomotive = (options = {}) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    // Initialize Locomotive Scroll
    scrollRef.current = new LocomotiveScroll({
      autoStart: true,
      lenisOptions: {
        wrapper: window,
        content: document.documentElement,
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        ...options,
      },
    });

    // The ResizeObserver Strategy: Required for dynamic React components
    // that change height after API data arrives.
    const resizeObserver = new ResizeObserver(() => {
      scrollRef.current?.update();
    });

    resizeObserver.observe(document.body);

    // Cleanup to prevent memory leaks and duplicate instances
    return () => {
      if (scrollRef.current) {
        scrollRef.current.destroy();
      }
      resizeObserver.disconnect();
    };
  }, [options]);

  return scrollRef;
};
