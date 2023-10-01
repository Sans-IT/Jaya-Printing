"use client";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
} from "swiper/modules";

import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { cn } from "@/lib/utils";
import { AutoplayOptions } from "swiper/types";
import Image from "next/image";

interface props {
  properties?: {
    type: "image" | "item";
    slidesImage?: {
      src: string;
    }[];
    slidesItem?: {
      icon: string;
      text: string;
      description: string;
    }[];
  };
  autoplayActive?: boolean | AutoplayOptions | undefined;
  className?: string;
}

export default function SwiperComponent({
  properties,
  className,
  autoplayActive,
}: props) {
  return (
    <Swiper
      className={cn(className)}
      modules={[Pagination, Autoplay, Navigation]}
      slidesPerView={1}
      loop={true}
      pagination={{ clickable: true }}
      autoplay={autoplayActive}
      breakpoints={
        properties?.slidesItem !== undefined
          ? {
              640: {
                centeredSlides: true,
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }
          : undefined
      }
    >
      {properties?.type === "image"
        ? properties?.slidesImage?.map((item) => {
            return (
              <SwiperSlide key={item.src}>
                <Image
                  src={item.src}
                  alt={item.src}
                  className="w-full aspect-video object-cover"
                  width={1920}
                  height={1080}
                />
              </SwiperSlide>
            );
          })
        : properties?.slidesItem?.map((item) => {
            return (
              <SwiperSlide key={item.text} className="py-20 px-5">
                <div className="flex items-center gap-5">
                  <Image
                    alt={item.description}
                    src={item.icon}
                    width={80}
                    height={80}
                  />
                  <div>
                    <h2 className="font-semibold">{item.text}</h2>
                    <p>{item.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
    </Swiper>
  );
}
