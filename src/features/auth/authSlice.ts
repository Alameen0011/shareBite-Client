import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  role: string | null;
}

const storedAuth = localStorage.getItem("auth");
const initialState: AuthState = storedAuth
  ? JSON.parse(storedAuth)
  : {
      accessToken: null,
      isAuthenticated: false,
      role: null,
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state,action: PayloadAction<{ token: string; role: string }>) => {
      state.accessToken = action.payload.token;
      state.role = action.payload.role;
      state.isAuthenticated = true;
     // Store updated state in localStorage
      localStorage.setItem("auth", JSON.stringify(state));
    },
    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.role = null;

      // Clear localStorage
      localStorage.removeItem("auth");
      localStorage.clear()
    },
  },
});



export const { setAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;
