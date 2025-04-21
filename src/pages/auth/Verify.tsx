import { useEffect } from "react";
import { setAccessToken } from "@/features/auth/authSlice";
import { useAuth } from "@/hooks/useAuth";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { FC } from "react";
import { connectSocket } from "@/features/socket/socketSlice";

const Verify: FC = () => {
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const navigate = useNavigate() 

    const token = searchParams.get("token");
    console.log(searchParams, "search params");
    console.log(token, "token");

    const { verifyRegisterMutation } = useAuth();
    const { mutateAsync: verifyRegisterMutate } = verifyRegisterMutation;

    useEffect(() => {
        if (!token) {
            console.log("No token found in URL");
            return;
        }

        const handleRegisterVerification = async () => {
            try {
                const res = await verifyRegisterMutate(token);
                if (res?.success) {
                    toast(res?.message || "verified successfully");
                    const { token, role } = res;
                    dispatch(setAccessToken({ token, role }));
                    dispatch(connectSocket({token}))
                    navigate("/");
                }
            } catch (error) {
                console.error("Verification failed", error);
                toast.error("Verification failed. please try again later")
            }
        };

        handleRegisterVerification();
    }, [token, verifyRegisterMutate, dispatch, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
        <p className="text-lg font-semibold mt-2">Verifying your account...</p>
      </div>
    );
};

export default Verify;
