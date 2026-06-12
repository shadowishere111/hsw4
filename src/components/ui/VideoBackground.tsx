"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface VideoBackgroundProps {
  className?: string;
  overlay?: "light" | "medium" | "heavy";
  children?: React.ReactNode;
}

const VIDEO_SRC =
  "https://cdn.coverr.co/videos/coverr-abstract-digital-network-connection-lines-4641/1080p.mp4";

export function VideoBackground({ className, overlay = "medium", children }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  const overlayClass = {
    light: "from-deep/60 via-deep/40 to-deep/70",
    medium: "from-deep/80 via-deep/60 to-deep/85",
    heavy: "from-deep/90 via-deep/75 to-deep/95",
  }[overlay];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
        aria-hidden
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
      <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-b", overlayClass)} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_80%)]" />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}

export function VideoSection({
  children,
  className,
  overlay = "medium",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  overlay?: "light" | "medium" | "heavy";
  id?: string;
}) {
  return (
    <VideoBackground className={cn("section-padding", className)} overlay={overlay}>
      <section id={id} className="relative mx-auto max-w-7xl">
        {children}
      </section>
    </VideoBackground>
  );
}
