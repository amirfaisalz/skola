"use server";

import { z } from "zod";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";

import { ModuleSchema } from "@/types/module";
import {
    createModuleService,
    deleteModuleService,
    editModuleService,
    getAllModuleService,
    getModuleByIdService,
} from "@/lib/services/module.service";

export const getAllModules = async () => {
    try {
        const modules = await getAllModuleService();

        return {
            success: true,
            data: modules,
            message: "Success get all modules",
        };
    } catch (error: any) {
        return {
            success: false,
            data: null,
            message: error?.message,
        };
    }
};

export const getModuleById = async (id: string) => {
    try {
        const oneModule = await getModuleByIdService(id);

        return {
            success: true,
            data: oneModule,
            message: "Success get one module",
        };
    } catch (error: any) {
        return {
            success: false,
            data: null,
            message: error?.message,
        };
    }
};

export const createModule = async (values: z.infer<typeof ModuleSchema>) => {
    try {
        const id = generateId(15);

        const newModule = await createModuleService({
            id,
            name: values.name,
        });
        revalidatePath("/modules");

        return {
            success: true,
            data: {
                newModule,
            },
            message: "Success create a module",
        };
    } catch (error: any) {
        return {
            success: false,
            data: null,
            message: error?.message,
        };
    }
};

export const editModule = async ({
    id,
    name,
}: {
    id: string;
    name: string;
}) => {
    try {
        const newRole = await editModuleService({
            id,
            name,
        });
        revalidatePath("/modules");

        return {
            success: true,
            data: {
                newRole,
            },
            message: "Success edit modules",
        };
    } catch (error: any) {
        return {
            success: false,
            data: null,
            message: error?.message,
        };
    }
};

export const deleteModule = async (id: string) => {
    try {
        await deleteModuleService(id);
        revalidatePath("/modules");

        return {
            success: true,
            data: null,
            message: "Success delete module",
        };
    } catch (error: any) {
        return {
            success: false,
            data: null,
            message: error?.message,
        };
    }
};
