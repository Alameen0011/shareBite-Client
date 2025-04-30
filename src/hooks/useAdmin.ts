import axiosInstance from "@/api/axiosInstance"
import { RootState } from "@/app/store";
import { editKioskSchema, kioskSchema } from "@/validations/kiosk/addKiosk";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSelector } from "react-redux";
import { z } from "zod";


type GetAllUsersParams = {
    page: number;
    limit: number;
    search?: string;
    role?: string;
  };


type Kiosk = z.infer<typeof kioskSchema>;
type EditKiosk = z.infer<typeof editKioskSchema>;

type GetKiosksParams = {
    page: number;
    limit: number;
    search?: string; 
  };
  


export const useAdmin = () => {

    const queryClient = useQueryClient();

    const accessToken = useSelector((state: RootState) => state.auth.accessToken);



    // Auth
    const loginMutation = useMutation({
        mutationFn: async (loginData: {email: string}) => {
            const response = await axiosInstance.post("/admin/login",loginData)
            return response.data
        }
    })

    const verifyLoginMutation = useMutation({
        mutationFn: async (token: string) => {
            const response = await axiosInstance.post(`/admin/verify-login?token=${token}`)
            return response.data
        }
    })

    const adminLogout = useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.post(`/admin/logout`)
            return response.data
        }
    })

    // User - Management
    const ToggleBlockUser = useMutation({
        mutationFn: async (id : string) => {
            const response = await axiosInstance.patch(`/admin/user/${id}/block`)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
          },
    })



    //Kiosk - management
    const addKiosk = useMutation({
        mutationFn: async (data:Kiosk) => {
            const response = await axiosInstance.post("/admin/kiosks",data)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["kiosks"] });
          },
    })


    const editKiosk = useMutation({
        mutationFn: async ({ id, data }: {id:string,data:EditKiosk}) => {
            const response = await axiosInstance.patch(`/admin/kiosks/${id}`,data)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["kiosk"] }); 
            queryClient.invalidateQueries({ queryKey: ["kiosks"] }); 
          },
    })

    const deleteKiosk = useMutation({
        mutationFn: async (id: string) => {
            const response = await axiosInstance.delete(`admin/kiosks/${id}`)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["kiosks"] });
          },
    })

    //admin-dashboard - centralized 
    const getAdminDashboardOverview = useQuery({
        queryKey:["dashboardOverview"],
        queryFn: async () => {
            const response = await axiosInstance.get("/admin/dashboard-overview")
            return response.data

        },
        enabled:!!accessToken
    })
    return {
        loginMutation,
        verifyLoginMutation,
        adminLogout,
        ToggleBlockUser,
        addKiosk,
        editKiosk,
        deleteKiosk,
      
        getAdminDashboardOverview,

    }
}

export const useGetAllUsers = ({ page, limit, search, role }:GetAllUsersParams) => {
    return useQuery({
      queryKey: ["users", { page, limit, search, role }],
      queryFn: async () => {
        const response = await axiosInstance.get(`/admin/users`,{
            params: {
              page,
              limit,
              search,
              role,
            },
          });
        return response.data;
      },
      enabled: !!page && !!limit,
      placeholderData: (previousData) => previousData,
      
    });
  };



export const  useGetKiosks = ({ page,limit,search }:GetKiosksParams) => {
    return useQuery({
        queryKey: ["kiosks", { page, limit,search }],
        queryFn:async () => {
            const response = await axiosInstance.get("/admin/kiosks",{
                params: {
                    page,
                    limit,
                    search
                }
            })
            return response.data
        },
        enabled: !!page && !!limit,
        placeholderData: (previousData) => previousData,

    })
}  

export const  useGetSingleKiosk = (id:string) => {
    return useQuery({
        queryKey: ["kiosk",{ id }],
        queryFn:async () => {
            const response = await axiosInstance.get(`/admin/kiosk/${id}`)
            return response.data
        }
    })
}  



//Later write this into UseMessage - after merge..? don't know lets figure it out later
export const useGetUsersMessagedAdmin = () => {
    return useQuery({
        queryKey:["mesgs"],
        queryFn:async () => {
            const response = await axiosInstance.get("admin/message")
            return response.data.users
        }
    })
}