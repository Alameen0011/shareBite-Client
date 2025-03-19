import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";


interface ProtectedRouteProps {
    role: "donor" | "volunteer";
    children: React.ReactNode;
}



const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role , children }) => {
    console.log("inside protected Router")
    const { isAuthenticated , role:Role } = useSelector(( state: RootState ) => state.auth )

    console.log(isAuthenticated,Role)

    if(!isAuthenticated){
        console.log('you fucked up')
        return <Navigate to = "/auth/signup" replace />
    }

    if( Role !== role ){
        return <Navigate to= "/unauthorized" replace />
    }

  return  <>{children}</>
}

export default ProtectedRoute