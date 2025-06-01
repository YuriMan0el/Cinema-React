'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'danger';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: Variant;
}

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
}: ButtonProps) {
  const baseClasses = 'font-semibold py-2 px-4 rounded-lg shadow transition-all';

  const variantClasses = clsx({
    'bg-[var(--bege-dourado-claro)] text-[var(--foreground)] hover:brightness-90': variant === 'primary',
    'bg-[var(--casca-de-ovo)] text-[var(--foreground)] hover:brightness-90': variant === 'secondary',
    'bg-[var(--terracota-desvanecido)] text-white hover:brightness-90': variant === 'danger',
  });

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses}`}
    >
      {children}
    </button>
  );
}
