import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Meal from "../pages/Meals";
import Groceries from "../pages/Groceries";
import Drink from "../pages/Drinks";
import Help from "../pages/Help";
import Dashboard from "../pages/users/Dashboard";
import OrdersPage from "../pages/users/order";
import AccountPage from "../pages/users/account";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import OrderSuccess from "../pages/OrderSuccess";

// Admin pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProductPage from "../pages/admin/products/AdminProduct";
import OrderList from "../pages/admin/orders/OrderList";
import UserList from "../pages/admin/users/UserList";
import DeliveryPage from "../pages/admin/orders/DeliveryPage";

// Layout & role-based routing
import AdminSidebarLayout from "../components/AdminSidebar";
import RoleRoute from "./RoleRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/meals" element={<Meal />} />
      <Route path="/groceries" element={<Groceries />} />
      <Route path="/drinks" element={<Drink />} />
      <Route path="/help" element={<Help />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order-success" element={<OrderSuccess />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* User Dashboard */}
      <Route
        path="/dashboard"
        element={
          <RoleRoute allowedRoles={["user", "admin", "worker"]}>
            <Dashboard />
          </RoleRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <RoleRoute allowedRoles={["user", "admin", "worker"]}>
            <OrdersPage />
          </RoleRoute>
        }
      />
      <Route
        path="/account"
        element={
          <RoleRoute allowedRoles={["user", "admin", "worker"]}>
            <AccountPage />
          </RoleRoute>
        }
      />

      {/* Admin + Worker Shared Layout */}
      <Route
        path="/adminDashboard"
        element={
          <RoleRoute allowedRoles={["admin", "worker"]}>
            <AdminSidebarLayout />
          </RoleRoute>
        }
      >
        <Route
          path="/adminDashboard"
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

        {/* Admin Only Routes */}
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
      </Route>
    </Routes>
  );
};

export default AppRoutes;
