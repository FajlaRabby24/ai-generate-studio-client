import LoginForm from "@/components/modules/auth/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Generate Studio — Sign In",
};

export default function LoginPage() {
  return <LoginForm />;
}
