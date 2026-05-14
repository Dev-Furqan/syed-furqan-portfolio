import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function seeded(index, salt) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function AmbientObjects() {
  const groupRef = useRef(null);
  const wireRef = useRef(null);
  const lightRef = useRef(null);
  const particles = useMemo(() => {
    const count = 95;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (seeded(i, 1) - 0.5) * 11;
      positions[i * 3 + 1] = (seeded(i, 2) - 0.5) * 7;
      positions[i * 3 + 2] = (seeded(i, 3) - 0.5) * 5;
    }

    return positions;
  }, []);

  useFrame((state) => {
    const pointer = state.pointer;
    const scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scroll = window.scrollY / scrollMax;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, pointer.x * 0.45, 0.035);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, pointer.y * 0.22, 0.035);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 7.2 + scroll * 1.2, 0.025);
    state.camera.lookAt(0, 0, 0);

    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, pointer.y * 0.08 + scroll * 0.18, 0.04);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.12 + scroll * 0.28, 0.04);
    }

    if (wireRef.current) {
      wireRef.current.rotation.x += 0.0018;
      wireRef.current.rotation.y += 0.0025;
    }

    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, pointer.x * 4, 0.08);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, pointer.y * 2.2, 0.08);
    }
  });

  return (
    <group ref={groupRef}>
      <pointLight ref={lightRef} position={[0, 1.4, 2.6]} intensity={2.1} color="#5df2ff" />
      <pointLight position={[3.4, -1.2, 1.6]} intensity={1.05} color="#ff7a6b" />
      <Float speed={1.4} rotationIntensity={0.32} floatIntensity={0.48}>
        <mesh position={[-4.2, 1.8, -2.4]} scale={0.74}>
          <sphereGeometry args={[1, 48, 48]} />
          <MeshDistortMaterial color="#5df2ff" transparent opacity={0.18} roughness={0.3} metalness={0.4} distort={0.24} speed={1.8} />
        </mesh>
      </Float>
      <Float speed={1.1} rotationIntensity={0.22} floatIntensity={0.36}>
        <mesh position={[4.35, -1.4, -2.1]} scale={0.58}>
          <icosahedronGeometry args={[1, 2]} />
          <meshStandardMaterial color="#ff7a6b" wireframe transparent opacity={0.18} />
        </mesh>
      </Float>
      <mesh ref={wireRef} position={[2.7, 2.1, -3.1]} scale={0.42}>
        <torusKnotGeometry args={[0.78, 0.18, 90, 10]} />
        <meshStandardMaterial color="#85f6c8" wireframe transparent opacity={0.16} />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.022} color="#e9eef7" transparent opacity={0.34} sizeAttenuation />
      </points>
      <Sparkles count={45} speed={0.22} opacity={0.34} scale={[9, 5, 4]} size={1.6} color="#5df2ff" />
    </group>
  );
}

export default function AmbientVisual() {
  return (
    <Canvas
      className="absolute inset-0 opacity-70"
      camera={{ position: [0, 0, 7.2], fov: 45 }}
      dpr={[1, 1.35]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.42} />
      <AmbientObjects />
    </Canvas>
  );
}
