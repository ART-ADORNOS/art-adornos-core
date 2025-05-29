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
            <label className="inline-flex items-center cursor-pointer mt-2">
                <input
                    id={name}
                    type="checkbox"
                    name={name}
                    checked={!!value}
                    onChange={onChange}
                    className="sr-only peer"
                />
                <div
                    className="w-5 h-5 rounded-md bg-gray-200 peer-checked:bg-orange-500 peer-checked:ring-2 peer-checked:ring-orange-300 transition duration-200 flex items-center justify-center">
                    <svg
                        className="w-3 h-3 text-white hidden peer-checked:block"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                </div>
            </label>

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