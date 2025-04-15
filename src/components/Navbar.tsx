import { useState } from "react";
import { HandPlatter as Plate, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/store";
import { logout } from "@/features/auth/authSlice";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { disconnectSocket } from "@/features/socket/socketSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const {logoutMutation} = useAuth()

  const navigate = useNavigate()

  const {mutateAsync} = logoutMutation

  const { isAuthenticated,role  } = useSelector((state: RootState) => state.auth );

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout =async () => {
    try {
      dispatch(logout());
      const res = await mutateAsync()
      console.log(res,"========res")
      if(res.success){
        toast(res.message)
        dispatch(disconnectSocket());
        navigate('/')
      } 
      
    } catch (error) {
      console.log(error)
    }
    

  };

  return (
    <nav className=" fixed top-0 left-0 w-full bg-white shadow-md z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Plate className="h-8 w-8 text-emerald-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">
              ShareBite
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-emerald-600 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-emerald-600 transition-colors duration-200"
            >
              About
            </Link>
            {
              !isAuthenticated ? (
                <Link
                to="/auth/signup?role=donor"
                className="text-gray-600 hover:text-emerald-600 transition-colors duration-200"
              >
                Donate
              </Link>

              ): null

            }
           {
            role === "donor" ? (
              <>
         
              <Link
              to="/donor/dashboard"
              className="text-gray-600 hover:text-emerald-600 transition-colors duration-200"
            >
              Donor Dashboard
            </Link>
              <Link
              to="/donor/add-donation"
              className="text-gray-600 hover:text-emerald-600 transition-colors duration-200"
            >
              Add donations
            </Link>
            </>
              
            ): null

           }
           {
            role === "volunteer" ? (
              <>
         
              <Link
              to="/volunteer/dashboard"
              className="text-gray-600 hover:text-emerald-600 transition-colors duration-200"
            >
              Volunteer Dashboard
            </Link>
              <Link
              to="/volunteer/claimed-donations"
              className="text-gray-600 hover:text-emerald-600 transition-colors duration-200"
            >
               claimed Donation
            </Link>
            </>
              
            ): null

           }
         

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-700 transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/auth/login"
                className="px-5 py-2 bg-emerald-600 text-white font-medium rounded-lg shadow-md hover:bg-emerald-700 transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-emerald-600 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
              >
                Home
              </a>
              <a
                href="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
              >
                About
              </a>
              <a
                href="/donate"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
              >
                Donate
              </a>
              <a
                href="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
              >
                Contact
              </a>

              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full mt-2 px-4 py-2 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-700 transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/auth/login"
                  className="w-full mt-2 px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg shadow-md hover:bg-emerald-700 transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Login
                </Link>
              )}

              <button className="w-full mt-2 px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg shadow-md hover:bg-emerald-700 transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
};

export default Navbar;
