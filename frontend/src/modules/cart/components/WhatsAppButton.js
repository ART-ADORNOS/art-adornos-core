import {FaWhatsapp} from 'react-icons/fa';

const WhatsAppButton = () => {
    return (
        <button
            className="group relative overflow-hidden z-10 flex items-center px-6 py-3 text-lg font-medium text-gray-900 bg-gray-100 rounded-lg border border-gray-100 shadow-lg transition-all duration-300 hover:border-teal-600">
              <span
                  className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
                <FaWhatsapp className="w-6 h-6 text-green-600 transition-colors duration-300 group-hover:text-white"/>
                WhatsApp
              </span>
            <div
                className="absolute left-1/2 -translate-x-1/2 top-full w-[140%] h-[180%] bg-black/5 rounded-full transition-all duration-500 ease-out group-hover:top-[-35%] group-hover:bg-teal-600"></div>
            <div
                className="absolute left-[55%] -translate-x-1/2 top-[180%] w-[160%] h-[190%] bg-teal-600 rounded-full transition-all duration-500 delay-100 ease-out group-hover:top-[-45%]"></div>
        </button>
    );
};

export default WhatsAppButton;
