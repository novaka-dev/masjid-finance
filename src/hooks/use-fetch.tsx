import { useState } from "react";
import { toast } from "sonner";

/**
 * * Tipe untuk callback fungsi yang digunakan untuk fetch data.
 * * Callback ini harus berupa fungsi async yang mengembalikan Promise<T>.
 */
type FetchCallback<T> = (...args: unknown[]) => Promise<T>;

/**
 * ! Custom hook untuk melakukan fetch data secara asinkron.
 *
 * @param cb - Fungsi async yang mengembalikan data.
 * @returns Object yang berisi:
 *   * `data`: Data hasil fetch.
 *   * `loading`: Status apakah fetch sedang berjalan.
 *   * `error`: Pesan error jika terjadi kesalahan.
 *   * `fn`: Fungsi untuk memanggil fetch.
 *   * `setData`: Setter untuk memperbarui data secara manual.
 */
const useFetch = <T,>(cb: FetchCallback<T>) => {
  // * State untuk menyimpan data hasil fetch
  const [data, setData] = useState<T | null>(null);

  // ? State untuk menandakan apakah sedang loading
  const [loading, setLoading] = useState<boolean>(false);

  // ! State untuk menyimpan pesan error jika terjadi kesalahan
  const [error, setError] = useState<string | null>(null);

  /**
   * ? Fungsi untuk memanggil fetch dengan parameter yang diberikan.
   *
   * @param args - Parameter yang akan diteruskan ke fungsi `cb`.
   */
  const fn = async (...args: unknown[]) => {
    setLoading(true);
    setError(null);

    try {
      // * Memanggil fungsi fetch yang diberikan sebagai parameter hook
      const response = await cb(...args);
      setData(response); // * Menyimpan hasil fetch ke dalam state
    } catch (error) {
      // ! Menangani error jika terjadi kesalahan dalam fetch
      if (error instanceof Error) {
        setError(error.message); // ! Menyimpan pesan error
        toast.error(error.message); // * Menampilkan notifikasi error
      } else {
        setError("An unknown error occurred");
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false); // ? Mengubah status loading menjadi false setelah selesai
    }
  };

  // * Mengembalikan nilai-nilai yang dapat digunakan dari hook ini
  return { data, loading, error, fn, setData };
};

export default useFetch;
