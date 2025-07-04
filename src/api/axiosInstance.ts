import axios from "axios";
import { store } from "@/app/store";
import { setAccessToken, logout } from "@/features/auth/authSlice";


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL, //backend api hitting url
    withCredentials: true,
})




axiosInstance.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.accessToken
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config; //check here some issue might occur with return before or after
    },
    (error) => Promise.reject(error)
    
);


axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if(error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            try {
                //Try refreshing the access token
                const { data } = await axiosInstance.get("/user/refresh"); // returns a new access token
                const {token,role}  = data
                store.dispatch(setAccessToken({token,role}));// update memmory


                //Retry the failed request with new token
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return axiosInstance(originalRequest);

            } catch (refreshError) {
                store.dispatch(logout()) // if refresh fails , log out the user
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
)

export default axiosInstance;