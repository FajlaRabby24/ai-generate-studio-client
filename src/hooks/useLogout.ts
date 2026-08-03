import { logoutService } from "@/services/auth/logout.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Swal from "sweetalert2";

export const useLogout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    Swal.fire({
      title: "Log out?",
      text: "Are you sure you want to end your current session?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#8b5cf6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "Cancel",
      background: document.documentElement.classList.contains("dark")
        ? "#171717"
        : "#ffffff",
      color: document.documentElement.classList.contains("dark")
        ? "#ffffff"
        : "#000000",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await logoutService();
        if (res?.success) {
          toast.success(res.message || "Logged out successfully");
          router.push("/auth/login");
        } else {
          toast.error(res?.message || "Failed to logout");
        }
      }
    });
  };

  return handleLogout;
};
