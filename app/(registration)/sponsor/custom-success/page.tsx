"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";

export default function CustomSponsorshipSuccess() {
  const router = useRouter();
  const { data: session } = useSession();
  const { width, height } = useWindowSize();
  const [countdown, setCountdown] = useState(5);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const confettiTimer = setTimeout(() => setShowConfetti(false), 5000);
    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          router.push("/sponsor/dashboard/custom");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countdownTimer);
      clearTimeout(confettiTimer);
    };
  }, [router]);

  const handleRedirectNow = () => {
    router.push("/sponsor/dashboard/custom");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-800 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Request Submitted Successfully!
        </h1>
        {session?.user && (
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Your Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{session.user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{session.user.email}</p>
              </div>
            </div>
          </div>
        )}
        <p className="text-gray-600 mb-6">
          Thank you for your custom sponsorship request. Our team will review
          your submission and get back to you within 2 business days.
        </p>
        <div className="pt-4 border-t border-gray-200">
          <p className="text-center text-gray-600">
            {`You'll be redirected in`} {countdown} seconds...
          </p>
          <Button
            onClick={handleRedirectNow}
            className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
          >
            Go to Dashboard Now
          </Button>
        </div>
      </div>
    </div>
  );
}
