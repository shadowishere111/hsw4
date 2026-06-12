"use client";

import { MouseEvent } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionLabel } from "@/components/ui/SectionLabel";

const icons = ["🌐", "👥", "📊", "🤖", "⚡", "☁️", "🔗", "🛡️", "📱"];

export function Services() {
  const { t } = useLanguage();

  const handleTilt = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleTiltReset = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
  };

  return (
    <section id="services" className="section-padding relative">
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionLabel label={t.services.label} title={t.services.title} subtitle={t.services.subtitle} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((service, i) => (
            <motion.div
              key={service.title}
              className="glass group relative cursor-pointer rounded-2xl p-8 transition-all duration-300 hover:border-gold/20 hover:shadow-glow"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              onMouseMove={handleTilt}
              onMouseLeave={handleTiltReset}
              data-cursor-hover
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="mb-4 block text-3xl">{icons[i]}</span>
              <h3 className="heading-md mb-3 text-platinum">{service.title}</h3>
              <p className="text-sm leading-relaxed text-silver">{service.desc}</p>
              <div className="mt-6 h-px w-0 bg-gradient-to-r from-gold to-transparent transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
