"use client";

import { useMutation } from "@tanstack/react-query";
import { Camera, Eye, EyeOff, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Label } from "@/components/ui/label";
import { registerService } from "@/services/auth/register.service";
import { IRegisterPayload } from "@/types/auth.types";
import { uploadToCloudinary } from "@/utils/uploadImageToCloudinary";
import { validateImage } from "@/utils/validateProfileImage";
import GoogleLogin from "./GoogleLogin";

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IRegisterPayload) => registerService(payload),
  });

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

  const onSubmit = async (data: {
    name: string;
    email: string;
    password: string;
    image: File | null;
  }) => {
    let image = undefined;
    if (data.image) {
      const validateResponse = await validateImage(data.image);
      if (!validateResponse.success) {
        toast.error(validateResponse.message);
        return;
      }

      const uploadImage = await uploadToCloudinary(
        data.image,
        "image",
        "AI Generate Studio/profile-images",
      );
      if (!uploadImage.success) {
        toast.error(uploadImage.message);
        return;
      }
      image = uploadImage?.data?.url;
    }

    try {
      const payload: IRegisterPayload = {
        name: data.name,
        email: data.email,
        password: data.password,
        ...(image && { image }),
      };

      const res = await mutateAsync(payload);
      if (!res.success) {
        toast.error(res.message || "Registration failed");
        return;
      }
      toast.success("Account registered successfully! Please sign in.");
      router.push("/auth/login");
    } catch (err: any) {
      const errMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed. Please try again.";
      toast.error(errMsg);
    }
  };

  return (
    <div className="w-full min-[1101px]:w-[min(34vw,620px)] min-[1101px]:min-w-[380px] max-[1100px]:w-[min(70vw,520px)] max-[720px]:w-full flex flex-col items-start select-none">
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
        {/* Profile Image Input with Preview */}
        <div className="flex flex-col items-center self-center gap-3 mb-2">
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/62">
            Profile Photo
          </span>
          <div className="relative w-24 h-24">
            <div
              onClick={triggerFileSelect}
              className="group relative w-full h-full cursor-pointer flex flex-col items-center justify-center overflow-hidden border border-dashed border-white/26 bg-white/5 hover:border-white/50 hover:bg-white/9 transition-all duration-250 select-none rounded-none"
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
                <div className="flex flex-col items-center gap-1.5 text-white/42 group-hover:text-white transition-colors duration-250">
                  <Camera className="h-5 w-5" />
                  <span className="font-mono text-[10px] tracking-wider uppercase font-[300]">
                    Upload
                  </span>
                </div>
              )}
              {/* Overlay on Hover */}
              {imagePreview && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-250">
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
                className="absolute -top-1.5 -right-1.5 z-20 flex h-6 w-6 items-center justify-center bg-red-600 text-white shadow-md hover:bg-red-700 transition-colors cursor-pointer border border-black rounded-none outline-none focus-visible:outline focus-visible:outline-white/70"
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

        {/* Name Field */}
        <div className="flex flex-col gap-1.5 relative">
          <Label htmlFor="name" className="sr-only">
            Full Name
          </Label>
          <input
            id="name"
            type="text"
            placeholder="FULL NAME"
            className="w-full bg-transparent border-0 border-b border-white/26 rounded-none px-0.5 pb-[clamp(8px,0.8vw,12px)] pt-0 font-display font-[300] text-[clamp(16px,0.95vw,18px)] text-white placeholder:text-white/62 focus:border-white/85 focus:placeholder:text-white/42 transition-colors duration-250 outline-none focus:outline-none focus-visible:outline focus-visible:outline-white/70 focus-visible:outline-offset-[3px]"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-xs font-mono tracking-wider text-red-500 mt-1 select-none">
              {errors.name.message}
            </p>
          )}
        </div>

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
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
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

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 mt-4 w-full">
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-white/10 text-white rounded-none border-0 py-[clamp(12px,1.2vw,18px)] px-5 font-mono font-[400] uppercase tracking-[0.22em] text-[clamp(11px,0.78vw,14px)] hover:bg-white/17 transition-colors duration-250 cursor-pointer disabled:opacity-50 disabled:pointer-events-none outline-none focus-visible:outline focus-visible:outline-white/70 focus-visible:outline-offset-[3px]"
          >
            {isPending ? "SIGNING UP..." : "SIGN UP"}
          </button>

          {/* Google SSO Button */}
          <GoogleLogin />
        </div>

        {/* Redirect Referral Link */}
        <p className="self-center font-mono text-[clamp(11px,0.74vw,14px)] tracking-[0.18em] uppercase text-white mt-[clamp(16px,1.8vw,32px)] ">
          Already have an account?
          <Link
            href="/auth/login"
            className="ml-2 hover:text-white/62 hover:underline underline-offset-4 transition-colors outline-none focus-visible:outline focus-visible:outline-white/70"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
