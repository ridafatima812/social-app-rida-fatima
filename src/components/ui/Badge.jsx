import React from 'react';
import { cn } from './Button';

const Badge = ({ variant = 'draft', className, children }) => {
  const variants = {
    draft: 'bg-brown-100 text-brown-800 dark:bg-dbrown-800 dark:text-dbrown-400',
    public: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    private: 'bg-brown-400/20 text-brown-800 dark:bg-dbrown-300/20 dark:text-dbrown-300',
  };

  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};

export default Badge;
