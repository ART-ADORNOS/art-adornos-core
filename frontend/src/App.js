import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './shared/providers/AuthContext';
import LandingPages from "./modules/landing/pages/landingPages";
import NotFoundPage from "./shared/components/errors/NotFoundPage";
import ThemeContext from "./shared/providers/ThemeContent";
import LoginAdmin from "./modules/auth/pages/login/LoginAdmin";
import Login from './modules/auth/pages/login/Login';
import Register from './modules/auth/pages/register/register';
import Dashboard from './modules/dashboard/pages/dashboard/Dashboard';
import DashboardSeller from './modules/dashboard/pages/userSeller/DashboardSeller';
import UpdateProfile from './modules/dashboard/pages/dashboard/updateProfile';
import { NotificationProvider } from "./shared/providers/alertProvider";
import RegisterStartup from "./modules/startup/pages/registerStartup";
import ProductList from "./modules/products/pages/ProductList";

export const protectedRoutes: { path: string, component: React.ReactNode }[] = [
    { path: "/dashboard", component: <Dashboard /> },
    { path: "/edit-profile", component: <UpdateProfile /> },
    { path: "/dashboard-seller", component: <DashboardSeller /> },
    { path: "/register-startup", component: <RegisterStartup /> },
    { path: "/product-list", component: <ProductList /> },
];

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
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
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem("isDarkMode", newMode.toString());
            return newMode;
        });
    }

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <div className={`${isDarkMode ? "dark" : "light"} min-h-screen flex flex-col`}>
                <NotificationProvider>
                    <AuthProvider>
                        <Router>
                            <Routes>
                                <Route path="/" element={<LandingPages />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/admin" element={<LoginAdmin />} />
                                <Route path="*" element={<NotFoundPage />} />
                                {protectedRoutes.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={<ProtectedRoute>{route.component}</ProtectedRoute>}
                                    />
                                ))}
                            </Routes>
                        </Router>
                    </AuthProvider>
                </NotificationProvider>
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
