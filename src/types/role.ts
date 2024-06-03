import { z } from "zod";

export const RoleSchema = z.object({
  name: z.string().min(1, { message: "Role Name is empty" }).max(50),
});
