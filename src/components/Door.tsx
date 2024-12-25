import React from 'react';
import { DoorClosed } from 'lucide-react';  // Changed from Door to DoorClosed

interface DoorProps {
  number: number;
  isSelected: boolean;
  isRevealed: boolean;
  hasPrize: boolean;
  onClick: () => void;
  disabled: boolean;
}

export function Door({ number, isSelected, isRevealed, hasPrize, onClick, disabled }: DoorProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative flex flex-col items-center p-4 transition-all ${
        isSelected
          ? 'bg-blue-100 border-blue-500'
          : 'bg-white hover:bg-gray-50 border-gray-200'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} 
      border-2 rounded-lg shadow-md w-32 h-48`}
    >
      <DoorClosed
        className={`w-16 h-16 ${
          isSelected ? 'text-blue-500' : 'text-gray-600'
        }`}
      />
      <span className="mt-2 text-lg font-semibold">Door {number}</span>
      {isRevealed && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
          <span className="text-4xl">{hasPrize ? '🎁' : '🐐'}</span>
        </div>
      )}
    </button>
  );
}