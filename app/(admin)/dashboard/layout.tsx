import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/Sidebar";
import Navbar from "./_components/Navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const isOtpVerified = cookieStore.get("otp-verified")?.value === "true";

  if (!isOtpVerified) {
    redirect("/otp");
  }

  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-screen">
        <div className="flex flex-1 overflow-auto">
          {" "}
          {/* Add pt-16 to account for navbar height */}
          <AppSidebar />
          <main className="flex-1  bg-gray-50">
            <Navbar />
            <div className="p-4 w-full">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default DashboardLayout;
