import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Evolve ICT Summit",
  description: "Evolve ICT Summit",
  icons: {
    icon: '/evolve.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
