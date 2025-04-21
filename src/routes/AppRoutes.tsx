import MainLayout from "@/layouts/MainLayout";
import About from "@/pages/About";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoutes/ProtectedRoute";
import DonorDashboard from "@/pages/donor/DonorDashboard";
import AddDonation from "@/pages/donor/AddDonation";
import VolunteerDashboard from "@/pages/volunteer/volunteerDashboard";
import Unauthorized from "@/pages/Unauthorized";
import Verify from "@/pages/auth/Verify";
import VerifyLogin from "@/pages/auth/VerifyLogin";
import AuthWrapper from "./ProtectedRoutes/AuthWrapper";
import Donation from "@/pages/donor/Donation";
import EditDonation from "@/pages/donor/EditDonation";
import VolunteerNavigation from "@/pages/volunteer/VolunteerNavigation";
import VolunteerOtp from "@/pages/volunteer/VolunteerOtp";
import VolunteerKioskNavigation from "@/pages/volunteer/VolunteerKioskNavigation";
import VolunteerKioskOtp from "@/pages/volunteer/VolunteerKioskOtp";
import DeliverySuccess from "@/pages/volunteer/DeliverySuccess";
import Profile from "@/pages/profile/Profile";
import Support from "@/pages/Support";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import UserManagement from "@/pages/admin/UserManagement";
import AdminLayout from "@/layouts/AdminLayout";
import KioskManagement from "@/pages/admin/KioskManagement";
import AddKiosk from "@/pages/admin/AddKiosk";
import EditKiosk from "@/pages/admin/EditKiosk";
import AdminMessages from "@/pages/admin/AdminMessages";
import AdminLogin from "@/pages/admin/auth/AdminLogin";
import VerifyAdminLogin from "@/pages/admin/auth/VerifyAdminLogin";
import AdminAuthWrapper from "./ProtectedRoutes/AdminAuthWrapper";



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
        element: <AuthWrapper roles={["donor","volunteer"]}/>,
        children: [
            { path: "login" , element : <Login/>},
            { path: "signup" , element : <Signup/>},
            { path: "verify" , element : <Verify/>},
            { path: "verify-login" , element : <VerifyLogin/>}
        ]
    },
    {
        path: "/donor",
        element: (
          <ProtectedRoute roles={["donor"]}>
            <MainLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "dashboard", element: <DonorDashboard /> },
          { path: "add-donation", element: <AddDonation /> },
          { path: "donation/:id", element: <Donation/>},
          { path: "donations/edit/:id", element: <EditDonation /> },
        ],
    },
    {
        path: "/volunteer",
        element: (
          <ProtectedRoute  roles={["volunteer"]}>
            <MainLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "dashboard", element: <VolunteerDashboard /> },
          { path: "navigation", element: <VolunteerNavigation /> },
          { path: "kiosk/navigation", element: <VolunteerKioskNavigation /> },
          { path: "verifyOtp/:id", element: <VolunteerOtp /> },
          { path: "kiosk/otp/:id", element: <VolunteerKioskOtp /> },
          { path: "deliverySuccess", element: <DeliverySuccess /> },
          
        ],
      },

      {
        path: "/profile",
        element: (
          <ProtectedRoute roles={["volunteer","donor"]} >
            <MainLayout/>
            </ProtectedRoute>
        ),
        children: [
          { path: "", element: <Profile/>}
        ]
      },
      {
        path: "/support",
        element: (
          <ProtectedRoute roles={["volunteer","donor","admin"]} >
            <MainLayout/>
            </ProtectedRoute>
        ),
        children: [
          { path: "", element: <Support /> },
        ]
      },

      {
        path: "/admin",
        element: (
          <ProtectedRoute roles= {["admin"]} >
             <AdminLayout/>
          </ProtectedRoute>
        ),
        children: [
          { path: "dashboard",element: <AdminDashboard /> },
          { path: "user/management",element: <UserManagement /> },
          { path: "kiosk/management",element: <KioskManagement /> },
          { path: "addkiosk",element: <AddKiosk /> },
          { path: "editkiosk/:id",element: <EditKiosk /> },
          { path: "communications",element: <AdminMessages /> },

        ]
      },
      {
        path: "/admin/auth",
        element: <AdminAuthWrapper/>,
        children: [
          { path: "", element: <AdminLogin/> }, 
          { path: "verify-login", element: <VerifyAdminLogin/> }, 
        ]
      },


    { path: "*" , element: <NotFound/> },
    { path: "/unauthorized", element: <Unauthorized /> },
])