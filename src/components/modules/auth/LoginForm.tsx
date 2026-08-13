"use client";

import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Label } from "@/components/ui/label";
import { loginService } from "@/services/auth/login.service";
import { ILoginPayload } from "@/types/auth.types";
import GoogleLogin from "./GoogleLogin";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: ILoginPayload) =>
      loginService(payload, navigator.userAgent),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleDemoLogin = async (role: "admin" | "user") => {
    const email =
      role === "admin"
        ? "aigeneratestudio@gmail.com"
        : "fajlarabby.dev@gmail.com";
    const password =
      role === "admin" ? "AIgenerateSTUDIO_admin_PASS" : "fajla123";
    setValue("email", email);
    setValue("password", password);
    await onSubmit({ email, password });
  };

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
    <div className=" min-[1101px]:w-[min(34vw,620px)] min-[1101px]:min-w-[380px] max-[1100px]:w-[min(70vw,520px)] max-[720px]:w-full flex flex-col items-start select-none">
      {/* CHIP */}

      <h1 className="font-display font-bold text-4xl tracking-[0.03em] leading-[0.95] text-white mt-[clamp(16px,2vw,32px)] uppercase select-none">
        AI GENERATE STUDIO
      </h1>

      {/* TAGLINE */}
      <p className="font-mono font-[300] text-[clamp(11px,0.94vw,17px)] tracking-[0.14em] text-white/62 mt-[clamp(8px,1vw,16px)] leading-[1.4] uppercase select-none">
        Your creative suite for AI generation.
      </p>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-[clamp(10px,1vw,16px)] mt-[clamp(24px,3.2vw,50px)]"
        noValidate
      >
        {/* Email Field */}
        <div className="flex flex-col gap-1.5 relative">
          <Label htmlFor="email" className="sr-only">
            Email Address
          </Label>
          <input
            id="email"
            type="email"
            placeholder="EMAIL"
            className="w-full bg-transparent border-0 border-b border-white/26 rounded-none px-0.5 pb-[clamp(8px,0.8vw,12px)] pt-0 font-display font-[300] text-[clamp(16px,0.95vw,18px)] text-white placeholder:text-white/62 focus:border-white/85 focus:placeholder:text-white/42 transition-colors duration-250 outline-none focus:outline-none focus-visible:outline focus-visible:outline-white/70 focus-visible:outline-offset-[3px]"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-xs font-mono tracking-wider text-red-500 mt-1 select-none">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1.5 relative">
          <Label htmlFor="password" className="sr-only">
            Password
          </Label>
          <div className="relative w-full">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="PASSWORD"
              className="w-full bg-transparent border-0 border-b border-white/26 rounded-none px-0.5 pb-[clamp(8px,0.8vw,12px)] pt-0 font-display font-[300] text-[clamp(16px,0.95vw,18px)] text-white placeholder:text-white/62 focus:border-white/85 focus:placeholder:text-white/42 transition-colors duration-250 outline-none focus:outline-none focus-visible:outline focus-visible:outline-white/70 focus-visible:outline-offset-[3px]"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 bottom-[clamp(8px,0.8vw,12px)] text-white/42 hover:text-white transition-colors cursor-pointer outline-none focus-visible:outline focus-visible:outline-white/70 focus-visible:outline-offset-2"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs font-mono tracking-wider text-red-500 mt-1 select-none">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end -mt-2">
          <Link
            href="/auth/forgot-password"
            className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/62 hover:text-white hover:underline underline-offset-4 transition-colors outline-none focus-visible:outline focus-visible:outline-white/70 focus-visible:outline-offset-2"
          >
            Forgot password?
          </Link>
        </div>

        {/* Demo Quick Login */}
        <div className="mt-2 flex flex-col gap-2 p-3 border border-white/10 bg-white/5 rounded-none">
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/62 text-center select-none">
            Recruiter Quick Access (Demo)
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin("admin")}
              className="flex-1 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white py-2 px-3 font-mono text-[11px] uppercase tracking-[0.14em] border border-white/10 transition-all cursor-pointer outline-none focus-visible:outline focus-visible:outline-white/70"
            >
              Demo Admin
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("user")}
              className="flex-1 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white py-2 px-3 font-mono text-[11px] uppercase tracking-[0.14em] border border-white/10 transition-all cursor-pointer outline-none focus-visible:outline focus-visible:outline-white/70"
            >
              Demo User
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 mt-4 w-full">
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-white/10 text-white rounded-none border-0 py-[clamp(12px,1.2vw,18px)] px-5 font-mono font-[400] uppercase tracking-[0.22em] text-[clamp(11px,0.78vw,14px)] hover:bg-white/17 transition-colors duration-250 cursor-pointer disabled:opacity-50 disabled:pointer-events-none outline-none focus-visible:outline focus-visible:outline-white/70 focus-visible:outline-offset-[3px]"
          >
            {isPending ? "SIGNING IN..." : "SIGN IN"}
          </button>

          {/* Google SSO Button */}
          <GoogleLogin />
        </div>

        {/* Redirect Referral Link */}
        <p className="self-center font-mono text-[clamp(11px,0.74vw,14px)] tracking-[0.18em] uppercase text-white mt-[clamp(16px,1.8vw,32px)] ">
          Don't have an account?
          <Link
            href="/auth/register"
            className="ml-2 hover:text-white/62 hover:underline underline-offset-4 transition-colors outline-none focus-visible:outline focus-visible:outline-white/70"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
