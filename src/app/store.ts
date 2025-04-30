import  { configureStore } from "@reduxjs/toolkit";
import  authReducer from "@/features/auth/authSlice";
import  socketReducer from "@/features/socket/socketSlice"


export const store = configureStore({
    reducer: {
        auth: authReducer,
        socket: socketReducer,
    },
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;