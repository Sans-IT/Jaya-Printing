"use client";
import { IDcurrency, filterCategory } from "@/lib/globalvar";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pen } from "lucide-react";
import { Button } from "../ui/button";
import { DeleteMenu } from "./delete-cell";
import { useRouter } from "next/navigation";
import { DataTableColumnHeader } from "./column-header";

export const ColumnPricelistAdmin: ColumnDef<PricelistWithPost>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "size",
    header: ({ column, header }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="capitalize"
        >
          {header.id}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    header: ({ column, header }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="capitalize"
        >
          {header.id}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "price",
    cell: ({ row }) => {
      return <span>{IDcurrency(row.getValue("price"))}</span>;
    },
  },
  {
    header: "Print",
    accessorKey: "print",
    cell: ({ row }) => {
      return <span>{IDcurrency(row.getValue("print"))}</span>;
    },
  },
  {
    header: ({ column, header }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="capitalize"
        >
          {header.id}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "createAt",
    cell: ({ row }) => {
      return <>{new Date(row.getValue("createAt")).toUTCString()}</>;
    },
  },
  {
    header: ({ column, header }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="capitalize"
        >
          {header.id}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "updateAt",
    cell: ({ row }) => {
      return <>{new Date(row.getValue("updateAt")).toUTCString()}</>;
    },
  },
  {
    accessorKey: "post",
    header: "Post",
    cell: ({ row }) => {
      const post = row.original.post;
      if (post) {
        return <div>{post.title}</div>;
      } else {
        return <div>No Post Data</div>;
      }
    },
  },
  {
    header: "Option",
    accessorKey: "",
    cell: ({ row }) => {
      return <CellComponent row={row} />;
    },
  },
];

function CellComponent({ row }: any) {
  const router = useRouter();
  return (
    <div className="flex gap-2">
      <Button
        variant={"secondary"}
        size={"icon"}
        onClick={() =>
          void router.push(
            "dashboard/edit/" + row.original.id + "?query=pricelist"
          )
        }
      >
        <Pen className="w-4 h-4" />
      </Button>
      <DeleteMenu data={row.original} type="pricelist" />
    </div>
  );
}
