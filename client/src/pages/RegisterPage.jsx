import { Link } from "react-router-dom";
import AuthLayout from "../components/Auth/AuthLayout";
import AuthBranding from "../components/Auth/AuthBranding";
import AuthCard from "../components/Auth/AuthCard";
import RegisterForm from "../components/Auth/RegisterForm";
import Logo from "@/assets/Logo.svg";
const RegisterPage = () => {
  return (
    <AuthLayout>
      <AuthBranding />
      <AuthCard>
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "transparent" }}
          >
            <span className="text-xs font-bold" style={{ color: "#071533" }}><img src={Logo} alt="Logo" className="w-full h-full object-contain" /></span>
          </div>
          <span className="text-sm font-semibold" style={{ color: "#FFF8EC" }}>Orion AI</span>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: "#FFF8EC" }}>
            Create an account
          </h1>
          <p className="text-sm" style={{ color: "rgba(255,248,236,0.45)" }}>
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold transition-colors duration-150"
              style={{ color: "#FF8A1F" }}
              onMouseEnter={(e) => (e.target.style.color = "#DFFF66")}
              onMouseLeave={(e) => (e.target.style.color = "#FF8A1F")}
            >
              Sign in
            </Link>
          </p>
        </div>

        <RegisterForm />
      </AuthCard>
    </AuthLayout>
  );
};

export default RegisterPage;
