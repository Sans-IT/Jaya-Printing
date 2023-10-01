"use client";
import { IDcurrency } from "@/lib/globalvar";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pen } from "lucide-react";
import { Button } from "../ui/button";
import { DeleteMenu } from "./delete-cell";
import { useRouter } from "next/navigation";

export const ColumnPricelist: ColumnDef<PostWithPricelist>[] = [
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
];
