import { RootState } from "@/app/store";
import { connectSocket } from "@/features/socket/socketSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const useSocketBoot = () => {
  const dispatch = useDispatch();
  const { accessToken , role } = useSelector((state: RootState) => state.auth);
  
  console.log("Socket Boot page rendered")
  useEffect(() => {
    if (accessToken && (role === "donor" || role === "volunteer" || role === "admin")) {
      console.log("🚀 Attempting to connect socket...");
      dispatch(connectSocket({ token: accessToken }));
    }
  }, [accessToken, dispatch,role]);
};

export default useSocketBoot;
