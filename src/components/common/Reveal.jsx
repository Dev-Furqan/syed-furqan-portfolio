import { motion } from 'framer-motion';
import { fadeUp } from '../../utils/animation';
import { cn } from '../../utils/cn';

export default function Reveal({ children, className, delay = 0, as = 'div' }) {
  const Component = motion[as] || motion.div;

  return (
    <Component
      className={cn(className)}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
