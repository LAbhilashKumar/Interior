import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

function KitchenModule() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.15) * 0.3;
    }
  });

  const cabinetMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#3a2a1e',
    roughness: 0.35,
    metalness: 0.15,
  }), []);

  const brassMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#b8915f',
    roughness: 0.2,
    metalness: 0.8,
  }), []);

  const countertopMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1714',
    roughness: 0.1,
    metalness: 0.3,
  }), []);

  const accentMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#d4b283',
    roughness: 0.4,
    metalness: 0.3,
    emissive: '#b8915f',
    emissiveIntensity: 0.05,
  }), []);

  return (
    <group ref={groupRef}>
      {/* Base cabinets */}
      <mesh position={[0, -0.8, 0]} material={cabinetMat} castShadow receiveShadow>
        <boxGeometry args={[3.2, 1.6, 0.8]} />
      </mesh>

      {/* Cabinet door divisions */}
      {[-1.07, -0.36, 0.36, 1.07].map((x) => (
        <mesh key={x} position={[x, -0.8, 0.41]} material={accentMat}>
          <boxGeometry args={[0.02, 1.55, 0.01]} />
        </mesh>
      ))}

      {/* Countertop */}
      <mesh position={[0, 0.02, 0]} material={countertopMat} castShadow>
        <boxGeometry args={[3.3, 0.06, 0.85]} />
      </mesh>

      {/* Backsplash */}
      <mesh position={[0, 0.55, -0.38]} material={accentMat}>
        <boxGeometry args={[3.2, 0.9, 0.04]} />
      </mesh>

      {/* Upper cabinets */}
      <mesh position={[0, 1.6, -0.2]} material={cabinetMat} castShadow receiveShadow>
        <boxGeometry args={[3.2, 1.2, 0.6]} />
      </mesh>

      {/* Upper cabinet door lines */}
      {[-1.07, -0.36, 0.36, 1.07].map((x) => (
        <mesh key={`upper-${x}`} position={[x, 1.6, 0.11]} material={accentMat}>
          <boxGeometry args={[0.02, 1.15, 0.01]} />
        </mesh>
      ))}

      {/* Brass handles - lower */}
      {[-0.72, 0, 0.72].map((x) => (
        <mesh key={`handle-${x}`} position={[x, -0.8, 0.43]} material={brassMat}>
          <cylinderGeometry args={[0.015, 0.015, 0.25, 8]} />
          <group />
        </mesh>
      ))}

      {/* Brass handles - upper */}
      {[-0.72, 0, 0.72].map((x) => (
        <mesh key={`handle-upper-${x}`} position={[x, 1.6, 0.12]} material={brassMat} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.012, 0.012, 0.2, 8]} />
        </mesh>
      ))}

      {/* Floating accent panel */}
      <mesh position={[0, 2.8, 0]} material={brassMat}>
        <boxGeometry args={[3.5, 0.04, 0.04]} />
      </mesh>

      {/* Soft light strip under upper cabinets */}
      <mesh position={[0, 0.95, 0.05]}>
        <boxGeometry args={[3, 0.02, 0.02]} />
        <meshStandardMaterial
          color="#d4b283"
          emissive="#d4b283"
          emissiveIntensity={0.8}
          roughness={1}
        />
      </mesh>
    </group>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(60 * 3);
    for (let i = 0; i < 60; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.elapsedTime * 0.02;
      const posAttr = particlesRef.current.geometry.attributes.position;
      for (let i = 0; i < 60; i++) {
        const y = posAttr.array[i * 3 + 1] as number;
        posAttr.array[i * 3 + 1] = y + Math.sin(clock.elapsedTime + i) * 0.001;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={60}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#d4b283"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default function KitchenScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 5, 4]} intensity={1.2} castShadow />
      <pointLight position={[-3, 2, 3]} intensity={0.5} color="#d4b283" />
      <pointLight position={[0, 3, 2]} intensity={0.3} color="#b8915f" />

      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
        <KitchenModule />
      </Float>

      <FloatingParticles />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
        enableDamping
        dampingFactor={0.05}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
      />

      <Environment preset="apartment" />
    </Canvas>
  );
}
