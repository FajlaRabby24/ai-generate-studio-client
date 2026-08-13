import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/useLogout";
import { UserRole } from "@/utils/authUtils";
import { CreditCard, LogOut, User } from "lucide-react";
import Link from "next/link";

const ProfileDropdown = ({ decodedUser }: { decodedUser: any }) => {
  const handleLogout = useLogout();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={"cursor-pointer"}>
        <Avatar>
          <AvatarImage src={decodedUser?.image} referrerPolicy="no-referrer" />
          <AvatarFallback>
            {decodedUser?.name.substring(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 mt-1 rounded-xl p-1.5 border border-border/40 bg-popover shadow-lg"
      >
        {/* User Profile Info Summary */}
        <div className="flex flex-col space-y-1.5 p-2.5">
          <p className="text-sm font-semibold text-foreground leading-none">
            {decodedUser?.name || "Demo User"}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {decodedUser?.email || "demo@studio.com"}
          </p>
          {decodedUser?.role && (
            <div className="mt-1 inline-flex w-fit items-center rounded-full bg-violet-500/10 px-2.5 py-0.5 text-[10px] font-medium text-violet-500 dark:bg-violet-400/10 dark:text-violet-400">
              {decodedUser?.role}
            </div>
          )}
        </div>

        <DropdownMenuSeparator className="my-1.5" />

        {/* Quick Actions Links */}
        <Link
          href={`/${decodedUser?.role === UserRole.ADMIN ? "admin/" : ""}dashboard/my-profile`}
          className="w-full"
        >
          <DropdownMenuItem className="rounded-lg cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile Settings</span>
          </DropdownMenuItem>
        </Link>
        {decodedUser?.role === UserRole.USER && (
          <Link href="/dashboard/billing" className="w-full">
            <DropdownMenuItem className="rounded-lg cursor-pointer">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
          </Link>
        )}

        <DropdownMenuSeparator className="my-1.5" />

        {/* Sign Out Trigger */}
        <DropdownMenuItem
          variant="destructive"
          className="rounded-lg cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
