"use client";

import { motion } from "framer-motion";

interface SectionLabelProps {
  label: string;
  title: string;
  subtitle?: string;
}

export function SectionLabel({ label, title, subtitle }: SectionLabelProps) {
  return (
    <div className="mb-16 text-center md:mb-20">
      <motion.span
        className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.3em] text-gold"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {label}
      </motion.span>
      <motion.h2
        className="heading-lg text-gradient-metallic"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="body-lg mx-auto mt-6 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        className="glow-line mx-auto mt-8 max-w-xs"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </div>
  );
}
