// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import Header from '@/components/shared/header/header';
import Footer from '@/components/shared/footer/footer';

export const metadata: Metadata = {
  title: "Kailainaadhar Clinic Admin",
  description: "Admin dashboard exported from Figma",
};

import AuthBootstrap from "@/components/auth/AuthBootstrap";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <AuthBootstrap />
        <div id="container">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
