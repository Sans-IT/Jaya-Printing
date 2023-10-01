import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navmenu from "@/components/navmenu/Navmenu";
import FooterSection from "@/components/FooterSection";
import ReactQuery from "@/components/QueryClient";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";
import { CompanyName } from "@/lib/globalvar";

const monsterrat = Montserrat({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${CompanyName}`,
  description: `${CompanyName} adalah pilihan terbaik Anda untuk segala kebutuhan cetak, Kami berdedikasi untuk membantu Anda menghasilkan cetakan yang memukau yang akan membuat kesan tak terlupakan. Jelajahi situs web kami, temukan produk yang Anda butuhkan, dan hubungi kami untuk memulai proyek cetak Anda. Jayaprinting - Cetak dengan Kualitas dan Profesionalisme Terbaik.`,
  icons: "/image/logo.png",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={monsterrat.className + " overflow-x-hidden"}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReactQuery>
            <Navbar />
            <Navmenu />

            <div className="mx-auto w-full max-w-7xl my-5 px-3">{children}</div>

            <FooterSection />
            <BottomRight />
            <Toaster />
          </ReactQuery>
        </ThemeProvider>
      </body>
    </html>
  );
}

const BottomRight = () => {
  return (
    <Link
      href={
        "https://wa.me/6281230308379?text=Halo%20Saya%20melihat%20website%20Jayaprinting%20Saya%20ingin%20bertanya%20"
      }
      target="_blank"
      className="text-white z-10 hidden sm:block font-semibold fixed right-5 bottom-5 py-3 transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-white/80 px-5 bg-green-500 rounded-full"
    >
      <div className="flex items-center gap-3">
        <span>Whatsapp</span>
        <BsWhatsapp />
      </div>
    </Link>
  );
};
