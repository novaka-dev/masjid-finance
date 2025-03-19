import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

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
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors/>
          {/* Footer */}
          <footer className="bg-gray-50 py-10 mt-28">
            <div className="container mx-auto text-center px-4 text-gray-500">
              <p>Made with ❤️ by Vakaaa</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
