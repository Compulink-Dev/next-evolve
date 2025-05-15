"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

export default function AttendeeSuccessPage() {
  const router = useRouter();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      {showConfetti && <Confetti width={width} height={height} />}
      <div className="max-w-md w-full overflow-hidden z-10">
        <h1 className="text-3xl font-bold">Registration Successful!</h1>
        <p className="text-center text-gray-600">
          {`You'll be redirected to your dashboard in`} {countdown} seconds...
        </p>
      </div>
    </div>
  );
}
