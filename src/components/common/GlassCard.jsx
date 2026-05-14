import { cn } from '../../utils/cn';

export default function GlassCard({ as: Component = 'div', className, children, ...props }) {
  return (
    <Component data-depth-card className={cn('glass rounded-[22px] p-5', className)} {...props}>
      {children}
    </Component>
  );
}
