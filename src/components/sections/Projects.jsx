import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { projects } from '../../data/portfolio';
import SectionHeading from '../common/SectionHeading';
import { cn } from '../../utils/cn';

gsap.registerPlugin(ScrollTrigger);

const accentMap = {
  cyan: {
    glow: 'from-cyan/35 via-mint/18 to-transparent',
    text: 'text-cyan',
    ring: 'group-hover:border-cyan/55',
    dot: 'bg-cyan',
  },
  coral: {
    glow: 'from-coral/35 via-cyan/14 to-transparent',
    text: 'text-coral',
    ring: 'group-hover:border-coral/55',
    dot: 'bg-coral',
  },
  mint: {
    glow: 'from-mint/32 via-cyan/16 to-transparent',
    text: 'text-mint',
    ring: 'group-hover:border-mint/55',
    dot: 'bg-mint',
  },
  violet: {
    glow: 'from-violet/35 via-cyan/12 to-transparent',
    text: 'text-violet',
    ring: 'group-hover:border-violet/55',
    dot: 'bg-violet',
  },
};

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const accent = accentMap[project.accent] || accentMap.cyan;
  const isOffset = index % 2 === 1;
  const showImage = project.thumbnail && !imageFailed;
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawGlowOpacity = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 180, damping: 22, mass: 0.35 });
  const rotateY = useSpring(rawRotateY, { stiffness: 180, damping: 22, mass: 0.35 });
  const glowOpacity = useSpring(rawGlowOpacity, { stiffness: 160, damping: 24 });

  const handlePointerMove = (event) => {
    const card = cardRef.current;
    if (!card || window.matchMedia('(hover: none)').matches) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;

    rawRotateX.set(py * -7);
    rawRotateY.set(px * 8);
    rawGlowOpacity.set(1);
    card.style.setProperty('--cursor-x', `${x}px`);
    card.style.setProperty('--cursor-y', `${y}px`);
  };

  const handlePointerLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    rawGlowOpacity.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      data-project-card
      data-cursor="project"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      initial={{ opacity: 0, y: 34, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.75, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10, scale: 1.01 }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
        '--cursor-x': '50%',
        '--cursor-y': '50%',
      }}
      className={cn(
        'group relative isolate overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] p-4 shadow-panel backdrop-blur-xl transition-colors duration-500 sm:p-5',
        accent.ring,
        isOffset && 'lg:translate-y-12',
      )}
    >
      <div className="absolute -inset-px -z-10 rounded-[28px] bg-gradient-to-br from-white/16 via-white/0 to-white/8 opacity-70" />
      <div
        className={cn(
          'absolute -inset-24 -z-10 bg-gradient-to-br opacity-0 blur-3xl transition duration-700 group-hover:opacity-100',
          accent.glow,
        )}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0"
        style={{
          opacity: glowOpacity,
          background:
            'radial-gradient(420px circle at var(--cursor-x) var(--cursor-y), rgba(93,242,255,0.18), rgba(255,255,255,0.05) 28%, transparent 62%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition duration-1000 group-hover:translate-x-full group-hover:opacity-100" />

      <div
        className="relative aspect-[1.55] overflow-hidden rounded-[22px] border border-white/10 bg-[#070c13]"
        data-project-thumb
        style={{ transform: 'translateZ(34px)' }}
      >
        <div className="absolute inset-0 bg-grid bg-[size:34px_34px] opacity-[0.13]" />
        <motion.div
          aria-hidden="true"
          className={cn('absolute -left-12 top-8 size-48 rounded-full bg-gradient-to-br blur-3xl', accent.glow)}
          animate={{ x: [0, 36, 8, 0], y: [0, -14, 18, 0], opacity: [0.42, 0.72, 0.48, 0.42] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-8 bottom-8 h-20 rounded-full bg-white/10 blur-2xl"
          animate={{ scaleX: [0.88, 1.08, 0.88], opacity: [0.16, 0.28, 0.16] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.12 }}
        />
        <div className="absolute inset-4 rounded-[18px] border border-white/10 bg-white/[0.025]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.12)_45%,transparent_60%)] opacity-0 transition duration-700 group-hover:opacity-100" />

        {showImage ? (
          <img
            src={project.thumbnail}
            alt={`${project.title} website thumbnail`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageFailed(true)}
            className={cn(
              'absolute inset-0 h-full w-full object-cover opacity-0 transition duration-700 group-hover:scale-[1.035]',
              imageLoaded && 'opacity-100',
            )}
          />
        ) : null}
        {showImage ? <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/12 to-transparent" /> : null}

        <div className="relative z-10 flex h-full flex-col justify-between p-5">
          <div className="flex items-center justify-between">
            <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-white/58 backdrop-blur-md">
              {project.title.split(' ').map((word) => word[0]).join('').slice(0, 4)}
            </span>
            <span className={cn('size-2.5 rounded-full shadow-[0_0_24px_currentColor]', accent.dot)} />
          </div>
          <div className="grid place-items-center">
            <div
              className={cn(
                'grid size-20 place-items-center rounded-3xl border border-white/12 bg-white/[0.06] text-white/72 backdrop-blur-xl transition duration-500 group-hover:scale-105 group-hover:text-white',
                imageLoaded && 'opacity-0',
              )}
            >
              <ImageIcon size={28} />
            </div>
          </div>
          <div className="flex items-end justify-between gap-4">
            <span className="h-px w-24 bg-gradient-to-r from-white/35 to-transparent" />
            <span className="font-mono text-xs text-white/42">0{index + 1}</span>
          </div>
        </div>
      </div>

      <div className="flex min-h-[280px] flex-col px-1 pb-1 pt-6">
        <p className={cn('text-xs font-bold uppercase tracking-[0.24em]', accent.text)}>{project.category}</p>
        <h3 className="mt-3 text-balance font-display text-2xl font-semibold tracking-normal text-white sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-mist">{project.summary}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-medium text-mist transition group-hover:border-white/16 group-hover:text-white"
            >
              {item}
            </span>
          ))}
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          data-magnetic
          data-magnetic-strength="0.09"
          className="mt-auto inline-flex w-fit items-center gap-2 pt-8 text-sm font-bold text-white transition hover:text-cyan"
          aria-label={`Open live website for ${project.title}`}
        >
          Live website
          <span className="grid size-8 place-items-center rounded-full border border-white/10 bg-white/[0.055] transition group-hover:border-cyan/35 group-hover:bg-cyan/10">
            <ExternalLink size={15} />
          </span>
        </a>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const thumbs = gsap.utils.toArray('[data-project-thumb]');

      thumbs.forEach((thumb) => {
        gsap.fromTo(
          thumb,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: thumb,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_16%,rgba(93,242,255,0.11),transparent_30rem),radial-gradient(circle_at_18%_48%,rgba(255,122,107,0.08),transparent_28rem)]" />
      <div className="absolute inset-x-0 top-0 h-px soft-divider" />
      <div className="container-premium relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Selected Work"
            title="Real launches with premium execution across agencies, commerce, AI, and motion."
            copy="A curated project wall for live websites and platforms, shaped around clear outcomes, refined interfaces, and high-end digital presentation."
            className="max-w-4xl"
          />
          <motion.a
            href="#contact"
            whileHover={{ x: 4 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white/[0.045] px-4 py-3 text-sm font-semibold text-white transition hover:border-cyan/40 hover:bg-cyan/10"
          >
            Build the next one <ArrowUpRight size={16} />
          </motion.a>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-7">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
