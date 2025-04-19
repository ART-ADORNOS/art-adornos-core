import React, {useEffect, useState} from "react";
import {FiFile, FiTrash2, FiUploadCloud} from "react-icons/fi";

const ProductInput = ({formData, handleChange, categories}) => {
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        if (formData.image) {
            setPreviewImage(formData.image);
        }
    }, [formData.image]);

    const handleImageChange = (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewImage(reader.result);
                };
                reader.readAsDataURL(file);
                handleChange(event);
            }
        }
    };

    const handleRemoveImage = () => {
        setPreviewImage(null);
        handleChange({
            target: {
                name: "image",
                files: [],
            },
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-800">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nombre del producto"
                        className="w-full p-3 border rounded-md bg-gray-50 text-gray-900"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-800">Categoría</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-md bg-white text-gray-900"
                    >
                        <option value="">Seleccione una opción</option>
                        {categories.map((cat, i) => (
                            <option key={i} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-800">Precio</label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Precio"
                            className="w-full p-3 border rounded-md bg-gray-50 text-gray-900"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-800">Stock</label>
                        <input
                            type="text"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            placeholder="Stock"
                            className="w-full p-3 border rounded-md bg-gray-50 text-gray-900"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
                        Descripción
                    </label>
                    <textarea
                        rows="5"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter your content"
                        id="content"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center">
                <div
                    className="w-full h-72 border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                >
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="imageUpload"
                    />
                    {!previewImage ? (
                        <label
                            htmlFor="imageUpload"
                            className="cursor-pointer flex flex-col items-center justify-center w-full h-full text-center hover:bg-gray-100 transition"
                        >
                            <FiUploadCloud className="text-blue-600 w-12 h-12 mb-4"/>
                            <span className="text-blue-600 font-semibold">
                              Sube una imagen o arrastra y suelta <u>aquí</u>
                            </span>
                            <span className="text-gray-400 text-sm mt-1">Soporta: JPG, JPEG2000, PNG</span>
                        </label>
                    ) : (
                        <>
                            <img
                                src={previewImage}
                                alt="Vista previa"
                                className="w-full h-full object-cover rounded-md shadow-md"
                            />
                        </>
                    )}
                </div>
                <div
                    className="mt-2 w-full flex items-center justify-between border border-gray-200 rounded-md bg-white px-4 py-2 shadow-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                        <FiFile className="w-8 h-8"/>
                    </div>
                    <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Eliminar archivo"
                    >
                        <FiTrash2 className="w-8 h-8"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductInput;