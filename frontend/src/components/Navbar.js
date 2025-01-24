import {Link, useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import ThemeContext from "../context/ThemeContent";
import AuthContext from "../context/AuthContext";
import {BsSun, BsMoon} from "react-icons/bs";
import DeleteUserModal from "../components/modal/delete";
import api from '../utils/axios';
import AlertMessage from "./Messages/AlertMessage";


export default function Navbar() {
    const {isDarkMode, toggleTheme} = useContext(ThemeContext);
    const {user, logout} = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");     const [messageType, setMessageType] = useState("");
    const navigate = useNavigate()

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    async function deleteAccount() {
        try {
            const response = await api.delete('/delete/'); // Usa el interceptor para el token
            if  (response.status === 200) {
                console.log("cuenta eliminada");
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
        }); // 4 segundos

        setTimeout(() => {
            navigate('/login');
        });
    }

    return (
        <>
            <nav className="flex items-center justify-between px-8 py-4 bg-gray-200 dark:bg-gray-800 shadow-md">
                <div className="text-2xl font-bold">
                    <a href="/" className="text-orange-600 dark:text-orange-400">Logo</a>
                </div>
                <div className="space-x-4">
                    <ul className="flex items-center space-x-6">
                        <li className="cursor-pointer" onClick={toggleTheme}>
                            {isDarkMode ? (
                                <BsSun className="text-yellow-500 text-xl"/>
                            ) : (
                                <BsMoon className="text-black text-xl"/>
                            )}
                        </li>
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
                                                to="/edit-profile"
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                                            >
                                                Editar Usuario
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                                                onClick={() => logout('/login')}
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
                            <>
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
                            </>
                        )}
                    </ul>
                </div>
            </nav>

            {/* Mensaje de Alerta */}
            {showMessage && (
                <AlertMessage
                    message={message}
                    type={messageType}
                    onClose={() => setShowMessage(false)}
                />
            )}

            {/* Modal */}
            {isModalOpen && (
                <DeleteUserModal isOpenModal={isModalOpen} onCloseModal={closeModal} onDelete={deleteAccount}/>
            )}
        </>
    );
}
