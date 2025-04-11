import Link from "next/link";

// app/unauthorized/page.tsx
export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-5xl font-extrabold text-red-600 mb-4">403</h1>
      <p className="text-xl text-gray-700 mb-2">Akses Ditolak</p>
      <p className="text-gray-500 mb-6 text-center max-w-md">
        Kamu tidak memiliki izin untuk mengakses halaman ini. Silakan kembali ke halaman utama atau hubungi admin jika kamu merasa ini sebuah kesalahan.
      </p>
      <Link href="/" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
        Kembali ke Beranda
      </Link>
    </div>
  );
}