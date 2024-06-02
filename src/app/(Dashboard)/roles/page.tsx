import RoleTable from "../__components/roles/role.table";

export default function RolesPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Roles</h1>
      </div>

      <RoleTable />
    </>
  );
}
