
import { useState } from "react";
const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async () => {
        try {

        } catch (error) {

        }
    };

    const register = async () => {
        try {

        } catch (error) {

        }
    }


    const logout = () => {
        setIsAuthenticated(false);
    };

    return { isAuthenticated, register, login, logout };
};

export default useAuth;