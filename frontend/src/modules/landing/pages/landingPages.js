import Navbar from "../../../shared/components/layout/header/Navbar";
import Footer from "../../../shared/components/layout/Footer";
import {Link} from "react-router-dom";
import {FaUserAlt} from "react-icons/fa";
import {FaUserGear} from "react-icons/fa6";
import ROUTES from "../../../core/constants/routes/routes";


export default function LandingPage() {
    return (
        <header className="bg-zinc-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white flex flex-col">

            <Navbar/>
            <section className="flex-grow text-center my-16 mx-8">
                <h1 className="font-extrabold text-5xl mb-2">Art Home</h1>
                <p className="text-xl mb-8">
                    Tu hogar, tu arte.
                </p>
                <div className="flex space-x-40 justify-center mt-10">
                    <Link
                        to={`${ROUTES.LOGIN}`}
                        className="cursor-pointer transition-all
                          bg-white text-gray-900 text-2xl px-28 py-12 rounded-lg
                          border-orange-400 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                          active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-orange-300 shadow-orange-300 active:shadow-none flex items-center justify-center space-x-4"
                    >
                        <FaUserAlt className="text-6xl"/>
                        <span className="font-bold">Usuario</span>
                    </Link>
                    <Link
                        to={`${ROUTES.ADMIN}`}
                        className="cursor-pointer transition-all
                          bg-white text-gray-900 text-2xl px-28 py-12 rounded-lg
                          border-orange-400 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                          active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-orange-300 shadow-orange-300 active:shadow-none flex items-center justify-center space-x-4"
                    >
                        <FaUserGear className="text-6xl"/>
                        <span className="font-bold">Vendedor</span>
                    </Link>
                </div>

            </section>
            <Footer/>
        </header>
    );
}
  