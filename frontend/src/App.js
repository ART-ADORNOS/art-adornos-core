import {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import LandingPages from "./pages/landingPages";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/errors/NotFoundPage";
import ThemeContext from "./context/ThemeContent";
import LoginAdmin from "./modules/auth/pages/LoginAdmin";
import Login from './pages/auth/Login';
import Register from './pages/register';
import Dashboard from './pages/Dashboard';
import UpdateProfile from './pages/dashboard/updateProfile';
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
                                <Route path="/about" element={<AboutPage/>}/>
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