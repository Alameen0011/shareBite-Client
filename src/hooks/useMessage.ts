import axiosInstance from "@/api/axiosInstance"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetMessages = (id: string) => {
    return useQuery({
        queryKey: ["getMessages"],
        queryFn: async () => {
            const response = await axiosInstance.get(`/admin/message/${id}`)
            return response.data
        }

        
    })
}


export const useMessage = () => {

    const sendMessage = useMutation({
        mutationFn: async ({id,text}) => {
            const response = await axiosInstance.post(`admin/message/send/${id}`, { text })
            return response.data
        }
    })

    return {
        sendMessage

    }
}