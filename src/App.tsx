import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"
import { router } from "@/routes/AppRoutes";

function App() {


  return <>
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: { background: 'black', color: 'white' }
        }} 
      />
  <RouterProvider router={router} />
  </> 
}

export default App;



