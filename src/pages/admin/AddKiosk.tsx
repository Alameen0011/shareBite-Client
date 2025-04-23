import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import LeafletMap from "@/components/Map/LeafletMap";
import { useAdmin } from "@/hooks/useAdmin";
import { kioskSchema } from "@/validations/kiosk/addKiosk";


type Kiosk = z.infer<typeof kioskSchema>;

const AddKiosk = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  const { addKiosk } = useAdmin();
  const { mutateAsync, isPending: isSubmitting } = addKiosk;

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Kiosk>({
    resolver: zodResolver(kioskSchema), // ✅ validation with Zod
    defaultValues: {
      name: "", // ✅ safe default for required .min(1)
      location: {
        type: "Point",
        coordinates: [0, 0],
        address: "Unknown Address",
      },
    },
  });



  const handleKioskAdd = async (data: Kiosk) => {
    try {
      const res = await mutateAsync(data);
      if (res.success) {
        toast.success("added successfully");
        navigate("/admin/kiosk/management")
        
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="p-6 shadow rounded-2xl bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold mx-auto">Add Kiosk</CardTitle>
          <p className="text-sm text-muted-foreground mx-auto">
            Fill in the kiosk details to add a new location.
          </p>
        </CardHeader>

        <CardContent className="max-w-2xl ml-10 mr-10">
          <form onSubmit={handleSubmit(handleKioskAdd)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-6">
              {/* Kiosk Name */}
              <div>
                <Label htmlFor="name">Kiosk Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="KioskA"
                  {...register("name")}
                  className="mt-2"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Location Picker */}
              <div>
                <Label>Location</Label>
                <div className="mt-1 space-y-2">
                  <Button
                    type="button"
                    onClick={() => setIsMapOpen(true)}
                    className="w-full mt-2"
                  >
                    Select Location on Map
                  </Button>

                  <Controller
                    control={control}
                    name="location"
                    render={({ field }) =>
                      field?.value?.address ? (
                        <p className="text-sm font-medium">
                          📍 {field.value.address}
                        </p>
                      ) : (
                        <p className="text-sm italic text-gray-500">
                          No location selected.
                        </p>
                      )
                    }
                  />

                  {errors.location && (
                    <p className="text-red-500 text-sm">
                      {errors.location.address?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <Button type="submit" disabled={isSubmitting} className="w-full xl:w-[350px]">
                {isSubmitting ? "Submitting..." : "Add Kiosk"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      {isMapOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <LeafletMap
              onLocationSelect={(location) => {
                setValue(
                  "location",
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
  );
};

export default AddKiosk;
