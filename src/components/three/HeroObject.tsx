"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.14;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      pointer.y * 0.12,
      0.04
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      -pointer.x * 0.1,
      0.04
    );
  });

  return <group ref={group}>{children}</group>;
}

function Core() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.y -= delta * 0.08;
  });

  const wire = useMemo(() => new THREE.IcosahedronGeometry(1.5, 1), []);
  const inner = useMemo(() => new THREE.IcosahedronGeometry(0.55, 3), []);

  return (
    <group ref={mesh}>
      <mesh geometry={wire}>
        <meshBasicMaterial color="#9ab7d9" wireframe transparent opacity={0.3} />
      </mesh>
      <mesh geometry={inner}>
        <meshStandardMaterial
          color="#0c0f14"
          emissive="#5c85ac"
          emissiveIntensity={0.4}
          roughness={0.4}
          metalness={0.4}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}

function createParticlePositions(count: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 3.4 + Math.random() * 1.6;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

const PARTICLE_POSITIONS = createParticlePositions(140);

function Particles() {
  const points = PARTICLE_POSITIONS;
  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#9ab7d9" size={0.03} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function HeroObject() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 9], fov: 32 }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 6]} intensity={22} color="#9ab7d9" />
      <group position={[0, 0.55, 0]}>
        <Rig>
          <Core />
        </Rig>
        <Particles />
      </group>
    </Canvas>
  );
}
