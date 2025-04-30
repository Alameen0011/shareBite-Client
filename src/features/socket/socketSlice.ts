import { initializeSocket, disconnectionFromSocket } from "@/api/socket";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

interface SocketState {
  socket: Socket | null;
}

const initialState: SocketState = {
  socket: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    connectSocket: (state, action: PayloadAction<{ token: string }>) => {
        initializeSocket(action.payload.token)

    },
    disconnectSocket: () => {
        disconnectionFromSocket()
    },
  },
});

export const { connectSocket, disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;