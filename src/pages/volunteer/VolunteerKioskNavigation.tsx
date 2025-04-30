import { Button } from "@/components/ui/button";
import VolunteerRouteMap from "@/components/Volunteer/VolunteerRouteMap";
import { Check } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetNearestKiosk } from "@/hooks/useVolunteer";
import Loading from "@/components/Loading";
import CommonError from "@/components/CommonError";

const VolunteerKioskNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navState = location.state || JSON.parse(sessionStorage.getItem("donationData") || "{}");

  const {  coordinates ,  id } = navState;



  const [lng, lat] = coordinates;

  const { data, isLoading, isError,refetch } = useGetNearestKiosk({
    lat,
    lng,
    id,
  });

  console.log(data, "datta from nearest kiosk in component");

  const deliveryLocation = data?.data?.location?.coordinates;
  const kioskName = data?.data?.name;
  const distance = data?.distance;

  const handleDelivery = () => {
    navigate(`/volunteer/kiosk/otp/${id}`);
  };

  if (isLoading) return <Loading/>;
  if (isError) return <CommonError message="No kiosk Available nearby.." retry={refetch} /> ;
  return (
    <div className="space-y-6 m-10 flex flex-col mx-auto items-center max-w-2xl w-full font-tertiary">
    <div className="text-center space-y-1">
      <h2 className="text-xl font-semibold text-green-700">
        Nearest Kiosk: {kioskName || 'Unknown'}
      </h2>
      <p className="text-muted-foreground">
        📍 Distance: {distance ? `${distance} km` : 'N/A'}
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
