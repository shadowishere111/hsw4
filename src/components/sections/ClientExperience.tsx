"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ClientExperience() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionLabel label={t.clients.label} title={t.clients.title} subtitle={t.clients.subtitle} />

        <div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {t.clients.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass text-center rounded-xl p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="text-3xl font-bold text-gradient-gold md:text-4xl">{stat.value}</span>
              <p className="mt-2 text-sm text-silver">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {t.clients.testimonials.map((testimonial, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              className={`glass-strong relative rounded-2xl p-8 text-left transition-all ${
                active === i ? "border-gold/30 shadow-glow" : "hover:border-white/20"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
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
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
