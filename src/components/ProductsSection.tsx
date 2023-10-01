"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useQuery } from "react-query";
import axios from "axios";
import { Post } from "@prisma/client";
import Image from "next/image";
import { categoryArray, urlImage } from "@/lib/globalvar";
import Link from "next/link";

type Props = {};

function ProductsSection({}: Props) {
  const [itemCategory, setitemCategory] = useState<string>("plastik");
  const [dataCategory, setDataCategory] = useState<Post[]>([]);

  const { data }: any = useQuery({
    queryFn: async () => {
      const response = await axios.get("/api/post");
      return response.data;
    },
    onSuccess: (item: Post[]) => {
      setDataCategory(item);
    },
  });

  const clickProduct = (item: string) => {
    setitemCategory(item);
  };

  return (
    <div className="my-12">
      <div className="flex items-center justify-center flex-1 flex-wrap mx-auto text-center w-full my-10 gap-5 px-10">
        {categoryArray.map((item) => {
          return (
            <div
              key={item}
              className={`${
                itemCategory !== item ? "" : "text-primary"
              } cursor-pointer hover:text-primary font-semibold transition-colors duration-200 capitalize`}
              onClick={() => void clickProduct(item)}
            >
              {item}
            </div>
          );
        })}
      </div>

      <div
        className={`${
          data
            ? "h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            : ""
        }`}
      >
        {dataCategory ? (
          dataCategory
            .filter((item: Post) => {
              return item.category.toString().toLowerCase() ===
                itemCategory.toLowerCase()
                ? true
                : false;
            })
            .map((item) => {
              return (
                <Link
                  href={item.category + "/" + item.title}
                  key={item.id}
                  className="w-full h-full cursor-pointer text-center hover:opacity-80 overflow-hidden group"
                >
                  <Image
                    src={urlImage + item.source}
                    alt={item.title}
                    width={1920}
                    height={1080}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="w-full h-full bg-primary font-bold tracking-wider text-white py-1.5 uppercase">
                    {item.title}
                  </div>
                </Link>
              );
            })
        ) : (
          <div className="text-center text-slate-400 italic">
            Tidak ada barang
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsSection;
