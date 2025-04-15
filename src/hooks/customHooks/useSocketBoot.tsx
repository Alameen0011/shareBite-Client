import { RootState } from "@/app/store";
import { connectSocket } from "@/features/socket/socketSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const useSocketBoot = () => {
  const dispatch = useDispatch();
  const { accessToken , role } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (accessToken && (role === "donor" || role === "volunteer")) {
      dispatch(connectSocket({ token: accessToken }));
    }
  }, [accessToken, dispatch,role]);
};

export default useSocketBoot;
