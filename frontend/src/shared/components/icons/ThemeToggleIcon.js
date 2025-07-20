import {BsMoon, BsSun} from "react-icons/bs";
import React from "react";


export function ThemeToggleIcon({isDarkMode, toggleTheme}) {
    return (
        <li className="cursor-pointer" onClick={toggleTheme}>
            {isDarkMode ? (
                <BsSun className="text-yellow-500 text-2xl"/>
            ) : (
                <BsMoon className="text-black text-2xl"/>
            )}
        </li>
    )
}