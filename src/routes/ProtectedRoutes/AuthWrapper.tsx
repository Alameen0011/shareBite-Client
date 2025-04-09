
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthWrapper = () => {
    console.log("inside user Auth")
    const{ isAuthenticated,role }  = useSelector((state:RootState) => state.auth); // Getting the user authentication statue from Redux state
     // Getting the user role from Redux state
    console.log("Authenticated:", isAuthenticated)
    console.log("Role:", role);
   

      
        if (isAuthenticated) {

          return  <Navigate to="/"  replace  />
        } else {
          return <Outlet/>;
        }
}

export default AuthWrapper
