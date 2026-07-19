import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import PasswordInput from "./PasswordInput";
import { loginSchema } from "../../../schemas/authSchema";
import useAuth from "../../hooks/useAuth";

const darkInput = {
  backgroundColor: "rgba(255,248,236,0.06)",
  border: "1px solid rgba(255,248,236,0.1)",
  color: "#FFF8EC",
  borderRadius: "0.875rem",
  height: "48px",
  fontSize: "14px",
};

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values) => {
    try {
      await login(values);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium" style={{ color: "rgba(255,248,236,0.5)" }}>
                Email address
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  style={darkInput}
                  className="placeholder:text-[rgba(255,248,236,0.25)] focus-visible:ring-0 focus-visible:border-[rgba(255,138,31,0.5)]"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="text-xs font-medium" style={{ color: "rgba(255,248,236,0.5)" }}>
                  Password
                </FormLabel>
                <span
                  className="text-[11px] cursor-pointer transition-colors duration-150"
                  style={{ color: "rgba(255,138,31,0.7)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FF8A1F")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,138,31,0.7)")}
                >
                  Forgot password?
                </span>
              </div>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  style={darkInput}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 font-semibold transition-all duration-200"
            style={{
              backgroundColor: isSubmitting ? "rgba(255,138,31,0.5)" : "#FF8A1F",
              color: "#071533",
              height: "48px",
              borderRadius: "0.875rem",
              fontSize: "14px",
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) e.currentTarget.style.backgroundColor = "#DFFF66";
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) e.currentTarget.style.backgroundColor = "#FF8A1F";
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
