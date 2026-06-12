"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const links = [
    { label: t.footer.links.about, href: "#about" },
    { label: t.footer.links.services, href: "#services" },
    { label: t.footer.links.projects, href: "#projects" },
    { label: t.footer.links.contact, href: "#contact" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.03),transparent_50%)]" />

      <div className="section-padding relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <motion.h2
            className="heading-lg text-gradient-gold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t.footer.tagline}
          </motion.h2>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <BrandLogo size={40} />
              <div>
                <span className="block font-semibold text-platinum">{t.footer.brand}</span>
                <span className="text-xs text-silver">{t.footer.arabic}</span>
              </div>
            </div>
            <p className="text-sm text-silver">
              houseofsw.com
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-silver transition-colors hover:text-soft-gold"
                data-cursor-hover
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="text-sm text-silver md:text-end">
            <p>{t.contact.info.email}</p>
            <p className="mt-2">{t.contact.info.location}</p>
          </div>
        </div>

        <div className="glow-line my-12" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-silver/60 md:flex-row">
          <p>© {year} {t.footer.brand}. {t.footer.rights}</p>
          <p className="font-mono text-gold/40">ENGINEERING THE FUTURE</p>
        </div>
      </div>
    </footer>
  );
}
