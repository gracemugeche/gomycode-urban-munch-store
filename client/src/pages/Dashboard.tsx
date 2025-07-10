import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const { isSignedIn, user } = useUser();
  const [hasSynced, setHasSynced] = useState(false);

  useEffect(() => {
    const syncUser = async () => {
      if (isSignedIn && user && !hasSynced) {
        const payload = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.primaryEmailAddress?.emailAddress,
        };

        try {
          await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/clerk`, payload);
          console.log("✅ Synced Clerk user to backend:", payload);
          setHasSynced(true);
        } catch (err) {
          console.error("❌ Error syncing Clerk user:", err);
        }
      }
    };

    syncUser();
  }, [isSignedIn, user, hasSynced]);

  if (!isSignedIn || !user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-[Poppins]">
      <h2 className="text-2xl font-bold mb-4">
        Welcome, {user.firstName} {user.lastName}
      </h2>
      <div className="flex items-center gap-4 mb-6">
        <img
          src={user.imageUrl}
          alt="User Avatar"
          className="w-16 h-16 rounded-full border border-purple-400 shadow-md"
        />
        <div>
          <p className="text-md text-gray-700">Email:</p>
          <p className="text-lg font-medium text-purple-800">
            {user.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold text-purple-700">Ongoing Orders</h3>
          <p className="text-sm text-gray-600">You have no ongoing orders.</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-purple-700">Order History</h3>
          <p className="text-sm text-gray-600">No orders yet.</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-purple-700">Saved Addresses</h3>
          <p className="text-sm text-gray-600">You haven’t saved any addresses.</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-purple-700">Receipts</h3>
          <p className="text-sm text-gray-600">No receipts available.</p>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
