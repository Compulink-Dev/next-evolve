import React from "react";
import Sidebar from "./_components/Sidebar";
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
    <div>
      <div className="flex">
        <div style={{ flex: 1 }}>
          <Sidebar />
        </div>
        <div style={{ flex: 5 }}>
          <Navbar />
          <div className="p-2">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
