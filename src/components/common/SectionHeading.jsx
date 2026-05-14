import Reveal from './Reveal';
import { cn } from '../../utils/cn';

export default function SectionHeading({ eyebrow, title, copy, align = 'left', className }) {
  return (
    <Reveal
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-cyan">{eyebrow}</p>
      <h2 className="text-balance font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {copy ? <p className="mt-4 text-base leading-7 text-mist sm:text-lg">{copy}</p> : null}
    </Reveal>
  );
}
