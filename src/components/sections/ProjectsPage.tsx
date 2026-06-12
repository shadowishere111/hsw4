"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { useLanguage } from "@/contexts/LanguageContext";
import { LogoAnimated } from "@/components/ui/Logo";
import { PageEntrance } from "@/components/ui/PageEntrance";
import { FloatingOrb } from "@/components/ui/ScrollReveal";

export function ProjectsPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeCategory === 0
      ? t.projects.items
      : t.projects.items.filter((p) => p.category === t.projects.categories[activeCategory]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      gsap.from(grid.children, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 0.6,
        stagger: 0.06,
        ease: "power3.out",
      });
    }, grid);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <PageEntrance>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden px-6 pt-32 pb-16 md:px-12">
        <FloatingOrb className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-cosmic/10 blur-[100px]" />
        <FloatingOrb className="absolute right-[15%] bottom-[10%] h-48 w-48 rounded-full bg-electric/10 blur-[80px]" />

        <div data-page-hero className="relative z-10 text-center">
          <motion.div
            className="mx-auto mb-8 flex justify-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <LogoAnimated size={80} glow />
          </motion.div>

          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.4em] text-gold">
            {t.projects.label}
          </span>
          <h1 className="heading-lg text-gradient-metallic">{t.projects.title}</h1>
          <p className="body-lg mx-auto mt-6 max-w-2xl">{t.projects.subtitle}</p>
          <div data-page-line className="glow-line mx-auto mt-8 max-w-xs origin-center" />
        </div>
      </section>

      {/* Filters */}
      <div data-page-content className="mx-auto max-w-7xl px-6 pb-8 md:px-12">
        <div className="flex flex-wrap justify-center gap-3">
          {t.projects.categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(i)}
              className={`relative rounded-full px-5 py-2.5 text-xs font-medium transition-all ${
                activeCategory === i
                  ? "border border-gold/40 bg-gold/10 text-soft-gold shadow-glow"
                  : "border border-white/10 text-silver hover:border-white/20"
              }`}
              data-cursor-hover
            >
              {cat}
              {activeCategory === i && (
                <motion.div
                  layoutId="category-pill"
                  className="absolute inset-0 rounded-full border border-gold/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Project Grid */}
      <div className="mx-auto max-w-7xl px-6 pb-32 md:px-12">
        <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.name}
                data-page-content
                layout
                className="glass-strong group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:border-gold/30 hover:shadow-glow"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{ y: -8 }}
                data-cursor-hover
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-cosmic/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="mb-4 flex items-start justify-between">
                    <span className="font-mono text-xs text-gold/60">{String(i + 1).padStart(2, "0")}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] text-silver">
                      {project.category}
                    </span>
                  </div>

                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl border border-gold/20 bg-gold/5 font-display text-2xl font-bold text-gold transition-all group-hover:border-gold/40 group-hover:shadow-glow">
                    {project.name.charAt(0)}
                  </div>

                  <h3 className="text-xl font-semibold text-platinum">{project.name}</h3>
                  <p className="mt-1 text-sm text-gold/80">{project.url}</p>
                  <p className="mt-4 text-sm leading-relaxed text-silver line-clamp-3">{project.desc}</p>

                  <motion.a
                    href={`https://${project.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold"
                    animate={{ x: hoveredIndex === i ? 4 : 0 }}
                  >
                    Visit Project
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </motion.a>
                </div>

                <motion.div
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-electric/10 blur-2xl"
                  animate={{ opacity: hoveredIndex === i ? 1 : 0, scale: hoveredIndex === i ? 1 : 0.5 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </PageEntrance>
  );
}
