import Link from "next/link";

// app/not-found.tsx
export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-5xl font-extrabold text-indigo-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-2">Halaman Tidak Ditemukan</p>
      <p className="text-gray-500 mb-6 text-center max-w-md">
        Maaf, halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
        Silakan periksa kembali URL atau kembali ke halaman utama.
      </p>
      <Link
        href="/"
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
