import axiosInstance from "@/api/axiosInstance"
import { useMutation, useQuery } from "@tanstack/react-query"


export const useAdmin = () => {

   

    const ToggleBlockUser = useMutation({
        mutationFn: async (id : string) => {
            const response = await axiosInstance.patch(`/admin/user/${id}/block`)
            return response.data
        }
    })


    const getKiosks = useQuery({
        queryKey: ["Kiosks"],
        queryFn:async () => {
            const response = await axiosInstance.get("/admin/kiosks")
            return response.data
        }
    })

    const addKiosk = useMutation({
        mutationFn: async (data) => {
            const response = await axiosInstance.post("/admin/kiosks",data)
            return response.data
        }
    })


    const editKiosk = useMutation({
        mutationFn: async ({ id, data }) => {
            const response = await axiosInstance.patch(`/admin/kiosks/${id}`,data)
            return response.data
        }
    })

    const deleteKiosk = useMutation({
        mutationFn: async (id: string) => {
            const response = await axiosInstance.delete(`admin/kiosks/${id}`)
            return response.data
        }
    })



    return {
    
        ToggleBlockUser,
        getKiosks,
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