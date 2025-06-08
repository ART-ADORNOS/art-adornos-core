import * as FaIcons from "react-icons/fa";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";

const getIconComponent = (iconName) => {
    if (FaIcons[iconName]) return FaIcons[iconName];
    if (GiIcons[iconName]) return GiIcons[iconName];
    if (MdIcons[iconName]) return MdIcons[iconName];
    return FaIcons.FaRocket; // Default
};

export default getIconComponent;
