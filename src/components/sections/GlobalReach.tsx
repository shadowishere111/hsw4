"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionLabel } from "@/components/ui/SectionLabel";

const GlobeScene = dynamic(() => import("@/components/three/GlobeScene").then((m) => m.GlobeScene), {
  ssr: false,
  loading: () => (
    <div className="mx-auto flex h-[min(72vw,300px)] w-full max-w-[420px] items-center justify-center sm:h-[360px] md:h-[400px] lg:h-[min(52vh,500px)]">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-gold/20 border-t-gold" />
    </div>
  ),
});

export function GlobalReach() {
  const { t } = useLanguage();

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionLabel label={t.global.label} title={t.global.title} subtitle={t.global.subtitle} />

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex justify-center">
            <GlobeScene />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:gap-4">
            {t.global.regions.map((region, i) => (
              <motion.div
                key={region}
                className="glass flex items-center gap-3 rounded-xl p-4 sm:p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="flex h-3 w-3 shrink-0 items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-soft-gold shadow-[0_0_10px_rgba(255,216,107,0.5)]" />
                </div>
                <span className="text-base font-medium text-platinum sm:text-lg">{region}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
