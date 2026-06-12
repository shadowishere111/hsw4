"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function usePointerSmooth(smoothing = 0.06) {
  const pointer = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const update = (clientX: number, clientY: number) => {
      pointer.current.targetX = (clientX / window.innerWidth) * 2 - 1;
      pointer.current.targetY = -(clientY / window.innerHeight) * 2 + 1;
    };

    const onMouse = (e: MouseEvent) => update(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) update(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchstart", onTouch);
    };
  }, []);

  useFrame(() => {
    pointer.current.x += (pointer.current.targetX - pointer.current.x) * smoothing;
    pointer.current.y += (pointer.current.targetY - pointer.current.y) * smoothing;
  });

  return pointer;
}
