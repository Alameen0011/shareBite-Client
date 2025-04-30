import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

interface AuthWrapperProps {
  roles: ("donor" | "volunteer" | "admin")[];
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ roles }) => {
  const { isAuthenticated, role } = useSelector(
    (state: RootState) => state.auth
  ); // Getting the user authentication statue from Redux state

  console.log("Inside auth wrapper")

  if (isAuthenticated) {
    if (roles.includes(role)) {
      return <Navigate to="/" replace />;
    }
  } else {
    return <Outlet />;
  }
};

export default AuthWrapper;
