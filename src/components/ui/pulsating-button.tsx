import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface PulsatingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string;
  duration?: string;
}

export default function PulsatingButton({
  className,
  children,
  // pulseColor = '#0096ff',
  // pulseColor = '#B22222',
  pulseColor = '#7f1d1d',
  duration = '1.5s',
  ...props
}: PulsatingButtonProps) {
  return (
    <button
      className={cn(
        'relative flex cursor-pointer items-center justify-center rounded-lg bg-red-700 px-6 py-3 text-lg font-bold text-white dark:bg-red-700 dark:text-black',
        className
      )}
      style={
        {
          '--pulse-color': pulseColor,
          '--duration': duration,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className='relative z-10'>{children}</div>
      <div className='absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-lg bg-inherit' />
    </button>
  );
}
