import { getSocket } from "@/api/socket";
import { RootState } from "@/app/store";
import { Donation } from "@/types/donation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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

    //  Emit join on volunteer location
    socket.emit("volunteer:join", { lat, lng });
    
    // Listen for nearby donations
    socket.on("donations:nearby", handleNearby);

    // socket.on("donations:new",)

    return () => {
      socket.off("donations:nearby", handleNearby);
    };
  }, [lat, lng, accessToken]);

  return donations;
};
