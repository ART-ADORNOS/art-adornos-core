import React from "react";

const InputField = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
  errorMessage,
  onFocus,
  onBlur,
  className,
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">
      {label}
    </label>
    <div className="mt-2">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 ${className}`}
      />
      {error && <p className="mt-2 text-sm text-red-500">{errorMessage}</p>}
    </div>
  </div>
);

export default InputField;