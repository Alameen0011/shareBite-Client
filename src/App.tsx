import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRoutes";


function App() {

  useAuthInit(); 
  return <RouterProvider router={router} />;
}

export default App;
