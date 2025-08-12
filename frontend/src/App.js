import {useEffect, useMemo, useState} from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {AuthProvider} from './shared/providers/AuthContext';
import LandingPages from "./modules/landing/pages/landingPages";
import NotFoundPage from "./shared/components/pages/NotFoundPage";
import ThemeContext from "./shared/providers/ThemeContent";
import LoginAdmin from "./modules/auth/pages/login/LoginAdmin";
import Login from './modules/auth/pages/login/Login';
import Register from './modules/auth/pages/register/register';
import Dashboard from './modules/dashboard/pages/dashboard/Dashboard';
import DashboardSeller from './modules/dashboard/pages/userSeller/DashboardSeller';
import UpdateProfile from './modules/dashboard/pages/dashboard/updateProfile';
import {NotificationProvider} from "./shared/providers/alertProvider";
import RegisterStartup from "./modules/startup/pages/registerStartup";
import ProductList from "./modules/products/pages/ProductList";
import StartupProvider from "./modules/startup/context/StartupProvider";
import ProductForm from "./modules/products/pages/ProductForm";
import CategoryForm from "./modules/category/pages/CategoryForm";
import ProductDetail from "./modules/products/pages/ProductDetail";
import CartOrdersList from "./modules/cart/pages/cartOrdersList";
import OrderHistoryList from "./modules/orderHistory/pages/orderHistoryList";
import {DashboardTypeProvider} from "./shared/providers/dashboardTypeProvider";


const ProtectedRoute = ({children}: { children: React.ReactNode }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/"/>;
};


function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const themeValue = useMemo(() => ({isDarkMode, toggleTheme}), [isDarkMode, toggleTheme]);

    useEffect(() => {
        const storedTheme = localStorage.getItem("isDarkMode");
        if (storedTheme === "true") {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    function toggleTheme() {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem("isDarkMode", newMode.toString());
            if (newMode) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            return newMode;
        });
    }

    return (
        <ThemeContext.Provider value={themeValue}>
            <div className={`${isDarkMode ? "dark" : "light"} min-h-screen flex flex-col`}>
                <NotificationProvider>
                    <AuthProvider>
                        <DashboardTypeProvider>

                            <Router>
                                <Routes>
                                    <Route path="/" element={<LandingPages/>}/>
                                    <Route path="/register" element={<Register/>}/>
                                    <Route path="/login" element={<Login/>}/>
                                    <Route path="/admin" element={<LoginAdmin/>}/>
                                    <Route path="*" element={<NotFoundPage/>}/>
                                    <Route path="/edit-profile"
                                           element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
                                    <Route path="/register-startup"
                                           element={<ProtectedRoute><RegisterStartup/></ProtectedRoute>}/>
                                    <Route path="/product-detail/:id"
                                           element={<ProtectedRoute><ProductDetail/></ProtectedRoute>}/>
                                    <Route path="/cart-orders-list"
                                           element={<ProtectedRoute><CartOrdersList/></ProtectedRoute>}/>

                                    <Route path="/history-orders"
                                           element={
                                               <ProtectedRoute><OrderHistoryList/></ProtectedRoute>
                                           }/>

                                    <Route path="/dashboard"
                                           element={
                                               <StartupProvider>
                                                   <ProtectedRoute>
                                                       <Dashboard/>
                                                   </ProtectedRoute>
                                               </StartupProvider>
                                           }
                                    />

                                    <Route
                                        path="/dashboard-seller"
                                        element={
                                            <StartupProvider>
                                                <ProtectedRoute>
                                                    <DashboardSeller/>
                                                </ProtectedRoute>
                                            </StartupProvider>
                                        }
                                    />
                                    <Route
                                        path="/product-list"
                                        element={<StartupProvider>
                                            <ProtectedRoute>
                                                <ProductList/>
                                            </ProtectedRoute>
                                        </StartupProvider>}
                                    />

                                    <Route
                                        path="/register-product"
                                        element={<StartupProvider>
                                            <ProtectedRoute>
                                                <ProductForm/>
                                            </ProtectedRoute>
                                        </StartupProvider>}
                                    />
                                    <Route
                                        path="/register-category"
                                        element={<StartupProvider>
                                            <ProtectedRoute>
                                                <CategoryForm/>
                                            </ProtectedRoute>
                                        </StartupProvider>}
                                    />
                                </Routes>
                            </Router>
                        </DashboardTypeProvider>
                    </AuthProvider>
                </NotificationProvider>
            </div>
        </ThemeContext.Provider>
    );
}

export default App;