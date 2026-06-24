import { useState } from "react";

const LogoutButton = ({ onLogoutSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      if (onLogoutSuccess) {
        onLogoutSuccess();
      }
    } catch (err) {
      setError(err.message || "An error occurred during logout");
      console.error("Logout error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleLogout} disabled={isLoading}>
        {isLoading ? "Logging out..." : "Logout"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LogoutButton;
