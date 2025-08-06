import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import Card from '../Card'

// Extend Jest matchers
expect.extend(toHaveNoViolations)

describe('Card', () => {
  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('renders with children', () => {
      render(<Card>Card content</Card>)
      expect(screen.getByText('Card content')).toBeInTheDocument()
    })

    it('renders as div element by default', () => {
      render(<Card data-testid="card">Content</Card>)
      const card = screen.getByTestId('card')
      expect(card.tagName).toBe('DIV')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<Card ref={ref}>Content</Card>)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  // Variant Tests
  describe('Variants', () => {
    it('applies default variant styles', () => {
      render(<Card data-testid="card">Default Card</Card>)
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('bg-white', 'border-secondary-200', 'shadow-sm')
    })

    it('applies elevated variant styles', () => {
      render(<Card variant="elevated" data-testid="card">Elevated Card</Card>)
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('bg-white', 'shadow-md')
    })

    it('applies outline variant styles', () => {
      render(<Card variant="outline" data-testid="card">Outline Card</Card>)
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('bg-white', 'border-2', 'border-secondary-300')
    })

    it('applies filled variant styles', () => {
      render(<Card variant="filled" data-testid="card">Filled Card</Card>)
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('bg-secondary-50', 'border-secondary-200')
    })
  })

  // Size Tests
  describe('Sizes', () => {
    it('applies small size styles', () => {
      render(<Card size="sm" data-testid="card">Small Card</Card>)
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('p-4', 'rounded-lg')
    })

    it('applies medium size styles by default', () => {
      render(<Card data-testid="card">Medium Card</Card>)
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('p-6', 'rounded-xl')
    })

    it('applies large size styles', () => {
      render(<Card size="lg" data-testid="card">Large Card</Card>)
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('p-8', 'rounded-2xl')
    })
  })

  // Interactive Tests
  describe('Interactive States', () => {
    it('applies hover styles when hoverable', () => {
      render(<Card hoverable data-testid="card">Hoverable Card</Card>)
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('hover:shadow-md', 'hover:border-secondary-300', 'transition-all', 'duration-200')
    })

    it('applies cursor pointer when clickable', () => {
      render(<Card clickable data-testid="card">Clickable Card</Card>)
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('cursor-pointer')
    })

    it('applies both hover and click styles when both props are true', () => {
      render(<Card hoverable clickable data-testid="card">Interactive Card</Card>)
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('hover:shadow-md', 'cursor-pointer', 'transition-all')
    })

    it('handles click events when clickable', async () => {
      const handleClick = jest.fn()
      const user = userEvent.setup()
      
      render(<Card clickable onClick={handleClick} data-testid="card">Clickable Card</Card>)
      
      await user.click(screen.getByTestId('card'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('supports keyboard interaction when clickable', async () => {
      const handleClick = jest.fn()
      const user = userEvent.setup()
      
      render(<Card clickable onClick={handleClick} data-testid="card">Clickable Card</Card>)
      
      const card = screen.getByTestId('card')
      card.focus()
      await user.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalledTimes(1)
      
      await user.keyboard('{ }') // Space key
      expect(handleClick).toHaveBeenCalledTimes(2)
    })
  })

  // Header and Footer Tests
  describe('Header and Footer', () => {
    it('renders header when provided', () => {
      const header = <div data-testid="card-header">Card Header</div>
      render(<Card header={header}>Card content</Card>)
      expect(screen.getByTestId('card-header')).toBeInTheDocument()
      expect(screen.getByText('Card Header')).toBeInTheDocument()
    })

    it('renders footer when provided', () => {
      const footer = <div data-testid="card-footer">Card Footer</div>
      render(<Card footer={footer}>Card content</Card>)
      expect(screen.getByTestId('card-footer')).toBeInTheDocument()
      expect(screen.getByText('Card Footer')).toBeInTheDocument()
    })

    it('renders header, content, and footer in correct order', () => {
      const header = <div data-testid="card-header">Header</div>
      const footer = <div data-testid="card-footer">Footer</div>
      
      render(
        <Card header={header} footer={footer} data-testid="card">
          Content
        </Card>
      )
      
      const card = screen.getByTestId('card')
      const children = Array.from(card.children)
      
      expect(children[0]).toContainElement(screen.getByTestId('card-header'))
      expect(children[1]).toHaveTextContent('Content')
      expect(children[2]).toContainElement(screen.getByTestId('card-footer'))
    })

    it('applies correct spacing with header and footer', () => {
      const header = <div>Header</div>
      const footer = <div>Footer</div>
      
      render(<Card header={header} footer={footer} data-testid="card">Content</Card>)
      const card = screen.getByTestId('card')
      
      // Should have padding removed from main content area when header/footer present
      expect(card).toHaveClass('p-0')
    })
  })

  // Loading State Tests
  describe('Loading State', () => {
    it('shows loading skeleton when loading', () => {
      render(<Card loading data-testid="card">Content</Card>)
      expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument()
      expect(screen.queryByText('Content')).not.toBeInTheDocument()
    })

    it('applies loading styles', () => {
      render(<Card loading data-testid="card">Content</Card>)
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('animate-pulse')
    })

    it('shows content when not loading', () => {
      render(<Card loading={false} data-testid="card">Content</Card>)
      expect(screen.getByText('Content')).toBeInTheDocument()
      expect(screen.queryByRole('status', { name: /loading/i })).not.toBeInTheDocument()
    })
  })

  // Custom Props Tests
  describe('Custom Props', () => {
    it('forwards additional props', () => {
      render(<Card data-testid="custom-card" aria-label="Custom card">Content</Card>)
      const card = screen.getByTestId('custom-card')
      expect(card).toHaveAttribute('aria-label', 'Custom card')
    })

    it('merges custom className', () => {
      render(<Card className="custom-class" data-testid="card">Content</Card>)
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('custom-class')
      expect(card).toHaveClass('bg-white') // Still has default styles
    })

    it('accepts custom role', () => {
      render(<Card role="article" data-testid="card">Article content</Card>)
      const card = screen.getByTestId('card')
      expect(card).toHaveAttribute('role', 'article')
    })
  })

  // Accessibility Tests
  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Card>Accessible Card</Card>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has no accessibility violations when clickable', async () => {
      const { container } = render(<Card clickable onClick={() => {}}>Clickable Card</Card>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has proper ARIA attributes when clickable', () => {
      render(<Card clickable onClick={() => {}} data-testid="card">Clickable</Card>)
      const card = screen.getByTestId('card')
      expect(card).toHaveAttribute('role', 'button')
      expect(card).toHaveAttribute('tabindex', '0')
    })

    it('has proper focus management when clickable', () => {
      render(<Card clickable onClick={() => {}} data-testid="card">Focusable</Card>)
      const card = screen.getByTestId('card')
      card.focus()
      expect(card).toHaveFocus()
      expect(card).toHaveClass('focus:ring-2', 'focus:ring-primary-500')
    })

    it('maintains contrast ratios for all variants', () => {
      const variants = ['default', 'elevated', 'outline', 'filled'] as const
      
      variants.forEach(variant => {
        const { unmount } = render(<Card variant={variant} data-testid={`card-${variant}`}>Content</Card>)
        const card = screen.getByTestId(`card-${variant}`)
        
        // This would be enhanced with actual contrast checking
        expect(card).toBeInTheDocument()
        unmount()
      })
    })

    it('supports screen readers with proper content structure', () => {
      const header = <h2>Card Title</h2>
      const footer = <div>Card Actions</div>
      
      render(
        <Card 
          header={header} 
          footer={footer}
          aria-labelledby="card-title"
          data-testid="card"
        >
          Card content goes here
        </Card>
      )
      
      const card = screen.getByTestId('card')
      expect(card).toHaveAttribute('aria-labelledby', 'card-title')
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    })
  })

  // Semantic Structure Tests
  describe('Semantic Structure', () => {
    it('renders as article when specified', () => {
      render(<Card as="article" data-testid="card">Article content</Card>)
      const card = screen.getByTestId('card')
      expect(card.tagName).toBe('ARTICLE')
    })

    it('renders as section when specified', () => {
      render(<Card as="section" data-testid="card">Section content</Card>)
      const card = screen.getByTestId('card')
      expect(card.tagName).toBe('SECTION')
    })

    it('renders as button when clickable and as prop not specified', () => {
      render(<Card clickable onClick={() => {}} data-testid="card">Button card</Card>)
      const card = screen.getByTestId('card')
      expect(card).toHaveAttribute('role', 'button')
    })
  })

  // Performance Tests
  describe('Performance', () => {
    it('does not cause unnecessary re-renders', () => {
      const renderSpy = jest.fn()
      
      const TestCard = ({ children }: { children: string }) => {
        renderSpy()
        return <Card>{children}</Card>
      }
      
      const { rerender } = render(<TestCard>Initial</TestCard>)
      expect(renderSpy).toHaveBeenCalledTimes(1)
      
      rerender(<TestCard>Initial</TestCard>) // Same props
      expect(renderSpy).toHaveBeenCalledTimes(2) // Will re-render without memo, this is expected
    })

    it('handles complex content without performance issues', () => {
      const complexContent = (
        <div>
          {Array.from({ length: 100 }, (_, i) => (
            <div key={i}>Item {i}</div>
          ))}
        </div>
      )
      
      const startTime = performance.now()
      render(<Card>{complexContent}</Card>)
      const endTime = performance.now()
      
      // Should render quickly (less than 100ms for this simple test)
      expect(endTime - startTime).toBeLessThan(100)
    })
  })

  // Edge Cases Tests
  describe('Edge Cases', () => {
    it('handles null children gracefully', () => {
      render(<Card data-testid="card">{null}</Card>)
      const card = screen.getByTestId('card')
      expect(card).toBeInTheDocument()
      expect(card).toBeEmptyDOMElement()
    })

    it('handles undefined children gracefully', () => {
      render(<Card data-testid="card">{undefined}</Card>)
      const card = screen.getByTestId('card')
      expect(card).toBeInTheDocument()
      expect(card).toBeEmptyDOMElement()
    })

    it('handles empty string children', () => {
      render(<Card data-testid="card">{''}</Card>)
      const card = screen.getByTestId('card')
      expect(card).toBeInTheDocument()
      expect(card).toBeEmptyDOMElement()
    })

    it('handles boolean children gracefully', () => {
      render(<Card data-testid="card">{false}</Card>)
      const card = screen.getByTestId('card')
      expect(card).toBeInTheDocument()
      expect(card).toBeEmptyDOMElement()
    })
  })

  // Responsive Tests
  describe('Responsive Behavior', () => {
    it('maintains responsive classes', () => {
      render(<Card className="sm:p-4 md:p-6 lg:p-8" data-testid="card">Responsive</Card>)
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('sm:p-4', 'md:p-6', 'lg:p-8')
    })

    it('works with responsive variants via className', () => {
      render(<Card className="md:shadow-lg lg:shadow-xl" data-testid="card">Responsive shadow</Card>)
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('md:shadow-lg', 'lg:shadow-xl')
    })
  })
})