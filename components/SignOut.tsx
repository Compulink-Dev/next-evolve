// components/SignOutButton.tsx
"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/login", // Redirect to login page after sign out
      redirect: true, // This will do a full page refresh
    });
  };

  return (
    <Button
      onClick={handleSignOut}
      variant="ghost"
      className="text-red-600 hover:text-red-800"
    >
      Sign Out
    </Button>
  );
}
