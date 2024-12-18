import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AuthContextProvider from "./context/AuthContext.tsx";
import "bootstrap-icons/font/bootstrap-icons.css";

createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <App />
    </AuthContextProvider>
);
