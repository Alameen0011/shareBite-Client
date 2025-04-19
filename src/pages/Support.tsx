import { getSocket } from '@/api/socket';
import { useGetMessages, useMessage } from '@/hooks/useMessage';
import { Send } from 'lucide-react';
import { useEffect, useState } from "react";
import { toast } from 'sonner';


interface Message {
  senderId: string
  receiverId: string;
  text: string;
  read?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}


  
  const SupportChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");

    const AdminId = "67ff4e383822a164d3d0e300"

    const {data:chatHistory,isLoading,isError} = useGetMessages(AdminId)

    const {sendMessage} = useMessage()

    const { mutateAsync } = sendMessage

    useEffect(() => { 
      //Fetch chat history 
      if(chatHistory){
        console.log(chatHistory,"chat history will []")
        setMessages(chatHistory)
      }

    },[chatHistory])

    useEffect(() => {
      const socket = getSocket(); // your singleton getter
      if (!socket) return;
    
      socket.on("newMessage", (newMsg) => {
        setMessages((prev) => [...prev, newMsg]);
      });
    
      return () => {
        socket.off("newMessage"); // cleanup
      };
    }, []);
  
    const handleMessage = async () => {
      if (input.trim()) {
        const data = {id:AdminId, text: input}

        console.log(data,"data sending to server")
        const res = await mutateAsync(data)
        if(res.success){
          toast.success("message sended successfully")
        }


  
        // Optionally add to local state (optimistic UI)
        setMessages((prevMessages) => [...prevMessages, ]);
        setInput('');
      }
    };
  
    return (
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row h-[700px] m-10">
        {/* Left Info Panel */}
        <div className="w-full md:w-1/3 bg-gradient-to-br from-blue-100 to-purple-100 p-6 flex flex-col justify-center items-center text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9068/9068672.png"
            alt="Support Icon"
            className="w-20 h-20 mb-4"
          />
          <h2 className="text-xl font-bold text-blue-800 mb-2">Contact Admin</h2>
          <p className="text-gray-700 text-sm">
            Got a question or issue with a donation? Reach out and we’ll get it resolved as soon as we can.
          </p>
        </div>
      
        {/* Right Chat Panel */}
        <div className="w-full md:w-2/3 p-6 flex flex-col h-full">
          <h3 className="text-lg font-semibold text-purple-700 mb-4">Live Chat</h3>
      
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[70%] px-4 py-2 rounded-lg text-sm ${
                  msg.senderId === "me"
                    ? "bg-blue-100 self-end text-right ml-auto"
                    : "bg-purple-100 self-start text-left mr-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
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
             <Send  />
            </button>
          </div>
        </div>
      </div>
      
    );
  };
  
  export default SupportChat;