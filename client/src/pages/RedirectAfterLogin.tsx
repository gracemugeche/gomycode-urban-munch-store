import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RedirectAfterLogin = () => {
  const { role, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "worker") {
        navigate("/admin/dashboard"); // 👈 Worker-specific dashboard
      } else if (role === "user") {
        navigate("/dashboard"); // Regular user dashboard
      } else {
        navigate("/"); // fallback
      }
    }
  }, [role, loading, navigate]);

  return <p className="text-center mt-10">Redirecting...</p>;
};

export default RedirectAfterLogin;
