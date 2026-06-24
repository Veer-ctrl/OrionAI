import { createContext, useState, useContext, useEffect } from "react";
import authService from "../services/authService";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in on mount
  useEffect(() => {
  const checkAuth = async () => {
    try {
      const data = await authService.getCurrentUser();

      setUser(data.user);
      setIsAuthenticated(true);
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  checkAuth();
}, []);

  const login = async (email, password) => {
  setIsLoading(true);
  setError(null);

  try {
    const data = await authService.login({ email, password });

    setUser(data.user);
    setIsAuthenticated(true);

    return data.user;
  } catch (err) {
    setError(err.message);
    throw err;
  } finally {
    setIsLoading(false);
  }
};

  const register = async (name, email, password) => {
  setIsLoading(true);
  setError(null);

  try {
    const data = await authService.register({
      name,
      email,
      password,
    });

    setUser(data.user);
    setIsAuthenticated(true);

    return data.user;
  } catch (err) {
    setError(err.message);
    throw err;
  } finally {
    setIsLoading(false);
  }
};

  const logout = async () => {
  setIsLoading(true);
  setError(null);

  try {
    await authService.logout();

    setUser(null);
    setIsAuthenticated(false);
  } catch (err) {
    setError(err.message);
    throw err;
  } finally {
    setIsLoading(false);
  }
};

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    isLoading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};
