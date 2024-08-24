import { eq } from "drizzle-orm";

import db from "@/lib/database";
import { moduleTable, permissionTable } from "../database/schema";

export const getAllPermissionService = async () =>
    await db
        .select({
            id: permissionTable.id,
            name: permissionTable.name,
            moduleId: permissionTable.moduleId,
            module: moduleTable,
        })
        .from(permissionTable)
        .innerJoin(moduleTable, eq(permissionTable.moduleId, moduleTable.id));

export const getPermissionByIdService = async (id: string) =>
    await db.query.permissionTable.findFirst({
        where: eq(permissionTable.id, id),
    });

export const createPermissionService = async (values: { id: string; name: string; moduleId: string }) =>
    await db
        .insert(permissionTable)
        .values({
            id: values.id,
            name: values.name,
            moduleId: values.moduleId
        })
        .returning({
            id: permissionTable.id,
        });

export const editPermissionService = async (values: { id: string; name: string; moduleId: string }) =>
    await db
        .update(permissionTable)
        .set({
            name: values.name,
            moduleId: values.moduleId
        })
        .where(eq(permissionTable.id, values.id))
        .returning({
            id: permissionTable.id,
        });

export const deletePermissionService = async (id: string) =>
    await db
        .delete(permissionTable)
        .where(eq(permissionTable.id, id))
        .returning({ id: permissionTable.id });