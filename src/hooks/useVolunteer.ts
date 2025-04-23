import axiosInstance from "@/api/axiosInstance"
import { useMutation, useQuery} from "@tanstack/react-query"


type AvailableDonationParams = {
    lat:number | null,
    lng: number | null,
    radius: number
}

export const useVolunteer = () => {
    // const queryClient = useQueryClient()

    const claimDonation = useMutation({
        mutationFn: async(id: string) => {
            const response = await axiosInstance.patch(`/volunteer/donations/${id}/claim`)
            return response.data
        }
    })

    const verifyAndPickup = useMutation({
        mutationFn: async({id,derivedOtp}:{id:string,derivedOtp:string}) => {
            console.log(id,derivedOtp)
            const response = await axiosInstance.patch(`/volunteer/donations/${id}/verifyPickup`,{otp:derivedOtp})
            return response.data
        }

    })

    const verifyAndDeliver = useMutation({
        mutationFn: async({id , otp}: {id:string,otp:string}) => {
            console.log(id,otp,"id and otp in verify and deliver")
            const response = await axiosInstance.patch(`/volunteer/donations/${id}/delivered`,{otp})
            return response.data
        }
    })

    return {
        claimDonation,
        verifyAndPickup,
        verifyAndDeliver
    }

    
}

export const useGetAvailableDonations = ({ lat, lng, radius }: AvailableDonationParams) => {
    // Log the lat, lng, and radius to make sure they are being passed correctly
    console.log("lat:", lat, "lng:", lng, "radius:", radius);
  
    return useQuery({
      queryKey: ["availableDonations", lat, lng, radius], // Include dynamic parameters in queryKey
      queryFn: async () => {
        // Check if lat and lng are valid before making the API request
        if (!lat || !lng) {
          throw new Error("lat and lng must be provided");
        }
  
        const response = await axiosInstance.get(
          `/volunteer/donations/available?lat=${lat}&lng=${lng}&radius=${radius}`
        );
        console.log(response, ": Response from API");
        return response.data.donations;
      },

    });
  };

  export const useGetNearestKiosk = ({ lat, lng, id }:{lat:number,lng:number,id:string}) => {
    console.log("lat, lng, id inside query:", lat, lng, id); // Log params
  
    return useQuery({
      queryKey: ["nearestKiosk"],
      queryFn: async () => {
        console.log("Making API request..."); // Log right before making the API call
        const response = await axiosInstance.get(
          `volunteer/donations/${id}/nearestKiosk?lat=${lat}&lng=${lng}`
        );
        console.log(response, "response from API Nearest Kiosk");
        return response.data;
      },
    });
  };
  


