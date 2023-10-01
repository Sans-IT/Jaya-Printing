"use client";

import {
  BadgeCheck,
  Clock,
  Facebook,
  Info,
  Instagram,
  Mail,
  MapPinIcon,
  Phone,
} from "lucide-react";

import Link from "next/link";
import React, { StyleHTMLAttributes } from "react";
import Image from "next/image";

type Props = {};

function FooterSection({}: Props) {
  return (
    <>
      <div className="text-center bg-gray-200 bg-opacity-50 py-10">
        <h1 className="text-2xl font-bold">Tertarik Pesan dengan kami?</h1>
        <span className="text-lg">
          nunggu apalagi? hubungin kami untuk konsultasi lebih lanjut
        </span>
      </div>
      <div className="w-full bg-slate-900 text-slate-300 text-xs">
        <div className="grid gap-8 justify-between p-12 max-w-7xl mx-auto md:grid-cols-3 grid-cols-2">
          {/* Logo */}
          <div>
            <Image src="/image/logo.png" width={150} height={150} alt="logo" />
            <div className="mt-2">
              {new Date().getFullYear()} ©All Rights Reserved.
            </div>
          </div>
          {/* Kontak */}
          <div className="flex flex-col gap-1">
            <h1 className="font-bold flex gap-2 items-center text-lg text-primary">
              <Phone />
              <span>Kontak</span>
            </h1>
            <Link
              href={
                "https://wa.me/6281230308379?text=Halo%20Saya%20melihat%20website%20Jayaprinting%20Saya%20ingin%20bertanya%20"
              }
              target="_blank"
              className="hover:text-primary  hover:underline"
            >
              0812-3030-8379 (Cs 1)
            </Link>
            <Link
              href={
                "https://wa.me/6281339503980?text=Halo%20Saya%20melihat%20website%20Jayaprinting%20Saya%20ingin%20bertanya%20"
              }
              target="_blank"
              className="hover:text-primary  hover:underline"
            >
              0813-3950-3980 (Cs 2)
            </Link>
            <Link
              href={
                "https://wa.me/6281333570925?text=Halo%20Saya%20melihat%20website%20Jayaprinting%20Saya%20ingin%20bertanya%20"
              }
              target="_blank"
              className="hover:text-primary  hover:underline"
            >
              0813-3357-0925 (designer)
            </Link>
            <h1 className="mt-2 font-bold flex gap-2 items-center text-lg text-primary">
              <Mail />
              <span>Email</span>
            </h1>
            <Link
              href={"mailto:jayaprinting2@gmail.com"}
              className="hover:text-primary  hover:underline"
            >
              jayaprinting2@gmail.com
            </Link>
          </div>
          {/* Tentang Kami */}
          <div className="flex flex-col gap-1">
            <h1 className="font-bold flex gap-2 items-center text-lg text-primary">
              <Info />
              <span>Tentang Kami</span>
            </h1>
            <Link
              href={"/about"}
              className="hover:text-primary  hover:underline"
            >
              Mengapa JayaPrinting
            </Link>
            <Link
              href={"/lowongan"}
              className="hover:text-primary  hover:underline"
            >
              Lowongan Kerja
            </Link>
          </div>
          {/* Social Media */}
          <div className="flex flex-col gap-1">
            <h1 className="font-bold flex gap-2 items-center text-lg text-primary">
              <BadgeCheck />
              <span>Social Media</span>
            </h1>
            <div className="flex items-center gap-2">
              <Link
                href="https://www.instagram.com/jayaprinting/"
                target="_blank"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.facebook.com/jaya.printing.2/"
                target="_blank"
              >
                <Facebook />
              </Link>
            </div>
          </div>
          {/* Lokasi */}
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-primary  text-lg flex items-center gap-2">
              <MapPinIcon />
              <span>Lokasi</span>
            </h1>
            <Link
              target="_blank"
              href={
                "https://www.google.com/maps/@-7.3300935,112.8035732,3a,75y,39.34h,81.58t/data=!3m6!1e1!3m4!1situ97Yl9XwgHZ-mi123LHQ!2e0!7i13312!8i6656?entry=ttu"
              }
              className="hover:text-primary  hover:underline"
            >
              Lokasi: Medokan Sawah Timur 2e No 8 Surabaya
            </Link>
          </div>
          {/* Hari dan jam kerja */}
          <div className="flex flex-col gap-1">
            <h1 className="font-bold flex gap-2 items-center text-lg text-primary">
              <Clock />
              <span>Hari dan jam kerja :</span>
            </h1>
            <p>Senin - Sabtu : 9:00- 17:00 : WIB</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default FooterSection;
