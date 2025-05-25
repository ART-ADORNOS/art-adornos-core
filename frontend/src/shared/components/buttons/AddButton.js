import {Link} from "react-router-dom";
import {IoAddOutline} from "react-icons/io5";

const AddButton = ({redirectTo, title, isFloating = false}) => {
    const commonStyles = `
        flex items-center justify-center space-x-2 transition-all
        bg-gray-600 text-white
        border-orange-400 border-b-[4px]
        hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]
        hover:shadow-xl hover:shadow-orange-300 active:shadow-none
    `;

    const buttonStyles = isFloating
        ? `px-4 py-4 rounded-full ${commonStyles}`
        : `px-6 py-2 rounded-lg ml-auto mr-10 mt-6 ${commonStyles}`;

    return (
        <Link to={redirectTo}>
            <button className={buttonStyles}>
                <IoAddOutline size={24} className="stroke-white"/>
                {!isFloating && <span className="text-sm">{title}</span>}
            </button>
        </Link>
    );
};

export default AddButton;
