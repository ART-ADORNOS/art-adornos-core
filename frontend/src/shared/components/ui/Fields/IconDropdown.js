import React, {useState} from "react";
import {FiChevronDown} from "react-icons/fi";

const IconDropdown = ({label, name, value, onChange, options = []}) => {
    const [show, setShow] = useState(false);

    const handleSelect = (selectedValue) => {
        onChange({target: {name, value: selectedValue}});
        setShow(false);
    };

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className="mb-4 relative z-10">
            <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <div
                className="flex items-center justify-between p-2 border rounded-md bg-white cursor-pointer shadow-sm"
                onClick={() => setShow(!show)}
            >
                <span className="flex items-center gap-2 text-gray-700">
                    {selectedOption?.icon}
                    {selectedOption?.label || "Seleccione un icono"}
                </span>
                <span className="text-gray-400"> <FiChevronDown size={20}/></span>
            </div>

            {show && (
                <div className="absolute w-full mt-1 bg-white border rounded-md shadow-md max-h-60 overflow-y-auto">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelect(option.value)}
                            className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                        >
                            {option.icon}
                            <span className="text-gray-700">{option.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default IconDropdown;
