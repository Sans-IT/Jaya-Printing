"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteMenu } from "./delete-cell";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pen } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { filterCategory, urlImage } from "@/lib/globalvar";
import { DataTableColumnHeader } from "./column-header";

export const ColumnPost: ColumnDef<PostWithUser>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Source",
    accessorKey: "source",
    cell: ({ row }) => {
      return (
        <Image
          src={urlImage + row.getValue("source") ?? ""}
          alt={row.getValue("source") ?? ""}
          width={700}
          height={700}
        />
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const category = filterCategory.find(
        (category) => category.value === row.getValue("category")
      );

      if (!category) {
        return null;
      }

      return (
        <div className="flex items-center">
          {category.icon && (
            <category.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{category.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createAt",
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

    cell: ({ row }) => {
      return <>{new Date(row.getValue("createAt")).toUTCString()}</>;
    },
  },
  {
    accessorKey: "updateAt",
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

    cell: ({ row }) => {
      return <>{new Date(row.getValue("updateAt")).toUTCString()}</>;
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
        onClick={() => void router.push("dashboard/edit/" + row.getValue("id"))}
      >
        <Pen className="w-4 h-4" />
      </Button>
      <DeleteMenu data={row.original} type="postingan" />
    </div>
  );
}
