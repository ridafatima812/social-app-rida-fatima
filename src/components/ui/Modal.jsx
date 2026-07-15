import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-fade-in" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-50 w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 sm:p-8 text-left align-middle shadow-2xl transition-all dark:bg-dbrown-700 border border-brown-100 dark:border-dbrown-800 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-brown-900 dark:text-dbrown-50">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-brown-50 dark:hover:bg-dbrown-800 transition-colors"
          >
            <X className="h-5 w-5 text-brown-400 dark:text-dbrown-400" />
          </button>
        </div>
        
        <div className="mt-2 text-brown-900 dark:text-dbrown-50">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
