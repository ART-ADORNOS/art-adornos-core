import React from "react";

const CheckboxField = ({name, checked, onChange, error, errorMessage}) => (
    <div>
        <label
            htmlFor={name}
            className="relative h-[3em] w-[3em] rounded-[1.2em] bg-amber-300 shadow-[inset_-1px_1px_4px_0px_#fef9c3,inset_1px_-1px_4px_0px_#f59e0b,-1px_2px_4px_0px_#d97706] inline-block"
        >
            <input
                type="checkbox"
                name={name}
                id={name}
                checked={checked}
                onChange={onChange}
                className="peer appearance-none"
            />
            <span
                className="absolute left-1/2 top-1/2 h-[2em] w-[2em] -translate-x-1/2 -translate-y-1/2 rounded-[0.8em] bg-amber-200 shadow-[inset_-1px_1px_4px_0px_#fef9c3,inset_1px_-1px_4px_0px_#f59e0b,-1px_1px_2px_0px_#d97706] duration-200 peer-checked:shadow-[inset_1px_-1px_4px_0px_#fef9c3,inset_-1px_1px_4px_0px_#f59e0b]"
            />
            <svg
                fill="#92400e"
                viewBox="-3.2 -3.2 38.40 38.40"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-1/2 top-1/2 h-[2em] w-[2em] -translate-x-1/2 -translate-y-1/2 peer-checked:opacity-0"
            >
                <path d="M5 16.577l2.194-2.195 5.486 5.484L24.804 7.743 27 9.937l-14.32 14.32z"></path>
            </svg>
            <svg
                fill="#92400e"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-1/2 top-1/2 h-[2em] w-[2em] -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100"
            >
                <path
                    d="M697.4 759.2l61.8-61.8L573.8 512l185.4-185.4-61.8-61.8L512 450.2 326.6 264.8l-61.8 61.8L450.2 512 264.8 697.4l61.8 61.8L512 573.8z"/>
            </svg>
        </label>

        {error && <p className="mt-2 text-sm text-red-500">{errorMessage}</p>}
    </div>
);

export default CheckboxField;
