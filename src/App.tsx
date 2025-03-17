import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRoutes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "@/api/axiosInstance";
import { setAccessToken } from "@/features/auth/authSlice";
import type { AppDispatch } from "@/app/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let isMounted = true; 

    const refreshAccessToken = async () => {
      try {
        const { data } = await axiosInstance.get("/auth/refresh");
        if (isMounted) {
          dispatch(setAccessToken(data.accessToken));
        }
      } catch (error) {
        console.error("Session restore failed", error);
      }
    };

    refreshAccessToken();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
