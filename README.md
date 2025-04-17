# 🕌 Masjid Finance

Aplikasi web yang dibuat untuk membantu pengurus masjid dalam memanajemen keuangan secara efisien dan transparan. Proyek ini pertama kali diimplementasikan untuk keuangan Masjid SMKN 2 Kota Bekasi.

---

## 📌 Deskripsi

Website **Masjid Finance** bertujuan untuk:

- Mempermudah pencatatan pemasukan dan pengeluaran masjid
- Menyediakan visualisasi keuangan berupa grafik dan tabel
- Memberikan transparansi kepada jamaah atau pihak terkait
- Mengelola peran (role) antara **admin** dan **user**
- Melindungi akses berlebih dengan limit request menggunakan **Arcjet**

---

## 🚀 Fitur Utama

- 🔐 Autentikasi & Manajemen Peran (Admin / User)
- 💰 Manajemen Transaksi (tambah, ubah, hapus)
- 📈 Visualisasi Keuangan (Grafik interaktif dengan Recharts)
- 🔎 Pencarian, filter, sorting & bulk delete data transaksi
- 🧱 Integrasi API Clerk & Arcjet untuk keamanan dan kontrol akses

---

## ⚙️ Teknologi yang Digunakan

| Komponen   | Teknologi                         |
| ---------- | --------------------------------- |
| Frontend   | Next.js, TailwindCSS, ShadCN UI   |
| Backend    | Next.js API routes                |
| Database   | Supabase / PostgreSQL, Prisma ORM |
| Auth       | Clerk                             |
| Keamanan   | Arcjet                            |
| Grafik     | Recharts                          |
| Deployment | Vercel (opsional)                 |

---

## 🛠️ Instalasi & Menjalankan Proyek

### 1️⃣ Clone Repository

```bash
git clone https://github.com/novaka-dev/masjid-finance.git
cd masjid-finance
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Buat file `.env` berdasarkan `.env.example`, lalu isi dengan kredensial pribadi kamu:

```env
# Connect to Supabase via connection pooling with Supavisor.
DATABASE_URL=

# Direct connection to the database. Used for migrations.
DIRECT_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=

ARCJET_KEY=
```

> ℹ️ Untuk mendapatkan kredensial:
>
> - `DATABASE_URL` dan `DIRECT_URL`: Dari dashboard [Supabase](https://supabase.com) > Project Settings > Database
> - `CLERK_*`: Dari dashboard [Clerk](https://clerk.dev/) > API Keys & URLs
> - `ARCJET_KEY`: Dari [Arcjet Dashboard](https://arcjet.com)

### 4️⃣ Setup Prisma dan Database

```bash
npx prisma generate
npx prisma db push
```

### 5️⃣ Jalankan Proyek

```bash
npm run dev
```

Akses di: `http://localhost:3000`

---

## 👨‍💻 Kontribusi

Kontribusi sangat terbuka! Berikut langkah untuk berkontribusi:

1. Fork repositori ini
2. Buat branch baru: `git checkout -b fitur-anda`
3. Commit perubahan: `git commit -m 'Tambah fitur A'`
4. Push ke branch: `git push origin fitur-anda`
5. Buat Pull Request

---

## 🙌 Pengembang

Website ini dikembangkan oleh:

- **Novaka Dev** – [GitHub](https://github.com/novaka-dev)

---

## 📄 Lisensi

Open Source - Vaka Ganteng 🙏

---

## ⭐️ Jangan Lupa

Jangan lupa kasih ⭐️ di GitHub ya! walaweee
