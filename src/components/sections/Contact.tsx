"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Contact() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

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

  return (
    <section id="contact" className="section-padding relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.04),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionLabel label={t.contact.label} title={t.contact.title} subtitle={t.contact.subtitle} />

        <div className="grid gap-12 lg:grid-cols-5">
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <motion.div
                className="glass-strong flex flex-col items-center justify-center rounded-2xl p-16 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="mb-4 text-5xl">✓</div>
                <h3 className="text-2xl font-semibold text-platinum">Message Sent</h3>
                <p className="mt-2 text-silver">We&apos;ll be in touch shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-strong rounded-2xl p-8 md:p-10">
                <div className="grid gap-6 sm:grid-cols-2">
                  {fields.map((field) => (
                    <div key={field.name} className="relative">
                      <input
                        type={field.type}
                        name={field.name}
                        required={field.name === "name" || field.name === "email"}
                        className="peer w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-platinum outline-none transition-all focus:border-gold/40 focus:bg-white/[0.08]"
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

                  <div className="relative">
                    <select
                      name="projectType"
                      className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-platinum outline-none transition-all focus:border-gold/40"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        {t.contact.form.projectType}
                      </option>
                      {t.contact.form.projectTypes.map((type) => (
                        <option key={type} value={type} className="bg-obsidian">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <select
                      name="budget"
                      className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-platinum outline-none transition-all focus:border-gold/40"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        {t.contact.form.budget}
                      </option>
                      {t.contact.form.budgets.map((budget) => (
                        <option key={budget} value={budget} className="bg-obsidian">
                          {budget}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="relative mt-6">
                  <textarea
                    name="message"
                    rows={4}
                    required
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-platinum outline-none transition-all focus:border-gold/40 focus:bg-white/[0.08]"
                    placeholder={t.contact.form.message}
                  />
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    className="magnetic-btn-primary w-full sm:w-auto"
                    data-cursor-hover
                  >
                    {t.contact.form.submit}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          <motion.div
            className="flex flex-col justify-center space-y-8 lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {[
              { label: "Email", value: t.contact.info.email, href: `mailto:${t.contact.info.email}` },
              { label: "Phone", value: t.contact.info.phone },
              { label: "Location", value: t.contact.info.location },
            ].map((item) => (
              <div key={item.label} className="glass rounded-xl p-6">
                <p className="text-xs uppercase tracking-wider text-gold">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="mt-2 block text-lg text-platinum hover:text-soft-gold" data-cursor-hover>
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-2 text-lg text-platinum">{item.value}</p>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
