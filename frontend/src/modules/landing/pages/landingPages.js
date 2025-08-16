import Navbar from "../../../shared/components/organisms/Navbar";
import Footer from "../../../shared/components/organisms/Footer";
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
                <div className="flex flex-col sm:flex-row justify-center items-center gap-8 flex-wrap">
                    <Link
                        to={`${ROUTES.LOGIN}`}
                        className="w-full sm:w-96 max-w-md cursor-pointer transition-all
                          bg-white text-gray-900 text-xl px-6 py-12 rounded-xl
                          border-orange-400 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                          active:border-b-[2px] active:brightness-90 active:translate-y-[2px]
                          hover:shadow-xl hover:shadow-orange-300 shadow-orange-300 active:shadow-none
                          flex justify-center items-center space-x-6"
                    >
                        <FaUserAlt className="text-5xl shrink-0"/>
                        <div className="flex flex-col items-center justify-center">
                            <span className="font-bold text-2xl">Usuario</span>
                        </div>
                    </Link>

                    <Link
                        to={`${ROUTES.ADMIN}`}
                        className="w-full sm:w-96 max-w-md cursor-pointer transition-all
                          bg-white text-gray-900 text-xl px-6 py-12 rounded-xl
                          border-orange-400 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                          active:border-b-[2px] active:brightness-90 active:translate-y-[2px]
                          hover:shadow-xl hover:shadow-orange-300 shadow-orange-300 active:shadow-none
                          flex justify-center items-center space-x-6"
                    >
                        <FaUserGear className="text-5xl shrink-0"/>
                        <div className="flex flex-col items-center justify-center">
                            <span className="font-bold text-2xl">Vendedor</span>
                        </div>
                    </Link>
                </div>
            </section>
            <Footer/>
        </header>
    );
}
  