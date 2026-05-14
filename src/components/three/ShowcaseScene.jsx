import { Float, MeshReflectorMaterial, RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import FloatingGeometry from './FloatingGeometry';

function OrbitingNodes() {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.34;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.22) * 0.18;
  });

  return (
    <group ref={group}>
      {[0, 1, 2, 3, 4, 5].map((item) => {
        const angle = (item / 6) * Math.PI * 2;
        return (
          <mesh key={item} position={[Math.cos(angle) * 2.2, Math.sin(angle) * 0.58, Math.sin(angle) * 2.2]}>
            <sphereGeometry args={[0.08, 24, 24]} />
            <meshStandardMaterial color={item % 2 ? '#85f6c8' : '#5df2ff'} emissive={item % 2 ? '#103a2b' : '#0b3942'} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function ShowcaseScene() {
  const sceneRef = useRef(null);
  const lightRef = useRef(null);

  useFrame((state) => {
    const pointer = state.pointer;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, pointer.x * 0.32, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 0.3 + pointer.y * 0.16, 0.04);
    state.camera.lookAt(0, 0, 0);

    if (sceneRef.current) {
      sceneRef.current.rotation.y = THREE.MathUtils.lerp(sceneRef.current.rotation.y, pointer.x * 0.1, 0.04);
      sceneRef.current.rotation.x = THREE.MathUtils.lerp(sceneRef.current.rotation.x, pointer.y * -0.055, 0.04);
    }

    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, -2.5 + pointer.x * 1.4, 0.08);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, 1.5 + pointer.y * 0.9, 0.08);
    }
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 6, 4]} intensity={2.6} />
      <pointLight ref={lightRef} position={[-2.5, 1.5, 3]} intensity={3} color="#5df2ff" />
      <pointLight position={[3, 0, 2]} intensity={1.8} color="#ff7a6b" />
      <group ref={sceneRef}>
        <Float speed={1.3} rotationIntensity={0.28} floatIntensity={0.35}>
          <group position={[-0.62, 0.12, 0]} rotation={[0.08, -0.35, 0]}>
            <RoundedBox args={[0.26, 1.45, 0.18]} radius={0.045} smoothness={6} position={[-0.52, 0, 0]}>
              <meshStandardMaterial color="#e9eef7" roughness={0.24} metalness={0.72} />
            </RoundedBox>
            <RoundedBox args={[0.26, 1.7, 0.18]} radius={0.045} smoothness={6} position={[0, 0, 0]} rotation={[0, 0, -0.58]}>
              <meshStandardMaterial color="#5df2ff" emissive="#08343a" roughness={0.22} metalness={0.64} />
            </RoundedBox>
            <RoundedBox args={[0.26, 1.45, 0.18]} radius={0.045} smoothness={6} position={[0.52, 0, 0]}>
              <meshStandardMaterial color="#e9eef7" roughness={0.24} metalness={0.72} />
            </RoundedBox>
          </group>
        </Float>
        <OrbitingNodes />
        <FloatingGeometry position={[-2.75, 0.72, -0.8]} scale={0.42} color="#85f6c8" />
        <FloatingGeometry position={[2.9, -0.72, -0.5]} scale={0.38} color="#ff7a6b" variant="torus" />
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.35, 0]}>
        <planeGeometry args={[8, 8]} />
        <MeshReflectorMaterial
          blur={[280, 100]}
          resolution={512}
          mixBlur={0.8}
          mixStrength={0.6}
          roughness={0.75}
          depthScale={0.8}
          minDepthThreshold={0.35}
          maxDepthThreshold={1.4}
          color="#080d15"
          metalness={0.55}
        />
      </mesh>
    </>
  );
}
