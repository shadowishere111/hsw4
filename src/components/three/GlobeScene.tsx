"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Stars } from "@react-three/drei";
import { InteractiveEarth } from "./InteractiveEarth";

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 3, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-6, -2, -4]} intensity={0.25} color="#4a90d9" />
      <Stars radius={80} depth={40} count={1000} factor={2.5} saturation={0} fade speed={0.3} />
      <InteractiveEarth scale={1} moveIntensity={0.7} radius={2} />
      <Environment preset="night" />
    </>
  );
}

export function GlobeScene() {
  return (
    <div className="relative mx-auto h-[min(72vw,300px)] w-full max-w-[420px] sm:h-[360px] md:h-[400px] lg:h-[min(52vh,500px)] lg:max-w-none">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
