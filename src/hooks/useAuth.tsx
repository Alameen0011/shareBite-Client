import axiosInstance from "@/api/axiosInstance"
import { useMutation } from "@tanstack/react-query"


export const useAuth = () => {
         const registerMutation = useMutation({
        mutationFn: async (registerData: {email: string; role: string}) => {
            const response = await axiosInstance.post('/user/register',registerData);
            return response.data;
        }
    })

  const verifyRegisterMutation = useMutation({
        mutationFn:async (tokenData: {token: string}) => {
           const response = await axiosInstance.post(`/user/verify-register?token=${tokenData.token}`,);
           return response.data
        }
    })

  const loginMutation = useMutation({
        mutationFn: async (loginData: {email: string}) => {
            const response = await axiosInstance.post("/user/login",loginData)
            return response.data
        }
    })

    const verifyLoginMutation = useMutation({
        mutationFn: async (tokenData: {token: string}) => {
            const response = await axiosInstance.post("/user/verify-login",{ params: tokenData })
            return response.data
        }
    })

    const logoutMutation = useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.post("/user/logout")
            return response.data
        }
    })



    return {
        registerMutation,
        verifyRegisterMutation,
        loginMutation,
        verifyLoginMutation,
        logoutMutation
    }
    



}


