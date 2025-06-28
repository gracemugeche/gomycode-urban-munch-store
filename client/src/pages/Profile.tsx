const Profile = () => {
  const user = {
    name: "Grace Mugeche",
    email: "grace@example.com",
    joined: "March 2024",
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12 font-[Poppins]">
      <h1 className="text-2xl font-bold text-purple-800 mb-6">My Profile</h1>
      <div className="bg-purple-50 p-6 rounded-xl shadow space-y-4">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Joined:</strong> {user.joined}</p>
      </div>

      <h2 className="text-lg font-semibold mt-8 mb-2">My Orders</h2>
      <p className="text-sm text-gray-500">Order history will appear here.</p>
    </div>
  );
};

export default Profile;
