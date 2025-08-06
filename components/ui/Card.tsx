import React from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outline' | 'filled'
  size?: 'sm' | 'md' | 'lg'
  hoverable?: boolean
  clickable?: boolean
  loading?: boolean
  header?: React.ReactNode
  footer?: React.ReactNode
  as?: 'div' | 'article' | 'section'
  children: React.ReactNode
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className,
    variant = 'default',
    size = 'md',
    hoverable = false,
    clickable = false,
    loading = false,
    header,
    footer,
    as: Component = 'div',
    children,
    onClick,
    onKeyDown,
    tabIndex,
    role,
    ...props 
  }, ref) => {
    
    // Handle keyboard interactions for clickable cards
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (clickable && onClick && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault()
        // Use element.click() to trigger a real click event
        e.currentTarget.click()
      }
      onKeyDown?.(e)
    }

    const baseStyles = `
      transition-all duration-200
      ${clickable ? 'cursor-pointer' : ''}
      ${clickable ? 'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2' : ''}
      ${hoverable || clickable ? 'hover:shadow-md hover:border-secondary-300' : ''}
      ${loading ? 'animate-pulse' : ''}
    `

    const variants = {
      default: `
        bg-white border border-secondary-200 shadow-sm
      `,
      elevated: `
        bg-white shadow-md border-0
      `,
      outline: `
        bg-white border-2 border-secondary-300 shadow-none
      `,
      filled: `
        bg-secondary-50 border border-secondary-200 shadow-none
      `
    }

    const sizes = {
      sm: 'p-4 rounded-lg',
      md: 'p-6 rounded-xl',
      lg: 'p-8 rounded-2xl'
    }

    // Determine final props for accessibility
    const finalProps = {
      ...props,
      onClick: clickable ? onClick : undefined,
      onKeyDown: clickable ? handleKeyDown : onKeyDown,
      tabIndex: clickable ? (tabIndex ?? 0) : tabIndex,
      role: clickable ? (role ?? 'button') : role,
    }

    // Adjust padding when header/footer present
    const hasHeaderOrFooter = header || footer
    const contentPadding = hasHeaderOrFooter ? 'p-0' : ''

    // Loading skeleton
    if (loading) {
      return (
        <Component
          ref={ref}
          className={cn(
            baseStyles,
            variants[variant],
            sizes[size],
            contentPadding,
            className
          )}
          {...finalProps}
        >
          <div 
            className="flex flex-col space-y-3"
            role="status"
            aria-label="Loading content"
          >
            <div className="h-4 bg-secondary-200 rounded animate-pulse"></div>
            <div className="h-4 bg-secondary-200 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-secondary-200 rounded animate-pulse w-1/2"></div>
          </div>
        </Component>
      )
    }

    return (
      <Component
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          contentPadding,
          className
        )}
        {...finalProps}
      >
        {header && (
          <div className={`${hasHeaderOrFooter ? 'px-6 pt-6 pb-0' : ''}`}>
            {header}
          </div>
        )}
        
        {children && (
          <div className={`${hasHeaderOrFooter ? 'px-6 py-4' : ''}`}>
            {children}
          </div>
        )}
        
        {footer && (
          <div className={`${hasHeaderOrFooter ? 'px-6 pt-0 pb-6' : ''}`}>
            {footer}
          </div>
        )}
      </Component>
    )
  }
)

Card.displayName = 'Card'

export default Card