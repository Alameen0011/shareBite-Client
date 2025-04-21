import React from 'react'

import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminAuthWrapper = () => {
    const{ isAuthenticated,role }  = useSelector((state:RootState) => state.auth); // Getting the user authentication statue from Redux state

    if(isAuthenticated &&role == "admin"){
        return <Navigate to ="/admin/dashboard" replace/>
    }else{
        return <Outlet/>
    }
}

export default AdminAuthWrapper