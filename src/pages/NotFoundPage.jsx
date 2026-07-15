import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center animate-fade-in relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brown-400/20 dark:bg-dbrown-300/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10">
        <h1 className="text-[150px] font-black text-brown-100 dark:text-dbrown-800 leading-none">404</h1>
        <p className="text-3xl font-bold tracking-tight text-brown-900 dark:text-dbrown-50 sm:text-4xl mt-6">
          Oops, page not found
        </p>
        <p className="mt-4 text-lg text-brown-500 dark:text-dbrown-400 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="mt-10 inline-block">
          <Button size="lg" className="px-10 shadow-xl shadow-brown-900/10">Back to civilization</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
