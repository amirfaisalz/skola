"use client";

import { DataTable } from "@/components/shared/data-table";
import { roleColumns } from "./column";
import RoleForm from "./role.form";

export default function RoleTable() {
  return (
    <>
      <DataTable
        data={[
          { id: "1", name: "satu asdasd" },
          { id: "2", name: "dua name" },
          { id: "3", name: "3 asdasd" },
          { id: "4", name: "4 name" },
          { id: "5", name: "5 asdasd" },
          { id: "6", name: "6 name" },
          { id: "7", name: "satu asdasd" },
          { id: "8", name: "dua name" },
          { id: "9", name: "3 asdasd" },
          { id: "10", name: "4 name" },
          { id: "11", name: "4 name" },
          { id: "12", name: "5 asdasd" },
          { id: "13", name: "6 name" },
          { id: "17", name: "satu asdasd" },
          { id: "18", name: "dua name" },
          { id: "19", name: "3 asdasd" },
          { id: "110", name: "4 name" },
        ]}
        columns={roleColumns}
        filter={{
          isSearch: true,
          searchPlaceholder: "Filter role...",
          searchColumn: "name",
        }}
        addData={<RoleForm />}
      />
    </>
  );
}
