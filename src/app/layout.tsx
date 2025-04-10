import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Footer from "@/components/footer";
import HeaderWrapper from "@/components/header-wrapper";

// Font Inter
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Masjid Finance",
  description: "Finance Platform Masjid Al-Kautsar SMKN 2 Kota Bekasi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          {/* Header */}
          <HeaderWrapper />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />
          {/* Footer */}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
