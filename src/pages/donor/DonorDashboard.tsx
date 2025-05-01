import { getSocket } from "@/api/socket";
import CommonError from "@/components/CommonError";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { useDonation } from "@/hooks/useDonation";
import { IsoToReadableFormat } from "@/utils/dateUtils";
import { PlusCircle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {motion} from "framer-motion"

// interface IncomeParams {
//   donationId: string,
//   volunteerId: string
// }

const DonorDashboard = () => {
  const { getDonations } = useDonation();

  const { data, isLoading, isError,refetch } = getDonations;
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


    
    const handleDonationPickedUp = () => {
      toast.success(" 🚀 Your donation has been successfully picked up")
    }

   const handleDonationDelivery = () => {
    toast.success(" 🚀 Your donation has been successfully delivered")
   }


   socket.on("donationPickedUp",handleDonationPickedUp)

   socket.on("donationDelivery",handleDonationDelivery)


   return () => {
 
    socket.off("donationPickedUp",handleDonationPickedUp);
    socket.off("donationDelivery",handleDonationDelivery);
  };

  },[])



  if (isLoading) return <Loading/>;
  if (isError) return <CommonError message="Error fetching donations.." retry={refetch} />

  return (
    <motion.div className="space-y-6 m-10 "
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight font-tertiary">My Donations</h1>
        <Button onClick={handleAddDonation} className="flex items-center gap-2 font-tertiary">
          <PlusCircle className="h-4 w-4" />
          <span>Donate</span>
        </Button>
      </div>
      {(data?.donations?.length ?? 0) > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 font-primary"
       
        >
          {data?.donations.map((donation) => (
        <div
        key={donation._id}
        onClick={() => handleViewDonation(donation._id)}
        className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer border border-gray-200 dark:border-gray-800"
      >
        <img
          src={donation.image}
          alt={donation.title}
          className="h-48 w-full object-cover"
        />
      
        <div className="p-5 space-y-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">{donation.title}</h3>
      
          <div className="flex items-center justify-between text-sm">
            <span className="px-2 py-1 rounded-full text-white bg-black dark:bg-green-600 text-xs">
            {donation.status.replace("_", " ")} 
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-xs">
              {IsoToReadableFormat(donation.createdAt)}
            </span>
          </div>
      
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
            {donation.pickupLocation.address}
          </p>
      
          <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-600 dark:text-gray-400">
            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              Qty: {donation.quantity}
            </span>
            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded capitalize">
              Type: {donation.type}
            </span>
            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              Donor : {donation.donor?.name}
            </span>
          </div>
      
          {donation.expiry && (
            <div className="text-xs text-red-500 mt-1 font-medium">
              Expires: {IsoToReadableFormat(donation.expiry)}
            </div>
          )}
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
    </motion.div>
  );
};

export default DonorDashboard;
