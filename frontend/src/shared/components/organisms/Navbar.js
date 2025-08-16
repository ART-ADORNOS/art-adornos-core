import {Link, useNavigate} from "react-router-dom";
import React, {Fragment, useContext, useState} from "react";
import ThemeContext from "../../providers/ThemeContent";
import AuthContext from "../../providers/AuthContext";
import DeleteUserModal from "../../../modules/auth/components/Modal/delete";
import api from '../../../core/api/axios';
import AlertMessage from "../molecules/AlertMessage";
import {NotificationIcon} from "../atoms/NotificationIcon";
import {ThemeToggleIcon} from "../atoms/ThemeToggleIcon";
import {NotificationModal} from "../molecules/NotificationModal";
import ROUTES from "../../../core/constants/routes/routes";
import USER_TYPE from "../../../core/constants/user/userType";
import {useDashboardType} from "../../providers/dashboardTypeProvider";


export default function Navbar() {
    const {isDarkMode, toggleTheme} = useContext(ThemeContext);
    const {user, logout} = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [showModalNotification, setShowModalNotification] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const navigate = useNavigate()
    const {dashboardType} = useDashboardType()
    const dashboardRedirect = dashboardType === USER_TYPE.SELLER ? ROUTES.ADMIN : ROUTES.LOGIN;


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const handleNotification = () => setShowModalNotification((wasVisible) => !wasVisible);


    async function deleteAccount() {
        try {
            const response = await api.delete('/delete/');
            if (response.status === 200) {
                logout(ROUTES.LOGIN);
            } else {
                setMessage('No se pudo eliminar la cuenta');
                setMessageType('error');
                setShowMessage(true);
            }
        } catch (error) {
            setMessage('Ocurrió un error al procesar tu solicitud.');
            setMessageType('error');
            setShowMessage(true);
        }

        setIsModalOpen(false);
        setTimeout(() => {
            setShowMessage(false);
        });

        setTimeout(() => {
            navigate(ROUTES.LOGIN);
        });
    }

    return (
        <Fragment>
            <nav className="flex items-center justify-between px-8 py-4 bg-gray-200 dark:bg-gray-800 shadow-md">
                <div className="text-2xl font-bold">
                    <a href="" className="text-orange-600 dark:text-orange-400">Logo</a>
                </div>
                <div className="space-x-4">
                    <ul className="flex items-center space-x-6">
                        {user && <NotificationIcon count={6} onClick={handleNotification}/>}
                        <ThemeToggleIcon toggleTheme={toggleTheme} isDarkMode={isDarkMode}/>
                        {user ? (
                            <li className="relative">
                                <button
                                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-400 dark:border-gray-600"
                                    onClick={toggleDropdown}
                                >
                                    <img
                                        className="inline object-cover w-12 h-12 mr-2 rounded-full"
                                        src={user?.profileImage || "https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg"}
                                        alt="Profile"
                                    />
                                </button>

                                {dropdownOpen && (
                                    <ul className="absolute right-0 mt-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md shadow-lg py-2 w-48">
                                        <li>
                                            <Link
                                                to={ROUTES.EDIT_PROFILE}
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                                            >
                                                Editar Usuario
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to={ROUTES.HISTORY_ORDERS}
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                                            >
                                                Historial
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                                                onClick={() => logout(dashboardRedirect)}
                                            >
                                                Cerrar Sesión
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="block w-full text-left px-4 py-2 hover:bg-red-500 dark:hover:bg-red-600 text-white"
                                                onClick={openModal}
                                            >
                                                Eliminar Usuario
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        ) : (
                            <Fragment>
                                <li className="transition transform hover:scale-110 ease-in-out duration-200">
                                    <Link
                                        to="/"
                                        className="text-gray-700 dark:text-gray-300 hover:text-pink-600 transition-colors duration-300"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="transition transform hover:scale-110 ease-in-out duration-200">
                                    <Link
                                        to="/login"
                                        className="text-gray-700 dark:text-gray-300 hover:text-pink-600 transition-colors duration-300"
                                    >
                                        Iniciar sesión
                                    </Link>
                                </li>
                            </Fragment>
                        )}
                    </ul>
                </div>
            </nav>

            {showMessage && (
                <AlertMessage
                    message={message}
                    type={messageType}
                    onClose={() => setShowMessage(false)}
                />
            )}

            {isModalOpen && (
                <DeleteUserModal isOpenModal={isModalOpen} onCloseModal={closeModal} onDelete={deleteAccount}/>
            )}

            {showModalNotification && (
                <NotificationModal onClose={() => setShowModalNotification(false)}/>
            )}
        </Fragment>
    );
}
