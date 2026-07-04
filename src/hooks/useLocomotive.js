import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";

/**
 * useLocomotive Hook
 * @description Initializes Locomotive Scroll v5 with optimized Lenis options.
 * @returns {React.MutableRefObject} scrollRef - The scroll instance reference.
 */
export const useLocomotive = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    // Safety guard for Server-Side Rendering (SSR) environments
    if (typeof window === "undefined") return;

    // Initialize Locomotive Scroll v5 (Lenis-based core)
    scrollRef.current = new LocomotiveScroll({
      autoStart: true,
      lenisOptions: {
        lerp: 0.1, // Linear Interpolation (Smoothness)
        duration: 1.2, // Scroll duration in seconds
        smoothWheel: true,
      },
    });

    // Cleanup on unmount to prevent memory leaks
    return () => {
      if (scrollRef.current && typeof scrollRef.current.destroy === "function") {
        scrollRef.current.destroy();
      }
    };
  }, []);

  return scrollRef;
};
