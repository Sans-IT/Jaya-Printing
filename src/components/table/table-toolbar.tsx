import { Table } from "@tanstack/react-table";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DataTableFilter } from "./table-data-filter";
import { categoryArray, filterCategory } from "@/lib/globalvar";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

function TableToolbar<TData>({ table }: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center py-4 gap-2">
      <Input
        placeholder="cari..."
        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("title")?.setFilterValue(event.target.value)
        }
        className="max-w-xs"
      />

      {table.getColumn("category") && (
        <DataTableFilter
          column={table.getColumn("category")}
          title="Category"
          options={filterCategory}
        />
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            <MixerHorizontalIcon className="mr-2 h-4 w-4" />
            Kolom <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default TableToolbar;
