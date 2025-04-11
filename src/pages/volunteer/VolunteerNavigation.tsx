import { Button } from "@/components/ui/button";
import VolunteerRouteMap from "@/components/Volunteer/VolunteerRouteMap";
import {  Check } from "lucide-react";
import { useLocation, useNavigate, } from "react-router-dom";



const VolunteerNavigation = () => {
    const location = useLocation();
    const navigate = useNavigate()
    console.log(location,"location object we get on navigation claim")
    const { coordinates, id } = location.state || {};
  
  console.log(coordinates,"corrdinates + id for status change need ",id)

   
      //we have to pass pickup location of claimed donation
      //otp verification system and after that pickedUP status change

      const handlePickup = (): void => {
        console.log("clicked pickup")
        navigate(`/volunteer/verifyOtp/${id}`)

      }
    
    return (
      <div className="space-y-6 m-10 flex flex-col mx-auto items-center">
        <VolunteerRouteMap pickupLocation = {coordinates}/>
        <Button onClick={handlePickup} className="w-full md:w-full lg:w-full xl:w-[300px] px-6 py-2 text-base" variant="default">
          picked Up
          <Check strokeWidth={3} className="ml-3 h-4 w-4" />
        </Button>
      </div>
    );
}

export default VolunteerNavigation