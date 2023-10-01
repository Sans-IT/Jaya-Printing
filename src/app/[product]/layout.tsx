import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <div className="my-20">
        <Separator className="my-10" />
        <h1 className="text-lg font-bold text-center mb-5 uppercase tracking-wide">
          - Cetak Custom -
        </h1>
        <Link
          href={
            "https://wa.me/6281230308379?text=Halo%20Saya%20melihat%20website%20Jayaprinting%20Saya%20ingin%20bertanya%20"
          }
          target="_blank"
        >
          <Image
            width={1920}
            height={1080}
            alt="footerbanner"
            src={"/image/BannerFooter.jpg"}
            className="rounded-xl shadow-lg hover:opacity-70"
          />
        </Link>
      </div>
    </div>
  );
}
