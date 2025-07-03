import { useState } from "react";

interface Props {
  deliveryFee: number;
}

const DeliverySection = ({ deliveryFee }: Props) => {
  const [deliveryOption, setDeliveryOption] = useState("asap");
  const [customDate, setCustomDate] = useState("");

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="First Name"
        className="w-full p-3 border rounded-md focus:outline-purple-600"
      />
      <input
        type="text"
        placeholder="Last Name"
        className="w-full p-3 border rounded-md focus:outline-purple-600"
      />
      <input
        type="text"
        placeholder="Phone Number"
        className="w-full p-3 border rounded-md focus:outline-purple-600"
      />
      <textarea
        placeholder="Delivery Address (e.g. Estate, House No, Street)"
        className="w-full p-3 border rounded-md h-24 resize-none focus:outline-purple-600"
      />

      <div className="space-y-2">
        <h3 className="font-semibold">Delivery Option</h3>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="delivery"
            value="asap"
            checked={deliveryOption === "asap"}
            onChange={() => setDeliveryOption("asap")}
          />
          <span>As Soon As Possible</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="delivery"
            value="custom"
            checked={deliveryOption === "custom"}
            onChange={() => setDeliveryOption("custom")}
          />
          <span>Specify Delivery Date</span>
        </label>
        {deliveryOption === "custom" && (
          <input
            type="date"
            value={customDate}
            onChange={(e) => setCustomDate(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        )}
      </div>

      <div className="text-purple-700 font-medium mt-4">
        Delivery Fee: ${deliveryFee.toFixed(2)}
      </div>
    </div>
  );
};

export default DeliverySection;
