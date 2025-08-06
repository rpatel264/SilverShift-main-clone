import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right' | 'center';
  position?: 'top' | 'bottom';
  className?: string;
  closeOnClick?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  align = 'left',
  position = 'bottom',
  className,
  closeOnClick = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const alignmentClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2'
  };

  const positionClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2'
  };

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      
      {isOpen && (
        <div
          className={cn(
            "absolute z-50 min-w-[200px]",
            positionClasses[position],
            alignmentClasses[align],
            "animate-fade-in-down",
            className
          )}
          onClick={closeOnClick ? () => setIsOpen(false) : undefined}
        >
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
            
            <div className="relative">
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Dropdown Item Component
export const DropdownItem: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}> = ({ children, onClick, icon, disabled = false, className }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "w-full px-4 py-3 text-left text-sm",
      "flex items-center gap-3",
      "transition-all duration-200",
      "hover:bg-gradient-to-r hover:from-purple-50 hover:to-cyan-50",
      "hover:text-purple-700",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      "group",
      className
    )}
  >
    {icon && (
      <span className="text-gray-400 group-hover:text-purple-600 transition-colors">
        {icon}
      </span>
    )}
    {children}
  </button>
);

// Dropdown Divider Component
export const DropdownDivider: React.FC = () => (
  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-1" />
);

// Dropdown Header Component
export const DropdownHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn(
    "px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider",
    className
  )}>
    {children}
  </div>
);

export default Dropdown;