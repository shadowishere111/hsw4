"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { usePointerSmooth } from "@/hooks/usePointerSmooth";

interface InteractivePlanetProps {
  scale?: number;
  moveIntensity?: number;
  orbitIntensity?: number;
  showInnerCore?: boolean;
}

export function InteractivePlanet({
  scale = 1,
  moveIntensity = 1,
  orbitIntensity = 1,
  showInnerCore = true,
}: InteractivePlanetProps) {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const silverOrbitRef = useRef<THREE.Mesh>(null);
  const goldOrbitRef = useRef<THREE.Mesh>(null);
  const pointer = usePointerSmooth(0.06);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const px = pointer.current.x;
    const py = pointer.current.y;

    if (groupRef.current) {
      groupRef.current.position.x = px * 0.9 * moveIntensity;
      groupRef.current.position.y = py * 0.65 * moveIntensity;
    }

    if (planetRef.current) {
      planetRef.current.rotation.x = t * 0.12 + py * 0.35;
      planetRef.current.rotation.y = t * 0.18 + px * 0.35;
    }

    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.22 + py * 0.2;
      innerRef.current.rotation.z = t * 0.12 + px * 0.15;
    }

    if (silverOrbitRef.current) {
      silverOrbitRef.current.rotation.x = t * 0.1 * orbitIntensity + py * 0.4;
      silverOrbitRef.current.rotation.z = t * 0.07 * orbitIntensity + px * 0.3;
    }

    if (goldOrbitRef.current) {
      goldOrbitRef.current.rotation.x =
        Math.PI / 2 + t * 0.08 * orbitIntensity + py * 0.35;
      goldOrbitRef.current.rotation.y = t * 0.11 * orbitIntensity + px * 0.35;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.8}>
        <mesh ref={planetRef} castShadow>
          <icosahedronGeometry args={[1.8, 4]} />
          <MeshDistortMaterial
            color="#1a1a1a"
            metalness={0.95}
            roughness={0.15}
            distort={0.25}
            speed={1.5}
            envMapIntensity={1.5}
          />
        </mesh>
      </Float>

      {showInnerCore && (
        <mesh ref={innerRef}>
          <octahedronGeometry args={[0.85, 0]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={1}
            roughness={0.1}
            emissive="#D4AF37"
            emissiveIntensity={0.15}
          />
        </mesh>
      )}

      <mesh ref={silverOrbitRef}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.2} />
      </mesh>

      <mesh ref={goldOrbitRef}>
        <torusGeometry args={[3, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.9}
          roughness={0.25}
          emissive="#D4AF37"
          emissiveIntensity={0.35}
          transparent
          opacity={0.75}
        />
      </mesh>
    </group>
  );
}
