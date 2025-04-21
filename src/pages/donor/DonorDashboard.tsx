import { getSocket } from "@/api/socket";
import { Button } from "@/components/ui/button";
import { useDonation } from "@/hooks/useDonation";
import { IsoToReadableFormat } from "@/utils/dateUtils";
import { PlusCircle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface IncomeParams {
  donationId: string,
  volunteerId: string
}

const DonorDashboard = () => {
  const { getDonations } = useDonation();

  const { data, isLoading, error } = getDonations;
  const navigate = useNavigate();

  const handleAddDonation = (): void => {
    navigate("/donor/add-donation");
  };


  const handleViewDonation = (id: string): void => {
    console.log("single donation id ::", id);
    navigate(`/donor/donation/${id}`);
  };

  useEffect(() => {
        const socket = getSocket();
        if (!socket) return;


    
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


   socket.on("donationPickedUp",handleDonationPickedUp) //test needed

   socket.on("donationDelivery",handleDonationDelivery)//test needed


   return () => {
 
    socket.off("donationPickedUp",handleDonationPickedUp);
    socket.off("donationDelivery",handleDonationDelivery);
  };

  },[])



  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="space-y-6 m-10 ">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">My Donations</h1>
        <Button onClick={handleAddDonation} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          <span>Donate</span>
        </Button>
      </div>
      {(data?.donations?.length ?? 0) > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6">
          {data?.donations.map((donation) => (
            <div
              key={donation._id}
              onClick={() => handleViewDonation(donation._id)}
              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img
                  className="p-8 rounded-t-lg"
                  src={donation.image || donation.status}
                  alt="product image"
                />
              </a>
              <div className="px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {donation.title}
                  </h5>
                </a>
                <div className="flex items-center mt-2.5 mb-5">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  status:  {donation.status}
                  </span>

                 
                </div>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {donation.pickupLocation.address}
                  </h5>
                
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {donation.expiry? IsoToReadableFormat(donation.expiry) : "" }
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg bg-muted/30">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">No donations yet</h3>
            <p className="text-muted-foreground mb-6">
              You haven't made any donations yet. Click the Donate button to get
              started.
            </p>
            <Button
              onClick={() => navigate("/donor/add-donation")}
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Make Your First Donation</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;
