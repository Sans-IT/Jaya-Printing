"use client";

import { notFound, useSearchParams } from "next/navigation";
import React from "react";
import Pricelist from "./pricelist";
import Post from "./post";

type Props = {};

function Page({}: Props) {
  const searchParams = useSearchParams();

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="text-4xl font-semibold text-center mb-5">
        Buat {searchParams.get("query")}
      </h1>
      <Components />
    </div>
  );
}

export default Page;

const Components = () => {
  const searchParams = useSearchParams();

  switch (searchParams.get("query")) {
    case "post":
      return <Post />;
    case "pricelist":
      return <Pricelist />;
    default:
      return <Post />;
  }
};
