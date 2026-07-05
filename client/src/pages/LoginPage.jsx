import AuthLayout from "../components/auth/AuthLayout";
import AuthBranding from "../components/auth/AuthBranding";
import AuthCard from "../components/auth/AuthCard";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <AuthLayout>
      <AuthBranding />

      <AuthCard>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome Back
            </h1>

            <p className="text-muted-foreground mt-2">
              Sign in to continue to OrionAI.
            </p>
          </div>

          <LoginForm />
        </div>
      </AuthCard>
    </AuthLayout>
  );
};

export default LoginPage;