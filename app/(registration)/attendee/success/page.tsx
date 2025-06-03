"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function AttendeeSuccessPage() {
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
          router.push("/attendee/dashboard");
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
    router.push("/sponsor/dashboard");
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      {showConfetti && <Confetti width={100} height={100} />}

      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden z-10 text-center p-8">
        <h1 className="text-3xl font-bold">Registration Successful!</h1>
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
