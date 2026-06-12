"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Technology() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateReverse = useTransform(scrollYProgress, [0, 1], [360, 0]);

  return (
    <section id="technology" ref={containerRef} className="section-padding relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionLabel label={t.technology.label} title={t.technology.title} subtitle={t.technology.subtitle} />

        <div className="relative">
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10"
            style={{ rotate }}
          />
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-electric/10"
            style={{ rotate: rotateReverse }}
          />

          <div className="relative grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {t.technology.items.map((tech, i) => (
              <motion.div
                key={tech.name}
                className="glass group relative flex flex-col items-center rounded-xl p-5 text-center transition-all hover:border-gold/30 hover:shadow-glow"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                data-cursor-hover
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 font-mono text-xs font-bold text-gold transition-colors group-hover:border-gold/30 group-hover:bg-gold/10">
                  {tech.name.slice(0, 2).toUpperCase()}
                </div>
                <h4 className="text-sm font-semibold text-platinum">{tech.name}</h4>
                <p className="mt-1 text-[10px] leading-tight text-silver opacity-0 transition-opacity group-hover:opacity-100">
                  {tech.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
