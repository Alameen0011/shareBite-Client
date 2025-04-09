import { updateDonationSchema } from "@/validations/donation/addDonation";
import { z } from "zod";

/* Get Donation Hook type  */
interface Donor {
    _id: string;
    name: string;
    email: string;
}

interface PickupLocation {
    type: "Point";
    coordinates: [number, number]; //[lng, lat]
    address: string;
  }

export interface Donation {
    _id: string;
    pickupLocation: PickupLocation
    donor: Donor
    type: "cooked" | "non-perishable" | "perishable"
    quantity: number;
    expiry: string | null;
    image: string;
    status:
    | "canceled"
    | "pending"
    | "claimed"
    | "picked_up"
    | "delivered_to_kiosk"
    | "available_for_distribution"
    | "distributed"
    | "discarded";
    volunteer: string | null;
    kiosk: string | null;
  // Optional:
  createdAt?: string;
  updatedAt?: string;
  __v?: number;

}


export interface GetDonationResponse {
    success: boolean;
    donations: Donation[];
}


/* Get Single Donation Hook type */

export interface GetSingleDonationResponse {
  success: boolean;
  donation: Donation;
}


/* update Donation Hook type */
type UpdateDonationFormData = z.infer<typeof updateDonationSchema>

export interface UpdateDonationArgs {
  data: UpdateDonationFormData;
  id: string;
}

export interface UpdateDonationResponse {
  success: boolean;
  message?: string;
  donation: Donation
}


export  interface DerivedPaint {
    type: string;
    quantity: number;
    pickupLocation: PickupLocation,
    image: string;
    expiry?: string;
  }