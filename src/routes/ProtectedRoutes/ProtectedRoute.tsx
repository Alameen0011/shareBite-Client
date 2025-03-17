import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";


interface ProtectedRouteProps {
    role: "donor" | "volunteer";
    children: React.ReactNode;
}



const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role , children }) => {

    const { isAuthenticated , role:Role } = useSelector(( state: RootState ) => state.auth )

    if(!isAuthenticated){
        return <Navigate to = "/auth/login" replace />
    }

    if( Role !== role ){
        return <Navigate to= "/unauthorized" replace />
    }

  return  <>{children}</>
}

export default ProtectedRoute