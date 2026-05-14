import { ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { cn } from '../../utils/cn';

export default function GlowButton({ children, href = '#contact', className, icon = true }) {
  return (
    <MagneticButton
      as="a"
      href={href}
      className={cn(
        'group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-5 py-3 text-sm font-bold text-ink shadow-glow transition hover:bg-cyan',
        className,
      )}
    >
      <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-cyan/45 to-transparent transition duration-700 group-hover:translate-x-[100%]" />
      <span className="relative">{children}</span>
      {icon ? <ArrowRight className="relative transition group-hover:translate-x-0.5" size={17} /> : null}
    </MagneticButton>
  );
}
