"use server";

import { z } from "zod";
import { generateId } from "lucia";

import {
  createRoleService,
  deleteRoleService,
  getAllRoleService,
  getRoleByIdService,
} from "@/lib/services/role.service";
import { RoleSchema } from "@/types/role";
import { revalidatePath } from "next/cache";

export const getAllRoles = async () => {
  try {
    const roles = await getAllRoleService();

    return {
      success: true,
      data: roles,
      message: "Success get all roles",
    };
  } catch (error: any) {
    return {
      success: false,
      data: null,
      message: error?.message,
    };
  }
};

export const getRoleById = async (id: string) => {
  try {
    const role = await getRoleByIdService(id);

    return {
      success: true,
      data: role,
      message: "Success get one roles",
    };
  } catch (error: any) {
    return {
      success: false,
      data: null,
      message: error?.message,
    };
  }
};

export const createRole = async (values: z.infer<typeof RoleSchema>) => {
  try {
    const id = generateId(15);

    const newRole = await createRoleService({
      id,
      name: values.name,
    });
    revalidatePath("/roles");

    return {
      success: true,
      data: {
        newRole,
      },
      message: "Success create a role",
    };
  } catch (error: any) {
    return {
      success: false,
      data: null,
      message: error?.message,
    };
  }
};

export const deleteRole = async (id: string) => {
  try {
    await deleteRoleService(id);
    revalidatePath("/roles");

    return {
      success: true,
      data: null,
      message: "Success delete role",
    };
  } catch (error: any) {
    return {
      success: false,
      data: null,
      message: error?.message,
    };
  }
};
