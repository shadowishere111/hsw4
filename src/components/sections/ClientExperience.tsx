"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ClientExperience() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl">
        <ScrollReveal animation="fadeUp">
          <SectionLabel label={t.clients.label} title={t.clients.title} subtitle={t.clients.subtitle} />
        </ScrollReveal>

        <ScrollReveal animation="stagger" staggerChildren={0.1} className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {t.clients.stats.map((stat) => (
            <div
              key={stat.label}
              data-reveal-child
              className="glass text-center rounded-xl p-6"
            >
              <span className="text-3xl font-bold text-gradient-gold md:text-4xl">{stat.value}</span>
              <p className="mt-2 text-sm text-silver">{stat.label}</p>
            </div>
          ))}
        </ScrollReveal>

        <ScrollReveal animation="stagger" staggerChildren={0.12}>
        <div className="grid gap-8 lg:grid-cols-3">
          {t.clients.testimonials.map((testimonial, i) => (
            <button
              key={i}
              data-reveal-child
              type="button"
              onClick={() => setActive(i)}
              className={`glass-strong relative rounded-2xl p-8 text-left transition-all ${
                active === i ? "border-gold/30 shadow-glow" : "hover:border-white/20"
              }`}
              data-cursor-hover
            >
              <div className="mb-4 text-4xl text-gold/30">&ldquo;</div>
              <AnimatePresence mode="wait">
                {active === i && (
                  <motion.p
                    className="text-sm leading-relaxed text-silver"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {testimonial.quote}
                  </motion.p>
                )}
              </AnimatePresence>
              {active !== i && (
                <p className="line-clamp-3 text-sm text-silver">{testimonial.quote}</p>
              )}
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="text-sm font-medium text-platinum">{testimonial.author}</p>
                <p className="text-xs text-gold">{testimonial.role}</p>
              </div>
            </button>
          ))}
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
