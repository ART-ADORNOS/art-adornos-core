import { Link } from "react-router-dom";
import  { useContext } from "react";
import ThemeContext from "../context/ThemeContent";
import {BsSun, BsMoon} from "react-icons/bs";


export default function Navbar() {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-gray-200 dark:bg-gray-800 shadow-md">
            <div className="text-2xl font-bold">
                <a href="/" className="text-orange-600 dark:text-orange-400">Logo</a>
            </div>
            <div className="space-x-4">
                <ul className="flex space-x-6">

                    <li className="cursor-pointer" onClick={toggleTheme}>
                        {isDarkMode ? (
                            <BsSun className="text-yellow-500" />
                        ) : (
                            <BsMoon className="text-black" />
                        )}
                    </li>

                    <li className="transition transform hover:scale-110 ease-in-out duration-200">
                        <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-pink-600 transition-colors duration-300">Home</Link>
                    </li>
                    <li className="transition transform hover:scale-110 ease-in-out duration-200">
                        <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-pink-600 transition-colors duration-300">Sobre</Link>
                    </li>
                    <li className="transition transform hover:scale-110 ease-in-out duration-200">
                        <Link to="/account" className="text-gray-700 dark:text-gray-300 hover:text-pink-600 transition-colors duration-300">Cuenta</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}