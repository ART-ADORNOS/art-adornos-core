import {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import {AuthProvider} from './shared/providers/AuthContext';
import LandingPages from "./modules/landing/pages/landingPages";
import NotFoundPage from "./shared/components/errors/NotFoundPage";
import ThemeContext from "./shared/providers/ThemeContent";
import LoginAdmin from "./modules/auth/pages/LoginAdmin";
import Login from './modules/auth/pages/Login';
import Register from './modules/auth/pages/register';
import Dashboard from './modules/dashboard/pages/Dashboard';
import UpdateProfile from './modules/dashboard/pages/updateProfile';
import {NotificationProvider} from "./shared/providers/alertProvider";


const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login"/>;
};

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem("isDarkMode");
        if (storedTheme === "true") {
            setIsDarkMode(true);
        }
    }, []);

    function toggleTheme() {
        setIsDarkMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem("isDarkMode", newMode.toString());
            return newMode;
        });
    }

    return (
        <ThemeContext.Provider value={{isDarkMode, toggleTheme}}>
            <div className={`${isDarkMode ? "dark" : "light"} min-h-screen flex flex-col`}>
                <NotificationProvider>
                    <AuthProvider>
                        <Router>
                            <Routes>
                                <Route path="/" element={<LandingPages/>}/>
                                <Route path="/register" element={<Register/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route
                                    path="/dashboard"
                                    element={
                                        <ProtectedRoute>
                                            <Dashboard/>
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/edit-profile"
                                    element={
                                        <ProtectedRoute>
                                            <UpdateProfile/>
                                        </ProtectedRoute>
                                    }
                                />
                                <Route path="/admin" element={<LoginAdmin/>}/>
                                <Route path="*" element={<NotFoundPage/>}/>
                            </Routes>
                        </Router>
                    </AuthProvider>
                </NotificationProvider>
            </div>
        </ThemeContext.Provider>
    );
}

export default App;