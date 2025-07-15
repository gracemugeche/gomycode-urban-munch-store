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
  console.error("❌ Missing VITE_CLERK_PUBLISHABLE_KEY in environment variables");
  console.error("Please add your Clerk publishable key to the .env file");
  // Don't throw error, show error component instead
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {!PUBLISHABLE_KEY ? (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Configuration Error</h1>
          <p className="text-gray-700 mb-4">
            Missing Clerk Publishable Key. Please add <code className="bg-gray-100 px-2 py-1 rounded">VITE_CLERK_PUBLISHABLE_KEY</code> to your .env file.
          </p>
          <p className="text-sm text-gray-500">
            Check the .env.example file for required environment variables.
          </p>
        </div>
      </div>
    ) : (
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        signInFallbackRedirectUrl="/redirect"
        signUpFallbackRedirectUrl="/redirect"
      >
        <BrowserRouter>
          <ClerkLoading>
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading Urban Munch...</p>
              </div>
            </div>
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
    )}
  </React.StrictMode>
);
