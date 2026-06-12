"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Line, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { usePointerSmooth } from "@/hooks/usePointerSmooth";

interface InteractiveEarthProps {
  scale?: number;
  moveIntensity?: number;
  radius?: number;
}

const CITIES = [
  { lat: 30.0444, lng: 31.2357 },
  { lat: 24.7136, lng: 46.6753 },
  { lat: 40.7128, lng: -74.006 },
  { lat: 51.5074, lng: -0.1278 },
  { lat: 35.6762, lng: 139.6503 },
  { lat: -33.8688, lng: 151.2093 },
  { lat: 25.2048, lng: 55.2708 },
  { lat: 52.52, lng: 13.405 },
];

function latLngToVector(lat: number, lng: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

export function InteractiveEarth({
  scale = 1,
  moveIntensity = 0.7,
  radius = 2,
}: InteractiveEarthProps) {
  const groupRef = useRef<THREE.Group>(null);
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const markersRef = useRef<THREE.Group>(null);
  const pointer = usePointerSmooth(0.06);

  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
    "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
    "https://unpkg.com/three-globe/example/img/earth-topology.png",
    "https://unpkg.com/three-globe/example/img/earth-water.png",
    "https://unpkg.com/three-globe/example/img/earth-clouds.png",
  ]);

  const { cityPoints, arcPoints } = useMemo(() => {
    const cityPoints = CITIES.map((c) => latLngToVector(c.lat, c.lng, radius * 1.02));
    const arcs: THREE.Vector3[][] = [];

    for (let i = 0; i < cityPoints.length; i++) {
      for (let j = i + 1; j < cityPoints.length; j++) {
        if ((i + j) % 3 !== 0) continue;
        const mid = cityPoints[i].clone().add(cityPoints[j]).multiplyScalar(0.5);
        mid.normalize().multiplyScalar(radius * 1.45);
        const curve = new THREE.QuadraticBezierCurve3(cityPoints[i], mid, cityPoints[j]);
        arcs.push(curve.getPoints(20));
      }
    }

    return { cityPoints, arcPoints: arcs };
  }, [radius]);

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

    if (markersRef.current) {
      markersRef.current.rotation.y = earthRef.current?.rotation.y ?? 0;
      markersRef.current.rotation.x = earthRef.current?.rotation.x ?? 0;
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
            <meshPhongMaterial map={cloudsMap} transparent opacity={0.22} depthWrite={false} />
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

          <group ref={markersRef}>
            {arcPoints.map((points, i) => (
              <Line key={i} points={points} color="#D4AF37" transparent opacity={0.4} lineWidth={1} />
            ))}
            {cityPoints.map((point, i) => (
              <mesh key={i} position={point}>
                <sphereGeometry args={[0.045, 8, 8]} />
                <meshStandardMaterial color="#FFD86B" emissive="#D4AF37" emissiveIntensity={1.5} />
              </mesh>
            ))}
          </group>
        </group>
      </Float>
    </group>
  );
}
