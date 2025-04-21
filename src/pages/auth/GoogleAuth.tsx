import { GoogleLogin } from '@react-oauth/google';
import axiosInstance from '@/api/axiosInstance';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '@/features/auth/authSlice';
import { toast } from 'sonner';

const GoogleAuth = () => {
    const dispatch = useDispatch()
   

    const handleGoogleLogin = async (credentialResponse) => {
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
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={(error) => console.log("Login Failed:", error)}
      />
    );
}

export default GoogleAuth