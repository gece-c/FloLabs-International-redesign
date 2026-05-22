export const aboutSectionRevealProps = {
  revealOnScroll: true,
  delay: 0,
  duration: 400,
  threshold: 0.08,
  rootMargin: "0px 0px 8% 0px",
} as const;

export const aboutCardRevealProps = {
  revealOnScroll: true,
  delay: 0,
  duration: 300,
  translateY: 6,
  threshold: 0.01,
  rootMargin: "0px 0px 10% 0px",
} as const;

export function aboutStaggerDelay(staggerMs: number) {
  return staggerMs;
}
