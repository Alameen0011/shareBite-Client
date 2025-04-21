import { ConfirmationModal } from "@/components/Donation/ConfirmationModal";
import { useDonation, useSingleDonation } from "@/hooks/useDonation";
import { IsoToReadableFormat } from "@/utils/dateUtils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Donation = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();


      // ✅ Redirect to 404 if no ID is present
      useEffect(() => {
        if (!id) {
          toast.error("Invalid donation ID.");
          navigate("/404", { replace: true }); // optional: replace to prevent going back
        }
      }, [id, navigate]);


  const { data, isLoading, isError } = useSingleDonation(id as string);

  const { cancelDonation } = useDonation()
  const {mutateAsync} = cancelDonation

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [ isCancelling,setIsCancelling] = useState(false)


  const handleCancelDonation = async () => {
    try {
    setIsCancelling(true);
    const res = await mutateAsync(id as string); 
    if(res.success){
      toast.success("Donation cancelled successfully!");
      setShowCancelModal(false);
      navigate("/donor/dashboard")
    }

    } catch (error) {
      console.log(error)
      toast.error("Failed to cancel donation.");
    } finally {
      setIsCancelling(false);
    }

  }

  


  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <div>Donation not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-md p-6 md:flex md:items-center md:gap-8">
        <img
          src={data.donation.image}
          alt="Donation"
          className="w-full md:w-1/2 rounded-xl object-cover max-h-[300px]"
        />
        <div className="mt-4 md:mt-0 md:w-1/2 space-y-3">
          <h2 className="text-2xl font-bold text-gray-800">Donation Details</h2>
          <p>
            <span className="font-semibold">Type:</span> {data.donation.type}
          </p>
          <p>
            <span className="font-semibold">Quantity:</span> {data.donation.quantity}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {data.donation.status}
          </p>
          <p>
            <span className="font-semibold">OTP:</span> {data.donation.otp}
          </p>

          {data.donation.type !== "non-perishable" ? (
            <p>
              <span className="font-semibold">Expiry:</span>{" "}
              {data.donation.expiry ? IsoToReadableFormat(data.donation.expiry) : ""}
            </p>
          ) : (
            ""
          )}

          <p>
            <span className="font-semibold">Pickup Address:</span>{" "}
            {data.donation.pickupLocation.address}
          </p>
          <p>
            <span className="font-semibold">Donor Email:</span>{" "}
            {data.donation.donor.email}
          </p>
          {/* <p>
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(.createdAt).toLocaleString()}
          </p> */}

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => navigate(`/donor/donations/edit/${data.donation._id}`)}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Edit
            </button>
            <button
              onClick={() => setShowCancelModal(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
            >
              Cancel Donation
            </button>
          </div>
        </div>
      </div>
      <ConfirmationModal
        open={showCancelModal}
        title="Cancel Donation"
        description="Are you sure you want to cancel this donation? This action cannot be undone."
        onConfirm={handleCancelDonation}
        onClose={() => setShowCancelModal(false)}
        loading={isCancelling}
      />
    </div>
  );
};

export default Donation;
