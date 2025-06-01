'use client';

import { ReactNode, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  function handleBackgroundClick(e: React.MouseEvent) {
    if (modalRef.current && e.target === modalRef.current) {
      onClose();
    }
  }

  return (
    <div
      ref={modalRef}
      onClick={handleBackgroundClick}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
          aria-label="Fechar modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
