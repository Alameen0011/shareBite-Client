import { useState, useEffect } from 'react';

interface ChatWindowProps {
  userId: string;
}

interface Message {
  sender: 'admin' | 'user';
  text: string;
}

export const ChatWindow = ({ userId }: ChatWindowProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock initial message loading
  useEffect(() => {
    setIsLoading(true);
    const mockMessages: Message[] = [
      { sender: 'admin', text: 'Hello! How can I help you today?' },
      { sender: 'user', text: 'I have a question about my donation.' },
      { sender: 'admin', text: 'Sure, feel free to ask.' },
    ];
    setTimeout(() => {
      setMessages(mockMessages);
      setIsLoading(false);
    }, 500);
  }, [userId]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        sender: 'admin',
        text: message,
      };
      setMessages((prev) => [...prev, newMessage]);
      setMessage('');
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
              className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  msg.sender === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
