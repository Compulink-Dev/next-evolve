// This is a layout.tsx file for the registration page

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="">{children}</div>;
}
export const metadata = {
  title: "Evolve Auth",
  description: "Evolve Auth",
};
export const dynamic = "force-dynamic";
