import { useState, useEffect } from "react";

interface Props {
  deliveryAddress: {
    street: string;
    phone: string;
    city: string;
  };
  setDeliveryAddress: React.Dispatch<
    React.SetStateAction<{
      street: string;
      phone: string;
      city: string;
    }>
  >;
  deliveryFee: number;
}

const countryOptions = [
  { code: "KE", name: "Kenya", dial: "+254", maxLength: 13 },
  { code: "US", name: "United States", dial: "+1", maxLength: 11 },
  { code: "GB", name: "United Kingdom", dial: "+44", maxLength: 12 },
];

const DeliverySection = ({ deliveryAddress, setDeliveryAddress, deliveryFee }: Props) => {
  const [deliveryOption, setDeliveryOption] = useState("asap");
  const [customDate, setCustomDate] = useState("");
  const [countryCode, setCountryCode] = useState("KE");

  const selectedCountry = countryOptions.find((c) => c.code === countryCode)!;

  useEffect(() => {
    if (deliveryOption === "custom") {
      setDeliveryAddress((prev) => ({
        ...prev,
        deliveryDate: customDate,
      }));
    }
  }, [customDate, deliveryOption]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); 
    const total = selectedCountry.dial.length + value.length;

    if (total <= selectedCountry.maxLength) {
      setDeliveryAddress((prev) => ({
        ...prev,
        phone: selectedCountry.dial + value,
      }));
    }
  };

  const getRawNumber = () => {
    return deliveryAddress.phone.replace(selectedCountry.dial, "");
  };

  return (
    <div className="space-y-4">
      {/* Country selector */}
      <div>
        <label className="block font-medium mb-1">Country</label>
        <select
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          className="w-full p-3 border rounded-md focus:outline-purple-600"
        >
          {countryOptions.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name} ({c.dial})
            </option>
          ))}
        </select>
      </div>

      {/* Phone input */}
      <div>
        <label className="block font-medium mb-1">Phone Number</label>
        <div className="flex">
          <span className="bg-gray-100 border px-3 flex items-center rounded-l-md text-sm">
            {selectedCountry.dial}
          </span>
          <input
            type="tel"
            placeholder="7XXXXXXXX"
            value={getRawNumber()}
            onChange={handlePhoneChange}
            className="w-full p-3 border border-l-0 rounded-r-md focus:outline-purple-600 text-sm"
            required
          />
        </div>
      </div>

      {/* City input */}
      <input
        type="text"
        placeholder="City (e.g. Nairobi)"
        value={deliveryAddress.city}
        onChange={(e) =>
          setDeliveryAddress((prev) => ({ ...prev, city: e.target.value }))
        }
        className="w-full p-3 border rounded-md focus:outline-purple-600"
        required
      />

      {/* Full address */}
      <textarea
        placeholder="Full Address (Estate, House No, Street)"
        value={deliveryAddress.street}
        onChange={(e) =>
          setDeliveryAddress((prev) => ({ ...prev, street: e.target.value }))
        }
        className="w-full p-3 border rounded-md h-24 resize-none focus:outline-purple-600"
        required
      />

      {/* Delivery Options */}
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

      {/* Delivery Fee */}
      <div className="text-purple-700 font-medium mt-4">
        Delivery Fee: ${deliveryFee.toFixed(2)}
      </div>
    </div>
  );
};

export default DeliverySection;
