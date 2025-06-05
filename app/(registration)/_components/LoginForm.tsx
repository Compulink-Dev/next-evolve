"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/", // This will be overridden if we get a user type
      });

      if (result?.error) {
        setError(result.error);
        return;
      }

      // Get the user's role/type from the session
      const session = await fetch("/api/auth/session");
      const sessionData = await session.json();

      if (!sessionData?.user) {
        setError("User not found");
        return;
      }

      console.log("User session type:", sessionData?.user.type);

      // Redirect based on user type
      if (sessionData?.user?.type) {
        router.push(`/${sessionData.user.type}`);
      } else if (sessionData?.user?.type === "admin") {
        router.push(`/dashboard`);
      } else {
        // Fallback to home if type isn't available
        router.push("/");
      }
    } catch (err: any) {
      setError("Sign in failed");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <Button type="submit" className="w-full button">
        Sign In
      </Button>
      <div className="mt-4">
        <p className="text-sm text-gray-500">
          {`Don't have an account ? `}{" "}
          <a href="/selection" className="text-purple-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </form>
  );
}
