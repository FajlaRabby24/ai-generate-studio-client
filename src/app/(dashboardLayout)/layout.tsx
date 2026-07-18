import Sidebar from "@/components/modules/dashboard/Sidebar";
import DashboardTopBar from "@/components/modules/dashboard/DashboardTopBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* 1. Desktop Sidebar (Sticky left) */}
      <aside className="hidden md:flex flex-col w-64 fixed inset-y-0 z-40 border-r border-border/30">
        <Sidebar />
      </aside>

      {/* 2. Main Content Column */}
      <div className="flex-1 flex flex-col md:pl-64">
        <DashboardTopBar />
        <main className="flex-grow p-4 md:p-8 pt-6 md:pt-8">{children}</main>
      </div>
    </div>
  );
}
