"use client";

import { ReactNode } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { VideoBackground } from "@/components/ui/VideoBackground";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navigation />
      <VideoBackground overlay="heavy" className="min-h-[calc(100vh-80px)]">
        {children}
      </VideoBackground>
      <Footer />
    </main>
  );
}
