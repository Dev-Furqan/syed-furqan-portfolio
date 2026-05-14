import { Suspense, lazy, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, CheckCircle2, MapPin, Phone } from 'lucide-react';
import { highlights } from '../../data/portfolio';
import { SITE } from '../../constants/site';
import GlowButton from '../common/GlowButton';

const HeroVisual = lazy(() => import('../three/HeroVisual'));

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.24 });
  const contentY = useTransform(smoothProgress, [0, 1], [0, 92]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.74], [1, 0.28]);
  const cardY = useTransform(smoothProgress, [0, 1], [0, -72]);
  const glowY = useTransform(smoothProgress, [0, 1], [0, 160]);

  return (
    <section ref={sectionRef} id="home" className="relative isolate min-h-[92svh] overflow-hidden pt-28 depth-preserve">
      <div className="absolute inset-0 -z-20 bg-grid bg-[size:64px_64px] opacity-[0.16]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(93,242,255,0.13),transparent_36rem)]" />
      <motion.div
        aria-hidden="true"
        className="absolute left-[8%] top-[16%] -z-10 size-64 rounded-full bg-cyan/[0.075] blur-3xl"
        style={{ y: glowY }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute right-[8%] top-[26%] -z-10 size-72 rounded-full bg-coral/[0.06] blur-3xl"
        animate={{ x: [0, -26, 12, 0], y: [0, 18, -10, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <Suspense fallback={<div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_65%_35%,rgba(93,242,255,0.13),transparent_28rem)]" />}>
        <HeroVisual />
      </Suspense>

      <div className="container-premium grid min-h-[calc(92svh-7rem)] items-center gap-10 pb-10 lg:grid-cols-[1.06fr_0.94fr]">
        <motion.div className="relative z-10 max-w-4xl" style={{ y: contentY, opacity: contentOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/12 bg-white/[0.045] px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-mist backdrop-blur-md"
          >
            <CheckCircle2 size={15} className="shrink-0 text-mint" />
            <span className="truncate">Founder of {SITE.studio}</span>
          </motion.div>

          <h1 className="text-balance font-display text-[clamp(2.75rem,9vw,7.7rem)] font-semibold leading-[0.92] tracking-normal text-white">
            {['Syed Furqan', 'Ahmed'].map((line, index) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={{ y: '115%', opacity: 0, filter: 'blur(14px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.92, delay: 0.14 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-balance text-lg leading-8 text-mist sm:text-xl"
          >
            MERN Stack Developer, WordPress Developer, WooCommerce Expert, and Frontend Developer creating cinematic, conversion-focused web experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <GlowButton href="#contact">Discuss a project</GlowButton>
            <a
              href="#projects"
              data-magnetic
              data-magnetic-strength="0.12"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/14 bg-white/[0.045] px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan/50 hover:bg-cyan/10"
            >
              View work <ArrowDown size={17} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap gap-3 text-sm text-mist"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2">
              <MapPin size={15} className="text-cyan" /> {SITE.location}
            </span>
            <a
              href={`tel:${SITE.phone}`}
              data-magnetic
              data-magnetic-strength="0.08"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 transition hover:text-white"
            >
              <Phone size={15} className="text-cyan" /> {SITE.phone}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: cardY }}
          className="relative hidden min-h-[540px] lg:block"
          aria-hidden="true"
        >
          <div className="absolute right-4 top-16 w-[min(32vw,380px)] rounded-[28px] border border-white/12 bg-white/[0.05] p-4 shadow-panel backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-coral" />
              <span className="size-2.5 rounded-full bg-mint" />
              <span className="size-2.5 rounded-full bg-cyan" />
            </div>
            <div className="space-y-3 font-mono text-xs text-mist">
              <p><span className="text-cyan">const</span> developer = &#123;</p>
              <p className="pl-4">stack: <span className="text-white">'MERN + WordPress'</span>,</p>
              <p className="pl-4">focus: <span className="text-white">'Premium UX'</span>,</p>
              <p className="pl-4">studio: <span className="text-white">'Nexus Blend'</span></p>
              <p>&#125;;</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="container-premium relative z-10 -mt-4 grid gap-3 pb-8 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.72 + index * 0.08 }}
            data-depth-card
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md"
          >
            <p className="aurora-text text-2xl font-black">{item.value}</p>
            <p className="mt-1 text-sm text-mist">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
