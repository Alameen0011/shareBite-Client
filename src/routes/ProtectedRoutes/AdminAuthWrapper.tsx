
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminAuthWrapper = () => {
    console.log("inside adminAuthwrapper")
    const{ isAuthenticated,role }  = useSelector((state:RootState) => state.auth); // Getting the user authentication statue from Redux state

    if(isAuthenticated && role == "admin"){
        console.log("Navigating to admin if authenticated and role -- admin")
        return <Navigate to ="/admin" replace/>
    }else{
        console.log("Returning outlet")
        return <Outlet/>
    }
}

export default AdminAuthWrapper