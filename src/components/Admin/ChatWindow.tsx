import { getSocket } from '@/api/socket';
import { RootState } from '@/app/store';
import { useGetMessages, useMessage } from '@/hooks/useMessage';
import { getUserIdFromToken } from '@/utils/jwtDecode';
import { useState, useEffect, useId } from 'react';
import { useSelector } from 'react-redux';
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
  
  const { data: chatHistory, isLoading ,isError,refetch} = useGetMessages(userId);
  const { sendMessage } = useMessage();
  const { accessToken } = useSelector((state: RootState) => state.auth);

  const { mutateAsync } = sendMessage;

  useEffect(() => {
    if (chatHistory) {
      setMessages(chatHistory.messages);
    }
  }, [chatHistory]);

  const adminId = getUserIdFromToken(accessToken);

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

    // Refetch when userId changes
    useEffect(() => {
      refetch(); // refetch messages when userId changes
    }, [userId, refetch]);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const data = { id: userId, text: input };
      console.log(data, 'data sending to server');
      const res = await mutateAsync(data);
      if (res.success) {
        toast.success('Message sent successfully');
      }

      // Optionally add to local state (optimistic UI)
      setMessages((prevMessages) => [...prevMessages, res.newMessage]);
      setInput('');
    }
  };

  if(isLoading) return <p>Loading....</p>
  if(isError) return <p>Error....</p>

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
              className={`flex ${msg.senderId === adminId ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  msg.senderId === adminId
                    ? 'bg-blue-500 text-white ml-auto' // Admin messages on the right
                    : 'bg-gray-200 text-black mr-auto' // User messages on the left
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
