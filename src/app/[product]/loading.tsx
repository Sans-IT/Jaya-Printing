import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

function Loading({}: Props) {
  return (
    <div className="w-full my-10">
      <Skeleton className="h-96" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
    </div>
  );
}

export default Loading;
