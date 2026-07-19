import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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
import { registerSchema } from "../../../schemas/authSchema";
import useAuth from "../../hooks/useAuth";

const darkInput = {
  backgroundColor: "rgba(255,248,236,0.06)",
  border: "1px solid rgba(255,248,236,0.1)",
  color: "#FFF8EC",
  borderRadius: "0.875rem",
  height: "48px",
  fontSize: "14px",
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [agreed, setAgreed] = useState(false);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (values) => {
    try {
      form.clearErrors("email");
      await register(values);
      navigate("/dashboard");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed. Please try again.";

      form.setError("email", {
        type: "server",
        message,
      });
      toast.error(message);
      console.error(error);
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium" style={{ color: "rgba(255,248,236,0.5)" }}>
                Full name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Your name"
                  autoComplete="name"
                  style={darkInput}
                  className="placeholder:text-[rgba(255,248,236,0.25)] focus-visible:ring-0 focus-visible:border-[rgba(255,138,31,0.5)]"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />

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
              <FormLabel className="text-xs font-medium" style={{ color: "rgba(255,248,236,0.5)" }}>
                Password
              </FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Create a password"
                  autoComplete="new-password"
                  style={darkInput}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium" style={{ color: "rgba(255,248,236,0.5)" }}>
                Confirm password
              </FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  style={darkInput}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />

        {/* Terms checkbox */}
        <label className="flex items-start gap-3 cursor-pointer select-none pt-1">
          <div className="relative flex-shrink-0 mt-0.5">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="sr-only"
            />
            <div
              className="w-4 h-4 rounded flex items-center justify-center transition-all duration-150"
              style={{
                backgroundColor: agreed ? "#FF8A1F" : "rgba(255,248,236,0.06)",
                border: agreed ? "1px solid #FF8A1F" : "1px solid rgba(255,248,236,0.15)",
              }}
            >
              {agreed && (
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                  <path d="M1 3.5L3.5 6L8 1" stroke="#071533" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-xs leading-relaxed" style={{ color: "rgba(255,248,236,0.45)" }}>
            I agree to the{" "}
            <Link
              to="#"
              className="underline underline-offset-2 transition-colors duration-150"
              style={{ color: "rgba(255,138,31,0.8)" }}
              onMouseEnter={(e) => (e.target.style.color = "#FF8A1F")}
              onMouseLeave={(e) => (e.target.style.color = "rgba(255,138,31,0.8)")}
            >
              Terms &amp; Conditions
            </Link>{" "}
            and{" "}
            <Link
              to="#"
              className="underline underline-offset-2 transition-colors duration-150"
              style={{ color: "rgba(255,138,31,0.8)" }}
              onMouseEnter={(e) => (e.target.style.color = "#FF8A1F")}
              onMouseLeave={(e) => (e.target.style.color = "rgba(255,138,31,0.8)")}
            >
              Privacy Policy
            </Link>
          </span>
        </label>

        {/* Submit */}
        <div className="pt-1">
          <button
            type="submit"
            disabled={isSubmitting || !agreed}
            className="w-full flex items-center justify-center gap-2 font-semibold transition-all duration-200"
            style={{
              backgroundColor:
                isSubmitting || !agreed ? "rgba(255,138,31,0.35)" : "#FF8A1F",
              color: isSubmitting || !agreed ? "rgba(7,21,51,0.6)" : "#071533",
              height: "48px",
              borderRadius: "0.875rem",
              fontSize: "14px",
              cursor: isSubmitting || !agreed ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting && agreed) e.currentTarget.style.backgroundColor = "#DFFF66";
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting && agreed) e.currentTarget.style.backgroundColor = "#FF8A1F";
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
