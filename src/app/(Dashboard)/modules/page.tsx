import ModuleTable from "../__components/modules/module.table";
import { getAllModules } from "@/actions/module.action";

export default async function RolesPage() {
  const myModules = await getAllModules();

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl bg-muted-40 w-full">
          Modules
        </h1>
      </div>

      <ModuleTable data={myModules} />
    </>
  );
}
