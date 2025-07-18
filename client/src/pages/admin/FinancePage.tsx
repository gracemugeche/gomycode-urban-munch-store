import { useEffect, useState } from "react";
import axios from "axios";

interface FinanceSummary {
  totalOrders: number;
  totalRevenue: number;
  paidOrders: number;
  unpaidOrders: number;
}

const FinancePage = () => {
  const [summary, setSummary] = useState<FinanceSummary | null>(null);

  useEffect(() => {
    const fetchFinanceSummary = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get<FinanceSummary>(
          `${import.meta.env.VITE_API_BASE_URL}/orders/finance/summary`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSummary(res.data);
      } catch (error) {
        console.error("Failed to fetch finance summary:", error);
      }
    };

    fetchFinanceSummary();
  }, []);

  return (
    <div className="min-h-screen bg-white font-[Poppins] p-8">
      <h1 className="text-3xl font-bold text-purple-800 mb-8 text-center">
        Finance Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <div className="rounded-2xl shadow-md bg-purple-100 p-6 text-center">
          <h2 className="text-lg font-semibold text-purple-900 mb-2">
            Total Orders
          </h2>
          <p className="text-3xl font-bold text-purple-800">
            {summary?.totalOrders ?? 0}
          </p>
        </div>

        <div className="rounded-2xl shadow-md bg-purple-100 p-6 text-center">
          <h2 className="text-lg font-semibold text-purple-900 mb-2">
            Paid Orders
          </h2>
          <p className="text-3xl font-bold text-green-600">
            {summary?.paidOrders ?? 0}
          </p>
        </div>

        <div className="rounded-2xl shadow-md bg-purple-100 p-6 text-center">
          <h2 className="text-lg font-semibold text-purple-900 mb-2">
            Unpaid Orders
          </h2>
          <p className="text-3xl font-bold text-red-500">
            {summary?.unpaidOrders ?? 0}
          </p>
        </div>

        <div className="rounded-2xl shadow-md bg-purple-100 p-6 text-center">
          <h2 className="text-lg font-semibold text-purple-900 mb-2">
            Total Revenue
          </h2>
          <p className="text-3xl font-bold text-purple-800">
            ${summary?.totalRevenue.toFixed(2) ?? "0.00"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinancePage;
