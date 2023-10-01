"use client";

import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SwiperComponent from "@/components/SwiperComponent";
import { Separator } from "@/components/ui/separator";
import { CompanyName, urlImage } from "@/lib/globalvar";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import PromotionSwiper from "@/components/PromotionSwiper";

type Props = {
  params: {
    product: string;
  };
};

function Product({ params }: Props) {
  const [sliderImage, setSliderImage] = useState<{ src: string }[]>();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const response = await axios.get(`/api/post?category=${params.product}`);
      return response.data;
    },
    onSuccess: (items: PostWithUser[]) => {
      const filtered = items.map((item) => {
        return { src: urlImage + item.source };
      });
      setSliderImage(filtered);
    },
  });
  return (
    <div>
      <SwiperComponent
        properties={{ slidesImage: sliderImage, type: "image" }}
        className="mb-10 rounded-lg"
        autoplayActive={{ delay: 5000, disableOnInteraction: false }}
      />
      <PromotionSwiper />
      <Separator className="my-10" />
      <h1 className="text-center font-bold text-lg uppercase tracking-wide">
        Cetak {params.product} - {CompanyName}
      </h1>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data
            ? data?.map((item: PostWithUser) => {
                return (
                  <div
                    key={item.id}
                    className="hover:shadow-xl flex flex-col gap-5 p-5 mt-10 rounded-xl border border-slate-400 border-opacity-70 relative"
                  >
                    <div className="-mt-10">
                      <Image
                        src={urlImage + item.source}
                        alt={item.title}
                        width={1920}
                        height={1080}
                        className="rounded-xl w-full aspect-video object-cover"
                      />
                    </div>
                    <div className="flex items-center flex-col justify-between h-full">
                      <h3 className="font-bold">{item.title.toUpperCase()}</h3>
                      <p>{item.description}</p>
                      <Button
                        onClick={() =>
                          router.push(
                            `/${params.product}/${item.title
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`
                          )
                        }
                        className="w-full text-white bg-zinc-500 mt-5 hover:bg-primary"
                        size={"sm"}
                      >
                        Pricelist {item.title}
                      </Button>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      )}
    </div>
  );
}

export default Product;
