const CategorySidebar = ({ categories }) => {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-zinc-100 dark:bg-gray-900 overflow-x-auto">
      {categories.map((category) => (
        <button
          key={category.id}
          className="cursor-pointer py-2 px-4 text-sm font-medium flex items-center gap-3 transition-all bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md whitespace-nowrap"
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategorySidebar;
