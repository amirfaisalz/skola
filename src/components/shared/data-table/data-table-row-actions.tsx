"use client";

import { Ellipsis } from "lucide-react";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  action?: {
    canedit?: boolean;
    handleEdit?: () => void;
    candelete?: boolean;
    handleDelete?: () => void;
  };
}

export function DataTableRowActions<TData>({
  row,
  action = {},
}: DataTableRowActionsProps<TData>) {
  const { canedit, handleEdit, candelete, handleDelete } = action;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <Ellipsis className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {canedit && handleEdit && (
          <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        {candelete && handleDelete && (
          <DropdownMenuItem onClick={handleDelete}>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
