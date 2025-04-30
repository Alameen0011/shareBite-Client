import { z } from "zod";




export const kioskSchema = z.object({
  name: z.string().min(1, "Kiosk name is required"), // 🚫 no .default("")
  location: z.object({
    type: z.literal("Point"),
    coordinates: z
      .array(z.number())
      .length(2, "Coordinates must be an array of [longitude, latitude]"),
    address: z.string(),
  }),
});


  //Edit kiosk zod schema 
  export const editKioskSchema = kioskSchema.partial();