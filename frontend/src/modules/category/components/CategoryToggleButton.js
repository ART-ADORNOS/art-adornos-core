import React from 'react';

const CategoryToggleButton = ({isMenuOpen, onClick}) => {
    return (
        <button
            onClick={onClick}
            className={`
        flex-shrink-0 fixed sm:absolute bottom-4 right-4 sm:right-4 sm:top-1/2 sm:-translate-y-1/2
        flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-semibold 
        text-blue-500 border border-blue-500 px-3 py-1 sm:px-4 sm:py-2 
        rounded-lg transition-all hover:bg-blue-500 hover:text-white shadow-md
        bg-white dark:bg-gray-800 z-10
      `}
            aria-label="Ver categorías"
            aria-expanded={isMenuOpen}
        >
            <span className="hidden sm:inline">Ver categorías</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className={`w-5 h-5 transition-transform ${isMenuOpen ? 'rotate-90' : ''}`}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16m-7 6h7"
                />
            </svg>
        </button>
    );
};

export default CategoryToggleButton;