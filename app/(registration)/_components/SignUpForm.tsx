// components/SignUpForm.tsx
"use client";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SignUpForm() {
  const { isLoaded, signUp } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isLoaded) return;

    try {
      // Create user in Clerk - using correct parameter names
      const result = await signUp.create({
        emailAddress: email,
        password,
        firstName, // Correct parameter name (not first_name)
        lastName, // Correct parameter name (not last_name)
      });

      // Store additional info in MongoDB
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          clerkUserId: result.createdUserId,
          type: "sponsor",
          mode: "online",
          jobTitle: "",
          company: "",
          phoneNumber: "",
          country: "",
          state: "",
          industry: "",
          companySize: "",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user in database");
      }

      // Prepare email verification
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);
    } catch (err: any) {
      console.error("Sign up error:", err);
      setError(
        err.errors?.[0]?.longMessage ||
          err.errors?.[0]?.message ||
          "Sign up failed. Please try again."
      );
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        router.push("/selection");
      }
    } catch (err: any) {
      console.error("Verification error:", err);
      setError(
        err.errors?.[0]?.longMessage ||
          err.errors?.[0]?.message ||
          "Verification failed. Please try again."
      );
    }
  };

  return (
    <div className="w-full max-w-md space-y-4">
      {error && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      {!pendingVerification ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              required
            />
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              required
            />
          </div>
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
            placeholder="Password (min 8 characters)"
            minLength={8}
            required
          />

          {/* Add CAPTCHA container */}
          <div id="clerk-captcha" className="my-4"></div>

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            {`We've sent a verification code to your email. Please enter it below.`}
          </p>
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Verification Code"
            required
          />
          <Button onClick={onPressVerify} className="w-full">
            Verify Email
          </Button>
        </div>
      )}
    </div>
  );
}
