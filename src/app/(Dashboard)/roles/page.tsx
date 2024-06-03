import { getAllRoles } from "@/actions/role.action";
import RoleTable from "../__components/roles/role.table";

export default async function RolesPage() {
  const roles = await getAllRoles();

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl bg-muted-40 w-full">
          Roles
        </h1>
      </div>

      <RoleTable data={roles} />
    </>
  );
}
