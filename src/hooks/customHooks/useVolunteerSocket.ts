import { getSocket } from "@/api/socket";
import { RootState } from "@/app/store";
import { Donation } from "@/types/donation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

// type DonationWithSocketFlag = Donation & {
//   isSocketUpdate?: boolean;
// };





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

  

 
    
    // Listen for nearby donations
    socket.on("donations:nearby", handleNearby); //working fine

    socket.on("donationClaimed", handleClaimed); // this is also working fine, but with merging useing usememo prevent this, we can use invalidation of that query to show realtime claiming - test needed

    socket.on("donation:new", handleNewDonation);  //working fine without handleclaimed


    return () => {
      socket.off("donations:nearby", handleNearby);
      socket.off("donationClaimed", handleClaimed);
      socket.off("donation:new",handleNewDonation);

    };
  }, [lat, lng, accessToken]);

  return donations;
};
