import axiosInstance from "@/api/axiosInstance"
import { useMutation, useQuery} from "@tanstack/react-query"


export const useProfile = () => {

    const updateProfile = useMutation({
        mutationFn: async (data) => {
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