import SceneCanvas from './SceneCanvas';
import HeroScene from './HeroScene';

export default function HeroVisual() {
  return (
    <SceneCanvas className="absolute inset-0 -z-10 h-full w-full" camera={{ position: [0, 0.2, 7.4], fov: 45 }}>
      <HeroScene />
    </SceneCanvas>
  );
}
