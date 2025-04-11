import { RootState } from "@/app/store";
import { connectSocket } from "@/features/socket/socketSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const useSocketBoot = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (accessToken) {
      console.log("Reconnecting socket with token:", accessToken);
      dispatch(connectSocket({ token: accessToken }));
    }
  }, [accessToken, dispatch]);
};

export default useSocketBoot;
