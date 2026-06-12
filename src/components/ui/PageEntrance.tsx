"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";

interface PageEntranceProps {
  children: ReactNode;
  className?: string;
}

export function PageEntrance({ children, className }: PageEntranceProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(el.querySelector("[data-page-hero]"), {
        opacity: 0,
        y: 60,
        duration: 1.2,
      })
        .from(
          el.querySelectorAll("[data-page-line]"),
          { scaleX: 0, duration: 0.8, stagger: 0.1 },
          "-=0.6"
        )
        .from(
          el.querySelectorAll("[data-page-content]"),
          { opacity: 0, y: 40, duration: 0.9, stagger: 0.08 },
          "-=0.4"
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
