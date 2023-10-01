"use client";

import React, { useEffect } from "react";
import { TableData } from "../../../components/table/table-data";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { redirect, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import axios from "axios";
import { ColumnPost } from "@/components/table/columns-post";
import { Plus } from "lucide-react";
import { ColumnPricelistAdmin } from "@/components/table/columns-pricelist-admin";

type Props = {};



function Page({}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data: getPost, loadingPost }: any = useQuery({
    queryKey: ["adminpost"],
    queryFn: async () => {
      const response = await axios.get("/api/post");
      return response.data;
    },
  });

  const { data: getPricelist, isLoading: loadingPricelist }: any = useQuery({
    queryKey: ["adminpricelist"],
    queryFn: async () => {
      const response = await axios.get("/api/pricelist");
      return response.data;
    },
  });

  const search = searchParams.get("query");
  const menuDashboard = [
    {
      name: "Post",
    },
    {
      name: "Pricelist",
    },
  ];

  const paramPush = (item: string) => {
    router.push(`?query=${encodeURI(item.toLowerCase())}`);
  };

  const QueryCondition = {
    data:
      search === "pricelist"
        ? getPricelist
          ? getPricelist
          : []
        : getPost
        ? getPost
        : [],
    column: search === "pricelist" ? ColumnPricelistAdmin : ColumnPost,
    isLoading: search === "pricelist" ? loadingPricelist : loadingPost,
    title: search === "pricelist" ? "Semua Pricelist" : "Semua Produk",
  };

  if (loadingPost || loadingPricelist) {
    return <>Loading...</>;
  }

  return (
    <div className="w-full">
      <div className="w-full flex justify-end gap-2 my-4">
        <Button
          icon={<Plus />}
          onClick={() =>
            router.push(window.location.pathname + "/post?query=post")
          }
        >
          Buat Postingan
        </Button>
        <Button
          variant={"warning"}
          icon={<Plus />}
          onClick={() =>
            router.push(window.location.pathname + "/post?query=pricelist")
          }
        >
          Buat Pricelist
        </Button>
      </div>
      <div className="lg:flex gap-4">
        <div className="sticky top-10 flex lg:flex-col mx-auto justify-center lg:justify-start w-1/6">
          {menuDashboard.map((item) => {
            return (
              <Button
                size={"sm"}
                variant={"ghost"}
                key={item.name}
                onClick={() => paramPush(item.name)}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  search === item.name.toLowerCase()
                    ? "bg-muted hover:bg-muted"
                    : "hover:bg-transparent hover:underline",
                  "justify-start"
                )}
              >
                {item.name}
              </Button>
            );
          })}
        </div>
        <div className="w-full">
          <TableData
            data={QueryCondition.data}
            columns={QueryCondition.column}
            isLoading={QueryCondition.isLoading}
            pagination={true}
            title={QueryCondition.title}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
