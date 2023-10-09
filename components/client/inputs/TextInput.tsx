import React from 'react';

type TextInputProps = {
  value: string,
  onChange: (value: string) => void,
  placeholder?: string,
  type?: 'text' | 'password' | 'email' | 'number',
  variant?: 'primary' | 'secondary' | 'transparent',
  className?: string,
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  variant = 'primary',
  className = ''
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let returnValue: string = event.target.value;

    if (type === 'number') {
      const inputValue = parseInt(returnValue, 10);

      if (!isNaN(inputValue)) { // Check if parsed value is a number
        if (inputValue > 100) {
          returnValue = "100";
        }
        if (inputValue < 0) {
          returnValue = "0";
        }
      }
    }

    onChange(returnValue);
  };

  const variantClassMap = {
    primary: 'py-2 px-3 text-gray-700',
    secondary: 'py-2 px-3 text-gray-700',
    transparent: 'py-2 px-3 bg-transparent',
  }

  return (
    <input
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      type={type}
      min={type === 'number' ? 0 : undefined}
      max={type === 'number' ? 100 : undefined}
      className={`appearance-none w-full ${variantClassMap[variant]} focus:outline-none focus:shadow-outline ${className}`}
    />
  );
};

export default TextInput;
