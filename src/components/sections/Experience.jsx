import { experience, process } from '../../data/portfolio';
import SectionHeading from '../common/SectionHeading';
import GlassCard from '../common/GlassCard';
import Reveal from '../common/Reveal';

export default function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-28">
      <div className="container-premium">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Experience"
            title="A practical path from idea to launch."
            copy="The work spans business sites, commerce experiences, frontend motion, and full-stack systems for clients who need clarity and momentum."
          />

          <div className="relative">
            <div className="absolute left-5 top-4 hidden h-[calc(100%-2rem)] w-px bg-white/10 sm:block" />
            <div className="grid gap-4">
              {experience.map((item, index) => (
                <Reveal key={item.role} delay={index * 0.05}>
                  <div className="relative grid gap-4 sm:grid-cols-[2.5rem_1fr]">
                    <div className="hidden pt-6 sm:block">
                      <span className="relative z-10 grid size-10 place-items-center rounded-full border border-cyan/30 bg-ink text-sm font-bold text-cyan">
                        {index + 1}
                      </span>
                    </div>
                    <GlassCard className="p-6">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-white">{item.role}</h3>
                          <p className="text-sm text-cyan">{item.company}</p>
                        </div>
                        <span className="w-fit rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-mist">
                          {item.period}
                        </span>
                      </div>
                      <ul className="mt-5 grid gap-3 text-sm leading-6 text-mist">
                        {item.points.map((point) => (
                          <li key={point} className="flex gap-3">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </GlassCard>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-4">
          {process.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={index * 0.04}>
                <div className="h-full rounded-[22px] border border-white/10 bg-white/[0.035] p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <Icon size={20} className="text-cyan" />
                    <span className="text-xs font-bold text-white/40">0{index + 1}</span>
                  </div>
                  <h3 className="font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-mist">{step.copy}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
