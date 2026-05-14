import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { SITE } from '../../constants/site';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#04060b] py-12">
      <div className="container-premium grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl border border-white/15 bg-white/[0.06] text-sm font-black text-white">
              SF
            </span>
            <div>
              <p className="font-semibold text-white">{SITE.name}</p>
              <p className="text-sm text-mist">{SITE.studio}</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-6 text-mist">
            Premium web experiences for founders, startups, and commerce brands that need fast, polished, conversion-focused digital products.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Contact</p>
          <div className="mt-4 grid gap-3 text-sm text-mist">
            <a href={`mailto:${SITE.email}`} data-magnetic data-magnetic-strength="0.08" className="inline-flex items-center gap-2 transition hover:text-white">
              <Mail size={16} /> {SITE.email}
            </a>
            <a href={`tel:${SITE.phone}`} data-magnetic data-magnetic-strength="0.08" className="inline-flex items-center gap-2 transition hover:text-white">
              <Phone size={16} /> {SITE.phone}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} /> {SITE.location}
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Social</p>
          <div className="mt-4 grid gap-3 text-sm text-mist">
            <a href={SITE.socials.github} data-magnetic data-magnetic-strength="0.08" className="inline-flex items-center gap-2 transition hover:text-white">
              <Github size={16} /> GitHub <ArrowUpRight size={14} />
            </a>
            <a href={SITE.socials.linkedin} data-magnetic data-magnetic-strength="0.08" className="inline-flex items-center gap-2 transition hover:text-white">
              <Linkedin size={16} /> LinkedIn <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
      <div className="container-premium mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
        <span>Built with React, Three.js, Node.js, Express, and MongoDB.</span>
      </div>
    </footer>
  );
}
