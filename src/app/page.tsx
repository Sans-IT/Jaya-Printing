import ProductsSection from "@/components/ProductsSection";
import PromotionSwiper from "@/components/PromotionSwiper";
import SwiperComponent from "@/components/SwiperComponent";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div>
      <SwiperComponent
        className="shadow-xl rounded-xl"
        autoplayActive={{ delay: 5000, disableOnInteraction: false }}
        properties={{
          type: "image",
          slidesImage: [
            {
              src: "/image/Banner1.png",
            },
            {
              src: "/image/Banner2.jpg",
            },
            {
              src: "/image/Banner3.jpg",
            },
          ],
        }}
      />
      <h2 className="text-xl font-bold text-center uppercase my-10">
        Mengapa Memilih JayaPrinting
      </h2>
      <Separator />
      <PromotionSwiper />
      <ProductsSection />
    </div>
  );
}
