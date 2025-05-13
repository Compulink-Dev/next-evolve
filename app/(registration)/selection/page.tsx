"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Card = ({ title, description, onClick }: any) => (
  <div
    onClick={onClick}
    className="group relative flex items-center justify-center transition-all duration-500 hover:-translate-y-2 cursor-pointer"
  >
    <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 opacity-75 blur transition-all duration-500 group-hover:opacity-100 group-hover:blur-md"></div>
    <div className="relative bg-white p-6 w-64 h-64 rounded-lg flex flex-col items-center justify-center space-y-4 border border-white/10 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <p className="text-gray-600 text-center">{description}</p>
      <div className="mt-4 h-1 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 group-hover:w-16"></div>
    </div>
  </div>
);

function Selection() {
  const router = useRouter();

  const handleRoleSelect = (role: string) => {
    // Redirect to registration page with the selected role as a query parameter
    router.push(`/registration?role=${role.toLowerCase()}`);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-8 p-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Choose Your Role
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-8">
          <Card
            title="Sponsors"
            description="Register as a sponsor"
            onClick={() => handleRoleSelect("sponsor")}
          />
          <Card
            title="Attendee"
            description="Register as an attendee"
            onClick={() => handleRoleSelect("attendee")}
          />
          <Card
            title="Exhibitors"
            description="Register as an exhibitor"
            onClick={() => handleRoleSelect("exhibitor")}
          />
        </div>

        {/* Add a link for users who already have an account */}
        {/* <div className="mt-8 text-white">
          <span className="mr-2">Already have an account?</span>
          <Link href="/login">
            <Button
              variant="link"
              className="text-purple-300 hover:text-purple-500 p-0"
            >
              Sign in here
            </Button>
          </Link>
        </div> */}
      </div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(
                ${Math.random() * 100 - 50}px,
                ${Math.random() * 100 - 50}px
              )
              rotate(180deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default Selection;
