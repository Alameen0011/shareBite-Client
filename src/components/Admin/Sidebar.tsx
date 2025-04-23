import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  LocateIcon,
  LayoutDashboard,
  Users,
  UserCircle,
  MessageCircle,
} from "lucide-react";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { useAdmin } from "@/hooks/useAdmin";
import { logout } from "@/features/auth/authSlice";
import { toast } from "sonner";
import { disconnectSocket } from "@/features/socket/socketSlice";

const menuItems = [
  {
    icon: <LayoutDashboard size={20} />,
    label: "Dashboard",
    path: "/admin",
  },
  {
    icon: <Users size={20} />,
    label: "User Management",
    path: "/admin/user/management",
  },
  {
    icon: <LocateIcon size={20} />,
    label: "Kiosk Management",
    path: "/admin/kiosk/management",
  },
  {
    icon: <MessageCircle size={20} />,
    label: "Support",
    path: "/admin/communications",
  },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { adminLogout } = useAdmin();
  // const { mutateAsync } = adminLogout;

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // const handleLogoutAdmin = async () => {
  //   try {
  //     const res = await mutateAsync(); // Logout from server first
  //     if (res.success) {
  //       dispatch(disconnectSocket());
  //       dispatch(logout()); // Now clear Redux + localStorage
  //       toast(res.message);
  //       navigate('/admin/auth');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <aside
      className={`h-screen bg-teal-600 text-white p-3 flex flex-col transition-all duration-300 shadow-md ${
        open ? "w-80" : "w-16"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-2">
        <div
          className={`transition-all duration-300 origin-left ${
            open ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        >
          <p className="text-2xl font-semibold whitespace-nowrap">
            <span className="text-yellow-500">ShareBite</span>{" "}
            <span className="text-teal-300">Admin</span>
          </p>
        </div>

        <button onClick={() => setOpen(!open)}>
          <Menu
            size={28}
            className={`transition-transform duration-300 ${
              !open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4 space-y-2">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-300 relative ${
                isActive ? "bg-blue-800" : "hover:bg-blue-700"
              }`
            }
          >
            <div>{item.icon}</div>
            <span
              className={`transition-all duration-300 ${
                open ? "opacity-100 w-full" : "opacity-0 w-0 overflow-hidden"
              }`}
            >
              {item.label}
            </span>

            {/* Tooltip */}
            {!open && (
              <span className="absolute left-16 z-10 hidden group-hover:block bg-white text-black text-sm px-2 py-1 rounded shadow whitespace-nowrap">
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto px-3 py-3 flex items-center justify-between gap-2 border-t border-white/20">
        {/* Left side: User info or tooltip */}
        <div className="flex items-center gap-2 relative group">
          <UserCircle size={28} />
          <div
            className={`transition-all duration-300 leading-5 ${
              open ? "opacity-100 w-full" : "opacity-0 w-0 overflow-hidden"
            }`}
          >
            {isAuthenticated && <p className="font-semibold text-sm">Admin</p>}
          </div>

          {/* Tooltip when collapsed */}
          {!open && (
            <span className="absolute left-12 z-10 hidden group-hover:block bg-white text-black text-xs px-2 py-1 rounded shadow whitespace-nowrap">
              Admin
            </span>
          )}
        </div>

        {/* Right side: Logout button or icon */}
        {/* {isAuthenticated && (
          <>
            {open ? (
              <button
                onClick={handleLogoutAdmin}
                className="ml-auto px-4 py-2 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-700 transform hover:-translate-y-0.5 transition-all duration-200 text-sm"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLogoutAdmin}
                className="text-red-200 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10v1"
                  />
                </svg>
              </button>
            )}
          </>
        )} */}
      </div>
    </aside>
  );
}
