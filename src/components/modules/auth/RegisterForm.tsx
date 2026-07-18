"use client";

import {
  Camera,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkles,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useForm } from "react-hook-form";

import { GoogleButton } from "@/components/ui/google-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      image: null as File | null,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setValue("image", null);
      setImagePreview(null);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (data: any) => {
    console.log("Registration Submit Data:", {
      name: data.name,
      email: data.email,
      password: data.password,
      imageFile: data.image,
    });
    // Action will be wired by auth flows
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-border/40 bg-card/65 p-8 shadow-xl backdrop-blur-md">
      {/* Form Header */}
      <div className="flex flex-col items-center gap-2 text-center mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-md">
          <Link href="/">
            {" "}
            <Sparkles className="h-5 w-5 text-white" />
          </Link>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your details below to register
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Profile Image Input with Preview */}
        <div className="flex flex-col items-center gap-2">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Profile Photo
          </Label>
          <div className="relative flex h-24 w-24">
            <div
              onClick={triggerFileSelect}
              className="group relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-border/60 bg-muted/40 transition-all hover:border-violet-500/70 hover:bg-muted/70"
            >
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Profile Preview"
                  fill
                  sizes="96px"
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-1 text-muted-foreground group-hover:text-violet-500 transition-colors">
                  <Camera className="h-6 w-6" />
                  <span className="text-[10px] font-medium">Upload</span>
                </div>
              )}

              {/* Overlay on Hover */}
              {imagePreview && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-5 w-5 text-white" />
                </div>
              )}
            </div>

            {imagePreview && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setValue("image", null);
                  setImagePreview(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="absolute -top-1 -right-1 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90 transition-all cursor-pointer border border-background"
                aria-label="Remove Image"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          {/* Hidden HTML input */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={(e) => {
              fileInputRef.current = e;
            }}
            onChange={handleImageChange}
          />
        </div>

        {/* Name Input */}
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-xs font-medium text-foreground">
            Full Name
          </Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
              <User className="h-4 w-4" />
            </span>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              className="pl-9 h-10 rounded-xl"
              {...register("name", { required: "Name is required" })}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>

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
          <Label
            htmlFor="password"
            className="text-xs font-medium text-foreground"
          >
            Password
          </Label>
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
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
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

        {/* Register Button */}
        <ShimmerButton
          type="submit"
          shimmerColor="#ffffff"
          background="linear-gradient(to right, #7c3aed, #4f46e5)"
          borderRadius="12px"
          className="w-full h-10 mt-2 font-semibold text-white shadow-md shadow-violet-500/10 hover:shadow-violet-500/20 active:scale-[0.98] transition-all"
        >
          Sign Up
        </ShimmerButton>

        {/* Divider */}
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-border/30"></div>
          <span className="flex-shrink mx-4 text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
            Or
          </span>
          <div className="flex-grow border-t border-border/30"></div>
        </div>

        {/* Google Register Button */}
        <GoogleButton
          text="Sign up with Google"
          onClick={() => console.log("Google registration submit")}
        />

        {/* Redirect Footer */}
        <div className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-primary hover:underline transition-all"
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
