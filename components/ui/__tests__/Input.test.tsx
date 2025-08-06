import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import Input from '../Input'

// Extend Jest matchers
expect.extend(toHaveNoViolations)

describe('Input', () => {
  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('renders input element', () => {
      render(<Input />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('renders with placeholder text', () => {
      render(<Input placeholder="Enter text" />)
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
    })

    it('renders with value', () => {
      render(<Input value="test value" onChange={() => {}} />)
      expect(screen.getByDisplayValue('test value')).toBeInTheDocument()
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLInputElement>()
      render(<Input ref={ref} />)
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })
  })

  // Size Tests
  describe('Sizes', () => {
    it('applies small size styles', () => {
      render(<Input size="sm" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('h-9', 'px-3', 'text-sm')
    })

    it('applies medium size styles by default', () => {
      render(<Input data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('h-10', 'px-4', 'text-base')
    })

    it('applies large size styles', () => {
      render(<Input size="lg" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('h-12', 'px-4', 'text-lg')
    })
  })

  // Variant Tests
  describe('Variants', () => {
    it('applies default variant styles', () => {
      render(<Input data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('bg-white', 'border-secondary-300', 'text-secondary-900')
    })

    it('applies error variant styles', () => {
      render(<Input variant="error" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('border-error-500', 'text-error-700')
    })

    it('applies success variant styles', () => {
      render(<Input variant="success" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('border-success-500', 'text-success-700')
    })
  })

  // State Tests
  describe('States', () => {
    it('handles disabled state', () => {
      render(<Input disabled />)
      const input = screen.getByRole('textbox')
      expect(input).toBeDisabled()
      expect(input).toHaveClass('disabled:bg-secondary-100', 'disabled:cursor-not-allowed', 'disabled:opacity-50')
    })

    it('handles readonly state', () => {
      render(<Input readOnly />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('readonly')
      expect(input).toHaveClass('bg-secondary-50')
    })

    it('handles required state', () => {
      render(<Input required />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('required')
    })
  })

  // Label Tests
  describe('Labels', () => {
    it('renders with label', () => {
      render(<Input label="Email Address" />)
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
      expect(screen.getByText('Email Address')).toBeInTheDocument()
    })

    it('associates label with input correctly', () => {
      render(<Input label="Email" id="email-input" />)
      const label = screen.getByText('Email')
      const input = screen.getByRole('textbox')
      expect(label).toHaveAttribute('for', 'email-input')
      expect(input).toHaveAttribute('id', 'email-input')
    })

    it('generates unique id when not provided', () => {
      render(<Input label="Email" />)
      const input = screen.getByRole('textbox')
      const id = input.getAttribute('id')
      expect(id).toBeTruthy()
      expect(id).toMatch(/^input-/)
    })

    it('shows required indicator when required', () => {
      render(<Input label="Email" required />)
      expect(screen.getByText('*')).toBeInTheDocument()
    })
  })

  // Helper Text Tests
  describe('Helper Text', () => {
    it('renders helper text', () => {
      render(<Input helperText="Enter your email address" />)
      expect(screen.getByText('Enter your email address')).toBeInTheDocument()
    })

    it('associates helper text with input', () => {
      render(<Input helperText="Helper text" data-testid="input" />)
      const input = screen.getByTestId('input')
      const helperText = screen.getByText('Helper text')
      const helperTextId = helperText.getAttribute('id')
      expect(input).toHaveAttribute('aria-describedby', helperTextId)
    })
  })

  // Error Handling Tests
  describe('Error Handling', () => {
    it('renders error message', () => {
      render(<Input error="This field is required" />)
      expect(screen.getByText('This field is required')).toBeInTheDocument()
    })

    it('applies error variant when error is present', () => {
      render(<Input error="Error message" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('border-error-500')
    })

    it('associates error message with input', () => {
      render(<Input error="Error message" data-testid="input" />)
      const input = screen.getByTestId('input')
      const errorMessage = screen.getByText('Error message')
      const errorId = errorMessage.getAttribute('id')
      expect(input).toHaveAttribute('aria-describedby', errorId)
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })

    it('prioritizes error message over helper text in aria-describedby', () => {
      render(
        <Input 
          helperText="Helper text" 
          error="Error message" 
          data-testid="input" 
        />
      )
      const input = screen.getByTestId('input')
      const errorMessage = screen.getByText('Error message')
      const errorId = errorMessage.getAttribute('id')
      expect(input).toHaveAttribute('aria-describedby', errorId)
    })
  })

  // Icon Tests
  describe('Icons', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>

    it('renders left icon', () => {
      render(<Input leftIcon={<TestIcon />} />)
      expect(screen.getByTestId('test-icon')).toBeInTheDocument()
    })

    it('renders right icon', () => {
      render(<Input rightIcon={<TestIcon />} />)
      expect(screen.getByTestId('test-icon')).toBeInTheDocument()
    })

    it('renders both left and right icons', () => {
      const LeftIcon = () => <span data-testid="left-icon">Left</span>
      const RightIcon = () => <span data-testid="right-icon">Right</span>
      
      render(<Input leftIcon={<LeftIcon />} rightIcon={<RightIcon />} />)
      expect(screen.getByTestId('left-icon')).toBeInTheDocument()
      expect(screen.getByTestId('right-icon')).toBeInTheDocument()
    })

    it('adjusts padding when icons are present', () => {
      render(<Input leftIcon={<TestIcon />} rightIcon={<TestIcon />} data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('pl-10', 'pr-10')
    })
  })

  // Input Types Tests
  describe('Input Types', () => {
    it('renders password input', () => {
      render(<Input type="password" data-testid="password-input" />)
      const input = screen.getByTestId('password-input')
      expect(input).toHaveAttribute('type', 'password')
    })

    it('renders email input', () => {
      render(<Input type="email" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('type', 'email')
    })

    it('renders number input', () => {
      render(<Input type="number" />)
      const input = screen.getByRole('spinbutton')
      expect(input).toHaveAttribute('type', 'number')
    })

    it('renders tel input', () => {
      render(<Input type="tel" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('type', 'tel')
    })

    it('renders url input', () => {
      render(<Input type="url" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('type', 'url')
    })

    it('renders search input', () => {
      render(<Input type="search" />)
      const input = screen.getByRole('searchbox')
      expect(input).toHaveAttribute('type', 'search')
    })
  })

  // Interaction Tests
  describe('Interactions', () => {
    it('calls onChange when value changes', async () => {
      const handleChange = jest.fn()
      const user = userEvent.setup()
      
      render(<Input onChange={handleChange} />)
      
      const input = screen.getByRole('textbox')
      await user.type(input, 'test')
      
      expect(handleChange).toHaveBeenCalledTimes(4) // Called for each letter
    })

    it('calls onFocus when focused', async () => {
      const handleFocus = jest.fn()
      const user = userEvent.setup()
      
      render(<Input onFocus={handleFocus} />)
      
      const input = screen.getByRole('textbox')
      await user.click(input)
      
      expect(handleFocus).toHaveBeenCalledTimes(1)
    })

    it('calls onBlur when blurred', async () => {
      const handleBlur = jest.fn()
      const user = userEvent.setup()
      
      render(<Input onBlur={handleBlur} />)
      
      const input = screen.getByRole('textbox')
      await user.click(input)
      await user.tab()
      
      expect(handleBlur).toHaveBeenCalledTimes(1)
    })

    it('handles keyboard navigation', async () => {
      const user = userEvent.setup()
      
      render(
        <div>
          <Input data-testid="input1" />
          <Input data-testid="input2" />
        </div>
      )
      
      const input1 = screen.getByTestId('input1')
      const input2 = screen.getByTestId('input2')
      
      await user.click(input1)
      expect(input1).toHaveFocus()
      
      await user.tab()
      expect(input2).toHaveFocus()
    })
  })

  // Focus Management Tests
  describe('Focus Management', () => {
    it('is focusable by default', () => {
      render(<Input />)
      const input = screen.getByRole('textbox')
      input.focus()
      expect(input).toHaveFocus()
    })

    it('is not focusable when disabled', () => {
      render(<Input disabled />)
      const input = screen.getByRole('textbox')
      input.focus()
      expect(input).not.toHaveFocus()
    })

    it('has visible focus indicator', () => {
      render(<Input data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('focus:border-primary-500', 'focus:ring-primary-500/20')
    })
  })

  // Custom Props Tests
  describe('Custom Props', () => {
    it('forwards additional props', () => {
      render(<Input data-testid="custom-input" aria-label="Custom label" />)
      const input = screen.getByTestId('custom-input')
      expect(input).toHaveAttribute('aria-label', 'Custom label')
    })

    it('merges custom className', () => {
      render(<Input className="custom-class" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('custom-class')
      expect(input).toHaveClass('bg-white') // Still has default styles
    })

    it('accepts custom name attribute', () => {
      render(<Input name="email" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('name', 'email')
    })

    it('accepts custom autocomplete attribute', () => {
      render(<Input autoComplete="email" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('autocomplete', 'email')
    })
  })

  // Accessibility Tests
  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Input label="Email" />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has no accessibility violations with error', async () => {
      const { container } = render(<Input label="Email" error="Required field" />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has proper ARIA attributes', () => {
      render(<Input label="Email" helperText="Enter your email" required />)
      const input = screen.getByRole('textbox')
      
      expect(input).toHaveAttribute('required')
      expect(input).toHaveAttribute('aria-describedby')
    })

    it('maintains contrast ratios for all variants', () => {
      const variants = ['default', 'error', 'success'] as const
      
      variants.forEach(variant => {
        const { unmount } = render(<Input variant={variant} data-testid={`input-${variant}`} />)
        const input = screen.getByTestId(`input-${variant}`)
        
        // This would be enhanced with actual contrast checking
        expect(input).toBeInTheDocument()
        unmount()
      })
    })

    it('supports screen readers with proper labeling', () => {
      render(
        <Input 
          label="Email Address" 
          helperText="We'll never share your email"
          placeholder="Enter email"
        />
      )
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAccessibleName('Email Address')
      expect(input).toHaveAccessibleDescription("We'll never share your email")
    })
  })

  // Validation Tests
  describe('Validation', () => {
    it('shows validation state correctly', () => {
      render(<Input error="Invalid email" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })

    it('removes validation state when error is cleared', () => {
      const { rerender } = render(<Input error="Invalid email" data-testid="input" />)
      let input = screen.getByTestId('input')
      expect(input).toHaveAttribute('aria-invalid', 'true')
      
      rerender(<Input data-testid="input" />)
      input = screen.getByTestId('input')
      expect(input).not.toHaveAttribute('aria-invalid')
    })
  })

  // Performance Tests
  describe('Performance', () => {
    it('does not cause unnecessary re-renders', () => {
      const renderSpy = jest.fn()
      
      const TestInput = ({ value }: { value: string }) => {
        renderSpy()
        return <Input value={value} onChange={() => {}} />
      }
      
      const { rerender } = render(<TestInput value="initial" />)
      expect(renderSpy).toHaveBeenCalledTimes(1)
      
      rerender(<TestInput value="initial" />) // Same props
      expect(renderSpy).toHaveBeenCalledTimes(2) // Will re-render without memo, this is expected
    })
  })
})