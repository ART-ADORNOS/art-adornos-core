import useOutsideClick from "../../products/hooks/useOutsideClick";
import CategoryListModal from "./CategoryListModal";
import categoryColors from "../../../core/constants/colors/categoryColors";
import CategoryToggleButton from "./CategoryToggleButton";

const CategorySidebar = ({categories}) => {
    const {isMenuOpen, setIsMenuOpen, menuRef} = useOutsideClick();

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
            <CategoryToggleButton
                isMenuOpen={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            />

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
