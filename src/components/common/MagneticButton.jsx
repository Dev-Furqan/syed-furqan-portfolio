import { useRef } from 'react';
import { cn } from '../../utils/cn';

export default function MagneticButton({ as: Component = 'button', className, children, ...props }) {
  const ref = useRef(null);

  const handleMove = (event) => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    node.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  };

  const handleLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'translate(0px, 0px)';
    }
  };

  return (
    <Component
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cn('transition-transform duration-200 ease-out will-change-transform', className)}
      {...props}
    >
      {children}
    </Component>
  );
}
