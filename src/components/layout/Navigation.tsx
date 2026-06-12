"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LogoMark } from "@/components/ui/Logo";
import { cn, path, getBasePath } from "@/lib/utils";

const navItems = [
  { key: "about" as const, href: "/#about" },
  { key: "services" as const, href: "/#services" },
  { key: "projects" as const, href: "/projects" },
  { key: "technology" as const, href: "/#technology" },
  { key: "process" as const, href: "/#process" },
  { key: "contact" as const, href: "/contact" },
];

export function Navigation() {
  const { t, locale, toggleLocale, dir } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const base = getBasePath();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const resolveHref = (href: string) => {
    if (href.startsWith("/#")) return `${base}/${href.slice(1)}`;
    if (href.startsWith("/")) return path(href);
    return href;
  };

  return (
    <motion.header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass-strong py-3" : "bg-transparent py-6"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
        <Link href={path("/")} className="group flex items-center gap-3" data-cursor-hover>
          <LogoMark size={40} />
          <div className="hidden sm:block">
            <span className="block text-sm font-semibold text-platinum">House of Software</span>
            <span className="block text-[10px] text-silver/60">{t.footer.arabic}</span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const href = resolveHref(item.href);
            const isActive =
              (item.href === "/projects" && pathname?.includes("/projects")) ||
              (item.href === "/contact" && pathname?.includes("/contact"));

            return (
              <Link
                key={item.key}
                href={href}
                className={cn(
                  "text-sm transition-colors",
                  isActive ? "text-soft-gold" : "text-silver hover:text-soft-gold"
                )}
                data-cursor-hover
              >
                {t.nav[item.key]}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleLocale}
            className="glass rounded-full px-4 py-2 text-xs font-medium text-platinum transition-all hover:border-gold/30 hover:text-soft-gold"
            data-cursor-hover
          >
            {locale === "en" ? "العربية" : "English"}
          </button>

          <div className="hidden md:block">
            <MagneticButton href={path("/contact")} variant="primary" className="!px-6 !py-2.5 !text-sm">
              {t.nav.cta}
            </MagneticButton>
          </div>

          <button
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span className={cn("h-0.5 w-6 bg-platinum transition-all", mobileOpen && "translate-y-2 rotate-45")} />
            <span className={cn("h-0.5 w-6 bg-platinum transition-all", mobileOpen && "opacity-0")} />
            <span className={cn("h-0.5 w-6 bg-platinum transition-all", mobileOpen && "-translate-y-2 -rotate-45")} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="glass-strong fixed inset-0 top-[60px] z-40 flex flex-col items-center gap-8 pt-12 lg:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            dir={dir}
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={resolveHref(item.href)}
                  className="text-xl text-platinum"
                  onClick={() => setMobileOpen(false)}
                >
                  {t.nav[item.key]}
                </Link>
              </motion.div>
            ))}
            <MagneticButton href={path("/contact")} variant="primary">
              {t.nav.cta}
            </MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
