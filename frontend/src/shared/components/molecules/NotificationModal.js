import {IoClose} from "react-icons/io5";

export function NotificationModal({onClose}) {
    return (
        <div className="fixed top-16 right-6 z-50">
            <div
                className="w-80 p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 animate-slide-in"
                role="alert"
            >
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold">Nuevas notificaciones</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
                        aria-label="Cerrar"
                    >
                        <IoClose className="w-6 h-6"/>
                    </button>
                </div>

                <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-60 overflow-y-auto">
                    <div className="py-3 flex gap-3 items-start">
                        <div
                            className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                            M
                        </div>
                        <div className="text-sm">
                            <p className="font-semibold">Manish Tamang</p>
                            <p className="text-gray-600 dark:text-gray-400">comentó en tu foto</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
