import { setAccessToken } from "@/features/auth/authSlice";
import { useAuth } from "@/hooks/useAuth";
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
                console.log(res,"response after verification")
                if (res?.success) {
                  toast(res?.message || "verified successfully");
                  const { token, role } = res;
                  dispatch(setAccessToken({ token, role }));
                  navigate("/donor/dashboard");
              }
                
            } catch (error) {
              console.error("Verification failed", error);
              toast.error("Verification failed. please try again later")

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
