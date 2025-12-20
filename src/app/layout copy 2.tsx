// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import Header from '@/components/shared/header/header';
import Footer from '@/components/shared/footer/footer';

export const metadata: Metadata = {
  title: "Kailainaadhar Clinic Admin",
  description: "Admin dashboard exported from Figma",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // If your original HTML had some wrapper class on body, add it here.
  // Example: "wrapper-with-banner" etc. if needed.
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div id="container"><Header/>{children}<Footer/></div>
      </body>
    </html>
  );
}
