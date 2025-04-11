export const defaultCategories = [
  // Income Categories
  {
    id: "infaq-harian",
    name: "Infaq Harian",
    type: "INCOME",
    color: "#22c55e", // green-500
    icon: "Wallet",
  },
  {
    id: "zakat-infaq",
    name: "Zakat / Infaq",
    type: "INCOME",
    color: "#06b6d4", // cyan-500
    icon: "Laptop",
  },
  {
    id: "donasi-umum",
    name: "Donasi Umum",
    type: "INCOME",
    color: "#6366f1", // indigo-500
    icon: "TrendingUp",
  },
  {
    id: "kotak-amal",
    name: "Kotak Amal",
    type: "INCOME",
    color: "#ec4899", // pink-500
    icon: "Building",
  },
  {
    id: "zakat-fitrah-zakat-mal",
    name: "Zakat Fitrah / Zakat Mal",
    type: "INCOME",
    color: "#f59e0b", // amber-500
    icon: "Home",
  },
  {
    id: "bantuan-luar-sekolah",
    name: "Bantuan Luar Sekolah",
    type: "INCOME",
    color: "#64748b", // slate-500
    icon: "Plus",
  },
  {
    id: "pemasukan-kegiatan",
    name: "Pemasukan Kegiatan",
    type: "INCOME",
    color: "#14b8a6", // slate-500
    icon: "Plus",
  },
  {
    id: "infak-jumat",
    name: "Infak Jumat",
    type: "INCOME",
    color: "#f472b6", // slate-500
    icon: "Plus",
  },

  // Expense Categories
  {
    id: "pembangunan",
    name: "Pembangunan/Renovasi",
    type: "EXPENSE",
    color: "#ef4444", // red-500
    icon: "Home",
    subcategories: ["Rent", "Mortgage", "Property Tax", "Maintenance"],
  },
  {
    id: "pembelian-alat-ibadah",
    name: "Pembelian Alat Ibadah",
    type: "EXPENSE",
    color: "#f97316", // orange-500
    icon: "Car",
  },
  {
    id: "kegiatan-keagamaan",
    name: "Kegiatan Keagamaan ",
    type: "EXPENSE",
    color: "#84cc16", // lime-500
    icon: "Shopping",
  },
  {
    id: "honorarium-penceramah",
    name: "Honorarium Penceramah",
    type: "EXPENSE",
    color: "#06b6d4", // cyan-500
    icon: "Zap",
    subcategories: ["Electricity", "Water", "Gas", "Internet", "Phone"],
  },
  {
    id: "pelunasan-hutang-pembangunan",
    name: "Pelunasan Hutang Pembangunan",
    type: "EXPENSE",
    color: "#8b5cf6", // violet-500
    icon: "Film",
    subcategories: ["Movies", "Games", "Streaming Services"],
  },
];

export const categoryColors = defaultCategories.reduce<{
  [key: string]: string;
}>((acc, category) => {
  acc[category.id] = category.color;
  return acc;
}, {});
