import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function useScrollCinematics() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('section:not(#home)').forEach((section) => {
        gsap.fromTo(
          section,
          { autoAlpha: 0.92, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            immediateRender: false,
            clearProps: 'opacity,visibility,transform',
            scrollTrigger: {
              trigger: section,
              start: 'top 82%',
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray('[data-depth-card]').forEach((element, index) => {
        gsap.fromTo(
          element,
          { yPercent: index % 2 ? 5 : -4 },
          {
            yPercent: index % 2 ? -3 : 4,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, [reduceMotion]);
}
