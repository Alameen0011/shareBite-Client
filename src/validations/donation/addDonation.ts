import { z } from "zod";

// Donation API Schema
const pickupLocationSchema = z.object({
    type: z.literal("Point").default("Point"), // Ensures only "Point" is allowed
    coordinates: z
        .array(z.number())
        .length(2, "Coordinates must contain exactly [longitude, latitude]")
        .default([0, 0]), // Default to (0,0)
    address: z.string().min(5, "Address must be at least 5 characters").default("Unknown Address"),
});

export const donationSchema = z.object({
    type: z.enum(["perishable", "non-perishable", "cooked"]).default("perishable"),
    quantity: z.number().min(1, "Quantity must be at least 1").default(1),
    expiry: z.union([z.string().datetime(), z.date(), z.null()]).optional().default(null), // Default to null
    pickupLocation: pickupLocationSchema.default({
        type: "Point",
        coordinates: [0, 0],
        address: "Unknown Address",
    }),
    image: z.string().url("Invalid image URL").default("https://via.placeholder.com/150"), // Default image placeholder
});




//updateDonation API schema
export const updateDonationSchema = donationSchema.partial();


