"use client";

import { ReactNode } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <SmoothScroll>
        <CustomCursor />
        {children}
      </SmoothScroll>
    </LanguageProvider>
  );
}
