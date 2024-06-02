import { z } from "zod";

export const RoleSchema = z.object({
  roleName: z.string().min(1, { message: "Role Name is empty" }).max(50),
});
