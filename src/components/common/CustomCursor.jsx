import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMagneticHover } from '../../hooks/useMagneticHover';
import { cn } from '../../utils/cn';

const interactiveSelector = [
  'a',
  'button',
  'input',
  'textarea',
  'select',
  '[role="button"]',
  '[data-cursor]',
  '[data-project-card]',
].join(',');

const variants = {
  default: {
    ring: 'size-10 border-cyan/42 bg-cyan/[0.035]',
    dot: 'size-2 bg-cyan',
    scale: 1,
  },
  link: {
    ring: 'size-16 border-white/55 bg-white/[0.055]',
    dot: 'size-2.5 bg-white',
    scale: 1.02,
  },
  project: {
    ring: 'size-24 border-cyan/55 bg-cyan/[0.065]',
    dot: 'size-2.5 bg-mint',
    scale: 1.04,
  },
  text: {
    ring: 'h-12 w-7 border-mint/50 bg-mint/[0.04]',
    dot: 'size-1.5 bg-mint',
    scale: 1,
  },
};

export default function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const rafRef = useRef(null);
  const mouse = useRef({ x: -120, y: -120 });
  const dot = useRef({ x: -120, y: -120 });
  const ring = useRef({ x: -120, y: -120 });
  const variantRef = useRef('default');
  const [variant, setVariant] = useState('default');
  const [visible, setVisible] = useState(false);
  const [ripples, setRipples] = useState([]);

  useMagneticHover();

  useEffect(() => {
    if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return undefined;

    document.body.classList.add('has-custom-cursor');

    const setVariantFromTarget = (target) => {
      const element = target?.closest?.(interactiveSelector);
      let next = 'default';

      if (element?.matches?.('input, textarea, select')) next = 'text';
      else if (element?.closest?.('[data-project-card]') || element?.dataset?.cursor === 'project') next = 'project';
      else if (element) next = 'link';

      if (variantRef.current !== next) {
        variantRef.current = next;
        setVariant(next);
      }
    };

    const move = (event) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
      setVisible(true);
      setVariantFromTarget(event.target);
    };

    const leave = () => setVisible(false);

    const down = (event) => {
      const id = `${Date.now()}-${event.clientX}`;
      setRipples((current) => [...current.slice(-2), { id, x: event.clientX, y: event.clientY }]);
      window.setTimeout(() => {
        setRipples((current) => current.filter((ripple) => ripple.id !== id));
      }, 720);
    };

    const tick = () => {
      dot.current.x += (mouse.current.x - dot.current.x) * 0.42;
      dot.current.y += (mouse.current.y - dot.current.y) * 0.42;
      ring.current.x += (mouse.current.x - ring.current.x) * 0.16;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.16;

      const current = variants[variantRef.current] || variants.default;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0) translate(-50%, -50%) scale(${current.scale})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) scale(${current.scale})`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerleave', leave);
    window.addEventListener('pointerdown', down, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointerdown', down);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  const current = variants[variant] || variants.default;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className={cn(
          'pointer-events-none fixed left-0 top-0 z-[80] hidden -translate-x-1/2 -translate-y-1/2 rounded-full border shadow-[0_0_36px_rgba(93,242,255,0.22)] backdrop-blur-[1px] transition-[width,height,border-color,background-color,opacity] duration-300 ease-out mix-blend-screen lg:block',
          visible ? 'opacity-100' : 'opacity-0',
          current.ring,
        )}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className={cn(
          'pointer-events-none fixed left-0 top-0 z-[81] hidden -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_22px_currentColor] transition-[width,height,background-color,opacity] duration-200 lg:block',
          visible ? 'opacity-100' : 'opacity-0',
          current.dot,
        )}
      />
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          aria-hidden="true"
          className="pointer-events-none fixed z-[79] size-6 -translate-x-1/2 -translate-y-1/2 animate-cursor-ripple rounded-full border border-cyan/45"
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}
    </>
  );
}
