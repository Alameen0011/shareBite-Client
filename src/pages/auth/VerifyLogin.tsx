import { setAccessToken } from "@/features/auth/authSlice";
import { connectSocket } from "@/features/socket/socketSlice";
import { useAuth } from "@/hooks/useAuth";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const VerifyLogin = () => {
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const token = searchParams.get("token")
    console.log(searchParams, "search params");
    console.log(token, "token");

    const {verifyLoginMutation} = useAuth()
    const {mutateAsync: verifyLoginMutate } = verifyLoginMutation 

     useEffect(() => {
        if(!token){
            console.log("No token found in URL")
            return;
        }

        const handleLoginVerification = async () => {

            try {
                const res = await verifyLoginMutate(token);
                if (res?.success) {
                  const { token, role } = res
                  dispatch(setAccessToken({ token, role }));
                  dispatch(connectSocket({token}))
                  navigate("/");
                  toast(res?.message || "verified successfully");
              }
                
            } catch (error) {
                    const axiosError = error as AxiosError<{ message?: string }>;
                    const message = axiosError.response?.data?.message || axiosError.message ||"Something went wrong. Please try again.";
                    toast.error(message);
                    navigate("/auth/login")

            }
        }


        handleLoginVerification()
    },[token,verifyLoginMutate,dispatch,navigate])



  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
    <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
    <p className="text-lg font-semibold mt-2">Verifying your account...</p>
  </div>
  );
};

export default VerifyLogin;
