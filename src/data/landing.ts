import {
  BarChart3,
  Receipt,
  PieChart,
  CreditCard,
  Globe,
  Zap,
} from "lucide-react";

// Tipe untuk statistik
interface StatsItem {
  value: string;
  label: string;
}

// Tipe untuk fitur utama
interface FeatureItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

// Tipe untuk cara kerja
interface HowItWorksItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

// Tipe untuk testimoni
interface TestimonialItem {
  name: string;
  role: string;
  image: string;
  quote: string;
}

// Data Statistik
export const statsData: StatsItem[] = [
  { value: "50K+", label: "Active Users" },
  { value: "$2B+", label: "Transactions Tracked" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9/5", label: "User Rating" },
];

// Data Fitur Utama
export const featuresSistem: FeatureItem[] = [
  {
    icon: BarChart3,
    title: " Laporan Keuangan Transparan",
    description: "Akses pemasukan & pengeluaran secara real-time.",
  },
  {
    icon: Receipt,
    title: "Pengelolaan Dana yang Aman",
    description: "Menggunakan sistem berbasis database untuk keakuratan data.",
  },
  {
    icon: PieChart,
    title: "Akses Dimana Saja, Kapan Saja",
    description:
      "Dapat diakses dari laptop, tablet, atau smartphone tanpa batasan lokasi.",
  },
  {
    icon: CreditCard,
    title: "Dashboard Admin & User",
    description:
      "Admin memiliki kontrol penuh untuk mengelola data, sementara jamaah dapat melihat laporan tanpa mengubah data.",
  },
  {
    icon: Globe,
    title: "Akses Terstruktur dengan Role-Based System",
    description:
      "Hanya pengurus yang dapat mengelola transaksi, sementara jamaah bisa melihat laporan keuangan secara transparan.",
  },
  {
    icon: Zap,
    title: "Keamanan Data Terjamin",
    description:
      "Keamanan login berbasis role memastikan data keuangan tetap aman dan hanya bisa diakses oleh yang berwenang.",
  },
];

// Data Cara Kerja
export const howItWorksData: HowItWorksItem[] = [
  {
    icon: CreditCard,
    title: "1. Create Your Account",
    description:
      "Get started in minutes with our simple and secure sign-up process",
  },
  {
    icon: BarChart3,
    title: "2. Track Your Spending",
    description:
      "Automatically categorize and track your transactions in real-time",
  },
  {
    icon: PieChart,
    title: "3. Get Insights",
    description:
      "Receive AI-powered insights and recommendations to optimize your finances",
  },
];

// Data Testimoni
export const testimonialsData: TestimonialItem[] = [
  {
    name: "Sarah Johnson",
    role: "Small Business Owner",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    quote:
      "Welth has transformed how I manage my business finances. The AI insights have helped me identify cost-saving opportunities I never knew existed.",
  },
  {
    name: "Michael Chen",
    role: "Freelancer",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    quote:
      "The receipt scanning feature saves me hours each month. Now I can focus on my work instead of manual data entry and expense tracking.",
  },
  {
    name: "Emily Rodriguez",
    role: "Financial Advisor",
    image: "https://randomuser.me/api/portraits/women/74.jpg",
    quote:
      "I recommend Welth to all my clients. The multi-currency support and detailed analytics make it perfect for international investors.",
  },
];
