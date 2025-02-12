import {IoArrowBackOutline} from 'react-icons/io5';
import {Link} from "react-router-dom";

const GoBack = ({ redirectTo }) => (
    <Link to={redirectTo}>
    <button className="cursor-pointer ml-5 p-5 flex items-center space-x-2" title="Go Back">
        <IoArrowBackOutline size={24} className="stroke-black dark:stroke-gray-400"/>
        <span className="text-sm text-gray-700 dark:text-gray-400">Regresar</span>
    </button>
    </Link>
);

export default GoBack;