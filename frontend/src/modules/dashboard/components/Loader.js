const Loader = () => {
    return (
        <div className="bg-gray-300 bg-opacity-20 p-4 rounded-2xl shadow-md w-80 h-32 flex items-center justify-between animate-pulse dark:bg-gray-600 dark:bg-opacity-10">
            <div className="bg-gray-500 bg-opacity-30 w-10 h-10 rounded-full dark:bg-gray-300 dark:bg-opacity-20"></div>

            <div className="flex-1 mx-3">
                <div className="bg-gray-500 bg-opacity-20 h-4 w-40 rounded-full mb-2 dark:bg-gray-300 dark:bg-opacity-10"></div>
                <div className="bg-gray-600 bg-opacity-10 h-3 w-24 rounded-full dark:bg-gray-400 dark:bg-opacity-5"></div>
            </div>
        </div>
    );
}

export default Loader;
