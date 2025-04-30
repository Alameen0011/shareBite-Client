import { useState } from "react";
import { HandPlatter as Plate, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/store";
import { logout } from "@/features/auth/authSlice";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { disconnectSocket } from "@/features/socket/socketSlice";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { logoutMutation } = useAuth();

  const navigate = useNavigate();

  const { mutateAsync } = logoutMutation;

  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      const res = await mutateAsync(); // Logout from server first
      if (res.success) {
        dispatch(disconnectSocket());
        dispatch(logout()); // Now clear Redux + localStorage
        toast(res.message);
        navigate('/');
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 font-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Plate className="h-8 w-8 text-emerald-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">ShareBite</span>
          </div>

          {/* Center Links (Desktop Only) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-emerald-600 transition-colors">Home</Link>
            <Link to="/about" className="text-gray-600 hover:text-emerald-600 transition-colors">About</Link>
            {!isAuthenticated && (
              <Link to="/auth/signup?role=donor" className="text-gray-600 hover:text-emerald-600 transition-colors">Donate</Link>
            )}
          </div>

          {/* Right Side (Desktop Only) */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated && role === "donor" && (
              <>
                <Link to="/donor/dashboard" className="text-gray-600 hover:text-emerald-600 transition-colors">Donor Dashboard</Link>
                <Link to="/donor/add-donation" className="text-gray-600 hover:text-emerald-600 transition-colors">Add Donation</Link>
              </>
            )}
            {isAuthenticated && role === "volunteer" && (
              <Link to="/volunteer/dashboard" className="text-gray-600 hover:text-emerald-600 transition-colors">Volunteer Dashboard</Link>
            )}
            {isAuthenticated && role === "admin" && (
              <Link to="/admin" className="text-gray-600 hover:text-emerald-600 transition-colors">Admin Dashboard</Link>
            )}
            {isAuthenticated ? (
              <ProfileDropdown />
            ) : (
              <Link
                to="/auth/login"
                className="px-5 py-2 bg-emerald-600 text-white rounded-lg shadow-md hover:bg-emerald-700 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-emerald-600 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow-md">
          <Link to="/" className="block px-3 py-2 rounded text-gray-700 hover:text-emerald-600 hover:bg-gray-50">Home</Link>
          <Link to="/about" className="block px-3 py-2 rounded text-gray-700 hover:text-emerald-600 hover:bg-gray-50">About</Link>
          {!isAuthenticated && (
            <Link to="/auth/signup?role=donor" className="block px-3 py-2 rounded text-gray-700 hover:text-emerald-600 hover:bg-gray-50">Donate</Link>
          )}

          {isAuthenticated && role === "donor" && (
            <>
              <Link to="/donor/dashboard" className="block px-3 py-2 rounded text-gray-700 hover:text-emerald-600 hover:bg-gray-50">Donor Dashboard</Link>
              <Link to="/donor/add-donation" className="block px-3 py-2 rounded text-gray-700 hover:text-emerald-600 hover:bg-gray-50">Add Donation</Link>
            </>
          )}
          {isAuthenticated && role === "volunteer" && (
            <Link to="/volunteer/dashboard" className="block px-3 py-2 rounded text-gray-700 hover:text-emerald-600 hover:bg-gray-50">Volunteer Dashboard</Link>
          )}
          {isAuthenticated && role === "admin" && (
            <Link to="/admin" className="block px-3 py-2 rounded text-gray-700 hover:text-emerald-600 hover:bg-gray-50">Admin Dashboard</Link>
          )}

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="w-full mt-2 px-4 py-2 bg-red-400 text-white rounded-lg shadow-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth/login"
              className="w-full mt-2 block text-center px-4 py-2 bg-emerald-600 text-white rounded-lg shadow-md hover:bg-emerald-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

