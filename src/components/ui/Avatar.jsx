import React from 'react';
import { cn } from './Button';

const Avatar = ({ src, name = 'User', size = 'md', className }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-base',
    lg: 'w-20 h-20 text-2xl',
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  return (
    <div 
      className={cn(
        "relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 shadow-sm ring-2 ring-white dark:ring-dbrown-800 transition-transform hover:scale-105",
        sizes[size],
        !src && "bg-gradient-to-br from-brown-400 to-brown-600 dark:from-dbrown-300 dark:to-dbrown-400",
        className
      )}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span className="font-semibold text-white dark:text-dbrown-900">
          {getInitial(name)}
        </span>
      )}
    </div>
  );
};

export default Avatar;
