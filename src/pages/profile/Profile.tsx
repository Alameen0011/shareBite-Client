import CommonError from "@/components/CommonError";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfile } from "@/hooks/useProfile";
import { profileSchema } from "@/validations/Profile/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";


type FormData = z.infer<typeof profileSchema>;

const Profile = () => {
  const { updateProfile, getProfile } = useProfile();

  const { mutateAsync, isPending } = updateProfile;
  const { data, isLoading, isError: Error,refetch } = getProfile;

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(profileSchema) });

  const handleUpdateProfile = async (data: FormData) => {
    try {
      const res = await mutateAsync(data);

      if (res.success) {
        toast.success("profile updated successfully");
        navigate("/")

      }
    } catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>;
            const message = axiosError.response?.data?.message || axiosError.message || "Something went wrong. Please try again.";
            toast.error(message);
    }
  };

  useEffect(() => {
    if (data?.user) {
      reset({
        name: data.user.name || "",
        phone: data.user.phone || "",
        address: data.user.address || "",
      });
    }
  }, [data, reset]);

  if (isLoading) return <Loading/>;
  if (Error)return <CommonError message="Error fetching profile" retry={refetch}/>
  

  return (
    <motion.div className=" p-6 space-y-6 m-10"
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
      transition={{ duration: 0.6 }}
    >
    

      <Card className="w-full  max-w-2xl bg-gray-50 mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold font-primary">
            Profile
          </CardTitle>
          <CardDescription className="font-primary">
            Update your personal information
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(handleUpdateProfile)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  className="font-primary text-sm "
                  {...register("name")}
                  placeholder="Enter your first name"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  type="tel"
                  placeholder="Enter your phone number"
                  className="font-primary text-sm "
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  {...register("address")}
                  className="font-primary text-sm "
                  placeholder="Enter your address here"
                />
                {errors.address && (
                  <p className="text-sm text-red-500">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full sm:w-auto mt-4"
              disabled={isPending}
            >
          
              {isPending ? "Saving..." : "Save Changes"}

            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
};

export default Profile;
