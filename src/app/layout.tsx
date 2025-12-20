import type { Metadata } from "next";
import "./globals.css";
import AuthBootstrap from "@/components/auth/AuthBootstrap";

import Header from "@/components/shared/header/header";
import Footer from "@/components/shared/footer/footer";

export const metadata: Metadata = {
  title: "Kailainaadhar Clinic Admin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen"><AuthBootstrap/>{children}</body>
    </html>
  );
}
