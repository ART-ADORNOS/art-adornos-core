import React from "react";
import {FaRocket} from "react-icons/fa";
import {Link} from "react-router-dom";


const CardStartup = ({startup}) => {
    return (
        <Link to="/product-list" className="block" key = {startup.name}>
            <div className="group relative w-80 h-32 mb-6 transition-all duration-300 hover:-translate-y-1">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-orange-100 to-purple-100 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                <div
                    className="relative h-full cursor-pointer bg-white dark:bg-neutral-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center p-4 gap-4 border border-gray-100 dark:border-neutral-700">
                    <div className="p-2  dark: rounded-full flex items-center justify-center">
                        <FaRocket className="stroke-orange-400 dark:stroke-orange-300" size={40}/>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-neutral-800 dark:text-white">
                            {startup.name}
                        </h3>
                        {/*<p className="text-sm text-neutral-500 dark:text-neutral-400">*/}
                        {/*    {startup.category}*/}
                        {/*</p>*/}
                    </div>
                    <div
                        className="absolute top-0 left-0 bottom-0 w-1 bg-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                </div>
            </div>
        </Link>

    );
};

export default CardStartup;
