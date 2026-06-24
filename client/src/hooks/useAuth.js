import { useAuthContext } from "../context/AuthContext";

const useAuth = () => {
  const { user, isLoading, error, isAuthenticated } = useAuthContext();
  return { user, isLoading, error, isAuthenticated };
};

export default useAuth;
