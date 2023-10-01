import React from "react";
import SwiperComponent from "./SwiperComponent";

type Props = {};

function PromotionSwiper({}: Props) {
  const Quality = [
    {
      text: "Kualitas Terbaik",
      icon: "/image/quality.png",
      description:
        "Kami menyediakan percetakan dengan kualitas terbaik untuk hasil cetak yang profesional.",
    },
    {
      text: "Harga Bersaing",
      icon: "/image/pricing.png",
      description:
        "Harga yang terjangkau untuk semua jenis cetakan, sesuai dengan anggaran Anda.",
    },
    {
      text: "Pengiriman Cepat",
      icon: "/image/truck.png",
      description:
        "Layanan pengiriman yang cepat untuk memenuhi tenggat waktu Anda.",
    },
    {
      text: "Desain Kreatif",
      icon: "/image/design.png",
      description:
        "Tim desain kami siap membantu Anda menciptakan desain yang menarik",
    },
    {
      text: "Pilihan Produk Lengkap",
      icon: "/image/product.png",
      description: "Beragam produk percetakan untuk semua kebutuhan Anda",
    },
    {
      text: "Pelayanan Pelanggan Terbaik",
      icon: "/image/cs.png",
      description:
        "Kami peduli pada kepuasan pelanggan dan selalu siap membantu.",
    },
  ];
  return (
    <SwiperComponent
      properties={{
        type: "item",
        slidesItem: Quality,
      }}
      autoplayActive={{ delay: 12000, disableOnInteraction: false }}
    />
  );
}

export default PromotionSwiper;
