import axiosInstance from "@/api/axiosInstance"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useAdmin = () => {

    const queryClient = useQueryClient();



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
        mutationFn: async (data) => {
            const response = await axiosInstance.post("/admin/kiosks",data)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["kiosks"] });
          },
    })


    const editKiosk = useMutation({
        mutationFn: async ({ id, data }) => {
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



    //admin - dashboard - analytics

    const getDonationTrend = useQuery({
        queryKey:["donationTrend"],
        queryFn: async () => {
            const response = await axiosInstance.get("/admin/donationTrend")
            return response.data.trend

        }
    })
    const getTotalDonations = useQuery({
        queryKey:["totalDonations"],
        queryFn: async () => {
            const response = await axiosInstance.get("/admin/totalDonations")
            return response.data.total

        }
    })
    const getTotalVolunteers = useQuery({
        queryKey:["totalVolunteers"],
        queryFn: async () => {
            const response = await axiosInstance.get("/admin/totalVolunteers")
            return response.data.total

        }
    })
    const getTotalDonors = useQuery({
        queryKey:["totalDonors"],
        queryFn: async () => {
            const response = await axiosInstance.get("/admin/totalDonors")
            return response.data.total

        }
    })
    const getTotalKiosks = useQuery({
        queryKey:["totalKiosks"],
        queryFn: async () => {
            const response = await axiosInstance.get("/admin/totalKiosks")
            return response.data.total

        }
    })

    



    return {
        loginMutation,
        verifyLoginMutation,
        ToggleBlockUser,
        addKiosk,
        editKiosk,
        deleteKiosk,
        getDonationTrend,
        getTotalDonations,
        getTotalDonors,
        getTotalVolunteers,
        getTotalKiosks

    }
}

export const useGetAllUsers = ({ page, limit, search, role }) => {
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



export const  useGetKiosks = ({ page,limit }) => {
    return useQuery({
        queryKey: ["kiosks", { page, limit }],
        queryFn:async () => {
            const response = await axiosInstance.get("/admin/kiosks",{
                params: {
                    page,
                    limit,
                }
            })
            return response.data
        }
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