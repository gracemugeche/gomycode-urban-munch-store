import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

import { CartProvider } from "./contexts/CartContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
          <Toaster position="top-right" reverseOrder={false} />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
