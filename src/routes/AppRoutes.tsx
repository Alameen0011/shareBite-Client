import MainLayout from "@/layouts/MainLayout";
import About from "@/pages/About";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import { createBrowserRouter } from "react-router-dom";
import AuthWrapper from "./ProtectedRoutes/AuthWrapper";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            { path: "" , element : <Home/>},
            { path: "about" , element : <About/>},
      
            
        ]

    },
    {
        path: "/auth",
        element: <AuthWrapper/>,
        children: [
            { path: "login" , element : <Login/>},
            { path: "signup" , element : <Signup/>}
        ]
    },
    { path: "*" , element: <NotFound/> }
])