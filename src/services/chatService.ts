export const fetchMessages = async (userId: string) => {
    // Simulate fetching messages for a user
    return [
      { sender: 'admin', text: 'Hello, how can I help you today?' },
      { sender: 'user', text: 'I need assistance with my donation.' },
    ];
  };
  
  export const sendMessage = async (userId: string, message: string) => {
    // Simulate sending a message
    console.log(`Sent message to user ${userId}: ${message}`);
  };