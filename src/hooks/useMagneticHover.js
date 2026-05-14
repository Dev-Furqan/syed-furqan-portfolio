import { useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

const selector = '[data-magnetic]';

export function useMagneticHover() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return undefined;

    const cleanups = [];

    document.querySelectorAll(selector).forEach((element) => {
      const strength = Number(element.dataset.magneticStrength || 0.16);

      const move = (event) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        element.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
      };

      const leave = () => {
        element.style.transform = 'translate3d(0, 0, 0)';
      };

      element.style.transition = 'transform 220ms cubic-bezier(.22,1,.36,1)';
      element.addEventListener('pointermove', move);
      element.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        element.removeEventListener('pointermove', move);
        element.removeEventListener('pointerleave', leave);
        element.style.transform = '';
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [reduceMotion]);
}
