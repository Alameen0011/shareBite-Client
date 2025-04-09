import { ControlledSelect } from "@/components/Donation/ControlledSelect";
import LeafletMap from "@/components/Map/LeafletMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDonation, useSingleDonation } from "@/hooks/useDonation";
import { IsoToNormalDate } from "@/utils/dateUtils";
import { handleDonationUpload } from "@/utils/ImageUploadHelper";
import { updateDonationSchema } from "@/validations/donation/addDonation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { AxiosError } from "axios";

type UpdateDonationFormData = z.infer<typeof updateDonationSchema>

const EditDonation = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();


      //Redirect to 404 if no ID is present
      useEffect(() => {
        if (!id) {
          toast.error("Invalid donation ID.");
          navigate("/404", { replace: true }); 
        }
      }, [id, navigate]);


  const { updateDonation } = useDonation();
  const { data: donation } = useSingleDonation(id as string);
  const { mutateAsync } = updateDonation;

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpdateDonationFormData>({
    resolver: zodResolver(updateDonationSchema),
    defaultValues: {},
  });


  useEffect(() => {
    if (!donation || !donation.donation) return;
  
    const { type, quantity, expiry: expiryDate, pickupLocation, image } = donation.donation;
  
    // Create a strongly typed object for form reset
    const derived: Partial<UpdateDonationFormData> = {
      type,
      quantity,
      pickupLocation,
      image,
    };
  
    // Conditionally add expiry
    if (type !== "non-perishable" && expiryDate) {
      derived.expiry = IsoToNormalDate(expiryDate);
    }
  
    reset(derived);
    setImagePreview(image || "");
  }, [donation, reset]);
  

  const handleDonationUpdation = async (data: UpdateDonationFormData) => {
    if (!id) {
      toast.error("Invalid donation ID");
      return;
    }
    try {
      const res = await mutateAsync({ data, id });
      console.log(res);
      if (res?.success) {
        toast("Donation updated successfully");
        navigate("/donor/dashboard")
        
      } else {
        toast.error(res?.message || "updation failed. please try again later");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
    
      const message =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Something went wrong. Please try again.";
    
      console.error("Error updating donation:", message);
      toast.error(message);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview before uploading
    const localUrl = URL.createObjectURL(file);
    setImagePreview(localUrl);

    try {
      // Upload to Cloudinary
      const imgUrl = await handleDonationUpload(file);
      setValue("image", imgUrl);
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Failed to upload image.");
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue("image", ""); // Clear from form
  };

  const form = watch();
  console.log(form);

  return (
    <div className="space-y-6 m-10">
      <div className="max-w-3xl mx-auto rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            update Donation
          </h2>
          <form
            onSubmit={handleSubmit(handleDonationUpdation)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
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
              <div className="flex flex-col space-y-3">
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
              </div>

              {/* Expiry Date (only for perishable and cooked) */}
              {watch("type") !== "non-perishable" && (
                <>
                  <div className="flex flex-col space-y-1">
                    <Label>Expiry Date</Label>
                    <Input
                      type="date"
                      {...register("expiry", { valueAsDate: true })}
                    />
                  </div>
                </>
              )}

              {/* Pickup Location */}
              <div className="flex flex-col space-y-1 mb-4">
                <Label className="block text-sm font-medium">
                  Pickup Location
                </Label>
                <Button
                  type="button"
                  onClick={() => setIsMapOpen(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
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
              </div>

              {/* Image Upload */}
              <div className="flex flex-col space-y-1 col-span-2">
                <Label>Upload image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
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
              </div>
            </div>
            {/* Submit Button */}
            <div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isSubmitting ? "Submitting..." : "Donate"}
              </Button>
            </div>
          </form>
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
      </div>
    </div>
  );
};

export default EditDonation;
