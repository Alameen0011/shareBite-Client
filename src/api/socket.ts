import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

// export const initializeSocket = (token: string) => {
//   socket = io(import.meta.env.VITE_SOCKET_URL, {
//     auth: { token },
//     transports: ["websocket"],
//   });
//   console.log("Socket client:",socket)
// };

export const initializeSocket = (token: string) => {
  if (socket && socket.connected) {
    console.log("⚠️ Socket already connected:", socket.id);
    return socket;
  }

  if (socket) {
    console.log("🔁 Cleaning up existing disconnected socket");
    socket.disconnect();
    socket = null;
  }

  socket = io(import.meta.env.VITE_SOCKET_URL, {
    auth: { token },
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket?.id);
  });

  socket.on("disconnect", (reason) => {
    console.log("❌ Socket disconnected:", reason);
  });

};

export const getSocket = () => socket;

export const disconnectionFromSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

