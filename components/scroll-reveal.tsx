"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay before the animation starts, in milliseconds. */
  delay?: number;
  /** How much of the element must be visible before it animates in (0–1). */
  threshold?: number;
  /** Animation length in milliseconds. */
  duration?: number;
  /** Slide distance in pixels before reveal. */
  translateY?: number;
  /** IntersectionObserver rootMargin (e.g. trigger before fully in view). */
  rootMargin?: string;
};

function isInViewport(node: HTMLElement) {
  const rect = node.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.15,
  duration = 700,
  translateY = 12,
  rootMargin = "0px 0px -10% 0px",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    // Already on screen on mount (avoids hidden flash + observer frame delay).
    if (isInViewport(node)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div
      ref={ref}
      style={{
        transitionProperty: "opacity, transform",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        transform: visible ? "translateY(0)" : `translateY(${translateY}px)`,
        opacity: visible ? 1 : 0,
      }}
      className={`motion-reduce:transition-none motion-reduce:opacity-100 ${className}`}
    >
      {children}
    </div>
  );
}
