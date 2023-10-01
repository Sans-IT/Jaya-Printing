"use client";
import React from "react";
import axios from "axios";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useQuery } from "react-query";
import { ColumnPricelist } from "../../../components/table/columns-pricelist";
import { TableData } from "@/components/table/table-data";
import { urlImage } from "@/lib/globalvar";
import Loading from "../loading";
import PromotionSwiper from "@/components/PromotionSwiper";

type Props = {
  params: {
    product: string;
    item: string;
  };
};

function Item({ params }: Props) {
  const convertItem = params.item.split("-").join(" ");
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const response = await axios.get(`/api/post?title=${convertItem}`);
      return response.data;
    },
  });

  if (isLoading) return <Loading />;
  if (data === null) return notFound();
  return (
    <div>
      <div className="my-10">
        <Image
          src={urlImage + data?.source}
          alt={convertItem}
          width={1920}
          height={1080}
          className="w-11/12 mx-auto rounded-xl aspect-video object-cover"
        />
      </div>
      <PromotionSwiper />
      <TableData
        title={"Pricelist " + convertItem}
        columns={ColumnPricelist}
        data={data?.pricelist !== undefined ? data?.pricelist : []}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Item;
