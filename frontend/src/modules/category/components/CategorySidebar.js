import useOutsideClick from "../../products/hooks/useOutsideClick";
import CategoryListModal from "./CategoryListModal";
import categoryColors from "../../../core/constants/colors/categoryColors";

const CategorySidebar = ({ categories }) => {
    const { isMenuOpen, setIsMenuOpen, menuRef } = useOutsideClick();

    return (
        <div className="relative flex gap-4 p-6 rounded-lg bg-zinc-100 dark:bg-gray-900 overflow-x-auto shadow-md">
            {categories.map((category, index) => (
                <button
                    key={category.id}
                    className={`
                        cursor-pointer py-3 px-6 text-sm font-semibold 
                        flex items-center gap-3 transition-all 
                        bg-gray-800 hover:bg-gray-700 rounded-md 
                        whitespace-nowrap shadow-sm 
                        ${categoryColors[index % categoryColors.length]}
                    `}
                >
                    {category.name}
                </button>
            ))}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-sm font-semibold text-blue-500 border border-blue-500 px-4 py-2 rounded-lg transition-all hover:bg-blue-500 hover:text-white shadow-md"
            >
                <span>Ver categorías</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5 transition-transform transform group-hover:rotate-90"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16m-7 6h7"
                    />
                </svg>
            </button>

            {isMenuOpen && (
                <CategoryListModal
                    isOpen={isMenuOpen}
                    onClose={() => setIsMenuOpen(false)}
                    categories={categories}
                />
            )}
        </div>
    );
};

export default CategorySidebar;
