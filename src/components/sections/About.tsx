"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal, ParallaxLayer } from "@/components/ui/ScrollReveal";

export function About() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" ref={containerRef} className="section-padding relative overflow-hidden">
      <ParallaxLayer className="pointer-events-none absolute right-0 top-20 h-64 w-64 rounded-full bg-cosmic/10 blur-[120px]" speed={0.5} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <ScrollReveal animation="fadeUp">
          <SectionLabel label={t.about.label} title={t.about.title} subtitle={t.about.subtitle} />
        </ScrollReveal>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          <ScrollReveal animation="fadeLeft">
          <motion.div>
            <p className="body-lg mb-8">{t.about.story}</p>
            <p className="body-lg mb-8">{t.about.promise}</p>
            <p className="body-lg">{t.about.global}</p>
          </motion.div>
          </ScrollReveal>

          <ScrollReveal animation="fadeRight">
          <motion.div
            className="glass-strong relative rounded-2xl p-8 md:p-10"
            style={{ y }}
          >
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gold/10 blur-2xl" />
            <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-cosmic/10 blur-2xl" />

            <div className="relative">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10 font-display text-2xl font-bold text-gold">
                  ME
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-platinum">{t.about.founder}</h3>
                  <p className="text-sm text-gold">{t.about.founderRole}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-silver">{t.about.founderBio}</p>
            </div>
          </motion.div>
          </ScrollReveal>
        </div>

        <ScrollReveal animation="stagger" staggerChildren={0.12} className="relative mt-24">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-gold/40 via-gold/20 to-transparent lg:block" />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            {t.about.milestones.map((milestone) => (
              <div
                key={milestone.year}
                data-reveal-child
                className="glass group relative rounded-xl p-6 transition-all hover:border-gold/30 hover:shadow-glow"
                data-cursor-hover
              >
                <span className="text-2xl font-bold text-gradient-gold">{milestone.year}</span>
                <h4 className="mt-2 font-semibold text-platinum">{milestone.title}</h4>
                <p className="mt-2 text-sm text-silver">{milestone.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
