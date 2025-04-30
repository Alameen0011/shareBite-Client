
import { setAccessToken } from "@/features/auth/authSlice";
import { connectSocket } from "@/features/socket/socketSlice";
import { useAdmin } from "@/hooks/useAdmin";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";


const VerifyAdminLogin = () => {
  console.log("inside verify admin login")


    const [searchParams] = useSearchParams()
    console.log(searchParams,"sear params in verify Adminlogin page")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const token = searchParams.get("token")
    console.log(searchParams, "search params")
    console.log(token, "token");

    const {verifyLoginMutation} = useAdmin()
    const {mutateAsync } = verifyLoginMutation 

     useEffect(() => {
        if(!token){
            console.log("No token found in URL")
            return;
        }

        const handleLoginVerification = async () => {

            try {
                const res = await mutateAsync(token);
                console.log(res,"response after verification")
                if (res?.success) {
                  toast(res?.message || "verified successfully");
                  const { token, role } = res;
                  console.log("Got token from successfull Response", token, role)
                  dispatch(setAccessToken({ token, role }));
                  console.log("dispatcching to connect socket slice action")
                  dispatch(connectSocket({token}))
                  navigate("/admin");
              }
                
            } catch (error) {
              console.error("Verification failed", error);
              toast.error("Verification failed. please try again later")

            }
        }


        handleLoginVerification()
    },[token,mutateAsync,dispatch,navigate])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
    <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
    <p className="text-lg font-semibold mt-2">Verifying your account...</p>
  </div>
  )
}

export default VerifyAdminLogin