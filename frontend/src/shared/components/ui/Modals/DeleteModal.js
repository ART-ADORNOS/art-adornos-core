import { IoClose, IoWarningOutline } from "react-icons/io5";

const DeleteModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 relative transition-all">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
        >
          <IoClose size={20} />
        </button>
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <IoWarningOutline size={40} className="text-red-500 animate-pulse" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            {message || "¿Estás seguro de eliminar este elemento?"}
          </h2>
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={onClose}
              className="w-1/3 py-2 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 border rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="w-1/3 py-2 px-4 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
