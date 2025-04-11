import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initializeSocket = (token: string) => {
  socket = io(import.meta.env.VITE_SOCKET_URL, {
    auth: { token },
    transports: ["websocket"],
  });
};

export const getSocket = () => socket;

export const disconnectionFromSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};