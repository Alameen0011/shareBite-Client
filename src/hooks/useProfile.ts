import axiosInstance from "@/api/axiosInstance"
import { profileSchema } from "@/validations/Profile/profile";
import { useMutation, useQuery} from "@tanstack/react-query"
import { z } from "zod";


type FormData = z.infer<typeof profileSchema>;

export const useProfile = () => {

    const updateProfile = useMutation({
        mutationFn: async (data:FormData) => {
            const response = await axiosInstance.post("/profile/updateProfile",data)
            return response.data
        }
    })

    const getProfile = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const response = await axiosInstance.get("/profile/getProfile")
            console.log(response)
            return response.data
        }
    })




    return {
        updateProfile,
        getProfile

    }
}