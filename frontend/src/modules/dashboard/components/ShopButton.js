import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const ShopButton = ({ redirectTo }) => (
  <Link to={redirectTo}>
    <button
      className="w-11 h-11 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-transform duration-200 active:scale-95"
      aria-label="Go to shop"
    >
      <FaShoppingCart className="w-5 h-5" />
    </button>
  </Link>
);

export default ShopButton;
