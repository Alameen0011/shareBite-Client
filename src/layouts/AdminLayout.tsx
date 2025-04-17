
import Sidebar from '@/components/Admin/Sidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex h-screen w-full">
    <Sidebar />
    <main className="flex-1 bg-gray-100 overflow-y-auto p-4">
      <Outlet /> {/* Renders the nested routes like AdminDashboard, etc. */}
    </main>
  </div>
  )
}

export default AdminLayout