import React, {useContext, useState} from "react";
import {FaRocket} from "react-icons/fa";
import {Link} from "react-router-dom";
import {StartupContext} from "../../context/StartupProvider";
import {IoEllipsisVertical, IoPencil, IoTrash} from "react-icons/io5";
import useOutsideClick from "../../../products/hooks/useOutsideClick";
import DeleteModal from "../../../../shared/components/ui/Modals/DeleteModal";
import {useDeleteStartups} from "../../hooks/useDeleteStartups";

const CardStartup = ({startup}) => {
    const {setSelectedStartup} = useContext(StartupContext);
    const {isMenuOpen, setIsMenuOpen, menuRef} = useOutsideClick();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {deleteStartup, isDeleting} = useDeleteStartups(startup.id);


    const handleClick = () => {
        localStorage.setItem("selectedStartupId", startup.id);
        localStorage.setItem("selectedStartupData", JSON.stringify(startup));
        setSelectedStartup(startup);
    };
    const handleDeleteRequest = () => {
        setIsModalOpen(true);
    };
    const handleDelete = async () => {
        await deleteStartup();
        setIsModalOpen(false);
    };

    return (
        <div className="group relative w-80 h-32 mb-6 transition-all duration-300 hover:-translate-y-1">
            <div
                className="absolute inset-0 bg-gradient-to-r from-orange-100 to-purple-100 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
            <div
                className="relative h-full cursor-pointer bg-white dark:bg-neutral-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center p-4 gap-4 border border-gray-100 dark:border-neutral-700">
                <div className="p-2 rounded-full flex items-center justify-center">
                    <FaRocket className="stroke-orange-400 dark:stroke-orange-300" size={40}/>
                </div>
                <div>
                    <Link to="/product-list" onClick={handleClick}
                          className="text-lg font-semibold text-neutral-800 dark:text-white hover:underline">
                        {startup.name}
                    </Link>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 rounded-full">
                        <IoEllipsisVertical size={20}/>
                    </button>
                </div>
                <div
                    className="absolute top-0 left-0 bottom-0 w-1 bg-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            {isMenuOpen && (
                <div ref={menuRef}
                     className="absolute bottom-14 right-4 bg-gray-800 text-white rounded-md shadow-lg w-35">
                    <ul className="p-2 space-y-1">
                        <Link
                            to="/register-startup"
                            state={{
                                startupId: startup.id,
                                startupName: startup.name,
                                startupDescription: startup.description,
                                startupIndustry: startup.industry,
                            }}
                            className="flex items-center gap-2 p-2 hover:bg-blue-500 cursor-pointer rounded-md">
                            <IoPencil size={18}/>
                            Editar
                        </Link>
                        <li
                            onClick={handleDeleteRequest}
                            className="flex items-center gap-2 p-2 hover:bg-red-500 cursor-pointer rounded-md">
                            <IoTrash size={18}/>
                            Eliminar
                        </li>
                    </ul>
                </div>
            )}
            <DeleteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                message={`¿Estás seguro de que deseas eliminar el startup "${startup.name}"?`}
            />
        </div>
    );
};

export default CardStartup;
