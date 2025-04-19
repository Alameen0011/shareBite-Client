import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  LocateIcon,
  LayoutDashboard,
  Users,
  UserCircle,
  MessageCircle
} from "lucide-react";

const menuItems = [
  { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/admin/dashboard" },
  { icon: <Users size={20} />, label: "User Management", path: "/admin/user/management" },
  { icon: <LocateIcon size={20} />, label: "Kiosk Management", path: "/admin/kiosk/management" },
  { icon: <MessageCircle size={20} />, label: "Support", path: "/admin/communications" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);

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
                open
                  ? "opacity-100 w-full"
                  : "opacity-0 w-0 overflow-hidden"
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
      <div className="mt-auto flex items-center gap-2 px-3 py-2">
        <UserCircle size={28} />
        <div
          className={`transition-all duration-300 leading-5 ${
            open
              ? "opacity-100 w-full"
              : "opacity-0 w-0 overflow-hidden"
          }`}
        >
          <p className="font-semibold">Admin</p>
          <p className="text-xs text-white/80">admin@sharebite.org</p>
        </div>
      </div>
    </aside>
  );
}
