import { motion } from 'framer-motion';
import { skills, techStack } from '../../data/portfolio';
import { staggerContainer } from '../../utils/animation';
import SectionHeading from '../common/SectionHeading';
import GlassCard from '../common/GlassCard';
import Reveal from '../common/Reveal';

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-24 sm:py-28">
      <div className="absolute left-0 top-16 h-[420px] w-full bg-[radial-gradient(circle_at_20%_50%,rgba(133,246,200,0.09),transparent_34rem)]" />
      <div className="container-premium relative z-10">
        <SectionHeading
          eyebrow="Capabilities"
          title="Engineering breadth with a premium frontend edge."
          copy="The stack is shaped for production: clean component systems, API-backed flows, WordPress commerce, speed, SEO, and motion that supports the story."
          align="center"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid gap-4 md:grid-cols-2"
        >
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <GlassCard key={skill.group} className="p-6">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{skill.group}</h3>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-sm text-mist"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid size-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-cyan/10 text-cyan">
                    <Icon size={22} />
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </motion.div>

        <Reveal className="mt-10 overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.035] py-5">
          <div className="flex min-w-max animate-[marquee_26s_linear_infinite] gap-3 px-5 hover:[animation-play-state:paused]">
            {[...techStack, ...techStack].map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div
                  key={`${tech.label}-${index}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm text-white"
                >
                  <Icon size={16} className="text-cyan" />
                  {tech.label}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
