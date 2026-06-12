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
      className="h-full w-full object-contain brightness-[2.25] contrast-[1.1]"
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
        "relative shrink-0 overflow-hidden rounded-lg border border-gold/30 p-0.5 transition-all group-hover:border-gold/50",
        className
      )}
      style={{ width: size, height: size, backgroundColor: "rgb(138, 94, 0)" }}
    >
      {image}
    </div>
  );
}
