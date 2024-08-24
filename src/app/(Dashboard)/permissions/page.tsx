import { getAllModules } from "@/actions/module.action";
import { getAllPermissions } from "@/actions/permission.action";
import PermissionTable from "../__components/permission/permission.table";

export default async function PermissionsPage() {
  const permissions = await getAllPermissions();
  const myModules = await getAllModules();

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl bg-muted-40 w-full">
          Permissions
        </h1>
      </div>

      <PermissionTable data={permissions} myModules={myModules} />
    </>
  );
}
