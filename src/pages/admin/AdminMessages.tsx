import { ChatWindow } from '@/components/Admin/ChatWindow';
import { useGetUsersMessagedAdmin } from '@/hooks/useAdmin';
// import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'

const AdminMessages = () => {

    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    // Simulate fetching user list (You could replace with an API call using React Query)
    const { data: users, isLoading, isError } = useGetUsersMessagedAdmin()




    if(isLoading) return <p>loading....</p>
    if(isError) return <p>Error....</p>

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        {isLoading ? (
          <p>Loading users...</p>
        ) : (
          <ul className="space-y-2">
            {users?.map((user) => (
              <li
                key={user._id}
                className={`flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer ${
                  selectedUser === user._id ? 'bg-gray-300' : ''
                }`}
                onClick={() => setSelectedUser(user._id)}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    user.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></div>
                <span className="ml-3 text-lg">{user.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Chat Window */}
      {selectedUser ? (
        <div className="w-3/4 bg-white p-4 shadow-lg flex flex-col">
          <ChatWindow userId={selectedUser} />
        </div>
      ) : (
        <div className="w-3/4 bg-gray-50 p-4">
          <p className="text-center text-gray-500">Select a user to start chatting</p>
        </div>
      )}
    </div>
  )
}

export default AdminMessages