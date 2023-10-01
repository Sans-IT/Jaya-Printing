import React from "react";
import { CompanyName, categoryArray } from "@/lib/globalvar";
import Product from "./product";

type Props = {
  params: {
    product: string;
  };
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return categoryArray.map((product) => {
    return { product };
  });
}

export async function generateMetadata({ params }: Props) {
  return {
    title: `${CompanyName} | Produk - ${params.product}`,
  };
}

export default function Page({ params }: Props) {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold capitalize my-3 mb-5">
        Produk - {params.product}
      </h1>
      <Product params={params} />
    </div>
  );
}
