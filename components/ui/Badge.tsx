import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ 
    className, 
    variant = 'secondary', 
    size = 'md', 
    icon,
    children, 
    ...props 
  }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center font-semibold 
      transition-all duration-200 rounded-full
    `;
    
    const variants = {
      primary: `
        bg-gradient-to-r from-primary-500 to-primary-600
        text-white border border-primary-500/20 shadow-sm
        hover:from-primary-600 hover:to-primary-700
      `,
      secondary: `
        bg-secondary-100 text-secondary-700 border border-secondary-200
        hover:bg-secondary-200 hover:border-secondary-300
      `,
      success: `
        bg-gradient-to-r from-success-500 to-success-600
        text-white border border-success-500/20 shadow-sm
        hover:from-success-600 hover:to-success-700
      `,
      warning: `
        bg-gradient-to-r from-warning-500 to-warning-600
        text-white border border-warning-500/20 shadow-sm
        hover:from-warning-600 hover:to-warning-700
      `,
      error: `
        bg-gradient-to-r from-error-500 to-error-600
        text-white border border-error-500/20 shadow-sm
        hover:from-error-600 hover:to-error-700
      `,
      info: `
        bg-gradient-to-r from-primary-400 to-primary-500
        text-white border border-primary-400/20 shadow-sm
        hover:from-primary-500 hover:to-primary-600
      `,
      outline: `
        bg-transparent border border-primary-500 text-primary-700
        hover:bg-primary-50 hover:border-primary-600
      `
    };

    const sizes = {
      sm: 'px-2.5 py-1 text-xs gap-1',
      md: 'px-3 py-1.5 text-sm gap-1.5',
      lg: 'px-4 py-2 text-base gap-2'
    };

    return (
      <span
        className={cn(
          baseStyles, 
          variants[variant], 
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {icon && (
          <span className="flex-shrink-0">
            {icon}
          </span>
        )}
        <span>{children}</span>
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;