"use client";

import { notFound, useSearchParams } from "next/navigation";
import React from "react";
import Pricelist from "./pricelist";
import Post from "./post";

type Props = {
  params: {
    slug: string;
  };
};

function Page({ params }: Props) {
  const searchParams = useSearchParams();

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="text-4xl font-semibold text-center mb-5">
        Edit {searchParams.get("query")}
      </h1>
      <Components params={params} />
    </div>
  );
}

export default Page;

const Components = ({ params }: Props) => {
  const searchParams = useSearchParams();

  switch (searchParams.get("query")) {
    case "post":
      return <Post params={params} />;
    case "pricelist":
      return <Pricelist params={params} />;
    default:
      return <Post params={params} />;
  }
};
