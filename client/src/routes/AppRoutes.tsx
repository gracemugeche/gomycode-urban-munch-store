import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Meal from "../pages/Meals";
import Groceries from "../pages/Groceries";
import Drink from "../pages/Drinks";
import Help from "../pages/Help";
import Dashboard from "../pages/Dashboard";

// Admin pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProductPage from "../pages/admin/products/AdminProduct";
import OrderList from "../pages/admin/orders/OrderList";
import UserList from "../pages/admin/users/UserList";
import DeliveryPage from "../pages/admin/orders/DeliveryPage";

// Layout & role-based routing
import AdminSidebarLayout from "../components/AdminSidebar";
import RoleRoute from "./RoleRoute";

import RedirectAfterLogin from "../pages/RedirectAfterLogin";
import OrderSuccess from "../pages/OrderSuccess";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ✅ Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/meals" element={<Meal />} />
      <Route path="/groceries" element={<Groceries />} />
      <Route path="/drinks" element={<Drink />} />
      <Route path="/help" element={<Help />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/redirect" element={<RedirectAfterLogin />} />
      <Route path="/order-success" element={<OrderSuccess />} />

      {/* ✅ User Dashboard */}
      <Route
        path="/dashboard"
        element={
          <RoleRoute allowedRoles={["user", "admin", "worker"]}>
            <Dashboard />
          </RoleRoute>
        }
      />

      {/* ✅ Admin Layout - Shared with Admin & Worker */}
      <Route
        path="/admin"
        element={
          <RoleRoute allowedRoles={["admin", "worker"]}>
            <AdminSidebarLayout />
          </RoleRoute>
        }
      >
        {/* ✅ Admin & Worker Access */}
        <Route
          path="dashboard"
          element={
            <RoleRoute allowedRoles={["admin", "worker"]}>
              <AdminDashboard />
            </RoleRoute>
          }
        />
        <Route
          path="products"
          element={
            <RoleRoute allowedRoles={["admin", "worker"]}>
              <AdminProductPage />
            </RoleRoute>
          }
        />
        <Route
          path="delivery"
          element={
            <RoleRoute allowedRoles={["admin", "worker"]}>
              <DeliveryPage />
            </RoleRoute>
          }
        />

        {/* ✅ Admin Only Access */}
        <Route
          path="orders"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <OrderList />
            </RoleRoute>
          }
        />
        <Route
          path="users"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <UserList />
            </RoleRoute>
          }
        />

        {/* 🟡 Future: Protect finance routes like this */}
        {/* 
        <Route
          path="finance"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <FinancePage />
            </RoleRoute>
          }
        />
        */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
