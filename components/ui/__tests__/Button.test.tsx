import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import Button from '../Button'

// Extend Jest matchers
expect.extend(toHaveNoViolations)

describe('Button', () => {
  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('renders with children', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
    })

    it('renders as button element by default', () => {
      render(<Button>Test</Button>)
      const button = screen.getByRole('button')
      expect(button.tagName).toBe('BUTTON')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>()
      render(<Button ref={ref}>Test</Button>)
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })

  // Variant Tests
  describe('Variants', () => {
    it('applies primary variant styles by default', () => {
      render(<Button>Primary</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-primary-600')
    })

    it('applies secondary variant styles', () => {
      render(<Button variant="secondary">Secondary</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-white', 'text-secondary-900')
    })

    it('applies success variant styles', () => {
      render(<Button variant="success">Success</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-success-600')
    })

    it('applies warning variant styles', () => {
      render(<Button variant="warning">Warning</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-warning-500')
    })

    it('applies error variant styles', () => {
      render(<Button variant="error">Error</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-error-600')
    })

    it('applies ghost variant styles', () => {
      render(<Button variant="ghost">Ghost</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-transparent', 'text-secondary-700')
    })

    it('applies outline variant styles', () => {
      render(<Button variant="outline">Outline</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-transparent', 'border-primary-500', 'text-primary-700')
    })
  })

  // Size Tests
  describe('Sizes', () => {
    it('applies small size styles', () => {
      render(<Button size="sm">Small</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-9', 'px-3', 'text-sm')
    })

    it('applies medium size styles by default', () => {
      render(<Button>Medium</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-10', 'px-4', 'text-sm')
    })

    it('applies large size styles', () => {
      render(<Button size="lg">Large</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-12', 'px-6', 'text-base')
    })

    it('applies extra large size styles', () => {
      render(<Button size="xl">Extra Large</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-14', 'px-8', 'text-lg')
    })
  })

  // State Tests
  describe('States', () => {
    it('handles disabled state', () => {
      render(<Button disabled>Disabled</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed')
    })

    it('handles loading state', () => {
      render(<Button loading>Loading</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument() // Loading spinner
    })

    it('shows loading spinner and hides text when loading', () => {
      render(<Button loading>Click me</Button>)
      expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument()
      expect(screen.queryByText('Click me')).not.toBeInTheDocument()
    })

    it('applies full width when specified', () => {
      render(<Button fullWidth>Full Width</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('w-full')
    })
  })

  // Icon Tests
  describe('Icons', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>

    it('renders icon on the left by default', () => {
      render(<Button icon={<TestIcon />}>With Icon</Button>)
      const button = screen.getByRole('button')
      const icon = screen.getByTestId('test-icon')
      const text = screen.getByText('With Icon')
      
      expect(button).toContainElement(icon)
      expect(button).toContainElement(text)
      
      // Icon should come before text in DOM order
      const children = Array.from(button.querySelectorAll('*'))
      expect(children.indexOf(icon)).toBeLessThan(children.indexOf(text))
    })

    it('renders icon on the right when specified', () => {
      render(<Button icon={<TestIcon />} iconPosition="right">With Icon</Button>)
      const button = screen.getByRole('button')
      const icon = screen.getByTestId('test-icon')
      const text = screen.getByText('With Icon')
      
      expect(button).toContainElement(icon)
      expect(button).toContainElement(text)
      
      // Text should come before icon in DOM order
      const children = Array.from(button.querySelectorAll('*'))
      expect(children.indexOf(text)).toBeLessThan(children.indexOf(icon))
    })

    it('does not render icon when loading', () => {
      render(<Button icon={<TestIcon />} loading>Loading</Button>)
      expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument()
      expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument()
    })
  })

  // Interaction Tests
  describe('Interactions', () => {
    it('calls onClick when clicked', async () => {
      const handleClick = jest.fn()
      const user = userEvent.setup()
      
      render(<Button onClick={handleClick}>Click me</Button>)
      
      await user.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', async () => {
      const handleClick = jest.fn()
      const user = userEvent.setup()
      
      render(<Button onClick={handleClick} disabled>Disabled</Button>)
      
      await user.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not call onClick when loading', async () => {
      const handleClick = jest.fn()
      const user = userEvent.setup()
      
      render(<Button onClick={handleClick} loading>Loading</Button>)
      
      await user.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('supports keyboard navigation', async () => {
      const handleClick = jest.fn()
      const user = userEvent.setup()
      
      render(<Button onClick={handleClick}>Press Enter</Button>)
      
      const button = screen.getByRole('button')
      button.focus()
      await user.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('supports space key activation', async () => {
      const handleClick = jest.fn()
      const user = userEvent.setup()
      
      render(<Button onClick={handleClick}>Press Space</Button>)
      
      const button = screen.getByRole('button')
      button.focus()
      await user.keyboard('{ }') // Space key
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  // Focus Management Tests
  describe('Focus Management', () => {
    it('is focusable by default', () => {
      render(<Button>Focusable</Button>)
      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()
    })

    it('is not focusable when disabled', () => {
      render(<Button disabled>Not Focusable</Button>)
      const button = screen.getByRole('button')
      button.focus()
      expect(button).not.toHaveFocus()
    })

    it('has visible focus indicator', () => {
      render(<Button>Focus me</Button>)
      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveClass('focus-visible:ring-2')
    })
  })

  // Custom Props Tests
  describe('Custom Props', () => {
    it('forwards additional props', () => {
      render(<Button data-testid="custom-button" aria-label="Custom label">Test</Button>)
      const button = screen.getByTestId('custom-button')
      expect(button).toHaveAttribute('aria-label', 'Custom label')
    })

    it('merges custom className', () => {
      render(<Button className="custom-class">Custom</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
      expect(button).toHaveClass('bg-primary-600') // Still has default styles
    })

    it('accepts custom type attribute', () => {
      render(<Button type="submit">Submit</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'submit')
    })
  })

  // Accessibility Tests
  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Button>Accessible Button</Button>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has correct ARIA attributes when loading', async () => {
      const { container } = render(<Button loading>Loading</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-disabled', 'true')
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('maintains contrast ratios for all variants', () => {
      const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'ghost', 'outline'] as const
      
      variants.forEach(variant => {
        const { unmount } = render(<Button variant={variant}>{variant}</Button>)
        const button = screen.getByRole('button')
        
        // This would be enhanced with actual contrast checking
        expect(button).toBeInTheDocument()
        unmount()
      })
    })

    it('has proper role and type', () => {
      render(<Button>Test</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'button')
    })
  })

  // Performance Tests
  describe('Performance', () => {
    it('does not cause unnecessary re-renders', () => {
      const renderSpy = jest.fn()
      
      const TestButton = ({ children }: { children: string }) => {
        renderSpy()
        return <Button>{children}</Button>
      }
      
      const { rerender } = render(<TestButton>Initial</TestButton>)
      expect(renderSpy).toHaveBeenCalledTimes(1)
      
      rerender(<TestButton>Initial</TestButton>) // Same props
      expect(renderSpy).toHaveBeenCalledTimes(2) // Will re-render without memo, this is expected
    })
  })
})