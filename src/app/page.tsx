import HeroSection from "@/components/hero";
import { featuresSistem } from "@/data/landing";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="pt-40">
      <HeroSection />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold mb-14 text-center">
            Fitur Utama Sistem
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {featuresSistem.map((feature, index) => {
              const IconComponent = feature.icon; // Mengambil komponen ikon dari data
              return (
                <Card key={index} className="p-6">
                  <CardContent className="space-y-4 pt-4">
                    <IconComponent className="h-8 w-8 text-yellow-500" /> {/* Menampilkan ikon */}
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
