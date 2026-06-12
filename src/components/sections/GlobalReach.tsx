"use client";

import dynamic from "next/dynamic";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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
      <div className="relative z-10 mx-auto max-w-7xl">
        <ScrollReveal animation="fadeUp">
          <SectionLabel label={t.global.label} title={t.global.title} subtitle={t.global.subtitle} />
        </ScrollReveal>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <ScrollReveal animation="scale">
            <GlobeScene />
          </ScrollReveal>

          <ScrollReveal animation="stagger" staggerChildren={0.1} className="space-y-4">
            {t.global.regions.map((region) => (
              <div
                key={region}
                data-reveal-child
                className="glass flex items-center gap-4 rounded-xl p-5"
              >
                <div className="flex h-3 w-3 items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-electric shadow-[0_0_10px_rgba(0,217,255,0.5)]" />
                </div>
                <span className="text-lg font-medium text-platinum">{region}</span>
                <div className="ml-auto h-px flex-1 max-w-[100px] bg-gradient-to-r from-gold/40 to-transparent" />
              </div>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
