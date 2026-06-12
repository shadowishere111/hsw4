"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Process() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="process" ref={containerRef} className="section-padding relative">
      <div className="relative z-10 mx-auto max-w-7xl">
        <ScrollReveal animation="fadeUp">
          <SectionLabel label={t.process.label} title={t.process.title} subtitle={t.process.subtitle} />
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-8 top-0 hidden h-full w-px bg-white/10 md:left-1/2 md:block md:-translate-x-px">
            <motion.div className="w-full bg-gradient-to-b from-gold via-soft-gold to-gold" style={{ height: lineHeight }} />
          </div>

          <div className="space-y-12 md:space-y-0">
            {t.process.steps.map((step, i) => (
              <ScrollReveal key={step.num} animation={i % 2 === 0 ? "fadeLeft" : "fadeRight"} delay={i * 0.05}>
              <div
                className={`relative flex items-center gap-8 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                  <div className="glass group rounded-2xl p-8 transition-all hover:border-gold/20 hover:shadow-glow" data-cursor-hover>
                    <span className="text-xs font-mono text-gold">{step.num}</span>
                    <h3 className="mt-2 text-xl font-semibold text-platinum">{step.title}</h3>
                    <p className="mt-3 text-sm text-silver">{step.desc}</p>
                  </div>
                </div>

                <div className="absolute left-8 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-gold bg-deep md:left-1/2 md:block">
                  <div className="absolute inset-0 animate-pulse-glow rounded-full bg-gold/30" />
                </div>

                <div className="hidden flex-1 md:block" />
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
