import {BsMoon, BsSun} from "react-icons/bs";
import React from "react";


export function ThemeToggleIcon({isDarkMode, toggleTheme}) {
    return (
        <li>
            <button
                onClick={toggleTheme}
                className="cursor-pointer focus:outline-none"
                aria-label="Cambiar tema"
            >
                {isDarkMode ? (
                    <BsSun className="text-yellow-500 text-2xl"/>
                ) : (
                    <BsMoon className="text-black text-2xl"/>
                )}
            </button>
        </li>
    )
}