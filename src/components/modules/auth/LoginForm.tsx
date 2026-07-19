"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, Sparkles } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { GoogleButton } from "@/components/ui/google-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { loginService } from "@/services/auth/login.service";
import { ILoginPayload } from "@/types/auth.types";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: ILoginPayload) => loginService(payload),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: ILoginPayload) => {
    try {
      const res = await mutateAsync(data);
      if (!res.success) {
        toast.error(res.message || "Login failed");
        return;
      }
      toast.success("Welcome back! Logged in successfully.");
      router.push("/dashboard");
    } catch (err: any) {
      const errMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Please try again.";
      toast.error(errMsg);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-border/40 bg-card/65 p-8 shadow-xl backdrop-blur-md">
      {/* Form Header */}
      <div className="flex flex-col items-center gap-2 text-center mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-md">
          <Link href="/">
            <Sparkles className="h-5 w-5 text-white" />
          </Link>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and password to sign in
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email Input */}
        <div className="space-y-1.5">
          <Label
            htmlFor="email"
            className="text-xs font-medium text-foreground"
          >
            Email Address
          </Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
              <Mail className="h-4 w-4" />
            </span>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="pl-9 h-10 rounded-xl"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className="text-xs font-medium text-foreground"
            >
              Password
            </Label>
            <Link
              href="/auth/forgot-password"
              className="text-xs text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
              <Lock className="h-4 w-4" />
            </span>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pl-9 pr-10 h-10 rounded-xl"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground cursor-pointer focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Login Button */}
        <ShimmerButton
          type="submit"
          disabled={isPending}
          shimmerColor="#ffffff"
          background="linear-gradient(to right, #7c3aed, #4f46e5)"
          borderRadius="12px"
          className="w-full h-10 mt-2 font-semibold text-white shadow-md shadow-violet-500/10 hover:shadow-violet-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          {isPending ? "Signing In..." : "Sign In"}
        </ShimmerButton>

        {/* Divider */}
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-border/30"></div>
          <span className="flex-shrink mx-4 text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
            Or
          </span>
          <div className="flex-grow border-t border-border/30"></div>
        </div>

        {/* Google Login Button */}
        <GoogleButton
          text="Sign in with Google"
          onClick={() => console.log("Google login submit")}
        />

        {/* Redirect Footer */}
        <div className="text-center text-sm text-muted-foreground mt-4">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="font-medium text-primary hover:underline transition-all"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
