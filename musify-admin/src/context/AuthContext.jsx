import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("adminUser")) || null);
    const [token, setToken] = useState(localStorage.getItem("adminToken"));
    const [loading, setLoading] = useState(true);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password, portal: "admin" });
            if (response.status === 200) {

                const userData = {
                    email: response.data.email,
                    role: response.data.role
                };
                setToken(response.data.token);
                setUser(userData);
                localStorage.setItem('adminToken', response.data.token);
                localStorage.setItem('adminUser', JSON.stringify(userData));
                return { success: true };

            } else {
                return { 
                    success: false, 
                    message: response.data.message || "Login failed" 
                };
            }
        } catch (err) {
            return { 
                success: false, 
                message: err.response?.data?.message || "Login failed" 
            };
        }
    }

    const isAuthenticated=()=>{
        return !!token && !! user;
    }

    const isAdmin=()=>{
        return user && user.role==="ADMIN"
    }

    const logout=()=>{
        setToken(null);
        setUser(null);
        localStorage.removeItem("amdinToken");
        localStorage.removeItem("amdinUser");
    }
    useEffect(()=>{
    const storedToken=localStorage.getItem("adminToken");
    const storedUser=localStorage.getItem("adminUser");
    if(storedToken && storedUser){
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  },[]);


    const contextValue = {
        user,
        setUser,
        token,
        setToken,
        loading,
        setLoading,
        login,
        logout,
        isAuthenticated,
        isAdmin,
    

    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
