import db from "@/lib/database";

export const getAllRoleService = async () =>
  await db.query.roleTable.findMany();
