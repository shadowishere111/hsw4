"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionLabel } from "@/components/ui/SectionLabel";

const GlobeScene = dynamic(() => import("@/components/three/GlobeScene").then((m) => m.GlobeScene), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] items-center justify-center md:h-[500px]">
      <div className="h-16 w-16 animate-spin rounded-full border-2 border-gold/20 border-t-gold" />
    </div>
  ),
});

export function GlobalReach() {
  const { t } = useLanguage();

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(122,95,255,0.04),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionLabel label={t.global.label} title={t.global.title} subtitle={t.global.subtitle} />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <GlobeScene />

          <div className="space-y-4">
            {t.global.regions.map((region, i) => (
              <motion.div
                key={region}
                className="glass flex items-center gap-4 rounded-xl p-5"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex h-3 w-3 items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-electric shadow-[0_0_10px_rgba(0,217,255,0.5)]" />
                </div>
                <span className="text-lg font-medium text-platinum">{region}</span>
                <div className="ml-auto h-px flex-1 max-w-[100px] bg-gradient-to-r from-gold/40 to-transparent" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
