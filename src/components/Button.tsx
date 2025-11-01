import React from 'react';
import type { ButtonProps } from '@/types/component.types';

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;