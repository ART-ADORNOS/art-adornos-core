import {MdNotificationsNone} from "react-icons/md";
import React from "react";
import {IoNotificationsSharp} from "react-icons/io5";


export function NotificationIcon({count = 0, onClick}) {

    const Icon = count > 0 ? IoNotificationsSharp : MdNotificationsNone;
    const iconColor = count > 0 ? "text-yellow-500" : "text-gray-400";

    return (
        <li className="relative">
            <button
                onClick={onClick}
                className="relative cursor-pointer bg-transparent border-none outlline-none p-0"
                aria-label="Notificaciones"
            >
                <Icon className={`text-2xl ${iconColor} transition-colors duration-300`}/>
                {count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] leading-none font-bold rounded-full px-[6px] py-[2px] shadow-md">
                        {count}
                    </span>
                )}
            </button>
        </li>
    )
}