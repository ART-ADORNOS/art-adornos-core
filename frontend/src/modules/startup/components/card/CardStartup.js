import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {StartupContext} from "../../context/StartupProvider";
import {IoEllipsisVertical, IoPencil, IoTrash} from "react-icons/io5";
import useOutsideClick from "../../../products/hooks/useOutsideClick";
import DeleteModal from "../../../../shared/components/molecules/DeleteModal";
import {useDeleteStartups} from "../../hooks/useDeleteStartups";
import Loader from "../../../dashboard/components/Loader";
import ROUTES from "../../../../core/constants/routes/routes";
import getIconComponent from "../../../../shared/utils/getIconComponent";
import {useDashboardType} from "../../../../shared/providers/dashboardTypeProvider";

const CardStartup = ({startup}) => {
    const {setSelectedStartup} = useContext(StartupContext);
    const {isMenuOpen, setIsMenuOpen, menuRef} = useOutsideClick();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {deleteStartup, isDeleting} = useDeleteStartups(startup.id);
    const Icon = getIconComponent(startup.icon)
    const {usertype} = useDashboardType()

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

    if (isDeleting) {
        return <Loader/>;
    }

    return (
        <div
            className="group relative w-full sm:w-80 h-32 mb-6 transition-all duration-300 hover:-translate-y-1 mx-auto">
            <div
                className="absolute inset-0 bg-gradient-to-r from-orange-100 to-purple-100 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-500"></div>

            <div
                className="relative h-full cursor-pointer bg-white dark:bg-neutral-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center p-4 gap-4 border border-gray-100 dark:border-neutral-700">
                <div className="flex items-center flex-1 min-w-0">
                    <div className="p-2 rounded-full flex-shrink-0">
                        <Icon size={40}/>
                    </div>

                    <div className="ml-3 overflow-hidden">
                        <Link
                            to={`${ROUTES.PRODUCT_LIST}`}
                            onClick={handleClick}
                            className="text-lg font-semibold text-neutral-800 dark:text-white hover:underline truncate block"
                            title={startup.name}
                        >
                            {startup.name}
                        </Link>
                    </div>
                </div>

                {usertype !== "user" && (
                    <div className="flex-shrink-0 relative">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsMenuOpen(!isMenuOpen);
                            }}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
                            aria-label="Opciones"
                        >
                            <IoEllipsisVertical size={20}/>
                        </button>

                        {isMenuOpen && (
                            <div
                                ref={menuRef}
                                className="absolute right-0 bottom-full mb-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-md shadow-lg w-40 z-10 border border-gray-200 dark:border-neutral-700"
                            >
                                <ul className="py-1">
                                    <li>
                                        <Link
                                            to={`${ROUTES.REGISTER_STARTUP}`}
                                            state={{
                                                startupId: startup.id,
                                                startupName: startup.name,
                                                startupDescription: startup.description,
                                                startupIndustry: startup.industry,
                                                startupIcon: startup.icon,
                                            }}
                                            className="flex items-center gap-2 px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer"
                                        >
                                            <IoPencil size={18}/>
                                            <span>Editar</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteRequest();
                                            }}
                                            className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-red-100 dark:hover:bg-red-900 cursor-pointer"
                                        >
                                            <IoTrash size={18}/>
                                            <span>Eliminar</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                <div
                    className="absolute top-0 left-0 bottom-0 w-1 bg-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

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