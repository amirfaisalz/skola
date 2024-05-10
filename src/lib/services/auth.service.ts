import { eq } from "drizzle-orm";

import db from "@/lib/database";

export const getRoleByName = async (roleName: string) => {
  return await db.query.roleTable.findFirst({
    where: (table) => eq(table.name, roleName),
  });
};
