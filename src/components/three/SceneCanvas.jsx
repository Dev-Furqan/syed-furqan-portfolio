import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, PerformanceMonitor } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function SceneCanvas({ children, camera = { position: [0, 0, 7], fov: 45 }, className }) {
  const reduceMotion = useReducedMotion();
  const [dpr, setDpr] = useState(1.5);

  return (
    <div className={className} data-visual-canvas>
      <Canvas
        camera={camera}
        dpr={reduceMotion ? 1 : dpr}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={reduceMotion ? 'demand' : 'always'}
      >
        <Suspense fallback={null}>{children}</Suspense>
        <AdaptiveDpr pixelated />
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(1.75)}
        />
      </Canvas>
    </div>
  );
}
