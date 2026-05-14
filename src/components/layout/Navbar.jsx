import { useEffect, useState } from 'react';
import { Github, Linkedin, Menu, X } from 'lucide-react';
import { NAV_LINKS, SITE } from '../../constants/site';
import { cn } from '../../utils/cn';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        aria-label="Primary navigation"
        className={cn(
          'container-premium flex h-16 items-center justify-between rounded-2xl px-4 transition-all duration-300 sm:px-5',
          scrolled ? 'glass shadow-glow' : 'border border-white/10 bg-white/[0.035] backdrop-blur-md',
        )}
      >
        <a href="#home" className="group flex items-center gap-3" aria-label="Go to home section">
          <span className="grid size-9 place-items-center rounded-xl border border-white/15 bg-white/[0.06] text-sm font-black tracking-normal text-white">
            SF
          </span>
          <span className="hidden min-w-0 flex-col xs:flex">
            <span className="text-sm font-semibold text-white">{SITE.name}</span>
            <span className="text-xs text-mist">{SITE.studio}</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-magnetic
              data-magnetic-strength="0.1"
              className="rounded-full px-4 py-2 text-sm text-mist transition hover:bg-white/[0.08] hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={SITE.socials.github}
            aria-label="GitHub profile"
            data-magnetic
            data-magnetic-strength="0.12"
            className="hidden size-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-mist transition hover:border-cyan/40 hover:text-white sm:grid"
          >
            <Github size={18} />
          </a>
          <a
            href={SITE.socials.linkedin}
            aria-label="LinkedIn profile"
            data-magnetic
            data-magnetic-strength="0.12"
            className="hidden size-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-mist transition hover:border-cyan/40 hover:text-white sm:grid"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="#contact"
            data-magnetic
            data-magnetic-strength="0.12"
            className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:bg-cyan sm:inline-flex"
          >
            Start
          </a>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            data-magnetic
            data-magnetic-strength="0.1"
            className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-white lg:hidden"
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          'container-premium mt-3 overflow-hidden rounded-2xl border border-white/10 bg-ink/92 shadow-panel backdrop-blur-xl transition-all duration-300 lg:hidden',
          open ? 'max-h-[440px] opacity-100' : 'max-h-0 border-transparent opacity-0',
        )}
      >
        <div className="grid gap-1 p-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              data-magnetic
              data-magnetic-strength="0.08"
              className="rounded-xl px-4 py-3 text-sm text-mist transition hover:bg-white/[0.06] hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
            <a
              href={SITE.socials.github}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-3 text-sm text-mist"
            >
              <Github size={16} /> GitHub
            </a>
            <a
              href={SITE.socials.linkedin}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-3 text-sm text-mist"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
