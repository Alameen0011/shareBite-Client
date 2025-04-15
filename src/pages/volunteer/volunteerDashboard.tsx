import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useMemo, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useVolunteerSocket } from "@/hooks/customHooks/useVolunteerSocket";
import { useGetAvailableDonations } from "@/hooks/useVolunteer";
import { useVolunteer } from "@/hooks/useVolunteer";
import { toast } from "sonner";
import { Donation } from "@/types/donation";

const VolunteerDashboard = () => {
  const navigate = useNavigate();
  const { claimDonation } = useVolunteer();
  const { mutateAsync } = claimDonation;

  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [radius] = useState<number>(5);

  // Get donations from API based on volunteer location
  const {
    data: initialDonations = [],
    isError,
    isLoading,
  } = useGetAvailableDonations({ lat, lng, radius });
  
   // Get live socket donations
  const socketDonations = useVolunteerSocket(lat, lng);

    // Merge + deduplicate
  const mergedDonations: Donation[] = useMemo(() => {
    const map = new Map();
    [...initialDonations, ...socketDonations].forEach((d) => {
      map.set(d._id, d); // Later one (socket) will override if same id
    });
    return Array.from(map.values());
  }, [initialDonations, socketDonations]);


  // 1. Get volunteer geo-location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude);
      setLng(pos.coords.longitude);
    });
  }, []);


// Handle claiming
  const handleClaim = async (donation: Donation) => {
    console.log(donation, "claimed");
    try {
      const res = await mutateAsync(donation._id);
      if (res.success) {
        toast.success("claimed successfully");
        navigate(`/volunteer/navigation`, {
          state: {
            coordinates: donation.pickupLocation.coordinates, // e.g. [lng, lat]
            id: donation._id, // needed for marking as claimed
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Somethign wrong happened please try again later");
    }
  };

    // ------------------
  // UI
  // ------------------

  if (lat === null || lng === null) return <p>Getting location....</p>;
  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error..</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 grid grid-cols-1   gap-6">
      {mergedDonations.length === 0 ? (
        <p className="text-muted-foreground text-center">
          No donations available nearby.
        </p>
      ) : (
        mergedDonations.map((donation) => (
          <Card
            key={donation._id}
            className={`shadow-lg transition-all ${
              donation.isSocketUpdate ? "ring-2 ring-green-400" : ""
            }`}
          >
            <CardContent className="p-4 space-y-2">
              <div className="flex gap-4">
                <img
                  src={donation.image}
                  alt={donation.type}
                  className="w-20 h-20 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold capitalize">
                    {donation.title}
                    {donation.isSocketUpdate && (
                      <span className="text-sm text-green-500 ml-2">• New</span>
                    )}
                  </h3>
                  <p>📍{donation.pickupLocation.address}</p>
                  <p>
                    🕒{" "}
                    {formatDistanceToNow(new Date(donation.createdAt ?? "" ), {
                      addSuffix: true,
                    })}
                  </p>
                  <p>📦 Quantity: {donation.quantity}</p>
                </div>
              </div>

              <Button
                className=" w-full mt-2 bg-green-500"
                onClick={() => handleClaim(donation)}
              >
                Claim
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default VolunteerDashboard;
