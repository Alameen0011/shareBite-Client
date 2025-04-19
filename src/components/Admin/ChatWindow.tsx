import { useState, useEffect, useId } from 'react';
import { toast } from 'sonner';

interface ChatWindowProps {
  userId: string;
}

interface Message {
  senderId: string;
  text: string;
}

export const ChatWindow = ({ userId }: ChatWindowProps) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const {data: chatHistory } = useGetMessages(userId)
  const  {sendMessage} = useMessage()

  const { mutateAsync } = sendMessage

  useEffect(() => {
    if(chatHistory){
      setMessages(chatHistory)
    }



  },[chatHistory])

  useEffect(() => {
    const socket = getSocket();
    if(!socket) return;

    socket.on("newMessage", (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });
  
    return () => {
      socket.off("newMessage"); // cleanup
    };

  },[])

  

  const handleSendMessage = async () => {
    if (input.trim()) {
      const data = {id:userId, text: input}

      console.log(data,"data sending to server")
      const res = await mutateAsync(data)
      if(res.success){
        toast.success("message sended successfully")
      }



      // Optionally add to local state (optimistic UI)
      setMessages((prevMessages) => [...prevMessages, { senderId:userId, text: input } ]);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between py-2 border-b">
        <h3 className="text-xl font-semibold">Chat with User {userId}</h3>
        <button className="text-sm text-blue-500">End Chat</button>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <p className="text-gray-500">Loading messages...</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.senderId === 'admin' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  msg.senderId === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message input */}
      <div className="flex items-center p-2 border-t">
        <input
          type="text"
          className="flex-1 p-2 rounded-l-lg border"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-r-lg"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};
