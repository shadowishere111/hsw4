"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Projects() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeProject, setActiveProject] = useState(0);

  const filtered =
    activeCategory === 0
      ? t.projects.items
      : t.projects.items.filter((p) => p.category === t.projects.categories[activeCategory]);

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionLabel label={t.projects.label} title={t.projects.title} subtitle={t.projects.subtitle} />

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {t.projects.categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(i);
                setActiveProject(0);
              }}
              className={`rounded-full px-5 py-2 text-xs font-medium transition-all ${
                activeCategory === i
                  ? "border border-gold/40 bg-gold/10 text-soft-gold shadow-glow"
                  : "border border-white/10 text-silver hover:border-white/20"
              }`}
              data-cursor-hover
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={filtered[activeProject]?.name}
                className="glass-strong relative aspect-[16/10] overflow-hidden rounded-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-white/[0.03]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <div className="mb-4 h-20 w-20 rounded-xl border border-gold/20 bg-gold/5 backdrop-blur-sm">
                    <div className="flex h-full items-center justify-center font-display text-2xl font-bold text-gold">
                      {filtered[activeProject]?.name.charAt(0)}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-platinum">{filtered[activeProject]?.name}</h3>
                  <p className="mt-1 text-sm text-gold">{filtered[activeProject]?.url}</p>
                  <span className="mt-4 rounded-full border border-white/10 px-4 py-1 text-xs text-silver">
                    {filtered[activeProject]?.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,rgba(0,217,255,0.05)_50%,transparent_60%)] opacity-0 transition-opacity hover:opacity-100" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={filtered[activeProject]?.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <p className="body-lg mb-8">{filtered[activeProject]?.desc}</p>
                <a
                  href={`https://${filtered[activeProject]?.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-soft-gold"
                  data-cursor-hover
                >
                  Visit Project →
                </a>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 space-y-2">
              {filtered.map((project, i) => (
                <button
                  key={project.name}
                  onClick={() => setActiveProject(i)}
                  className={`flex w-full items-center gap-4 rounded-xl p-4 text-left transition-all ${
                    activeProject === i
                      ? "glass-strong border-gold/20 shadow-glow"
                      : "hover:bg-white/5"
                  }`}
                  data-cursor-hover
                >
                  <span className="text-xs font-mono text-gold/60">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <span className="block text-sm font-medium text-platinum">{project.name}</span>
                    <span className="text-xs text-silver">{project.category}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
