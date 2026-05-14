import { Float, MeshDistortMaterial, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function FloatingGeometry({ position = [0, 0, 0], scale = 1, color = '#5df2ff', variant = 'box' }) {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.38) * 0.22;
    group.current.rotation.y += 0.003;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.52} floatIntensity={0.82}>
      <group ref={group} position={position} scale={scale}>
        {variant === 'torus' ? (
          <mesh>
            <torusKnotGeometry args={[0.72, 0.18, 160, 16]} />
            <MeshDistortMaterial color={color} roughness={0.26} metalness={0.58} distort={0.16} speed={2} />
          </mesh>
        ) : (
          <RoundedBox args={[1.45, 1.45, 1.45]} radius={0.18} smoothness={8}>
            <MeshTransmissionMaterial
              backside
              samples={6}
              thickness={0.8}
              roughness={0.18}
              metalness={0.1}
              transmission={0.78}
              ior={1.35}
              chromaticAberration={0.15}
              color={color}
            />
          </RoundedBox>
        )}
      </group>
    </Float>
  );
}
