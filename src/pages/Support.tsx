import { getSocket } from "@/api/socket";
import { RootState } from "@/app/store";
import { useGetMessages, useMessage } from "@/hooks/useMessage";
import { getUserIdFromToken } from "@/utils/jwtDecode";
import {  Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { VideoIcon } from "lucide-react";
import {motion} from "framer-motion"

interface Message {
  senderId: string;
  receiverId: string;
  text: string;
  read?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const SupportChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const AdminId = "67ff4e383822a164d3d0e300";
  const { data: chatHistory } = useGetMessages(AdminId);
  const { sendMessage } = useMessage();
  const { mutateAsync } = sendMessage;

  const { accessToken,role } = useSelector((state: RootState) => state.auth);
  const userId = getUserIdFromToken(accessToken!);
  const roomID = `support-${userId}`;
 

  const handleVideoCall = () => {
    const videoURL = `${window.location.origin}/video-room/${roomID}`;
    window.open(videoURL, "_blank");

  
    const socket = getSocket(); 
    console.log(socket,"Sockeet on vedio call instatioann")
    if (socket && socket.connected) {
      socket.emit("call_Request", {
        from: userId,
        roomID,
        role,
      });
    }
  };

  useEffect(() => {
    // Fetch chat history
    if (chatHistory) {
      setMessages(chatHistory.messages);
    }
  }, [chatHistory, userId]);

  useEffect(() => {
    const socket = getSocket(); // Singleton socket
    if (!socket) return;

    const handleDecline = ({ message }: { message: string }) => {
      toast.error(`Admin declined, ${message}.`);
    };

    socket.on("call_declined", handleDecline);

    return () => {
      socket.off("call_declined", handleDecline); 
    };
  }, []);


  useEffect(() => {
    const socket = getSocket(); // Singleton socket
    if (!socket) return;

    socket.on("newMessage", (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });

    return () => {
      socket.off("newMessage"); // cleanup on unmount
    };
  }, []);

  const handleMessage = async () => {
    if (input.trim()) {
      const data = { id: AdminId, text: input };
      const res = await mutateAsync(data);

      if (res.success) {
        toast.success("Message sent successfully");
        // Optionally add to local state (optimistic UI)
        setMessages((prevMessages) => [...prevMessages, res.newMessage]);
        setInput("");
      }
    }
  };

  return (
    <motion.div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row h-[700px] m-10 font-primary"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}>
      {/* Left Info Panel */}
      <div className="w-full md:w-1/3 bg-gradient-to-br from-blue-100 to-purple-100 p-6 flex flex-col justify-center items-center text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/9068/9068672.png"
          alt="Support Icon"
          className="w-20 h-20 mb-4"
        />
        <h2 className="text-xl font-bold text-blue-800 mb-2">Contact Admin</h2>
        <p className="text-gray-700 text-sm">
          Got a question or issue with a donation? Reach out and we’ll get it
          resolved as soon as we can.
        </p>
      </div>

      {/* Right Chat Panel */}
      <div className="w-full md:w-2/3 p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-purple-700">Live Chat</h3>

          <button
            onClick={handleVideoCall}
            className="text-purple-700 hover:text-purple-900 transition"
            title="Start Video Call"
          >
            <VideoIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 font-tertiary">
          {(messages?.length ?? 0) > 0 ? (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[70%] px-4 py-2 rounded-lg text-sm ${
                  msg.senderId === userId
                    ? "bg-blue-100 self-end text-right ml-auto"
                    : "bg-purple-100 self-start text-left mr-auto"
                }`}
              >
                {msg.text}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-6 border rounded-lg bg-muted/10 shadow-md space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800">Any queries 👀? start messaging</h3>
            <p className="text-sm text-muted-foreground">You haven't received any messages yet. Stay tuned!</p>
          </div>
          )}
        </div>

        {/* Input */}
        <div className="mt-4 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-purple-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={handleMessage}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-r"
          >
            <Send />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SupportChat;
