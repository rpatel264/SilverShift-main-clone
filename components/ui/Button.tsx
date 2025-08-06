import React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false,
    loading = false,
    icon,
    iconPosition = 'left',
    children, 
    disabled,
    type = 'button',
    ...props 
  }, ref) => {
    const baseStyles = `
      relative inline-flex items-center justify-center font-semibold
      transition-all duration-200 transform focus:outline-none
      focus-visible:ring-2 focus-visible:ring-offset-2
      disabled:cursor-not-allowed disabled:opacity-50
      hover:scale-[1.02] active:scale-[0.98]
      ${fullWidth ? 'w-full' : ''}
    `

    const variants = {
      primary: `
        bg-primary-600 text-white border border-transparent
        hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/25
        focus-visible:ring-primary-500
      `,
      secondary: `
        bg-white text-secondary-900 font-semibold shadow-md
        border border-secondary-300
        hover:bg-secondary-50 hover:border-secondary-400
        hover:shadow-lg
        focus-visible:ring-secondary-500
      `,
      success: `
        bg-success-600 text-white border border-transparent
        hover:bg-success-700 hover:shadow-lg hover:shadow-success-500/25
        focus-visible:ring-success-500
      `,
      warning: `
        bg-warning-500 text-white border border-transparent
        hover:bg-warning-600 hover:shadow-lg hover:shadow-warning-500/25
        focus-visible:ring-warning-500
      `,
      error: `
        bg-error-600 text-white border border-transparent
        hover:bg-error-700 hover:shadow-lg hover:shadow-error-500/25
        focus-visible:ring-error-500
      `,
      ghost: `
        bg-transparent text-secondary-700 border border-transparent
        hover:bg-secondary-100 hover:text-primary-600
        focus-visible:ring-primary-500
      `,
      outline: `
        bg-transparent border-2 border-primary-500 text-primary-700
        hover:bg-primary-50 hover:border-primary-600 hover:text-primary-800
        focus-visible:ring-primary-500
      `
    }

    const sizes = {
      sm: 'h-9 px-3 text-sm rounded-lg gap-1.5',
      md: 'h-10 px-4 text-sm rounded-lg gap-2',
      lg: 'h-12 px-6 text-base rounded-lg gap-2',
      xl: 'h-14 px-8 text-lg rounded-xl gap-3'
    }

    const loadingSpinner = (
      <svg 
        className="animate-spin h-4 w-4" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
        role="status"
        aria-label="Loading"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    )

    const isDisabled = disabled || loading

    return (
      <button
        className={cn(
          baseStyles, 
          variants[variant], 
          sizes[size], 
          className
        )}
        ref={ref}
        disabled={isDisabled}
        type={type}
        aria-disabled={loading ? 'true' : undefined}
        {...props}
      >
        <span className="relative flex items-center justify-center gap-2">
          {loading ? (
            loadingSpinner
          ) : (
            <>
              {icon && iconPosition === 'left' && <span>{icon}</span>}
              <span>{children}</span>
              {icon && iconPosition === 'right' && <span>{icon}</span>}
            </>
          )}
        </span>
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button