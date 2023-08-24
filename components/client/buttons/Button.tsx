import React from 'react';

type ButtonProps = {
  children: React.ReactNode,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  color?: 'primary' | 'secondary',
  size?: 'small' | 'medium' | 'large',
  type?: 'submit' | 'button',
  rounded?: boolean,
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  color = 'primary',
  size = 'medium',
  type = 'button',
  rounded = false,
  className = ''
}) => {
  let colorClasses = '';
  let sizeClasses = '';

  switch (color) {
    case 'primary':
      colorClasses = 'bg-blue-500 hover:bg-blue-600 text-white';
      break;
    case 'secondary':
      colorClasses = 'bg-gray-500 hover:bg-gray-600 text-white';
      break;
  }

  switch (size) {
    case 'small':
      sizeClasses = 'px-2 py-1 text-sm';
      break;
    case 'medium':
      sizeClasses = 'px-4 py-2 text-base';
      break;
    case 'large':
      sizeClasses = 'px-6 py-3 text-lg';
      break;
  }

  const roundedClasses = rounded ? 'rounded-full' : 'rounded-md';

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${colorClasses} ${sizeClasses} ${roundedClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
