import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
	const { isLoading, isAuthenticated } = useAuth();
	const location = useLocation();

	if (isLoading) {
    return <div>Loading...</div>;
}

	return isAuthenticated ? (
		children
	) : (
		<Navigate to={redirectTo} state={{ from: location }} replace />
	);
};

export default ProtectedRoute;
