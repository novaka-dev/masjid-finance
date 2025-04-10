// components/footer.tsx
"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-10">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Deskripsi */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Masjid Finance</h2>
          <p className="text-gray-400 text-sm">
            Transparansi dan pengelolaan keuangan masjid yang modern dan
            terpercaya.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h3 className="font-semibold text-white mb-3">Navigasi</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition">
                Beranda
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-white transition">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h3 className="font-semibold text-white mb-3">Kontak</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              smkn2kotabekasi@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              08xx-xxxx-xxxx
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Bekasi, Indonesia
            </li>
            <li className="flex items-center gap-2">
              <Instagram className="h-4 w-4" />
              <a
                href="https://instagram.com/masjidfinance"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                @masjidfinance
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-xs py-4 border-t border-gray-800">
        &copy; {new Date().getFullYear()} Masjid Al-Kautsar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
