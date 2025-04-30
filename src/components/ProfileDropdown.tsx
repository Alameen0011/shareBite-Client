import { logout } from '@/features/auth/authSlice';
import { disconnectSocket } from '@/features/socket/socketSlice';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useRef, useState } from 'react'
import { useDispatch, } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ProfileDropdown: React.FC = () => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {logoutMutation} = useAuth()

  const {mutateAsync} = logoutMutation


      useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
          if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setOpen(false);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);

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
    <div className="relative" ref={dropdownRef}>
    <img
      src="/photo-1554050857-c84a8abdb5e2.avif"
      alt="avatar"
      className="w-10 h-10 rounded-full cursor-pointer border"
      onClick={() => setOpen((prev) => !prev)}
    />
    {open && (
      <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
        <ul className="py-1">
          <li>
            <button
              onClick={() => {
                navigate("/profile");
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              My Profile
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/support")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Any issues ?
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    )}
  </div>
  )
}

export default ProfileDropdown