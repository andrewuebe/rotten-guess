import React from 'react';

type ButtonProps = {
  children: React.ReactNode,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  color?: 'vine' | 'eggplant' | 'tomato-soup',
  size?: 'small' | 'medium' | 'large',
  type?: 'submit' | 'button',
  style?: 'primary' | 'secondary',
  rounded?: boolean,
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  color = 'vine',
  size = 'medium',
  style = 'primary',
  type = 'button',
  rounded = false,
  className = ''
}) => {
  const baseClasses = 'transition duration-200 ease-in-out h-auto focus:outline-none focus:ring-2 focus:ring-bird-egg-400';
  let styleClasses = '';
  let sizeClasses = '';

  const getPrimaryColorClasses = () => {
    switch (color) {
      case 'vine':
        return 'bg-vine-500 hover:bg-vine-600 text-white';
      case 'eggplant':
        return 'bg-eggplant-500 hover:bg-eggplant-600 text-white';
      case 'tomato-soup':
        return 'bg-tomato-soup-500 hover:bg-tomato-soup-600 text-white'
    }
  }

  const getSecondaryColorClasses = () => {
    switch (color) {
      case 'vine':
        return 'border-4 border-vine-600 bg-transparent hover:bg-vine-500 hover:bg-opacity-[20%] text-eggplant-800';
      case 'eggplant':
        return 'border-4 border-eggplant-600 bg-transparent hover:bg-eggplant-500 hover:bg-opacity-[20%] text-eggplant-800';
      case 'tomato-soup':
        return 'border-4 border-tomato-soup-600 bg-transparent hover:bg-tomato-soup-500 hover:bg-opacity-[20%] text-eggplant-800'
    }
  }

  switch (style) {
    case 'primary':
      styleClasses = getPrimaryColorClasses();
      break;
    case 'secondary':
      styleClasses = getSecondaryColorClasses();
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

  const roundedClasses = rounded ? 'rounded-full' : '';

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${baseClasses} ${styleClasses} ${sizeClasses} ${roundedClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
