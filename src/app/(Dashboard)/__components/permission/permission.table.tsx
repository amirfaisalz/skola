"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import PermissionForm from "./permission.form";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/shared/data-table";
import { TModule, TPermission } from "@/lib/database/schema";
import { deletePermission } from "@/actions/permission.action";
import { DeleteDialog } from "@/components/shared/delete-dialog";
import { DataTableRowActions } from "@/components/shared/data-table/data-table-row-actions";
import { DataTableColumnHeader } from "@/components/shared/data-table/data-table-column-header";

interface PermissionWithModule extends TPermission {
  module: TModule;
}

export default function PermissionTable({
  data,
  myModules
}: {
  data: GlobalReturnDatas<PermissionWithModule[] | null>;
  myModules: GlobalReturnDatas<TModule[] | null>
}) {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [idToAction, setIdToAction] = useState<string | null>(null);

  const column: ColumnDef<PermissionWithModule>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => <div>{row.original.name}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "module",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Module" />
      ),
      cell: ({ row }) => <div>{row.original.module.name}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Actions" />
      ),
      cell: ({ row }) => (
        <DataTableRowActions row={row}>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setIdToAction(row.original.id);
              setOpenEdit(true);
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setIdToAction(row.original.id);
              setOpenDelete(true);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DataTableRowActions>
      ),
    },
  ];

  const handleDelete = async () => {
    const res = await deletePermission(idToAction!);
    if (!res.success) {
      toast({
        variant: "destructive",
        description: res.message,
      });
    } else if (res.success) {
      toast({
        variant: "default",
        description: res.message,
      });
      setOpenDelete(false);
      setIdToAction(null);
    }
  };

  return (
    <>
      <DataTable
        data={data.data!}
        columns={column}
        filter={{
          isSearch: true,
          searchPlaceholder: "Filter permission...",
          searchColumn: "name",
        }}
        addData={{
          isAddData: true,
          placeholder: "Add Permission",
          seeAddData: () => setOpenAdd(true),
        }}
      />
      <PermissionForm
        open={openAdd}
        setOpen={setOpenAdd}
        formType="Add"
        resetId={() => setIdToAction(null)}
        myModules={myModules}
      />
      <PermissionForm
        open={openEdit}
        setOpen={setOpenEdit}
        formType="Edit"
        resetId={() => setIdToAction(null)}
        idToAction={idToAction!}
        myModules={myModules}
      />
      <DeleteDialog
        open={openDelete}
        setOpen={setOpenDelete}
        title="Permission"
        handleDelete={handleDelete}
        loading={false}
        resetId={() => setIdToAction(null)}
      />
    </>
  );
}
