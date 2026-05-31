import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Generate particle positions once, outside of render, so the work (and the
 * impure Math.random calls) never run during React's render phase.
 */
const positionCache = new Map<number, Float32Array>();
function getPositions(count: number): Float32Array {
  const cached = positionCache.get(count);
  if (cached) return cached;
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    arr[i * 3] = (Math.random() - 0.5) * 18;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }
  positionCache.set(count, arr);
  return arr;
}

function Particles({ count = 2200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const positions = getPositions(count);

  useFrame(({ pointer }, delta) => {
    if (!ref.current) return;
    mouse.current.x += (pointer.x - mouse.current.x) * 0.04;
    mouse.current.y += (pointer.y - mouse.current.y) * 0.04;
    ref.current.rotation.y += delta * 0.04;
    ref.current.rotation.x = mouse.current.y * 0.15;
    ref.current.rotation.z = mouse.current.x * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#00f5ff"
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Lightweight starfield/particle background rendered on a transparent canvas. */
export function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={[1, 1.6]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Particles />
    </Canvas>
  );
}

export default ParticleField;
