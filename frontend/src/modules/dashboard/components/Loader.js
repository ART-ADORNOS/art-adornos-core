const Loader = () => {
    return (
        <div className="relative w-full sm:w-80 h-32 mb-6 mx-auto animate-pulse">
            <div
                className="absolute inset-0 bg-gradient-to-r from-orange-100 to-purple-100 rounded-lg blur opacity-20"></div>

            <div
                className="relative h-full bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-gray-100 dark:border-neutral-700 flex items-center p-4 gap-4">
                <div className="bg-gray-300 dark:bg-gray-600 w-12 h-12 rounded-full flex-shrink-0"></div>

                <div className="flex-1 min-w-0 space-y-2">
                    <div className="bg-gray-300 dark:bg-gray-600 h-5 rounded-full w-3/4"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 h-3 rounded-full w-1/2"></div>
                </div>

            </div>
        </div>
    );
};

export default Loader;