import { Suspense } from "react";
import { BarLoader } from "react-spinners";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-5">
      <h1 className="text-6xl font-extrabold text-black mb-5">Dashboard</h1>
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        {children}
      </Suspense>
    </div>
  );
}
