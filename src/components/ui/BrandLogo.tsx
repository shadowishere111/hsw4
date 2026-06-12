"use client";

import Image from "next/image";
import { cn, getBasePath } from "@/lib/utils";

interface BrandLogoProps {
  size?: number;
  className?: string;
  showFrame?: boolean;
}

export function BrandLogo({ size = 40, className, showFrame = true }: BrandLogoProps) {
  const base = getBasePath();

  const image = (
    <Image
      src={`${base}/logo.png`}
      alt="House of Software"
      width={size}
      height={size}
      className="h-full w-full object-contain"
      priority
    />
  );

  if (!showFrame) {
    return (
      <div className={cn("relative shrink-0", className)} style={{ width: size, height: size }}>
        {image}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-lg border border-gold/25 bg-black/60 p-1 shadow-[0_0_20px_rgba(212,175,55,0.08)] transition-all group-hover:border-gold/40 group-hover:shadow-[0_0_24px_rgba(212,175,55,0.15)]",
        className
      )}
      style={{ width: size, height: size }}
    >
      {image}
    </div>
  );
}
