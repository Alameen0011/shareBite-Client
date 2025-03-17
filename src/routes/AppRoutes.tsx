import MainLayout from "@/layouts/MainLayout";
import About from "@/pages/About";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import { createBrowserRouter } from "react-router-dom";
import AuthWrapper from "@/routes/ProtectedRoutes/AuthWrapper";
import ProtectedRoute from "@/routes/ProtectedRoutes/ProtectedRoute";
import DonorDashboard from "@/pages/donor/DonorDashboard";
import MyDonations from "@/pages/donor/MyDonations";
import AddDonation from "@/pages/donor/AddDonation";
import VolunteerDashboard from "@/pages/volunteer/volunteerDashboard";
import AvailableDonations from "@/pages/volunteer/AvailableDonations";
import ClaimedDonations from "@/pages/volunteer/ClaimedDonations";
import Unauthorized from "@/pages/Unauthorized";


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
    {
        path: "/donor",
        element: (
          <ProtectedRoute role="donor">
            <MainLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "dashboard", element: <DonorDashboard /> },
          { path: "donations", element: <MyDonations /> },
          { path: "add-donation", element: <AddDonation /> },
        ],
    },
    {
        path: "/volunteer",
        element: (
          <ProtectedRoute role="volunteer">
            <MainLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "dashboard", element: <VolunteerDashboard /> },
          { path: "available-donations", element: <AvailableDonations /> },
          { path: "claimed-donations", element: <ClaimedDonations /> },
        ],
      },


    { path: "*" , element: <NotFound/> },
    { path: "/unauthorized", element: <Unauthorized /> },
])