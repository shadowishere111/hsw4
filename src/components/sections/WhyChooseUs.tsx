"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionLabel } from "@/components/ui/SectionLabel";

function AnimatedMetric({ value, inView }: { value: string; inView: boolean }) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    if (value.includes("+") || value.includes("%") || value.includes("ms") || value.includes("bit") || value === "∞" || value === "ISO") {
      setDisplay(value);
      return;
    }
    const num = parseInt(value);
    if (isNaN(num)) {
      setDisplay(value);
      return;
    }
    let current = 0;
    const interval = setInterval(() => {
      current += Math.ceil(num / 30);
      if (current >= num) {
        setDisplay(value);
        clearInterval(interval);
      } else {
        setDisplay(String(current));
      }
    }, 30);
    return () => clearInterval(interval);
  }, [inView, value]);

  return <span className="text-3xl font-bold text-gradient-gold md:text-4xl">{display}</span>;
}

export function WhyChooseUs() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative">
      <div ref={ref} className="relative z-10 mx-auto max-w-7xl">
        <SectionLabel label={t.whyUs.label} title={t.whyUs.title} subtitle={t.whyUs.subtitle} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.whyUs.items.map((item, i) => (
            <motion.div
              key={item.title}
              className="glass-strong group relative overflow-hidden rounded-2xl p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              data-cursor-hover
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/5 blur-2xl transition-all group-hover:bg-gold/10" />
              <AnimatedMetric value={item.metric} inView={inView} />
              <h3 className="mt-4 text-lg font-semibold text-platinum">{item.title}</h3>
              <p className="mt-2 text-sm text-silver">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
