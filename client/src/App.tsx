import { useLocation } from "react-router-dom";
import Footer from "./components/homesection/Footer";
import Navbar from "./components/homesection/Navbar";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const location = useLocation();

  // Hide navbar and footer on this pages
  const hideLayoutRoutes = [
    "/login",
    "/signup",
    "/cart",
    "/checkout",
    "/adminDashboard/products",
    "/adminDashboard/orders",
    "/adminDashboard/users",
    "/adminDashboard",
    "/adminDashboard/delivery",
    "/adminDashboard/finance",
    "/order-success",
    "/dashboard",
    "/orders",
    "/account",
  ];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideLayout && <Navbar />}

      <main className="flex-grow">
        <AppRoutes />
      </main>

      {!shouldHideLayout && <Footer />}
    </div>
  );
}
