import axios from "axios";
import React from "react";
import { CompanyName, urlImage } from "@/lib/globalvar";
import { Metadata } from "next";
import Item from "./item";

type Props = {
  params: {
    product: string;
    item: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data } = await axios.get(
    `${process.env.URL}/api/post?title=${params.item}`
  );

  return {
    title: `${CompanyName} | ${params.product} - ${params.item}`,
    openGraph: {
      images: [`${urlImage + "/" + data?.source}`],
    },
  };
}

function Page({ params }: Props) {
  const convertItem = params.item.split("-").join(" ");

  return (
    <div>
      <div className="text-center">
        <h1 className="font-bold text-3xl capitalize">{convertItem}</h1>
        <h2 className="convertItem">Pricelist - {convertItem}</h2>
      </div>
      <Item params={params} />
    </div>
  );
}

export default Page;
