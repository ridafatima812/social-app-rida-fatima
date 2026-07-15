import React from 'react';
import { cn } from './Button';

const Input = React.forwardRef(({ className, label, error, icon, ...props }, ref) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-brown-800 dark:text-dbrown-400">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brown-400 dark:text-dbrown-300">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "flex h-12 w-full rounded-xl border border-brown-100 bg-white px-4 py-2 text-sm placeholder:text-brown-400/70 transition-all duration-300",
            "focus:outline-none focus:ring-2 focus:ring-brown-400/50 focus:border-brown-400",
            "dark:border-dbrown-800 dark:bg-dbrown-700 dark:text-dbrown-50 dark:placeholder:text-dbrown-400/50 dark:focus:ring-dbrown-300/30 dark:focus:border-dbrown-300",
            "disabled:cursor-not-allowed disabled:opacity-50",
            icon && "pl-10",
            error && "border-red-500 focus:ring-red-500/50 focus:border-red-500 dark:border-red-500 dark:focus:ring-red-500/50 dark:focus:border-red-500",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400 mt-1.5 animate-fade-in">{error.message || error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
