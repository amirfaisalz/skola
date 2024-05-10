import { eq } from "drizzle-orm";

import db from "@/lib/database";
import { userTable } from "@/lib/database/schema";

interface ICreateUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
  roleId: string;
}

export const createUser = async (values: ICreateUser) =>
  await db
    .insert(userTable)
    .values({
      id: values.id,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      hashedPassword: values.hashedPassword,
      roleId: values.roleId,
    })
    .returning({
      id: userTable.id,
      email: userTable.email,
    });

export const getUserByEmail = async (email: string) =>
  await db.query.userTable.findFirst({
    where: (table) => eq(table.email, email),
  });
