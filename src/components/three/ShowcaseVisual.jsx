import SceneCanvas from './SceneCanvas';
import ShowcaseScene from './ShowcaseScene';

export default function ShowcaseVisual() {
  return (
    <SceneCanvas className="absolute inset-0" camera={{ position: [0, 0.3, 6.2], fov: 44 }}>
      <ShowcaseScene />
    </SceneCanvas>
  );
}
