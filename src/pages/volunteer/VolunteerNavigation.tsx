import { Button } from "@/components/ui/button";
import VolunteerRouteMap from "@/components/Volunteer/VolunteerRouteMap";
import { Check } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const VolunteerNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { coordinates, id } = location.state || {};

  if (!coordinates || !id) {
    return (
      <div className="text-center mt-10 text-red-500">
        Invalid navigation data. Please try claiming a donation again.
      </div>
    );
  }

  const handlePickup = () => {
    sessionStorage.setItem("donationData", JSON.stringify({ coordinates, id }));
    navigate(`/volunteer/verifyOtp/${id}`, {
      state: {
        coordinates,
        id,
      },
    });
  };

  return (
    <div className="space-y-6 m-10 flex flex-col mx-auto items-center max-w-2xl w-full font-tertiary">
      <VolunteerRouteMap pickupLocation={coordinates} />
      <Button
        onClick={handlePickup}
        className="w-full max-w-xs px-6 py-2 text-base bg-green-500 hover:bg-green-600"
        variant="default"
      >
        Picked Up
        <Check strokeWidth={3} className="ml-3 h-4 w-4" />
      </Button>
    </div>
  );
};

export default VolunteerNavigation;
