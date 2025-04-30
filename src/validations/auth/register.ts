import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "email is required" })
    .email({ message: "Invalid email id" }),
});
