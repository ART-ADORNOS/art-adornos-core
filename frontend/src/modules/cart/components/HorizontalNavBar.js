const HorizontalNavBar = ({ items }) => {
    return (
        <div className="flex bg-white w-fit px-4 py-3 shadow-lg rounded-2xl dark:bg-box-dark dark:shadow-box-dark-out space-x-6 overflow-x-auto">
            {items.map((name, index) => (
                <div key={index} className="relative flex items-center pl-4">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-600 whitespace-nowrap">
                        {name}
                    </span>

                    {index !== items.length - 1 && (
                        <div className="absolute right-[-12px] top-1/2 transform -translate-y-1/2 h-6 border-r border-gray-300 dark:border-gray-600"></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default HorizontalNavBar;
