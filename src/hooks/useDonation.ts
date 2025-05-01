import axiosInstance from "@/api/axiosInstance"
import { GetDonationResponse, UpdateDonationArgs, UpdateDonationResponse } from "@/types/donation"
import { donationSchema } from "@/validations/donation/addDonation";
import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import { z } from "zod";

type FormData = z.infer<typeof donationSchema>;

export const useDonation = () => {

    const queryClient = useQueryClient()

    const createDonation = useMutation({
        mutationFn: async (data:FormData) => {
            const response = await axiosInstance.post("/donor/donations",data)
            return response.data
        },
        onSuccess: () => {
             //Invalidate donation list after creation
            queryClient.invalidateQueries({ queryKey:["donations"] })
        }
    })

    const updateDonation = useMutation<UpdateDonationResponse, Error, UpdateDonationArgs>({
        mutationFn: async ({ id,data }) => {
            console.log(id, data,"::::: inside useDonation api")
            const response = await axiosInstance.put(`/donor/donations/${id}`,data)
            return response.data
        },
        onSuccess: (_, { id }) => {
            // ✅ Invalidate both single and list
            queryClient.invalidateQueries({ queryKey: ["donation", id] });
            queryClient.invalidateQueries({ queryKey: ["donations"] });
          },
      
    })

    const cancelDonation = useMutation({
        mutationFn: async (id: string ) => {
            const response = await axiosInstance.delete(`/donor/donations/${id}`)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey:["donations"] })
        }
    })

    const getDonations = useQuery<GetDonationResponse>({
        queryKey:["donations"],
        queryFn: async () => {
            const response = await axiosInstance.get("/donor/donations")
            console.log(response,": Response from api")
            return response.data
        }
    })



    return {
        createDonation,
        updateDonation,
        cancelDonation,
        getDonations,

    }

}

export const useSingleDonation = (id: string) => {
    return useQuery({
        queryKey: ["donation", id],
        queryFn: async () => {
            const response = await axiosInstance.get(`/donor/donations/${id}` )
            console.log(response.data.donation)
            return response.data
        },
        enabled: !!id, 
    })

}