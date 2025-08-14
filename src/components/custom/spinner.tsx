// Spinner.tsx
import React from 'react';

interface SpinnerProps {
  size?: number; // size in pixels
  color?: 'red' | 'blue' | 'grey' | 'black' | 'white';
  label?: string;
}

const colorMap: Record<SpinnerProps['color'], string> = {
  red: 'border-red-500',
  blue: 'border-blue-500',
  grey: 'border-gray-500',
  black: 'border-black',
  white: 'border-white',
};

const Spinner: React.FC<SpinnerProps> = ({
  size = 50,
  color = 'blue',
  label,
}) => {
  const spinnerColor = colorMap[color] || 'border-blue-500';

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div
        className={`rounded-full border-4 border-t-4 border-t-transparent animate-spin ${spinnerColor}`}
        style={{ width: size, height: size }}
      />
      {label && <span className="text-gray-700 font-medium">{label}</span>}
    </div>
  );
};

export default Spinner;
