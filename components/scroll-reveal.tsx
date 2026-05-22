"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type RevealDirection = "up" | "down" | "left" | "right" | "popup";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay before the animation starts, in milliseconds. */
  delay?: number;
  /** How much of the element must be visible before it animates in (0–1). */
  threshold?: number;
  /** Animation length in milliseconds. */
  duration?: number;
  /** Slide distance in pixels before reveal (up, down, popup). */
  translateY?: number;
  /** Slide distance in pixels before reveal (left, right). */
  translateX?: number;
  /** Initial scale for popup reveal. */
  scaleFrom?: number;
  /** Entry animation direction. Default "up" (unchanged from original behavior). */
  direction?: RevealDirection;
  /** IntersectionObserver rootMargin (e.g. trigger before fully in view). */
  rootMargin?: string;
  /**
   * When true (default), reveal only after the element intersects the viewport.
   * When false, elements already in view on mount reveal immediately (e.g. above-the-fold hero).
   */
  revealOnScroll?: boolean;
  /**
   * When false, opacity stays at 1 so descendants can use `backdrop-filter` without
   * browsers deferring blur until the fade finishes (~700ms).
   */
  fade?: boolean;
};

function isInViewport(node: HTMLElement) {
  const rect = node.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

function getHiddenTransform(
  direction: RevealDirection,
  translateY: number,
  translateX: number,
  scaleFrom: number,
): string {
  switch (direction) {
    case "down":
      return `translate3d(0, ${-translateY}px, 0) scale(1)`;
    case "left":
      return `translate3d(${-translateX}px, 0, 0) scale(1)`;
    case "right":
      return `translate3d(${translateX}px, 0, 0) scale(1)`;
    case "popup":
      return `translate3d(0, 8px, 0) scale(${scaleFrom})`;
    case "up":
    default:
      return `translate3d(0, ${translateY}px, 0) scale(1)`;
  }
}

const visibleTransform = "translate3d(0, 0, 0) scale(1)";

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.15,
  duration = 700,
  translateY = 12,
  translateX = 24,
  scaleFrom = 0.96,
  direction = "up",
  rootMargin = "0px 0px -10% 0px",
  revealOnScroll = false,
  fade = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let cancelled = false;
    const show = () => {
      if (!cancelled) setVisible(true);
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      queueMicrotask(show);
      return () => {
        cancelled = true;
      };
    }

    if (!revealOnScroll && isInViewport(node)) {
      queueMicrotask(show);
      return () => {
        cancelled = true;
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [threshold, rootMargin, revealOnScroll]);

  return (
    <div
      ref={ref}
      style={{
        transitionProperty: fade ? "opacity, transform" : "transform",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        transform: visible
          ? visibleTransform
          : getHiddenTransform(direction, translateY, translateX, scaleFrom),
        opacity: fade ? (visible ? 1 : 0) : 1,
      }}
      className={`motion-reduce:transition-none motion-reduce:opacity-100 ${className}`}
    >
      {children}
    </div>
  );
}
