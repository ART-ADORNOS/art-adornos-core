import Navbar from "../../../shared/components/layout/header/Navbar"
import {useNotification} from "../../../shared/providers/alertProvider";
import {Link} from "react-router-dom";
import React from "react";


export default function AccountPage() {
    const {showNotification} = useNotification();

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (email && password) {
            showNotification("Formulario enviado correctamente!", "success");
        } else {
            showNotification("Por favor, complete todos los campos.", "error");
        }
    };

    return (
        <div className="bg-zinc-100 dark:bg-gray-900 flex-auto text-gray-900 dark:text-white flex flex-col">
            <Navbar/>
            <section className="text-center my-16 mx-8 flex-auto">
                <h1 className="text-5xl font-extrabold ">Bienvenido Administrador</h1>
                <div className="flex min-h-full flex-col justify-center px-6  lg:px-8">
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your email
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="name@flowbite.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your password
                                    </label>
                                    <div className="text-sm">
                                        <a
                                            href="#"
                                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                                        >
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        type="password"
                                        id="password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                        <p className="mt-10 text-center text-sm text-gray-500">
                            No tienes cuenta?{" "}
                            <Link
                                to="/register-user-seller"
                                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                            >
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
