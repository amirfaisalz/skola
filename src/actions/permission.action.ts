"use server";

import { z } from "zod";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";

import {
    createPermissionService,
    deletePermissionService,
    editPermissionService,
    getAllPermissionService,
    getPermissionByIdService,
} from "@/lib/services/permission.service";
import { PermissionSchema } from "@/types/permission";

export const getAllPermissions = async () => {
    try {
        const permissions = await getAllPermissionService();

        return {
            success: true,
            data: permissions,
            message: "Success get all permissions",
        };
    } catch (error: any) {
        return {
            success: false,
            data: null,
            message: error?.message,
        };
    }
};

export const getPermissionById = async (id: string) => {
    try {
        const permission = await getPermissionByIdService(id);

        return {
            success: true,
            data: permission,
            message: "Success get one permission",
        };
    } catch (error: any) {
        return {
            success: false,
            data: null,
            message: error?.message,
        };
    }
};

export const createPermission = async (
    values: z.infer<typeof PermissionSchema>
) => {
    try {
        const id = generateId(15);

        const newPermission = await createPermissionService({
            id,
            name: values.name,
            moduleId: values.moduleId,
        });
        revalidatePath("/permissions");

        return {
            success: true,
            data: {
                newPermission,
            },
            message: "Success create a permission",
        };
    } catch (error: any) {
        return {
            success: false,
            data: null,
            message: error?.message,
        };
    }
};

export const editPermission = async ({
    id,
    name,
    moduleId,
}: {
    id: string;
    name: string;
    moduleId: string;
}) => {
    try {
        const newRole = await editPermissionService({
            id,
            name,
            moduleId,
        });
        revalidatePath("/permissions");

        return {
            success: true,
            data: {
                newRole,
            },
            message: "Success edit permission",
        };
    } catch (error: any) {
        return {
            success: false,
            data: null,
            message: error?.message,
        };
    }
};

export const deletePermission = async (id: string) => {
    try {
        await deletePermissionService(id);
        revalidatePath("/permissions");

        return {
            success: true,
            data: null,
            message: "Success delete permission",
        };
    } catch (error: any) {
        return {
            success: false,
            data: null,
            message: error?.message,
        };
    }
};
