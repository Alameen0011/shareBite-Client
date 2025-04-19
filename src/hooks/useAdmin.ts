import axiosInstance from "@/api/axiosInstance"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useAdmin = () => {

    const queryClient = useQueryClient();

    const ToggleBlockUser = useMutation({
        mutationFn: async (id : string) => {
            const response = await axiosInstance.patch(`/admin/user/${id}/block`)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
          },
    })




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



    return {
    
        ToggleBlockUser,
        addKiosk,
        editKiosk,
        deleteKiosk

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