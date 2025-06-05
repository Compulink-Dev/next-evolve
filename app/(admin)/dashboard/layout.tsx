import React from "react";
import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  const isOtpVerified = session?.user?.role === "admin";

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/dashboard/otp");
  }

  if (session && !isOtpVerified) {
    redirect("/dashboard/otp");
  }
  return (
    <div>
      <div className="flex">
        <div className="" style={{ flex: 1 }}>
          <Sidebar />
        </div>
        <div className="" style={{ flex: 5 }}>
          <Navbar />
          <div className="p-2">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
