import { Environment, Grid, Sparkles, Stars } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import FloatingGeometry from './FloatingGeometry';

function Ribbon() {
  const mesh = useRef();
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-4.2, -0.9, -0.8),
      new THREE.Vector3(-2.1, -0.1, 0.55),
      new THREE.Vector3(0.3, -0.72, 0.9),
      new THREE.Vector3(2.2, -0.04, 0.2),
      new THREE.Vector3(4.1, -0.82, -0.9),
    ]);
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.22) * 0.08;
    mesh.current.material.opacity = 0.24 + Math.sin(state.clock.elapsedTime * 0.7) * 0.04;
  });

  return (
    <mesh ref={mesh} position={[0, -0.16, 0]}>
      <tubeGeometry args={[curve, 120, 0.035, 12, false]} />
      <meshBasicMaterial color="#5df2ff" transparent opacity={0.24} />
    </mesh>
  );
}

function CodeParticles() {
  const points = useRef();
  const particles = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    const seeded = (index, salt) => {
      const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
      return value - Math.floor(value);
    };

    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (seeded(i, 1) - 0.5) * 9;
      positions[i * 3 + 1] = (seeded(i, 2) - 0.5) * 4.8;
      positions[i * 3 + 2] = (seeded(i, 3) - 0.5) * 4;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.025;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.14) * 0.04;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#e9eef7" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function HeroScene() {
  const groupRef = useRef(null);
  const keyLightRef = useRef(null);

  useFrame((state) => {
    const pointer = state.pointer;
    const scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scroll = window.scrollY / scrollMax;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, pointer.x * 0.42, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 0.2 + pointer.y * 0.18 - scroll * 0.24, 0.04);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 7.4 + scroll * 0.65, 0.025);
    state.camera.lookAt(0.2, -0.08, 0);

    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, pointer.y * 0.055, 0.035);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.09, 0.035);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, scroll * -0.22, 0.025);
    }

    if (keyLightRef.current) {
      keyLightRef.current.position.x = THREE.MathUtils.lerp(keyLightRef.current.position.x, 2.5 + pointer.x * 1.2, 0.08);
      keyLightRef.current.position.y = THREE.MathUtils.lerp(keyLightRef.current.position.y, 4.8 + pointer.y * 0.8, 0.08);
    }
  });

  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight ref={keyLightRef} position={[2.5, 4.8, 4.2]} intensity={2.4} color="#ffffff" />
      <pointLight position={[-3, 1.4, 2.3]} intensity={3.5} color="#5df2ff" />
      <pointLight position={[3, -1.2, 2]} intensity={2.2} color="#ff7a6b" />
      <group ref={groupRef}>
        <FloatingGeometry position={[1.65, 0.1, 0]} scale={1.08} color="#5df2ff" />
        <FloatingGeometry position={[3.55, 1.3, -1.4]} scale={0.46} color="#ff7a6b" variant="torus" />
        <mesh position={[-3.35, 1.45, -1.9]} scale={0.38}>
          <octahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color="#85f6c8" wireframe transparent opacity={0.32} />
        </mesh>
        <Ribbon />
        <CodeParticles />
      </group>
      <Sparkles count={115} speed={0.35} opacity={0.55} scale={[8.2, 4.4, 3.6]} size={2.1} color="#5df2ff" />
      <Stars radius={28} depth={18} count={500} factor={2.5} saturation={0} fade speed={0.35} />
      <Grid
        position={[0, -2.25, 0]}
        args={[12, 12]}
        cellSize={0.62}
        cellThickness={0.35}
        cellColor="#224050"
        sectionColor="#5df2ff"
        sectionSize={3}
        fadeDistance={12}
        fadeStrength={1.6}
      />
      <Environment preset="city" />
    </>
  );
}
