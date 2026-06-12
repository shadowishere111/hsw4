"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Line } from "@react-three/drei";
import * as THREE from "three";
import { InteractivePlanet } from "./InteractivePlanet";
import { usePointerSmooth } from "@/hooks/usePointerSmooth";

function CityArcs() {
  const arcsRef = useRef<THREE.Group>(null);
  const pointer = usePointerSmooth(0.05);

  const { arcPoints, markers } = useMemo(() => {
    const cities = [
      { lat: 30.0444, lng: 31.2357 },
      { lat: 24.7136, lng: 46.6753 },
      { lat: 40.7128, lng: -74.006 },
      { lat: 51.5074, lng: -0.1278 },
      { lat: 35.6762, lng: 139.6503 },
      { lat: -33.8688, lng: 151.2093 },
      { lat: 25.2048, lng: 55.2708 },
      { lat: 52.52, lng: 13.405 },
    ];

    const toVector = (lat: number, lng: number, r = 3.2) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    };

    const cityPoints = cities.map((c) => toVector(c.lat, c.lng));
    const arcs: THREE.Vector3[][] = [];

    for (let i = 0; i < cityPoints.length; i++) {
      for (let j = i + 1; j < cityPoints.length; j++) {
        if ((i + j) % 3 !== 0) continue;
        const mid = cityPoints[i].clone().add(cityPoints[j]).multiplyScalar(0.5);
        mid.normalize().multiplyScalar(4.2);
        const curve = new THREE.QuadraticBezierCurve3(cityPoints[i], mid, cityPoints[j]);
        arcs.push(curve.getPoints(24));
      }
    }

    return { arcPoints: arcs, markers: cityPoints };
  }, []);

  useFrame((state) => {
    if (!arcsRef.current) return;
    const t = state.clock.elapsedTime;
    arcsRef.current.rotation.y = t * 0.06 + pointer.current.x * 0.15;
    arcsRef.current.rotation.x = pointer.current.y * 0.1;
  });

  return (
    <group ref={arcsRef}>
      {arcPoints.map((points, i) => (
        <Line key={i} points={points} color="#D4AF37" transparent opacity={0.45} lineWidth={1} />
      ))}

      {markers.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#E5E4E2" emissive="#D4AF37" emissiveIntensity={1.2} />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[8, 8, 8]} intensity={0.6} color="#E5E4E2" />
      <pointLight position={[-8, -4, -6]} intensity={0.35} color="#D4AF37" />
      <pointLight position={[0, 0, 6]} intensity={0.3} color="#C0C0C0" />
      <InteractivePlanet scale={0.85} moveIntensity={0.7} orbitIntensity={0.85} />
      <CityArcs />
      <Environment preset="city" />
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
