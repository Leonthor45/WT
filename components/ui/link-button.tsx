import type { AnchorHTMLAttributes } from 'react';

interface LinkButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'ghost';
}

export function LinkButton({
  variant = 'ghost',
  className = '',
  ...props
}: LinkButtonProps) {

  const baseStyles =
    'inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-all duration-300';

  const variantStyles =
    variant === 'primary'
      ? `
        border-red-700
        bg-red-700
        text-white
        shadow-lg
        hover:bg-red-600
        hover:border-red-500
        hover:shadow-red-700/30
      `
      : `
        border-white/10
        bg-neutral-900
        text-slate-200
        hover:border-red-700
        hover:bg-red-700/20
        hover:text-white
      `;

  return (
    <a
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    />
  );
}