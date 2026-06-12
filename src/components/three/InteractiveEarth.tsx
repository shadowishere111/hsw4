"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { usePointerSmooth } from "@/hooks/usePointerSmooth";

interface InteractiveEarthProps {
  scale?: number;
  moveIntensity?: number;
  radius?: number;
}

export function InteractiveEarth({
  scale = 1,
  moveIntensity = 0.7,
  radius = 2,
}: InteractiveEarthProps) {
  const groupRef = useRef<THREE.Group>(null);
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const pointer = usePointerSmooth(0.06);

  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
    "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
    "https://unpkg.com/three-globe/example/img/earth-topology.png",
    "https://unpkg.com/three-globe/example/img/earth-water.png",
    "https://unpkg.com/three-globe/example/img/earth-clouds.png",
  ]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const px = pointer.current.x;
    const py = pointer.current.y;

    if (groupRef.current) {
      groupRef.current.position.x = px * 0.9 * moveIntensity;
      groupRef.current.position.y = py * 0.65 * moveIntensity;
    }

    if (earthRef.current) {
      earthRef.current.rotation.y = t * 0.08 + px * 0.35;
      earthRef.current.rotation.x = py * 0.12;
    }

    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = t * 0.09 + px * 0.35;
      cloudsRef.current.rotation.x = py * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.5}>
        <group>
          <mesh ref={earthRef}>
            <sphereGeometry args={[radius, 64, 64]} />
            <meshPhongMaterial
              map={colorMap}
              normalMap={normalMap}
              specularMap={specularMap}
              specular={new THREE.Color(0x333333)}
              shininess={12}
            />
          </mesh>

          <mesh ref={cloudsRef} scale={1.015}>
            <sphereGeometry args={[radius, 48, 48]} />
            <meshPhongMaterial
              map={cloudsMap}
              transparent
              opacity={0.22}
              depthWrite={false}
            />
          </mesh>

          <mesh scale={1.08}>
            <sphereGeometry args={[radius, 48, 48]} />
            <meshBasicMaterial
              color="#3a8fd9"
              transparent
              opacity={0.06}
              side={THREE.BackSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
