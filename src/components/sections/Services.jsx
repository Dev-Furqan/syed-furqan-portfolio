import { services } from '../../data/portfolio';
import SectionHeading from '../common/SectionHeading';
import GlassCard from '../common/GlassCard';
import Reveal from '../common/Reveal';

export default function Services() {
  return (
    <section id="services" className="py-24 sm:py-28">
      <div className="container-premium">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <SectionHeading
            eyebrow="Services"
            title="Web development services for launches that need polish and precision."
            copy="From a fast WordPress presence to a full MERN product, the service mix is built around strong UX, clean implementation, and measurable business outcomes."
          />
          <Reveal className="rounded-[26px] border border-white/10 bg-white/[0.035] p-5 text-sm leading-6 text-mist">
            Available for business websites, store launches, redesigns, frontend polish, performance cleanup, and custom full-stack builds.
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={index * 0.05}>
                <GlassCard className="h-full p-6">
                  <div className="flex items-start gap-5">
                    <div className="grid size-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-cyan/10 text-cyan">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-mist">{service.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {service.outcomes.map((outcome) => (
                          <span key={outcome} className="rounded-full bg-white/[0.055] px-3 py-1.5 text-xs text-mist">
                            {outcome}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
