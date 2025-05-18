import React, {useState} from 'react';

const HorizontalNavBar = ({items, onFilter}) => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <div
            className="flex bg-white w-fit px-4 py-3 shadow-lg rounded-2xl dark:bg-box-dark dark:shadow-box-dark-out space-x-6 overflow-x-auto">
            {items.map((name, index) => (
                <button
                    key={index}
                    className={`relative flex items-center px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none
                    ${
                        activeIndex === index
                            ? 'bg-blue-100 text-blue-700 font-semibold ring-2 ring-blue-400  '
                            : 'text-gray-700 hover:bg-gray-200 '
                    }`}
                    onClick={() => {
                        setActiveIndex(index);
                        onFilter(name);
                    }}
                >
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-600 whitespace-nowrap">
                        {name}
                    </span>

                    {index !== items.length - 1 && (
                        <div
                            className="absolute right-[-12px] top-1/2 transform -translate-y-1/2 h-6 border-r border-gray-300 dark:border-gray-600"></div>
                    )}
                </button>
            ))}
        </div>
    );
};

export default HorizontalNavBar;