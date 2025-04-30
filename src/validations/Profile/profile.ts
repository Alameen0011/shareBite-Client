import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters long"),
});