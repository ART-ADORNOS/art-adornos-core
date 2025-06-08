import {GiForkKnifeSpoon, GiMicroscope} from "react-icons/gi";
import {
    FaBoxes,
    FaCarSide,
    FaCut,
    FaGraduationCap,
    FaHardHat,
    FaMicrochip,
    FaMoneyBillWave,
    FaTshirt
} from "react-icons/fa";
import {MdTheaterComedy} from "react-icons/md";

const iconClass = "text-gray-700 dark:text-gray-700";

const iconOptions = [
    {value: "GiMicroscope", label: "Ciencia", icon: <GiMicroscope className={iconClass}/>},
    {value: "GiForkKnifeSpoon", label: "Alimentos", icon: <GiForkKnifeSpoon className={iconClass}/>},
    {value: "FaCarSide", label: "Transporte", icon: <FaCarSide className={iconClass}/>},
    {value: "FaHardHat", label: "Construcción", icon: <FaHardHat className={iconClass}/>},
    {value: "FaGraduationCap", label: "Educación", icon: <FaGraduationCap className={iconClass}/>},
    {value: "FaMoneyBillWave", label: "Finanzas", icon: <FaMoneyBillWave className={iconClass}/>},
    {value: "FaMicrochip", label: "Tecnología", icon: <FaMicrochip className={iconClass}/>},
    {value: "FaCut", label: "Belleza", icon: <FaCut className={iconClass}/>},
    {value: "FaTshirt", label: "Ropa", icon: <FaTshirt className={iconClass}/>},
    {value: "FaBoxes", label: "Logística", icon: <FaBoxes className={iconClass}/>},
    {value: "MdTheaterComedy", label: "Arte y Cultura", icon: <MdTheaterComedy className={iconClass}/>},
];

export default iconOptions;
