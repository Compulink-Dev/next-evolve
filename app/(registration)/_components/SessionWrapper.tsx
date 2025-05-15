// components/SessionLayout.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div className="p-4">
      <div className="flex items-center justify-between p-6">
        <Button
          onClick={() => router.push("/")}
          variant={"outline"}
          className="flex items-center justify-center gap-2"
        >
          <Home />
          <p className="">Back</p>
        </Button>
        <div className="">
          {session ? (
            <div className="flex justify-end items-center gap-4">
              <span className="text-sm text-gray-700">
                {session.user?.name}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={session.user?.image || ""} alt="User" />
                    <AvatarFallback>
                      {session.user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "US"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => signOut()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <p className="text-sm text-red-500">Not signed in</p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
