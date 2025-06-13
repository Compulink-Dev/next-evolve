"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const KNOWN_OTP = "123456"; // Replace with environment variable in production

export default function OtpPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (otp !== KNOWN_OTP) {
        throw new Error("Invalid OTP code");
      }

      // First set the cookie via API
      const res = await fetch("/api/cookies", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to set verification cookie");
      }

      // Then verify the cookie was set
      const verifyRes = await fetch("/api/verify-cookie", {
        credentials: "include",
      });

      if (!verifyRes.ok) {
        throw new Error("Cookie verification failed");
      }

      // Force full page reload to ensure cookie is available
      window.location.href = callbackUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          OTP Verification
        </h1>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-medium mb-2">
              OTP Code
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter 6-digit code"
              maxLength={6}
              required
              autoComplete="one-time-code"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
