import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Loader2 } from 'lucide-react';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  disabled, 
  children, 
  ...props 
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:-translate-y-0.5 active:translate-y-0';
  
  const variants = {
    primary: 'bg-gradient-to-r from-brown-800 to-brown-600 text-white hover:shadow-lg hover:shadow-brown-800/20 focus-visible:ring-brown-600 dark:from-dbrown-300 dark:to-dbrown-400 dark:text-dbrown-900',
    secondary: 'bg-white text-brown-800 border border-brown-100 hover:bg-brown-50 hover:border-brown-400 focus-visible:ring-brown-400 dark:bg-dbrown-700 dark:text-dbrown-50 dark:border-dbrown-800 dark:hover:bg-dbrown-800 dark:hover:border-dbrown-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600 shadow-sm',
    ghost: 'hover:bg-brown-50 dark:hover:bg-dbrown-800 text-brown-600 dark:text-dbrown-400 focus-visible:ring-brown-400',
  };
  
  const sizes = {
    sm: 'h-9 px-4 text-xs',
    md: 'h-11 px-6 py-2 text-sm',
    lg: 'h-14 px-10 text-base',
  };

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
