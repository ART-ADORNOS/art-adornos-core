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
                        className, options,
                    }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">
            {label}
        </label>
        {options && options.length > 0 ? (
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="mt-1 p-2 w-full border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
                <option value="">Seleccione una opción</option>
                {options.map(([key, val]) => (
                    <option key={key} value={key}>{val}</option>
                ))}
            </select>
        ) : (
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
        )}
    </div>
);

export default InputField;