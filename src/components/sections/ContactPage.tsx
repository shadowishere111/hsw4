"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useLanguage } from "@/contexts/LanguageContext";
import { LogoAnimated } from "@/components/ui/Logo";
import { PageEntrance } from "@/components/ui/PageEntrance";
import { FloatingOrb } from "@/components/ui/ScrollReveal";

export function ContactPage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const fields = [
    { name: "name", type: "text", label: t.contact.form.name },
    { name: "company", type: "text", label: t.contact.form.company },
    { name: "email", type: "email", label: t.contact.form.email },
    { name: "phone", type: "tel", label: t.contact.form.phone },
  ];

  useEffect(() => {
    const form = formRef.current;
    if (!form || submitted) return;

    const ctx = gsap.context(() => {
      gsap.from(form.querySelectorAll("[data-field]"), {
        opacity: 0,
        x: -30,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.8,
      });
    }, form);

    return () => ctx.revert();
  }, [submitted]);

  return (
    <PageEntrance>
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden px-6 pt-32 pb-12 md:px-12">
        <FloatingOrb className="absolute left-[20%] top-[30%] h-56 w-56 rounded-full bg-gold/10 blur-[90px]" />
        <FloatingOrb className="absolute right-[10%] bottom-[20%] h-40 w-40 rounded-full bg-electric/10 blur-[70px]" />

        <div data-page-hero className="relative z-10 text-center">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full border border-gold/10"
          >
            <LogoAnimated size={64} glow />
          </motion.div>
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.4em] text-gold">
            {t.contact.label}
          </span>
          <h1 className="heading-lg text-gradient-gold">{t.contact.title}</h1>
          <p className="body-lg mx-auto mt-6 max-w-xl">{t.contact.subtitle}</p>
          <div data-page-line className="glow-line mx-auto mt-8 max-w-xs origin-center" />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 pb-32 md:px-12">
        <div className="grid gap-12 lg:grid-cols-5">
          <div data-page-content className="lg:col-span-3">
            {submitted ? (
              <motion.div
                className="glass-strong flex flex-col items-center justify-center rounded-2xl p-16 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <motion.div
                  className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 bg-gold/10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <LogoAnimated size={40} />
                </motion.div>
                <h3 className="text-2xl font-semibold text-platinum">Message Sent</h3>
                <p className="mt-2 text-silver">We&apos;ll be in touch shortly.</p>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="glass-strong rounded-2xl p-8 md:p-10">
                <div className="grid gap-6 sm:grid-cols-2">
                  {fields.map((field) => (
                    <div key={field.name} data-field className="relative">
                      <input
                        type={field.type}
                        name={field.name}
                        required={field.name === "name" || field.name === "email"}
                        className="peer w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-platinum outline-none transition-all focus:border-gold/40 focus:bg-white/[0.08] focus:shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                        placeholder=" "
                        onFocus={() => setFocused(field.name)}
                        onBlur={() => setFocused(null)}
                      />
                      <label
                        className={`pointer-events-none absolute start-4 transition-all ${
                          focused === field.name
                            ? "top-1 text-[10px] text-gold"
                            : "top-4 text-sm text-silver peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[10px]"
                        }`}
                      >
                        {field.label}
                      </label>
                    </div>
                  ))}

                  <div data-field className="relative">
                    <select
                      name="projectType"
                      className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-platinum outline-none transition-all focus:border-gold/40"
                      defaultValue=""
                    >
                      <option value="" disabled>{t.contact.form.projectType}</option>
                      {t.contact.form.projectTypes.map((type) => (
                        <option key={type} value={type} className="bg-obsidian">{type}</option>
                      ))}
                    </select>
                  </div>

                  <div data-field className="relative">
                    <select
                      name="budget"
                      className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-platinum outline-none transition-all focus:border-gold/40"
                      defaultValue=""
                    >
                      <option value="" disabled>{t.contact.form.budget}</option>
                      {t.contact.form.budgets.map((budget) => (
                        <option key={budget} value={budget} className="bg-obsidian">{budget}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div data-field className="relative mt-6">
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-platinum outline-none transition-all focus:border-gold/40 focus:bg-white/[0.08]"
                    placeholder={t.contact.form.message}
                  />
                </div>

                <motion.button
                  type="submit"
                  data-field
                  className="magnetic-btn-primary mt-8 w-full sm:w-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-cursor-hover
                >
                  {t.contact.form.submit}
                </motion.button>
              </form>
            )}
          </div>

          <div className="flex flex-col justify-center gap-6 lg:col-span-2">
            {[
              { label: "Email", value: t.contact.info.email, href: `mailto:${t.contact.info.email}` },
              { label: "Phone", value: t.contact.info.phone },
              { label: "Location", value: t.contact.info.location },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                data-page-content
                className="glass rounded-xl p-6 transition-all hover:border-gold/20 hover:shadow-glow"
                whileHover={{ x: 8 }}
                transition={{ delay: i * 0.05 }}
              >
                <p className="text-xs uppercase tracking-wider text-gold">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="mt-2 block text-lg text-platinum hover:text-soft-gold" data-cursor-hover>
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-2 text-lg text-platinum">{item.value}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageEntrance>
  );
}
