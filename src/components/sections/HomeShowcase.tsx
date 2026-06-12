"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { LogoAnimated } from "@/components/ui/Logo";
import { path } from "@/lib/utils";

export function HomeProjectsCTA() {
  const { t } = useLanguage();

  return (
    <section className="section-padding relative">
      <ScrollReveal animation="scale" className="mx-auto max-w-7xl">
        <div className="glass-strong group relative overflow-hidden rounded-3xl p-10 md:p-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/10 blur-[100px] transition-all group-hover:bg-gold/15" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-cosmic/10 blur-[80px]" />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold">{t.projects.label}</span>
              <h2 className="heading-md mt-4 text-platinum">{t.projects.title}</h2>
              <p className="body-lg mt-4">{t.projects.subtitle}</p>
            </div>

            <div className="flex flex-col items-center gap-6 lg:items-end">
              <LogoAnimated size={72} glow />
              <Link
                href={path("/projects")}
                className="magnetic-btn-primary inline-flex items-center gap-3"
                data-cursor-hover
              >
                {t.hero.cta2}
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  →
                </motion.span>
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

export function HomeContactCTA() {
  const { t } = useLanguage();

  return (
    <section className="section-padding relative">
      <ScrollReveal animation="blur">
        <div className="mx-auto max-w-7xl text-center">
          <motion.div
            className="mx-auto mb-8"
            whileInView={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            viewport={{ once: true }}
          >
            <LogoAnimated size={56} glow />
          </motion.div>
          <h2 className="heading-md text-gradient-gold">{t.contact.title}</h2>
          <p className="body-lg mx-auto mt-4 max-w-xl">{t.contact.subtitle}</p>
          <Link href={path("/contact")} className="magnetic-btn-primary mt-8 inline-block" data-cursor-hover>
            {t.nav.cta}
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
