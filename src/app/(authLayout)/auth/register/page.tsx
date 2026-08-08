import RegisterForm from "@/components/modules/auth/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Generate Studio — Create Account",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
