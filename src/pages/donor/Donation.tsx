import { ConfirmationModal } from "@/components/Donation/ConfirmationModal";
import { useDonation, useSingleDonation } from "@/hooks/useDonation";
import { IsoToReadableFormat } from "@/utils/dateUtils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { CalendarDays, Timer, PackageCheck, Mail, MapPin } from "lucide-react";
import { AxiosError } from "axios";
import Loading from "@/components/Loading";
import CommonError from "@/components/CommonError";

const Donation = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      toast.error("Invalid donation ID.");
      navigate("/404", { replace: true });
    }
  }, [id, navigate]);

  const { data, isLoading, isError, refetch } = useSingleDonation(id as string);

  const { cancelDonation } = useDonation();
  const { mutateAsync } = cancelDonation;

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelDonation = async () => {
    try {
      setIsCancelling(true);
      const res = await mutateAsync(id as string);
      if (res.success) {
        toast.success("Donation cancelled successfully!");
        setShowCancelModal(false);
        navigate("/donor/dashboard");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setIsCancelling(false);
    }
  };

  if (isLoading) return <Loading />;
  if (isError || !data)
    return (
      <CommonError message="Error fetching your donation.." retry={refetch} />
    );

  const { donation } = data;

  return (
    <motion.div
      className="max-w-5xl mx-auto px-4 py-8 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="text-center font-teritiary">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          🍱 Donation Details
        </h1>
        <p className="text-gray-500 font-primary">
          View and manage your donation
        </p>
      </div>

      {/* Image */}
      <div className="w-full h-64 md:h-80 overflow-hidden rounded-2xl shadow ">
        <img
          src={donation.image}
          alt="Donation Preview"
          className="w-full h-full object-contain "
        />
      </div>

      {/* Info */}
      <div className="bg-white shadow rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 font-primary">
        {/* Type and Quantity Section */}
        <div className="flex items-center gap-2">
          <PackageCheck className="w-5 h-5" /> <strong>Type:</strong>{" "}
          {donation.type}
        </div>
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5" /> <strong>Quantity:</strong>{" "}
          {donation.quantity}
        </div>

        {/* Conditionally Render Volunteer Data */}
        {donation.volunteer?.name && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5" /> <strong>Volunteer name:</strong>{" "}
              {donation.volunteer?.name}
            </div>
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5" /> <strong>Volunteer email:</strong>{" "}
              {donation.volunteer?.email}
            </div>
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5" /> <strong>Volunteer phone:</strong>{" "}
              {donation.volunteer?.phone}
            </div>
          </div>
        )}

        {/* Donation Status */}
        <div className="flex items-center gap-2">
          <PackageCheck className="w-5 h-5" /> <strong>Status:</strong>{" "}
          {donation.status.replaceAll("_", " ")}
        </div>

        {/* Expiry Date for Non-Perishable Donations */}
        {donation.type !== "non-perishable" && donation.expiry && (
          <div className="flex items-center gap-2 col-span-1 md:col-span-2">
            <CalendarDays className="w-5 h-5" /> <strong>Expiry:</strong>{" "}
            {IsoToReadableFormat(donation.expiry)}
          </div>
        )}

        {/* Pickup Location */}
        <div className="flex items-center gap-2 col-span-1 md:col-span-2">
          <MapPin className="w-5 h-5" /> <strong>Pickup Location:</strong>{" "}
          {donation.pickupLocation.address}
        </div>

        {/* Conditionally Render Kiosk Data */}
        {donation.kiosk?.name && (
          <div className="flex items-center gap-2 col-span-1 md:col-span-2">
            <Mail className="w-5 h-5" /> <strong>Kiosk:</strong>{" "}
            {donation.kiosk?.name}
          </div>
        )}

        {/* Donor Email */}
        <div className="flex items-center gap-2 col-span-1 md:col-span-2">
          <Mail className="w-5 h-5" /> <strong>Donor Email:</strong>{" "}
          {donation.donor?.email}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mt-4 font-tertiary">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(`/donor/donations/edit/${donation._id}`)}
          className="bg-black hover:bg-black text-white px-5 py-2 rounded-xl font-medium transition"
        >
          Edit Donation
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCancelModal(true)}
          className="bg-red-400 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-medium transition"
        >
          Cancel Donation
        </motion.button>
      </div>

      {/* Modal */}
      <ConfirmationModal
        open={showCancelModal}
        title="Cancel Donation"
        description="Are you sure you want to cancel this donation? This action cannot be undone."
        onConfirm={handleCancelDonation}
        onClose={() => setShowCancelModal(false)}
        loading={isCancelling}
      />
    </motion.div>
  );
};

export default Donation;
