import AddButton from "../../../shared/components/buttons/AddButton";
import ShopButton from "./ShopButton";


export default function WelcomeHeader({username, redirectTo = "", title = ""}) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center px-8 py-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white mb-4 sm:mb-0">
                ¡Bienvenido, <span className="text-blue-600">{username}</span>! 👋
            </div>
            {redirectTo && title ? (
                <AddButton redirectTo={redirectTo} title={title}/>
            ) : (
                <ShopButton redirectTo={redirectTo}/>
            )}
        </div>
    )
}