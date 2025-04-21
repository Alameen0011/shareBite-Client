import { Button } from "@/components/ui/button";
import VolunteerRouteMap from "@/components/Volunteer/VolunteerRouteMap";
import { Check } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetNearestKiosk } from "@/hooks/useVolunteer";

const VolunteerKioskNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navState = location.state || JSON.parse(sessionStorage.getItem("donationData") || "{}");

  console.log(navState,"navState")
  const storedLocationData = JSON.parse(sessionStorage.getItem("donationData"))
  console.log(storedLocationData, "session daata")

  const {  coordinates ,  id } = navState;

  console.log(coordinates,"donor location from Navstate")


  const [lng, lat] = coordinates;

  const { data, isLoading, isError } = useGetNearestKiosk({
    lat,
    lng,
    id,
  });

  console.log(data, "datta from nearest kiosk in component");

  const deliveryLocation = data?.data?.location?.coordinates;
  const kioskName = data?.data?.name;
  const distance = data?.data?.distance;

  const handleDelivery = () => {
    //handling delivery
    navigate(`/volunteer/kiosk/otp/${id}`);
  };

  if (isLoading) return <p>Loading..</p>;
  if (isError) return <p>Error</p>;
  return (
    <div className="space-y-6 m-10 flex flex-col mx-auto items-center max-w-2xl w-full">
    <div className="text-center space-y-1">
      <h2 className="text-xl font-semibold text-green-700">
        Nearest Kiosk: {kioskName || 'Unknown'}
      </h2>
      <p className="text-muted-foreground">
        📍 Distance: {distance ? `${distance.toFixed(2)} km` : 'N/A'}
      </p>
    </div>

    <VolunteerRouteMap pickupLocation={deliveryLocation} />

    <Button
      onClick={handleDelivery}
      className="w-full max-w-xs px-6 py-2 text-base bg-green-500 hover:bg-green-600"
      variant="default"
    >
      Delivered
      <Check strokeWidth={3} className="ml-3 h-4 w-4" />
    </Button>
  </div>
  );
};

export default VolunteerKioskNavigation;
