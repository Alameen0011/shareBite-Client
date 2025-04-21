import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { registerSchema } from "@/validations/auth/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { Utensils } from "lucide-react";
import { useForm } from "react-hook-form";
import {  useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { FC } from "react";
import axiosInstance from "@/api/axiosInstance";
import { setAccessToken } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import GoogleAuthButton from "./GoogleAuthButton";
import GoogleAuth from "./GoogleAuth";


type FormData = z.infer<typeof registerSchema>;

const Signup: FC = () => {
  const dispatch = useDispatch()
  // const navigate = useNavigate()

  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "donor";

  const { registerMutation } = useAuth();
  const { mutateAsync: RegisterMutate, isPending } = registerMutation;
  //  const {mutateAsync: googleAuthMutate,isPending:pending} = googleAuthMutation

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(registerSchema) });

  const handleUserRegistration = async (data: FormData) => {
    try {
      const UserData = { ...data, role };

      const res = await RegisterMutate(UserData);
      if (res?.success) {
        toast.success(res?.message || "Please check your email");
      } else {
        toast.error(res?.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

 
   

  const handleGoogleLogin = async (credentialResponse) => {

    console.log(credentialResponse)

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

    console.log(clientId,"Client IDDD")


    try {
      const response = await axiosInstance.post("/user/google-auth", {
        credential: credentialResponse.credential,
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID
      });

      //Handle needed setting accesstoken and role in state
      console.log("BAckend Response :", response.data);
      const { token, role } = response.data;
      console.log("Got token from successfull Response", token, role);
      dispatch(setAccessToken({ token, role }));
    } catch (error) {
      console.error("Error sending credential to backend:", error);
      toast.error("Error while Google login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 flex flex-col items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-neutral-200/50 bg-[size:20px_20px] pointer-events-none" />

      <div className="relative w-full max-w-sm mx-auto">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-emerald-600 rounded-2xl p-3 mb-4">
            <Utensils className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900">
            Welcome Back to ShareBite
          </h1>
          <p className="text-neutral-500 mt-2">Sign up to continue sharing</p>
        </div>

        {/* Login Card */}
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <div className="text-sm text-neutral-500">
              Enter your email to receive a magic link
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(handleUserRegistration)}>
              <div className="space-y-2">
                <Input
                  // type="email"
                  {...register("email")}
                  placeholder="name@example.com"
                  className="w-full"
                />
                <div className="min-h-[10px]">
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-emerald-600"
                >
                  Send Magic Link
                </Button>
              </div>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-neutral-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-neutral-500">
                  Or continue with
                </span>
              </div>
            </div>

            <GoogleAuth/>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
