import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

import { ClerkProvider, ClerkLoaded, ClerkLoading } from "@clerk/clerk-react";
import { CartProvider } from "./contexts/CartContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { Toaster } from "react-hot-toast";

// Clerk Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      signInFallbackRedirectUrl="/redirect"
      signUpFallbackRedirectUrl="/redirect"
    >
      <BrowserRouter>
        <ClerkLoading>
          <div className="text-center p-10">Loading Clerk...</div>
        </ClerkLoading>

        <ClerkLoaded>
          <CartProvider>
            <AuthProvider>
              <App />
              <Toaster position="top-right" reverseOrder={false} />
            </AuthProvider>
          </CartProvider>
        </ClerkLoaded>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
