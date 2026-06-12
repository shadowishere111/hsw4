"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn, getBasePath } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
  animated?: boolean;
  glow?: boolean;
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: "easeInOut" as const, delay: i * 0.15 },
  }),
};

export function Logo({ className, size = 40, glow = false }: LogoProps) {
  const base = getBasePath();

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div
          className="absolute inset-0 rounded-full opacity-50 blur-md"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.35) 0%, transparent 70%)" }}
        />
      )}
      <Image
        src={`${base}/logo.svg`}
        alt="House of Software"
        width={size}
        height={size}
        className="relative z-10 h-full w-full object-contain"
        priority
      />
    </div>
  );
}

export function LogoAnimated({ className, size = 48, glow = false }: { className?: string; size?: number; glow?: boolean }) {
  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div
          className="absolute inset-0 rounded-full opacity-50 blur-md"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.35) 0%, transparent 70%)" }}
        />
      )}
      <svg viewBox="0 0 100 100" fill="none" className="h-full w-full" aria-label="House of Software">
        <motion.path
          d="M10 85 L25 25 L40 55 L50 30 L60 55 L75 25 L90 85"
          stroke="#E5E4E2"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          custom={0}
          variants={draw}
          initial="hidden"
          animate="visible"
        />
        <motion.path
          d="M35 35 L35 70 M65 35 L65 70 M35 52 L65 52"
          stroke="#C0C0C0"
          strokeWidth="1"
          strokeLinecap="round"
          custom={1}
          variants={draw}
          initial="hidden"
          animate="visible"
        />
        <motion.path
          d="M38 48 C38 42 62 42 62 48 C62 54 38 54 38 60 C38 66 62 66 62 60"
          stroke="#D4AF37"
          strokeWidth="1.2"
          strokeLinecap="round"
          custom={2}
          variants={draw}
          initial="hidden"
          animate="visible"
        />
        <motion.path
          d="M50 15 L50 22"
          stroke="#00D9FF"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity={0.6}
          custom={3}
          variants={draw}
          initial="hidden"
          animate="visible"
        />
      </svg>
    </div>
  );
}

export function LogoMark({ className, size = 48 }: { className?: string; size?: number }) {
  return (
    <motion.div
      className={cn("relative", className)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <LogoAnimated size={size} glow />
    </motion.div>
  );
}
