import LeafletMap from "@/components/Map/LeafletMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDonation } from "@/hooks/useDonation";
import { handleDonationUpload } from "@/utils/ImageUploadHelper";
import { donationSchema } from "@/validations/donation/addDonation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as z from "zod";
import { ControlledSelect } from "@/components/Donation/ControlledSelect";
import { AxiosError } from "axios";
import CommonError from "@/components/CommonError";

type FormData = z.infer<typeof donationSchema>;

const AddDonation = () => {
  {  /*React Query hooks */}
  const { createDonation } = useDonation();
  const { mutateAsync, isPending, isError } = createDonation;

  {   /*React Hook form */}
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(donationSchema),
    defaultValues: donationSchema.parse({}),
  });

  { /*States to manage image preview and map */}
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUploadLoading, setImageUploadLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  {   /* create donation */}
  const onSubmit = async (data: FormData) => {
    try {
      const res = await mutateAsync(data);
      if (res?.success) {
        toast("donated successfully");
        navigate("/donor/dashboard");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message = axiosError.response?.data?.message || axiosError.message ||"Something went wrong. Please try again.";
      toast.error(message);
    }
  };



  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploadLoading(true);

    try {
      // Upload to Cloudinary
      const imgUrl = await handleDonationUpload(file);
      setImagePreview(imgUrl);
      setValue("image", imgUrl);
      toast.success("image uploaded successfully");
      setImageUploadLoading(false);
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Failed to upload image.");
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue("image", ""); 
  };

  if (isError) return <CommonError message="Error Creating donation.."  />

  return (
    <motion.div
      className="space-y-6 m-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="max-w-3xl mx-auto rounded-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8 font-primary">
            Add Donation
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 font-primary">
              {/* Title */}
              <motion.div
                className="flex flex-col space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Label>Food Name</Label>
                <Input
                  type="text"
                  {...register("title")}
                  placeholder="eg: Chicken biriyani"
                  className="w-full"
                />
                {errors.title && (
                  <p className="text-red-600 text-sm">{errors.title.message}</p>
                )}
              </motion.div>

              {/* Donation Type */}

              <ControlledSelect
                name="type"
                control={control}
                label="Donation Type"
                placeholder="Select donation type"
                errors={errors}
                options={[
                  { value: "perishable", label: "Perishable" },
                  { value: "non-perishable", label: "Non-Perishable" },
                  { value: "cooked", label: "Cooked" },
                ]}
              />

              {/* Quantity */}
              <motion.div
                className="flex flex-col space-y-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Label>Quantity</Label>
                <Input
                  type="number"
                  {...register("quantity", { valueAsNumber: true })}
                  className="w-full"
                />
                {errors.quantity && (
                  <p className="text-red-600 text-sm">
                    {errors.quantity.message}
                  </p>
                )}
              </motion.div>

              {/* Expiry Date (only for perishable and cooked) */}
              {watch("type") !== "non-perishable" && (
                <>
                  <motion.div
                    className="flex flex-col space-y-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    <Label>Expiry Date</Label>
                    <Input
                      type="date"
                      {...register("expiry", { valueAsDate: true })}
                    />
                  </motion.div>
                </>
              )}

              {/* Pickup Location */}
              <motion.div
                className="flex flex-col space-y-1 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <Label className="block text-sm font-medium">
                  Pickup Location
                </Label>
                <Button
                  type="button"
                  onClick={() => setIsMapOpen(true)}
                  className="bg-green-500 text-white px-4 py-2 rounded font-tertiary"
                >
                  Select Location on Map
                </Button>
                <Controller
                  control={control}
                  name="pickupLocation"
                  render={({ field }) =>
                    field?.value?.address ? (
                      <p>{field?.value?.address}</p>
                    ) : (
                      <p className="text-gray-500 italic">
                        Click the button to choose a location
                      </p>
                    )
                  }
                />
                {errors.pickupLocation && (
                  <p className="text-red-500 text-sm">
                    {errors.pickupLocation.address?.message}
                  </p>
                )}
              </motion.div>

              {/* Image Upload */}
              <motion.div
                className="flex flex-col space-y-1 col-span-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <Label>Upload image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />

                {/*uploading shimmer that says loadign */}
                {imageUploadLoading && (
                  <div className="relative w-32 h-32 mt-2">
                    {/* Shimmer effect */}
                    <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-lg border shadow"></div>
                  </div>
                )}

                {/* Show preview if image is selected */}
                {imagePreview && (
                  <div className="relative w-32 h-32 mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg border shadow"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute top-1 right-1 bg-red-600 text-white text-xs p-1 rounded-full"
                    >
                      ✕
                    </button>
                  </div>
                )}
                {errors.image && (
                  <p className="text-red-500">{errors.image.message}</p>
                )}
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <Button
                type="submit"
                disabled={isPending}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-tertiary"
              >
                {isPending ? "Submitting..." : "Donate"}
              </Button>
            </motion.div>
          </form>

          {/* Map Modal */}
          {isMapOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg">
                <LeafletMap
                  onLocationSelect={(location) => {
                    setValue(
                      "pickupLocation",
                      location as {
                        type: "Point";
                        coordinates: number[];
                        address: string;
                      },
                      { shouldValidate: true }
                    );
                    setIsMapOpen(false);
                  }}
                />
                <button
                  onClick={() => setIsMapOpen(false)}
                  className="mt-2 bg-red-500 text-white px-4 py-2"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddDonation;
