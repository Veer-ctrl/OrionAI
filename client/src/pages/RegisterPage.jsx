import AuthLayout from "../components/auth/AuthLayout";
import AuthBranding from "../components/auth/AuthBranding";
import AuthCard from "../components/auth/AuthCard";
import RegisterForm from "../components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <AuthLayout>
      <AuthBranding />

      <AuthCard>
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Create Account
            </h1>

            <p className="text-muted-foreground">
              Join OrionAI and start chatting with your documents.
            </p>
          </div>

          <RegisterForm />
        </div>
      </AuthCard>
    </AuthLayout>
  );
};

export default RegisterPage;