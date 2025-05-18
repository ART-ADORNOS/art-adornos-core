import {Link} from "react-router-dom";
import {useState} from "react";
import DeleteModal from "../../../shared/components/ui/Modals/DeleteModal";
import {useDeleteCategory} from "../hooks/useDeleteCategory";
import ROUTES from "../../../core/constants/routes/routes";

const CategoryListModal = ({isOpen, onClose, categories}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const {deleteCategory} = useDeleteCategory();

    const handleDeleteRequest = (category) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    const handleDelete = async () => {
        if (selectedCategory) {
            await deleteCategory(selectedCategory.id);
            setIsModalOpen(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div
                className="bg-white dark:bg-gray-900 shadow-xl rounded-lg p-6 max-w-md w-full border border-gray-300 dark:border-gray-700 overflow-y-auto">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                    Categorías
                </h2>
                <ul className="divide-y divide-gray-300 dark:divide-gray-700 pt-4">
                    {categories.map((category) => (
                        <li key={category.id}
                            className="py-3 text-gray-700 dark:text-gray-300 flex justify-between items-center">
                            <span>{category.name}</span>
                            <div className="flex gap-4">
                                <Link
                                    to={`${ROUTES.REGISTER_CATEGORY}`}
                                    state={{
                                        categoryId: category.id,
                                        categoryName: category.name,
                                        categoryDescription: category.description
                                    }}>
                                    <button
                                        aria-label="Editar categoría"
                                        className="flex items-center gap-2 text-gray-600 hover:scale-105 transition-transform"
                                    >
                                        <svg className="w-6 stroke-green-700" viewBox="0 0 24 24" fill="none"
                                             stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg>
                                    </button>
                                </Link>

                                <button
                                    onClick={() => handleDeleteRequest(category)}
                                    aria-label="Eliminar categoría"
                                    className="flex items-center gap-2 text-gray-600 hover:scale-105 transition-transform"
                                >
                                    <svg className="w-6 stroke-red-700" viewBox="0 0 24 24" fill="none"
                                         stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path
                                            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                    </svg>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <button onClick={onClose}
                        className="mt-6 w-full py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all focus:outline-none focus:ring">
                    Cerrar
                </button>
            </div>
            {selectedCategory && (
                <DeleteModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleDelete}
                    message={`¿Estás seguro de que deseas eliminar la categoría "${selectedCategory.name}"?`}
                />
            )}
        </div>
    );
};

export default CategoryListModal;
