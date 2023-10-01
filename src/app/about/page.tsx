import Link from "next/link";
import React from "react";

type Props = {};

function Page({}: Props) {
  const aboutWord = [
    {
      name: "Kualitas Utama: ",
      description:
        "Kami memahami pentingnya tampilan dan kualitas dalam produk Anda. Itulah mengapa kami selalu berusaha memberikan hasil cetak plastik terbaik yang memenuhi standar tertinggi.",
    },
    {
      name: "Inovasi: ",
      description:
        "Kami berinvestasi dalam teknologi terbaru untuk memastikan bahwa Anda selalu mendapatkan pilihan terbaru dalam desain cetak plastik. Kami siap untuk menjawab permintaan khusus dan ide-ide kreatif Anda.",
    },
    {
      name: "Pelayanan Pelanggan: ",
      description:
        "Tim kami selalu siap membantu Anda dengan pertanyaan, permintaan, atau masukan apa pun. Kami percaya dalam menjaga hubungan jangka panjang dengan pelanggan kami.",
    },
    {
      name: "Komitmen Lingkungan: ",
      description:
        "Kami peduli dengan lingkungan dan berkomitmen untuk menjalankan praktik bisnis yang berkelanjutan dan ramah lingkungan.",
    },
    {
      name: "Kepuasan Pelanggan Terutama: ",
      description:
        "Keberhasilan Jayaprinting tidak hanya terletak pada hasil cetak plastik yang berkualitas, tetapi juga pada kepuasan pelanggan. Kami berusaha keras untuk memastikan setiap pelanggan merasa puas dengan layanan kami. Kami mendengarkan dengan seksama kebutuhan Anda dan berusaha memenuhinya.",
    },
    {
      name: "Ragam Produk: ",
      description:
        "Jayaprinting menawarkan berbagai produk cetak plastik. Mulai dari kemasan plastik untuk bisnis kecil hingga pesanan besar untuk perusahaan besar. Kami memiliki kapasitas dan fleksibilitas untuk mengakomodasi berbagai jenis proyek cetak.",
    },
    {
      name: "Komitmen Terhadap Waktu: ",
      description:
        "Kami memahami bahwa waktu adalah aset berharga dalam bisnis Anda. Kami berkomitmen untuk memberikan pesanan Anda tepat waktu, sehingga Anda dapat terus berjalan tanpa hambatan.",
    },
    {
      name: "Keamanan dan Keberlanjutan: ",
      description:
        "Jayaprinting mematuhi standar tertinggi dalam hal keamanan dan keberlanjutan. Kami menggunakan bahan-bahan yang aman untuk lingkungan dan memastikan bahwa semua proses produksi kami sesuai dengan regulasi lingkungan.",
    },
    {
      name: "Tim Profesional: ",
      description:
        "Tim Jayaprinting adalah kelompok profesional yang berdedikasi dan berpengalaman dalam dunia percetakan plastik. Mereka siap memberikan bantuan ahli dalam setiap tahap proyek Anda.",
    },
    {
      name: "Kemitraan Strategis: ",
      description:
        "Kami memahami pentingnya kemitraan yang kuat dalam bisnis. Jayaprinting telah membentuk hubungan strategis dengan banyak mitra terkemuka di berbagai industri, memungkinkan kami untuk memberikan solusi yang lebih baik untuk Anda.",
    },
  ];
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="font-bold text-4xl text-center">
        Selamat datang di Jayaprinting!
      </h1>
      <p className="py-5">
        Kami adalah pelopor dalam industri percetakan plastik, memberikan solusi
        terdepan untuk kebutuhan cetak plastik Anda. Dengan pengalaman
        bertahun-tahun dan komitmen kami terhadap kualitas, kami telah menjadi
        mitra terpercaya untuk banyak bisnis dalam memenuhi kebutuhan cetak
        plastik mereka.
      </p>
      <p>Apa yang Membedakan Kami:</p>
      <ul className="flex flex-col gap-5 pt-5">
        {aboutWord.map((item) => {
          return (
            <li className="font-bold" key={item.name}>
              {item.name}
              <span className="font-normal">{item.description}</span>
            </li>
          );
        })}
      </ul>
      <Link href="https://maps.app.goo.gl/XWAFnt2gCNkmq61T9">
        sdfzxcxzczxcsdf
      </Link>
    </div>
  );
}

export default Page;
