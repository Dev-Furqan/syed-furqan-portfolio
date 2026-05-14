import { motion, useSpring } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function CursorGlow() {
  const { x, y } = useMousePosition();
  const reduceMotion = useReducedMotion();
  const smoothX = useSpring(x - 160, { stiffness: 80, damping: 22, mass: 0.3 });
  const smoothY = useSpring(y - 160, { stiffness: 80, damping: 22, mass: 0.3 });

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-30 hidden size-80 rounded-full bg-cyan/10 blur-3xl mix-blend-screen lg:block"
      style={{ x: smoothX, y: smoothY }}
    />
  );
}
