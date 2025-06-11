import type { Metadata } from "next";
import "./globals.css";
import { SessionProviderWrapper } from "@/lib/sessionWrapper";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Evolve ICT Summit",
  description: "Evolve ICT Summit",
  icons: {
    icon: "/evolve.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <TooltipProvider>{children}</TooltipProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
