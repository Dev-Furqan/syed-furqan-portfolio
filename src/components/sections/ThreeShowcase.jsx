import { Suspense, lazy, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';

gsap.registerPlugin(ScrollTrigger);

const ShowcaseVisual = lazy(() => import('../three/ShowcaseVisual'));

export default function ThreeShowcase() {
  const sectionRef = useRef(null);
  const canvasWrapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        canvasWrapRef.current,
        { scale: 0.92, opacity: 0.74 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 35%',
            scrub: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(93,242,255,0.055),transparent)]" />
      <div className="container-premium relative z-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="3D System"
            title="Interactive depth without sacrificing usability."
            copy="The scene uses React Three Fiber, Drei, GSAP, and responsive fallbacks to add cinematic texture while keeping the portfolio readable and fast."
          />
          <Reveal className="mt-8 grid gap-3 text-sm text-mist sm:grid-cols-3">
            {['R3F scene graph', 'GSAP scroll sync', 'Reduced-motion aware'].map((item) => (
              <span key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center">
                {item}
              </span>
            ))}
          </Reveal>
        </div>

        <div
          ref={canvasWrapRef}
          className="relative h-[420px] overflow-hidden rounded-[28px] border border-white/10 bg-[#070b12] shadow-panel sm:h-[520px]"
        >
          <div className="absolute inset-0 bg-grid bg-[size:46px_46px] opacity-15" />
          <Suspense fallback={<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(93,242,255,0.12),transparent_18rem)]" />}>
            <ShowcaseVisual />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
