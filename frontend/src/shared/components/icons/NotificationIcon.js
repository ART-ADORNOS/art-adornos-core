import {MdNotificationsNone} from "react-icons/md";
import React from "react";
import {IoNotificationsSharp} from "react-icons/io5";


export function NotificationIcon({count = 0}) {

    const Icon = count > 0 ? IoNotificationsSharp : MdNotificationsNone;
    const iconColor = count > 0 ? "text-yellow-500" : "text-gray-400";

    return (
        <li className="relative cursor-pointer">
            <Icon className={`text-2xl ${iconColor} transition-colors duration-300`}/>
            {count > 0 && (
                <span
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] leading-none font-bold rounded-full px-[6px] py-[2px] shadow-md">
                    {count}
                </span>
            )}
        </li>
    )
}