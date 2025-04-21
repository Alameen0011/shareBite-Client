import { getSocket } from "@/api/socket";
import { RootState } from "@/app/store";
import { Donation } from "@/types/donation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

// type DonationWithSocketFlag = Donation & {
//   isSocketUpdate?: boolean;
// };


interface IncomeParams {
  donationId: string,
  volunteerId: string
}


export const useVolunteerSocket = (lat: number | null, lng: number | null): Donation[] => {

    console.log(lat,lng,"lat lng to volunteer socket")

  const [donations, setDonations] = useState<Donation[]>([]);
  const { accessToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (lat === null || lng === null) return;
    const socket = getSocket();
    if (!socket) return;

       //  Emit join on volunteer location
       socket.emit("volunteer:join", { lat, lng });

    const handleNearby = (donationList: Donation[]) => {
      const updatedDonations: Donation[] = donationList.map((donation) => ({
        ...donation,
        isSocketUpdate: true,
      }));
    
      setDonations((prev) => {
        const existingIds = new Set(prev.map((d) => d._id));
        const newDonations = updatedDonations.filter((d) => !existingIds.has(d._id));
        return [...newDonations, ...prev];
      });
    };

    const handleClaimed = ({ donationId,claimedBy }: { donationId: string, claimedBy: string }) => {
      // Remove the donation that just got claimed by someone else
      console.log(donationId,"donation Id emited by server")
      console.log(claimedBy,"claimed by this guy")
    
      setDonations((prev) => {
        console.log("Prev donations:", prev.map(d => d._id));
        console.log("Server sent:", donationId);
        const filteredDonation = prev.filter((d) => d._id !== donationId ) 
        console.log("filteredDonation",filteredDonation)
       return filteredDonation 
      })

      toast.info("A nearby donation was claimed!");
    };


    const handleNewDonation = (newDonation: Donation) => {
      console.log("new donation in your range")
      toast.success(`🍱 New donation available at ${newDonation.pickupLocation.address || "a nearby location"}!`);
    }

    const handleDonationPickedUp = ({donationId, volunteerId}: IncomeParams ) => {
      console.log("toast message by volunteer on successfull pickup")
      console.log("donation Id",donationId)
      console.log("volunteer Id",volunteerId)
      toast.success(" 🚀 Your donation has been successfully picked up")
    }

   const handleDonationDelivery = ({donationId, volunteerId}: IncomeParams) => {
    console.log("toast to donor on successfull deliver")
    console.log("donation Id",donationId)
    console.log("volunteer Id",volunteerId)
    toast.success(" 🚀 Your donation has been successfully delivered")
   }
  

 
    
    // Listen for nearby donations
    socket.on("donations:nearby", handleNearby); //working fine

    socket.on("donationClaimed", handleClaimed); 

    socket.on("donation:new", handleNewDonation);  //working fine without handleclaimed

    socket.on("donationPickedUp",handleDonationPickedUp)

    socket.on("donationDelivery",handleDonationDelivery)

    return () => {
      socket.off("donations:nearby", handleNearby);
      socket.off("donationClaimed", handleClaimed);
      socket.off("donation:new",handleNewDonation);
      socket.off("donationPickedUp",handleDonationPickedUp);
    };
  }, [lat, lng, accessToken]);

  return donations;
};
