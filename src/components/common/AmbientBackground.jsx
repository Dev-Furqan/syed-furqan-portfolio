import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const AmbientVisual = lazy(() => import('../three/AmbientVisual'));

export default function AmbientBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute left-[-12%] top-[8%] size-[34rem] rounded-full bg-cyan/[0.075] blur-3xl"
        animate={reduceMotion ? undefined : { x: [0, 34, -18, 0], y: [0, 22, -12, 0], opacity: [0.45, 0.72, 0.5, 0.45] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[2%] right-[-10%] size-[30rem] rounded-full bg-coral/[0.055] blur-3xl"
        animate={reduceMotion ? undefined : { x: [0, -36, 18, 0], y: [0, -18, 22, 0], opacity: [0.38, 0.62, 0.44, 0.38] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.035),transparent_34rem)]" />
      <div className="noise-overlay absolute inset-0 opacity-[0.07]" />
      {!reduceMotion ? (
        <Suspense fallback={null}>
          <AmbientVisual />
        </Suspense>
      ) : null}
    </div>
  );
}
