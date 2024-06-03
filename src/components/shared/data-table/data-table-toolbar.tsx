"use client";

import { Plus, X } from "lucide-react";
import { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "./data-table-view-option";
// import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filter?: {
    isSearch?: boolean;
    searchPlaceholder?: string;
    searchColumn?: string;
  };
  addData?: {
    isAddData?: boolean;
    placeholder?: string;
    seeAddData?: () => void;
  };
}

export function DataTableToolbar<TData>({
  table,
  filter = {},
  addData = {},
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {filter.isSearch && filter.searchColumn && (
          <Input
            placeholder={filter.searchPlaceholder ?? "Filter..."}
            value={
              (table
                .getColumn(filter.searchColumn)
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(filter.searchColumn as string)
                ?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {/* <DataTableFacetedFilter
          column={table.getColumn(filter.searchColumn as string)}
          title={filter.searchColumn as string}
          options={statuses}
        /> */}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table
                .getColumn(filter.searchColumn as string)
                ?.setFilterValue("");
              table.resetColumnFilters();
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />

      {addData.isAddData && (
        <Button
          variant="outline"
          className="h-8 px-2 lg:px-3 ml-2"
          onClick={addData.seeAddData}
        >
          <Plus className="mr-2 h-4 w-4" />
          {addData.placeholder ?? "Add Data"}
        </Button>
      )}
    </div>
  );
}
