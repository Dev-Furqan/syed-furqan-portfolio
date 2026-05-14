import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-cyan via-mint to-coral"
      style={{ scaleX, width: '100%' }}
    />
  );
}
