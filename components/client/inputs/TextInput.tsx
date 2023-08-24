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
    onChange(event.target.value);
  };

  return (
    <input
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      type={type}
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
    />
  );
};

export default TextInput;
