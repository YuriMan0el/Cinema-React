'use client';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface LoaderProps {
  message?: string;
}

export default function Loader({ message = 'Carregando...' }: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4">
      <FontAwesomeIcon 
        icon={faSpinner} 
        className="animate-spin text-blue-600 max-w-8 max-h-8"
      />
      <p className="text-gray-600 font-medium text-sm">{message}</p>
    </div>
  );
}
