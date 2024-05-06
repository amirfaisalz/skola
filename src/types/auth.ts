import { z } from "zod";

export const SignUpSchema = z
  .object({
    firstName: z.string().min(1, { message: "First Name is empty" }).max(50),
    lastName: z.string().min(1, { message: "Last Name is empty" }).max(50),
    email: z.string().min(1, { message: "Email is empty" }).max(50).email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const SignInSchema = z.object({
  email: z.string().min(1, { message: "Email is empty" }).max(50).email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});
