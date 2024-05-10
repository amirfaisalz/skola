"use server";

import { getAllRoleService } from "@/lib/services/role.service";

export const getAllRole = async () => {
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
