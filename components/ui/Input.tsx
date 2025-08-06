import React, { useId } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'error' | 'success'
  size?: 'sm' | 'md' | 'lg'
  label?: string
  helperText?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className,
    variant = 'default',
    size = 'md',
    label,
    helperText,
    error,
    leftIcon,
    rightIcon,
    id,
    required,
    type = 'text',
    disabled,
    readOnly,
    onFocus,
    onBlur,
    ...props 
  }, ref) => {
    const generatedId = useId()
    const inputId = id || `input-${generatedId}`
    const helperTextId = `${inputId}-helper`
    const errorId = `${inputId}-error`

    // Determine final variant based on error prop
    const finalVariant = error ? 'error' : variant

    const baseStyles = `
      w-full border transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-1
      disabled:bg-secondary-100 disabled:cursor-not-allowed disabled:opacity-50
      placeholder:text-secondary-400
    `

    const variants = {
      default: `
        bg-white border-secondary-300 text-secondary-900
        hover:border-secondary-400
        focus:border-primary-500 focus:ring-primary-500/20
      `,
      error: `
        bg-white border-error-500 text-error-700
        hover:border-error-600
        focus:border-error-500 focus:ring-error-500/20
      `,
      success: `
        bg-white border-success-500 text-success-700
        hover:border-success-600
        focus:border-success-500 focus:ring-success-500/20
      `
    }

    const sizes = {
      sm: 'h-9 px-3 text-sm rounded-lg',
      md: 'h-10 px-4 text-base rounded-lg',
      lg: 'h-12 px-4 text-lg rounded-lg'
    }

    // Adjust padding when icons are present
    const getIconPadding = () => {
      let leftPadding = ''
      let rightPadding = ''
      
      if (leftIcon) {
        leftPadding = 'pl-10'
      }
      if (rightIcon) {
        rightPadding = 'pr-10'
      }
      
      return `${leftPadding} ${rightPadding}`.trim()
    }

    // Handle readonly state
    const readOnlyStyles = readOnly ? 'bg-secondary-50' : ''

    // Determine aria-describedby
    const getAriaDescribedBy = () => {
      if (error) return errorId
      if (helperText) return helperTextId
      return undefined
    }

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-secondary-700 mb-2"
          >
            {label}
            {required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            type={type}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            className={cn(
              baseStyles,
              variants[finalVariant],
              sizes[size],
              getIconPadding(),
              readOnlyStyles,
              className
            )}
            onFocus={onFocus}
            onBlur={onBlur}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={getAriaDescribedBy()}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Helper Text */}
        {helperText && !error && (
          <p 
            id={helperTextId}
            className="mt-2 text-sm text-secondary-600"
          >
            {helperText}
          </p>
        )}

        {/* Error Message */}
        {error && (
          <p 
            id={errorId}
            className="mt-2 text-sm text-error-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input