import React from 'react';

type TextInputProps = {
  value: string,
  onChange: (value: string) => void,
  placeholder?: string,
  type?: 'text' | 'password' | 'email' | 'number',
  className?: string,
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
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

  return (
    <input
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      type={type}
      min={type === 'number' ? 0 : undefined}
      max={type === 'number' ? 100 : undefined}
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
    />
  );
};

export default TextInput;
