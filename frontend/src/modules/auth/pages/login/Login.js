import React from 'react';
import {Link} from "react-router-dom";
import Navbar from "../../../../shared/components/organisms/Navbar";
import {useLogin} from "../../hooks/userLogin";
import ROUTES from "../../../../core/constants/routes/routes";

const Login = () => {
    const {credentials, handleChange, handleSubmit} = useLogin();


    return (<div className="bg-zinc-100 dark:bg-gray-900 flex-auto text-gray-900 dark:text-white flex flex-col">
        <Navbar/>
        <section className="text-center my-16 mx-8 flex-auto">
            <h1 className="text-5xl font-extrabold ">BIENVENIDO USUARIO</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mt-5">
                    <label className="font-semibold text-sm text-gray-950 pb-1 block dark:text-gray-300"
                           htmlFor="username">Usuario</label>
                    <input
                        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full border-gray-400 text-black"
                        type="text"
                        id="username"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                    />
                    <label className="font-semibold text-sm text-gray-950 pb-1 block dark:text-gray-300"
                           htmlFor="password">Contraseña</label>
                    <input
                        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full border-gray-400 text-black"
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mt-5">
                    <button
                        className="py-2 px-4 bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                        type="submit"
                    >
                        Log in
                    </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                    <Link
                        to={`${ROUTES.REGISTER}`}
                        className="text-xs text-blue-500 uppercase dark:text-blue-400 hover:underline"
                    >
                        REGISTRESE SI AUN NO LO HA HECHO
                    </Link>
                    <span className="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>
                </div>
            </form>
        </section>
    </div>);
};

export default Login;
