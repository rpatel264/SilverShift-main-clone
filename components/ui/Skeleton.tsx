import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  width,
  height,
  animation = 'wave'
}) => {
  const baseClasses = cn(
    'bg-gray-200',
    {
      'skeleton': animation === 'wave',
      'animate-pulse': animation === 'pulse',
      'rounded-xl': variant === 'rectangular',
      'rounded-full': variant === 'circular',
      'rounded-md h-4': variant === 'text'
    },
    className
  );

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return <div className={baseClasses} style={style} />;
};

// Predefined skeleton components for common use cases
export const SkeletonAvatar: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ 
  size = 'md' 
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return <Skeleton variant="circular" className={sizes[size]} />;
};

export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('p-6 space-y-4', className)}>
    <div className="flex items-center space-x-4">
      <SkeletonAvatar />
      <div className="space-y-2 flex-1">
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-1/2" />
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" className="w-4/5" />
    </div>
    <Skeleton variant="rectangular" height={200} className="rounded-xl" />
  </div>
);

export const SkeletonTable: React.FC<{ 
  rows?: number;
  columns?: number;
  className?: string;
}> = ({ 
  rows = 5, 
  columns = 4, 
  className 
}) => (
  <div className={cn('space-y-3', className)}>
    {/* Header */}
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={`header-${i}`} variant="text" className="h-4" />
      ))}
    </div>
    
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div 
        key={`row-${rowIndex}`} 
        className="grid gap-4" 
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton key={`cell-${rowIndex}-${colIndex}`} variant="text" className="h-4" />
        ))}
      </div>
    ))}
  </div>
);

export const SkeletonList: React.FC<{ 
  items?: number;
  showAvatar?: boolean;
  className?: string;
}> = ({ 
  items = 3, 
  showAvatar = true, 
  className 
}) => (
  <div className={cn('space-y-4', className)}>
    {Array.from({ length: items }).map((_, index) => (
      <div key={index} className="flex items-center space-x-4">
        {showAvatar && <SkeletonAvatar />}
        <div className="space-y-2 flex-1">
          <Skeleton variant="text" className="w-3/4" />
          <Skeleton variant="text" className="w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonButton: React.FC<{ 
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ size = 'md', className }) => {
  const sizes = {
    sm: 'h-9 w-20',
    md: 'h-11 w-24',
    lg: 'h-14 w-32'
  };

  return (
    <Skeleton 
      variant="rectangular" 
      className={cn(sizes[size], 'rounded-xl', className)} 
    />
  );
};

export const SkeletonInput: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('space-y-2', className)}>
    <Skeleton variant="text" className="w-20 h-4" />
    <Skeleton variant="rectangular" className="w-full h-12 rounded-xl" />
  </div>
);

// Business listing skeleton specifically for our app
export const SkeletonBusinessCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('p-6 space-y-4 bg-white rounded-2xl border border-gray-200', className)}>
    <Skeleton variant="rectangular" height={200} className="rounded-xl" />
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton variant="text" className="w-3/4 h-5" />
        <Skeleton variant="circular" className="w-6 h-6" />
      </div>
      <Skeleton variant="text" className="w-1/2 h-4" />
      <Skeleton variant="text" className="w-2/3 h-4" />
      <div className="flex items-center justify-between pt-2">
        <Skeleton variant="text" className="w-1/3 h-5" />
        <Skeleton variant="text" className="w-1/4 h-4" />
      </div>
    </div>
  </div>
);

export default Skeleton;