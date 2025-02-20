import { Link } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";

const AddButton = ({ redirectTo, title }) => (
    <Link to={redirectTo} >
        <button className="flex items-center space-x-2 cursor-pointer transition-all
            bg-gray-600 text-white px-6 py-2 rounded-lg
            border-orange-400 border-b-[4px]
            hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
            active:border-b-[2px] active:brightness-90 active:translate-y-[2px]
            hover:shadow-xl hover:shadow-orange-300 active:shadow-none ml-auto mr-10 mt-6">

            <IoAddOutline size={24} className="stroke-white" />
            <span className="text-sm">{title}</span>
        </button>
    </Link>
);

export default AddButton;
