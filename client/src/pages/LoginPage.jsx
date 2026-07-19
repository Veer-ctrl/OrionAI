import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import AuthBranding from "../components/auth/AuthBranding";
import AuthCard from "../components/auth/AuthCard";
import LoginForm from "../components/auth/LoginForm";
import Logo from "@/assets/Logo.svg";
const LoginPage = () => {
  return (
    <AuthLayout>
      <AuthBranding />
      <AuthCard>
        
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#DFFF66" }}
          >
            <span className="text-xs font-bold"> <img src={Logo} alt="Orion AI Logo" className="h-12 w-auto mb-6 mx-auto" /></span>
          </div>
          <span className="text-sm font-semibold" style={{ color: "#FFF8EC" }}>Orion I</span>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: "#FFF8EC" }}>
            Welcome back
          </h1>
          <p className="text-sm" style={{ color: "rgba(255,248,236,0.45)" }}>
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold transition-colors duration-150"
              style={{ color: "#FF8A1F" }}
              onMouseEnter={(e) => (e.target.style.color = "#DFFF66")}
              onMouseLeave={(e) => (e.target.style.color = "#FF8A1F")}
            >
              Create one
            </Link>
          </p>
        </div>

        <LoginForm />
      </AuthCard>
    </AuthLayout>
  );
};

export default LoginPage;
