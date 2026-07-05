import { createContext, useEffect, useState } from "react";
import {
  login as loginService,
  logout as logoutService,
  register as registerService,
  getCurrentUser,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (credentials) => {
    const data = await loginService(credentials);

    setUser(data.user);
    setIsAuthenticated(true);

    return data;
  };

  const register = async (userData) => {
    const data = await registerService(userData);

    setUser(data.user);
    setIsAuthenticated(true);

    return data;
  };

  const logout = async () => {
    await logoutService();

    setUser(null);
    setIsAuthenticated(false);
  };

  const checkAuth = async () => {
    try {
      setLoading(true);

      const data = await getCurrentUser();

      setUser(data.user);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    register,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;