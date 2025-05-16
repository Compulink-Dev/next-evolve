"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

function SponsorSuccess() {
  const { data: session } = useSession();
  const router = useRouter();
  const { width, height } = useWindowSize();
  const [countdown, setCountdown] = useState(5);
  const [sponsorship, setSponsorship] = useState<any>(null);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Stop confetti after a few seconds
    const confettiTimer = setTimeout(() => setShowConfetti(false), 5000);

    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          router.push("/sponsor/dashboard");
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

  useEffect(() => {
    const fetchSponsorship = async () => {
      try {
        const res = await fetch("/api/sponsorships/latest");
        const data = await res.json();
        setSponsorship(data);
      } catch (error) {
        console.error("Failed to fetch sponsorship:", error);
      }
    };

    fetchSponsorship();
  }, []);

  const handleRedirectNow = () => {
    router.push("/sponsor/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      {showConfetti && <Confetti width={width} height={height} />}

      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden z-10">
        <div className="bg-purple-500 p-6 text-white text-center">
          <CheckCircle className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">Application Submitted!</h1>
          <p className="mt-2">Thank you for your sponsorship</p>
        </div>

        <div className="p-6 space-y-6">
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

          {sponsorship && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Sponsorship Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Tier</p>
                  <p className="font-medium">{sponsorship.tier}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-medium">
                    {sponsorship?.amount !== undefined
                      ? `$${Number(sponsorship.amount).toLocaleString()}`
                      : "Loading..."}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium capitalize">{sponsorship.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">
                    {new Date(sponsorship.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}

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
    </div>
  );
}

export default SponsorSuccess;
