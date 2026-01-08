'use client';

import { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: 'check' | 'close' | 'app';
  className?: string;
}

export default function Icon({ name, className = '', ...props }: IconProps) {
  const baseClasses = 'flex-shrink-0 ' + className;
  
  const icons = {
    check: (
      <svg
        className={baseClasses}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
    close: (
      <svg
        className={baseClasses}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ),
    app: (
      <svg
        className={baseClasses}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    )
  };
  
  return icons[name] || null;
}