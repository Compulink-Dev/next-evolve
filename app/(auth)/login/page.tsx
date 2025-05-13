"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    signIn(undefined, { callbackUrl });
  }, [callbackUrl]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting to sign-in...</p>
    </div>
  );
}
