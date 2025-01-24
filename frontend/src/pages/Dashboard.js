import React, {useContext} from 'react';
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    const {user} = useContext(AuthContext);

    return (
        <div className="bg-zinc-100 dark:bg-gray-900 flex-auto text-gray-900 dark:text-white flex flex-col">
            <Navbar/>
            <div>
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white text-center mt-6">
                    Bienvenido, <span className="text-blue-600">{user?.username}</span> 👋
                </h1>

            </div>

        </div>
    );
};

export default Dashboard;
