const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-center">
      <div>
        <div className="text-5xl text-green-600 mb-4">✅</div>
        <h1 className="text-2xl font-bold mb-2">Order Received</h1>
        <p className="text-gray-600">Thank you! You will get a confirmation message shortly.</p>
      </div>
    </div>
  );
};

export default OrderSuccess;
