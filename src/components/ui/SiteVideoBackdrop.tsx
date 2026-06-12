"use client";

import { useEffect, useRef } from "react";

const VIDEO_SRC =
  "https://cdn.coverr.co/videos/coverr-abstract-digital-network-connection-lines-4641/1080p.mp4";

export function SiteVideoBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover opacity-30"
        aria-hidden
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-deep/90 via-deep/70 to-deep/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_75%)]" />
    </div>
  );
}
