import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DEVIL DON OFFICIAL",
  description: "Premium APK plans with manual payment approval and activation keys.",
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
