import React from "react";
import CheckboxField from "./CheckboxField";

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
    <div className="mb-4 ">
        <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">
            {label}
        </label>
        {options && options.length > 0 ? (
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="mt-1 p-2 w-full border rounded-md bg-white text-gray-900 "
            >
                <option value="">Seleccione una opción</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        ) : type === "checkbox" ? (
            <CheckboxField
                name={name}
                value={value}
                onChange={onChange}
                error={error}
                errorMessage={errorMessage}
            />

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