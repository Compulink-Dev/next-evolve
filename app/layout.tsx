import type { Metadata } from "next";
import "./globals.css";
import { SessionProviderWrapper } from "@/lib/sessionWrapper";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#7C3AED", // Match your theme
        },
      }}
    >
      <html lang="en">
        <body>
          {children}
          {/* CAPTCHA container */}
          <div id="clerk-captcha"></div>
        </body>
      </html>
    </ClerkProvider>
  );
}
