import type { Metadata } from "next";
import { PremiumLoader } from "@/components/PremiumLoader";
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
      <body>
        <PremiumLoader />
        {children}
      </body>
    </html>
  );
}
