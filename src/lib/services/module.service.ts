import { eq } from "drizzle-orm";

import db from "@/lib/database";
import { moduleTable } from "../database/schema";

export const getAllModuleService = async () =>
    await db.query.moduleTable.findMany();

export const getModuleByIdService = async (id: string) =>
    await db.query.moduleTable.findFirst({
        where: eq(moduleTable.id, id),
    });

export const createModuleService = async (values: { id: string; name: string }) =>
    await db
        .insert(moduleTable)
        .values({
            id: values.id,
            name: values.name,
        })
        .returning({
            id: moduleTable.id,
        });

export const editModuleService = async (values: { id: string; name: string }) =>
    await db
        .update(moduleTable)
        .set({
            name: values.name,
        })
        .where(eq(moduleTable.id, values.id))
        .returning({
            id: moduleTable.id,
        });

export const deleteModuleService = async (id: string) =>
    await db
        .delete(moduleTable)
        .where(eq(moduleTable.id, id))
        .returning({ id: moduleTable.id });