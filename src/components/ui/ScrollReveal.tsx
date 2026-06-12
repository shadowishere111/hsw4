"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimationType = "fadeUp" | "fadeLeft" | "fadeRight" | "scale" | "blur" | "stagger";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  staggerChildren?: number;
}

const fromVars: Record<AnimationType, gsap.TweenVars> = {
  fadeUp: { y: 80, opacity: 0 },
  fadeLeft: { x: -80, opacity: 0 },
  fadeRight: { x: 80, opacity: 0 },
  scale: { scale: 0.85, opacity: 0 },
  blur: { filter: "blur(12px)", opacity: 0, y: 40 },
  stagger: { y: 60, opacity: 0 },
};

export function ScrollReveal({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 1,
  className,
  staggerChildren,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = staggerChildren
      ? el.querySelectorAll("[data-reveal-child]")
      : el;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        ...fromVars[animation],
        duration,
        delay,
        ease: "power3.out",
        stagger: staggerChildren ?? 0,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [animation, delay, duration, staggerChildren]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function FloatingOrb({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: -30,
        x: 15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: -120,
        ease: "none",
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      aria-hidden
    />
  );
}

export function ParallaxLayer({
  children,
  speed = 0.3,
  className,
}: {
  children?: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: () => -80 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
