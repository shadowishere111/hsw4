"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Globe() {
  const globeRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { connectionLines, cityPoints } = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 64;

    for (let i = 0; i <= segments; i++) {
      const phi = (i / segments) * Math.PI;
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        const x = 2 * Math.sin(phi) * Math.cos(theta);
        const y = 2 * Math.cos(phi);
        const z = 2 * Math.sin(phi) * Math.sin(theta);
        points.push(new THREE.Vector3(x, y, z));
      }
    }

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

    const toVector = (lat: number, lng: number, r = 2.05) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    };

    const cityPoints = cities.map((c) => toVector(c.lat, c.lng));
    const linePositions: number[] = [];

    for (let i = 0; i < cityPoints.length; i++) {
      for (let j = i + 1; j < cityPoints.length; j++) {
        if (Math.random() > 0.5) {
          const mid = cityPoints[i].clone().add(cityPoints[j]).multiplyScalar(0.5);
          mid.normalize().multiplyScalar(2.8);
          const curve = new THREE.QuadraticBezierCurve3(cityPoints[i], mid, cityPoints[j]);
          const curvePoints = curve.getPoints(20);
          for (let k = 0; k < curvePoints.length - 1; k++) {
            linePositions.push(
              curvePoints[k].x, curvePoints[k].y, curvePoints[k].z,
              curvePoints[k + 1].x, curvePoints[k + 1].y, curvePoints[k + 1].z
            );
          }
        }
      }
    }

    return { connectionLines: new Float32Array(linePositions), cityPoints };
  }, []);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={globeRef}>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#0B0B0B"
          metalness={0.9}
          roughness={0.3}
          transparent
          opacity={0.6}
          wireframe
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.98, 32, 32]} />
        <meshStandardMaterial
          color="#050505"
          metalness={1}
          roughness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connectionLines.length / 3}
            array={connectionLines}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#D4AF37" transparent opacity={0.4} />
      </lineSegments>

      {cityPoints.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#00D9FF" emissive="#00D9FF" emissiveIntensity={2} />
        </mesh>
      ))}
    </group>
  );
}

export function GlobeScene() {
  return (
    <div className="h-[400px] w-full md:h-[500px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#E5E4E2" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#7A5FFF" />
          <Globe />
        </Suspense>
      </Canvas>
    </div>
  );
}
