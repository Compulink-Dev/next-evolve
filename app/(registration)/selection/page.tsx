"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useUser, useSignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const loginFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

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
  const { data: session, status } = useSession();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { isSignedIn, user } = useUser();
  const { signIn } = useSignIn();
  const { update } = useSession();

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log("Session:", session);

  const handleRoleSelect = async (role: string) => {
    const userEmail = session?.user?.email;
    if (!userEmail) {
      console.error("No user email found in session");
      return;
    }
    console.log("Selected role:", role);
    try {
      const response = await fetch("/api/update-role", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          role: role.toLowerCase(),
        }),
      });

      if (response.ok) {
        router.push(`/${role.toLowerCase()}`);
      } else {
        console.error("Failed to update role");
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const handleLogin = async (data: z.infer<typeof loginFormSchema>) => {
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      //@ts-ignore
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        setShowLoginDialog(false);
        // Session is automatically handled by Clerk
      }
    } catch (error) {
      setLoginError("Invalid email or password");
    } finally {
      setIsLoggingIn(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      setShowLoginDialog(false);
    } else if (status === "unauthenticated") {
      setShowLoginDialog(true);
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

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
      </div>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              Please sign in to select your role
            </DialogDescription>
          </DialogHeader>
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(handleLogin)}
              className="space-y-4"
            >
              {loginError && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded text-sm">
                  {loginError}
                </div>
              )}
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your@email.com"
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between items-center mt-6">
                <Link
                  href="/registration"
                  className="text-sm text-purple-600 hover:underline"
                >
                  {`Don't have an account? Sign up`}
                </Link>
                <Button className="button" type="submit" disabled={isLoggingIn}>
                  {isLoggingIn ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

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
