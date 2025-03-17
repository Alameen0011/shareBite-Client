import {createSlice ,PayloadAction } from "@reduxjs/toolkit"



interface AuthState {
    accessToken: string | null;
    isAuthenticated: boolean;
    role: string | null
}


const initialState: AuthState = {
    accessToken: null,
    isAuthenticated: false,
    role: null
}


const authSlice = createSlice ({
    name: "auth",
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<{token: string; role: string }>) => {
            state.accessToken = action.payload.token;
            state.role = action.payload.role;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.accessToken = null;
            state.isAuthenticated = false;
            state.role = null;
        }
    }

})

console.log(authSlice, ": Authslice--")

export const { setAccessToken , logout } = authSlice.actions;
export default authSlice.reducer