import { Code2, Gem, Gauge, ShoppingBag } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import GlassCard from '../common/GlassCard';
import { SITE } from '../../constants/site';

const pillars = [
  {
    icon: Gem,
    title: 'Premium Interface Taste',
    copy: 'Quiet layouts, crisp hierarchy, tactile motion, and interaction details that make a site feel expensive without getting heavy.',
  },
  {
    icon: Code2,
    title: 'Full-Stack Delivery',
    copy: 'React interfaces connected to Express APIs, MongoDB data models, validation, contact workflows, and deployment-ready structure.',
  },
  {
    icon: ShoppingBag,
    title: 'Commerce Thinking',
    copy: 'WooCommerce builds shaped around product clarity, trust, mobile checkout, speed, and measurable conversion paths.',
  },
  {
    icon: Gauge,
    title: 'Performance Mindset',
    copy: 'Frontend polish paired with SEO foundations, accessible markup, responsive media rules, and fast loading experiences.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-28">
      <div className="absolute inset-x-0 top-0 h-px soft-divider" />
      <div className="container-premium grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
        <SectionHeading
          eyebrow="Profile"
          title="A developer portfolio built around execution, not decoration."
          copy={`${SITE.name} builds modern web products from Karachi, combining MERN engineering with WordPress and WooCommerce delivery for brands that need polished digital systems.`}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={index * 0.05}>
                <GlassCard className="h-full p-6">
                  <div className="mb-5 grid size-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.055] text-cyan">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-mist">{pillar.copy}</p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
