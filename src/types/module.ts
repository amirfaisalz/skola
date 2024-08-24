import { z } from "zod";

export const ModuleSchema = z.object({
    name: z.string().min(1, { message: "Module Name is empty" }),
});
