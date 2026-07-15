import React from 'react';
import { Coffee } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-brown-100 bg-white dark:border-dbrown-800 dark:bg-dbrown-800 transition-colors duration-300 mt-auto">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center md:flex-row gap-4">
          <div className="flex items-center gap-2 text-brown-800 dark:text-dbrown-300">
            <Coffee className="w-6 h-6" />
            <span className="text-xl font-bold tracking-tight">SocialApp</span>
          </div>
          
          <div className="md:absolute md:left-1/2 md:-translate-x-1/2 text-center mt-2 md:mt-0">
            <p className="text-sm text-brown-600 dark:text-dbrown-400">
              &copy; {new Date().getFullYear()} SocialApp. Crafted with precision and ❤️.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
