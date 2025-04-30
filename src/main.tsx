import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/app/store.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLIENT_ID = "874985438011-s7b0ti87oih945t3gegqbdg0l8lkj6u4.apps.googleusercontent.com";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </Provider>
);
