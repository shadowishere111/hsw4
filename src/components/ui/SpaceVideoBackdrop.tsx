"use client";

import { useEffect, useRef } from "react";
import { getBasePath } from "@/lib/utils";

export function SpaceVideoBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const base = getBasePath();

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="h-full w-full object-cover"
        src={`${base}/space-bg.mp4`}
      />
    </div>
  );
}
