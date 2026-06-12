"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";
import { usePointerSmooth } from "@/hooks/usePointerSmooth";

function MetallicCore() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const silverOrbitRef = useRef<THREE.Mesh>(null);
  const goldOrbitRef = useRef<THREE.Mesh>(null);
  const pointer = usePointerSmooth(0.06);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const px = pointer.current.x;
    const py = pointer.current.y;

    if (groupRef.current) {
      groupRef.current.position.x = px * 0.9;
      groupRef.current.position.y = py * 0.65;
    }

    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.12 + py * 0.35;
      meshRef.current.rotation.y = t * 0.18 + px * 0.35;
    }

    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.22 + py * 0.2;
      innerRef.current.rotation.z = t * 0.12 + px * 0.15;
    }

    if (silverOrbitRef.current) {
      silverOrbitRef.current.rotation.x = t * 0.1 + py * 0.4;
      silverOrbitRef.current.rotation.z = t * 0.07 + px * 0.3;
    }

    if (goldOrbitRef.current) {
      goldOrbitRef.current.rotation.x = Math.PI / 2 + t * 0.08 + py * 0.35;
      goldOrbitRef.current.rotation.y = t * 0.11 + px * 0.35;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
        <mesh ref={meshRef} castShadow>
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

      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={1}
          roughness={0.1}
          emissive="#D4AF37"
          emissiveIntensity={0.15}
        />
      </mesh>

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

function Particles() {
  const count = 500;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#D4AF37" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function FloatingGeometry() {
  const items = useMemo(
    () =>
      Array.from({ length: 8 }, () => ({
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8 - 4,
        ] as [number, number, number],
        scale: 0.1 + Math.random() * 0.2,
        speed: 0.5 + Math.random(),
      })),
    []
  );

  return (
    <>
      {items.map((item, i) => (
        <Float key={i} speed={item.speed} floatIntensity={2}>
          <mesh position={item.position} scale={item.scale}>
            <boxGeometry />
            <meshStandardMaterial
              color="#C0C0C0"
              metalness={0.9}
              roughness={0.2}
              transparent
              opacity={0.3}
              wireframe
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#E5E4E2" />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#00D9FF" />
      <pointLight position={[5, -3, 5]} intensity={0.3} color="#7A5FFF" />
      <pointLight position={[0, 0, 3]} intensity={0.4} color="#D4AF37" />

      <Stars radius={50} depth={50} count={2000} factor={3} saturation={0} fade speed={0.5} />
      <Particles />
      <FloatingGeometry />
      <MetallicCore />
      <Environment preset="city" />
    </>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
