import ButtonAdd from "../../../shared/components/atoms/ButtonAdd";
import ShopButton from "./ShopButton";
import {Fragment} from "react";

export default function WelcomeHeader({username, redirectTo = "", title = ""}) {
    const showAddButton = redirectTo && title;

    return (
        <Fragment>
            <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-6 sm:py-8">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-800 dark:text-white text-center sm:text-left mb-4 sm:mb-0">
                    ¡Bienvenido, <span className="text-blue-600">{username}</span>! 👋
                </h1>
                <div className="hidden sm:flex">
                    {showAddButton ? (
                        <ButtonAdd redirectTo={redirectTo} title={title}/>
                    ) : (
                        <ShopButton redirectTo={redirectTo}/>
                    )}
                </div>
            </div>

            {showAddButton && (
                <div className="sm:hidden fixed bottom-6 right-6 z-50">
                    <ButtonAdd redirectTo={redirectTo} title={title} isFloating/>
                </div>
            )}
        </Fragment>
    );
}
