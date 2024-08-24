import { z } from "zod";

export const PermissionSchema = z.object({
    name: z.string().min(1, { message: "Permission Name is empty" }),
    moduleId: z.string().min(1, { message: "Module is empty" })
});
